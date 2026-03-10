"use client";

import { useEffect } from "react";

function shouldEnableMocking(): boolean {
  return (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
    process.env.NODE_ENV !== "production"
  );
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!shouldEnableMocking()) return;

    void import("./browser").then(({ worker }) => {
      void worker.start({
        onUnhandledRequest: "bypass",
        quiet: false,
      });
    });
  }, []);

  return <>{children}</>;
}
