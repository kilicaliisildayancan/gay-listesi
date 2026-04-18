import { createServer } from "http";
import { parse } from "url";
import next from "next";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const prisma = new PrismaClient();
const HARDCODED_LIST_SIZE = 71;
const TOP_N_PROMOTE = 3;

async function promoteTopSuggestions() {
  const top = await prisma.suggestion.findMany({
    where: { upvotes: { gt: 0 } },
    orderBy: [{ upvotes: "desc" }, { downvotes: "asc" }],
    take: TOP_N_PROMOTE,
  });

  if (top.length === 0) {
    console.log("No suggestions to promote this month");
    return;
  }

  const maxItem = await prisma.listItem.findFirst({
    orderBy: { sortOrder: "desc" },
  });
  const startOrder = (maxItem?.sortOrder ?? HARDCODED_LIST_SIZE) + 1;

  await prisma.listItem.createMany({
    data: top.map((s, i) => ({ text: s.text, sortOrder: startOrder + i })),
  });

  await prisma.suggestion.deleteMany({
    where: { id: { in: top.map((s) => s.id) } },
  });

  console.log(`Promoted ${top.length} suggestions: ${top.map((s) => s.text).join(", ")}`);
}

app.prepare().then(() => {
  // Runs at 23:59 every night; promotes if it's the last day of the month
  cron.schedule("59 23 * * *", async () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getMonth() !== now.getMonth()) {
      console.log("End of month — promoting top suggestions");
      await promoteTopSuggestions();
    }
  });

  createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true);
    await handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
