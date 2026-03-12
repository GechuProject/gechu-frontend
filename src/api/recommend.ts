import { GameCardItem } from "@/src/mocks/data/games";

export async function fetchTop5Games(): Promise<GameCardItem[]> {
  const res = await fetch("/api/recommend/top5");
  if (!res.ok) throw new Error("Failed to fetch top 5 games");
  return res.json();
}

export async function fetchRecentGames(): Promise<GameCardItem[]> {
  const res = await fetch("/api/recommend/recent");
  if (!res.ok) throw new Error("Failed to fetch recent games");
  return res.json();
}

export async function fetchAiPickGames(): Promise<GameCardItem[]> {
  const res = await fetch("/api/recommend/ai-pick");
  if (!res.ok) throw new Error("Failed to fetch AI pick games");
  return res.json();
}
