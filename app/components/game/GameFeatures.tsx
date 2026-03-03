"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import styles from "./GameFeatures.module.scss";

interface GameFeaturesProps {
  features: string[];
}

export function GameFeatures({ features }: GameFeaturesProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>주요 특징</h2>
      <div className={styles.grid}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={styles.item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChevronRight style={{ width: "1.25rem", height: "1.25rem", color: "#E4FF30", flexShrink: 0 }} />
            <span className={styles.itemText}>{feature}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
