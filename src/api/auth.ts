import { authApiClient } from "@/src/lib/api";

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
