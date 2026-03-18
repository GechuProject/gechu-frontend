import { fetchGenres, fetchActionGames, fetchRpgGames } from "@/src/api/home";
import type { GameCardItem } from "@/src/mocks/data/games";
import { HomeClient } from "@/app/components/home/HomeClient";
import styles from "./page.module.scss";

export default async function HomePage() {
  let actionGames: GameCardItem[] = [];
  let rpgGames: GameCardItem[] = [];

  try {
    const genres = await fetchGenres();
    const actionGenre = genres.find((g) =>
      g.name.toLowerCase().includes("action")
    );
    const rpgGenre = genres.find(
      (g) =>
        g.name.toLowerCase().includes("rpg") ||
        g.name.toLowerCase().includes("role")
    );

    const [action, rpg] = await Promise.all([
      fetchActionGames(actionGenre?.id ?? 0),
      fetchRpgGames(rpgGenre?.id ?? 0),
    ]);
    actionGames = action;
    rpgGames = rpg;
  } catch (error) {
    console.error("게임 데이터를 불러오는데 실패했습니다:", error);
  }

  return (
    <div className={styles.page}>
      <HomeClient actionGames={actionGames} rpgGames={rpgGames} />
    </div>
  );
}
