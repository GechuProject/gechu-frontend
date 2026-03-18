"use client";

import { useEffect } from "react";
import { GameHero } from "@/app/components/game/GameHero";
import { GameInfoCards } from "@/app/components/game/GameInfoCards";
import { GameDescription } from "@/app/components/game/GameDescription";
import { GameFeatures } from "@/app/components/game/GameFeatures";
import { GameScreenshots } from "@/app/components/game/GameScreenshots";
import { GameSidebar } from "@/app/components/game/GameSidebar";
import { GameCard } from "@/app/components/common/GameCard";
import { recordGameView } from "@/src/api/interactions";
import type { GameDetailData } from "@/src/api/game";
import type { GameCardItem } from "@/src/mocks/data/games";
import styles from "../game/[id]/page.module.scss";

interface GameDetailClientProps {
  game: GameDetailData;
  similarGames: GameCardItem[];
}

export function GameDetailClient({
  game,
  similarGames,
}: GameDetailClientProps) {
  useEffect(() => {
    recordGameView({ game_id: game.id, source: "direct" });
  }, [game.id]);

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
          <div>
            <GameSidebar
              systemRequirements={game.systemRequirements}
              stores={game.stores}
              esrbRating={game.esrbRating}
            />
          </div>
        </div>

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
