"use client";

import { GameCard } from "@/app/components/common/GameCard";
import { motion } from "motion/react";
import { TrendingUp, Clock, Sparkles } from "lucide-react";

const top5Games = [
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.5,
    genre: "액션",
    discount: undefined,
  },
  {
    id: 2,
    title: "Fantasy Realm",
    image:
      "https://images.unsplash.com/photo-1759688168277-185a0c623968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwUlBHJTIwZ2FtZSUyMGFydHxlbnwxfHx8fDE3NzE4Mjg4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "37,425",
    rating: 9.3,
    genre: "RPG",
    discount: "-25%",
  },
  {
    id: 3,
    title: "Battle Royale Pro",
    image:
      "https://images.unsplash.com/photo-1764011643213-1f3b3691f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4MDAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.2,
    genre: "배틀로얄",
    discount: undefined,
  },
  {
    id: 4,
    title: "Open World Explorer",
    image:
      "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "59,900",
    rating: 9.1,
    genre: "오픈월드",
    discount: undefined,
  },
  {
    id: 5,
    title: "Dark Shadows",
    image:
      "https://images.unsplash.com/photo-1723388159368-53b9be8899e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzdXJ2aXZhbCUyMGdhbWV8ZW58MXx8fHwxNzcxNzE1OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "44,900",
    rating: 9.0,
    genre: "호러",
    discount: "-20%",
  },
];

const recentGames = [
  {
    id: 6,
    title: "Speed Racer X",
    image:
      "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTgxNzc2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "17,940",
    rating: 8.8,
    genre: "레이싱",
    discount: "-40%",
  },
  {
    id: 7,
    title: "Mystery Island",
    image:
      "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "29,900",
    rating: 8.9,
    genre: "어드벤처",
    discount: undefined,
  },
  {
    id: 8,
    title: "Space Warriors",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.4,
    genre: "슈팅",
    discount: undefined,
  },
  {
    id: 1,
    title: "Cyber Nexus 2077",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "39,900",
    rating: 9.2,
    genre: "액션 RPG",
    discount: "-33%",
  },
];

const aiPickGames = [
  {
    id: 2,
    title: "Fantasy Realm",
    image:
      "https://images.unsplash.com/photo-1759688168277-185a0c623968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwUlBHJTIwZ2FtZSUyMGFydHxlbnwxfHx8fDE3NzE4Mjg4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "37,425",
    rating: 9.3,
    genre: "RPG",
    discount: "-25%",
  },
  {
    id: 4,
    title: "Open World Explorer",
    image:
      "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "59,900",
    rating: 9.1,
    genre: "오픈월드",
    discount: undefined,
  },
  {
    id: 8,
    title: "Space Warriors",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.4,
    genre: "슈팅",
    discount: undefined,
  },
  {
    id: 3,
    title: "Battle Royale Pro",
    image:
      "https://images.unsplash.com/photo-1764011643213-1f3b3691f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4MDAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.2,
    genre: "배틀로얄",
    discount: undefined,
  },
];

const sections = [
  {
    id: "trending",
    icon: TrendingUp,
    title: "인기 급상승",
    description: "지금 가장 많이 플레이되는 게임",
    games: top5Games,
    accent: "from-[#E4FF30]/20 to-transparent",
  },
  {
    id: "recent",
    icon: Clock,
    title: "최근 출시",
    description: "새롭게 출시된 따끈한 게임들",
    games: recentGames,
    accent: "from-blue-500/20 to-transparent",
  },
  {
    id: "aiPick",
    icon: Sparkles,
    title: "AI 추천",
    description: "당신의 취향에 맞는 게임",
    games: aiPickGames,
    accent: "from-purple-500/20 to-transparent",
  },
];

export default function RecommendPage() {
  return (
    <div className="min-h-screen bg-black pt-40">
      <div className="mx-auto max-w-[1400px] px-6 pb-20">
        <div className="py-16 text-center">
          <motion.h1
            className="mb-4 text-6xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            게임 <span className="text-[#E4FF30]">추천</span>
          </motion.h1>
          <motion.p
            className="text-xl text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            취향에 맞는 게임을 발견하세요
          </motion.p>
        </div>

        {sections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <section key={section.id} className="mb-20">
              <motion.div
                className="mb-8 flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-lg bg-linear-to-r ${section.accent} p-3`}
                  >
                    <Icon className="h-6 w-6 text-[#E4FF30]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {section.title}
                    </h2>
                    <p className="text-white/50">{section.description}</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {section.games.map((game, index) => (
                  <GameCard
                    key={`${section.id}-${game.id}`}
                    game={game}
                    index={index}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
