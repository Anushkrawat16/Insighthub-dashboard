import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const insights = await prisma.aIInsightHistory.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return NextResponse.json({ insights });
}

