import { authApiClient } from "@/src/lib/api";

/** Swagger: v1_auth_csrf_retrieve — CSRF 쿠키 선발급 (인터셉터에서도 자동 호출) */
export { fetchCsrfToken } from "@/src/lib/api";

export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Swagger: TokenResponse (access_token 등, 쿠키 세션 시 바디 없을 수 있음)
 * operationId: v1_auth_login_create — POST /api/v1/auth/login/
 */
export interface LoginSuccessResponse {
  access_token?: string;
  token_type?: string;
  expires_in?: number;
}

export interface LoginErrorResponse {
  status_code: string;
  code: string;
  message: string;
}

/** v1_auth_logout_create — POST /api/v1/auth/logout/ */
export interface LogoutResponse {
  message: string;
}

/**
 * v1_auth_me_retrieve — GET /api/v1/auth/me/
 */
export interface AuthMeResponse {
  id: number;
  email: string;
  is_active: boolean;
  is_adult_verified: boolean;
  is_staff?: boolean;
}

export async function fetchAuthMe(): Promise<AuthMeResponse | null> {
  try {
    const { data } =
      await authApiClient.get<AuthMeResponse>("/api/v1/auth/me/");
    return data;
  } catch {
    return null;
  }
}

/**
 * v1_auth_login_create — POST /api/v1/auth/login/
 * 서버가 Set-Cookie, 프론트는 access_token 저장 안 함
 */
export async function login(
  email: string,
  password: string
): Promise<LoginSuccessResponse | void> {
  const { data } = await authApiClient.post<LoginSuccessResponse>(
    "/api/v1/auth/login/",
    { email, password }
  );
  return data;
}

/** v1_auth_logout_create — POST /api/v1/auth/logout/ */
export async function logout(): Promise<LogoutResponse> {
  const { data } = await authApiClient.post<LogoutResponse>(
    "/api/v1/auth/logout/"
  );
  return data;
}

/**
 * v1_auth_refresh_create — POST /api/v1/auth/refresh/
 * 쿠키 기반, 응답 바디 토큰은 사용하지 않음
 */
export async function refreshToken(): Promise<void> {
  await authApiClient.post("/api/v1/auth/refresh/");
}

/** 이메일 인증 코드 — POST /api/v1/auth/email/code/ */
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

/** v1_auth_signup_create — POST /api/v1/auth/signup/ */
export interface SignupRequest {
  email: string;
  code: string;
  password: string;
  nickname: string;
  birth_date: string;
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

/** 비밀번호 재설정 — POST /api/v1/auth/password/reset/ */
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
 * 카카오: v1_auth_kakao_login_retrieve — GET /api/v1/auth/kakao/login/
 * 디스코드: v1_auth_discord_login_retrieve — GET /api/v1/auth/discord/login/
 * (콜백은 백엔드 /api/v1/auth/{provider}/callback/ — 프론트는 /auth/callback 으로 리다이렉트)
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
