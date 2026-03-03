"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Check, Gamepad2, Settings, Tag } from "lucide-react";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  selectedGenres: string[];
  selectedPlatforms: string[];
  selectedThemes: string[];
  onToggle: (
    item: string,
    list: string[],
    setList: (l: string[]) => void
  ) => void;
  setSelectedGenres: (l: string[]) => void;
  setSelectedPlatforms: (l: string[]) => void;
  setSelectedThemes: (l: string[]) => void;
}

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

/** 게임 취향 수정 모달 */
export function PreferencesModal({
  isOpen,
  onClose,
  onSave,
  selectedGenres,
  selectedPlatforms,
  selectedThemes,
  onToggle,
  setSelectedGenres,
  setSelectedPlatforms,
  setSelectedThemes,
}: PreferencesModalProps) {
  const sections = [
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
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border-2 border-[#E4FF30] bg-black"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-black p-6">
                <h2 className="text-2xl font-bold text-white">
                  게임 취향 수정하기
                </h2>
                <motion.button
                  onClick={onClose}
                  className="rounded-lg p-2 transition-colors hover:bg-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-6 w-6 text-white" />
                </motion.button>
              </div>

              {/* Body */}
              <div className="space-y-8 p-6">
                {sections.map(
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
                                onToggle(item, selected, setSelected)
                              }
                              className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-all ${
                                isSelected
                                  ? "bg-[#E4FF30] text-black"
                                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                              }`}
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

              {/* Footer */}
              <div className="sticky bottom-0 flex gap-3 border-t border-white/10 bg-black p-6">
                <motion.button
                  onClick={onSave}
                  className="flex-1 cursor-pointer rounded-lg bg-[#E4FF30] py-3 font-bold text-black transition-all hover:bg-[#d4ef20]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  저장하기
                </motion.button>
                <motion.button
                  onClick={onClose}
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
  );
}
