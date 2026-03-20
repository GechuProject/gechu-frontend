"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * OAuth 콜백 페이지 (카카오, 디스코드)
 * - 백엔드 콜백: v1_auth_kakao_callback_retrieve, v1_auth_discord_callback_retrieve
 * - 성공 시: is_new_user=true → /onboarding, is_new_user=false → /
 * - 실패 시: error, error_description 쿼리
 * - access_token/refresh_token은 HttpOnly 쿠키로 설정 (JS에서 접근 불가)
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isNewUser = searchParams.get("is_new_user");
  const error = searchParams.get("error");
  const errorDesc = searchParams.get("error_description");

  const errorMessage = error
    ? (errorDesc ?? error ?? "로그인에 실패했습니다. 다시 시도해 주세요.")
    : "유효하지 않은 접근입니다. 로그인 페이지로 이동합니다.";

  const isError = !!error || (isNewUser !== "true" && isNewUser !== "false");

  useEffect(() => {
    if (isNewUser === "true") {
      router.replace("/onboarding");
      return;
    }
    if (isNewUser === "false") {
      router.replace("/");
      return;
    }

    if (!error) {
      const t = setTimeout(() => router.replace("/login"), 2000);
      return () => clearTimeout(t);
    }
  }, [isNewUser, error, router]);

  if (!isError) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          background: "#0a0a0a",
          color: "#fff",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "3px solid rgba(255,255,255,0.2)",
            borderTopColor: "#fff",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p>로그인 처리 중...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.5rem",
        background: "#0a0a0a",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <p style={{ color: "rgb(248, 113, 113)" }}>{errorMessage}</p>
      <button
        type="button"
        onClick={() => router.push("/login")}
        style={{
          padding: "0.75rem 1.5rem",
          background: "#5865f2",
          color: "#fff",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          fontWeight: 500,
        }}
      >
        로그인 페이지로 이동
      </button>
    </div>
  );
}
