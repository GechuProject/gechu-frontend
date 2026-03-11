/** 로그인 Mock 사용자 (MSW 개발용, 현재 로그인은 실제 API 사용) */
export const mockUsers = [
  {
    email: "user@example.com",
    password: "password123",
    access_token: "mock-access-token-user",
  },
  {
    email: "test@test.com",
    password: "test1234",
    access_token: "mock-access-token-test",
  },
] as const;
