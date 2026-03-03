"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Star, Heart } from "lucide-react";
import Link from "next/link";
import styles from "./GameCard.module.scss";

interface GameCardProps {
  game: {
    id: number;
    title: string;
    image: string;
    price: string;
    rating: number;
    discount?: string;
    genre: string;
  };
  index: number;
}

export function GameCard({ game, index }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/game/${game.id}`}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.imageWrap}>
          <motion.img
            src={game.image}
            alt={game.title}
            className={styles.image}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className={styles.hoverOverlay} />

          {game.discount && (
            <div className={styles.discountBadge}>{game.discount}</div>
          )}

          <motion.button
            className={styles.wishlistBtn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Heart
              style={{ width: "1.25rem", height: "1.25rem", color: "#fff" }}
            />
          </motion.button>

          <motion.div className={styles.hoverInfo} initial={false}>
            <Star
              style={{
                width: "1rem",
                height: "1rem",
                fill: "#E4FF30",
                color: "#E4FF30",
              }}
            />
            <span className={styles.rating}>{game.rating}</span>
            <span className={styles.genre}>{game.genre}</span>
          </motion.div>
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{game.title}</h3>
          <p className={styles.price}>{game.price}</p>
        </div>
      </motion.div>
    </Link>
  );
}
