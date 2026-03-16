import { apiClient } from "@/src/lib/api";
import type { GameCardItem } from "@/src/mocks/data/games";

// 백엔드 게임 목록 아이템 타입
interface BackendGameListItem {
  id: number;
  slug: string;
  name: string;
  released: string;
  thumbnail_img_url: string;
  rawg_rating: number;
  rawg_ratings_count: number;
  metacritic: number;
  genres: { id: number; name: string; slug: string }[];
  platforms: { id: number; name: string }[];
  tags: { id: number; name: string }[];
}

// 백엔드 게임 목록 응답 타입 (페이지네이션)
interface BackendGameListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BackendGameListItem[];
}

// 백엔드 장르 타입
export interface Genre {
  id: number;
  name: string;
  slug: string;
}

// 백엔드 응답 → GameCardItem 변환
function mapToGameCardItem(item: BackendGameListItem): GameCardItem {
  return {
    id: item.id,
    title: item.name,
    image: item.thumbnail_img_url ?? "",
    price: "정보 없음",
    rating: item.rawg_rating ?? 0,
    genre: item.genres?.map((g) => g.name).join(", ") ?? "",
  };
}

// 게임 목록 조회 (범용)
export async function fetchGames(params: {
  genre_ids?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
  platform_ids?: string;
  tag_ids?: string;
  esrb_rating?: string;
}): Promise<{ count: number; results: GameCardItem[] }> {
  const { data } = await apiClient.get<BackendGameListResponse>(
    "/api/v1/games/",
    { params }
  );
  return {
    count: data.count,
    results: data.results.map(mapToGameCardItem),
  };
}

// 백엔드 장르 API 응답 타입 (페이지네이션)
interface BackendGenreResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Genre[];
}

// 전체 장르 목록 조회
export async function fetchGenres(): Promise<Genre[]> {
  const { data } = await apiClient.get<BackendGenreResponse>(
    "/api/v1/games/genres/"
  );
  return data.results || [];
}

// 백엔드 플랫폼 응답 타입
export interface Platform {
  id: number;
  name: string;
  slug: string;
  icon_url: string;
}

interface BackendPlatformResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Platform[];
}

// 전체 플랫폼 목록 조회
export async function fetchPlatforms(): Promise<Platform[]> {
  const { data } = await apiClient.get<BackendPlatformResponse>(
    "/api/v1/games/platforms/"
  );
  return data.results || [];
}

// 액션 게임 Top 10 (genre_ids 기반)
export async function fetchActionGames(
  actionGenreId: number
): Promise<GameCardItem[]> {
  const { results } = await fetchGames({
    ...(actionGenreId > 0 && { genre_ids: String(actionGenreId) }),
    ordering: "-rawg_rating",
    page_size: 10,
  });
  return results;
}

// RPG 게임 Top 10 (genre_ids 기반)
export async function fetchRpgGames(
  rpgGenreId: number
): Promise<GameCardItem[]> {
  const { results } = await fetchGames({
    ...(rpgGenreId > 0 && { genre_ids: String(rpgGenreId) }),
    ordering: "-rawg_rating",
    page_size: 10,
  });
  return results;
}
