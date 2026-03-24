/**
 * 이메일 로그인 vs 소셜(OAuth) 로그인 구분 — 프로필 수정 시 비밀번호 확인 게이트 분기용
 * 백엔드가 has_usable_password 등을 주면 그쪽을 우선한다.
 */
const STORAGE_KEY = "gechu_login_method";

export type StoredLoginMethod = "email" | "oauth";

export function setLoginMethod(method: StoredLoginMethod): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, method);
  } catch {
    /* private mode 등 */
  }
}

export function getLoginMethod(): StoredLoginMethod | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "email" || v === "oauth") return v;
    return null;
  } catch {
    return null;
  }
}

export function clearLoginMethod(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* */
  }
}
