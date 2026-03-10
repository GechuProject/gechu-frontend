"use client";

import { useState } from "react";
import { WishlistHeader } from "@/app/components/wishlist/WishlistHeader";
import { WishlistItem } from "@/app/components/wishlist/WishlistItem";
import { WishlistEmpty } from "@/app/components/wishlist/WishlistEmpty";
import { WishlistSummary } from "@/app/components/wishlist/WishlistSummary";
import { userWishlist } from "@/src/mocks/data";
import styles from "./page.module.scss";

type SortType = "all" | "rating_high" | "rating_low";

export default function WishlistPage() {
  const [games, setGames] = useState(userWishlist.results);
  const [sort, setSort] = useState<SortType>("all");

  const removeFromWishlist = async (id: number) => {
    try {
      await fetch(`/api/wishlist/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("위시리스트 삭제 오류:", err);
    }
    setGames(games.filter((game) => game.id !== id));
  };

  const sortedGames = [...games].sort((a, b) => {
    if (sort === "rating_high") return b.rawg_rating - a.rawg_rating;
    if (sort === "rating_low") return a.rawg_rating - b.rawg_rating;
    return 0;
  });

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
