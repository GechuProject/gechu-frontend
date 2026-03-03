"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";

interface StatsGridProps {
  wishlistCount: number;
}

export function StatsGrid({ wishlistCount }: StatsGridProps) {
  return (
    <div className="mb-8">
      <motion.div
        className="inline-block rounded-lg border border-white/10 bg-white/5 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Icon3D className="mb-3">
          <Heart className="h-6 w-6 text-[#E4FF30]" />
        </Icon3D>
        <p className="mb-1 text-3xl font-bold text-white">{wishlistCount}</p>
        <p className="text-sm text-white/50">위시리스트</p>
      </motion.div>
    </div>
  );
}
