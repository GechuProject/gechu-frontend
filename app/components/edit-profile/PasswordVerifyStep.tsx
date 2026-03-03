"use client";

import { motion } from "motion/react";
import { Lock, Shield } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";

interface PasswordVerifyStepProps {
  currentPassword: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function PasswordVerifyStep({
  currentPassword,
  onChange,
  onSubmit,
}: PasswordVerifyStepProps) {
  return (
    <motion.div
      className="rounded-lg border border-white/10 bg-white/5 p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-8 text-center">
        <Icon3D className="mb-4 inline-block">
          <Shield className="h-16 w-16 text-[#E4FF30]" />
        </Icon3D>
        <h1 className="mb-2 text-3xl font-bold text-white">보안 확인</h1>
        <p className="text-white/50">
          내정보를 수정하기 위해 현재 비밀번호를 입력해주세요
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="mb-2 block text-sm text-white/70">
            현재 비밀번호
          </label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <Lock className="h-5 w-5 text-white/30" />
            </div>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => onChange(e.target.value)}
              placeholder="현재 비밀번호를 입력하세요"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
              required
            />
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-[#E4FF30] py-3 font-bold text-black transition-all hover:bg-[#d4ef20]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          확인
        </motion.button>
      </form>
    </motion.div>
  );
}
