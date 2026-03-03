"use client";

import { motion } from "motion/react";
import { Gamepad2 } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";
import styles from "./SignupLogo.module.scss";

export function SignupLogo() {
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
      <h1 className={styles.title}>Gechu 가입하기</h1>
      <p className={styles.subtitle}>취향에 맞는 게임을 추천받아 보세요</p>
    </div>
  );
}
