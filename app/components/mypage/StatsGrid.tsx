"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";
import styles from "./StatsGrid.module.scss";

interface WishlistItem {
  id: number;
  name: string;
  slug: string;
  thumbnail_img_url: string;
  rawg_rating: number;
  saved_at: string;
}

interface StatsGridProps {
  wishlistCount: number;
  wishlistItems: WishlistItem[];
}

export function StatsGrid({ wishlistCount, wishlistItems }: StatsGridProps) {
  return (
    <div className={styles.section}>
      {/* 위시리스트 카운트 카드 */}
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

      {/* 위시리스트 아이템 목록 */}
      <div className={styles.wishlistGrid}>
        {wishlistItems.map((item) => (
          <motion.div
            key={item.id}
            className={styles.wishlistCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // transition={{ delay: 0.1 + index * 0.05 }}
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
