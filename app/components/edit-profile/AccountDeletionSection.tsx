"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { getApiErrorMessage } from "@/src/api/mypage";
import { DeleteAccountModal } from "./DeleteAccountModal";
import styles from "./AccountDeletionSection.module.scss";

type AccountDeletionSectionProps = {
  onDeleteConfirmed: () => Promise<void>;
};

export function AccountDeletionSection({
  onDeleteConfirmed,
}: AccountDeletionSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setError(null);
    setIsDeleting(true);
    try {
      await onDeleteConfirmed();
    } catch (err) {
      setError(getApiErrorMessage(err));
      setIsDeleting(false);
    }
  };

  return (
    <>
      <section
        className={styles.section}
        aria-labelledby="account-delete-heading"
      >
        <div className={styles.sectionHeader}>
          <AlertTriangle
            className={styles.warnIcon}
            aria-hidden
            strokeWidth={2}
          />
          <h2 id="account-delete-heading" className={styles.title}>
            계정 삭제
          </h2>
        </div>
        <div className={styles.body}>
          <p>
            회원님의 계정은 <strong>7일 후</strong> 영구 삭제됩니다. 탈퇴 시
            개인정보·이용 기록 등은 서비스 정책에 따라 처리됩니다.
          </p>
        </div>
        <button
          type="button"
          className={styles.dangerBtn}
          onClick={() => {
            setError(null);
            setModalOpen(true);
          }}
        >
          계정 삭제
        </button>
      </section>

      <DeleteAccountModal
        open={modalOpen}
        onClose={() => {
          if (!isDeleting) setModalOpen(false);
        }}
        onConfirm={handleConfirm}
        isDeleting={isDeleting}
        error={error}
      />
    </>
  );
}
