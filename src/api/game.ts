import { apiClient } from "@/src/lib/api";
import type { GameDetailItem } from "@/src/mocks/data/games";

export async function fetchGameDetail(id: number): Promise<GameDetailItem> {
  const { data } = await apiClient.get<GameDetailItem>(`/api/game/${id}`);
  return data;
}
