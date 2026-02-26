"use client";

import { Navigation } from "@/app/components/Navigation";
import { motion } from "motion/react";
import { Lock, User, Shield, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function EditProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState<"password" | "edit">("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [formData, setFormData] = useState({
    currentPasswordEdit: "",
    newPassword: "",
    confirmPassword: "",
    nickname: "User123",
  });

  const handlePasswordVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassword) {
      setStep("edit");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile update:", formData);
    router.push("/mypage");
  };

  return (
    <div className="min-h-screen bg-black pt-40">
      <Navigation />

      <div className="mx-auto max-w-[800px] px-6 py-16">
        {/* Back Button */}
        <Link href="/mypage">
          <motion.button
            className="mb-8 flex items-center gap-2 text-white/70 transition-colors hover:text-[#E4FF30]"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            마이페이지로 돌아가기
          </motion.button>
        </Link>

        {step === "password" ? (
          // Step 1: 현재 비밀번호 확인
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

            <form onSubmit={handlePasswordVerify}>
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
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
        ) : (
          // Step 2: 정보 수정
          <motion.div
            className="rounded-lg border border-white/10 bg-white/5 p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold text-white">
                내정보 수정
              </h1>
              <p className="text-white/50">
                회원정보를 안전하게 변경할 수 있습니다
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    onChange={handleChange}
                    placeholder="닉네임을 입력하세요"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/30 transition-all focus:border-[#E4FF30] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="my-6 border-t border-white/10"></div>

              {/* 비밀번호 변경 섹션 */}
              <div>
                <h2 className="mb-4 text-xl font-bold text-white">
                  비밀번호 변경
                </h2>
                <p className="mb-4 text-sm text-white/50">
                  비밀번호를 변경하지 않으려면 아래 필드를 비워두세요
                </p>

                <div className="space-y-4">
                  {[
                    {
                      label: "현재 비밀번호",
                      name: "currentPasswordEdit",
                      value: formData.currentPasswordEdit,
                      placeholder: "현재 비밀번호",
                    },
                    {
                      label: "새 비밀번호",
                      name: "newPassword",
                      value: formData.newPassword,
                      placeholder: "새 비밀번호 (8자 이상)",
                    },
                    {
                      label: "새 비밀번호 확인",
                      name: "confirmPassword",
                      value: formData.confirmPassword,
                      placeholder: "새 비밀번호 확인",
                    },
                  ].map(({ label, name, value, placeholder }) => (
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
                          value={value}
                          onChange={handleChange}
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
        )}
      </div>
    </div>
  );
}
