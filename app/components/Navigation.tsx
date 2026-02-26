"use client";

import {
  Search,
  User,
  Menu,
  Gamepad2,
  X,
  Star,
  TrendingUp,
  Sparkles,
  Heart,
  UserCircle,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Mock game data for search
const allGames = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩39,900",
    rating: 9.2,
    genre: "액션 RPG",
    category: "trending",
  },
  {
    id: 2,
    title: "Fantasy Realm",
    image:
      "https://images.unsplash.com/photo-1759688168277-185a0c623968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwUlBHJTIwZ2FtZSUyMGFydHxlbnwxfHx8fDE3NzE4Mjg4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩37,425",
    rating: 9.3,
    genre: "RPG",
    category: "popular",
  },
  {
    id: 3,
    title: "Battle Royale Pro",
    image:
      "https://images.unsplash.com/photo-1764011643213-1f3b3691f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4MDAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.2,
    genre: "배틀로얄",
    category: "trending",
  },
  {
    id: 4,
    title: "Open World Explorer",
    image:
      "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩59,900",
    rating: 9.1,
    genre: "오픈월드",
    category: "new",
  },
  {
    id: 5,
    title: "Dark Shadows",
    image:
      "https://images.unsplash.com/photo-1723388159368-53b9be8899e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzdXJ2aXZhbCUyMGdhbWV8ZW58MXx8fHwxNzcxNzE1OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩44,900",
    rating: 9.0,
    genre: "호러",
    category: "popular",
  },
  {
    id: 6,
    title: "Speed Racer X",
    image:
      "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTgxNzc2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩17,940",
    rating: 8.8,
    genre: "레이싱",
    category: "trending",
  },
  {
    id: 7,
    title: "Mystery Island",
    image:
      "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩29,900",
    rating: 8.9,
    genre: "어드벤처",
    category: "new",
  },
  {
    id: 8,
    title: "Space Warriors",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.4,
    genre: "슈팅",
    category: "popular",
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

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { path: "/", label: "홈" },
    { path: "/recommend", label: "추천게임" },
  ];

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter games based on search query
  const filteredGames = searchQuery.trim()
    ? allGames.filter(
        (game) =>
          game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Get recommended games when no search query
  const trendingGames = allGames
    .filter((g) => g.category === "trending")
    .slice(0, 4);
  const popularGames = allGames
    .filter((g) => g.category === "popular")
    .slice(0, 4);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Top Bar - Logo, Menu, Icons */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Icon3D>
              <Gamepad2 className="h-8 w-8 text-[#E4FF30]" />
            </Icon3D>
            <span className="text-2xl font-bold text-white">Gechu</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-white transition-colors hover:text-[#E4FF30] ${
                  pathname === link.path ? "text-[#E4FF30]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="cursor-pointer"
              >
                <Icon3D>
                  <User className="h-6 w-6 text-white transition-colors hover:text-[#E4FF30]" />
                </Icon3D>
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 z-[100] mt-4 w-56 overflow-hidden rounded-xl border border-[#E4FF30]/20 bg-black/95 shadow-2xl backdrop-blur-xl"
                    style={{
                      boxShadow:
                        "0 20px 60px rgba(228, 255, 48, 0.2), 0 0 40px rgba(228, 255, 48, 0.1)",
                    }}
                  >
                    <div className="p-2">
                      <Link
                        href="/wishlist"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <motion.div
                          className="group flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-[#E4FF30]/10"
                          whileHover={{ x: 4 }}
                        >
                          <Heart className="h-5 w-5 text-[#E4FF30]" />
                          <span className="text-white transition-colors group-hover:text-[#E4FF30]">
                            위시리스트
                          </span>
                        </motion.div>
                      </Link>

                      <Link
                        href="/mypage"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <motion.div
                          className="group flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-[#E4FF30]/10"
                          whileHover={{ x: 4 }}
                        >
                          <UserCircle className="h-5 w-5 text-[#E4FF30]" />
                          <span className="text-white transition-colors group-hover:text-[#E4FF30]">
                            마이페이지
                          </span>
                        </motion.div>
                      </Link>

                      <div className="my-2 h-px bg-white/10" />

                      <Link
                        href="/login"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <motion.div
                          className="group flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-red-500/10"
                          whileHover={{ x: 4 }}
                        >
                          <LogOut className="h-5 w-5 text-red-400" />
                          <span className="text-white transition-colors group-hover:text-red-400">
                            로그아웃
                          </span>
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer lg:hidden"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar - Full Width */}
        <div className="hidden pb-4 md:block" ref={searchRef}>
          <div className="relative">
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition-all hover:border-[#E4FF30]/30">
              <Search className="mr-3 h-5 w-5 text-white/50" />
              <input
                type="text"
                placeholder="게임 검색 (제목, 장르)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="w-full border-none bg-transparent text-lg text-white placeholder-white/50 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowResults(false);
                  }}
                  className="ml-2 cursor-pointer"
                >
                  <X className="h-5 w-5 text-white/50 transition-colors hover:text-white" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown - Full Width */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 left-0 mt-2 overflow-hidden rounded-2xl border border-[#E4FF30]/20 bg-black/95 shadow-2xl backdrop-blur-xl"
                  style={{
                    boxShadow:
                      "0 20px 60px rgba(228, 255, 48, 0.2), 0 0 40px rgba(228, 255, 48, 0.1)",
                  }}
                >
                  {searchQuery.trim() ? (
                    // Search Results
                    filteredGames.length > 0 ? (
                      <div className="max-h-[600px] overflow-y-auto">
                        <div className="border-b border-white/10 p-5">
                          <p className="text-sm text-white/50">
                            {filteredGames.length}개의 검색 결과
                          </p>
                        </div>
                        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2">
                          {filteredGames.map((game, index) => (
                            <Link
                              key={game.id}
                              href={`/game/${game.id}`}
                              onClick={() => {
                                setSearchQuery("");
                                setShowResults(false);
                              }}
                            >
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group flex cursor-pointer items-center gap-4 rounded-xl border border-white/5 p-4 transition-all hover:border-[#E4FF30]/30 hover:bg-white/5"
                                whileHover={{ scale: 1.02, x: 4 }}
                              >
                                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
                                  <img
                                    src={game.image}
                                    alt={game.title}
                                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>

                                <div className="flex-1">
                                  <h4 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-[#E4FF30]">
                                    {game.title}
                                  </h4>
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-[#E4FF30] text-[#E4FF30]" />
                                      <span className="text-sm text-white/70">
                                        {game.rating}
                                      </span>
                                    </div>
                                    <span className="text-sm text-white/50">
                                      {game.genre}
                                    </span>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <p className="text-lg font-bold text-[#E4FF30]">
                                    {game.price}
                                  </p>
                                </div>
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <Search className="mx-auto mb-4 h-16 w-16 text-white/20" />
                        <p className="text-lg text-white/50">
                          검색 결과가 없습니다
                        </p>
                        <p className="mt-2 text-sm text-white/30">
                          다른 키워드로 검색해보세요
                        </p>
                      </div>
                    )
                  ) : (
                    // Recommended Games (when no search query)
                    <div className="max-h-[600px] overflow-y-auto">
                      <div className="border-b border-white/10 p-5">
                        <p className="flex items-center gap-2 text-lg font-bold text-white">
                          <Sparkles className="h-5 w-5 text-[#E4FF30]" />
                          추천 게임
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
                        {/* Trending Section */}
                        <div>
                          <div className="mb-4 flex items-center gap-2 px-2">
                            <TrendingUp className="h-5 w-5 text-[#E4FF30]" />
                            <h3 className="font-bold text-white/70">
                              인기 급상승
                            </h3>
                          </div>
                          <div className="space-y-2">
                            {trendingGames.map((game, index) => (
                              <Link
                                key={game.id}
                                href={`/game/${game.id}`}
                                onClick={() => setShowResults(false)}
                              >
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="group flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 p-3 transition-all hover:border-[#E4FF30]/30 hover:bg-white/5"
                                  whileHover={{ scale: 1.02, x: 4 }}
                                >
                                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded">
                                    <img
                                      src={game.image}
                                      alt={game.title}
                                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="truncate font-bold text-white transition-colors group-hover:text-[#E4FF30]">
                                      {game.title}
                                    </h4>
                                    <p className="text-sm text-white/50">
                                      {game.genre}
                                    </p>
                                  </div>
                                  <p className="font-bold text-[#E4FF30]">
                                    {game.price}
                                  </p>
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Popular Section */}
                        <div>
                          <div className="mb-4 flex items-center gap-2 px-2">
                            <Star className="h-5 w-5 fill-[#E4FF30] text-[#E4FF30]" />
                            <h3 className="font-bold text-white/70">
                              인기 게임
                            </h3>
                          </div>
                          <div className="space-y-2">
                            {popularGames.map((game, index) => (
                              <Link
                                key={game.id}
                                href={`/game/${game.id}`}
                                onClick={() => setShowResults(false)}
                              >
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay:
                                      (trendingGames.length + index) * 0.05,
                                  }}
                                  className="group flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 p-3 transition-all hover:border-[#E4FF30]/30 hover:bg-white/5"
                                  whileHover={{ scale: 1.02, x: 4 }}
                                >
                                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded">
                                    <img
                                      src={game.image}
                                      alt={game.title}
                                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="truncate font-bold text-white transition-colors group-hover:text-[#E4FF30]">
                                      {game.title}
                                    </h4>
                                    <p className="text-sm text-white/50">
                                      {game.genre}
                                    </p>
                                  </div>
                                  <p className="font-bold text-[#E4FF30]">
                                    {game.price}
                                  </p>
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="border-t border-white/10 pt-4 pb-4 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-2 text-white transition-colors hover:text-[#E4FF30] ${
                  pathname === link.path ? "text-[#E4FF30]" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
