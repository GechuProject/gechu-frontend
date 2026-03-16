import { authApiClient, apiClient } from "@/src/lib/api";

export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  birth_date: string;
  profile_img_url: string;
  is_adult_verified: boolean;
  adult_verified_at: string;
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
    const { data } = await apiClient.get<RecommendedGamesResponse>(
      "/api/v1/preferences/me/recommendations/"
    );
    return data;
  } catch {
    return null;
  }
}
