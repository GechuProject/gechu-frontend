"use client";

import { motion } from "motion/react";
import { Lock, Mail, KeyRound } from "lucide-react";
import Link from "next/link";
import styles from "./PasswordResetForm.module.scss";

export type PasswordResetStep = "email" | "form";

interface PasswordResetFormProps {
  step: PasswordResetStep;
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
  onEmailChange: (v: string) => void;
  onCodeChange: (v: string) => void;
  onNewPasswordChange: (v: string) => void;
  onConfirmPasswordChange: (v: string) => void;
  onSendCode: (e: React.FormEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
  sendCodeError: string;
  sendCodeSuccess: string;
  resetError: string;
  isSendingCode: boolean;
  isSubmitting: boolean;
}

export function PasswordResetForm({
  step,
  email,
  code,
  newPassword,
  confirmPassword,
  onEmailChange,
  onCodeChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSendCode,
  onSubmit,
  sendCodeError,
  sendCodeSuccess,
  resetError,
  isSendingCode,
  isSubmitting,
}: PasswordResetFormProps) {
  return (
    <motion.div
      className={styles.form}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className={styles.heading}>비밀번호 재설정</h2>

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
                placeholder="가입한 이메일을 입력하세요"
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

          <div className={styles.fieldGroup}>
            <label className={styles.label}>새 비밀번호</label>
            <div className={styles.inputWrap}>
              <div className={styles.inputIcon}>
                <Lock style={{ width: "1.25rem", height: "1.25rem" }} />
              </div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => onNewPasswordChange(e.target.value)}
                placeholder="8자 이상"
                className={styles.input}
                minLength={8}
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>새 비밀번호 확인</label>
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

          {resetError && <p className={styles.errorText}>{resetError}</p>}

          <motion.button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
            whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
          >
            {isSubmitting ? "재설정 중..." : "비밀번호 재설정"}
          </motion.button>
        </form>
      )}

      <div className={styles.loginRow}>
        <p className={styles.loginText}>
          <Link href="/login" className={styles.loginLink}>
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
