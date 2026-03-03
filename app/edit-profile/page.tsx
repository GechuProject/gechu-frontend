"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PasswordVerifyStep } from "@/app/components/edit-profile/PasswordVerifyStep";
import { EditProfileForm } from "@/app/components/edit-profile/EditProfileForm";
import { editProfileFormInitial } from "@/src/mocks/data";
import styles from "./page.module.scss";

export default function EditProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState<"password" | "edit">("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [formData, setFormData] = useState(editProfileFormInitial);

  const handlePasswordVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassword) setStep("edit");
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
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link href="/mypage">
          <motion.button
            style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft style={{ width: "1.25rem", height: "1.25rem" }} />
            마이페이지로 돌아가기
          </motion.button>
        </Link>

        {step === "password" ? (
          <PasswordVerifyStep currentPassword={currentPassword} onChange={setCurrentPassword} onSubmit={handlePasswordVerify} />
        ) : (
          <EditProfileForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}
