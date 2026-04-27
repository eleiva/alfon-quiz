"use client";

import { type Quiz } from "@/app/data/quizzes";
import { type Difficulty } from "@/app/data/questions";

export type LeaderboardEntry = {
  id: string;
  name: string;
  emoji: string;
  score: number;
  total: number;
  difficulty: Difficulty;
  pct: number;
  quiz_id: string;
  created_at: string;
};

type Props = {
  playerName: string;
  playerEmoji: string;
  quizzes: Quiz[];
  leaderboard: LeaderboardEntry[];
  lbLoading: boolean;
  lbFilter: "all" | "normal" | "hard";
  onFilterChange: (f: "all" | "normal" | "hard") => void;
  onRefreshLb: () => void;
  onSelectQuiz: (quizId: string, difficulty: Difficulty) => void;
  onChangeName: () => void;
  onStartPersonalityTest: () => void;
};

function resolveColor(cssVar: string): string {
  // Map CSS variable names to actual hex values so inline styles work correctly
  const map: Record<string, string> = {
    "var(--verde-claro)": "#52b788",
    "var(--verde)": "#2d6a4f",
    "var(--dorado)": "#f4c542",
    "var(--azul)": "#3b82f6",
    "var(--azul-claro)": "#60a5fa",
    "var(--azul-oscuro)": "#1e3a5f",
    "var(--violeta)": "#8b5cf6",
    "var(--violeta-claro)": "#a78bfa",
    "var(--naranja)": "#f97316",
    "var(--rojo)": "#e05252",
  };
  return map[cssVar] ?? cssVar;
}

