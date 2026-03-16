import styles from "./GameSidebar.module.scss";

interface SystemRequirements {
  minimum: string;
  recommended: string;
}

interface GameSidebarProps {
  systemRequirements: SystemRequirements;
  stores: { name: string; url: string }[];
  esrbRating: string;
}

export function GameSidebar({
  systemRequirements,
  stores,
  esrbRating,
}: GameSidebarProps) {
  const hasRequirements =
    systemRequirements.minimum || systemRequirements.recommended;

  return (
    <div className={styles.sidebar}>
      {/* 연령 등급 */}
      {esrbRating && (
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 className={styles.heading}>연령 등급</h3>
          <p style={{ color: "#ccc", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            {esrbRating}
          </p>
        </div>
      )}

      {/* 시스템 요구사항 */}
      {hasRequirements && (
        <>
          <h3 className={styles.heading}>시스템 요구사항</h3>
          <div className={styles.specs}>
            {systemRequirements.minimum && (
              <div className={styles.specItem}>
                <p className={styles.specLabel}>최소 사양</p>
                <p
                  className={styles.specValue}
                  style={{ whiteSpace: "pre-line", fontSize: "0.8rem" }}
                >
                  {systemRequirements.minimum}
                </p>
              </div>
            )}
            {systemRequirements.recommended && (
              <div className={styles.specItem}>
                <p className={styles.specLabel}>권장 사양</p>
                <p
                  className={styles.specValue}
                  style={{ whiteSpace: "pre-line", fontSize: "0.8rem" }}
                >
                  {systemRequirements.recommended}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* 구매처 */}
      {stores.length > 0 && (
        <div className={styles.divider}>
          <h3 className={styles.heading} style={{ marginBottom: "0.75rem" }}>
            구매처
          </h3>
          {stores.map((store) => (
            <a
              key={store.name}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                color: "#E4FF30",
                textDecoration: "none",
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
              }}
            >
              🛒 {store.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
