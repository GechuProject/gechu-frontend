"use client";

import { Navigation } from "@/app/components/Navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Mail,
  Settings,
  LogOut,
  Heart,
  Clock,
  Tag,
  Gamepad2,
  X,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const userStats = { wishlistCount: 6 };

const gamePreferences = {
  favoriteGenres: ["RPG", "액션", "어드벤처"],
  favoritePlatforms: ["PC", "PlayStation"],
  favoriteThemes: ["오픈월드", "스토리 중심", "Co-op"],
};

const availableGenres = [
  "RPG",
  "액션",
  "어드벤처",
  "FPS",
  "전략",
  "시뮬레이션",
  "스포츠",
  "레이싱",
  "퍼즐",
  "MMORPG",
];
const availablePlatforms = [
  "PC",
  "PlayStation",
  "Xbox",
  "Nintendo Switch",
  "Mobile",
];
const availableThemes = [
  "오픈월드",
  "스토리 중심",
  "Co-op",
  "PvP",
  "싱글플레이",
  "멀티플레이",
  "생존",
  "공포",
  "판타지",
  "SF",
];

const recentSearches = [
  { id: 1, query: "Cyber Nexus 2077", timestamp: "5분 전" },
  { id: 2, query: "RPG 추천", timestamp: "1시간 전" },
  { id: 3, query: "Battle Royale", timestamp: "3시간 전" },
  { id: 4, query: "무료 게임", timestamp: "어제" },
  { id: 5, query: "Fantasy Realm", timestamp: "2일 전" },
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

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    gamePreferences.favoriteGenres
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    gamePreferences.favoritePlatforms
  );
  const [selectedThemes, setSelectedThemes] = useState<string[]>(
    gamePreferences.favoriteThemes
  );

  const toggleSelection = (
    item: string,
    list: string[],
    setList: (list: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSave = () => {
    console.log("Saved preferences:", {
      selectedGenres,
      selectedPlatforms,
      selectedThemes,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black pt-40">
      <Navigation />

      <div className="mx-auto max-w-[1400px] px-6 py-16">
        {/* Profile Header */}
        <div className="mb-8 rounded-lg border border-white/10 bg-white/5 p-8">
          <div className="flex items-start gap-8">
            {/* Avatar */}
            <div className="shrink-0">
              <motion.div
                className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#E4FF30] to-[#b8cc26]"
                whileHover={{ scale: 1.05 }}
              >
                <User className="h-16 w-16 text-black" />
              </motion.div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="mb-2 text-4xl font-bold text-white">User123</h1>
              <p className="mb-4 flex items-center gap-2 text-white/50">
                <Mail className="h-4 w-4" />
                user123@email.com
              </p>
              <p className="mb-6 text-white/70">
                게임을 사랑하는 열정적인 게이머입니다. 특히 RPG와 액션 게임을
                즐깁니다.
              </p>

              <div className="flex gap-3">
                <Link href="/edit-profile">
                  <motion.button
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#E4FF30] px-6 py-2 font-bold text-black transition-all hover:bg-[#d4ef20]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings className="h-4 w-4" />
                    내정보 수정
                  </motion.button>
                </Link>

                <motion.button
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-2 text-white transition-all hover:bg-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="h-4 w-4" />
                  로그아웃
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
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
            <p className="mb-1 text-3xl font-bold text-white">
              {userStats.wishlistCount}
            </p>
            <p className="text-sm text-white/50">위시리스트</p>
          </motion.div>
        </div>

        {/* 내 게임 취향 */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">내 게임 취향</h2>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              취향 수정하기
            </motion.button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              className="rounded-lg border border-white/10 bg-white/5 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-4 flex items-center gap-2 font-bold text-white">
                <Gamepad2 className="h-5 w-5 text-[#E4FF30]" />
                선호 장르
              </h3>
              <div className="flex flex-wrap gap-2">
                {gamePreferences.favoriteGenres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-[#E4FF30]/20 px-3 py-1 text-sm text-[#E4FF30]"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-lg border border-white/10 bg-white/5 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="mb-4 flex items-center gap-2 font-bold text-white">
                <Settings className="h-5 w-5 text-[#E4FF30]" />
                선호 플랫폼
              </h3>
              <div className="flex flex-wrap gap-2">
                {gamePreferences.favoritePlatforms.map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full bg-[#E4FF30]/20 px-3 py-1 text-sm text-[#E4FF30]"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-lg border border-white/10 bg-white/5 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="mb-4 flex items-center gap-2 font-bold text-white">
                <Tag className="h-5 w-5 text-[#E4FF30]" />
                선호 테마
              </h3>
              <div className="flex flex-wrap gap-2">
                {gamePreferences.favoriteThemes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full bg-[#E4FF30]/20 px-3 py-1 text-sm text-[#E4FF30]"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 최근 검색 내역 */}
        <div>
          <h2 className="mb-6 text-3xl font-bold text-white">최근 검색 내역</h2>
          <div className="space-y-3">
            {recentSearches.map((search, index) => (
              <motion.div
                key={search.id}
                className="group cursor-pointer rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-white/30" />
                    <span className="font-medium text-white transition-colors group-hover:text-[#E4FF30]">
                      {search.query}
                    </span>
                  </div>
                  <span className="text-sm text-white/50">
                    {search.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border-2 border-[#E4FF30] bg-black"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-black p-6">
                  <h2 className="text-2xl font-bold text-white">
                    게임 취향 수정하기
                  </h2>
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-lg p-2 transition-colors hover:bg-white/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-6 w-6 text-white" />
                  </motion.button>
                </div>

                <div className="space-y-8 p-6">
                  {[
                    {
                      title: "선호 장르",
                      icon: Gamepad2,
                      items: availableGenres,
                      selected: selectedGenres,
                      setSelected: setSelectedGenres,
                    },
                    {
                      title: "선호 플랫폼",
                      icon: Settings,
                      items: availablePlatforms,
                      selected: selectedPlatforms,
                      setSelected: setSelectedPlatforms,
                    },
                    {
                      title: "선호 테마",
                      icon: Tag,
                      items: availableThemes,
                      selected: selectedThemes,
                      setSelected: setSelectedThemes,
                    },
                  ].map(
                    ({ title, icon: Icon, items, selected, setSelected }) => (
                      <div key={title}>
                        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                          <Icon className="h-5 w-5 text-[#E4FF30]" />
                          {title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {items.map((item) => {
                            const isSelected = selected.includes(item);
                            return (
                              <motion.button
                                key={item}
                                onClick={() =>
                                  toggleSelection(item, selected, setSelected)
                                }
                                className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-all ${isSelected ? "bg-[#E4FF30] text-black" : "border border-white/10 bg-white/5 text-white hover:bg-white/10"}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {isSelected && (
                                  <Check className="mr-1 inline h-4 w-4" />
                                )}
                                {item}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="sticky bottom-0 flex gap-3 border-t border-white/10 bg-black p-6">
                  <motion.button
                    onClick={handleSave}
                    className="flex-1 cursor-pointer rounded-lg bg-[#E4FF30] py-3 font-bold text-black transition-all hover:bg-[#d4ef20]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    저장하기
                  </motion.button>
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 cursor-pointer rounded-lg border border-white/10 bg-white/5 py-3 text-white transition-all hover:bg-white/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    취소
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
