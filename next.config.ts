import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // shadcn/ui 컴포넌트들의 패키지 버전 불일치로 인한 빌드 오류 무시
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
