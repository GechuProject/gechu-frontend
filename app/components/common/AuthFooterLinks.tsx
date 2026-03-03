import Link from "next/link";

export function AuthFooterLinks() {
  return (
    <div className="mt-8 space-x-4 text-center text-sm">
      <Link
        href="/"
        className="text-white/50 transition-colors hover:text-white"
      >
        홈으로
      </Link>
      <span className="text-white/30">•</span>
      <a href="#" className="text-white/50 transition-colors hover:text-white">
        고객지원
      </a>
      <span className="text-white/30">•</span>
      <a href="#" className="text-white/50 transition-colors hover:text-white">
        이용약관
      </a>
    </div>
  );
}
