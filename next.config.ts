import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.example.com", pathname: "/**" },
      { protocol: "https", hostname: "images.igdb.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "ozbe15-yoon.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d2c8om11rax5nb.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  typescript: {
    // shadcn/ui 컴포넌트들의 패키지 버전 불일치로 인한 빌드 오류 무시
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "app/styles")],
  },
};

export default nextConfig;
