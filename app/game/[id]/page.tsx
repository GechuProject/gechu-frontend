"use client";

import { Navigation } from "@/app/components/Navigation";
import { motion } from "motion/react";
import {
  Play,
  Heart,
  Share2,
  Star,
  Calendar,
  Users,
  Trophy,
  ChevronRight,
} from "lucide-react";

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

// 3D Icon Component
function Icon3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        filter: "drop-shadow(0 4px 8px rgba(228, 255, 48, 0.3))",
        transform: "perspective(1000px) rotateX(10deg)",
      }}
    >
      {children}
    </div>
  );
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = gameDetails[Number(id)] || gameDetails[1];

  return (
    <div className="min-h-screen bg-black pt-40">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative h-[500px] overflow-hidden">
          <motion.img
            src={game.image}
            alt={game.title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-6 pb-12">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded bg-[#E4FF30] px-3 py-1 text-sm font-bold text-black">
                    {game.genre}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-[#E4FF30] text-[#E4FF30]" />
                    <span className="font-bold text-white">{game.rating}</span>
                  </div>
                </div>

                <h1 className="mb-3 text-6xl font-bold text-white">
                  {game.title}
                </h1>
                <p className="mb-6 text-xl text-white/80">{game.subtitle}</p>

                <div className="flex gap-4">
                  <motion.button
                    className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-6 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-6 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1400px] px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Game Info Cards */}
              <div className="mb-12 grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <Icon3D className="mb-3">
                    <Calendar className="h-6 w-6 text-[#E4FF30]" />
                  </Icon3D>
                  <p className="mb-1 text-sm text-white/50">출시일</p>
                  <p className="font-bold text-white">{game.releaseDate}</p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <Icon3D className="mb-3">
                    <Users className="h-6 w-6 text-[#E4FF30]" />
                  </Icon3D>
                  <p className="mb-1 text-sm text-white/50">플레이어</p>
                  <p className="font-bold text-white">{game.players}</p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <Icon3D className="mb-3">
                    <Trophy className="h-6 w-6 text-[#E4FF30]" />
                  </Icon3D>
                  <p className="mb-1 text-sm text-white/50">개발사</p>
                  <p className="font-bold text-white">{game.developer}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h2 className="mb-6 text-3xl font-bold text-white">
                  게임 소개
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-white/70">
                  {game.description}
                </p>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h2 className="mb-6 text-3xl font-bold text-white">
                  주요 특징
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {game.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ChevronRight className="h-5 w-5 text-[#E4FF30]" />
                      <span className="text-white">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Screenshots */}
              <div>
                <h2 className="mb-6 text-3xl font-bold text-white">스크린샷</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="aspect-video overflow-hidden rounded-lg border border-white/10 bg-white/5"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={game.image}
                        alt={`Screenshot ${i}`}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* System Requirements */}
              <div className="sticky top-24 rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="mb-6 text-2xl font-bold text-white">
                  시스템 요구사항
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-sm text-white/50">운영체제</p>
                    <p className="text-white">{game.systemRequirements.os}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-white/50">프로세서</p>
                    <p className="text-white">
                      {game.systemRequirements.processor}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-white/50">메모리</p>
                    <p className="text-white">
                      {game.systemRequirements.memory}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-white/50">그래픽</p>
                    <p className="text-white">
                      {game.systemRequirements.graphics}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-white/50">저장공간</p>
                    <p className="text-white">
                      {game.systemRequirements.storage}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">가격</span>
                    <span className="text-2xl font-bold text-[#E4FF30]">
                      {game.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
