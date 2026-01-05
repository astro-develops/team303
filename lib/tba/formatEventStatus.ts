// src/lib/tba/formatEventStatus.ts
export function formatEventStatus(rank: number | null, wins: number, losses: number): string {
  if (rank === null) return "No event data collected for this event";
  return `Team 303 was <b>Rank ${rank}</b> with a record of <b>${wins}-${losses}-0</b>`;
}
