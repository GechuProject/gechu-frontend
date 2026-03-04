"use client";

import { motion } from "motion/react";
import { Gamepad2, Settings, Tag } from "lucide-react";
import styles from "./GamePreferences.module.scss";

interface PreferenceItem {
  id: number;
  name: string;
}

interface GamePreferencesData {
  genres: PreferenceItem[];
  platforms: PreferenceItem[];
  tags: PreferenceItem[];
}

interface GamePreferencesProps {
  preferences: GamePreferencesData;
  onEditClick: () => void;
}

const preferenceCards = [
  {
    key: "genres" as const,
    icon: Gamepad2,
    label: "선호 장르",
    delay: 0.2,
  },
  {
    key: "platforms" as const,
    icon: Settings,
    label: "선호 플랫폼",
    delay: 0.3,
  },
  { key: "tags" as const, icon: Tag, label: "선호 테마", delay: 0.4 },
];

export function GamePreferences({
  preferences,
  onEditClick,
}: GamePreferencesProps) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>내 게임 취향</h2>
        <motion.button
          onClick={onEditClick}
          className={styles.editBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          취향 수정하기
        </motion.button>
      </div>

      <div className={styles.grid}>
        {preferenceCards.map(({ key, icon: Icon, label, delay }) => (
          <motion.div
            key={key}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
          >
            <h3 className={styles.cardTitle}>
              <Icon
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#E4FF30",
                }}
              />
              {label}
            </h3>
            <div className={styles.tags}>
              {preferences[key].map((item) => (
                <span key={item.id} className={styles.tag}>
                  {item.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
