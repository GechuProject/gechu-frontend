import axios, { type InternalAxiosRequestConfig } from "axios";
import { getCsrfTokenFromCookie } from "@/src/lib/csrf";
import { emitAuthInvalid } from "@/src/lib/authEvents";

const apiBaseURL =
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
    ? ""
    : process.env.NEXT_PUBLIC_API_BASE_URL || "";

const unsafeMethods = new Set(["post", "put", "patch", "delete"]);

const CSRF_PATH = "/api/v1/auth/csrf/";

/**
 * Swagger: v1_auth_csrf_retrieve — csrftoken 쿠키 발급
 * fetch 사용: axios 인터셉터 순환 참조 방지
 */
async function ensureCsrfCookie(): Promise<void> {
  if (typeof window === "undefined") return;
  if (getCsrfTokenFromCookie()) return;

  const url = apiBaseURL
    ? `${apiBaseURL.replace(/\/+$/, "")}${CSRF_PATH}`
    : CSRF_PATH;

  try {
    await fetch(url, { method: "GET", credentials: "include" });
  } catch {
    /* 네트워크 오류 시 이후 요청에서 재시도 */
  }
}

async function attachCsrf(config: InternalAxiosRequestConfig) {
  if (config.data instanceof FormData) {
    config.headers.delete("Content-Type");
  }
  const method = config.method?.toLowerCase();
  if (method && unsafeMethods.has(method)) {
    const url = config.url ?? "";
    if (!url.includes("/api/v1/auth/csrf")) {
      await ensureCsrfCookie();
    }
    const token = getCsrfTokenFromCookie();
    if (token) {
      config.headers.set("X-CSRFToken", token);
    }
  }
  return config;
}

/** 앱에서 필요 시 명시 호출 (선택) */
export async function fetchCsrfToken(): Promise<void> {
  await ensureCsrfCookie();
}

/** 세션 없을 때 401이 정상인 요청 — refresh 시도하지 않음 */
function shouldSkipRefreshOn401(url: string | undefined): boolean {
  if (!url) return false;
  return (
    url.includes("/api/v1/auth/login") ||
    url.includes("/api/v1/auth/signup") ||
    url.includes("/api/v1/auth/email/code") ||
    url.includes("/api/v1/auth/password/reset")
  );
}

/** 공통: 쿠키 기반 인증 (Bearer 미사용) */
function createApiClient() {
  return axios.create({
    baseURL: apiBaseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export const apiClient = createApiClient();

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return attachCsrf(config);
});

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (err.response?.status === 401 && !originalConfig._retry) {
      if (originalConfig?.url?.includes?.("auth/refresh")) {
        emitAuthInvalid();
        return Promise.reject(err);
      }

      if (shouldSkipRefreshOn401(originalConfig?.url)) {
        return Promise.reject(err);
      }

      originalConfig._retry = true;

      try {
        const { refreshToken } = await import("@/src/api/auth");
        await refreshToken();
        return apiClient(originalConfig);
      } catch {
        emitAuthInvalid();
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export const authApiClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

authApiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return attachCsrf(config);
});

authApiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (originalConfig?.url?.includes?.("auth/refresh")) {
      emitAuthInvalid();
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalConfig._retry) {
      if (shouldSkipRefreshOn401(originalConfig?.url)) {
        return Promise.reject(err);
      }

      originalConfig._retry = true;

      try {
        const { refreshToken } = await import("@/src/api/auth");
        await refreshToken();
        return authApiClient(originalConfig);
      } catch {
        emitAuthInvalid();
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);
