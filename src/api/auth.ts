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
