"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthBackground } from "@/app/components/common/AuthBackground";
import { LoginLogo } from "@/app/components/login/LoginLogo";
import { PasswordResetForm } from "@/app/components/password-reset/PasswordResetForm";
import {
  sendEmailVerificationCode,
  requestPasswordReset,
} from "@/src/api/auth";
import { AxiosError } from "axios";
import styles from "./page.module.scss";

export default function PasswordResetPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "form">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sendCodeError, setSendCodeError] = useState("");
  const [sendCodeSuccess, setSendCodeSuccess] = useState("");
  const [resetError, setResetError] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendCodeError("");
    setSendCodeSuccess("");
    if (!email.trim()) {
      setSendCodeError("이메일을 입력해주세요.");
      return;
    }
    setIsSendingCode(true);
    try {
      await sendEmailVerificationCode(email.trim(), "password_reset");
      setSendCodeSuccess("인증 코드가 발송되었습니다. 이메일을 확인해 주세요.");
      setStep("form");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string; code?: string }>;
      const message =
        axiosErr.response?.data?.message ??
        (axiosErr.response?.data?.code === "USER_NOT_FOUND"
          ? "등록되지 않은 이메일입니다."
          : "인증 코드 발송에 실패했습니다. 다시 시도해 주세요.");
      setSendCodeError(message);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");

    if (newPassword.length < 8) {
      setResetError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (code.length < 6) {
      setResetError("인증 코드 6자리를 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await requestPasswordReset({
        email: email.trim(),
        code: code.trim(),
        new_password: newPassword,
      });
      router.push("/login?reset=success");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string; code?: string }>;
      const message =
        axiosErr.response?.data?.message ??
        (axiosErr.response?.data?.code === "INVALID_CODE"
          ? "인증 코드가 올바르지 않거나 만료되었습니다. 다시 발송해 주세요."
          : axiosErr.response?.data?.code === "CODE_EXPIRED"
            ? "인증 코드가 만료되었습니다. 다시 발송해 주세요."
            : "비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.");
      setResetError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgPattern}>
        <AuthBackground />
      </div>

      <div className={styles.inner}>
        <LoginLogo />
        <PasswordResetForm
          step={step}
          email={email}
          code={code}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          onEmailChange={setEmail}
          onCodeChange={setCode}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSendCode={handleSendCode}
          onSubmit={handleReset}
          sendCodeError={sendCodeError}
          sendCodeSuccess={sendCodeSuccess}
          resetError={resetError}
          isSendingCode={isSendingCode}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
