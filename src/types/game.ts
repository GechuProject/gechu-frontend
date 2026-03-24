// 게임 카드에 사용되는 공통 타입 (mock 데이터 의존 없음)
export interface GameCardItem {
  id: number;
  title: string;
  image: string;
  price: string;
  rating: number;
  genre: string;
  discount?: string;
  is_saved?: boolean;
}
