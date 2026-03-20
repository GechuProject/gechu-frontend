"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PasswordVerifyStep } from "@/app/components/edit-profile/PasswordVerifyStep";
import { EditProfileForm } from "@/app/components/edit-profile/EditProfileForm";
import { getAccessToken } from "@/src/constants/auth";

import {
  verifyPasswordAction,
  updateProfileAction,
  UpdateProfilePayload,
} from "@/src/actions/mypage";
import { fetchUserProfile, uploadProfileImage } from "@/src/api/mypage";
import styles from "./page.module.scss";

export default function EditProfilePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [step, setStep] = useState<"password" | "edit">("password");
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

  useEffect(() => {
    // getAccessToken()은 클라이언트 실행
    const token = getAccessToken();
    if (!token) {
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
      }
    });
  }, [router]);

  const handlePasswordVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError("");
    setIsVerifying(true);

    try {
      const token = getAccessToken() || "";
      const isValid = await verifyPasswordAction(currentPassword, token);
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

    // 새비밀번호가 8자 미만인지 검사 (입력한 경우에만)
    if (formData.newPassword && formData.newPassword.length < 8) {
      alert("새 비밀번호는 8자 이상 입력해야 합니다.");
      return;
    }

    // 새비밀번호와 새비밀번호 확인이 일치하는지 검사
    if (formData.newPassword !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const token = getAccessToken() || "";
      const payload: UpdateProfilePayload = {
        nickname: formData.nickname,
        birth_date: formData.birth_date,
      };

      // 비밀번호를 입력한 경우에만 객체에 추가
      if (formData.newPassword) {
        payload.new_password = formData.newPassword;
      }

      // 프로필 이미지가 선택된 경우 업로드 진행
      if (selectedImageFile) {
        try {
          await uploadProfileImage(selectedImageFile);
        } catch (imgErr) {
          console.error("이미지 업로드 실패:", imgErr);
          alert(
            "프로필 이미지 업로드에 실패했습니다. 나머지 정보만 수정됩니다."
          );
        }
      }

      const isSuccess = await updateProfileAction(payload, token);

      if (isSuccess) {
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

  if (!isAuthenticated) return null;

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
            profileImgUrl={profileImgUrl}
            onImageChange={(file) => setSelectedImageFile(file)}
          />
        )}
      </div>
    </div>
  );
}
