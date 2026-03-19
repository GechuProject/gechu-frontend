"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { getAccessToken } from "@/src/constants/auth";
import { putPreferences, fetchPreferences } from "@/src/api/mypage";
import { fetchGenres, fetchPlatforms, fetchTags } from "@/src/api/game";
import type { GenreItem, PlatformItem, TagItem } from "@/src/api/game";
import {
  getPreferenceSections,
  preferenceNamesToIds,
  togglePreferenceSelection,
} from "@/src/lib/preferences";
import { AuthBackground } from "@/app/components/common/AuthBackground";
import styles from "./page.module.scss";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // API에서 가져온 전체 목록 (id 포함)
  const [genreList, setGenreList] = useState<GenreItem[]>([]);
  const [platformList, setPlatformList] = useState<PlatformItem[]>([]);
  const [tagList, setTagList] = useState<TagItem[]>([]);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    Promise.all([
      fetchGenres(),
      fetchPlatforms(),
      fetchTags(),
      fetchPreferences(),
    ])
      .then(([genres, platforms, tags, prefs]) => {
        setGenreList(genres);
        setPlatformList(platforms);
        setTagList(tags);

        if (prefs) {
          setSelectedGenres(prefs.genres.map((g) => g.name));
          setSelectedPlatforms(prefs.platforms.map((p) => p.name));
          setSelectedThemes(prefs.tags.map((t) => t.name));
        }
      })
      .finally(() => setIsReady(true));
  }, [router]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await putPreferences({
        genre_ids: preferenceNamesToIds(selectedGenres, genreList),
        platform_ids: preferenceNamesToIds(selectedPlatforms, platformList),
        tag_ids: preferenceNamesToIds(selectedThemes, tagList),
      });
      router.push("/");
    } catch (err) {
      console.error("취향 저장 오류:", err);
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  if (!isReady) {
    return null;
  }

  const sections = getPreferenceSections({
    selectedGenres,
    selectedPlatforms,
    selectedThemes,
    setSelectedGenres,
    setSelectedPlatforms,
    setSelectedThemes,
    availableGenres: genreList.map((g) => g.name),
    availablePlatforms: platformList.map((p) => p.name),
    availableThemes: tagList.map((t) => t.name),
  });

  return (
    <div className={styles.page}>
      <div className={styles.bgPattern}>
        <AuthBackground />
      </div>
      <div className={styles.inner}>
        <h1 className={styles.title}>게임 취향을 알려주세요</h1>
        <p className={styles.subtitle}>
          맞춤 추천을 위해 선호하는 장르, 플랫폼, 테마를 선택해 주세요.
        </p>
        <div className={styles.body}>
          {sections.map(
            ({ title, icon: Icon, items, selected, setSelected }) => (
              <div key={title} className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <Icon
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "#E4FF30",
                    }}
                  />
                  {title}
                </h2>
                <div className={styles.tagWrap}>
                  {items.map((item) => {
                    const isSelected = selected.includes(item);
                    return (
                      <motion.button
                        key={item}
                        onClick={() =>
                          togglePreferenceSelection(item, selected, setSelected)
                        }
                        className={
                          isSelected
                            ? styles.tagBtnSelected
                            : styles.tagBtnDefault
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSelected && (
                          <Check
                            style={{
                              display: "inline",
                              width: "1rem",
                              height: "1rem",
                              marginRight: "0.25rem",
                            }}
                          />
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
        <div className={styles.footer}>
          <motion.button
            onClick={handleSave}
            className={styles.saveBtn}
            disabled={isSaving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSaving ? "저장 중..." : "저장하고 시작하기"}
          </motion.button>
          <button type="button" onClick={handleSkip} className={styles.skipBtn}>
            나중에 하기
          </button>
        </div>
      </div>
    </div>
  );
}
