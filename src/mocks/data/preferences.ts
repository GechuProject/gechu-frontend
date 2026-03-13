export const gamePreferences = {
  favoriteGenres: ["RPG", "액션", "어드벤처"],
  favoritePlatforms: ["PC", "PlayStation"],
  favoriteThemes: ["오픈월드", "스토리 중심", "Co-op"],
};

export const recentSearches = [
  { id: 1, query: "Cyber Nexus 2077", timestamp: "5분 전" },
  { id: 2, query: "RPG 추천", timestamp: "1시간 전" },
  { id: 3, query: "Battle Royale", timestamp: "3시간 전" },
  { id: 4, query: "무료 게임", timestamp: "어제" },
  { id: 5, query: "Fantasy Realm", timestamp: "2일 전" },
];

export const availableGenres = [
  "RPG",
  "액션",
  "어드벤처",
  "FPS",
  "전략",
  "시뮬레이션",
  "스포츠",
  "레이싱",
  "퍼즐",
  "MMORPG",
];

export const availablePlatforms = [
  "PC",
  "PlayStation",
  "Xbox",
  "Nintendo Switch",
  "Mobile",
];

export const availableThemes = [
  "오픈월드",
  "스토리 중심",
  "Co-op",
  "PvP",
  "싱글플레이",
  "멀티플레이",
  "생존",
  "공포",
  "판타지",
  "SF",
];

export const recommendedGames = {
  count: 20,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: "The Witcher 3: Wild Hunt",
      is_saved: true,
      like_state: 1,
      preference_score: 0.9523,
      last_interacted_at: "2025-05-30T08:00:00Z",
    },
    {
      id: 2,
      name: "Elden Ring",
      is_saved: false,
      like_state: 1,
      preference_score: 0.9102,
      last_interacted_at: "2025-05-28T12:00:00Z",
    },
    {
      id: 3,
      name: "Cyberpunk 2077",
      is_saved: true,
      like_state: 0,
      preference_score: 0.8721,
      last_interacted_at: "2025-05-25T09:30:00Z",
    },
    {
      id: 4,
      name: "Red Dead Redemption 2",
      is_saved: false,
      like_state: 1,
      preference_score: 0.8431,
      last_interacted_at: "2025-05-20T15:00:00Z",
    },
    {
      id: 5,
      name: "Dark Souls III",
      is_saved: false,
      like_state: -1,
      preference_score: 0.8012,
      last_interacted_at: "2025-05-18T10:00:00Z",
    },
    {
      id: 6,
      name: "Baldur's Gate 3",
      is_saved: true,
      like_state: 1,
      preference_score: 0.7856,
      last_interacted_at: "2025-05-15T14:00:00Z",
    },
    {
      id: 7,
      name: "God of War: Ragnarök",
      is_saved: false,
      like_state: 0,
      preference_score: 0.7634,
      last_interacted_at: "2025-05-10T11:00:00Z",
    },
  ],
};
