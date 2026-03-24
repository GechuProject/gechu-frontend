"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Lock, User, Calendar, Camera } from "lucide-react";
import Image from "next/image";
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
  /** 소셜 로그인 등 비밀번호 없음 — 비밀번호 변경 블록 숨김 */
  hidePasswordChange?: boolean;
  profileImgUrl?: string | null;
  onImageChange?: (file: File) => void;
  onImageDelete?: () => void;
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
  hidePasswordChange = false,
  profileImgUrl,
  onImageChange,
  onImageDelete,
}: EditProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 미리보기 생성
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setImgError(false);

    if (onImageChange) {
      onImageChange(file);
    }
  };

  const displayUrl =
    previewUrl || (profileImgUrl && !imgError ? profileImgUrl : null);

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

      {/* 프로필 이미지 수정 */}
      <div className={styles.avatarSection}>
        <div
          className={styles.avatarWrap}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              fileInputRef.current?.click();
          }}
        >
          {displayUrl ? (
            <Image
              src={displayUrl}
              alt="프로필 이미지"
              fill
              sizes="128px"
              className={styles.avatarImg}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <User
                style={{
                  width: "3rem",
                  height: "3rem",
                  color: "rgba(255,255,255,0.4)",
                }}
              />
            </div>
          )}
          <div className={styles.avatarOverlay}>
            <Camera
              style={{ width: "1.5rem", height: "1.5rem", color: "#fff" }}
            />
          </div>
        </div>
        <p className={styles.avatarHint}>클릭하여 프로필 사진 변경</p>
        {displayUrl && (
          <button
            type="button"
            className={styles.deleteAvatarBtn}
            onClick={() => {
              if (onImageDelete) onImageDelete();
              setPreviewUrl(null);
            }}
          >
            기본 이미지로 변경
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className={styles.fileInput}
        />
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

        {!hidePasswordChange && (
          <>
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
          </>
        )}

        {hidePasswordChange && (
          <p className={styles.hint} style={{ marginTop: "1rem" }}>
            소셜 로그인으로 가입한 계정은 비밀번호가 없습니다.
            닉네임·생일·프로필 사진만 수정할 수 있어요.
          </p>
        )}

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
