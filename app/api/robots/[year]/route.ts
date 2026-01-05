import { NextResponse } from "next/server";
import { getRobotsByYear } from "@/lib/tba/getRobotsByYear";

let YEAR_CACHE: Record<number, any> = {};

export async function GET(req: Request, { params }: { params: { year: string } }) {
  const yearNum = parseInt(params.year, 10);
  if (!yearNum) return NextResponse.json({ error: "Invalid year" });

  if (YEAR_CACHE[yearNum]) return NextResponse.json(YEAR_CACHE[yearNum]);

  const data = await getRobotsByYear(yearNum);
  YEAR_CACHE[yearNum] = data;

  return NextResponse.json(data);
}
