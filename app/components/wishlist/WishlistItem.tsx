"use client";

import { motion } from "motion/react";
import { Star, X } from "lucide-react";
import Link from "next/link";

interface WishlistGame {
  id: number;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  genre: string;
  releaseDate: string;
}

interface WishlistItemProps {
  game: WishlistGame;
  index: number;
  onRemove: (id: number) => void;
}

/** 위시리스트 개별 게임 아이템 행 */
export function WishlistItem({ game, index, onRemove }: WishlistItemProps) {
  return (
    <motion.div
      className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/game/${game.id}`} className="block">
        <div className="flex gap-6 p-4">
          {/* Game Image */}
          <motion.div
            className="h-32 w-48 shrink-0 overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={game.image}
              alt={game.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Game Info */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-white transition-colors hover:text-[#E4FF30]">
                {game.title}
              </h3>

              <div className="mb-3 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-[#E4FF30] text-[#E4FF30]" />
                  <span className="text-sm text-white">{game.rating}</span>
                </div>
                <span className="text-sm text-white/50">{game.genre}</span>
                <span className="text-sm text-white/50">
                  {game.releaseDate}
                </span>
              </div>

              {game.discount && (
                <span className="inline-block rounded bg-[#E4FF30] px-2 py-1 text-sm font-bold text-black">
                  {game.discount}
                </span>
              )}
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex shrink-0 flex-col items-end justify-between">
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                onRemove(game.id);
              }}
              className="z-10 rounded-full p-2 transition-colors hover:bg-red-500/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5 text-red-500" />
            </motion.button>

            <div className="text-right">
              {game.originalPrice && (
                <p className="mb-1 text-sm text-white/50 line-through">
                  {game.originalPrice}
                </p>
              )}
              <p className="text-2xl font-bold text-[#E4FF30]">{game.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
