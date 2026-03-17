import { apiClient } from "@/src/lib/api";
import type { GameCardItem } from "@/src/mocks/data/games";

// 추천 게임 아이템 (GET /api/v1/recommendations/ results 배열 요소)
export interface RecommendationItem {
  rank: number;
  score: string; // e.g. "8.155"
  reason: string;
  game: {
    id: number;
    name: string;
    slug: string;
    thumbnail_img_url: string | null;
    rawg_rating: string;
    genres: { id: number; name: string }[];
  };
}

// 추천 목록 응답
export interface RecommendationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RecommendationItem[];
}

// 추천 데이터 미준비 응답 (202)
export interface RecommendationNotReady {
  status_code: 202;
  code: "RECOMMENDATION_NOT_READY";
  message: string;
}

// 추천 생성 상태 응답
export interface RecommendationStatus {
  status: "pending" | "completed" | "failed";
  generation_version: number;
  generated_at: string;
  expires_at: string;
}

// recommendation → GameCardItem 변환
function mapRecommendToGameCard(item: RecommendationItem): GameCardItem {
  return {
    id: item.game.id,
    title: item.game.name,
    image: item.game.thumbnail_img_url ?? "",
    rating: parseFloat(item.game.rawg_rating) || 0,
    genre: item.game.genres?.map((g) => g.name).join(", ") ?? "",
    price: "",
  };
}

/**
 * 개인화 게임 추천 목록 조회
 * - 추천 데이터 준비 중이면 202 응답 → null 반환
 * - 완료 시 GameCardItem[] 반환
 */
export async function fetchRecommendations(params?: {
  type?: "hybrid" | "preference" | "similarity";
  page?: number;
  page_size?: number;
}): Promise<GameCardItem[] | null> {
  try {
    const { data, status } = await apiClient.get<
      RecommendationResponse | RecommendationNotReady
    >("/api/v1/recommendations/", { params });

    if (status === 202 || "code" in data) {
      // 추천 데이터 준비 중
      return null;
    }

    return (data as RecommendationResponse).results.map(mapRecommendToGameCard);
  } catch (err: unknown) {
    // axios는 2xx가 아닌 경우 에러를 throw하지만,
    // 202는 성공 범위이므로 위 분기에서 처리됨
    throw err;
  }
}

/**
 * 추천 생성 상태 조회
 */
export async function fetchRecommendationStatus(): Promise<RecommendationStatus> {
  const { data } = await apiClient.get<RecommendationStatus>(
    "/api/v1/recommendations/status/"
  );
  return data;
}

// ─── 하위 호환 래퍼 (추천 페이지 기존 섹션 구조 유지용) ─────────────

/** AI 추천 게임 목록 (type=hybrid) */
export async function fetchAiPickGames(): Promise<GameCardItem[]> {
  const result = await fetchRecommendations({ type: "hybrid", page_size: 10 });
  return result ?? [];
}

/** 취향 기반 추천 (type=preference) */
export async function fetchPreferenceGames(): Promise<GameCardItem[]> {
  const result = await fetchRecommendations({
    type: "preference",
    page_size: 10,
  });
  return result ?? [];
}

/** 유사도 기반 추천 (type=similarity) */
export async function fetchSimilarityGames(): Promise<GameCardItem[]> {
  const result = await fetchRecommendations({
    type: "similarity",
    page_size: 10,
  });
  return result ?? [];
}
