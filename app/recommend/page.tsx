"use client";

import { useEffect, useState } from "react";
import { GameCard } from "@/app/components/common/GameCard";
import { motion } from "motion/react";
import { TrendingUp, Clock, Sparkles } from "lucide-react";
import {
  fetchTop5Games,
  fetchRecentGames,
  fetchAiPickGames,
} from "@/src/api/recommend";
import type { GameCardItem } from "@/src/mocks/data/games";
import styles from "./page.module.scss";

interface Section {
  id: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  title: string;
  description: string;
  games: GameCardItem[];
  accent: string;
}

export default function RecommendPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [top5, recent, aiPick] = await Promise.all([
          fetchTop5Games(),
          fetchRecentGames(),
          fetchAiPickGames(),
        ]);

        setSections([
          {
            id: "trending",
            icon: TrendingUp,
            title: "인기 급상승",
            description: "지금 가장 많이 플레이되는 게임",
            games: top5,
            accent: "from-[#E4FF30]/20 to-transparent",
          },
          {
            id: "recent",
            icon: Clock,
            title: "최근 출시",
            description: "새롭게 출시된 따끈한 게임들",
            games: recent,
            accent: "from-blue-500/20 to-transparent",
          },
          {
            id: "aiPick",
            icon: Sparkles,
            title: "AI 추천",
            description: "당신의 취향에 맞는 게임",
            games: aiPick,
            accent: "from-purple-500/20 to-transparent",
          },
        ]);
      } catch (err) {
        console.error("추천 데이터 로드 실패:", err);
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
