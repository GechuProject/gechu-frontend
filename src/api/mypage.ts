import { apiClient } from "@/src/lib/api";

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
    const { data } = await apiClient.get<UserProfile>("/api/v1/users/me/");
    return data;
  } catch {
    return null;
  }
}

export interface PreferencesBody {
  genres: { id: number; name: string }[];
  platforms: { id: number; name: string }[];
  tags: { id: number; name: string }[];
}

export interface PreferencesResponse {
  genres: { id: number; name: string }[];
  platforms: { id: number; name: string }[];
  tags: { id: number; name: string }[];
}

export async function putPreferences(
  body: PreferencesBody
): Promise<PreferencesResponse> {
  const { data } = await apiClient.put<PreferencesResponse>(
    "/api/mypage/preferences",
    body
  );
  return data;
}

export async function deleteWishlistItem(id: number): Promise<void> {
  await apiClient.delete(`/api/wishlist/${id}`);
}
