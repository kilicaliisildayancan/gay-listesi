import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const suggestions = await prisma.suggestion.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(suggestions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const suggestion = await prisma.suggestion.create({ data: { text: text.trim() } });
    return NextResponse.json(suggestion, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create suggestion" }, { status: 500 });
  }
}
