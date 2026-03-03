import styles from "./GameSidebar.module.scss";

interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

interface GameSidebarProps {
  price: string;
  systemRequirements: SystemRequirements;
}

export function GameSidebar({ price, systemRequirements }: GameSidebarProps) {
  const specs = [
    { label: "운영체제", value: systemRequirements.os },
    { label: "프로세서", value: systemRequirements.processor },
    { label: "메모리", value: systemRequirements.memory },
    { label: "그래픽", value: systemRequirements.graphics },
    { label: "저장공간", value: systemRequirements.storage },
  ];

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.heading}>시스템 요구사항</h3>

      <div className={styles.specs}>
        {specs.map(({ label, value }) => (
          <div key={label} className={styles.specItem}>
            <p className={styles.specLabel}>{label}</p>
            <p className={styles.specValue}>{value}</p>
          </div>
        ))}
      </div>

      <div className={styles.divider}>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>가격</span>
          <span className={styles.priceValue}>{price}</span>
        </div>
      </div>
    </div>
  );
}
