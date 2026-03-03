"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import Link from "next/link";
import styles from "./WishlistEmpty.module.scss";

export function WishlistEmpty() {
  return (
    <div className={styles.empty}>
      <Heart className={styles.icon} style={{ width: "4rem", height: "4rem" }} />
      <h2 className={styles.heading}>위시리스트가 비어있습니다</h2>
      <p className={styles.desc}>마음에 드는 게임을 위시리스트에 추가해보세요</p>
      <Link href="/">
        <motion.button className={styles.btn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          게임 둘러보기
        </motion.button>
      </Link>
    </div>
  );
}
