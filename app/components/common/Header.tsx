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
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon3D } from "./Icon3D";
import { logout, ACCESS_TOKEN_KEY } from "@/src/api/auth";
import { fetchUserProfile } from "@/src/api/mypage";
import type { UserProfile } from "@/src/api/mypage";
import { headerSearchGames } from "@/src/mocks/data/games";
import styles from "./Header.module.scss";

const allGames = headerSearchGames;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileImgError, setProfileImgError] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { path: "/", label: "홈" },
    { path: "/recommend", label: "추천게임" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    // 개발 시 ?logout=1 쿼리로 로그아웃 상태 강제 (localStorage 정리)
    const params = new URLSearchParams(window.location.search);
    if (params.get("logout") === "1") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      window.history.replaceState({}, "", window.location.pathname);
    }
    const hasToken = !!localStorage.getItem(ACCESS_TOKEN_KEY);
    queueMicrotask(() => setIsLoggedIn(hasToken));
  }, [pathname]);

  useEffect(() => {
    if (!isLoggedIn) {
      setUserProfile(null);
      setProfileImgError(false);
      return;
    }
    setProfileImgError(false);
    fetchUserProfile().then((profile) => setUserProfile(profile));
  }, [isLoggedIn]);

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

  const handleLogout = async () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem(ACCESS_TOKEN_KEY)
        : null;
    try {
      if (token) await logout(token);
    } catch {
      // API 실패해도 로컬 로그아웃 진행
    } finally {
      if (typeof window !== "undefined")
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      setIsLoggedIn(false);
      setShowProfileMenu(false);
      router.push("/");
    }
  };

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
            {isLoggedIn ? (
              /* 프로필 드롭다운 */
              <div ref={profileRef} className={styles.profileWrap}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={styles.profileBtn}
                >
                  {userProfile?.profile_img_url && !profileImgError ? (
                    <Image
                      src={userProfile.profile_img_url}
                      alt={userProfile.nickname}
                      width={32}
                      height={32}
                      className={styles.profileAvatar}
                      onError={() => setProfileImgError(true)}
                    />
                  ) : (
                    <Icon3D>
                      <User
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          color: "#fff",
                        }}
                      />
                    </Icon3D>
                  )}
                  <span className={styles.profileNickname}>
                    {userProfile?.nickname ?? "..."}
                  </span>
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

                        <button
                          type="button"
                          onClick={handleLogout}
                          className={styles.logoutBtn}
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
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link
                  href="/login"
                  className={`${styles.authBtn} ${styles.authBtnPrimary}`}
                >
                  로그인
                </Link>
                <Link href="/signup" className={styles.authBtn}>
                  회원가입
                </Link>
              </div>
            )}

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
                                  <Image
                                    src={game.image}
                                    alt={game.title}
                                    fill
                                    sizes="128px"
                                  />
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
                                    <Image
                                      src={game.image}
                                      alt={game.title}
                                      fill
                                      sizes="96px"
                                    />
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
                                    <Image
                                      src={game.image}
                                      alt={game.title}
                                      fill
                                      sizes="96px"
                                    />
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
