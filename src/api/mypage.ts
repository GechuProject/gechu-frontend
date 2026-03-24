import type { AxiosError } from "axios";
import { authApiClient } from "@/src/lib/api";
import { getLoginMethod } from "@/src/lib/loginMethod";

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
  /** false면 소셜 전용 등 비밀번호 없음 — 프로필 수정 시 현재 비밀번호 확인 생략 */
  has_usable_password?: boolean;
  /** 예: kakao, discord, email — 백엔드 명세에 맞게 */
  auth_provider?: string | null;
}

/**
 * 소셜 전용(비밀번호 없음)이면 프로필 수정 전 비밀번호 확인 단계 생략
 * - API: has_usable_password / auth_provider 우선
 * - 없으면 마지막 로그인 방식(localStorage)으로 추정
 */
export function shouldSkipPasswordVerification(
  profile: UserProfile | null
): boolean {
  if (!profile) return false;
  if (profile.has_usable_password === true) return false;
  if (profile.has_usable_password === false) return true;
  const prov = profile.auth_provider?.toLowerCase();
  if (prov === "kakao" || prov === "discord") return true;
  if (getLoginMethod() === "oauth") return true;
  return false;
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

/**
 * Swagger: `v1_users_me_destroy` — DELETE `/api/v1/users/me/`
 * HttpOnly access_token 쿠키 + unsafe 요청 시 `X-CSRFToken` (authApiClient 인터셉터)
 * @see https://d2c8om11rax5nb.cloudfront.net/api/schema/swagger-ui/#/Users/v1_users_me_destroy
 */
export interface DeleteAccountSuccessResponse {
  message: string;
}

/** 401 UNAUTHORIZED / ACCOUNT_DEACTIVATED, 403 CSRF_FAILED 등 */
export interface ApiStandardErrorBody {
  status_code?: number;
  code?: string;
  message?: string;
}

export async function deleteAccount(): Promise<DeleteAccountSuccessResponse> {
  const { data } =
    await authApiClient.delete<DeleteAccountSuccessResponse>(
      "/api/v1/users/me/"
    );
  return data ?? { message: "" };
}

/** Axios 응답 — `message`(명세) 또는 DRF `detail` */
export function getApiErrorMessage(err: unknown): string {
  const ax = err as AxiosError<
    ApiStandardErrorBody & { detail?: string | string[] }
  >;
  const d = ax.response?.data;
  if (d && typeof d === "object") {
    if (typeof d.message === "string" && d.message.trim()) return d.message;
    if (typeof d.detail === "string") return d.detail;
    if (Array.isArray(d.detail)) return d.detail.map(String).join(" ");
  }
  if (ax.message) return ax.message;
  return "요청에 실패했습니다.";
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
