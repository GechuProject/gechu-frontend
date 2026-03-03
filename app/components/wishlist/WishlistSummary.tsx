interface WishlistSummaryProps {
  totalCount: number;
  discountCount: number;
}

/** 위시리스트 하단 요약 카드 */
export function WishlistSummary({
  totalCount,
  discountCount,
}: WishlistSummaryProps) {
  return (
    <div className="mt-12 rounded-lg border border-white/10 bg-white/5 p-6">
      <div>
        <p className="mb-1 text-white/50">총 {totalCount}개 게임</p>
        <p className="text-sm text-white">할인 중인 게임: {discountCount}개</p>
      </div>
    </div>
  );
}
