"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Heart, Share2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import { toggleLike } from "@/src/api/interactions";
import styles from "./GameHero.module.scss";

interface GameHeroProps {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  genre: string;
  rating: number;
  is_saved?: boolean;
}

export function GameHero({
  id,
  image,
  title,
  subtitle,
  genre,
  rating,
  is_saved,
}: GameHeroProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [liked, setLiked] = useState<boolean>(is_saved ?? false);
  const [prevIsSaved, setPrevIsSaved] = useState(is_saved);
  const [isLiking, setIsLiking] = useState(false);

  if (is_saved !== prevIsSaved) {
    setPrevIsSaved(is_saved);
    setLiked(is_saved ?? false);
  }

  const handleLikeClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      if (isLiking) return;
      setIsLiking(true);

      const prevLiked = liked;
      setLiked(!prevLiked);

      const result = await toggleLike(id, prevLiked);
      if (result !== null) {
        setLiked(result);
      } else {
        setLiked(prevLiked);
      }
      setIsLiking(false);
    },
    [isLiking, liked, id, router, isLoggedIn]
  );

  const handleShareClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("링크가 복사되었습니다.");
      })
      .catch((err) => {
        console.error("링크 복사 실패:", err);
        alert("링크 복사에 실패했습니다.");
      });
  }, []);

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
                <Star
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    fill: "#E4FF30",
                    color: "#E4FF30",
                  }}
                />
                <span className={styles.ratingText}>
                  {!isNaN(Number(rating))
                    ? Number(Number(rating).toFixed(2))
                    : 0}
                </span>
              </div>
            </div>

            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>

            <div className={styles.actions}>
              <motion.button
                className={styles.actionBtn}
                onClick={handleLikeClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={liked ? "좋아요 취소" : "좋아요"}
              >
                <Heart
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    fill: liked ? "#ff4d6d" : "transparent",
                    color: liked ? "#ff4d6d" : "#fff",
                    transition: "fill 0.2s, color 0.2s",
                  }}
                />
              </motion.button>

              <motion.button
                className={styles.actionBtn}
                onClick={handleShareClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="공유하기"
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
