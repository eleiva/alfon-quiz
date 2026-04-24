import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const sql = neon(process.env.DATABASE_URL);

export type LeaderboardRow = {
  id: string;
  name: string;
  emoji: string;
  score: number;
  total: number;
  difficulty: "normal" | "hard";
  pct: number;
  created_at: string;
};
