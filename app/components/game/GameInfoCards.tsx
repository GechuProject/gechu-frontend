import { Calendar, Users, Trophy } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";

interface GameInfoCardsProps {
  releaseDate: string;
  players: string;
  developer: string;
}

export function GameInfoCards({
  releaseDate,
  players,
  developer,
}: GameInfoCardsProps) {
  const cards = [
    { icon: Calendar, label: "출시일", value: releaseDate },
    { icon: Users, label: "플레이어", value: players },
    { icon: Trophy, label: "개발사", value: developer },
  ];

  return (
    <div className="mb-12 grid grid-cols-3 gap-4">
      {cards.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="rounded-lg border border-white/10 bg-white/5 p-6"
        >
          <Icon3D className="mb-3">
            <Icon className="h-6 w-6 text-[#E4FF30]" />
          </Icon3D>
          <p className="mb-1 text-sm text-white/50">{label}</p>
          <p className="font-bold text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}
