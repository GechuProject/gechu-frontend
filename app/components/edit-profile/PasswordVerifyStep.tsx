"use client";

import { motion } from "motion/react";
import { Lock, Shield } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";
import styles from "./PasswordVerifyStep.module.scss";

interface PasswordVerifyStepProps {
  currentPassword: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function PasswordVerifyStep({ currentPassword, onChange, onSubmit }: PasswordVerifyStepProps) {
  return (
    <motion.div className={styles.card} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
      <div className={styles.head}>
        <Icon3D className={styles.iconWrap}>
          <Shield style={{ width: "4rem", height: "4rem", color: "#E4FF30" }} />
        </Icon3D>
        <h1 className={styles.title}>보안 확인</h1>
        <p className={styles.subtitle}>내정보를 수정하기 위해 현재 비밀번호를 입력해주세요</p>
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

        <motion.button type="submit" className={styles.submitBtn} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          확인
        </motion.button>
      </form>
    </motion.div>
  );
}
