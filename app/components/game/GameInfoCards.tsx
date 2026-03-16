import { Calendar, Monitor, Clock } from "lucide-react";
import { Icon3D } from "@/app/components/common/Icon3D";
import styles from "./GameInfoCards.module.scss";

interface GameInfoCardsProps {
  releaseDate: string;
  playtime: number;
  platforms: string[];
}

export function GameInfoCards({
  releaseDate,
  playtime,
  platforms,
}: GameInfoCardsProps) {
  const cards = [
    { icon: Calendar, label: "출시일", value: releaseDate || "미정" },
    {
      icon: Clock,
      label: "평균 플레이타임",
      value: playtime ? `약 ${playtime}시간` : "정보 없음",
    },
    {
      icon: Monitor,
      label: "플랫폼",
      value: platforms.length > 0 ? platforms.join(", ") : "정보 없음",
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map(({ icon: Icon, label, value }) => (
        <div key={label} className={styles.card}>
          <Icon3D className={styles.iconWrap}>
            <Icon
              style={{ width: "1.5rem", height: "1.5rem", color: "#E4FF30" }}
            />
          </Icon3D>
          <p className={styles.label}>{label}</p>
          <p className={styles.value}>{value}</p>
        </div>
      ))}
    </div>
  );
}
