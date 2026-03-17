"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthBackground } from "@/app/components/common/AuthBackground";
import { SignupLogo } from "@/app/components/signup/SignupLogo";
import { SignupForm } from "@/app/components/signup/SignupForm";
import {
  sendEmailVerificationCode,
  signup,
  login,
  setAccessToken,
} from "@/src/api/auth";
import { AxiosError } from "axios";
import styles from "./page.module.scss";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code" | "form">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
    confirmPassword: "",
    birth_date: "",
    agreeTerms: false,
  });
  const [sendCodeError, setSendCodeError] = useState("");
  const [sendCodeSuccess, setSendCodeSuccess] = useState("");
  const [signupError, setSignupError] = useState("");
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
      await sendEmailVerificationCode(email.trim());
      setSendCodeSuccess("인증 코드가 발송되었습니다. 이메일을 확인해 주세요.");
      setStep("code");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string; code?: string }>;
      const message =
        axiosErr.response?.data?.message ??
        (axiosErr.response?.data?.code === "EMAIL_ALREADY_EXISTS"
          ? "이미 가입된 이메일입니다."
          : "인증 코드 발송에 실패했습니다. 다시 시도해 주세요.");
      setSendCodeError(message);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleNextToForm = () => {
    setStep("form");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");

    if (formData.password.length < 8) {
      setSignupError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setSignupError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!formData.agreeTerms) {
      setSignupError("이용약관 및 개인정보 처리방침에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signup({
        email: email.trim(),
        code: code.trim(),
        password: formData.password,
        nickname: formData.nickname.trim(),
        birth_date: formData.birth_date,
      });
      const { access_token } = await login(email.trim(), formData.password);
      setAccessToken(access_token);
      router.push("/onboarding");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string; code?: string }>;
      const message =
        axiosErr.response?.data?.message ??
        (axiosErr.response?.data?.code === "INVALID_CODE"
          ? "인증 코드가 올바르지 않거나 만료되었습니다. 다시 발송해 주세요."
          : axiosErr.response?.data?.code === "CODE_EXPIRED"
            ? "인증 코드가 만료되었습니다. 다시 발송해 주세요."
            : "회원가입에 실패했습니다. 다시 시도해 주세요.");
      setSignupError(message);
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
        <SignupLogo />
        <SignupForm
          step={step}
          email={email}
          code={code}
          nickname={formData.nickname}
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          birth_date={formData.birth_date}
          agreeTerms={formData.agreeTerms}
          onEmailChange={setEmail}
          onCodeChange={setCode}
          onNicknameChange={(v) =>
            setFormData((prev) => ({ ...prev, nickname: v }))
          }
          onPasswordChange={(v) =>
            setFormData((prev) => ({ ...prev, password: v }))
          }
          onConfirmPasswordChange={(v) =>
            setFormData((prev) => ({ ...prev, confirmPassword: v }))
          }
          onBirthDateChange={(v) =>
            setFormData((prev) => ({ ...prev, birth_date: v }))
          }
          onAgreeTermsChange={(v) =>
            setFormData((prev) => ({ ...prev, agreeTerms: v }))
          }
          onSendCode={handleSendCode}
          onNextToForm={handleNextToForm}
          onSubmit={handleSignup}
          sendCodeError={sendCodeError}
          sendCodeSuccess={sendCodeSuccess}
          isSendingCode={isSendingCode}
          signupError={signupError}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
