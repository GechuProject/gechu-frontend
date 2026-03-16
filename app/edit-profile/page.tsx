"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { PasswordVerifyStep } from "@/app/components/edit-profile/PasswordVerifyStep";
import { EditProfileForm } from "@/app/components/edit-profile/EditProfileForm";
import { login } from "@/src/api/auth";
import { fetchUserProfile } from "@/src/api/mypage";
import { authApiClient } from "@/src/lib/api";
import { editProfileFormInitial } from "@/src/mocks/data/user";
import styles from "./page.module.scss";

export default function EditProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState<"password" | "edit">("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [formData, setFormData] = useState(editProfileFormInitial);
  const [userEmail, setUserEmail] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    fetchUserProfile().then((data) => {
      if (data) setUserEmail(data.email);
    });
  }, []);

  const handlePasswordVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError("");
    setIsVerifying(true);

    try {
      await login(userEmail, currentPassword);
      setStep("edit");
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ??
        "비밀번호가 올바르지 않습니다. 다시 시도해 주세요.";
      setVerifyError(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApiClient.put("/api/v1/users/me/", {
        nickname: formData.nickname,
        birth_date: formData.birth_date,
      });
      // 성공 시 마이페이지로 이동
      router.push("/mypage");
    } catch (err) {
      console.error("회원정보 수정 실패:", err);
      alert("회원정보 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/mypage">
          <motion.button
            style={{
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgba(255,255,255,0.7)",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft style={{ width: "1.25rem", height: "1.25rem" }} />
            마이페이지로 돌아가기
          </motion.button>
        </Link>

        {step === "password" ? (
          <PasswordVerifyStep
            currentPassword={currentPassword}
            onChange={setCurrentPassword}
            onSubmit={handlePasswordVerify}
            error={verifyError}
            isLoading={isVerifying}
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
