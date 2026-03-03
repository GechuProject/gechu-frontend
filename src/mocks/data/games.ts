export interface GameCardItem {
  id: number;
  title: string;
  image: string;
  price: string;
  rating: number;
  genre: string;
  discount?: string;
}

export interface GameDetailItem extends GameCardItem {
  subtitle: string;
  developer: string;
  releaseDate: string;
  players: string;
  description: string;
  features: string[];
  systemRequirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

export interface WishlistGameItem extends GameCardItem {
  originalPrice?: string;
  releaseDate: string;
}

const CYBER_NEXUS_IMAGE =
  "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080";
const BATTLE_ROYALE_IMAGE =
  "https://images.unsplash.com/photo-1764011643213-1f3b3691f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4MDAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const DARK_SHADOWS_IMAGE =
  "https://images.unsplash.com/photo-1723388159368-53b9be8899e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzdXJ2aXZhbCUyMGdhbWV8ZW58MXx8fHwxNzcxNzE1OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const SPEED_RACER_IMAGE =
  "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTgxNzc2NXww&ixlib=rb-4.1.0&q=80&w=1080";
const GALACTIC_WAR_IMAGE =
  "https://images.unsplash.com/photo-1531812494838-636e337af5a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNob290ZXIlMjBnYW1lfGVufDF8fHx8MTc3MTc3Njg4N3ww&ixlib=rb-4.1.0&q=80&w=1080";
const FANTASY_REALM_IMAGE =
  "https://images.unsplash.com/photo-1759688168277-185a0c623968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwUlBHJTIwZ2FtZSUyMGFydHxlbnwxfHx8fDE3NzE4Mjg4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080";
const KINGDOM_STRATEGY_IMAGE =
  "https://images.unsplash.com/photo-1613626318906-68be0aef3334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN0cmF0ZWd5JTIwZ2FtZXxlbnwxfHx8fDE3NzE4Mjg4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080";
const OPEN_WORLD_IMAGE =
  "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080";
const ADVENTURE_QUEST_IMAGE =
  "https://images.unsplash.com/photo-1758862493283-51f1e23b8883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBwbGF0Zm9ybWVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4Mjg4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080";
const FIGHTER_CHAMPIONS_IMAGE =
  "https://images.unsplash.com/photo-1758521960348-90bc4203eb52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWdodGluZyUyMGNvbWJhdCUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080";

export const actionGames: GameCardItem[] = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image: CYBER_NEXUS_IMAGE,
    price: "₩9,900",
    rating: 8.0,
    genre: "액션",
  },
  {
    id: 2,
    title: "Battle Royale Pro",
    image: BATTLE_ROYALE_IMAGE,
    price: "무료",
    rating: 9.0,
    genre: "액션",
  },
  {
    id: 3,
    title: "Dark Shadows",
    image: DARK_SHADOWS_IMAGE,
    price: "₩4,900",
    rating: 7.0,
    genre: "액션",
  },
  {
    id: 4,
    title: "Speed Racer X",
    image: SPEED_RACER_IMAGE,
    price: "₩9,900",
    rating: 8.5,
    discount: "-40%",
    genre: "액션",
  },
  {
    id: 5,
    title: "Galactic War",
    image: GALACTIC_WAR_IMAGE,
    price: "무료",
    rating: 9.5,
    genre: "액션",
  },
]

export const rpgGames: GameCardItem[] = [
  {
    id: 6,
    title: "Fantasy Realm",
    image: FANTASY_REALM_IMAGE,
    price: "₩9,900",
    rating: 9.0,
    discount: "-25%",
    genre: "RPG",
  },
  {
    id: 7,
    title: "Kingdom Strategy",
    image: KINGDOM_STRATEGY_IMAGE,
    price: "₩9,900",
    rating: 8.0,
    genre: "RPG",
  },
  {
    id: 8,
    title: "Open World Explorer",
    image: OPEN_WORLD_IMAGE,
    price: "₩9,900",
    rating: 9.5,
    genre: "RPG",
  },
  {
    id: 9,
    title: "Adventure Quest",
    image: ADVENTURE_QUEST_IMAGE,
    price: "무료",
    rating: 7.5,
    genre: "RPG",
  },
  {
    id: 10,
    title: "Fighter Champions",
    image: FIGHTER_CHAMPIONS_IMAGE,
    price: "₩4,900",
    rating: 8.7,
    discount: "-30%",
    genre: "RPG",
  },
]

export const gameDetails: Record<number, GameDetailItem> = {
  1: {
    id: 1,
    title: "Cyber Nexus 2077",
    subtitle: "미래 도시에서 펼쳐지는 오픈 월드 액션 RPG",
    image: CYBER_NEXUS_IMAGE,
    price: "₩39,900",
    rating: 9.2,
    genre: "액션 RPG",
    developer: "Neon Studios",
    releaseDate: "2026.01.15",
    players: "싱글플레이, 멀티플레이",
    description:
      "2077년, 네온으로 빛나는 미래 도시 네오 시티. 당신은 혼란에 빠진 도시를 구하기 위해 나선 해커입니다. 강력한 기업들과 맞서 싸우며, 도시의 비밀을 밝혀내세요.",
    features: [
      "방대한 오픈 월드 탐험",
      "깊이 있는 스토리와 선택지",
      "다양한 무기와 사이버웨어 커스터마이징",
      "멀티플레이 협동 미션",
    ],
    systemRequirements: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i7-8700K",
      memory: "16 GB RAM",
      graphics: "NVIDIA GeForce RTX 3070",
      storage: "70 GB available space",
    },
  },
}

