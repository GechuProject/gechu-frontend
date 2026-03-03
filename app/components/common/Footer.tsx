import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-[1400px] px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Gamepad2 className="h-6 w-6 text-[#E4FF30]" />
            <span className="text-lg font-bold text-white">Gechu</span>
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-white/50 transition-colors hover:text-white"
            >
              홈으로
            </Link>
            <span className="text-white/20">•</span>
            <a
              href="#"
              className="text-white/50 transition-colors hover:text-white"
            >
              고객지원
            </a>
            <span className="text-white/20">•</span>
            <a
              href="#"
              className="text-white/50 transition-colors hover:text-white"
            >
              이용약관
            </a>
            <span className="text-white/20">•</span>
            <a
              href="#"
              className="text-white/50 transition-colors hover:text-white"
            >
              개인정보처리방침
            </a>
          </div>

          <p className="text-sm text-white/30">
            © 2026 Gechu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
