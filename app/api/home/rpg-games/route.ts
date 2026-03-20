import { NextResponse } from "next/server";

// 이 라우트는 더 이상 사용되지 않습니다.
// 홈 게임 목록은 fetchRpgGames() → 백엔드 /api/v1/games/ 직접 호출로 대체됩니다.
export async function GET() {
  return NextResponse.json(
    { message: "This route is deprecated. Use /api/v1/games/ directly." },
    { status: 410 }
  );
}
