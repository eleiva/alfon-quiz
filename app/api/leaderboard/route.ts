import { NextRequest, NextResponse } from "next/server";
import { sql, type LeaderboardRow } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get("quiz_id");

    const rows = quizId
      ? ((await sql`
          SELECT id, name, emoji, score, total, difficulty, pct, quiz_id,
                 to_char(created_at AT TIME ZONE 'America/Argentina/Buenos_Aires', 'DD/MM') AS created_at
          FROM leaderboard
          WHERE quiz_id = ${quizId}
          ORDER BY pct DESC, score DESC, created_at DESC
          LIMIT 50
        `) as LeaderboardRow[])
      : ((await sql`
          SELECT id, name, emoji, score, total, difficulty, pct, quiz_id,
                 to_char(created_at AT TIME ZONE 'America/Argentina/Buenos_Aires', 'DD/MM') AS created_at
          FROM leaderboard
          ORDER BY pct DESC, score DESC, created_at DESC
          LIMIT 50
        `) as LeaderboardRow[]);

    return NextResponse.json(rows);
  } catch (err) {
    console.error("[leaderboard GET]", err);
    return NextResponse.json(
      { error: "Error al obtener el marcador" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, emoji, score, total, difficulty, pct, quiz_id } = body;

    if (
      typeof name !== "string" ||
      typeof emoji !== "string" ||
      typeof score !== "number" ||
      typeof total !== "number" ||
      typeof pct !== "number" ||
      typeof quiz_id !== "string" ||
      (difficulty !== "normal" && difficulty !== "hard")
    ) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const safeName = name.trim().slice(0, 20) || "Anónimo";
    const safeEmoji = emoji.slice(0, 8);
    const safeQuizId = quiz_id.slice(0, 50);

    const rows = (await sql`
      INSERT INTO leaderboard (name, emoji, score, total, difficulty, pct, quiz_id)
      VALUES (${safeName}, ${safeEmoji}, ${score}, ${total}, ${difficulty}, ${pct}, ${safeQuizId})
      RETURNING id, name, emoji, score, total, difficulty, pct, quiz_id,
                to_char(created_at AT TIME ZONE 'America/Argentina/Buenos_Aires', 'DD/MM') AS created_at
    `) as LeaderboardRow[];

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    console.error("[leaderboard POST]", err);
    return NextResponse.json(
      { error: "Error al guardar el resultado" },
      { status: 500 },
    );
  }
}
