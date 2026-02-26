"use client";

import { Navigation } from "@/app/components/Navigation";
import { GameCard } from "@/app/components/GameCard";
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
  },
  {
    id: 2,
    title: "Fantasy Realm",
    image:
      "https://images.unsplash.com/photo-1759688168277-185a0c623968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwUlBHJTIwZ2FtZSUyMGFydHxlbnwxfHx8fDE3NzE4Mjg4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩49,900",
    rating: 9.3,
    discount: "-25%",
    genre: "RPG",
  },
  {
    id: 3,
    title: "Battle Royale Pro",
    image:
      "https://images.unsplash.com/photo-1764011643213-1f3b3691f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4MDAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 9.2,
    genre: "슈팅",
  },
  {
    id: 4,
    title: "Open World Explorer",
    image:
      "https://images.unsplash.com/photo-1682384114890-f1caab8ab16c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwd29ybGQlMjBleHBsb3JhdGlvbiUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩59,900",
    rating: 9.1,
    genre: "오픈월드",
  },
  {
    id: 5,
    title: "Dark Shadows",
    image:
      "https://images.unsplash.com/photo-1723388159368-53b9be8899e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBzdXJ2aXZhbCUyMGdhbWV8ZW58MXx8fHwxNzcxNzE1OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩44,900",
    rating: 9.0,
    genre: "호러",
  },
];

const trendingGames = [
  {
    id: 11,
    title: "Speed Racer X",
    image:
      "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTgxNzc2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩29,900",
    rating: 8.8,
    discount: "-40%",
    genre: "레이싱",
  },
  {
    id: 12,
    title: "Galactic War",
    image:
      "https://images.unsplash.com/photo-1531812494838-636e337af5a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNob290ZXIlMjBnYW1lfGVufDF8fHx8MTc3MTc3Njg4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 8.7,
    genre: "슈팅",
  },
  {
    id: 13,
    title: "Kingdom Strategy",
    image:
      "https://images.unsplash.com/photo-1613626318906-68be0aef3334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHN0cmF0ZWd5JTIwZ2FtZXxlbnwxfHx8fDE3NzE4Mjg4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩49,900",
    rating: 8.5,
    discount: "-20%",
    genre: "전략",
  },
  {
    id: 14,
    title: "Fighter Champions",
    image:
      "https://images.unsplash.com/photo-1758521960348-90bc4203eb52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWdodGluZyUyMGNvbWJhdCUyMGdhbWV8ZW58MXx8fHwxNzcxODI4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩34,900",
    rating: 8.4,
    discount: "-30%",
    genre: "격투",
  },
  {
    id: 15,
    title: "Adventure Quest",
    image:
      "https://images.unsplash.com/photo-1758862493283-51f1e23b8883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBwbGF0Zm9ybWVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4Mjg4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "무료",
    rating: 8.3,
    genre: "어드벤처",
  },
];

const newGames = [
  {
    id: 16,
    title: "Epic Saga Chronicles",
    image:
      "https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBhY3Rpb24lMjBnYW1lfGVufDF8fHx8MTc3MTc5NzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩59,900",
    rating: 8.9,
    genre: "액션",
  },
  {
    id: 17,
    title: "Neon Streets",
    image:
      "https://images.unsplash.com/photo-1764011643213-1f3b3691f678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0bGUlMjByb3lhbGUlMjBzaG9vdGVyJTIwZ2FtZXxlbnwxfHx8fDE3NzE4MDAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩39,900",
    rating: 8.6,
    genre: "슈팅",
  },
  {
    id: 18,
    title: "Mystic Legends",
    image:
      "https://images.unsplash.com/photo-1759688168277-185a0c623968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwUlBHJTIwZ2FtZSUyMGFydHxlbnwxfHx8fDE3NzE4Mjg4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩49,900",
    rating: 8.5,
    genre: "RPG",
  },
  {
    id: 19,
    title: "Quantum Shift",
    image:
      "https://images.unsplash.com/photo-1531812494838-636e337af5a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNob290ZXIlMjBnYW1lfGVufDF8fHx8MTc3MTc3Njg4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩44,900",
    rating: 8.4,
    genre: "SF",
  },
  {
    id: 20,
    title: "Retro Racers",
    image:
      "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWNpbmclMjBjYXIlMjBnYW1lfGVufDF8fHx8MTc3MTgxNzc2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₩24,900",
    rating: 8.2,
    genre: "레이싱",
  },
];

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

// Section Title Component
function SectionTitle({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <Icon3D>
        <Icon className="h-8 w-8 text-[#E4FF30]" />
      </Icon3D>
      <h2 className="text-4xl font-bold text-white">{title}</h2>
    </div>
  );
}

// Section Navigation Button Component
function SectionButton({
  icon: Icon,
  label,
  targetId,
}: {
  icon: any;
  label: string;
  targetId: string;
}) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={scrollToSection}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 transition-all duration-300 hover:border-[#E4FF30] hover:bg-[#E4FF30]/10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="h-5 w-5 text-[#E4FF30]" />
      <span className="font-semibold text-white">{label}</span>
    </motion.button>
  );
}

export default function RecommendPage() {
  return (
    <div className="min-h-screen bg-black pt-40">
      <Navigation />

      <div className="mx-auto max-w-[1400px] px-6">
        {/* Hero Section */}
        <div className="py-16 text-center">
          <motion.h1
            className="mb-6 text-5xl font-bold text-white md:text-6xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            지금 가장 핫한 인기 게임
          </motion.h1>
          <motion.p
            className="mb-12 text-xl text-white/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            최고의 게임들을 한눈에 확인하세요
          </motion.p>

          {/* Section Navigation Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SectionButton icon={Sparkles} label="TOP 5" targetId="top5" />
            <SectionButton
              icon={TrendingUp}
              label="인기 급상승"
              targetId="trending"
            />
            <SectionButton
              icon={Clock}
              label="신규 출시"
              targetId="new-releases"
            />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mb-16 border-t border-white/10"></div>

        {/* TOP 5 Section */}
        <section id="top5" className="mb-20">
          <SectionTitle icon={Sparkles} title="TOP 5" />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {top5Games.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mb-16 border-t border-white/10"></div>

        {/* Trending Section */}
        <section id="trending" className="mb-20">
          <SectionTitle icon={TrendingUp} title="인기 급상승" />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {trendingGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mb-16 border-t border-white/10"></div>

        {/* New Releases Section */}
        <section id="new-releases" className="pb-20">
          <SectionTitle icon={Clock} title="신규 출시" />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {newGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
