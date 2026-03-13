"use client";

import { useState, useEffect } from "react";
import { ProfileHeader } from "@/app/components/mypage/ProfileHeader";
import { StatsGrid } from "@/app/components/mypage/StatsGrid";
import { GamePreferences } from "@/app/components/mypage/GamePreferences";
import { RecommendedGames } from "@/app/components/mypage/RecommendedGames";
import { PreferencesModal } from "@/app/components/mypage/PreferencesModal";
import {
  putPreferences,
  fetchUserProfile,
  fetchPreferences,
  fetchRecommendedGames,
  UserProfile,
  RecommendedGame,
} from "@/src/api/mypage";
import {
  availableGenres,
  availablePlatforms,
  availableThemes,
} from "@/src/mocks/data/preferences";
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

interface WishlistItem {
  id: number;
  name: string;
  slug: string;
  thumbnail_img_url: string;
  rawg_rating: number;
  saved_at: string;
}

interface Wishlist {
  count: number;
  next: string | null;
  previous: string | null;
  results: WishlistItem[];
}

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    genres: [],
    platforms: [],
    tags: [],
  });
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wishlist, setWishlist] = useState<Wishlist>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [recommendedGames, setRecommendedGames] = useState<RecommendedGame[]>(
    []
  );

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  useEffect(() => {
    fetchUserProfile().then((data) => {
      if (data) setProfile(data);
    });
  }, []);

  // 게임 취향 fetch
  useEffect(() => {
    fetchPreferences().then((data) => {
      if (data) {
        setPreferences(data);
        setSelectedGenres(data.genres.map((g) => g.name));
        setSelectedPlatforms(data.platforms.map((p) => p.name));
        setSelectedThemes(data.tags.map((t) => t.name));
      }
    });
  }, []);

  // 위시리스트 fetch
  useEffect(() => {
    fetch("/api/mypage/wishlist")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Wishlist | null) => {
        if (data) setWishlist(data);
      })
      .catch(() => {});
  }, []);

  // 취향 맞춤 게임 추천 fetch
  useEffect(() => {
    fetchRecommendedGames().then((data) => {
      if (data) setRecommendedGames(data.results);
    });
  }, []);

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
      const updated = await putPreferences({
        genres: toItems(selectedGenres, availableGenres),
        platforms: toItems(selectedPlatforms, availablePlatforms),
        tags: toItems(selectedThemes, availableThemes),
      });
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
          nickname={profile?.nickname ?? ""}
          email={profile?.email ?? ""}
          bio=""
        />
        <StatsGrid
          wishlistCount={wishlist.count}
          wishlistItems={wishlist.results}
        />
        <GamePreferences
          preferences={preferences}
          onEditClick={() => setIsModalOpen(true)}
        />
        <RecommendedGames games={recommendedGames} />
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
