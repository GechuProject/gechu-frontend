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
  const [isMswReady, setIsMswReady] = useState(!shouldEnableMocking());

  useEffect(() => {
    if (!shouldEnableMocking()) return;

    void import("./browser").then(({ worker }) => {
      void worker
        .start({
          onUnhandledRequest: "bypass",
          quiet: false,
        })
        .then(() => {
          setIsMswReady(true);
        });
    });
  }, []);

  if (!isMswReady) return null;

  return <>{children}</>;
}
