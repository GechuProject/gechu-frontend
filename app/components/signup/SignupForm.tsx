"use client";

import { motion } from "motion/react";
import { Lock, User, Mail, KeyRound, Calendar } from "lucide-react";
import Link from "next/link";
import { KakaoIcon, DiscordIcon } from "@/app/components/common/SocialIcons";
import styles from "./SignupForm.module.scss";

export type SignupStep = "email" | "code" | "form";

interface SignupFormProps {
  step: SignupStep;
  email: string;
  code: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  birth_date: string;
  agreeTerms: boolean;
  onEmailChange: (v: string) => void;
  onCodeChange: (v: string) => void;
  onNicknameChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onConfirmPasswordChange: (v: string) => void;
  onBirthDateChange: (v: string) => void;
  onAgreeTermsChange: (v: boolean) => void;
  onSendCode: (e: React.FormEvent) => void;
  onNextToForm: () => void;
  onSubmit: (e: React.FormEvent) => void;
  sendCodeError: string;
  sendCodeSuccess: string;
  isSendingCode: boolean;
  signupError: string;
  isSubmitting: boolean;
}

import { getOAuthLoginUrl } from "@/src/api/auth";

export function SignupForm({
  step,
  email,
  code,
  nickname,
  password,
  confirmPassword,
  birth_date,
  agreeTerms,
  onEmailChange,
  onCodeChange,
  onNicknameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onBirthDateChange,
  onAgreeTermsChange,
  onSendCode,
  onNextToForm,
  onSubmit,
  sendCodeError,
  sendCodeSuccess,
  isSendingCode,
  signupError,
  isSubmitting,
}: SignupFormProps) {
  const handleSocialKakao = () => {
    window.location.href = getOAuthLoginUrl("kakao");
  };

  const handleSocialDiscord = () => {
    window.location.href = getOAuthLoginUrl("discord");
  };

  return (
    <motion.div
      className={styles.form}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className={styles.heading}>회원가입</h2>

      {step === "email" && (
        <form onSubmit={onSendCode} className={styles.fields}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>이메일</label>
            <div className={styles.inputWrap}>
              <div className={styles.inputIcon}>
                <Mail style={{ width: "1.25rem", height: "1.25rem" }} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="your@email.com"
                className={styles.input}
                required
              />
            </div>
          </div>
          {sendCodeError && <p className={styles.errorText}>{sendCodeError}</p>}
          {sendCodeSuccess && (
            <p className={styles.successText}>{sendCodeSuccess}</p>
          )}
          <motion.button
            type="submit"
            className={styles.submitBtn}
            disabled={isSendingCode}
            whileHover={!isSendingCode ? { scale: 1.02 } : undefined}
            whileTap={!isSendingCode ? { scale: 0.98 } : undefined}
          >
            {isSendingCode ? "발송 중..." : "인증 코드 발송"}
          </motion.button>
        </form>
      )}

      {step === "code" && (
        <div className={styles.fields}>
          <p className={styles.emailDisplay}>
            <Mail
              style={{
                width: "1rem",
                height: "1rem",
                display: "inline",
                marginRight: "0.5rem",
              }}
            />
            {email}
          </p>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>인증 코드 (6자리)</label>
            <div className={styles.inputWrap}>
              <div className={styles.inputIcon}>
                <KeyRound style={{ width: "1.25rem", height: "1.25rem" }} />
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) =>
                  onCodeChange(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="123456"
                className={styles.input}
                maxLength={6}
              />
            </div>
          </div>
          <motion.button
            type="button"
            className={styles.submitBtn}
            onClick={onNextToForm}
            disabled={code.length < 6}
            whileHover={code.length >= 6 ? { scale: 1.02 } : undefined}
            whileTap={code.length >= 6 ? { scale: 0.98 } : undefined}
          >
            다음
          </motion.button>
        </div>
      )}

      {step === "form" && (
        <form onSubmit={onSubmit} className={styles.fields}>
          <p className={styles.emailDisplay}>
            <Mail
              style={{
                width: "1rem",
                height: "1rem",
                display: "inline",
                marginRight: "0.5rem",
              }}
            />
            {email}
          </p>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>닉네임</label>
            <div className={styles.inputWrap}>
              <div className={styles.inputIcon}>
                <User style={{ width: "1.25rem", height: "1.25rem" }} />
              </div>
              <input
                type="text"
                value={nickname}
                onChange={(e) => onNicknameChange(e.target.value)}
                placeholder="닉네임을 입력하세요"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>생년월일 (YYYY-MM-DD)</label>
            <div className={styles.inputWrap}>
              <div className={styles.inputIcon}>
                <Calendar style={{ width: "1.25rem", height: "1.25rem" }} />
              </div>
              <input
                type="date"
                value={birth_date}
                onChange={(e) => onBirthDateChange(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>비밀번호</label>
            <div className={styles.inputWrap}>
              <div className={styles.inputIcon}>
                <Lock style={{ width: "1.25rem", height: "1.25rem" }} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="8자 이상"
                className={styles.input}
                minLength={8}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>비밀번호 확인</label>
            <div className={styles.inputWrap}>
              <div className={styles.inputIcon}>
                <Lock style={{ width: "1.25rem", height: "1.25rem" }} />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.termsWrap}>
            <label className={styles.termsLabel}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => onAgreeTermsChange(e.target.checked)}
                className={styles.checkbox}
                required
              />
              <span className={styles.termsText}>
                <a href="#" className={styles.termsLink}>
                  이용약관
                </a>
                과{" "}
                <a href="#" className={styles.termsLink}>
                  개인정보 처리방침
                </a>
                에 동의합니다
              </span>
            </label>
          </div>

          {signupError && <p className={styles.errorText}>{signupError}</p>}

          <motion.button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
            whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
          >
            {isSubmitting ? "가입 중..." : "회원가입"}
          </motion.button>
        </form>
      )}

      <div className={styles.divider}>
        <div className={styles.dividerLine} />
        <div className={styles.dividerText}>
          <span className={styles.dividerLabel}>또는</span>
        </div>
      </div>

      <div className={styles.socialWrap}>
        <motion.button
          type="button"
          className={`${styles.socialBtn} ${styles.socialKakao}`}
          onClick={handleSocialKakao}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <KakaoIcon />
          Kakao로 가입하기
        </motion.button>
        <motion.button
          type="button"
          className={`${styles.socialBtn} ${styles.socialDiscord}`}
          onClick={handleSocialDiscord}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <DiscordIcon />
          Discord로 가입하기
        </motion.button>
      </div>

      <div className={styles.loginRow}>
        <p className={styles.loginText}>
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className={styles.loginLink}>
            로그인
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
