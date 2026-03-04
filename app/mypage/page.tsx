"use client";

import { useState } from "react";
import { ProfileHeader } from "@/app/components/mypage/ProfileHeader";
import { StatsGrid } from "@/app/components/mypage/StatsGrid";
import { GamePreferences } from "@/app/components/mypage/GamePreferences";
import { RecentSearches } from "@/app/components/mypage/RecentSearches";
import { PreferencesModal } from "@/app/components/mypage/PreferencesModal";
import {
  userWishlist,
  userProfile,
  userPreferences,
  recentSearches,
} from "@/src/mocks/data";
import styles from "./page.module.scss";

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    userPreferences.genres.map((g) => g.name)
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    userPreferences.platforms.map((p) => p.name)
  );
  const [selectedThemes, setSelectedThemes] = useState<string[]>(
    userPreferences.tags.map((t) => t.name)
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
    <div className={styles.page}>
      <div className={styles.inner}>
        <ProfileHeader
          nickname={userProfile.nickname}
          email={userProfile.email}
          bio=""
        />
        <StatsGrid
          wishlistCount={userWishlist.count}
          wishlistItems={userWishlist.results}
        />
        <GamePreferences
          preferences={userPreferences}
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
