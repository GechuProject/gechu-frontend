"use client";

import { motion } from "motion/react";
import { Heart, Filter } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";
import styles from "./WishlistHeader.module.scss";

type FilterType = "all" | "discount" | "free";

interface WishlistHeaderProps {
  gameCount: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function WishlistHeader({ gameCount, filter, onFilterChange }: WishlistHeaderProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "전체" },
    { value: "discount", label: "할인중" },
    { value: "free", label: "무료" },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.titleWrap}>
        <Icon3D>
          <Heart style={{ width: "2.5rem", height: "2.5rem", fill: "#E4FF30", color: "#E4FF30" }} />
        </Icon3D>
        <div>
          <h1 className={styles.heading}>위시리스트</h1>
          <p className={styles.count}>{gameCount}개의 게임</p>
        </div>
      </div>

      <div className={styles.filters}>
        {filters.map(({ value, label }) => (
          <motion.button
            key={value}
            onClick={() => onFilterChange(value)}
            className={filter === value ? styles.filterBtnActive : styles.filterBtnDefault}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {value === "all" && <Filter style={{ width: "1rem", height: "1rem" }} />}
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
