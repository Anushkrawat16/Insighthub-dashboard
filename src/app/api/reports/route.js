import { NextResponse } from "next/server";

const sample = [
  { label: "North America", value: 320 },
  { label: "EMEA", value: 240 },
  { label: "APAC", value: 410 },
];

export async function GET() {
  return NextResponse.json({ reports: sample });
}

