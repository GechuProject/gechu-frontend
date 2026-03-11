"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Check, Gamepad2, Settings, Tag } from "lucide-react";
import {
  availableGenres,
  availablePlatforms,
  availableThemes,
} from "@/src/mocks/data/preferences";
import styles from "./PreferencesModal.module.scss";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  selectedGenres: string[];
  selectedPlatforms: string[];
  selectedThemes: string[];
  onToggle: (
    item: string,
    list: string[],
    setList: (l: string[]) => void
  ) => void;
  setSelectedGenres: (l: string[]) => void;
  setSelectedPlatforms: (l: string[]) => void;
  setSelectedThemes: (l: string[]) => void;
}

export function PreferencesModal({
  isOpen,
  onClose,
  onSave,
  selectedGenres,
  selectedPlatforms,
  selectedThemes,
  onToggle,
  setSelectedGenres,
  setSelectedPlatforms,
  setSelectedThemes,
}: PreferencesModalProps) {
  const sections = [
    {
      title: "선호 장르",
      icon: Gamepad2,
      items: availableGenres,
      selected: selectedGenres,
      setSelected: setSelectedGenres,
    },
    {
      title: "선호 플랫폼",
      icon: Settings,
      items: availablePlatforms,
      selected: selectedPlatforms,
      setSelected: setSelectedPlatforms,
    },
    {
      title: "선호 테마",
      icon: Tag,
      items: availableThemes,
      selected: selectedThemes,
      setSelected: setSelectedThemes,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className={styles.center}>
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>게임 취향 수정하기</h2>
                <motion.button
                  onClick={onClose}
                  className={styles.closeBtn}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X
                    style={{ width: "1.5rem", height: "1.5rem", color: "#fff" }}
                  />
                </motion.button>
              </div>

              <div className={styles.body}>
                {sections.map(
                  ({ title, icon: Icon, items, selected, setSelected }) => (
                    <div key={title}>
                      <h3 className={styles.sectionTitle}>
                        <Icon
                          style={{
                            width: "1.25rem",
                            height: "1.25rem",
                            color: "#E4FF30",
                          }}
                        />
                        {title}
                      </h3>
                      <div className={styles.tagWrap}>
                        {items.map((item) => {
                          const isSelected = selected.includes(item);
                          return (
                            <motion.button
                              key={item}
                              onClick={() =>
                                onToggle(item, selected, setSelected)
                              }
                              className={
                                isSelected
                                  ? styles.tagBtnSelected
                                  : styles.tagBtnDefault
                              }
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {isSelected && (
                                <Check
                                  style={{
                                    display: "inline",
                                    width: "1rem",
                                    height: "1rem",
                                    marginRight: "0.25rem",
                                  }}
                                />
                              )}
                              {item}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className={styles.footer}>
                <motion.button
                  onClick={onSave}
                  className={styles.saveBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  저장하기
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className={styles.cancelBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  취소
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
