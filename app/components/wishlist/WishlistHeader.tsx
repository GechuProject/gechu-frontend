"use client";

import { motion } from "motion/react";
import { Heart, Filter } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";

type FilterType = "all" | "discount" | "free";

interface WishlistHeaderProps {
  gameCount: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function WishlistHeader({
  gameCount,
  filter,
  onFilterChange,
}: WishlistHeaderProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "전체" },
    { value: "discount", label: "할인중" },
    { value: "free", label: "무료" },
  ];

  return (
    <div className="mb-12 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Icon3D>
          <Heart className="h-10 w-10 fill-[#E4FF30] text-[#E4FF30]" />
        </Icon3D>
        <div>
          <h1 className="text-5xl font-bold text-white">위시리스트</h1>
          <p className="mt-2 text-white/50">{gameCount}개의 게임</p>
        </div>
      </div>

      <div className="flex gap-3">
        {filters.map(({ value, label }) => (
          <motion.button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all ${
              filter === value
                ? "bg-[#E4FF30] text-black"
                : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {value === "all" && <Filter className="h-4 w-4" />}
            {label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
