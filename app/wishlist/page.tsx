"use client";

import { Navigation } from "@/app/components/Navigation";
import { motion } from "motion/react";
import { Heart, X, Filter, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const wishlistGames = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩39,900",
    originalPrice: "₩59,900",
    discount: "-33%",
    rating: 9.2,
    genre: "액션 RPG",
    releaseDate: "2026.01.15",
  },
  {
    id: 2,
    title: "Fantasy Realm",
    image:
      "https://images.unsplash.com/photo-1759688168277-185a0c623968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwUlBHJTIwZ2FtZSUyMGFydHxlbnwxfHx8fDE3NzE4Mjg4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩37,425",
    originalPrice: "₩49,900",
    discount: "-25%",
    rating: 9.3,
    genre: "RPG",
    releaseDate: "2025.12.10",
  },
  {
    id: 3,
    title: "Battle Royale Pro",
    image:
      "https://images.unsplash.com/photo-1764011643213-1f3b3691f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4MDAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.2,
    genre: "배틀로얄",
    releaseDate: "출시됨",
  },
  {
    id: 4,
    title: "Open World Explorer",
    image:
      "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩59,900",
    rating: 9.1,
    genre: "오픈월드",
    releaseDate: "2026.02.20",
  },
  {
    id: 5,
    title: "Dark Shadows",
    image:
      "https://images.unsplash.com/photo-1723388159368-53b9be8899e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzdXJ2aXZhbCUyMGdhbWV8ZW58MXx8fHwxNzcxNzE1OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩44,900",
    rating: 9.0,
    genre: "호러",
    releaseDate: "2026.03.15",
  },
  {
    id: 6,
    title: "Speed Racer X",
    image:
      "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTgxNzc2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩17,940",
    originalPrice: "₩29,900",
    discount: "-40%",
    rating: 8.8,
    genre: "레이싱",
    releaseDate: "출시됨",
  },
];

// 3D Icon Component
function Icon3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        filter: "drop-shadow(0 4px 8px rgba(228, 255, 48, 0.3))",
        transform: "perspective(1000px) rotateX(10deg)",
      }}
    >
      {children}
    </div>
  );
}

export default function WishlistPage() {
  const [games, setGames] = useState(wishlistGames);
  const [filter, setFilter] = useState<"all" | "discount" | "free">("all");

  const removeFromWishlist = (id: number) => {
    setGames(games.filter((game) => game.id !== id));
  };

  const filteredGames = games.filter((game) => {
    if (filter === "all") return true;
    if (filter === "discount") return game.discount;
    if (filter === "free") return game.price === "무료";
    return true;
  });

  return (
    <div className="min-h-screen bg-black pt-40">
      <Navigation />

      <div className="mx-auto max-w-[1400px] px-6 py-16">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Icon3D>
              <Heart className="h-10 w-10 fill-[#E4FF30] text-[#E4FF30]" />
            </Icon3D>
            <div>
              <h1 className="text-5xl font-bold text-white">위시리스트</h1>
              <p className="mt-2 text-white/50">
                {filteredGames.length}개의 게임
              </p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={() => setFilter("all")}
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all ${
                filter === "all"
                  ? "bg-[#E4FF30] text-black"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="h-4 w-4" />
              전체
            </motion.button>

            <motion.button
              onClick={() => setFilter("discount")}
              className={`cursor-pointer rounded-lg px-4 py-2 transition-all ${
                filter === "discount"
                  ? "bg-[#E4FF30] text-black"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              할인중
            </motion.button>

            <motion.button
              onClick={() => setFilter("free")}
              className={`cursor-pointer rounded-lg px-4 py-2 transition-all ${
                filter === "free"
                  ? "bg-[#E4FF30] text-black"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              무료
            </motion.button>
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length === 0 ? (
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
        ) : (
          <div className="space-y-4">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
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
                            <span className="text-sm text-white">
                              {game.rating}
                            </span>
                          </div>
                          <span className="text-sm text-white/50">
                            {game.genre}
                          </span>
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
                          removeFromWishlist(game.id);
                        }}
                        className="z-10 rounded-full p-2 transition-colors hover:bg-red-500/20"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="h-5 w-5 text-red-500" />
                      </motion.button>

                      <div className="text-right">
                        {"originalPrice" in game && game.originalPrice && (
                          <p className="mb-1 text-sm text-white/50 line-through">
                            {game.originalPrice}
                          </p>
                        )}
                        <p className="text-2xl font-bold text-[#E4FF30]">
                          {game.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Summary */}
        {filteredGames.length > 0 && (
          <div className="mt-12 rounded-lg border border-white/10 bg-white/5 p-6">
            <div>
              <p className="mb-1 text-white/50">
                총 {filteredGames.length}개 게임
              </p>
              <p className="text-sm text-white">
                할인 중인 게임: {filteredGames.filter((g) => g.discount).length}
                개
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
