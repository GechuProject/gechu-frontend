"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  fetchSavedGames,
  UserProfile,
  RecommendedGame,
  SavedGamesResponse,
} from "@/src/api/mypage";
import { fetchGenres, fetchPlatforms, fetchTags } from "@/src/api/game";
import type { GenreItem, PlatformItem, TagItem } from "@/src/api/game";
import { preferenceNamesToIds } from "@/src/lib/preferences";
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

export default function MyPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    genres: [],
    platforms: [],
    tags: [],
  });
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wishlist, setWishlist] = useState<SavedGamesResponse>({
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
  const [isInitialized, setIsInitialized] = useState(false);

  // API에서 가져온 전체 목록 (id 포함, 저장 시 id 변환에 사용)
  const [genreList, setGenreList] = useState<GenreItem[]>([]);
  const [platformList, setPlatformList] = useState<PlatformItem[]>([]);
  const [tagList, setTagList] = useState<TagItem[]>([]);

  // 초기 상태 설정 (이메일 Bearer + OAuth HttpOnly 쿠키 모두 fetchUserProfile로 판별)
  useEffect(() => {
    const init = async () => {
      const profileData = await fetchUserProfile();
      if (!profileData) {
        router.replace("/login");
        return;
      }
      setProfile(profileData);

      await Promise.all([
        fetchPreferences().then((data) => {
          if (data) {
            setPreferences(data);
            setSelectedGenres(data.genres.map((g) => g.name));
            setSelectedPlatforms(data.platforms.map((p) => p.name));
            setSelectedThemes(data.tags.map((t) => t.name));
          }
        }),
        fetchSavedGames().then((data) => {
          if (data) setWishlist(data);
        }),
        fetchRecommendedGames().then((data) => {
          if (data) setRecommendedGames(data.results);
        }),
        fetchGenres().then((data) => setGenreList(data)),
        fetchPlatforms().then((data) => setPlatformList(data)),
        fetchTags().then((data) => setTagList(data)),
      ]);
      setIsInitialized(true);
    };

    void init();
  }, [router]);

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

  const handleSave = async () => {
    try {
      const updated = await putPreferences({
        genre_ids: preferenceNamesToIds(selectedGenres, genreList),
        platform_ids: preferenceNamesToIds(selectedPlatforms, platformList),
        tag_ids: preferenceNamesToIds(selectedThemes, tagList),
      });
      setPreferences(updated);
      setIsModalOpen(false);
    } catch (err) {
      console.error("취향 저장 오류:", err);
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <ProfileHeader
          nickname={profile?.nickname ?? ""}
          email={profile?.email ?? ""}
          bio=""
          profileImgUrl={profile?.profile_img_url}
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
