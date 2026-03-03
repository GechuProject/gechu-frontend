"use client";

import { Header as Navigation } from "@/app/components/common/Header";
import { GameCard } from "@/app/components/common/GameCard";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Zap, Trophy } from "lucide-react";
import { useState } from "react";
import styles from "./page.module.scss";

const actionGames = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩9,900",
    rating: 8.0,
    genre: "액션",
  },
  {
    id: 2,
    title: "Battle Royale Pro",
    image:
      "https://images.unsplash.com/photo-1764011643213-1f3b3691f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4MDAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.0,
    genre: "액션",
  },
  {
    id: 3,
    title: "Dark Shadows",
    image:
      "https://images.unsplash.com/photo-1723388159368-53b9be8899e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzdXJ2aXZhbCUyMGdhbWV8ZW58MXx8fHwxNzcxNzE1OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩4,900",
    rating: 7.0,
    genre: "액션",
  },
  {
    id: 4,
    title: "Speed Racer X",
    image:
      "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTgxNzc2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩9,900",
    rating: 8.5,
    discount: "-40%",
    genre: "액션",
  },
  {
    id: 5,
    title: "Galactic War",
    image:
      "https://images.unsplash.com/photo-1531812494838-636e337af5a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNob290ZXIlMjBnYW1lfGVufDF8fHx8MTc3MTc3Njg4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.5,
    genre: "액션",
  },
];

const rpgGames = [
  {
    id: 6,
    title: "Fantasy Realm",
    image:
      "https://images.unsplash.com/photo-1759688168277-185a0c623968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwUlBHJTIwZ2FtZSUyMGFydHxlbnwxfHx8fDE3NzE4Mjg4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩9,900",
    rating: 9.0,
    discount: "-25%",
    genre: "RPG",
  },
  {
    id: 7,
    title: "Kingdom Strategy",
    image:
      "https://images.unsplash.com/photo-1613626318906-68be0aef3334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN0cmF0ZWd5JTIwZ2FtZXxlbnwxfHx8fDE3NzE4Mjg4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩9,900",
    rating: 8.0,
    genre: "RPG",
  },
  {
    id: 8,
    title: "Open World Explorer",
    image:
      "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩9,900",
    rating: 9.5,
    genre: "RPG",
  },
  {
    id: 9,
    title: "Adventure Quest",
    image:
      "https://images.unsplash.com/photo-1758862493283-51f1e23b8883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBwbGF0Zm9ybWVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4Mjg4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 7.5,
    genre: "RPG",
  },
  {
    id: 10,
    title: "Fighter Champions",
    image:
      "https://images.unsplash.com/photo-1758521960348-90bc4203eb52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWdodGluZyUyMGNvbWJhdCUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩4,900",
    rating: 8.7,
    discount: "-30%",
    genre: "RPG",
  },
];

function GameSection({
  title,
  games,
  icon: Icon,
}: {
  title: string;
  games: typeof actionGames;
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
      <GameSection title="액션 Top 10" games={actionGames} icon={Zap} />
      <GameSection title="RPG Top 10" games={rpgGames} icon={Trophy} />
    </div>
  );
}
