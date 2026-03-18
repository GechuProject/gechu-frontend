"use client";

import { motion } from "motion/react";
import { Lock, User } from "lucide-react";
import Link from "next/link";
import { KakaoIcon, DiscordIcon } from "@/app/components/common/SocialIcons";
import styles from "./LoginForm.module.scss";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
  isLoading?: boolean;
}

export function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
  isLoading = false,
}: LoginFormProps) {
  return (
    <motion.div
      className={styles.form}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className={styles.heading}>Login</h2>

      <form onSubmit={onSubmit} className={styles.fields}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>이메일</label>
          <div className={styles.inputWrap}>
            <div className={styles.inputIcon}>
              <User style={{ width: "1.25rem", height: "1.25rem" }} />
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
              placeholder="••••••••"
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.rememberRow}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} />
            로그인 상태 유지
          </label>
          <Link href="/password-reset" className={styles.forgotLink}>
            비밀번호 찾기
          </Link>
        </div>

        {error && (
          <p
            style={{
              color: "rgb(239, 68, 68)",
              fontSize: "0.875rem",
              marginBottom: "0.5rem",
            }}
          >
            {error}
          </p>
        )}

        <motion.button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.02 } : undefined}
          whileTap={!isLoading ? { scale: 0.98 } : undefined}
        >
          {isLoading ? "로그인 중..." : "Log In"}
        </motion.button>

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
            onClick={() => {
              const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
              const redirectUri = encodeURIComponent(
                typeof window !== "undefined"
                  ? `${window.location.origin}/auth/callback`
                  : "/auth/callback"
              );
              window.location.href = `${base}/api/v1/auth/kakao/login/?redirect_uri=${redirectUri}`;
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <KakaoIcon />
            Kakao로 계속하기
          </motion.button>
          <motion.button
            type="button"
            className={`${styles.socialBtn} ${styles.socialDiscord}`}
            disabled
            title="준비 중"
            whileHover={undefined}
            whileTap={undefined}
          >
            <DiscordIcon />
            Discord로 계속하기
          </motion.button>
        </div>
      </form>

      <div className={styles.signupRow}>
        <p className={styles.signupText}>
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className={styles.signupLink}>
            회원가입
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
