"use client";

import { motion } from "motion/react";
import { Gamepad2, Lock, User, Mail } from "lucide-react";
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

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
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
          className="mb-8 text-center"
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
          <p className="text-white/50">새로운 게임 모험을 시작하세요</p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mb-6 text-center text-3xl font-bold text-white">
            회원가입
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
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
                  onChange={handleChange}
                  placeholder="User123"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
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
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Input */}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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

            {/* Submit Button */}
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
