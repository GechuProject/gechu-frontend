"use client";

import { GameCard } from "@/app/components/common/GameCard";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Zap, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import type { GameCardItem } from "@/src/types/game";
import styles from "@/app/page.module.scss";
import { fetchGenres, fetchActionGames, fetchRpgGames } from "@/src/api/home";

function GameSection({
  title,
  games,
  icon: Icon,
  loading,
}: {
  title: string;
  games: GameCardItem[];
  icon: typeof Zap;
  loading?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const maxIndex = Math.max(0, games.length - itemsPerPage);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleWrap}>
          <Icon style={{ width: "2rem", height: "2rem", color: "#E4FF30" }} />
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>
        <div className={styles.carouselControls}>
          <motion.button
            onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
            disabled={currentIndex === 0}
            className={styles.carouselBtn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft
              style={{ width: "1.5rem", height: "1.5rem", color: "#fff" }}
            />
          </motion.button>
          <motion.button
            onClick={() => setCurrentIndex((p) => Math.min(maxIndex, p + 1))}
            disabled={currentIndex >= maxIndex}
            className={styles.carouselBtn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight
              style={{ width: "1.5rem", height: "1.5rem", color: "#fff" }}
            />
          </motion.button>
        </div>
      </div>

      <div className={styles.carouselTrack}>
        {loading ? (
          <p className={styles.loading}>불러오는 중...</p>
        ) : (
          <motion.div
            className={styles.carouselInner}
            animate={{ x: `${-currentIndex * (100 / itemsPerPage)}%` }}
            transition={{ duration: 0.3 }}
          >
            {games.map((game, index) => (
              <div key={game.id} className={styles.carouselItem}>
                <GameCard game={game} index={index} />
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div className={styles.sectionDivider} />
    </section>
  );
}

export function HomeClient() {
  const [actionGames, setActionGames] = useState<GameCardItem[]>([]);
  const [rpgGames, setRpgGames] = useState<GameCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      try {
        const genres = await fetchGenres();
        const actionGenre = genres.find((g) =>
          g.name.toLowerCase().includes("action")
        );
        const rpgGenre = genres.find(
          (g) =>
            g.name.toLowerCase().includes("rpg") ||
            g.name.toLowerCase().includes("role")
        );

        const [action, rpg] = await Promise.all([
          fetchActionGames(actionGenre?.id ?? 0),
          fetchRpgGames(rpgGenre?.id ?? 0),
        ]);
        setActionGames(action);
        setRpgGames(rpg);
      } catch (error) {
        console.error("게임 데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            당신의 최애 게임을 찾아보세요
          </motion.h1>
        </div>
        <div className={styles.heroDivider} />
      </section>

      <GameSection
        title="액션 Top 10"
        games={actionGames}
        icon={Zap}
        loading={loading}
      />
      <GameSection
        title="RPG Top 10"
        games={rpgGames}
        icon={Trophy}
        loading={loading}
      />
    </div>
  );
}
