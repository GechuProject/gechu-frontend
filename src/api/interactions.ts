import { apiClient } from "@/src/lib/api";

// ────────────────────────────────────────────────────────────
// 좋아요 관련
// PATCH /api/v1/preferences/games/{game_id}/
// reaction: "like" | "dislike" | "neutral"
// ────────────────────────────────────────────────────────────

interface PreferenceResponse {
  game_id: number;
  is_saved: boolean;
  reaction: string;
  updated_at: string;
}

/**
 * 게임 좋아요 토글
 * PATCH /api/v1/preferences/games/{gameId}/
 * - 현재 liked → reaction: "neutral" (취소)
 * - 현재 not liked → reaction: "like"
 */
export async function toggleLike(
  gameId: number,
  currentlyLiked: boolean
): Promise<boolean | null> {
  try {
    const { data } = await apiClient.patch<PreferenceResponse>(
      `/api/v1/preferences/games/${gameId}/`,
      {
        reaction: currentlyLiked ? "neutral" : "like",
        is_saved: !currentlyLiked,
      }
    );
    return data.reaction === "like";
  } catch {
    return null;
  }
}

// ────────────────────────────────────────────────────────────
// 게임 조회 행동 기록 요청 타입
interface RecordViewParams {
  game_id: number;
  source: "direct" | "recommendation" | "search" | "similar" | "home" | string;
  metadata?: Record<string, unknown>;
}

// 게임 조회 행동 기록 응답 타입
interface InteractionViewResponse {
  id: number;
  type: string;
  logged_at: string;
}

/**
 * 게임 조회(view) 행동을 기록합니다.
 * - 최초 기록 시: 201 (새 로그 생성)
 * - 같은 source에서 중복 조회 시: 200 (기존 로그 갱신)
 * - 401: 비로그인 사용자 (오류 무시)
 */
export async function recordGameView(
  params: RecordViewParams
): Promise<InteractionViewResponse | null> {
  try {
    const formData = new FormData();
    formData.append("game_id", String(params.game_id));
    formData.append("source", params.source);
    if (params.metadata) {
      formData.append("metadata", JSON.stringify(params.metadata));
    }

    const { data } = await apiClient.post<InteractionViewResponse>(
      "/api/v1/interactions/view/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error: unknown) {
    // 401 (비로그인) 등은 조용히 무시
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as { response?: { status?: number } }).response?.status === 401
    ) {
      return null;
    }
    console.error("게임 조회 기록 실패:", error);
    return null;
  }
}
