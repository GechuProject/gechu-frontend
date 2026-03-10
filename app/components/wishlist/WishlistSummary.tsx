import styles from "./WishlistSummary.module.scss";

interface WishlistSummaryProps {
  totalCount: number;
}

export function WishlistSummary({ totalCount }: WishlistSummaryProps) {
  return (
    <div className={styles.summary}>
      <p className={styles.total}>총 {totalCount}개 게임</p>
    </div>
  );
}
