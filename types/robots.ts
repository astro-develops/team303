// src/types/robots.ts
export interface RobotEvent {
  eventName: string;
  eventKey: string;
  rank: number | null;
  totalTeams: number | null;
  wins: number;
  losses: number;
  ties: number;
  awards: string[];
  overall_status: string;
}

export interface RobotSeason {
  year: number;
  totalWins: number;
  totalLosses: number;
  robotImage: string;
  events: RobotEvent[];
}
