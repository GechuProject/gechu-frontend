"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GameHero } from "@/app/components/game/GameHero";
import { GameInfoCards } from "@/app/components/game/GameInfoCards";
import { GameDescription } from "@/app/components/game/GameDescription";
import { GameFeatures } from "@/app/components/game/GameFeatures";
import { GameScreenshots } from "@/app/components/game/GameScreenshots";
import { GameSidebar } from "@/app/components/game/GameSidebar";
import { fetchGameDetail, fetchSimilarGames } from "@/src/api/game";
import type { GameDetailData } from "@/src/api/game";
import { recordGameView } from "@/src/api/interactions";
import type { GameCardItem } from "@/src/types/game";
import { GameCard } from "@/app/components/common/GameCard";
import styles from "./page.module.scss";

export default function GameDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [game, setGame] = useState<GameDetailData | null>(null);
  const [similarGames, setSimilarGames] = useState<GameCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [detailData, similarData] = await Promise.all([
          fetchGameDetail(id),
          fetchSimilarGames(id, 5), // 유사 게임 5개 조회
        ]);
        setGame(detailData);
        setSimilarGames(similarData);
        // 게임 조회 행동 기록 (비로그인 시 자동 무시)
        recordGameView({ game_id: id, source: "detail_page" });
      } catch (err) {
        console.error("게임 상세 데이터 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading || !game) {
    return (
      <div className={styles.page}>
        <div className={styles.inner} style={{ padding: "4rem 0" }}>
          <p style={{ color: "#fff", textAlign: "center" }}>로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <GameHero
        id={game.id}
        image={game.image}
        title={game.title}
        subtitle={game.subtitle}
        genre={game.genre}
        rating={game.rating}
        is_saved={game.is_saved}
        trailerUrl={game.trailerUrl}
      />

      <div className={styles.inner}>
        <div className={styles.layout}>
          {/* Main Content */}
          <div>
            <GameInfoCards
              releaseDate={game.releaseDate}
              playtime={game.playtime}
              platforms={game.platforms}
            />
            <GameDescription description={game.description} />
            {game.tags.length > 0 && <GameFeatures features={game.tags} />}
            <GameScreenshots
              screenshots={game.screenshots}
              fallbackImage={game.image}
              title={game.title}
            />
          </div>
          {/* Sidebar */}
          <div>
            <GameSidebar
              systemRequirements={game.systemRequirements}
              stores={game.stores}
              esrbRating={game.esrbRating}
            />
          </div>
        </div>

        {/* 유사 게임 영역 */}
        {similarGames.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#E4FF30",
                marginBottom: "1.5rem",
              }}
            >
              이 게임과 비슷한 게임
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {similarGames.map((item, idx) => (
                <GameCard key={item.id} game={item} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
