"use client";

import { motion } from "motion/react";
import { Gamepad2, Settings, Tag } from "lucide-react";

interface GamePreferencesData {
  favoriteGenres: string[];
  favoritePlatforms: string[];
  favoriteThemes: string[];
}

interface GamePreferencesProps {
  preferences: GamePreferencesData;
  onEditClick: () => void;
}

const preferenceCards = [
  {
    key: "favoriteGenres" as const,
    icon: Gamepad2,
    label: "선호 장르",
    delay: 0.2,
  },
  {
    key: "favoritePlatforms" as const,
    icon: Settings,
    label: "선호 플랫폼",
    delay: 0.3,
  },
  {
    key: "favoriteThemes" as const,
    icon: Tag,
    label: "선호 테마",
    delay: 0.4,
  },
];

/** 내 게임 취향 섹션 */
export function GamePreferences({
  preferences,
  onEditClick,
}: GamePreferencesProps) {
  return (
    <div className="mb-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">내 게임 취향</h2>
        <motion.button
          onClick={onEditClick}
          className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-all hover:bg-white/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          취향 수정하기
        </motion.button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {preferenceCards.map(({ key, icon: Icon, label, delay }) => (
          <motion.div
            key={key}
            className="rounded-lg border border-white/10 bg-white/5 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
          >
            <h3 className="mb-4 flex items-center gap-2 font-bold text-white">
              <Icon className="h-5 w-5 text-[#E4FF30]" />
              {label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {preferences[key].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[#E4FF30]/20 px-3 py-1 text-sm text-[#E4FF30]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
