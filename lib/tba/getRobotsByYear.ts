// src/lib/tba/getRobotsByYear.ts
import { formatEventStatus } from "./formatEventStatus";

export const headers = {
  "X-TBA-Auth-Key": process.env.TBA_KEY!,
};

// ---- TypeScript interfaces ----
export interface TBAEvent {
  key: string;
  name: string;
  start_date: string;
  num_teams?: number;
}

export interface TBAAward {
  name: string;
}

export interface TBARanking {
  team_key: string;
  rank: number;
}

export interface TBARankingsResponse {
  rankings: TBARanking[];
}

export interface TBAMatch {
  alliances?: {
    red: { team_keys: string[] };
    blue: { team_keys: string[] };
  };
  // Updated type to include "" and null to prevent "no overlap" errors
  winning_alliance?: "red" | "blue" | "" | null;
}

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
  start_date: string;
}

export interface RobotYear {
  year: number;
  robotImage: string;
  totalWins: number;
  totalLosses: number;
  events: RobotEvent[];
}

// ---- Main function ----
export async function getRobotsByYear(year: number): Promise<RobotYear> {
  try {
    // 1️⃣ Fetch all events for this year
    const eventsRes = await fetch(
      `https://www.thebluealliance.com/api/v3/team/frc303/events/${year}`,
      { headers, cache: "no-store" }
    );

    if (!eventsRes.ok) {
      return {
        year,
        events: [],
        robotImage: `/robots/${year}.png`,
        totalWins: 0,
        totalLosses: 0,
      };
    }

    const events: TBAEvent[] = await eventsRes.json();

    // 2️⃣ Fetch data for each event concurrently
    const eventData: RobotEvent[] = await Promise.all(
      events.map(async (ev) => {
        const eventKey = ev.key;

        const [matchesRes, rankingsRes, awardsRes] = await Promise.all([
          fetch(
            `https://www.thebluealliance.com/api/v3/team/frc303/event/${eventKey}/matches`,
            { headers, cache: "no-store" }
          ),
          fetch(
            `https://www.thebluealliance.com/api/v3/event/${eventKey}/rankings`,
            { headers, cache: "no-store" }
          ),
          fetch(
            `https://www.thebluealliance.com/api/v3/team/frc303/event/${eventKey}/awards`,
            { headers, cache: "no-store" }
          ),
        ]);

        const matches: TBAMatch[] = matchesRes.ok ? await matchesRes.json() : [];
        const rankings: TBARankingsResponse | null = rankingsRes.ok
          ? await rankingsRes.json()
          : null;
        const awards: TBAAward[] = awardsRes.ok ? await awardsRes.json() : [];

        // ---- compute rank ----
        let rank: number | null = null;
        let totalTeams: number | null = ev.num_teams ?? null;

        if (rankings?.rankings) {
          const teamRanking = rankings.rankings.find((r) => r.team_key === "frc303");
          if (teamRanking) {
            rank = teamRanking.rank;
            totalTeams = rankings.rankings.length;
          }
        }

        // ---- compute record from matches ----
        let wins = 0;
        let losses = 0;

        for (const m of matches) {
          // Guard against incomplete match data
          if (!m.alliances?.red || !m.alliances?.blue) continue;

          const isRed = m.alliances.red.team_keys.includes("frc303");
          const isBlue = m.alliances.blue.team_keys.includes("frc303");
          
          // Skip matches where we didn't play
          if (!isRed && !isBlue) continue;

          const winning = m.winning_alliance;

          // Win condition
          if ((winning === "red" && isRed) || (winning === "blue" && isBlue)) {
            wins++;
          } 
          // Loss condition: A winner exists, but it's not us
          // (winning is "red" or "blue" but the previous "if" was false)
          else if (winning === "red" || winning === "blue") {
            losses++;
          }
        }

        return {
          eventName: ev.name ?? eventKey,
          eventKey,
          rank,
          totalTeams,
          wins,
          losses,
          ties: 0,
          awards: awards.map((a) => a.name),
          overall_status: formatEventStatus(rank, wins, losses),
          start_date: ev.start_date,
        };
      })
    );

    // ---- Sort events by date (oldest → newest) ----
    eventData.sort(
      (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    );

    const totalWins = eventData.reduce((acc, curr) => acc + curr.wins, 0);
    const totalLosses = eventData.reduce((acc, curr) => acc + curr.losses, 0);

    return {
      year,
      robotImage: `/robots/${year}.png`,
      totalWins,
      totalLosses,
      events: eventData,
    };
  } catch (err) {
    console.error("Error fetching robots for year", year, err);
    return {
      year,
      robotImage: `/robots/${year}.png`,
      totalWins: 0,
      totalLosses: 0,
      events: [],
    };
  }
}