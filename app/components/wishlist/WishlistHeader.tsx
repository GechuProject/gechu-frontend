"use client";

import { motion } from "motion/react";
import { Heart, ArrowUpDown } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";
import styles from "./WishlistHeader.module.scss";

type SortType = "all" | "rating_high" | "rating_low";

interface WishlistHeaderProps {
  gameCount: number;
  sort: SortType;
  onSortChange: (sort: SortType) => void;
}

export function WishlistHeader({
  gameCount,
  sort,
  onSortChange,
}: WishlistHeaderProps) {
  const sortOptions: { value: SortType; label: string }[] = [
    { value: "all", label: "전체" },
    { value: "rating_high", label: "별점 높은순" },
    { value: "rating_low", label: "별점 낮은순" },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.titleWrap}>
        <Icon3D>
          <Heart
            style={{
              width: "2.5rem",
              height: "2.5rem",
              fill: "#E4FF30",
              color: "#E4FF30",
            }}
          />
        </Icon3D>
        <div>
          <h1 className={styles.heading}>위시리스트</h1>
          <p className={styles.count}>{gameCount}개의 게임</p>
        </div>
      </div>

      <div className={styles.filters}>
        {sortOptions.map(({ value, label }) => (
          <motion.button
            key={value}
            onClick={() => onSortChange(value)}
            className={
              sort === value ? styles.filterBtnActive : styles.filterBtnDefault
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {value === "all" && (
              <ArrowUpDown style={{ width: "1rem", height: "1rem" }} />
            )}
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
