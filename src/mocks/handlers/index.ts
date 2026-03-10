import { delay, http, HttpResponse } from "msw";
import { userPreferences } from "../data/user";

// MSW 메모리 store - 취향 수정 시 여기에 저장됨
const preferencesStore = {
  genres: [...userPreferences.genres],
  platforms: [...userPreferences.platforms],
  tags: [...userPreferences.tags],
};

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
