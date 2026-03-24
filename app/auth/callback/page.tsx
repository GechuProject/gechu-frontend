"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";

/**
 * OAuth 콜백 — 쿠키는 백엔드가 설정. 프론트는 auth/me로 세션 복원 후 이동.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshAuth, isLoggedIn } = useAuth();

  const isNewUser = searchParams.get("is_new_user");
  const error = searchParams.get("error");
  const errorDesc = searchParams.get("error_description");

  const isAdultVerificationError = error?.includes("VERIFICATION");
  const fallbackMessage = isAdultVerificationError
    ? "성인인증 처리에 실패했습니다. (이미 사용 중인 정보일 수 있습니다.)"
    : "로그인에 실패했습니다. 다시 시도해 주세요.";

  const errorMessage = error
    ? (errorDesc ?? error ?? fallbackMessage)
    : isLoggedIn
      ? "유효하지 않은 접근입니다. 마이페이지로 이동합니다."
      : "유효하지 않은 접근입니다. 로그인 페이지로 이동합니다.";

  const isError =
    !!error || (!isLoggedIn && isNewUser !== "true" && isNewUser !== "false");

  useEffect(() => {
    const run = async () => {
      // 1) 로그인 성공 시나리오 (소셜 가입/로그인)
      if (isNewUser === "true") {
        await refreshAuth();
        router.replace("/onboarding");
        return;
      }
      if (isNewUser === "false") {
        await refreshAuth();
        router.replace("/");
        return;
      }

      // 2) 로그인 에러 없이 콜백 & 이미 로그인된 상태 = 성인인증(또는 연동) 성공!
      if (!error && isLoggedIn) {
        await refreshAuth();
        const t = setTimeout(() => router.replace("/mypage"), 1500);
        return () => clearTimeout(t);
      }

      // 3) 로그인 상태도 아닌데 파라미터도 없는 경우 예외 처리
      if (!error && !isLoggedIn) {
        const t = setTimeout(() => router.replace("/login"), 2000);
        return () => clearTimeout(t);
      }
    };
    void run();
  }, [isNewUser, error, router, refreshAuth, isLoggedIn]);

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
        <p>
          {isLoggedIn
            ? "인증 성공! 마이페이지로 이동합니다..."
            : "로그인 처리 중..."}
        </p>
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
        onClick={() => router.push(isLoggedIn ? "/mypage" : "/login")}
        style={{
          padding: "0.75rem 1.5rem",
          background: isLoggedIn ? "#e4ff30" : "#5865f2",
          color: isLoggedIn ? "#000" : "#fff",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {isLoggedIn ? "마이페이지로 돌아가기" : "로그인 페이지로 이동"}
      </button>
    </div>
  );
}
