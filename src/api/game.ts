import { apiClient } from "@/src/lib/api";

// 백엔드 응답 타입 (스키마 전체 반영)
export interface BackendGameDetail {
  id: number;
  slug: string;
  name: string;
  description: string;
  released: string;
  tba: boolean;
  thumbnail_img_url: string;
  website: string;
  rawg_rating: number;
  rawg_ratings_count: number;
  metacritic: number;
  rawg_added: number;
  playtime: number;
  esrb_rating: string;
  age_rating_min: number;
  genres: { id: number; name: string; slug: string }[];
  platforms: {
    id: number;
    name: string;
    requirements_minimum: string;
    requirements_recommended: string;
  }[];
  tags: { id: number; name: string }[];
  media: {
    type: string;
    media_url: string;
    video_url_480: string;
    video_url_max: string;
  }[];
  stores: { name: string; url: string }[];
  is_saved?: boolean;
}

// 프론트에서 사용하는 게임 상세 타입
export interface GameDetailData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  rating: number;
  genre: string;
  releaseDate: string;
  description: string;
  playtime: number;
  esrbRating: string;
  platforms: string[];
  systemRequirements: {
    minimum: string;
    recommended: string;
  };
  screenshots: string[];
  stores: { name: string; url: string }[];
  tags: string[];
  is_saved?: boolean;
}

// 백엔드 응답 → 프론트 타입 변환
function mapToGameDetailData(data: BackendGameDetail): GameDetailData {
  const pcPlatform = data.platforms?.find((p) =>
    p.name.toLowerCase().includes("pc")
  );

  const screenshots =
    data.media
      ?.filter((m) => m.type === "screenshot")
      .map((m) => m.media_url) ?? [];

  return {
    id: data.id,
    title: data.name,
    subtitle: data.slug ?? "",
    image: data.thumbnail_img_url ?? "",
    rating: data.rawg_rating ?? 0,
    genre: data.genres?.map((g) => g.name).join(", ") ?? "",
    releaseDate: data.released ?? "",
    description: data.description ?? "",
    playtime: data.playtime ?? 0,
    esrbRating: data.esrb_rating ?? "",
    platforms: data.platforms?.map((p) => p.name) ?? [],
    systemRequirements: {
      minimum: pcPlatform?.requirements_minimum ?? "",
      recommended: pcPlatform?.requirements_recommended ?? "",
    },
    screenshots,
    stores: data.stores ?? [],
    tags: data.tags?.map((t) => t.name) ?? [],
    is_saved: data.is_saved ?? false,
  };
}

export async function fetchGameDetail(id: number): Promise<GameDetailData> {
  const { data } = await apiClient.get<BackendGameDetail>(
    `/api/v1/games/${id}/`
  );

  if (data.description) {
    try {
      const res = await fetch(
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ q: data.description }).toString(),
        }
      );
      const translateData = await res.json();
      if (translateData && translateData[0]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.description = translateData[0].map((x: any) => x[0]).join("");
      }
    } catch (error) {
      console.error("Failed to translate game description:", error);
    }
  }

  return mapToGameDetailData(data);
}

// 백엔드 유사 게임 응답 타입
interface BackendSimilarGameResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    slug: string;
    name: string;
    thumbnail_img_url: string;
    rawg_rating: number;
    similarity_score: number;
    is_saved?: boolean;
  }[];
}

import type { GameCardItem } from "@/src/types/game";

// 유사 게임 목록 조회
export async function fetchSimilarGames(
  id: number,
  limit = 10
): Promise<GameCardItem[]> {
  const { data } = await apiClient.get<BackendSimilarGameResponse>(
    `/api/v1/games/${id}/similar/`,
    { params: { limit } }
  );

  return (data.results || []).map((item) => ({
    id: item.id,
    title: item.name,
    image: item.thumbnail_img_url ?? "",
    price: "정보 없음",
    rating: item.rawg_rating ?? 0,
    genre: "", // 백엔드 명세에 장르 없음
    is_saved: item.is_saved ?? false,
  }));
}

// 장르 데이터 타입
export interface GenreItem {
  id: number;
  name: string;
  slug: string;
}

// 전체 장르 목록 조회
export async function fetchGenres(): Promise<GenreItem[]> {
  const { data } = await apiClient.get<{ results: GenreItem[] }>(
    "/api/v1/games/genres/"
  );
  return data.results || [];
}

// 플랫폼 데이터 타입
export interface PlatformItem {
  id: number;
  name: string;
  slug: string;
  icon_url: string;
}

// 전체 플랫폼 목록 조회
export async function fetchPlatforms(): Promise<PlatformItem[]> {
  const { data } = await apiClient.get<{ results: PlatformItem[] }>(
    "/api/v1/games/platforms/"
  );
  return data.results || [];
}

// 태그 데이터 타입
export interface TagItem {
  id: number;
  name: string;
}

// 전체 태그 목록 조회
export async function fetchTags(): Promise<TagItem[]> {
  const { data } = await apiClient.get<{ results: TagItem[] }>(
    "/api/v1/games/tags/"
  );
  return data.results || [];
}

// 게임 검색 결과 타입
export interface SearchGameItem {
  id: number;
  title: string;
  image: string;
  rating: number;
  genre: string;
}

// 백엔드 검색 응답 타입
interface BackendSearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    slug: string;
    name: string;
    thumbnail_img_url: string | null;
    rawg_rating: number;
    genres: { id: number; name: string; slug: string }[];
  }[];
}

// 게임 검색 API
export async function searchGames(query: string): Promise<SearchGameItem[]> {
  if (!query.trim()) return [];
  const { data } = await apiClient.get<BackendSearchResponse>(
    "/api/v1/games/",
    { params: { search: query } }
  );
  return (data.results || []).map((item) => ({
    id: item.id,
    title: item.name,
    image: item.thumbnail_img_url ?? "",
    rating: item.rawg_rating ?? 0,
    genre: item.genres?.map((g) => g.name).join(", ") ?? "",
  }));
}
