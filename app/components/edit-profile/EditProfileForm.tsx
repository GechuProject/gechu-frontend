"use client";

import { motion } from "motion/react";
import { Lock, User, Calendar } from "lucide-react";
import Link from "next/link";
import styles from "./EditProfileForm.module.scss";

interface EditFormData {
  currentPasswordEdit: string;
  newPassword: string;
  confirmPassword: string;
  nickname: string;
  birth_date: string;
}

interface EditProfileFormProps {
  formData: EditFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const passwordFields = [
  {
    label: "새 비밀번호",
    name: "newPassword" as const,
    placeholder: "새 비밀번호 (8자 이상)",
  },
  {
    label: "새 비밀번호 확인",
    name: "confirmPassword" as const,
    placeholder: "새 비밀번호 확인",
  },
];

export function EditProfileForm({
  formData,
  onChange,
  onSubmit,
}: EditProfileFormProps) {
  return (
    <motion.div
      className={styles.form}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>내정보 수정</h1>
        <p className={styles.subtitle}>
          회원정보를 안전하게 변경할 수 있습니다
        </p>
      </div>

      <form onSubmit={onSubmit} className={styles.fields}>
        <div>
          <label className={styles.label}>닉네임</label>
          <div className={styles.inputWrap}>
            <div className={styles.inputIcon}>
              <User style={{ width: "1.25rem", height: "1.25rem" }} />
            </div>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={onChange}
              placeholder="닉네임을 입력하세요"
              className={styles.input}
              required
            />
          </div>
        </div>

        <div>
          <label className={styles.label}>생년월일</label>
          <div className={styles.inputWrap}>
            <div className={styles.inputIcon}>
              <Calendar style={{ width: "1.25rem", height: "1.25rem" }} />
            </div>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date || ""}
              onChange={onChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.pwSection}>
          <h2 className={styles.sectionTitle}>비밀번호 변경</h2>
          <p className={styles.hint}>
            비밀번호를 변경하지 않으려면 아래 필드를 비워두세요
          </p>

          {passwordFields.map(({ label, name, placeholder }) => (
            <div key={name}>
              <label className={styles.label}>{label}</label>
              <div className={styles.inputWrap}>
                <div className={styles.inputIcon}>
                  <Lock style={{ width: "1.25rem", height: "1.25rem" }} />
                </div>
                <input
                  type="password"
                  name={name}
                  value={formData[name]}
                  onChange={onChange}
                  placeholder={placeholder}
                  className={styles.input}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <motion.button
            type="submit"
            className={styles.saveBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            저장하기
          </motion.button>
          <Link href="/mypage" style={{ flex: 1 }}>
            <motion.button
              type="button"
              className={styles.cancelBtn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              취소
            </motion.button>
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
