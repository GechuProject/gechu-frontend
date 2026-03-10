"use client";

import { motion } from "motion/react";
import { Lock, User, Mail } from "lucide-react";
import Link from "next/link";
import styles from "./SignupForm.module.scss";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface SignupFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SignupForm({ formData, onChange, onSubmit }: SignupFormProps) {
  const textFields = [
    {
      label: "사용자 이름",
      name: "username" as const,
      type: "text",
      placeholder: "User123",
      Icon: User,
    },
    {
      label: "이메일",
      name: "email" as const,
      type: "email",
      placeholder: "your@email.com",
      Icon: Mail,
    },
    {
      label: "비밀번호",
      name: "password" as const,
      type: "password",
      placeholder: "••••••••",
      Icon: Lock,
    },
    {
      label: "비밀번호 확인",
      name: "confirmPassword" as const,
      type: "password",
      placeholder: "••••••••",
      Icon: Lock,
    },
  ];

  return (
    <motion.div
      className={styles.form}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className={styles.heading}>회원가입</h2>

      <form onSubmit={onSubmit} className={styles.fields}>
        {textFields.map(({ label, name, type, placeholder, Icon }) => (
          <div key={name} className={styles.fieldGroup}>
            <label className={styles.label}>{label}</label>
            <div className={styles.inputWrap}>
              <div className={styles.inputIcon}>
                <Icon style={{ width: "1.25rem", height: "1.25rem" }} />
              </div>
              <input
                type={type}
                name={name}
                value={formData[name] as string}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.input}
                required
              />
            </div>
          </div>
        ))}

        <div className={styles.termsWrap}>
          <label className={styles.termsLabel}>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={onChange}
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

        <motion.button
          type="submit"
          className={styles.submitBtn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          회원가입
        </motion.button>

        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <div className={styles.dividerText}>
            <span className={styles.dividerLabel}>또는</span>
          </div>
        </div>

        <div className={styles.fields}>
          <motion.button
            type="button"
            className={styles.socialBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Google로 가입하기
          </motion.button>
          <motion.button
            type="button"
            className={styles.socialBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Steam으로 가입하기
          </motion.button>
        </div>
      </form>

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
