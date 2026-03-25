"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  fetchAdminDashboard,
  fetchAdminUsers,
  fetchAdminUserDetail,
  fetchAdminUserInteractions,
  fetchAdminUserRecommendations,
  toggleAdminUserActiveStatus,
  DashboardSummary,
  AdminUser,
  AdminUserDetail,
  AdminUserInteraction,
  AdminUserRecommendation,
} from "@/src/api/admin";
import {
  Users,
  UserCheck,
  Activity,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";
import styles from "./admin.module.scss";

export default function AdminPage() {
  const router = useRouter();
  const { authUser, isAuthLoading } = useAuth();

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // User Modal State
  const [selectedUser, setSelectedUser] = useState<AdminUserDetail | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  // Interaction Modal State
  const [selectedInteractionUser, setSelectedInteractionUser] =
    useState<AdminUser | null>(null);
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);
  const [interactions, setInteractions] = useState<AdminUserInteraction[]>([]);
  const [interactionsPage, setInteractionsPage] = useState(1);
  const [hasMoreInteractions, setHasMoreInteractions] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Recommendation Modal State
  const [selectedRecommendationUser, setSelectedRecommendationUser] =
    useState<AdminUser | null>(null);
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] =
    useState(false);
  const [recommendations, setRecommendations] = useState<
    AdminUserRecommendation[]
  >([]);
  const [recommendationsPage, setRecommendationsPage] = useState(1);
  const [hasMoreRecommendations, setHasMoreRecommendations] = useState(false);
  const [isRecommendationLoadingMore, setIsRecommendationLoadingMore] =
    useState(false);

  const openUserModal = async (userId: number) => {
    setIsModalOpen(true);
    setIsModalLoading(true);

    try {
      const detail = await fetchAdminUserDetail(userId);
      setSelectedUser(detail);
    } catch (e) {
      console.error(e);
    } finally {
      setIsModalLoading(false);
    }
  };

  const closeUserModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedUser(null), 200);
  };

  const openInteractionModal = async (user: AdminUser) => {
    setSelectedInteractionUser(user);
    setIsInteractionModalOpen(true);
    setInteractions([]);
    setInteractionsPage(1);
    setHasMoreInteractions(false);
    setIsLoadingMore(true);

    try {
      const interData = await fetchAdminUserInteractions(user.id, 1);
      if (interData) {
        setInteractions(interData.results);
        setHasMoreInteractions(!!interData.next);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const closeInteractionModal = () => {
    setIsInteractionModalOpen(false);
    setTimeout(() => setSelectedInteractionUser(null), 200);
  };

  const loadMoreInteractions = async () => {
    if (!selectedInteractionUser || isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = interactionsPage + 1;
    const data = await fetchAdminUserInteractions(
      selectedInteractionUser.id,
      nextPage
    );
    if (data) {
      setInteractions((prev) => [...prev, ...data.results]);
      setInteractionsPage(nextPage);
      setHasMoreInteractions(!!data.next);
    }
    setIsLoadingMore(false);
  };

  const openRecommendationModal = async (user: AdminUser) => {
    setSelectedRecommendationUser(user);
    setIsRecommendationModalOpen(true);
    setRecommendations([]);
    setRecommendationsPage(1);
    setHasMoreRecommendations(false);
    setIsRecommendationLoadingMore(true);

    try {
      const recData = await fetchAdminUserRecommendations(user.id, 1);
      if (recData) {
        setRecommendations(recData.results);
        setHasMoreRecommendations(!!recData.next);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRecommendationLoadingMore(false);
    }
  };

  const closeRecommendationModal = () => {
    setIsRecommendationModalOpen(false);
    setTimeout(() => setSelectedRecommendationUser(null), 200);
  };

  const loadMoreRecommendations = async () => {
    if (!selectedRecommendationUser || isRecommendationLoadingMore) return;
    setIsRecommendationLoadingMore(true);
    const nextPage = recommendationsPage + 1;
    const data = await fetchAdminUserRecommendations(
      selectedRecommendationUser.id,
      nextPage
    );
    if (data) {
      setRecommendations((prev) => [...prev, ...data.results]);
      setRecommendationsPage(nextPage);
      setHasMoreRecommendations(!!data.next);
    }
    setIsRecommendationLoadingMore(false);
  };

  const translateInteractionType = (type: string) => {
    switch (type) {
      case "saved_add":
        return "위시리스트 추가";
      case "saved_remove":
        return "위시리스트 제거";
      case "like":
        return "좋아요";
      case "neutral":
        return "보통 / 평가 취소";
      default:
        return type;
    }
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [dashData, usersData] = await Promise.all([
        fetchAdminDashboard(),
        fetchAdminUsers(currentPage),
      ]);

      if (dashData) setSummary(dashData);
      if (usersData) {
        setUsers(usersData.results);
        setTotalCount(usersData.count);
        setHasNext(!!usersData.next);
        setHasPrev(!!usersData.previous);
      }
    } catch (e) {
      console.error("어드민 페이지 조회 중 오류 발생:", e);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isAuthLoading) return;

    if (!authUser || !authUser.is_staff) {
      alert("관리자 권한이 없습니다.");
      router.replace("/");
      return;
    }

    void loadData();
  }, [authUser, isAuthLoading, router, loadData]);

  const handleToggleActive = async (userId: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    if (
      !confirm(
        `해당 유저를 해당 상태(${
          newStatus ? "활성" : "비활성"
        })로 변경하시겠습니까?`
      )
    ) {
      return;
    }

    const success = await toggleAdminUserActiveStatus(userId, newStatus);
    if (success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, is_active: newStatus } : u))
      );
      // 변경된 활성 유저 통계를 즉시 대시보드 요약에 반영하기 위해 다시 조회
      try {
        const dashData = await fetchAdminDashboard();
        if (dashData) setSummary(dashData);
      } catch (err) {
        console.error("대시보드 통계 갱신 오류:", err);
      }
    } else {
      alert("상태 변경에 실패했습니다. API 구조를 확인해야 합니다.");
    }
  };

  useEffect(() => {
    if (isModalOpen || isInteractionModalOpen || isRecommendationModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, isInteractionModalOpen, isRecommendationModalOpen]);

  if (!isAuthLoading && (!authUser || !authUser.is_staff)) {
    return null; // 권한이 없으면 렌더링하지 않고 useEffect에서 라우팅 처리됨
  }

  if (isAuthLoading || (isLoading && !summary)) {
    return (
      <div className={styles.loadingWrap}>
        <div className={styles.spinner} />
        <p>관리자 데이터를 불러오는 중...</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <Shield
            style={{ width: "2.5rem", height: "2.5rem", color: "#e4ff30" }}
          />
          <h1 className={styles.title}>관리자 대시보드</h1>
        </div>

        {/* Dashboard Cards */}
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIconWrap}>
              <Users className={styles.cardIcon} />
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardLabel}>총 유저 수</p>
              <h3 className={styles.cardValue}>{summary?.total_users ?? 0}</h3>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIconWrap}>
              <UserCheck
                className={styles.cardIcon}
                style={{ color: "#1ed760" }}
              />
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardLabel}>활성 유저 수</p>
              <h3 className={styles.cardValue}>{summary?.active_users ?? 0}</h3>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIconWrap}>
              <Activity
                className={styles.cardIcon}
                style={{ color: "#3b82f6" }}
              />
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardLabel}>오늘의 추천 작업</p>
              <h3 className={styles.cardValue}>
                {summary?.recommendation_jobs_today ?? 0}
              </h3>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIconWrap}>
              <AlertTriangle
                className={styles.cardIcon}
                style={{ color: "#ef4444" }}
              />
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardLabel}>실패한 작업</p>
              <h3 className={styles.cardValue}>{summary?.failed_jobs ?? 0}</h3>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2 className={styles.sectionTitle}>
              전체 유저 목록 ({totalCount})
            </h2>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>이메일</th>
                  <th>닉네임</th>
                  <th>상태</th>
                  <th>스태프 권한</th>
                  <th>성인인증</th>
                  <th>가입일</th>
                  <th>활동 로그</th>
                  <th>추천 결과</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>
                      <button
                        className={styles.emailLink}
                        onClick={() => openUserModal(u.id)}
                      >
                        {u.email}
                      </button>
                    </td>
                    <td>{u.nickname}</td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          u.is_active
                            ? styles.badgeActive
                            : styles.badgeInactive
                        }`}
                      >
                        {u.is_active ? "활성" : "비활성"}
                      </span>
                    </td>
                    <td>
                      {u.is_staff ? (
                        <span
                          className={`${styles.badge} ${styles.badgeStaff}`}
                        >
                          스태프
                        </span>
                      ) : (
                        <span
                          className={`${styles.badge} ${styles.badgeInactive}`}
                        >
                          일반
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          u.is_adult_verified
                            ? styles.badgeAdultVerified
                            : styles.badgeAdultUnverified
                        }`}
                      >
                        {u.is_adult_verified ? "완료" : "미완"}
                      </span>
                    </td>
                    <td>{formatDate(u.created_at)}</td>
                    <td>
                      <button
                        className={styles.actionBtn}
                        style={{
                          background: "rgba(168, 85, 247, 0.2)",
                          color: "#c084fc",
                        }}
                        onClick={() => openInteractionModal(u)}
                      >
                        조회
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.actionBtn}
                        style={{
                          background: "rgba(245, 158, 11, 0.2)",
                          color: "#fbbf24",
                        }}
                        onClick={() => openRecommendationModal(u)}
                      >
                        조회
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.actionBtn}
                        style={{
                          background: u.is_active
                            ? "rgba(239, 68, 68, 0.2)"
                            : "rgba(30, 215, 96, 0.2)",
                          color: u.is_active ? "#f87171" : "#1ed760",
                        }}
                        onClick={() => handleToggleActive(u.id, u.is_active)}
                      >
                        {u.is_active ? "비활성 처리" : "활성화"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && !isLoading && (
              <div className={styles.emptyState}>유저 데이터가 없습니다.</div>
            )}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              disabled={!hasPrev || isLoading}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft size={16} /> 이전
            </button>
            <span className={styles.pageInfo}>{currentPage} 페이지</span>
            <button
              className={styles.pageBtn}
              disabled={!hasNext || isLoading}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              다음 <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeUserModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>유저 상세 정보</h3>
              <button className={styles.modalClose} onClick={closeUserModal}>
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              {isModalLoading ? (
                <div className={styles.modalLoading}>
                  <div
                    className={styles.spinner}
                    style={{ width: 24, height: 24 }}
                  />
                  <p>정보를 불러오는 중입니다...</p>
                </div>
              ) : selectedUser ? (
                <>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>ID</span>
                      <span className={styles.detailValue}>
                        {selectedUser.id}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>이메일</span>
                      <span className={styles.detailValue}>
                        {selectedUser.email}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>닉네임</span>
                      <span className={styles.detailValue}>
                        {selectedUser.nickname}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>생년월일</span>
                      <span className={styles.detailValue}>
                        {selectedUser.birth_date || "-"}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>계정 상태</span>
                      <span className={styles.detailValue}>
                        {selectedUser.is_active ? "활성" : "비활성"}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>관리자 스태프</span>
                      <span className={styles.detailValue}>
                        {selectedUser.is_staff ? "스태프" : "권한 없음"}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>최고 관리자</span>
                      <span className={styles.detailValue}>
                        {selectedUser.is_superuser
                          ? "최고 관리자"
                          : "권한 없음"}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>성인인증</span>
                      <span className={styles.detailValue}>
                        {selectedUser.is_adult_verified ? "완료" : "미완료"}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>성인인증 일시</span>
                      <span className={styles.detailValue}>
                        {selectedUser.adult_verified_at
                          ? formatDate(selectedUser.adult_verified_at)
                          : "-"}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>가입 일시</span>
                      <span className={styles.detailValue}>
                        {formatDate(selectedUser.created_at)}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.modalError}>
                  유저 정보를 찾을 수 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interaction Log Modal */}
      {isInteractionModalOpen && (
        <div className={styles.modalOverlay} onClick={closeInteractionModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {selectedInteractionUser?.nickname} 님의 활동 로그
              </h3>
              <button
                className={styles.modalClose}
                onClick={closeInteractionModal}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div
                className={styles.interactionsSection}
                style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}
              >
                {isLoadingMore && interactionsPage === 1 ? (
                  <div className={styles.modalLoading}>
                    <div
                      className={styles.spinner}
                      style={{ width: 24, height: 24 }}
                    />
                    <p>불러오는 중...</p>
                  </div>
                ) : interactions.length > 0 ? (
                  <div className={styles.interactionsList}>
                    {interactions.map((log, idx) => (
                      <div key={idx} className={styles.interactionItem}>
                        <span className={styles.interType}>
                          {translateInteractionType(log.type)}
                        </span>
                        <span className={styles.interGame}>
                          게임 ID: {log.game_id}
                        </span>
                        <span className={styles.interDate}>
                          {formatDate(log.created_at)}
                        </span>
                      </div>
                    ))}
                    {hasMoreInteractions && (
                      <button
                        className={styles.loadMoreBtn}
                        onClick={loadMoreInteractions}
                        disabled={isLoadingMore}
                      >
                        {isLoadingMore ? "불러오는 중..." : "활동 로그 더보기"}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className={styles.noInteractions}>비어 있습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendation Modal */}
      {isRecommendationModalOpen && (
        <div className={styles.modalOverlay} onClick={closeRecommendationModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {selectedRecommendationUser?.nickname} 님의 추천 결과
              </h3>
              <button
                className={styles.modalClose}
                onClick={closeRecommendationModal}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div
                className={styles.interactionsSection}
                style={{ marginTop: 0, paddingTop: 0, borderTop: "none" }}
              >
                {isRecommendationLoadingMore && recommendationsPage === 1 ? (
                  <div className={styles.modalLoading}>
                    <div
                      className={styles.spinner}
                      style={{ width: 24, height: 24 }}
                    />
                    <p>불러오는 중...</p>
                  </div>
                ) : recommendations.length > 0 ? (
                  <div className={styles.interactionsList}>
                    {recommendations.map((rec, idx) => (
                      <div key={idx} className={styles.interactionItem}>
                        <span
                          className={styles.interType}
                          style={{ color: "#fbbf24", fontWeight: "bold" }}
                        >
                          게임 ID: {rec.game_id}
                        </span>
                        <span
                          className={styles.interDate}
                          style={{ fontSize: "0.85rem" }}
                        >
                          가중치: {rec.score}
                        </span>
                      </div>
                    ))}
                    {hasMoreRecommendations && (
                      <button
                        className={styles.loadMoreBtn}
                        onClick={loadMoreRecommendations}
                        disabled={isRecommendationLoadingMore}
                      >
                        {isRecommendationLoadingMore
                          ? "불러오는 중..."
                          : "추천 결과 더보기"}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className={styles.noInteractions}>추천 내역이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
