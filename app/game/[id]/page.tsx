import { GameHero } from "@/app/components/game/GameHero";
import { GameInfoCards } from "@/app/components/game/GameInfoCards";
import { GameDescription } from "@/app/components/game/GameDescription";
import { GameFeatures } from "@/app/components/game/GameFeatures";
import { GameScreenshots } from "@/app/components/game/GameScreenshots";
import { GameSidebar } from "@/app/components/game/GameSidebar";
import { gameDetails } from "@/src/mocks/data/games";
import styles from "./page.module.scss";

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = gameDetails[Number(id)] || gameDetails[1];

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
