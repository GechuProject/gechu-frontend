"use client";

import { motion } from "motion/react";
import { Gamepad2, Lock, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// 3D Icon Component
function Icon3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        filter: "drop-shadow(0 4px 8px rgba(228, 255, 48, 0.3))",
        transform: "perspective(1000px) rotateX(10deg)",
      }}
    >
      {children}
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 pt-40">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(228, 255, 48, 0.1) 2px, rgba(228, 255, 48, 0.1) 4px)`,
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Section */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Icon3D>
              <Gamepad2 className="h-16 w-16 text-[#E4FF30]" />
            </Icon3D>
          </Link>
          <h1 className="mb-2 text-4xl font-bold text-white">EPIC STORE</h1>
          <p className="text-white/50">로그인하여 게임을 시작하세요</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="mb-2 block text-sm text-white/70">이메일</label>
              <div className="relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2">
                  <User className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-2 block text-sm text-white/70">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2">
                  <Lock className="h-5 w-5 text-white/30" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-white/70">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#E4FF30] focus:ring-[#E4FF30]"
                />
                로그인 상태 유지
              </label>
              <a href="#" className="text-[#E4FF30] hover:underline">
                비밀번호 찾기
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-[#E4FF30] py-3 font-bold text-black transition-all hover:bg-[#d4ef20]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Log In
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-black px-4 text-white/50">또는</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <motion.button
                type="button"
                className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 py-3 font-medium text-white transition-all hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Google로 계속하기
              </motion.button>

              <motion.button
                type="button"
                className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 py-3 font-medium text-white transition-all hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Steam으로 계속하기
              </motion.button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/50">
              아직 계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="font-bold text-[#E4FF30] hover:underline"
              >
                회원가입
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Footer Links */}
        <div className="mt-8 space-x-4 text-center text-sm">
          <Link
            href="/"
            className="text-white/50 transition-colors hover:text-white"
          >
            홈으로
          </Link>
          <span className="text-white/30">•</span>
          <a
            href="#"
            className="text-white/50 transition-colors hover:text-white"
          >
            고객지원
          </a>
          <span className="text-white/30">•</span>
          <a
            href="#"
            className="text-white/50 transition-colors hover:text-white"
          >
            이용약관
          </a>
        </div>
      </div>
    </div>
  );
}
