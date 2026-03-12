"use client";

import { motion } from "motion/react";
import { Lock, Shield } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";
import styles from "./PasswordVerifyStep.module.scss";

interface PasswordVerifyStepProps {
  currentPassword: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
  isLoading?: boolean;
}

export function PasswordVerifyStep({
  currentPassword,
  onChange,
  onSubmit,
  error,
  isLoading,
}: PasswordVerifyStepProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.head}>
        <Icon3D className={styles.iconWrap}>
          <Shield style={{ width: "4rem", height: "4rem", color: "#E4FF30" }} />
        </Icon3D>
        <h1 className={styles.title}>보안 확인</h1>
        <p className={styles.subtitle}>
          내정보를 수정하기 위해 현재 비밀번호를 입력해주세요
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <label className={styles.label}>현재 비밀번호</label>
        <div className={styles.inputWrap}>
          <div className={styles.inputIcon}>
            <Lock style={{ width: "1.25rem", height: "1.25rem" }} />
          </div>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => onChange(e.target.value)}
            placeholder="현재 비밀번호를 입력하세요"
            className={styles.input}
            required
          />
        </div>

        <motion.button
          type="submit"
          className={styles.submitBtn}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? "확인 중..." : "확인"}
        </motion.button>
        {error && (
          <p
            style={{
              color: "#ff6b6b",
              marginTop: "0.75rem",
              fontSize: "0.875rem",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
      </form>
    </motion.div>
  );
}
