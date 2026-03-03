"use client";

import { motion } from "motion/react";
import { Heart, Share2, Star } from "lucide-react";
import styles from "./GameHero.module.scss";

interface GameHeroProps {
  image: string;
  title: string;
  subtitle: string;
  genre: string;
  rating: number;
}

export function GameHero({ image, title, subtitle, genre, rating }: GameHeroProps) {
  return (
    <div className={styles.hero}>
      <motion.img
        src={image}
        alt={title}
        className={styles.bgImage}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.inner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.meta}>
              <span className={styles.genreBadge}>{genre}</span>
              <div className={styles.ratingWrap}>
                <Star style={{ width: "1.25rem", height: "1.25rem", fill: "#E4FF30", color: "#E4FF30" }} />
                <span className={styles.ratingText}>{rating}</span>
              </div>
            </div>

            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>

            <div className={styles.actions}>
              <motion.button
                className={styles.actionBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart style={{ width: "1.25rem", height: "1.25rem" }} />
              </motion.button>

              <motion.button
                className={styles.actionBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 style={{ width: "1.25rem", height: "1.25rem" }} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
