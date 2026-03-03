import styles from "./GameDescription.module.scss";

interface GameDescriptionProps {
  description: string;
}

export function GameDescription({ description }: GameDescriptionProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>게임 소개</h2>
      <p className={styles.text}>{description}</p>
    </div>
  );
}
