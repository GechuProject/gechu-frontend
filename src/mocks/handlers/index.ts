import { http, HttpResponse } from "msw";
import { userWishlist } from "../data/user";
import { wishlistGames } from "../data/games";

// MSW 메모리 store - 위시리스트 (마이페이지용)
const wishlistStore = {
  count: userWishlist.count,
  next: userWishlist.next,
  previous: userWishlist.previous,
  results: [...userWishlist.results],
};

// MSW 메모리 store - 위시리스트 게임 목록 (위시리스트 페이지용)
const wishlistGamesStore = [...wishlistGames];

// 로그인은 핸들러 없음 → 실제 API로 bypass (onUnhandledRequest: 'bypass')
// 홈 게임 목록 → /api/v1/games/ 백엔드 API 직접 사용 (bypass)
// 추천 게임 목록 → /api/v1/recommendations/ 백엔드 API 직접 사용 (bypass)
export const handlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({ ok: true });
  }),

  http.get("/api/mypage/wishlist", () => {
    return HttpResponse.json(wishlistStore);
  }),

  // 위시리스트 게임 목록 조회 (위시리스트 페이지용)
  http.get("/api/wishlist", () => {
    return HttpResponse.json(wishlistGamesStore);
  }),

  // 위시리스트에서 게임 삭제
  http.delete("/api/wishlist/:id", ({ params }) => {
    const id = Number(params.id);
    const index = wishlistGamesStore.findIndex((g) => g.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { message: "게임을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    wishlistGamesStore.splice(index, 1);
    return HttpResponse.json({ success: true });
  }),
];
