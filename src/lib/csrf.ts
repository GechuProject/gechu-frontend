/**
 * CSRF 쿠키 이름 후보 (백엔드/Django 설정에 따라 다름)
 * HttpOnly 쿠키는 JS에서 읽을 수 없음 → GET /auth/csrf/ 응답 본문 토큰 필요
 */
const CSRF_COOKIE_NAMES = ["csrftoken", "csrf_token", "csrfToken"] as const;

export function getCsrfTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  for (const name of CSRF_COOKIE_NAMES) {
    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${name}=([^;]*)`)
    );
    if (match?.[1]) {
      try {
        return decodeURIComponent(match[1]);
      } catch {
        return match[1];
      }
    }
  }
  return null;
}
