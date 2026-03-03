"use client";

import { motion } from "motion/react";

interface GameScreenshotsProps {
  image: string;
  title: string;
}

/** 스크린샷 그리드 (2x2) */
export function GameScreenshots({ image, title }: GameScreenshotsProps) {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold text-white">스크린샷</h2>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="aspect-video overflow-hidden rounded-lg border border-white/10 bg-white/5"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={image}
              alt={`${title} Screenshot ${i}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
