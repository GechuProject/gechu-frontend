// 내 프로필 조회 (홈페이지 헤더 Mock)
export const userProfile = {
  id: 1,
  email: "user@example.com",
  nickname: "최강001Team",
  birth_date: "1995-06-15",
  profile_img_url: "/images/profile-mock.png",
  is_adult_verified: true,
  adult_verified_at: "2025-01-10T12:00:00Z",
  is_active: true,
  created_at: "2025-01-01T00:00:00Z",
};

// 내 게임취향 선호 장르
export const userPreferences = {
  genres: [{ id: 1, name: "RPG" }],
  platforms: [{ id: 1, name: "PC" }],
  tags: [{ id: 1, name: "오픈월드" }],
};

// 위시리스트
export const userWishlist = {
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      name: "The Witcher 3",
      slug: "the-witcher-3",
      thumbnail_img_url: "https://cdn.example.com/w3.jpg",
      rawg_rating: 4.66,
      saved_at: "2025-05-20T10:00:00Z",
    },
    {
      id: 2,
      name: "Elden Ring",
      slug: "elden-ring",
      thumbnail_img_url: "https://cdn.example.com/elden.jpg",
      rawg_rating: 4.78,
      saved_at: "2025-05-18T08:30:00Z",
    },
    {
      id: 3,
      name: "Cyberpunk 2077",
      slug: "cyberpunk-2077",
      thumbnail_img_url: "https://cdn.example.com/cp2077.jpg",
      rawg_rating: 4.12,
      saved_at: "2025-05-15T14:00:00Z",
    },
    {
      id: 4,
      name: "Red Dead Redemption 2",
      slug: "red-dead-redemption-2",
      thumbnail_img_url: "https://cdn.example.com/rdr2.jpg",
      rawg_rating: 4.8,
      saved_at: "2025-05-10T09:00:00Z",
    },
    {
      id: 5,
      name: "Hollow Knight",
      slug: "hollow-knight",
      thumbnail_img_url: "https://cdn.example.com/hk.jpg",
      rawg_rating: 4.42,
      saved_at: "2025-05-05T20:00:00Z",
    },
  ],
};

// 프로필 수정 폼 초기값 (기존 호환 유지)
export const editProfileFormInitial = {
  currentPasswordEdit: "",
  newPassword: "",
  confirmPassword: "",
  nickname: userProfile.nickname,
};