function hexToRgba(hex: string, alpha: number): string {
  // Handles both 3-char and 6-char hex values
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function quizColorHex(color: string): string {
  return resolveColor(color);
}

export default function QuizCatalog({
  playerName,
  playerEmoji,
  quizzes,
  leaderboard,
  lbLoading,
  lbFilter,
  onFilterChange,
  onRefreshLb,
  onSelectQuiz,
  onChangeName,
  onStartPersonalityTest,
}: Props) {
  const filtered =
    lbFilter === "all"
      ? leaderboard
      : leaderboard.filter((e) => e.difficulty === lbFilter);

  // Map quiz_id → quiz emoji + title for leaderboard rows
  const quizMap = Object.fromEntries(quizzes.map((q) => [q.id, q]));

  const lbContent = () => {
    if (lbLoading) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            gap: 10,
          }}
        >
          <div className="lb-spinner" />
          <p style={{ color: "var(--gris)", fontSize: 12 }}>Cargando...</p>
        </div>
      );
    }

    if (filtered.length === 0) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: 28 }}>🌿</span>
          <p style={{ color: "var(--gris)", fontSize: 12, marginTop: 8 }}>
            Todavía no hay resultados.
            <br />
            ¡Sé el primero en jugar!
          </p>
        </div>
      );
    }

    return (
      <div
        className="lb-list-scroll"
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: 400,
          overflowY: "auto",
          padding: "6px 0",
        }}
      >
        {filtered.map((entry, idx) => {
          const quiz = quizMap[entry.quiz_id];
          return (
            <div
              key={entry.id}
              className="lb-row lb-row-hover"
              style={{
                background: idx === 0 ? "rgba(244,197,66,0.06)" : "transparent",
                borderColor:
                  idx === 0 ? "rgba(244,197,66,0.2)" : "rgba(82,183,136,0.08)",
              }}
            >
              {/* Rank */}
              <span
                style={{
                  fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--gris)",
                  textAlign: "center",
                }}
              >
                {idx === 0
                  ? "🥇"
                  : idx === 1
                    ? "🥈"
                    : idx === 2
                      ? "🥉"
                      : `${idx + 1}`}
              </span>

              {/* Player emoji */}
              <span style={{ fontSize: 15, textAlign: "center" }}>
                {entry.emoji}
              </span>

              {/* Player name */}
              <span
                style={{
                  fontSize: 12,
                  color: "var(--texto)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {entry.name}
              </span>

              {/* Quiz badge */}
              {quiz && (
                <span
                  style={{
                    fontSize: 10,
                    borderRadius: 6,
                    padding: "2px 5px",
                    background: hexToRgba(quizColorHex(quiz.color), 0.12),
                    color: quiz.color,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 80,
                  }}
                  title={quiz.title}
                >
                  {quiz.emoji} {quiz.subject}
                </span>
              )}

              {/* Difficulty */}
              <span
                style={{
                  fontSize: 11,
                  borderRadius: 6,
                  padding: "2px 3px",
                  textAlign: "center",
                  background:
                    entry.difficulty === "hard"
                      ? "rgba(244,197,66,0.1)"
                      : "rgba(82,183,136,0.08)",
                  color:
                    entry.difficulty === "hard"
                      ? "var(--dorado)"
                      : "var(--verde-claro)",
                }}
              >
                {entry.difficulty === "hard" ? "🔥" : "🌱"}
              </span>

              {/* Score fraction */}
              <span
                style={{
                  fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  fontSize: 10,
                  color: "var(--gris)",
                  whiteSpace: "nowrap",
                }}
              >
                {entry.score}/{entry.total}
              </span>

              {/* Pct */}
              <span
                style={{
                  fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  textAlign: "right",
                  color:
                    entry.pct >= 80
                      ? "var(--verde-claro)"
                      : entry.pct >= 50
                        ? "var(--dorado)"
                        : "var(--rojo)",
                }}
              >
                {entry.pct}%
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="trivia-container">
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="trivia-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div>
            <div className="trivia-badge">🎮 Elige tu trivia</div>
            <h1 className="trivia-h1">
              {playerEmoji}{" "}
              <span style={{ color: "var(--verde-claro)" }}>
                {playerName.trim() || "Jugador"}
              </span>
              , elegí una trivia
            </h1>
          </div>
          <button
            className="back-btn"
            style={{ flexShrink: 0 }}
            onClick={onChangeName}
          >
            ← Cambiar nombre
          </button>
        </div>
      </header>

      {/* ── Quiz cards grid ───────────────────────────────────── */}
      <div className="quiz-catalog-grid">
        {/* ── Featured: Personality Test card ───────────────────── */}
        <div
          style={{
            gridColumn: "1 / -1",
            background: "var(--card)",
            border: "1px solid rgba(139,92,246,0.35)",
            borderRadius: 18,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* Violet gradient accent bar */}
          <div
            style={{
              height: 4,
              background:
                "linear-gradient(90deg, var(--violeta), var(--violeta-claro), var(--naranja))",
            }}
          />

          <div style={{ padding: "20px 20px 18px" }}>
            {/* NUEVO badge */}
            <div
              className="trivia-badge"
              style={{
                background: "rgba(139,92,246,0.12)",
                color: "var(--violeta)",
                borderColor: "rgba(139,92,246,0.3)",
                marginBottom: 12,
                display: "inline-flex",
              }}
            >
              ⭐ NUEVO
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              {/* Big emoji */}
              <div style={{ fontSize: 48, lineHeight: 1, flexShrink: 0 }}>
                🧠
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--violeta)",
                    marginBottom: 4,
                    lineHeight: 1.3,
                  }}
                >
                  Test: ¿Cuál es tu Genio Tech?
                </h2>

                {/* Subtitle */}
                <p
                  style={{
                    color: "var(--gris)",
                    fontSize: 12,
                    lineHeight: 1.5,
                    marginBottom: 12,
                  }}
                >
                  Descubrí si tu estilo es Creativo, Racional, Lógico o
                  Innovador
                </p>

                {/* Profile preview chips */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 16,
                  }}
                >
                  {[
                    "🎨 Creativo",
                    "📊 Racional",
                    "🧩 Lógico",
                    "🚀 Innovador",
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="topic-chip"
                      style={{
                        background: "rgba(139,92,246,0.08)",
                        color: "var(--violeta)",
                        borderColor: "rgba(139,92,246,0.22)",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                {/* CTA button */}
                <button
                  onClick={onStartPersonalityTest}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 50,
                    border: "none",
                    background:
                      "linear-gradient(90deg, var(--violeta), var(--violeta-claro))",
                    color: "#fff",
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "opacity 0.18s, transform 0.12s",
                    lineHeight: 1,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity =
                      "0.88";
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "scale(1)";
                  }}
                >
                  🧠 Empezar el test →
                </button>

                {/* Note */}
                <p
                  style={{
                    color: "var(--gris)",
                    fontSize: 11,
                    marginTop: 8,
                    textAlign: "center",
                  }}
                >
                  Sin ranking · Se puede compartir por WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Featured: Desafío Educativo card ─────────────────── */}
        <div
          style={{
            gridColumn: "1 / -1",
            background: "var(--card)",
            border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 4,
              background:
                "linear-gradient(90deg, var(--azul), var(--azul-claro), var(--verde-claro))",
            }}
          />
          <div style={{ padding: "20px 20px 18px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(59,130,246,0.1)",
                color: "var(--azul)",
                border: "1px solid rgba(59,130,246,0.25)",
                borderRadius: 100,
                padding: "5px 13px",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase" as const,
                fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                marginBottom: 12,
              }}
            >
              🎓 PARA EL PROFE
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ fontSize: 44, lineHeight: 1, flexShrink: 0 }}>
                🎨
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2
                  style={{
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--azul-claro)",
                    marginBottom: 4,
                    lineHeight: 1.3,
                  }}
                >
                  Diseñadores sin pantalla
                </h2>
                <p
                  style={{
                    color: "var(--gris)",
                    fontSize: 12,
                    lineHeight: 1.5,
                    marginBottom: 12,
                  }}
                >
                  Actividad colaborativa: 7 equipos diseñan apps sin
                  computadora. Cronómetro, roles, desafíos y puntajes para
                  gestionar la clase.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap" as const,
                    gap: 6,
                    marginBottom: 16,
                  }}
                >
                  {[
                    "⏱ Cronómetro por fases",
                    "👥 7 equipos sorteados",
                    "🎯 8 desafíos",
                    "🏆 Tabla de puntajes",
                  ].map((chip) => (
                    <span
                      key={chip}
                      style={{
                        background: "rgba(59,130,246,0.08)",
                        color: "var(--azul-claro)",
                        border: "1px solid rgba(59,130,246,0.2)",
                        borderRadius: 100,
                        padding: "4px 10px",
                        fontSize: 10,
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <a
                  href="/desafio"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 50,
                    border: "none",
                    background:
                      "linear-gradient(90deg, var(--azul), var(--azul-claro))",
                    color: "#fff",
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    textDecoration: "none",
                    textAlign: "center" as const,
                    boxSizing: "border-box" as const,
                    lineHeight: "1.4",
                  }}
                >
                  🎨 Abrir herramienta docente →
                </a>
                <p
                  style={{
                    color: "var(--gris)",
                    fontSize: 10,
                    textAlign: "center" as const,
                    marginTop: 8,
                  }}
                >
                  Se abre en esta misma pestaña · No requiere login
                </p>
              </div>
            </div>
          </div>
        </div>

        {quizzes.map((quiz) => {
          const colorHex = quizColorHex(quiz.color);
          const accentHex = quizColorHex(quiz.accentColor);
          return (
            <div
              key={quiz.id}
              style={{
                background: "var(--card)",
                border: `1px solid ${hexToRgba(colorHex, 0.3)}`,
                borderRadius: 18,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {/* Color accent bar */}
              <div
                style={{
                  height: 4,
                  background: `linear-gradient(90deg, ${colorHex}, ${accentHex})`,
                }}
              />

              <div style={{ padding: "18px 18px 16px" }}>
                {/* Subject badge */}
                <div
                  className="trivia-badge"
                  style={{
                    background: hexToRgba(colorHex, 0.12),
                    color: quiz.color,
                    borderColor: hexToRgba(colorHex, 0.25),
                    marginBottom: 10,
                    display: "inline-flex",
                  }}
                >
                  {quiz.emoji} {quiz.subject}
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--texto)",
                    marginBottom: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {quiz.title}
                </h2>

                {/* Subtitle */}
                <p
                  style={{
                    color: "var(--gris)",
                    fontSize: 12,
                    lineHeight: 1.5,
                    marginBottom: 12,
                  }}
                >
                  {quiz.subtitle}
                </p>

                {/* Topics */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 5,
                    marginBottom: 16,
                  }}
                >
                  {quiz.topics.map((topic) => (
                    <span
                      key={topic}
                      className="topic-chip"
                      style={{
                        background: hexToRgba(colorHex, 0.08),
                        color: quiz.color,
                        borderColor: hexToRgba(colorHex, 0.2),
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => onSelectQuiz(quiz.id, "normal")}
                    style={{
                      flex: 1,
                      padding: "10px 8px",
                      borderRadius: 50,
                      border: `1.5px solid ${hexToRgba(colorHex, 0.5)}`,
                      background: hexToRgba(colorHex, 0.13),
                      color: quiz.color,
                      fontFamily:
                        "var(--font-unbounded), Unbounded, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "background 0.18s, transform 0.12s",
                      lineHeight: 1,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        hexToRgba(colorHex, 0.25);
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        hexToRgba(colorHex, 0.13);
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(1)";
                    }}
                  >
                    🌱 Normal
                  </button>
                  <button
                    onClick={() => onSelectQuiz(quiz.id, "hard")}
                    disabled={quiz.hard.length === 0}
                    style={{
                      flex: 1,
                      padding: "10px 8px",
                      borderRadius: 50,
                      border: "1.5px solid rgba(244,197,66,0.45)",
                      background: "rgba(244,197,66,0.1)",
                      color: "var(--dorado)",
                      fontFamily:
                        "var(--font-unbounded), Unbounded, sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor:
                        quiz.hard.length === 0 ? "not-allowed" : "pointer",
                      opacity: quiz.hard.length === 0 ? 0.4 : 1,
                      transition: "background 0.18s, transform 0.12s",
                      lineHeight: 1,
                    }}
                    onMouseEnter={(e) => {
                      if (quiz.hard.length === 0) return;
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(244,197,66,0.22)";
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(244,197,66,0.1)";
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(1)";
                    }}
                  >
                    🔥 Difícil
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Leaderboard panel ─────────────────────────────────── */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid rgba(82,183,136,0.15)",
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <div className="lb-header">
          <span className="lb-title">🏆 Marcador Global</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="lb-tabs">
              {(["all", "normal", "hard"] as const).map((f) => (
                <button
                  key={f}
                  className="lb-tab"
                  style={{
                    background:
                      lbFilter === f
                        ? f === "hard"
                          ? "rgba(244,197,66,0.15)"
                          : "rgba(82,183,136,0.15)"
                        : "transparent",
                    color:
                      lbFilter === f
                        ? f === "hard"
                          ? "var(--dorado)"
                          : "var(--verde-claro)"
                        : "var(--gris)",
                    borderColor:
                      lbFilter === f
                        ? f === "hard"
                          ? "rgba(244,197,66,0.4)"
                          : "rgba(82,183,136,0.4)"
                        : "transparent",
                  }}
                  onClick={() => onFilterChange(f)}
                >
                  {f === "all" ? "Todo" : f === "normal" ? "🌱" : "🔥"}
                </button>
              ))}
            </div>
            <button
              onClick={onRefreshLb}
              disabled={lbLoading}
              title="Actualizar"
              style={{
                background: "transparent",
                border: "none",
                cursor: lbLoading ? "default" : "pointer",
                fontSize: 13,
                lineHeight: 1,
                opacity: lbLoading ? 0.4 : 0.7,
                padding: "2px 4px",
                transition: "opacity 0.2s",
              }}
            >
              🔄
            </button>
          </div>
        </div>

        {lbContent()}
      </div>
    </div>
  );
}
