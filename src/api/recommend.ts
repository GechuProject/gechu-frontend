import { apiClient } from "@/src/lib/api";
import type { GameCardItem } from "@/src/mocks/data/games";

export async function fetchTop5Games(): Promise<GameCardItem[]> {
  const { data } = await apiClient.get<GameCardItem[]>(
    "/api/recommend/top5-games"
  );
  return data;
}

export async function fetchRecentGames(): Promise<GameCardItem[]> {
  const { data } = await apiClient.get<GameCardItem[]>(
    "/api/recommend/recent-games"
  );
  return data;
}

export async function fetchAiPickGames(): Promise<GameCardItem[]> {
  const { data } = await apiClient.get<GameCardItem[]>(
    "/api/recommend/ai-pick-games"
  );
  return data;
}
