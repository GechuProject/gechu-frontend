"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Star, X } from "lucide-react";
import Link from "next/link";
import { SavedGame } from "@/src/api/mypage";
import styles from "./WishlistItem.module.scss";

interface WishlistItemProps {
  game: SavedGame;
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
            <Image
              src={game.thumbnail_img_url}
              alt={game.name}
              fill
              sizes="192px"
              className={styles.image}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </motion.div>

          <div className={styles.info}>
            <div>
              <h3 className={styles.title}>{game.name}</h3>

              <div className={styles.meta}>
                <div className={styles.rating}>
                  <Star
                    style={{
                      width: "1rem",
                      height: "1rem",
                      fill: "#E4FF30",
                      color: "#E4FF30",
                    }}
                  />
                  <span className={styles.ratingText}>
                    {game.rawg_rating.toFixed(2)}
                  </span>
                </div>
                <span className={styles.releaseDate}>
                  {new Date(game.saved_at).toLocaleDateString("ko-KR")}에 추가
                </span>
              </div>
            </div>
          </div>

          <div className={styles.priceCol}>
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                onRemove(game.id);
              }}
              className={styles.removeBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "rgb(239,68,68)",
                }}
              />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
