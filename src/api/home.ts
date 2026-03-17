import { apiClient } from "@/src/lib/api";
import type { GameCardItem } from "@/src/mocks/data/games";

// 백엔드 게임 목록 아이템 타입 (GET /api/v1/games/ 응답)
interface BackendGameListItem {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  thumbnail_img_url: string | null;
  rawg_rating: string; // "-" 또는 숫자 문자열 e.g. "4.5"
  rawg_ratings_count: number;
  genres: { id: number; name: string }[];
  platforms: { id: number; name: string }[];
  esrb_rating: string;
  age_rating_min: number;
}

// 백엔드 게임 목록 응답 타입 (페이지네이션)
interface BackendGameListResponse {
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
    price: "",
    rating: parseFloat(item.rawg_rating) || 0,
    genre: item.genres?.map((g) => g.name).join(", ") ?? "",
  };
}

// 게임 목록 쿼리 파라미터
export interface GameListParams {
  /** 장르 ID 리스트 (콤마 구분) e.g. "4" or "4,12" */
  genre_ids?: string;
  /** 플랫폼 ID 리스트 (콤마 구분) */
  platform_ids?: string;
  /** 태그 ID 리스트 (콤마 구분) */
  tag_ids?: string;
  /** 정렬 필드 e.g. "-rawg_rating" */
  ordering?: string;
  /** 게임 이름 검색 */
  search?: string;
  /** 페이지 번호 */
  page?: number;
  /** 페이지당 결과 수 (최대 100) */
  page_size?: number;
}

// 게임 목록 조회 (범용) - GameCardItem 배열 반환
export async function fetchGames(params: GameListParams): Promise<{
  next: string | null;
  previous: string | null;
  results: GameCardItem[];
}> {
  const { data } = await apiClient.get<BackendGameListResponse>(
    "/api/v1/games/",
    { params }
  );
  return {
    next: data.next,
    previous: data.previous,
    results: data.results.map(mapToGameCardItem),
  };
}

// 원본 응답 그대로 반환 (상세 타입 필요한 경우)
export async function fetchGameListRaw(
  params: GameListParams
): Promise<BackendGameListResponse> {
  const { data } = await apiClient.get<BackendGameListResponse>(
    "/api/v1/games/",
    { params }
  );
  return data;
}

// 백엔드 장르 API 응답 타입 (페이지네이션 없음)
interface BackendGenreResponse {
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

// 액션 게임 Top 10
// NOTE: genre_ids 파라미터가 백엔드 버그로 500 에러 발생 → 임시 제거
export async function fetchActionGames(
  _actionGenreId: number
): Promise<GameCardItem[]> {
  const { results } = await fetchGames({ page_size: 10 });
  return results;
}

// RPG 게임 Top 10
// NOTE: genre_ids 파라미터가 백엔드 버그로 500 에러 발생 → 임시 제거
export async function fetchRpgGames(
  _rpgGenreId: number
): Promise<GameCardItem[]> {
  const { results } = await fetchGames({ page_size: 10 });
  return results;
}
