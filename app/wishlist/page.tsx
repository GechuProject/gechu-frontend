"use client";

import { useState } from "react";
import { WishlistHeader } from "@/app/components/wishlist/WishlistHeader";
import { WishlistItem } from "@/app/components/wishlist/WishlistItem";
import { WishlistEmpty } from "@/app/components/wishlist/WishlistEmpty";
import { WishlistSummary } from "@/app/components/wishlist/WishlistSummary";
import { wishlistGames } from "@/src/mocks/data";
import styles from "./page.module.scss";

export default function WishlistPage() {
  const [games, setGames] = useState(wishlistGames);
  const [filter, setFilter] = useState<"all" | "discount" | "free">("all");

  const removeFromWishlist = (id: number) => setGames(games.filter((game) => game.id !== id));

  const filteredGames = games.filter((game) => {
    if (filter === "all") return true;
    if (filter === "discount") return game.discount;
    if (filter === "free") return game.price === "무료";
    return true;
  });

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <WishlistHeader gameCount={filteredGames.length} filter={filter} onFilterChange={setFilter} />

        {filteredGames.length === 0 ? (
          <WishlistEmpty />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filteredGames.map((game, index) => (
              <WishlistItem key={game.id} game={game} index={index} onRemove={removeFromWishlist} />
            ))}
          </div>
        )}

        {filteredGames.length > 0 && (
          <WishlistSummary
            totalCount={filteredGames.length}
            discountCount={filteredGames.filter((g) => g.discount).length}
          />
        )}
      </div>
    </div>
  );
}
