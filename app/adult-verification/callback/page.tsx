"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { callbackAdultVerification } from "@/src/api/mypage";

export default function AdultVerificationCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMsg, setErrorMsg] = useState("");

  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    const verify = async () => {
      if (!code || !state) {
        setErrorMsg("잘못된 접근입니다. 코드가 없습니다.");
        setTimeout(() => router.replace("/mypage"), 2000);
        return;
      }

      const success = await callbackAdultVerification(code, state);
      if (success) {
        // 성공 시 마이페이지로 이동
        router.replace("/mypage");
      } else {
        setErrorMsg("성인인증에 실패했습니다. 다시 시도해 주세요.");
        setTimeout(() => router.replace("/mypage"), 2000);
      }
    };

    void verify();
  }, [code, state, router]);

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
      }}
    >
      {errorMsg ? (
        <>
          <p style={{ color: "rgb(248, 113, 113)" }}>{errorMsg}</p>
          <button
            type="button"
            onClick={() => router.replace("/mypage")}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#e4ff30",
              color: "#000",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            마이페이지로 돌아가기
          </button>
        </>
      ) : (
        <>
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
          <p>성인인증 처리 중...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
      )}
    </div>
  );
}
