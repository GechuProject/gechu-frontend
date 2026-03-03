"use client";

import { motion } from "motion/react";
import { Lock, User } from "lucide-react";
import Link from "next/link";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/** 로그인 폼 (이메일, 비밀번호, 로그인 버튼, 소셜 로그인, 회원가입 링크) */
export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <motion.div
      className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="mb-8 text-center text-3xl font-bold text-white">Login</h2>

      <form onSubmit={onSubmit} className="space-y-6">
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
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="mb-2 block text-sm text-white/70">비밀번호</label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <Lock className="h-5 w-5 text-white/30" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
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
  );
}
