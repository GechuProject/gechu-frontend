import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/app/components/common/Header";
import { Footer } from "@/app/components/common/Footer";
import { Providers } from "@/app/providers";
import { MSWProvider } from "@/src/mocks/MSWProvider";

export const metadata: Metadata = {
  title: "Gechu - 게임 추천 플랫폼",
  description: "당신의 취향에 맞는 게임을 추천해드립니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <MSWProvider>
          <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </MSWProvider>
      </body>
    </html>
  );
}
