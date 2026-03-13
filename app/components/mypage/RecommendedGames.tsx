"use client";

import { motion } from "motion/react";
// import { Heart, Bookmark, Star } from "lucide-react"; // 뱃지 표시 시 활성화
import styles from "./RecommendedGames.module.scss";
import { RecommendedGame } from "@/src/api/mypage";

interface RecommendedGamesProps {
  games: RecommendedGame[];
}

// 아래 함수들은 뱃지/점수 표시 시 활성화
// function likeLabel(state: number): string {
//   if (state === 1) return "좋아요";
//   if (state === -1) return "싫어요";
//   return "미평가";
// }
// function scorePercent(score: number): string {
//   return `${Math.round(score * 100)}%`;
// }

export function RecommendedGames({ games }: RecommendedGamesProps) {
  if (games.length === 0) {
    return (
      <div className={styles.section}>
        <h2 className={styles.heading}>내 취향에 맞는 게임 추천</h2>
        <p className={styles.empty}>
          아직 추천할 게임이 없어요. 취향을 설정해 보세요!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>내 취향에 맞는 게임 추천</h2>
      <div className={styles.list}>
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            className={styles.item}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* 순위 */}
            <span className={styles.rank}>#{index + 1}</span>

            {/* 게임명 */}
            <span className={styles.name}>{game.name}</span>

            {/* 아래 블록은 적합도 점수 바 표시 시 활성화
            <div className={styles.info}>
              <span className={styles.name}>{game.name}</span>
              <div className={styles.scoreBar}>
                <div
                  className={styles.scoreFill}
                  style={{ width: scorePercent(game.preference_score) }}
                />
              </div>
              <span className={styles.scoreText}>
                <Star style={{ width: "0.875rem", height: "0.875rem", color: "#E4FF30" }} />
                적합도 {scorePercent(game.preference_score)}
              </span>
            </div>
            */}

            {/* 아래 블록은 저장됨/좋아요/싫어요 뱃지 표시 시 활성화
            <div className={styles.badges}>
              {game.is_saved && (
                <span className={styles.badgeSaved}>
                  <Bookmark style={{ width: "0.875rem", height: "0.875rem" }} />
                  저장됨
                </span>
              )}
              {game.like_state !== 0 && (
                <span className={game.like_state === 1 ? styles.badgeLike : styles.badgeDislike}>
                  <Heart style={{ width: "0.875rem", height: "0.875rem" }} />
                  {likeLabel(game.like_state)}
                </span>
              )}
            </div>
            */}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
