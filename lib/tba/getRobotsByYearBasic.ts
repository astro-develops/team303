export interface RobotBasic {
  year: number;
  robotImage: string;
  totalWins: number;
  totalLosses: number;
}

export const VALID_YEARS: number[] = [
  1998, 1999, 2000, 2001, 2002, 2003, 2004,
  2005, 2006, 2007, 2008, 2009, 2010,
  2011, 2012, 2013, 2014, 2015, 2016,
  2017, 2018, 2019, 2020, // no 2021 season
  2022, 2023, 2024, 2025
];

// Replace 'any' with the array interface
let BASIC_CACHE: RobotBasic[] | null = null;
let CACHE_TIME = 0;
const CACHE_LIFETIME = 1000 * 60 * 5; // 5 min

export async function getAllRobotsBasic(): Promise<RobotBasic[]> {
  const now = Date.now();
  
  // TypeScript now knows BASIC_CACHE is RobotBasic[] | null
  if (BASIC_CACHE && now - CACHE_TIME < CACHE_LIFETIME) {
    return BASIC_CACHE;
  }

  const data: RobotBasic[] = VALID_YEARS.map((y) => ({
    year: y,
    robotImage: `/robots/${y}.png`,
    totalWins: 0,
    totalLosses: 0,
  }));

  BASIC_CACHE = data;
  CACHE_TIME = now;
  return data;
}