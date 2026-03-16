"use client";

import { Header as Navigation } from "@/app/components/common/Header";
import { GameCard } from "@/app/components/common/GameCard";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Zap, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchGenres, fetchActionGames, fetchRpgGames } from "@/src/api/home";
import type { GameCardItem } from "@/src/mocks/data/games";
import styles from "./page.module.scss";

function GameSection({
  title,
  games,
  icon: Icon,
}: {
  title: string;
  games: GameCardItem[];
  icon: typeof Zap;
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
      </div>

      <div className={styles.sectionDivider} />
    </section>
  );
}

export default function HomePage() {
  const [actionGames, setActionGames] = useState<GameCardItem[]>([]);
  const [rpgGames, setRpgGames] = useState<GameCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      try {
        // 1. 장르 목록을 먼저 불러와 Action/RPG 장르 ID 탐색
        const genres = await fetchGenres();

        const actionGenre = genres.find((g) =>
          g.name.toLowerCase().includes("action")
        );
        const rpgGenre = genres.find(
          (g) =>
            g.name.toLowerCase().includes("rpg") ||
            g.name.toLowerCase().includes("role")
        );

        // 2. 장르 ID로 게임 목록 조회 (장르 없으면 id=0으로 전체 상위 게임)
        const [action, rpg] = await Promise.all([
          fetchActionGames(actionGenre?.id ?? 0),
          fetchRpgGames(rpgGenre?.id ?? 0),
        ]);

        setActionGames(action);
        setRpgGames(rpg);
      } catch (error) {
        console.error("게임 데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadGames();
  }, []);

  return (
    <div className={styles.page}>
      <Navigation />
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
      {isLoading ? (
        <div className={styles.loading}>게임 데이터를 불러오는 중...</div>
      ) : (
        <>
          <GameSection title="액션 Top 10" games={actionGames} icon={Zap} />
          <GameSection title="RPG Top 10" games={rpgGames} icon={Trophy} />
        </>
      )}
    </div>
  );
}
