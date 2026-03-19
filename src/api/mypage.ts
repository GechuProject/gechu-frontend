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

// 프로필 이미지 업로드 URL 발급
export interface ProfileImageUploadRequest {
  file_name: string;
  content_type: string;
  file_size: number;
}

export interface ProfileImageUploadResponse {
  upload_url: string;
  profile_img_url: string;
}

export async function requestProfileImageUpload(
  body: ProfileImageUploadRequest
): Promise<ProfileImageUploadResponse> {
  const { data } = await authApiClient.put<ProfileImageUploadResponse>(
    "/api/v1/users/me/profile-image/",
    body
  );
  return data;
}

// presigned URL로 이미지 파일 업로드
export async function uploadImageToPresignedUrl(
  uploadUrl: string,
  file: File
): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("S3 Upload Error:", res.status, errText);
    throw new Error(`S3 업로드 실패 (${res.status}): ${errText}`);
  }
}
