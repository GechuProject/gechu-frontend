import { authApiClient } from "@/src/lib/api";

/** GET /api/v1/users/me/ - API 명세 UserMeResponse와 동일 */
export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  birth_date: string;
  profile_img_url: string | null;
  is_adult_verified: boolean;
  adult_verified_at: string | null;
  is_active: boolean;
  created_at: string;
}

export async function fetchUserProfile(): Promise<UserProfile | null> {
  try {
    const { data } = await authApiClient.get<UserProfile>("/api/v1/users/me/");
    return data;
  } catch {
    return null;
  }
}

/** 비밀번호 확인 (쿠키 세션) */
export async function verifyCurrentPassword(
  password: string
): Promise<boolean> {
  try {
    await authApiClient.post("/api/v1/users/me/verify-password/", {
      password,
    });
    return true;
  } catch {
    return false;
  }
}

export interface PatchUserProfilePayload {
  nickname: string;
  birth_date: string;
  new_password?: string;
}

/** 내 정보 수정 PATCH /api/v1/users/me/ */
export async function patchUserProfile(
  payload: PatchUserProfilePayload
): Promise<boolean> {
  try {
    const { status } = await authApiClient.patch("/api/v1/users/me/", payload);
    return status === 200 || status === 204;
  } catch {
    return false;
  }
}

export interface PreferencesBody {
  genre_ids: number[];
  platform_ids: number[];
  tag_ids: number[];
}

export interface PreferencesResponse {
  genres: { id: number; name: string }[];
  platforms: { id: number; name: string }[];
  tags: { id: number; name: string }[];
}

export async function fetchPreferences(): Promise<PreferencesResponse | null> {
  try {
    const { data } = await authApiClient.get<PreferencesResponse>(
      "/api/v1/preferences/me/"
    );
    return data;
  } catch {
    return null;
  }
}

export async function putPreferences(
  body: PreferencesBody
): Promise<PreferencesResponse> {
  const { data } = await authApiClient.put<PreferencesResponse>(
    "/api/v1/preferences/me/",
    body
  );
  return data;
}

export async function deleteWishlistItem(id: number): Promise<void> {
  await authApiClient.delete(`/api/wishlist/${id}`);
}

export interface RecommendedGame {
  id: number;
  name: string;
  is_saved: boolean;
  like_state: number;
  preference_score: number;
  last_interacted_at: string;
}

export interface RecommendedGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RecommendedGame[];
}

export async function fetchRecommendedGames(): Promise<RecommendedGamesResponse | null> {
  try {
    const { data } = await authApiClient.get<RecommendedGamesResponse>(
      "/api/v1/preferences/me/game-affinities/"
    );
    return data;
  } catch {
    return null;
  }
}

/** GET /api/v1/preferences/me/saved-games/ - 위시리스트(찜한 게임) 목록 */
export interface SavedGame {
  id: number;
  name: string;
  slug: string;
  thumbnail_img_url: string;
  rawg_rating: number;
  saved_at: string;
}

export interface SavedGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SavedGame[];
}

export async function fetchSavedGames(): Promise<SavedGamesResponse | null> {
  try {
    const { data } = await authApiClient.get<SavedGamesResponse>(
      "/api/v1/preferences/me/saved-games/"
    );
    return data;
  } catch {
    return null;
  }
}

// 프로필 이미지 업로드 (multipart/form-data)
export async function uploadProfileImage(file: File): Promise<void> {
  const formData = new FormData();
  formData.append("image", file);

  await authApiClient.put("/api/v1/users/me/profile-image/", formData);
}

// 프로필 이미지 삭제
export async function deleteProfileImage(): Promise<void> {
  await authApiClient.delete("/api/v1/users/me/profile-image/");
}

// 성인인증 콜백 처리
export async function callbackAdultVerification(
  code: string,
  state: string
): Promise<boolean> {
  try {
    const { status } = await authApiClient.get(
      "/api/v1/users/me/adult-verifications/callback/",
      {
        params: { code, state },
      }
    );
    return status === 200 || status === 204;
  } catch (error) {
    console.error("Adult verification callback error:", error);
    return false;
  }
}

// 성인인증 시작 (리다이렉트 URL 반환 또는 Axios에 의해 리다이렉트 수행)
export async function initiateAdultVerification(): Promise<void> {
  try {
    const { data, request } = await authApiClient.get(
      "/api/v1/users/me/adult-verifications/initiate/"
    );

    // 백엔드가 JSON으로 줬을 경우 처리
    if (data && typeof data.url === "string") {
      window.location.href = data.url;
    } else if (data && typeof data.redirect_url === "string") {
      window.location.href = data.redirect_url;
    } else if (request && request.responseURL) {
      // Axios가 302를 따라간 URL이 있다면 거기로 화면 이동
      window.location.href = request.responseURL;
    } else {
      // 그 외의 경우 (CORS에 안걸리고 HTML을 그대로 응답받았다면)
      console.warn(
        "Adult verification initiate returned unexpected data",
        data
      );
    }
  } catch (error) {
    console.error("Adult verification initiate error:", error);
    alert("성인인증 시작을 불러오는데 실패했습니다.");
  }
}
