import { headers } from "./getRobotsByYear";
import { formatEventStatus } from "./formatEventStatus";

// simple in-memory cache per event
const EVENT_CACHE: Record<string, any> = {};
const CACHE_LIFETIME = 1000 * 60 * 10; // 10 minutes

export async function getEventDetails(eventKey: string) {
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

    const matches = matchesRes.ok ? await matchesRes.json() : [];
    const rankings = rankingsRes.ok ? await rankingsRes.json() : null;
    const awards = awardsRes.ok ? await awardsRes.json() : [];

    // rank
    let rank = null;
    let totalTeams = null;

    if (rankings && rankings.rankings) {
      const teamRanking = rankings.rankings.find((r: any) => r.team_key === "frc303");
      if (teamRanking) {
        rank = teamRanking.rank;
        totalTeams = rankings.rankings.length;
      }
    }

    // wins/losses
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

    const data = {
      rank,
      totalTeams,
      wins,
      losses,
      ties: 0,
      awards: awards.map((a: any) => a.name),
      overall_status: formatEventStatus(rank, wins, losses),
    };

    EVENT_CACHE[eventKey] = { data, time: now };
    return data;
  } catch (err) {
    console.error("Error fetching event details for", eventKey, err);
    return {
      rank: null,
      totalTeams: null,
      wins: 0,
      losses: 0,
      ties: 0,
      awards: [],
      overall_status: "Data not available",
    };
  }
}
