import { authApiClient } from "@/src/lib/api";
import {
  ACCESS_TOKEN_KEY,
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/src/constants/auth";

export { ACCESS_TOKEN_KEY, getAccessToken, removeAccessToken, setAccessToken };

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginErrorResponse {
  status_code: string;
  code: string;
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export interface RefreshResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function login(
  email: string,
  password: string
): Promise<LoginSuccessResponse> {
  const { data } = await authApiClient.post<LoginSuccessResponse>(
    "/api/v1/auth/login/",
    { email, password }
  );
  return data;
}

/** Bearer(이메일 로그인) 또는 HttpOnly 쿠키(OAuth)로 세션 종료 */
export async function logout(
  accessToken?: string | null
): Promise<LogoutResponse> {
  const { data } = await authApiClient.post<LogoutResponse>(
    "/api/v1/auth/logout/",
    undefined,
    accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : undefined
  );
  return data;
}

export async function refreshToken(): Promise<RefreshResponse> {
  const { data } = await authApiClient.post<RefreshResponse>(
    "/api/v1/auth/refresh/"
  );
  return data;
}

/** 이메일 인증 코드 발송 - 201 Created */
export interface EmailCodeResponse {
  message: string;
  expires_in: number;
}

export async function sendEmailVerificationCode(
  email: string,
  purpose: "signup" | "password_reset" = "signup"
): Promise<EmailCodeResponse> {
  const { data } = await authApiClient.post<EmailCodeResponse>(
    "/api/v1/auth/email/code/",
    { email, purpose }
  );
  return data;
}

/** 회원가입 - 201 Created */
export interface SignupRequest {
  email: string;
  code: string;
  password: string;
  nickname: string;
  birth_date: string; // YYYY-MM-DD
}

export interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
  birth_date: string;
  created_at: string;
}

export async function signup(payload: SignupRequest): Promise<SignupResponse> {
  const { data } = await authApiClient.post<SignupResponse>(
    "/api/v1/auth/signup/",
    payload
  );
  return data;
}

/** 비밀번호 재설정 - 200 OK */
export interface PasswordResetRequest {
  email: string;
  code: string;
  new_password: string;
}

export interface PasswordResetResponse {
  message: string;
}

export async function requestPasswordReset(
  payload: PasswordResetRequest
): Promise<PasswordResetResponse> {
  const { data } = await authApiClient.post<PasswordResetResponse>(
    "/api/v1/auth/password/reset/",
    payload
  );
  return data;
}

/**
 * 소셜 로그인(카카오/디스코드) 리다이렉트 URL
 * - 카카오: GET /api/v1/auth/kakao/login/ (v1_auth_kakao_login_retrieve)
 * - 디스코드: GET /api/v1/auth/discord/login/ (v1_auth_discord_login_retrieve)
 * 백엔드가 OAuth 후 프론트엔드 /auth/callback으로 리다이렉트하며,
 * access_token/refresh_token은 HttpOnly 쿠키로 설정됨.
 */
export function getOAuthLoginUrl(provider: "kakao" | "discord"): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : "/auth/callback";
  const params = new URLSearchParams({ redirect_uri: redirectUri });
  return `${base}/api/v1/auth/${provider}/login/?${params.toString()}`;
}
