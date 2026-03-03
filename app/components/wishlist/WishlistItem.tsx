"use client";

import { motion } from "motion/react";
import { Star, X } from "lucide-react";
import Link from "next/link";
import styles from "./WishlistItem.module.scss";

interface WishlistGame {
  id: number;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  genre: string;
  releaseDate: string;
}

interface WishlistItemProps {
  game: WishlistGame;
  index: number;
  onRemove: (id: number) => void;
}

export function WishlistItem({ game, index, onRemove }: WishlistItemProps) {
  return (
    <motion.div
      className={styles.item}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/game/${game.id}`} style={{ display: "block" }}>
        <div className={styles.row}>
          <motion.div className={styles.imageWrap} whileHover={{ scale: 1.05 }}>
            <img src={game.image} alt={game.title} />
          </motion.div>

          <div className={styles.info}>
            <div>
              <h3 className={styles.title}>{game.title}</h3>

              <div className={styles.meta}>
                <div className={styles.rating}>
                  <Star style={{ width: "1rem", height: "1rem", fill: "#E4FF30", color: "#E4FF30" }} />
                  <span className={styles.ratingText}>{game.rating}</span>
                </div>
                <span className={styles.genre}>{game.genre}</span>
                <span className={styles.releaseDate}>{game.releaseDate}</span>
              </div>

              {game.discount && <span className={styles.discountBadge}>{game.discount}</span>}
            </div>
          </div>

          <div className={styles.priceCol}>
            <motion.button
              onClick={(e) => { e.preventDefault(); onRemove(game.id); }}
              className={styles.removeBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X style={{ width: "1.25rem", height: "1.25rem", color: "rgb(239,68,68)" }} />
            </motion.button>

            <div className={styles.priceWrap}>
              {game.originalPrice && <p className={styles.originalPrice}>{game.originalPrice}</p>}
              <p className={styles.price}>{game.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
