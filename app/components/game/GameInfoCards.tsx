import { Calendar, Users, Trophy } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";
import styles from "./GameInfoCards.module.scss";

interface GameInfoCardsProps {
  releaseDate: string;
  players: string;
  developer: string;
}

export function GameInfoCards({ releaseDate, players, developer }: GameInfoCardsProps) {
  const cards = [
    { icon: Calendar, label: "출시일", value: releaseDate },
    { icon: Users, label: "플레이어", value: players },
    { icon: Trophy, label: "개발사", value: developer },
  ];

  return (
    <div className={styles.grid}>
      {cards.map(({ icon: Icon, label, value }) => (
        <div key={label} className={styles.card}>
          <Icon3D className={styles.iconWrap}>
            <Icon style={{ width: "1.5rem", height: "1.5rem", color: "#E4FF30" }} />
          </Icon3D>
          <p className={styles.label}>{label}</p>
          <p className={styles.value}>{value}</p>
        </div>
      ))}
    </div>
  );
}
