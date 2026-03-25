"use client";

import {
  Search,
  User,
  Menu,
  Gamepad2,
  X,
  Star,
  Heart,
  UserCircle,
  LogOut,
  Clock,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon3D } from "./Icon3D";
import { logout } from "@/src/api/auth";
import { useAuth } from "@/src/contexts/AuthContext";
import { searchGames } from "@/src/api/game";
import type { SearchGameItem } from "@/src/api/game";
import {
  fetchRecentSearches,
  deleteRecentSearch,
  deleteAllRecentSearches,
} from "@/src/api/search";
import styles from "./Header.module.scss";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchGameItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profileImgError, setProfileImgError] = useState(false);
  const pathname = usePathname();
  const { profile, authUser, isLoggedIn, isAuthLoading, clearAuth } = useAuth();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { path: "/", label: "홈" },
    { path: "/recommend", label: "추천게임" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("logout") === "1") {
      window.history.replaceState({}, "", window.location.pathname);
      void (async () => {
        try {
          await logout();
        } catch {
          /* ignore */
        }
        clearAuth();
      })();
    }
  }, [pathname, clearAuth]);

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

  const loadRecentSearches = useCallback(async () => {
    try {
      const data = await fetchRecentSearches();
      setRecentSearches(data);
    } catch (err) {
      console.error(err);
      setRecentSearches([]);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadRecentSearches();
    } else {
      setRecentSearches([]);
    }
  }, [isLoggedIn, loadRecentSearches]);

  // 검색어가 변경될 때 디바운스 API 호출
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchGames(query);
      setSearchResults(results);
    } catch (err) {
      console.error("검색 오류:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery, handleSearch]);

  const handleDeleteRecent = async (e: React.MouseEvent, keyword: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteRecentSearch(keyword);
      setRecentSearches((prev) => prev.filter((item) => item !== keyword));
    } catch (err) {
      console.error("최근 검색어 삭제 실패", err);
    }
  };

  const handleDeleteAllRecent = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteAllRecentSearches();
      setRecentSearches([]);
    } catch (err) {
      console.error("최근 검색어 전체 삭제 실패", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // API 실패해도 로컬 로그아웃 진행
    } finally {
      clearAuth();
      setShowProfileMenu(false);
      router.push("/");
    }
  };

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
            {isAuthLoading ? (
              <div
                className={styles.authButtons}
                aria-hidden
                style={{ minWidth: "8rem", opacity: 0.5 }}
              />
            ) : isLoggedIn ? (
              /* 프로필 드롭다운 */
              <div ref={profileRef} className={styles.profileWrap}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={styles.profileBtn}
                >
                  {profile?.profile_img_url && !profileImgError ? (
                    <Image
                      src={profile.profile_img_url}
                      alt={profile.nickname}
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
                    {profile?.nickname ?? authUser?.email ?? "..."}
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

                        {(profile?.is_staff || authUser?.is_staff) && (
                          <Link
                            href="/admin"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <motion.div
                              className={styles.dropdownItem}
                              whileHover={{ x: 4 }}
                            >
                              <Shield
                                style={{
                                  width: "1.25rem",
                                  height: "1.25rem",
                                  color: "#E4FF30",
                                }}
                              />
                              <span>어드민 페이지</span>
                            </motion.div>
                          </Link>
                        )}

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
                onFocus={() => {
                  setShowResults(true);
                  if (isLoggedIn) {
                    loadRecentSearches();
                  }
                }}
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
                    isSearching ? (
                      <div className={styles.noResult}>
                        <p className={styles.noResultText}>검색 중...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className={styles.resultScroll}>
                        <div className={styles.resultHeader}>
                          <p className={styles.resultCount}>
                            {searchResults.length}개의 검색 결과
                          </p>
                        </div>
                        <div className={styles.resultGrid}>
                          {searchResults.map((game, index) => (
                            <Link
                              key={game.id}
                              href={`/game/${game.id}`}
                              onClick={() => {
                                setSearchQuery("");
                                setShowResults(false);
                                // 검색 실행 (옵션: 페이지 이동 후 최근 검색어 갱신)
                                // loadRecentSearches(); // 나중에 게임 상세 이동 시에 백엔드에서 추가되면 다음 번에 반영됨
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
                                  {game.image ? (
                                    <Image
                                      src={game.image}
                                      alt={game.title}
                                      fill
                                      sizes="128px"
                                    />
                                  ) : (
                                    <div className={styles.dummyImg}>
                                      <Gamepad2
                                        style={{
                                          width: "2rem",
                                          height: "2rem",
                                          color: "rgba(255,255,255,0.2)",
                                        }}
                                      />
                                    </div>
                                  )}
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
                  ) : recentSearches.length > 0 ? (
                    <div className={styles.resultScroll}>
                      <div className={styles.recentHeader}>
                        <span className={styles.recentTitle}>최근 검색어</span>
                      </div>
                      <div className={styles.recentList}>
                        {recentSearches.map((keyword, index) => {
                          return (
                            <div
                              key={`${keyword}-${index}`}
                              className={styles.recentItem}
                              onClick={() => {
                                setSearchQuery(keyword);
                                // handleClick Outside나 검색 실행 시 닫힘 처리
                              }}
                            >
                              <div className={styles.recentKeywordWrap}>
                                <Clock
                                  style={{ width: "1rem", height: "1rem" }}
                                  className={styles.recentIcon}
                                />
                                <span className={styles.recentKeyword}>
                                  {keyword}
                                </span>
                              </div>
                              <div className={styles.recentRight}>
                                <button
                                  onClick={(e) =>
                                    handleDeleteRecent(e, keyword)
                                  }
                                  className={styles.recentDeleteBtn}
                                  aria-label="삭제"
                                >
                                  <X
                                    style={{ width: "1rem", height: "1rem" }}
                                  />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className={styles.recentFooter}>
                        <button
                          onClick={handleDeleteAllRecent}
                          className={styles.recentClearAll}
                        >
                          최근 검색어 전체 삭제
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.noResult}>
                      <Search
                        style={{
                          display: "block",
                          margin: "0 auto 1rem",
                          width: "3rem",
                          height: "3rem",
                          color: "rgba(255,255,255,0.2)",
                        }}
                      />
                      <p className={styles.noResultText}>게임을 검색해보세요</p>
                      <p className={styles.noResultSub}>
                        제목으로 검색할 수 있어요
                      </p>
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
