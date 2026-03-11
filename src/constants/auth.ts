export const ACCESS_TOKEN_KEY = "access_token";

// 탭/창 닫으면 로그아웃 (sessionStorage 사용)
export const getAccessToken = (): string | null =>
  typeof window !== "undefined"
    ? sessionStorage.getItem(ACCESS_TOKEN_KEY)
    : null;

export const setAccessToken = (token: string): void => {
  if (typeof window !== "undefined")
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const removeAccessToken = (): void => {
  if (typeof window !== "undefined")
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
};
