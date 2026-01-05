// src/app/api/robots/all/route.ts
import { NextResponse } from "next/server";
import { getAllRobots } from "@/lib/tba/getAllRobots";

export async function GET() {
  const data = await getAllRobots();
  return NextResponse.json(data);
}
