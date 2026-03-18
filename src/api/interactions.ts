import { apiClient } from "@/src/lib/api";

// ────────────────────────────────────────────────────────────
// 좋아요 관련
// ────────────────────────────────────────────────────────────

interface PreferenceResponse {
  game_id: number;
  is_saved: boolean;
  reaction: string;
  updated_at: string;
}

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
// 게임 조회 행동 기록
// ────────────────────────────────────────────────────────────

interface RecordViewParams {
  game_id: number;
  source:
    | "detail_page"
    | "recommendation"
    | "search_result"
    | "saved_page"
    | "home"
    | string;
  metadata?: Record<string, unknown>;
}

interface InteractionViewResponse {
  id: number;
  type: string;
  logged_at: string;
}

/**
 * Axios 에러 타입 가드
 */
function isAxiosError(error: unknown): error is {
  response?: {
    status?: number;
    data?: unknown;
  };
} {
  return typeof error === "object" && error !== null && "response" in error;
}

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
    // 타입 가드 사용 (any 제거)
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        return null;
      }

      console.error("게임 조회 기록 실패:", error);
      if (error.response?.data) {
        console.error("백엔드 상세 에러:", error.response.data);
      }
    } else {
      console.error("알 수 없는 에러:", error);
    }

    return null;
  }
}
