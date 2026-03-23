/**
 * Django-style csrftoken 쿠키 읽기 (HttpOnly가 아닌 경우에만 동작)
 */
export function getCsrfTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]*)/);
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}
