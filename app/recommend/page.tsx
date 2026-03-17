"use client";

import { useEffect, useState } from "react";
import { GameCard } from "@/app/components/common/GameCard";
import { motion } from "motion/react";
import { TrendingUp, Sparkles, Users } from "lucide-react";
import {
  fetchAiPickGames,
  fetchPreferenceGames,
  fetchSimilarityGames,
} from "@/src/api/recommend";
import type { GameCardItem } from "@/src/mocks/data/games";
import styles from "./page.module.scss";

interface Section {
  id: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  title: string;
  description: string;
  games: GameCardItem[];
}

export default function RecommendPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [notReady, setNotReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [hybrid, preference, similarity] = await Promise.all([
          fetchAiPickGames(),
          fetchPreferenceGames(),
          fetchSimilarityGames(),
        ]);

        // 세 가지 모두 빈 배열이면 데이터 준비 중
        if (
          hybrid.length === 0 &&
          preference.length === 0 &&
          similarity.length === 0
        ) {
          setNotReady(true);
        } else {
          setSections([
            {
              id: "hybrid",
              icon: Sparkles,
              title: "AI 추천",
              description: "취향 분석 기반 하이브리드 추천",
              games: hybrid,
            },
            {
              id: "preference",
              icon: TrendingUp,
              title: "취향 기반 추천",
              description: "선택한 장르·태그 기반 추천",
              games: preference,
            },
            {
              id: "similarity",
              icon: Users,
              title: "유사 유저 추천",
              description: "비슷한 취향 유저들이 즐긴 게임",
              games: similarity,
            },
          ]);
        }
      } catch (err) {
        console.error("추천 데이터 로드 실패:", err);
        setNotReady(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.hero}>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              게임 추천
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              로딩 중...
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  if (notReady) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.hero}>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              게임 추천
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              추천 데이터를 준비 중입니다. 잠시 후 다시 시도해주세요.
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            게임 추천
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            취향에 맞는 게임을 발견하세요
          </motion.p>
        </div>

        {sections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <section key={section.id} className={styles.section}>
              <motion.div
                className={styles.sectionHeader}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <div className={styles.sectionMeta}>
                  <div className={styles.iconAccent}>
                    <Icon
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        color: "#E4FF30",
                      }}
                    />
                  </div>
                  <div>
                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                    <p className={styles.sectionDesc}>{section.description}</p>
                  </div>
                </div>
              </motion.div>

              <div className={styles.grid}>
                {section.games.map((game, index) => (
                  <GameCard
                    key={`${section.id}-${game.id}`}
                    game={game}
                    index={index}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
