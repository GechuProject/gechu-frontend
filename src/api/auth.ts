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

export async function logout(accessToken: string): Promise<LogoutResponse> {
  const { data } = await authApiClient.post<LogoutResponse>(
    "/api/v1/auth/logout/",
    undefined,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
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

/** 소셜 로그인(카카오/디스코드) 리다이렉트 URL */
export function getOAuthLoginUrl(provider: "kakao" | "discord"): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : "/auth/callback";
  return `${base}/api/v1/auth/${provider}/login/?redirect_uri=${encodeURIComponent(redirectUri)}`;
}
