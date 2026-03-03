"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface GameFeaturesProps {
  features: string[];
}

/** 주요 특징 목록 */
export function GameFeatures({ features }: GameFeaturesProps) {
  return (
    <div className="mb-12">
      <h2 className="mb-6 text-3xl font-bold text-white">주요 특징</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChevronRight className="h-5 w-5 text-[#E4FF30]" />
            <span className="text-white">{feature}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
