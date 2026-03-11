import { NextResponse } from "next/server";
import { rpgGames } from "@/src/mocks/data/games";

export async function GET() {
  return NextResponse.json(rpgGames);
}
