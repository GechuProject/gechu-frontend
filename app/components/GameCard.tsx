"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Star, Heart } from "lucide-react";
import Link from "next/link";

interface GameCardProps {
  game: {
    id: number;
    title: string;
    image: string;
    price: string;
    rating: number;
    discount?: string;
    genre: string;
  };
  index: number;
}

export function GameCard({ game, index }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/game/${game.id}`}>
      <motion.div
        className="group relative cursor-pointer overflow-hidden rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img
            src={game.image}
            alt={game.title}
            className="h-full w-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Discount Badge */}
          {game.discount && (
            <div className="absolute top-3 left-3 rounded bg-[#E4FF30] px-3 py-1 text-sm font-bold text-black">
              {game.discount}
            </div>
          )}

          {/* Wishlist Icon */}
          <motion.button
            className="absolute top-3 right-3 cursor-pointer rounded-full bg-black/50 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist logic
            }}
          >
            <Heart className="h-5 w-5 text-white" />
          </motion.button>

          {/* Hover Info */}
          <motion.div
            className="absolute right-0 bottom-0 left-0 translate-y-full p-4 transition-transform group-hover:translate-y-0"
            initial={false}
          >
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-[#E4FF30] text-[#E4FF30]" />
              <span className="text-sm text-white">{game.rating}</span>
              <span className="text-sm text-white/50">• {game.genre}</span>
            </div>
          </motion.div>
        </div>

        {/* Game Info */}
        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity group-hover:opacity-0">
          <h3 className="mb-1 line-clamp-1 font-bold text-white">
            {game.title}
          </h3>
          <p className="text-lg font-bold text-[#E4FF30]">{game.price}</p>
        </div>
      </motion.div>
    </Link>
  );
}
