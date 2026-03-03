"use client";
import { GameHero } from "@/app/components/game/GameHero";
import { GameInfoCards } from "@/app/components/game/GameInfoCards";
import { GameDescription } from "@/app/components/game/GameDescription";
import { GameFeatures } from "@/app/components/game/GameFeatures";
import { GameScreenshots } from "@/app/components/game/GameScreenshots";
import { GameSidebar } from "@/app/components/game/GameSidebar";

// Mock game data
const gameDetails: Record<
  number,
  {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    price: string;
    rating: number;
    genre: string;
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
> = {
  1: {
    id: 1,
    title: "Cyber Nexus 2077",
    subtitle: "미래 도시에서 펼쳐지는 오픈 월드 액션 RPG",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
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
};

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = gameDetails[Number(id)] || gameDetails[1];

  return (
    <div className="min-h-screen bg-black pt-40">
      <div className="">
        <GameHero
          image={game.image}
          title={game.title}
          subtitle={game.subtitle}
          genre={game.genre}
          rating={game.rating}
        />

        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <GameInfoCards
                releaseDate={game.releaseDate}
                players={game.players}
                developer={game.developer}
              />
              <GameDescription description={game.description} />
              <GameFeatures features={game.features} />
              <GameScreenshots image={game.image} title={game.title} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <GameSidebar
                price={game.price}
                systemRequirements={game.systemRequirements}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
