import { http, HttpResponse } from "msw";
import { userPreferences } from "../data/user";

// MSW 메모리 store - 취향 수정 시 여기에 저장됨
const preferencesStore = {
  genres: [...userPreferences.genres],
  platforms: [...userPreferences.platforms],
  tags: [...userPreferences.tags],
};

// 로그인은 핸들러 없음 → 실제 API로 bypass (onUnhandledRequest: 'bypass')
export const handlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({ ok: true });
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
];
