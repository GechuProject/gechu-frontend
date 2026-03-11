"use client";

import Image from "next/image";
import { motion } from "motion/react";
import styles from "./GameScreenshots.module.scss";

interface GameScreenshotsProps {
  image: string;
  title: string;
}

export function GameScreenshots({ image, title }: GameScreenshotsProps) {
  return (
    <div>
      <h2 className={styles.heading}>스크린샷</h2>
      <div className={styles.grid}>
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={styles.thumb}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={image}
              alt={`${title} Screenshot ${i}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
