"use client";

import { useState, useEffect } from "react";
import { WishlistHeader } from "@/app/components/wishlist/WishlistHeader";
import { WishlistItem } from "@/app/components/wishlist/WishlistItem";
import { WishlistEmpty } from "@/app/components/wishlist/WishlistEmpty";
import { WishlistSummary } from "@/app/components/wishlist/WishlistSummary";
import { fetchSavedGames, SavedGame } from "@/src/api/mypage";
import { authApiClient } from "@/src/lib/api";
import styles from "./page.module.scss";

type SortType = "all" | "rating_high" | "rating_low";

export default function WishlistPage() {
  const [games, setGames] = useState<SavedGame[]>([]);
  const [sort, setSort] = useState<SortType>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchSavedGames()
      .then((data) => {
        if (data) setGames(data.results);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const removeFromWishlist = async (id: number) => {
    try {
      await authApiClient.patch(`/api/v1/preferences/games/${id}/`, {
        is_saved: false,
        reaction: "neutral",
      });
      setGames((prev) => prev.filter((game) => game.id !== id));
    } catch (err) {
      console.error("위시리스트 삭제 오류:", err);
    }
  };

  const sortedGames = [...games].sort((a, b) => {
    if (sort === "rating_high") return b.rawg_rating - a.rawg_rating;
    if (sort === "rating_low") return a.rawg_rating - b.rawg_rating;
    return 0;
  });

  if (!isLoaded) return null;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <WishlistHeader
          gameCount={sortedGames.length}
          sort={sort}
          onSortChange={setSort}
        />

        {sortedGames.length === 0 ? (
          <WishlistEmpty />
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {sortedGames.map((game, index) => (
              <WishlistItem
                key={game.id}
                game={game}
                index={index}
                onRemove={removeFromWishlist}
              />
            ))}
          </div>
        )}

        {sortedGames.length > 0 && (
          <WishlistSummary totalCount={sortedGames.length} />
        )}
      </div>
    </div>
  );
}
