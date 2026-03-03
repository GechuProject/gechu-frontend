"use client";

import { motion } from "motion/react";
import { Gamepad2 } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";
import styles from "./LoginLogo.module.scss";

export function LoginLogo() {
  return (
    <div className={styles.logoWrap}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={styles.iconWrap}
      >
        <Icon3D>
          <Gamepad2 style={{ width: "5rem", height: "5rem", color: "#E4FF30" }} />
        </Icon3D>
      </motion.div>
      <h1 className={styles.title}>Gechu</h1>
      <p className={styles.subtitle}>당신의 취향에 맞는 게임을 찾아드립니다</p>
    </div>
  );
}
