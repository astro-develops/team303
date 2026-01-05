// src/lib/tba/getAllRobots.ts
import { getRobotsByYear, RobotYear } from "./getRobotsByYear";

const skipYears = [2021];
const VALID_YEARS: number[] = [];

for (let i = 1999; i <= new Date().getFullYear(); i++) {
  if (!skipYears.includes(i)) {
    VALID_YEARS.push(i);
  }
}

const YEAR_CACHE: Record<number, RobotYear> = {};
const YEAR_CACHE_TIME: Record<number, number> = {};
const CACHE_LIFETIME = 1000 * 60 * 5;

export async function getAllRobots(): Promise<RobotYear[]> {
  const now = Date.now();

  const results = await Promise.all(
    VALID_YEARS.map(async (y) => {
      if (YEAR_CACHE[y] && now - YEAR_CACHE_TIME[y] < CACHE_LIFETIME) {
        return YEAR_CACHE[y];
      }

      const data = await getRobotsByYear(y);
      YEAR_CACHE[y] = data;
      YEAR_CACHE_TIME[y] = now;
      return data;
    })
  );

  return results.sort((a, b) => b.year - a.year);
}