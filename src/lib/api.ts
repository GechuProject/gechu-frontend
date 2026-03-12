import axios, { type InternalAxiosRequestConfig } from "axios";

// Mock 모드: baseURL="" → same-origin, MSW가 home/mypage/wishlist 등 intercept
// 실제 API 모드: baseURL로 CloudFront 요청
const apiBaseURL =
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
    ? ""
    : process.env.NEXT_PUBLIC_API_BASE_URL || "";

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/src/constants/auth";

export const apiClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 시 토큰 첨부
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401 시 refresh 후 재시도 (dynamic import로 순환 의존성 방지)
apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const { refreshToken } = await import("@/src/api/auth");
        const { access_token } = await refreshToken();
        setAccessToken(access_token);
        originalConfig.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalConfig);
      } catch (refreshErr) {
        removeAccessToken();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

// 로그인 등 실제 백엔드 전용 (Mock 모드에서도 CloudFront로 bypass)
export const authApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // refresh token 쿠키 전송
});

// authApiClient에도 Bearer 토큰 첨부 내정보 조회 할때 추가함
authApiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
