import { delay, http, HttpResponse } from "msw";

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
];
