import { apiClient } from "@/src/lib/api";

// 최근 검색어 목록 조회
export async function fetchRecentSearches(): Promise<string[]> {
  try {
    const { data } = await apiClient.get<{ results: string[] }>(
      "/api/v1/search/recent/"
    );
    return data.results || [];
  } catch (error) {
    console.error("최근 검색어 조회 실패:", error);
    return [];
  }
}

// 개별 검색어 삭제
export async function deleteRecentSearch(keyword: string): Promise<void> {
  await apiClient.delete(
    `/api/v1/search/recent/${encodeURIComponent(keyword)}/`
  );
}

// 전체 검색어 삭제
export async function deleteAllRecentSearches(): Promise<void> {
  await apiClient.delete("/api/v1/search/recent/");
}
