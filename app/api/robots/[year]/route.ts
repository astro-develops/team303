import { NextResponse } from "next/server";
import { getRobotsByYear, RobotYear } from "@/lib/tba/getRobotsByYear";

const YEAR_CACHE: Record<number, RobotYear> = {};

export async function GET(req: Request, { params }: { params: { year: string } }) {
  const yearNum = parseInt(params.year, 10);
  
  if (isNaN(yearNum)) {
    return NextResponse.json({ error: "Invalid year" }, { status: 400 });
  }

  if (YEAR_CACHE[yearNum]) {
    return NextResponse.json(YEAR_CACHE[yearNum]);
  }

  try {
    const data = await getRobotsByYear(yearNum);
    
    YEAR_CACHE[yearNum] = data;

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching robot data for ${yearNum}:`, error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}