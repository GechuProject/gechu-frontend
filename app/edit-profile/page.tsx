"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PasswordVerifyStep } from "@/app/components/edit-profile/PasswordVerifyStep";
import { EditProfileForm } from "@/app/components/edit-profile/EditProfileForm";

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
          <PasswordVerifyStep
            currentPassword={currentPassword}
            onChange={setCurrentPassword}
            onSubmit={handlePasswordVerify}
          />
        ) : (
          <EditProfileForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
