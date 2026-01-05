import { NextResponse } from "next/server";
import { getAllRobotsBasic } from "@/lib/tba/getRobotsByYearBasic";

export async function GET() {
  const data = await getAllRobotsBasic();
  return NextResponse.json(data);
}
