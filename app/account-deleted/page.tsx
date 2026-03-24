"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import styles from "./page.module.scss";

/**
 * 회원 탈퇴 완료 후 감사 인사 — 토스트만으로는 정책·감정 전달이 부족해 별도 페이지로 둠
 */
export default function AccountDeletedPage() {
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.iconWrap}>
          <Heart
            className={styles.icon}
            fill="currentColor"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
        <h1 className={styles.title}>그동안 이용해 주셔서 감사합니다</h1>
        <p className={styles.lead}>
          회원 탈퇴가 접수되었습니다. 계정은 일정 기간 후 영구 삭제되며, 그
          전까지 복구할 수 있습니다.
        </p>
        <p className={styles.detail}>
          탈퇴 후 7일 이내 복구가 가능하고, 7일 이후에는 동일 이메일로 새로
          가입하게 됩니다.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primaryBtn}>
            홈으로 가기
          </Link>
          <Link href="/login" className={styles.secondaryBtn}>
            로그인 페이지
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
