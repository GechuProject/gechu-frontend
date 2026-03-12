"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GameHero } from "@/app/components/game/GameHero";
import { GameInfoCards } from "@/app/components/game/GameInfoCards";
import { GameDescription } from "@/app/components/game/GameDescription";
import { GameFeatures } from "@/app/components/game/GameFeatures";
import { GameScreenshots } from "@/app/components/game/GameScreenshots";
import { GameSidebar } from "@/app/components/game/GameSidebar";
import { fetchGameDetail } from "@/src/api/game";
import type { GameDetailItem } from "@/src/mocks/data/games";
import styles from "./page.module.scss";

export default function GameDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [game, setGame] = useState<GameDetailItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGameDetail(id);
        setGame(data);
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
        image={game.image}
        title={game.title}
        subtitle={game.subtitle}
        genre={game.genre}
        rating={game.rating}
      />

      <div className={styles.inner}>
        <div className={styles.layout}>
          {/* Main Content */}
          <div>
            <GameInfoCards
              releaseDate={game.releaseDate}
              players={game.players}
              developer={game.developer}
            />
            <GameDescription description={game.description} />
            <GameFeatures features={game.features} />
            <GameScreenshots image={game.image} title={game.title} />
          </div>
          {/* Sidebar */}
          <div>
            <GameSidebar
              price={game.price}
              systemRequirements={game.systemRequirements}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
