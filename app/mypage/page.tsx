"use client";
import { useState } from "react";
import { ProfileHeader } from "@/app/components/mypage/ProfileHeader";
import { StatsGrid } from "@/app/components/mypage/StatsGrid";
import { GamePreferences } from "@/app/components/mypage/GamePreferences";
import { RecentSearches } from "@/app/components/mypage/RecentSearches";
import { PreferencesModal } from "@/app/components/mypage/PreferencesModal";

const userStats = { wishlistCount: 6 };

const gamePreferences = {
  favoriteGenres: ["RPG", "액션", "어드벤처"],
  favoritePlatforms: ["PC", "PlayStation"],
  favoriteThemes: ["오픈월드", "스토리 중심", "Co-op"],
};

const recentSearches = [
  { id: 1, query: "Cyber Nexus 2077", timestamp: "5분 전" },
  { id: 2, query: "RPG 추천", timestamp: "1시간 전" },
  { id: 3, query: "Battle Royale", timestamp: "3시간 전" },
  { id: 4, query: "무료 게임", timestamp: "어제" },
  { id: 5, query: "Fantasy Realm", timestamp: "2일 전" },
];

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
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <ProfileHeader
          nickname="User123"
          email="user123@email.com"
          bio="게임을 사랑하는 열정적인 게이머입니다. 특히 RPG와 액션 게임을 즐깁니다."
        />

        <StatsGrid wishlistCount={userStats.wishlistCount} />

        <GamePreferences
          preferences={gamePreferences}
          onEditClick={() => setIsModalOpen(true)}
        />

        <RecentSearches searches={recentSearches} />
      </div>

      <PreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        selectedGenres={selectedGenres}
        selectedPlatforms={selectedPlatforms}
        selectedThemes={selectedThemes}
        onToggle={toggleSelection}
        setSelectedGenres={setSelectedGenres}
        setSelectedPlatforms={setSelectedPlatforms}
        setSelectedThemes={setSelectedThemes}
      />
    </div>
  );
}
