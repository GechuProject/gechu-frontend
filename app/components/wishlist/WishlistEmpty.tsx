"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import Link from "next/link";

/** 위시리스트가 비어있을 때 빈 상태 UI */
export function WishlistEmpty() {
  return (
    <div className="py-20 text-center">
      <Heart className="mx-auto mb-4 h-16 w-16 text-white/20" />
      <h2 className="mb-2 text-2xl font-bold text-white">
        위시리스트가 비어있습니다
      </h2>
      <p className="mb-6 text-white/50">
        마음에 드는 게임을 위시리스트에 추가해보세요
      </p>
      <Link href="/">
        <motion.button
          className="rounded-lg bg-[#E4FF30] px-6 py-3 font-bold text-black"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          게임 둘러보기
        </motion.button>
      </Link>
    </div>
  );
}
