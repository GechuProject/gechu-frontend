"use client";

import Image from "next/image";
import { motion } from "motion/react";
import styles from "./GameScreenshots.module.scss";

interface GameScreenshotsProps {
  screenshots: string[];
  fallbackImage: string;
  title: string;
}

export function GameScreenshots({
  screenshots,
  fallbackImage,
  title,
}: GameScreenshotsProps) {
  // 스크린샷이 없으면 fallback 이미지를 1장 표시
  const images =
    screenshots.length > 0 ? screenshots.slice(0, 8) : [fallbackImage];

  return (
    <div>
      <h2 className={styles.heading}>스크린샷</h2>
      <div className={styles.grid}>
        {images.map((src, i) => (
          <motion.div
            key={i}
            className={styles.thumb}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={src}
              alt={`${title} Screenshot ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
