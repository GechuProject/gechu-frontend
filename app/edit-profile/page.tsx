"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PasswordVerifyStep } from "@/app/components/edit-profile/PasswordVerifyStep";
import { EditProfileForm } from "@/app/components/edit-profile/EditProfileForm";
import {
  fetchUserProfile,
  uploadProfileImage,
  deleteProfileImage,
  verifyCurrentPassword,
  patchUserProfile,
  shouldSkipPasswordVerification,
  deleteAccount,
} from "@/src/api/mypage";
import { AccountDeletionSection } from "@/app/components/edit-profile/AccountDeletionSection";
import { useAuth } from "@/src/contexts/AuthContext";
import styles from "./page.module.scss";

export default function EditProfilePage() {
  const router = useRouter();
  const { isLoggedIn, isAuthLoading, refreshAuth, clearAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState<"password" | "edit">("password");
  const [gateReady, setGateReady] = useState(false);
  const [hidePasswordChange, setHidePasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [formData, setFormData] = useState({
    currentPasswordEdit: "",
    newPassword: "",
    confirmPassword: "",
    nickname: "",
    birth_date: "",
  });
  const [verifyError, setVerifyError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    setIsAuthenticated(true);

    fetchUserProfile().then((data) => {
      if (data) {
        setFormData((prev) => ({
          ...prev,
          nickname: data.nickname || "",
          birth_date: data.birth_date || "",
        }));
        setProfileImgUrl(data.profile_img_url || null);
        const skip = shouldSkipPasswordVerification(data);
        setHidePasswordChange(skip);
        if (skip) {
          setStep("edit");
        }
      }
      setGateReady(true);
    });
  }, [router, isLoggedIn, isAuthLoading]);

  const handlePasswordVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError("");
    setIsVerifying(true);

    try {
      const isValid = await verifyCurrentPassword(currentPassword);
      if (isValid) {
        setStep("edit");
      } else {
        setVerifyError("비밀번호가 올바르지 않습니다. 다시 시도해 주세요.");
      }
    } catch {
      setVerifyError("인증 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
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

    if (formData.newPassword && formData.newPassword.length < 8) {
      alert("새 비밀번호는 8자 이상 입력해야 합니다.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const payload: {
        nickname: string;
        birth_date: string;
        new_password?: string;
      } = {
        nickname: formData.nickname,
        birth_date: formData.birth_date,
      };

      if (formData.newPassword) {
        payload.new_password = formData.newPassword;
      }

      if (selectedImageFile) {
        try {
          await uploadProfileImage(selectedImageFile);
        } catch (imgErr) {
          console.error("이미지 업로드 실패:", imgErr);
          alert(
            "프로필 이미지 업로드에 실패했습니다. 나머지 정보만 수정됩니다."
          );
        }
      } else if (isImageDeleted) {
        try {
          await deleteProfileImage();
        } catch (imgErr) {
          console.error("이미지 삭제 실패:", imgErr);
          alert("프로필 이미지 삭제에 실패했습니다. 나머지 정보만 수정됩니다.");
        }
      }

      const isSuccess = await patchUserProfile(payload);

      if (isSuccess) {
        await refreshAuth();
        alert("회원정보가 성공적으로 수정되었습니다.");
        router.push("/mypage");
      } else {
        alert("회원정보 수정에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      console.error("회원정보 수정 실패:", err);
      alert("회원정보 수정 중 오류가 발생했습니다.");
    }
  };

  const handleAccountDelete = async () => {
    await deleteAccount();
    clearAuth();
    router.push("/account-deleted");
  };

  if (!isAuthenticated) return null;

  if (!gateReady) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <p style={{ color: "rgba(255,255,255,0.75)" }}>불러오는 중...</p>
        </div>
      </div>
    );
  }

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
          <>
            <EditProfileForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              hidePasswordChange={hidePasswordChange}
              profileImgUrl={profileImgUrl}
              onImageChange={(file) => {
                setSelectedImageFile(file);
                setIsImageDeleted(false);
              }}
              onImageDelete={() => {
                setSelectedImageFile(null);
                setProfileImgUrl(null);
                setIsImageDeleted(true);
              }}
            />
            <AccountDeletionSection onDeleteConfirmed={handleAccountDelete} />
          </>
        )}
      </div>
    </div>
  );
}
