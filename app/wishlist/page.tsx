"use client";

import { useState } from "react";
import { WishlistHeader } from "@/app/components/wishlist/WishlistHeader";
import { WishlistItem } from "@/app/components/wishlist/WishlistItem";
import { WishlistEmpty } from "@/app/components/wishlist/WishlistEmpty";
import { WishlistSummary } from "@/app/components/wishlist/WishlistSummary";
import styles from "./page.module.scss";

const wishlistGames = [
  { id: 1, title: "Cyber Nexus 2077", image: "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080", price: "₩39,900", originalPrice: "₩59,900", discount: "-33%", rating: 9.2, genre: "액션 RPG", releaseDate: "2026.01.15" },
  { id: 2, title: "Fantasy Realm", image: "https://images.unsplash.com/photo-1759688168277-185a0c623968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwUlBHJTIwZ2FtZSUyMGFydHxlbnwxfHx8fDE3NzE4Mjg4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080", price: "₩37,425", originalPrice: "₩49,900", discount: "-25%", rating: 9.3, genre: "RPG", releaseDate: "2025.12.10" },
  { id: 3, title: "Battle Royale Pro", image: "https://images.unsplash.com/photo-1764011643213-1f3b3691f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4MDAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080", price: "무료", rating: 9.2, genre: "배틀로얄", releaseDate: "출시됨" },
  { id: 4, title: "Open World Explorer", image: "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080", price: "₩59,900", rating: 9.1, genre: "오픈월드", releaseDate: "2026.02.20" },
  { id: 5, title: "Dark Shadows", image: "https://images.unsplash.com/photo-1723388159368-53b9be8899e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzdXJ2aXZhbCUyMGdhbWV8ZW58MXx8fHwxNzcxNzE1OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080", price: "₩44,900", rating: 9.0, genre: "호러", releaseDate: "2026.03.15" },
  { id: 6, title: "Speed Racer X", image: "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTgxNzc2NXww&ixlib=rb-4.1.0&q=80&w=1080", price: "₩17,940", originalPrice: "₩29,900", discount: "-40%", rating: 8.8, genre: "레이싱", releaseDate: "출시됨" },
];

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
