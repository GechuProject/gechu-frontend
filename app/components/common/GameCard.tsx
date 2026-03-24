"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState, useCallback } from "react";
import { Star, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./GameCard.module.scss";
import { toggleLike } from "@/src/api/interactions";
import { useAuth } from "@/src/contexts/AuthContext";

interface GameCardProps {
  game: {
    id: number;
    title: string;
    image: string;
    price: string;
    rating: number;
    discount?: string;
    genre: string;
    is_saved?: boolean;
  };
  index: number;
}

export function GameCard({ game, index }: GameCardProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState<boolean>(game.is_saved ?? false);
  const [prevIsSaved, setPrevIsSaved] = useState(game.is_saved);
  const [isLiking, setIsLiking] = useState(false);

  // 백엔드에서 받아온 is_saved 상태값이 변경(예: 페이지 이동 후 재진입 시 새 데이터 로드)되면
  // 내부 state도 동기화합니다 (useEffect 대신 권장되는 Derived State 패턴)
  if (game.is_saved !== prevIsSaved) {
    setPrevIsSaved(game.is_saved);
    setLiked(game.is_saved ?? false);
  }

  // 첫 호버 시 이미지 스케일 애니메이션만 처리
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleLikeClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // 비로그인 → 로그인 페이지로 이동
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      if (isLiking) return;
      setIsLiking(true);

      // 낙관적 업데이트
      const prevLiked = liked;
      setLiked(!prevLiked);

      const result = await toggleLike(game.id, prevLiked);
      if (result !== null) {
        setLiked(result);
      } else {
        setLiked(prevLiked); // 실패 시 롤백
      }
      setIsLiking(false);
    },
    [isLiking, liked, game.id, router, isLoggedIn]
  );

  return (
    <Link href={`/game/${game.id}`}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.imageWrap}>
          <motion.div
            className={styles.imageMotion}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={game.image}
              alt={game.title}
              fill
              sizes="(max-width: 768px) 100vw, 20vw"
              className={styles.image}
            />
          </motion.div>
          <div className={styles.hoverOverlay} />

          {game.discount && (
            <div className={styles.discountBadge}>{game.discount}</div>
          )}

          {/* 좋아요 버튼 (호버 시 표시) */}
          <motion.button
            className={`${styles.likeBtn} ${liked ? styles.likeBtnActive : ""}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            onClick={handleLikeClick}
            aria-label={liked ? "좋아요 취소" : "좋아요"}
          >
            <motion.span
              animate={liked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
              transition={{ duration: 0.25 }}
              className={styles.heartIcon}
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
            </motion.span>
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
