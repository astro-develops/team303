// src/lib/tba/getEventDetails.ts
import { headers, RobotEvent, TBARankingsResponse, TBAMatch, TBAAward } from "./getRobotsByYear";
import { formatEventStatus } from "./formatEventStatus";

interface EventCacheEntry {
  data: RobotEvent;
  time: number;
}

const EVENT_CACHE: Record<string, EventCacheEntry> = {};
const CACHE_LIFETIME = 1000 * 60 * 10;

export async function getEventDetails(eventKey: string): Promise<RobotEvent> {
  const now = Date.now();
  if (EVENT_CACHE[eventKey] && now - EVENT_CACHE[eventKey].time < CACHE_LIFETIME) {
    return EVENT_CACHE[eventKey].data;
  }

  try {
    const [matchesRes, rankingsRes, awardsRes] = await Promise.all([
      fetch(`https://www.thebluealliance.com/api/v3/team/frc303/event/${eventKey}/matches`, { headers }),
      fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/rankings`, { headers }),
      fetch(`https://www.thebluealliance.com/api/v3/team/frc303/event/${eventKey}/awards`, { headers }),
    ]);

    const matches: TBAMatch[] = matchesRes.ok ? await matchesRes.json() : [];
    const rankings: TBARankingsResponse | null = rankingsRes.ok ? await rankingsRes.json() : null;
    const awards: TBAAward[] = awardsRes.ok ? await awardsRes.json() : [];

    let rank = null;
    let totalTeams = null;

    if (rankings?.rankings) {
      const teamRanking = rankings.rankings.find((r) => r.team_key === "frc303");
      if (teamRanking) {
        rank = teamRanking.rank;
        totalTeams = rankings.rankings.length;
      }
    }

    let wins = 0;
    let losses = 0;
    for (const m of matches) {
      if (!m.alliances) continue;
      const isRed = m.alliances.red.team_keys.includes("frc303");
      const isBlue = m.alliances.blue.team_keys.includes("frc303");
      if (!isRed && !isBlue) continue;
      const winning = m.winning_alliance;
      if ((winning === "red" && isRed) || (winning === "blue" && isBlue)) wins++;
      else if (winning && winning !== "") losses++;
    }

    const data: RobotEvent = {
      eventName: eventKey, // TBA details fetch usually requires a separate event call for the name
      eventKey,
      rank,
      totalTeams,
      wins,
      losses,
      ties: 0,
      awards: awards.map((a) => a.name),
      overall_status: formatEventStatus(rank, wins, losses),
      start_date: "", // Placeholder as this specific endpoint doesn't return it
    };

    EVENT_CACHE[eventKey] = { data, time: now };
    return data;
  } catch (err) {
    return {
      eventName: "Unknown",
      eventKey,
      rank: null,
      totalTeams: null,
      wins: 0,
      losses: 0,
      ties: 0,
      awards: [],
      overall_status: "Data not available",
      start_date: "",
    };
  }
}