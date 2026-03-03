"use client";

import { motion } from "motion/react";
import { Lock, User, Mail } from "lucide-react";
import Link from "next/link";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface SignupFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/** 회원가입 폼 전체 */
export function SignupForm({ formData, onChange, onSubmit }: SignupFormProps) {
  return (
    <motion.div
      className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="mb-6 text-center text-3xl font-bold text-white">
        회원가입
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label className="mb-2 block text-sm text-white/70">
            사용자 이름
          </label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <User className="h-5 w-5 text-white/30" />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={onChange}
              placeholder="User123"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm text-white/70">이메일</label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <Mail className="h-5 w-5 text-white/30" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm text-white/70">비밀번호</label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <Lock className="h-5 w-5 text-white/30" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm text-white/70">
            비밀번호 확인
          </label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <Lock className="h-5 w-5 text-white/30" />
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="pt-2">
          <label className="flex cursor-pointer items-start gap-3 text-white/70">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={onChange}
              className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-[#E4FF30] focus:ring-[#E4FF30]"
              required
            />
            <span className="text-sm">
              <a href="#" className="text-[#E4FF30] hover:underline">
                이용약관
              </a>
              과{" "}
              <a href="#" className="text-[#E4FF30] hover:underline">
                개인정보 처리방침
              </a>
              에 동의합니다
            </span>
          </label>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-[#E4FF30] py-3 font-bold text-black transition-all hover:bg-[#d4ef20]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          회원가입
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

        {/* Social Signup */}
        <div className="space-y-3">
          <motion.button
            type="button"
            className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 py-3 font-medium text-white transition-all hover:bg-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Google로 가입하기
          </motion.button>

          <motion.button
            type="button"
            className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 py-3 font-medium text-white transition-all hover:bg-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Steam으로 가입하기
          </motion.button>
        </div>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-white/50">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-bold text-[#E4FF30] hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
