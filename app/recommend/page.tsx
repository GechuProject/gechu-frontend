"use client";

import { GameCard } from "@/app/components/common/GameCard";
import { motion } from "motion/react";
import { TrendingUp, Clock, Sparkles } from "lucide-react";
import { top5Games, recentGames, aiPickGames } from "@/src/mocks/data/games";
import styles from "./page.module.scss";

const sections = [
  {
    id: "trending",
    icon: TrendingUp,
    title: "인기 급상승",
    description: "지금 가장 많이 플레이되는 게임",
    games: top5Games,
    accent: "from-[#E4FF30]/20 to-transparent",
  },
  {
    id: "recent",
    icon: Clock,
    title: "최근 출시",
    description: "새롭게 출시된 따끈한 게임들",
    games: recentGames,
    accent: "from-blue-500/20 to-transparent",
  },
  {
    id: "aiPick",
    icon: Sparkles,
    title: "AI 추천",
    description: "당신의 취향에 맞는 게임",
    games: aiPickGames,
    accent: "from-purple-500/20 to-transparent",
  },
];

export default function RecommendPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            게임 <span>추천</span>
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
