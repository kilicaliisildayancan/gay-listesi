import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string; action: string }> }
) {
  const { id, action } = await params;

  if (action !== "upvote" && action !== "downvote") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  try {
    const suggestion = await prisma.suggestion.update({
      where: { id },
      data:
        action === "upvote"
          ? { upvotes: { increment: 1 } }
          : { downvotes: { increment: 1 } },
    });
    return NextResponse.json(suggestion);
  } catch {
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}
