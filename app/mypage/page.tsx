"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/src/constants/auth";
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
  const router = useRouter();
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
  const [isInitialized, setIsInitialized] = useState(false);

  // 초기 상태 설정
  useEffect(() => {
    // getAccessToken()은 클라이언트 사이드에서만 안전하게 실행되도록 구성되어 있다고 가정
    const token = getAccessToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    // 데이터 모두 로드
    Promise.all([
      fetchUserProfile().then((data) => {
        if (data) setProfile(data);
      }),
      fetchPreferences().then((data) => {
        if (data) {
          setPreferences(data);
          setSelectedGenres(data.genres.map((g) => g.name));
          setSelectedPlatforms(data.platforms.map((p) => p.name));
          setSelectedThemes(data.tags.map((t) => t.name));
        }
      }),
      fetch("/api/mypage/wishlist")
        .then((res) => (res.ok ? res.json() : null))
        .then((data: Wishlist | null) => {
          if (data) setWishlist(data);
        })
        .catch(() => {}),
      fetchRecommendedGames().then((data) => {
        if (data) setRecommendedGames(data.results);
      }),
    ]).finally(() => {
      // 모든 패치 완료 후 페이지 표출위해 설정
      setIsInitialized(true);
    });
  }, [router]);

  // 이름 → id 변환: available 목록에서 인덱스+1로 id 찾기
  const toIds = (names: string[], availableList: string[]) =>
    names.map((name) => availableList.indexOf(name) + 1).filter((id) => id > 0);

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
        genre_ids: toIds(selectedGenres, availableGenres),
        platform_ids: toIds(selectedPlatforms, availablePlatforms),
        tag_ids: toIds(selectedThemes, availableThemes),
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
