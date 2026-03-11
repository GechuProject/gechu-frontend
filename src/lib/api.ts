import axios from "axios";

// Mock 모드: baseURL="" → same-origin, MSW가 home/mypage/wishlist 등 intercept
// 실제 API 모드: baseURL로 CloudFront 요청
const apiBaseURL =
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
    ? ""
    : process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const apiClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 로그인 등 실제 백엔드 전용 (Mock 모드에서도 CloudFront로 bypass)
export const authApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});
