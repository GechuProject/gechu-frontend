"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./DeleteAccountModal.module.scss";

type DeleteAccountModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  error?: string | null;
};

export function DeleteAccountModal({
  open,
  onClose,
  onConfirm,
  isDeleting,
  error,
}: DeleteAccountModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div
          ref={overlayRef}
          className={styles.overlay}
          role="presentation"
          onClick={(e) => {
            if (e.target === overlayRef.current && !isDeleting) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="delete-account-title" className={styles.modalTitle}>
              정말 탈퇴하시겠어요?
            </h2>
            <p className={styles.modalBody}>
              탈퇴가 접수되면 7일 이내에만 복구할 수 있고, 그 이후에는 영구
              삭제되어 되돌릴 수 없습니다. 계속 진행할까요?
            </p>
            {error && <p className={styles.modalError}>{error}</p>}
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={onClose}
                disabled={isDeleting}
              >
                취소
              </button>
              <button
                type="button"
                className={styles.confirmBtn}
                onClick={onConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "처리 중..." : "네, 탈퇴합니다"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
