import { apiClient } from "@/src/lib/api";
import type { GameCardItem } from "@/src/mocks/data";

export async function fetchActionGames(): Promise<GameCardItem[]> {
  const { data } = await apiClient.get<GameCardItem[]>(
    "/api/home/action-games"
  );
  return data;
}

export async function fetchRpgGames(): Promise<GameCardItem[]> {
  const { data } = await apiClient.get<GameCardItem[]>("/api/home/rpg-games");
  return data;
}
