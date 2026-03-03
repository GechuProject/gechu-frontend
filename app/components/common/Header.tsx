"use client";

import {
  Search,
  User,
  Menu,
  Gamepad2,
  X,
  Star,
  TrendingUp,
  Sparkles,
  Heart,
  UserCircle,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon3D } from "./Icon3D";
import styles from "./Header.module.scss";

const allGames = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "39,900",
    rating: 9.2,
    genre: "액션 RPG",
    category: "trending",
  },
  {
    id: 2,
    title: "Fantasy Realm",
    image:
      "https://images.unsplash.com/photo-1759688168277-185a0c623968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwUlBHJTIwZ2FtZSUyMGFydHxlbnwxfHx8fDE3NzE4Mjg4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "37,425",
    rating: 9.3,
    genre: "RPG",
    category: "popular",
  },
  {
    id: 3,
    title: "Battle Royale Pro",
    image:
      "https://images.unsplash.com/photo-1764011643213-1f3b3691f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4MDAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.2,
    genre: "배틀로얄",
    category: "trending",
  },
  {
    id: 4,
    title: "Open World Explorer",
    image:
      "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "59,900",
    rating: 9.1,
    genre: "오픈월드",
    category: "new",
  },
  {
    id: 5,
    title: "Dark Shadows",
    image:
      "https://images.unsplash.com/photo-1723388159368-53b9be8899e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzdXJ2aXZhbCUyMGdhbWV8ZW58MXx8fHwxNzcxNzE1OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "44,900",
    rating: 9.0,
    genre: "호러",
    category: "popular",
  },
  {
    id: 6,
    title: "Speed Racer X",
    image:
      "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTgxNzc2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "17,940",
    rating: 8.8,
    genre: "레이싱",
    category: "trending",
  },
  {
    id: 7,
    title: "Mystery Island",
    image:
      "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "29,900",
    rating: 8.9,
    genre: "어드벤처",
    category: "new",
  },
  {
    id: 8,
    title: "Space Warriors",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.4,
    genre: "슈팅",
    category: "popular",
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { path: "/", label: "홈" },
    { path: "/recommend", label: "추천게임" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredGames = searchQuery.trim()
    ? allGames.filter(
        (game) =>
          game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const trendingGames = allGames
    .filter((g) => g.category === "trending")
    .slice(0, 4);
  const popularGames = allGames
    .filter((g) => g.category === "popular")
    .slice(0, 4);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* 상단 행: 로고 / 데스크탑 메뉴 / 아이콘 */}
        <div className={styles.topRow}>
          <Link href="/" className={styles.logo}>
            <Icon3D>
              <Gamepad2
                style={{ width: "2rem", height: "2rem", color: "#E4FF30" }}
              />
            </Icon3D>
            <span className={styles.logoText}>Gechu</span>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <div className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={
                  pathname === link.path ? styles.navLinkActive : styles.navLink
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* 우측 아이콘 */}
          <div className={styles.actions}>
            {/* 프로필 드롭다운 */}
            <div ref={profileRef} className={styles.profileWrap}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={styles.profileBtn}
              >
                <Icon3D>
                  <User
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      color: "#fff",
                      transition: "color 0.2s",
                    }}
                  />
                </Icon3D>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    className={styles.profileDropdown}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className={styles.dropdownBody}>
                      <Link
                        href="/wishlist"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <motion.div
                          className={styles.dropdownItem}
                          whileHover={{ x: 4 }}
                        >
                          <Heart
                            style={{
                              width: "1.25rem",
                              height: "1.25rem",
                              color: "#E4FF30",
                            }}
                          />
                          <span>위시리스트</span>
                        </motion.div>
                      </Link>

                      <Link
                        href="/mypage"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <motion.div
                          className={styles.dropdownItem}
                          whileHover={{ x: 4 }}
                        >
                          <UserCircle
                            style={{
                              width: "1.25rem",
                              height: "1.25rem",
                              color: "#E4FF30",
                            }}
                          />
                          <span>마이페이지</span>
                        </motion.div>
                      </Link>

                      <div className={styles.dropdownDivider} />

                      <Link
                        href="/login"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <motion.div
                          className={styles.dropdownItemDanger}
                          whileHover={{ x: 4 }}
                        >
                          <LogOut
                            style={{
                              width: "1.25rem",
                              height: "1.25rem",
                              color: "rgb(248,113,113)",
                            }}
                          />
                          <span>로그아웃</span>
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.mobileMenuBtn}
            >
              <Menu
                style={{ width: "1.5rem", height: "1.5rem", color: "#fff" }}
              />
            </button>
          </div>
        </div>

        {/* 검색창 (md 이상) */}
        <div className={styles.searchRow} ref={searchRef}>
          <div className={styles.searchWrap}>
            <div className={styles.searchBox}>
              <Search
                className={styles.searchIcon}
                style={{ width: "1.25rem", height: "1.25rem" }}
              />
              <input
                type="text"
                placeholder="게임 검색 (제목, 장르)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowResults(false);
                  }}
                  className={styles.searchClearBtn}
                >
                  <X style={{ width: "1.25rem", height: "1.25rem" }} />
                </button>
              )}
            </div>

            {/* 검색 결과 드롭다운 */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  className={styles.resultDropdown}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {searchQuery.trim() ? (
                    filteredGames.length > 0 ? (
                      <div className={styles.resultScroll}>
                        <div className={styles.resultHeader}>
                          <p className={styles.resultCount}>
                            {filteredGames.length}개의 검색 결과
                          </p>
                        </div>
                        <div className={styles.resultGrid}>
                          {filteredGames.map((game, index) => (
                            <Link
                              key={game.id}
                              href={`/game/${game.id}`}
                              onClick={() => {
                                setSearchQuery("");
                                setShowResults(false);
                              }}
                            >
                              <motion.div
                                className={styles.resultItem}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, x: 4 }}
                              >
                                <div className={styles.resultImg}>
                                  <img src={game.image} alt={game.title} />
                                  <div className={styles.resultImgOverlay} />
                                </div>
                                <div className={styles.resultInfo}>
                                  <h4 className={styles.resultTitle}>
                                    {game.title}
                                  </h4>
                                  <div className={styles.resultMeta}>
                                    <div className={styles.resultRating}>
                                      <Star
                                        style={{
                                          width: "1rem",
                                          height: "1rem",
                                          fill: "#E4FF30",
                                          color: "#E4FF30",
                                        }}
                                      />
                                      <span className={styles.resultRatingText}>
                                        {game.rating}
                                      </span>
                                    </div>
                                    <span className={styles.resultGenre}>
                                      {game.genre}
                                    </span>
                                  </div>
                                </div>
                                <p className={styles.resultPrice}>
                                  {game.price}
                                </p>
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.noResult}>
                        <Search
                          style={{
                            display: "block",
                            margin: "0 auto 1rem",
                            width: "4rem",
                            height: "4rem",
                            color: "rgba(255,255,255,0.2)",
                          }}
                        />
                        <p className={styles.noResultText}>
                          검색 결과가 없습니다
                        </p>
                        <p className={styles.noResultSub}>
                          다른 키워드로 검색해보세요
                        </p>
                      </div>
                    )
                  ) : (
                    <div className={styles.resultScroll}>
                      <div className={styles.suggestHeader}>
                        <p className={styles.suggestTitle}>
                          <Sparkles
                            style={{
                              width: "1.25rem",
                              height: "1.25rem",
                              color: "#E4FF30",
                            }}
                          />
                          추천 게임
                        </p>
                      </div>
                      <div className={styles.suggestGrid}>
                        {/* 인기 급상승 */}
                        <div className={styles.suggestCategory}>
                          <div className={styles.suggestCategoryTitle}>
                            <TrendingUp
                              style={{
                                width: "1.25rem",
                                height: "1.25rem",
                                color: "#E4FF30",
                              }}
                            />
                            인기 급상승
                          </div>
                          <div className={styles.suggestList}>
                            {trendingGames.map((game, index) => (
                              <Link
                                key={game.id}
                                href={`/game/${game.id}`}
                                onClick={() => setShowResults(false)}
                              >
                                <motion.div
                                  className={styles.suggestItem}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ scale: 1.02, x: 4 }}
                                >
                                  <div className={styles.suggestImg}>
                                    <img src={game.image} alt={game.title} />
                                  </div>
                                  <div className={styles.suggestInfo}>
                                    <h4 className={styles.suggestTitle2}>
                                      {game.title}
                                    </h4>
                                    <p className={styles.suggestGenre}>
                                      {game.genre}
                                    </p>
                                  </div>
                                  <p className={styles.suggestPrice}>
                                    {game.price}
                                  </p>
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* 인기 게임 */}
                        <div className={styles.suggestCategory}>
                          <div className={styles.suggestCategoryTitle}>
                            <Star
                              style={{
                                width: "1.25rem",
                                height: "1.25rem",
                                fill: "#E4FF30",
                                color: "#E4FF30",
                              }}
                            />
                            인기 게임
                          </div>
                          <div className={styles.suggestList}>
                            {popularGames.map((game, index) => (
                              <Link
                                key={game.id}
                                href={`/game/${game.id}`}
                                onClick={() => setShowResults(false)}
                              >
                                <motion.div
                                  className={styles.suggestItem}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay:
                                      (trendingGames.length + index) * 0.05,
                                  }}
                                  whileHover={{ scale: 1.02, x: 4 }}
                                >
                                  <div className={styles.suggestImg}>
                                    <img src={game.image} alt={game.title} />
                                  </div>
                                  <div className={styles.suggestInfo}>
                                    <h4 className={styles.suggestTitle2}>
                                      {game.title}
                                    </h4>
                                    <p className={styles.suggestGenre}>
                                      {game.genre}
                                    </p>
                                  </div>
                                  <p className={styles.suggestPrice}>
                                    {game.price}
                                  </p>
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={
                  pathname === link.path
                    ? styles.mobileNavLinkActive
                    : styles.mobileNavLink
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}

export { Header as Navigation };
