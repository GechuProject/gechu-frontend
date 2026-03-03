"use client";

import { motion } from "motion/react";
import { Heart, Share2, Star } from "lucide-react";

interface GameHeroProps {
  image: string;
  title: string;
  subtitle: string;
  genre: string;
  rating: number;
}

/** 게임 상세 페이지 히어로 섹션 (배경 이미지, 장르, 별점, 타이틀, 액션 버튼) */
export function GameHero({
  image,
  title,
  subtitle,
  genre,
  rating,
}: GameHeroProps) {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-6 pb-12">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded bg-[#E4FF30] px-3 py-1 text-sm font-bold text-black">
                {genre}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-[#E4FF30] text-[#E4FF30]" />
                <span className="font-bold text-white">{rating}</span>
              </div>
            </div>

            <h1 className="mb-3 text-6xl font-bold text-white">{title}</h1>
            <p className="mb-6 text-xl text-white/80">{subtitle}</p>

            <div className="flex gap-4">
              <motion.button
                className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-6 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="h-5 w-5" />
              </motion.button>

              <motion.button
                className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-6 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
