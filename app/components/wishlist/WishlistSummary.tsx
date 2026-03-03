import styles from "./WishlistSummary.module.scss";

interface WishlistSummaryProps {
  totalCount: number;
  discountCount: number;
}

export function WishlistSummary({ totalCount, discountCount }: WishlistSummaryProps) {
  return (
    <div className={styles.summary}>
      <p className={styles.total}>총 {totalCount}개 게임</p>
      <p className={styles.discount}>할인 중인 게임: {discountCount}개</p>
    </div>
  );
}
