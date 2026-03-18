"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ChevronRight } from "lucide-react";
import { SavedGame } from "@/src/api/mypage";
import styles from "./StatsGrid.module.scss";

interface StatsGridProps {
  wishlistCount: number;
  wishlistItems: SavedGame[];
}

export function StatsGrid({ wishlistCount, wishlistItems }: StatsGridProps) {
  return (
    <div className={styles.section}>
      {/* 섹션 헤더: 타이틀 + 카운트 + 더보기 버튼 */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Heart
            style={{ width: "1.25rem", height: "1.25rem", color: "#E4FF30" }}
          />
          <h2 className={styles.heading}>위시리스트</h2>
          <span className={styles.count}>{wishlistCount}</span>
        </div>
        <Link href="/wishlist">
          <motion.button
            className={styles.moreBtn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            더보기
            <ChevronRight style={{ width: "1rem", height: "1rem" }} />
          </motion.button>
        </Link>
      </div>

      {/* 위시리스트 아이템 목록 */}
      <div className={styles.wishlistGrid}>
        {wishlistItems.slice(0, 8).map((item) => (
          <motion.div
            key={item.id}
            className={styles.wishlistCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
          >
            <div className={styles.wishlistThumb}>
              <Image
                src={item.thumbnail_img_url}
                alt={item.name}
                fill
                sizes="40px"
                className={styles.thumbImg}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className={styles.wishlistInfo}>
              <p className={styles.wishlistName}>{item.name}</p>
              <p className={styles.wishlistRating}>
                <Star
                  style={{
                    width: "0.75rem",
                    height: "0.75rem",
                    color: "#E4FF30",
                    display: "inline",
                    marginRight: "0.25rem",
                  }}
                />
                {item.rawg_rating.toFixed(2)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
