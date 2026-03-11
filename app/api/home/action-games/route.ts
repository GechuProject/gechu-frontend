import { NextResponse } from "next/server";
import { actionGames } from "@/src/mocks/data/games";

export async function GET() {
  return NextResponse.json(actionGames);
}
