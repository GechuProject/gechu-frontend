import { delay, http, HttpResponse } from "msw";
import { userPreferences, userWishlist } from "../data/user";
import { actionGames, rpgGames, wishlistGames } from "../data/games";

// MSW 메모리 store - 취향 수정 시 여기에 저장됨
const preferencesStore = {
  genres: [...userPreferences.genres],
  platforms: [...userPreferences.platforms],
  tags: [...userPreferences.tags],
};

// MSW 메모리 store - 위시리스트 (마이페이지용)
const wishlistStore = {
  count: userWishlist.count,
  next: userWishlist.next,
  previous: userWishlist.previous,
  results: [...userWishlist.results],
};

// MSW 메모리 store - 위시리스트 게임 목록 (위시리스트 페이지용)
const wishlistGamesStore = [...wishlistGames];

export const handlers = [
  http.all("*", async () => {
    await delay(300);
  }),
  http.get("/api/health", () => {
    return HttpResponse.json({ ok: true });
  }),
  http.post("/api/v1/auth/login", async ({ request }) => {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    if (!body.email || !body.password) {
      return HttpResponse.json(
        {
          status_code: "401",
          code: "INVALID_CREDENTIALS",
          message: "이메일 또는 비밀번호가 올바르지 않습니다.",
        },
        { status: 401 }
      );
    }
    return HttpResponse.json({
      access_token: "mock-access-token",
      token_type: "bearer",
      expires_in: 3600,
    });
  }),

  // 홈화면 - 액션 Top 10
  http.get("/api/home/action-games", () => {
    return HttpResponse.json(actionGames);
  }),

  // 홈화면 - RPG Top 10
  http.get("/api/home/rpg-games", () => {
    return HttpResponse.json(rpgGames);
  }),

  // 게임 취향 조회
  http.get("/api/mypage/preferences", () => {
    return HttpResponse.json({
      genres: preferencesStore.genres,
      platforms: preferencesStore.platforms,
      tags: preferencesStore.tags,
    });
  }),

  // 게임 취향 수정
  http.put("/api/mypage/preferences", async ({ request }) => {
    const body = (await request.json()) as {
      genres: { id: number; name: string }[];
      platforms: { id: number; name: string }[];
      tags: { id: number; name: string }[];
    };

    preferencesStore.genres = body.genres;
    preferencesStore.platforms = body.platforms;
    preferencesStore.tags = body.tags;

    return HttpResponse.json({
      genres: preferencesStore.genres,
      platforms: preferencesStore.platforms,
      tags: preferencesStore.tags,
    });
  }),

  // 위시리스트 조회 (마이페이지용)
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
