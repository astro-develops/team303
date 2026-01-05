import { getRobotsByYear } from "./getRobotsByYear";

let VALID_YEARS: number[] = [];

const skipYears = [2021];

for (let i = 1999; i <= new Date().getFullYear(); i++) {
    for (let j = 0; j < skipYears.length; j++) {
        if (i !== skipYears[j]) {
            VALID_YEARS.push(i);
        };
    }
}

// Cache each year individually
const YEAR_CACHE: Record<number, any> = {};
const YEAR_CACHE_TIME: Record<number, number> = {};
const CACHE_LIFETIME = 1000 * 60 * 5; // 5 minutes

export async function getAllRobots() {
  const now = Date.now();

  // Fetch all years concurrently, but use per-year cache
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

  // newest first
  return results.sort((a, b) => b.year - a.year);
}
