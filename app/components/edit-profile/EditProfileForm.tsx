"use client";

import { motion } from "motion/react";
import { Lock, User } from "lucide-react";
import Link from "next/link";

interface EditFormData {
  currentPasswordEdit: string;
  newPassword: string;
  confirmPassword: string;
  nickname: string;
}

interface EditProfileFormProps {
  formData: EditFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const passwordFields = [
  {
    label: "현재 비밀번호",
    name: "currentPasswordEdit" as const,
    placeholder: "현재 비밀번호",
  },
  {
    label: "새 비밀번호",
    name: "newPassword" as const,
    placeholder: "새 비밀번호 (8자 이상)",
  },
  {
    label: "새 비밀번호 확인",
    name: "confirmPassword" as const,
    placeholder: "새 비밀번호 확인",
  },
];

/** Step 2: 닉네임 + 비밀번호 변경 폼 */
export function EditProfileForm({
  formData,
  onChange,
  onSubmit,
}: EditProfileFormProps) {
  return (
    <motion.div
      className="rounded-lg border border-white/10 bg-white/5 p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-white">내정보 수정</h1>
        <p className="text-white/50">회원정보를 안전하게 변경할 수 있습니다</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* 닉네임 변경 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">
            닉네임
          </label>
          <div className="relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <User className="h-5 w-5 text-white/30" />
            </div>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={onChange}
              placeholder="닉네임을 입력하세요"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="my-6 border-t border-white/10"></div>

        {/* 비밀번호 변경 섹션 */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-white">비밀번호 변경</h2>
          <p className="mb-4 text-sm text-white/50">
            비밀번호를 변경하지 않으려면 아래 필드를 비워두세요
          </p>

          <div className="space-y-4">
            {passwordFields.map(({ label, name, placeholder }) => (
              <div key={name}>
                <label className="mb-2 block text-sm text-white/70">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute top-1/2 left-4 -translate-y-1/2">
                    <Lock className="h-5 w-5 text-white/30" />
                  </div>
                  <input
                    type="password"
                    name={name}
                    value={formData[name]}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex gap-3 pt-4">
          <motion.button
            type="submit"
            className="flex-1 cursor-pointer rounded-lg bg-[#E4FF30] py-3 font-bold text-black transition-all hover:bg-[#d4ef20]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            저장하기
          </motion.button>

          <Link href="/mypage" className="flex-1">
            <motion.button
              type="button"
              className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 py-3 text-white transition-all hover:bg-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              취소
            </motion.button>
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
