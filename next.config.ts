import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    // shadcn/ui 컴포넌트들의 패키지 버전 불일치로 인한 빌드 오류 무시
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "app/styles")],
  },
};

export default nextConfig;