export const wishlistGames: WishlistGameItem[] = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image: CYBER_NEXUS_IMAGE,
    price: "₩39,900",
    originalPrice: "₩59,900",
    discount: "-33%",
    rating: 9.2,
    genre: "액션 RPG",
    releaseDate: "2026.01.15",
  },
  {
    id: 2,
    title: "Fantasy Realm",
    image: FANTASY_REALM_IMAGE,
    price: "₩37,425",
    originalPrice: "₩49,900",
    discount: "-25%",
    rating: 9.3,
    genre: "RPG",
    releaseDate: "2025.12.10",
  },
  {
    id: 3,
    title: "Battle Royale Pro",
    image: BATTLE_ROYALE_IMAGE,
    price: "무료",
    rating: 9.2,
    genre: "배틀로얄",
    releaseDate: "출시됨",
  },
  {
    id: 4,
    title: "Open World Explorer",
    image: OPEN_WORLD_IMAGE,
    price: "₩59,900",
    rating: 9.1,
    genre: "오픈월드",
    releaseDate: "2026.02.20",
  },
  {
    id: 5,
    title: "Dark Shadows",
    image: DARK_SHADOWS_IMAGE,
    price: "₩44,900",
    rating: 9.0,
    genre: "호러",
    releaseDate: "2026.03.15",
  },
  {
    id: 6,
    title: "Speed Racer X",
    image: SPEED_RACER_IMAGE,
    price: "₩17,940",
    originalPrice: "₩29,900",
    discount: "-40%",
    rating: 8.8,
    genre: "레이싱",
    releaseDate: "출시됨",
  },
]

export const top5Games: GameCardItem[] = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image: CYBER_NEXUS_IMAGE,
    price: "무료",
    rating: 9.5,
    genre: "액션",
    discount: undefined,
  },
  {
    id: 2,
    title: "Fantasy Realm",
    image: FANTASY_REALM_IMAGE,
    price: "37,425",
    rating: 9.3,
    genre: "RPG",
    discount: "-25%",
  },
  {
    id: 3,
    title: "Battle Royale Pro",
    image: BATTLE_ROYALE_IMAGE,
    price: "무료",
    rating: 9.2,
    genre: "배틀로얄",
    discount: undefined,
  },
  {
    id: 4,
    title: "Open World Explorer",
    image: OPEN_WORLD_IMAGE,
    price: "59,900",
    rating: 9.1,
    genre: "오픈월드",
    discount: undefined,
  },
  {
    id: 5,
    title: "Dark Shadows",
    image: DARK_SHADOWS_IMAGE,
    price: "44,900",
    rating: 9.0,
    genre: "호러",
    discount: "-20%",
  },
]

export const recentGames: GameCardItem[] = [
  {
    id: 6,
    title: "Speed Racer X",
    image: SPEED_RACER_IMAGE,
    price: "17,940",
    rating: 8.8,
    genre: "레이싱",
    discount: "-40%",
  },
  {
    id: 7,
    title: "Mystery Island",
    image: OPEN_WORLD_IMAGE,
    price: "29,900",
    rating: 8.9,
    genre: "어드벤처",
    discount: undefined,
  },
  {
    id: 8,
    title: "Space Warriors",
    image: CYBER_NEXUS_IMAGE,
    price: "무료",
    rating: 9.4,
    genre: "슈팅",
    discount: undefined,
  },
  {
    id: 9,
    title: "Cyber Nexus 2077",
    image: CYBER_NEXUS_IMAGE,
    price: "39,900",
    rating: 9.2,
    genre: "액션 RPG",
    discount: "-33%",
  },
]

export const aiPickGames: GameCardItem[] = [
  {
    id: 2,
    title: "Fantasy Realm",
    image: FANTASY_REALM_IMAGE,
    price: "37,425",
    rating: 9.3,
    genre: "RPG",
    discount: "-25%",
  },
  {
    id: 4,
    title: "Open World Explorer",
    image: OPEN_WORLD_IMAGE,
    price: "59,900",
    rating: 9.1,
    genre: "오픈월드",
    discount: undefined,
  },
  {
    id: 8,
    title: "Space Warriors",
    image: CYBER_NEXUS_IMAGE,
    price: "무료",
    rating: 9.4,
    genre: "슈팅",
    discount: undefined,
  },
  {
    id: 3,
    title: "Battle Royale Pro",
    image: BATTLE_ROYALE_IMAGE,
    price: "무료",
    rating: 9.2,
    genre: "배틀로얄",
    discount: undefined,
  },
]
