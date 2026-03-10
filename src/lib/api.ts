import axios from "axios";

// 항상 실제 API URL 사용. MSW는 핸들러가 있는 엔드포인트만 mock, 나머지는 bypass
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
