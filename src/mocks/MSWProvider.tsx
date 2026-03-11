"use client";

import { useEffect, useState } from "react";

function shouldEnableMocking(): boolean {
  return (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
    process.env.NODE_ENV !== "production"
  );
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  // 서버/클라이언트 모두 초기에 loading → Hydration 일치
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!shouldEnableMocking()) {
      setIsReady(true);
      return;
    }

    import("./browser").then(({ worker }) =>
      worker
        .start({ onUnhandledRequest: "bypass", quiet: false })
        .then(() => setIsReady(true))
    );
  }, []);

  if (!isReady) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        로딩 중...
      </div>
    );
  }

  return <>{children}</>;
}
