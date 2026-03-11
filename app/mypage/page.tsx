"use client";

import { useState, useEffect } from "react";
import { ProfileHeader } from "@/app/components/mypage/ProfileHeader";
import { StatsGrid } from "@/app/components/mypage/StatsGrid";
import { GamePreferences } from "@/app/components/mypage/GamePreferences";
import { RecentSearches } from "@/app/components/mypage/RecentSearches";
import { PreferencesModal } from "@/app/components/mypage/PreferencesModal";
import {
  userWishlist,
  userProfile as mockProfile,
  userPreferences,
  recentSearches,
  availableGenres,
  availablePlatforms,
  availableThemes,
} from "@/src/mocks/data";
import styles from "./page.module.scss";

interface PreferenceItem {
  id: number;
  name: string;
}

interface Preferences {
  genres: PreferenceItem[];
  platforms: PreferenceItem[];
  tags: PreferenceItem[];
}

interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  birth_date: string;
  profile_img_url: string;
  is_adult_verified: boolean;
  adult_verified_at: string;
  is_active: boolean;
  created_at: string;
}

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(userPreferences);
  const [profile, setProfile] = useState<UserProfile>(mockProfile);

  // 프로필 fetch
  useEffect(() => {
    fetch("/api/v1/users/me/")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setProfile(data);
      })
      .catch(() => {});
  }, []);

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

  // 이름 → {id, name} 변환: available 목록에서 인덱스+1로 id 부여
  const toItems = (names: string[], availableList: string[]) =>
    names.map((name) => ({
      id: availableList.indexOf(name) + 1,
      name,
    }));

  const handleSave = async () => {
    try {
      const res = await fetch("/api/mypage/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          genres: toItems(selectedGenres, availableGenres),
          platforms: toItems(selectedPlatforms, availablePlatforms),
          tags: toItems(selectedThemes, availableThemes),
        }),
      });

      if (!res.ok) throw new Error("저장 실패");

      const updated: Preferences = await res.json();
      setPreferences(updated);
      setIsModalOpen(false);
    } catch (err) {
      console.error("취향 저장 오류:", err);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <ProfileHeader
          nickname={profile.nickname}
          email={profile.email}
          bio=""
        />
        <StatsGrid
          wishlistCount={userWishlist.count}
          wishlistItems={userWishlist.results}
        />
        <GamePreferences
          preferences={preferences}
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
