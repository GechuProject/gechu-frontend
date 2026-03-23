/** refresh 실패 등으로 세션이 무효일 때 AuthProvider가 비우도록 알림 */
export const AUTH_INVALID_EVENT = "gechu:auth-invalid";

export function emitAuthInvalid(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(AUTH_INVALID_EVENT));
  }
}
