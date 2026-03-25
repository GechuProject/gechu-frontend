import { authApiClient } from "@/src/lib/api";

export interface DashboardSummary {
  total_users: number;
  active_users: number;
  recommendation_jobs_today: number;
  failed_jobs: number;
}

// 대시 보드 목록
export async function fetchAdminDashboard(): Promise<DashboardSummary | null> {
  try {
    const { data } = await authApiClient.get<DashboardSummary>(
      "/api/v1/admin/users/dashboard/"
    );
    return data;
  } catch {
    return null;
  }
}

export interface AdminUser {
  id: number;
  email: string;
  nickname: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_adult_verified: boolean;
  deleted_at: string | null;
  created_at: string;
}

export interface AdminUsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminUser[];
}
// 유저 목록
export async function fetchAdminUsers(
  page: number = 1
): Promise<AdminUsersResponse | null> {
  try {
    const { data } = await authApiClient.get<AdminUsersResponse>(
      "/api/v1/admin/users/",
      {
        params: { page },
      }
    );
    return data;
  } catch {
    return null;
  }
}

// 유저 상태 변경
export async function toggleAdminUserActiveStatus(
  userId: number,
  is_active: boolean
): Promise<boolean> {
  try {
    const { status } = await authApiClient.patch(
      `/api/v1/admin/users/${userId}/`,
      { is_active }
    );
    return status === 200 || status === 204 || status === 202;
  } catch (error) {
    console.error("유저 상태 변경 실패:", error);
    return false;
  }
}

export interface AdminUserDetail {
  id: number;
  email: string;
  nickname: string;
  birth_date: string | null;
  profile_img_url: string | null;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_adult_verified: boolean;
  adult_verified_at: string | null;
  adult_verification_expires_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

// 유저 상세 정보
export async function fetchAdminUserDetail(
  userId: number
): Promise<AdminUserDetail | null> {
  try {
    const { data } = await authApiClient.get<AdminUserDetail>(
      `/api/v1/admin/users/${userId}/`
    );
    return data;
  } catch {
    return null;
  }
}

// 유저 활동 로그 모음
export interface AdminUserInteraction {
  type: string;
  game_id: number;
  created_at: string;
}

export interface AdminUserInteractionsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminUserInteraction[];
}

export async function fetchAdminUserInteractions(
  userId: number,
  page: number = 1
): Promise<AdminUserInteractionsResponse | null> {
  try {
    const { data } = await authApiClient.get<AdminUserInteractionsResponse>(
      `/api/v1/admin/users/${userId}/interactions/`,
      { params: { page } }
    );
    return data;
  } catch {
    return null;
  }
}

// 유저 추천 결과
export interface AdminUserRecommendation {
  game_id: number;
  score: string;
}

export interface AdminUserRecommendationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminUserRecommendation[];
}

export async function fetchAdminUserRecommendations(
  userId: number,
  page: number = 1
): Promise<AdminUserRecommendationsResponse | null> {
  try {
    const { data } = await authApiClient.get<AdminUserRecommendationsResponse>(
      `/api/v1/admin/users/${userId}/recommendations/`,
      { params: { page } }
    );
    return data;
  } catch {
    return null;
  }
}
