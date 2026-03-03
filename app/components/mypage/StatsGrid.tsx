"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";
import styles from "./StatsGrid.module.scss";

interface StatsGridProps {
  wishlistCount: number;
}

export function StatsGrid({ wishlistCount }: StatsGridProps) {
  return (
    <div className={styles.section}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Icon3D className={styles.iconWrap}>
          <Heart
            style={{ width: "1.5rem", height: "1.5rem", color: "#E4FF30" }}
          />
        </Icon3D>
        <p className={styles.count}>{wishlistCount}</p>
        <p className={styles.label}>위시리스트</p>
      </motion.div>
    </div>
  );
}
