import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const uploads = await prisma.uploadedData.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return NextResponse.json({ uploads });
}

