import { NextResponse } from "next/server";
import { getRobotsByYear, RobotYear } from "@/lib/tba/getRobotsByYear";

const YEAR_CACHE: Record<number, RobotYear> = {};

// Use Promise<{ year: string }> for the params type
export async function GET(
  req: Request, 
  { params }: { params: Promise<{ year: string }> } 
) {
  // 1. Await the params object
  const { year } = await params;
  
  const yearNum = parseInt(year, 10);
  
  if (isNaN(yearNum)) {
    return NextResponse.json({ error: "Invalid year" }, { status: 400 });
  }

  // 2. Check Cache
  if (YEAR_CACHE[yearNum]) {
    return NextResponse.json(YEAR_CACHE[yearNum]);
  }

  try {
    const data = await getRobotsByYear(yearNum);
    
    // 3. Store in Cache
    YEAR_CACHE[yearNum] = data;

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching robot data for ${yearNum}:`, error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}