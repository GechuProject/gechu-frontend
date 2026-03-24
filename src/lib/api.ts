import axios, { type InternalAxiosRequestConfig } from "axios";
import { getCsrfTokenFromCookie } from "@/src/lib/csrf";
import { emitAuthInvalid } from "@/src/lib/authEvents";

const apiBaseURL =
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
    ? ""
    : process.env.NEXT_PUBLIC_API_BASE_URL || "";

const unsafeMethods = new Set(["post", "put", "patch", "delete"]);

/** 스웨거/백엔드 경로와 맞출 것. 예: /api/v1/auth/csrf/ 또는 /auth/csrf/ */
function getCsrfPath(): string {
  const fromEnv = process.env.NEXT_PUBLIC_AUTH_CSRF_PATH?.trim();
  if (fromEnv) {
    return fromEnv.startsWith("/") ? fromEnv : `/${fromEnv}`;
  }
  return "/api/v1/auth/csrf/";
}

/**
 * GET /api/v1/auth/csrf/ 응답 본문에서 토큰 추출
 * 스웨거 예: `{ "csrf_token": "..." }` — Set-Cookie 없이 JSON만 오는 경우 대비
 */
let csrfTokenFromResponse: string | null = null;

function parseCsrfFromJson(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  const keys = ["csrf_token", "csrfToken", "csrf", "token"] as const;
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return null;
}

function getEffectiveCsrfToken(): string | null {
  return csrfTokenFromResponse ?? getCsrfTokenFromCookie();
}

/** export: 로그아웃 후 등에서 메모리 토큰 초기화 */
export function clearCsrfTokenMemory(): void {
  csrfTokenFromResponse = null;
}

/**
 * GET CSRF — 응답 JSON의 csrf_token을 메모리에 두고 X-CSRFToken에 사용
 * (쿠키 없이 본문만 주는 백엔드 대응) fetch 사용: axios 인터셉터 순환 참조 방지
 */
async function ensureCsrfToken(): Promise<void> {
  if (typeof window === "undefined") return;
  if (getEffectiveCsrfToken()) return;

  const path = getCsrfPath();
  const url = apiBaseURL ? `${apiBaseURL.replace(/\/+$/, "")}${path}` : path;

  try {
    const res = await fetch(url, { method: "GET", credentials: "include" });
    const text = await res.text();
    if (text) {
      try {
        const json = JSON.parse(text) as unknown;
        const parsed = parseCsrfFromJson(json);
        if (parsed) csrfTokenFromResponse = parsed;
      } catch {
        /* 본문이 JSON이 아닐 수 있음 */
      }
    }
    if (!csrfTokenFromResponse) {
      const fromCookie = getCsrfTokenFromCookie();
      if (fromCookie) csrfTokenFromResponse = fromCookie;
    }
  } catch {
    /* 네트워크 오류 시 이후 요청에서 재시도 */
  }
}

function isCsrfEndpointUrl(url: string): boolean {
  const path = getCsrfPath();
  return url.includes("csrf") || url.endsWith(path) || url.includes(path);
}

async function attachCsrf(config: InternalAxiosRequestConfig) {
  if (config.data instanceof FormData) {
    config.headers.delete("Content-Type");
  }
  const method = config.method?.toLowerCase();
  if (method && unsafeMethods.has(method)) {
    const url = config.url ?? "";
    if (!isCsrfEndpointUrl(url)) {
      await ensureCsrfToken();
    }
    const token = getEffectiveCsrfToken();
    if (token) {
      config.headers.set("X-CSRFToken", token);
    }
  }
  return config;
}

/** 앱에서 필요 시 명시 호출 (선택) */
export async function fetchCsrfToken(): Promise<void> {
  csrfTokenFromResponse = null;
  await ensureCsrfToken();
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
