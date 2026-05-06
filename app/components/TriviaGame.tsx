"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  shuffleArray,
  type Question,
  type Difficulty,
} from "@/app/data/questions";
import { quizzes, getQuizById } from "@/app/data/quizzes";
import { useSound } from "@/app/hooks/useSound";
import QuizCatalog from "@/app/components/QuizCatalog";
import FillSection from "@/app/components/FillSection";
import { type LeaderboardEntry } from "@/app/components/QuizCatalog";
import PersonalityTest from "@/app/components/PersonalityTest";
import { shareResultWhatsApp } from "@/app/components/PersonalityTest";
import SqlBlock, { parseQuestionSegments } from "@/app/components/SqlBlock";
import SchemaTable from "@/app/components/SchemaTable";

export type { LeaderboardEntry };

type Phase =
  | "welcome"
  | "catalog"
  | "game"
  | "fill"
  | "results"
  | "personality";

const LETTERS = ["A", "B", "C", "D"];

const EMOJI_OPTIONS = [
  "🦁",
  "🐯",
  "🦊",
  "🐺",
  "🦝",
  "🦉",
  "🦅",
  "🐊",
  "🦎",
  "🐢",
  "🐸",
  "🦋",
  "🐝",
  "🌿",
  "🌱",
  "🍀",
  "🌻",
  "🌊",
  "🔥",
  "⚡",
];

export default function TriviaGame() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [playerName, setPlayerName] = useState("");
  const [playerEmoji, setPlayerEmoji] = useState("🌱");
  const [nameError, setNameError] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [selectedQuizId, setSelectedQuizId] = useState<string>("ecosistemas");
  const [deck, setDeck] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [lbLoading, setLbLoading] = useState(true);
  const [lbError, setLbError] = useState(false);
  const [lbFilter, setLbFilter] = useState<"all" | "normal" | "hard">("all");
  const [lbQuizFilter, setLbQuizFilter] = useState<string>("all");
  const [savedEntry, setSavedEntry] = useState<LeaderboardEntry | null>(null);
  const [saving, setSaving] = useState(false);
  const [fillScore, setFillScore] = useState(0);
  const [fillTotal, setFillTotal] = useState(0);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { playCorrect, playWrong } = useSound();

  const fetchLeaderboard = useCallback(async () => {
    setLbLoading(true);
    setLbError(false);
    try {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) throw new Error("fetch failed");
      const data: LeaderboardEntry[] = await res.json();
      setLeaderboard(data);
    } catch {
      setLbError(true);
    } finally {
      setLbLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const handleNameSubmit = useCallback(() => {
    const trimmed = playerName.trim();
    if (!trimmed) {
      setNameError("Ingresá tu nombre para continuar.");
      nameInputRef.current?.focus();
      return;
    }
    setNameError("");
    setPhase("catalog");
  }, [playerName]);

  const startGame = useCallback((quizId: string, diff: Difficulty) => {
    const quiz = getQuizById(quizId);
    if (!quiz) return;
    setSelectedQuizId(quizId);
    setDifficulty(diff);
    const pool = diff === "hard" ? quiz.hard : quiz.normal;
    setDeck(shuffleArray(pool.length > 0 ? pool : quiz.normal));
    setCurrent(0);
    setScore(0);
    setWrong(0);
    setAnswered(false);
    setSelected(null);
    setSavedEntry(null);
    setPhase("game");
  }, []);

  const selectOption = useCallback(
    (index: number) => {
      if (answered) return;
      setAnswered(true);
      setSelected(index);
      setFeedbackKey((k) => k + 1);
      if (index === deck[current].correct) {
        setScore((s) => s + 1);
        playCorrect();
      } else {
        setWrong((w) => w + 1);
        playWrong();
      }
    },
    [answered, deck, current, playCorrect, playWrong],
  );

  const nextQuestion = useCallback(() => {
    if (current + 1 >= deck.length) {
      const quiz = getQuizById(selectedQuizId);
      if (
        quiz?.hasFill &&
        quiz.fillQuestions &&
        quiz.fillQuestions.length > 0
      ) {
        setPhase("fill");
      } else {
        setPhase("results");
      }
    } else {
      setCurrent((c) => c + 1);
      setAnswered(false);
      setSelected(null);
    }
  }, [current, deck.length, selectedQuizId]);

  // Save to DB when results screen mounts (only once per game)
  useEffect(() => {
    if (phase !== "results" || savedEntry || saving) return;
    const totalTotal = deck.length + fillTotal;
    if (totalTotal === 0) return;

    const totalScore = score + fillScore;
    const pct = Math.round((totalScore / totalTotal) * 100);
    setSaving(true);

    fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: playerName.trim() || "Anónimo",
        emoji: playerEmoji,
        score: totalScore,
        total: totalTotal,
        difficulty,
        pct,
        quiz_id: selectedQuizId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("save failed");
        return res.json() as Promise<LeaderboardEntry>;
      })
      .then((saved) => {
        setSavedEntry(saved);
        setLeaderboard((prev) =>
          [saved, ...prev]
            .sort((a, b) => b.pct - a.pct || b.score - a.score)
            .slice(0, 50),
        );
      })
      .catch(() => {
        // Non-blocking — result still shows even if save fails
      })
      .finally(() => setSaving(false));
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── WELCOME ─────────────────────────────────────────────── */
  if (phase === "welcome") {
    const quizMap = Object.fromEntries(quizzes.map((q) => [q.id, q]));

    const filtered = leaderboard.filter((e) => {
      const diffOk = lbFilter === "all" || e.difficulty === lbFilter;
      const quizOk = lbQuizFilter === "all" || e.quiz_id === lbQuizFilter;
      return diffOk && quizOk;
    });

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
      if (lbError) {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px 20px",
              textAlign: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 28 }}>⚠️</span>
            <p style={{ color: "var(--gris)", fontSize: 12 }}>
              No se pudo cargar el marcador.
            </p>
            <button
              className="back-btn"
              style={{ width: "auto", padding: "6px 14px", fontSize: 11 }}
              onClick={fetchLeaderboard}
            >
              Reintentar
            </button>
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
          {filtered.map((entry, idx) => (
            <div
              key={entry.id}
              className="lb-row lb-row-hover"
              style={{
                background: idx === 0 ? "rgba(244,197,66,0.06)" : "transparent",
                borderColor:
                  idx === 0 ? "rgba(244,197,66,0.2)" : "rgba(82,183,136,0.08)",
              }}
            >
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
              <span style={{ fontSize: 15, textAlign: "center" }}>
                {entry.emoji}
              </span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  overflow: "hidden",
                  minWidth: 0,
                }}
              >
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
                {(() => {
                  const quiz = quizMap[entry.quiz_id];
                  if (!quiz) return null;
                  return (
                    <span
                      style={{
                        fontSize: 9,
                        color: quiz.color,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        opacity: 0.85,
                      }}
                    >
                      {quiz.emoji} {quiz.title}
                    </span>
                  );
                })()}
              </div>
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
          ))}
        </div>
      );
    };

    return (
      <div className="trivia-container">
        <header className="trivia-header">
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: 56, height: 56, marginBottom: 8 }}
          />
          <h1 className="trivia-h1">
            Trivia{" "}
            <span style={{ color: "var(--verde-claro)" }}>Educativa</span>
          </h1>
          <p style={{ color: "var(--gris)", fontSize: 14, fontWeight: 300 }}>
            Varios temas · Normal o Difícil
          </p>
        </header>

        <div
          className="welcome-grid-responsive"
          style={{ display: "grid", gap: 16, alignItems: "start" }}
        >
          {/* ── LEFT: form ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div className="welcome-card">
              <div className="card-top-bar" />
              <h2
                style={{
                  fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "var(--verde-claro)",
                  marginBottom: 6,
                }}
              >
                ¿Quién juega?
              </h2>
              <p
                style={{ color: "var(--gris)", fontSize: 13, lineHeight: 1.6 }}
              >
                Ingresá tu nombre y elegí un emoji para aparecer en el marcador.
              </p>

              {/* Emoji picker */}
              <div className="emoji-grid">
                {EMOJI_OPTIONS.map((em) => (
                  <button
                    key={em}
                    className="emoji-btn"
                    style={{
                      background:
                        playerEmoji === em
                          ? "rgba(82,183,136,0.2)"
                          : "transparent",
                      borderColor:
                        playerEmoji === em
                          ? "var(--verde-claro)"
                          : "transparent",
                      transform:
                        playerEmoji === em ? "scale(1.15)" : "scale(1)",
                    }}
                    onClick={() => setPlayerEmoji(em)}
                    type="button"
                    aria-label={`Elegir emoji ${em}`}
                  >
                    {em}
                  </button>
                ))}
              </div>

              {/* Name input */}
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <span className="selected-emoji-preview">{playerEmoji}</span>
                <div style={{ flex: 1 }}>
                  <input
                    ref={nameInputRef}
                    className="name-input"
                    style={{
                      borderColor: nameError
                        ? "var(--rojo)"
                        : "rgba(82,183,136,0.25)",
                    }}
                    type="text"
                    placeholder="Tu nombre..."
                    value={playerName}
                    maxLength={20}
                    onChange={(e) => {
                      setPlayerName(e.target.value);
                      if (nameError) setNameError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleNameSubmit();
                    }}
                  />
                  {nameError && (
                    <p
                      style={{
                        color: "var(--rojo)",
                        fontSize: 12,
                        marginTop: 5,
                        marginLeft: 2,
                      }}
                    >
                      {nameError}
                    </p>
                  )}
                </div>
              </div>

              <button className="start-btn" onClick={handleNameSubmit}>
                Continuar →
              </button>
            </div>
          </div>

          {/* ── RIGHT: leaderboard ── */}
          <div
            style={{
              background: "var(--card)",
              border: "1px solid rgba(82,183,136,0.15)",
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid rgba(82,183,136,0.1)",
                padding: "12px 14px 10px",
              }}
            >
              {/* Row 1: title + refresh */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span className="lb-title">🏆 Marcador</span>
                <button
                  onClick={fetchLeaderboard}
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

              {/* Row 2: quiz filter tabs */}
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap",
                  marginBottom: 8,
                }}
              >
                {[
                  { id: "all", label: "Todas" },
                  ...quizzes.map((q) => ({
                    id: q.id,
                    label: `${q.emoji} ${q.title.replace("Trivia de ", "").replace("Tecnología ", "Tech ")}`,
                    color: q.color,
                  })),
                ].map((f) => (
                  <button
                    key={f.id}
                    className="lb-tab"
                    style={{
                      background:
                        lbQuizFilter === f.id
                          ? "rgba(82,183,136,0.15)"
                          : "transparent",
                      color:
                        lbQuizFilter === f.id
                          ? "color" in f && f.color
                            ? f.color
                            : "var(--verde-claro)"
                          : "var(--gris)",
                      borderColor:
                        lbQuizFilter === f.id
                          ? "color" in f && f.color
                            ? f.color
                            : "rgba(82,183,136,0.4)"
                          : "transparent",
                    }}
                    onClick={() => setLbQuizFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Row 3: difficulty filter tabs */}
              <div style={{ display: "flex", gap: 4 }}>
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
                    onClick={() => setLbFilter(f)}
                  >
                    {f === "all"
                      ? "Dificultad"
                      : f === "normal"
                        ? "🌱 Normal"
                        : "🔥 Difícil"}
                  </button>
                ))}
              </div>
            </div>

            {lbContent()}
          </div>
        </div>
      </div>
    );
  }

  /* ── CATALOG ─────────────────────────────────────────────── */
  if (phase === "catalog") {
    return (
      <QuizCatalog
        playerName={playerName}
        playerEmoji={playerEmoji}
        quizzes={quizzes}
        leaderboard={leaderboard}
        lbLoading={lbLoading}
        lbFilter={lbFilter}
        onFilterChange={setLbFilter}
        onRefreshLb={fetchLeaderboard}
        onSelectQuiz={(quizId, diff) => startGame(quizId, diff)}
        onChangeName={() => setPhase("welcome")}
        onStartPersonalityTest={() => setPhase("personality")}
      />
    );
  }

  /* ── PERSONALITY TEST ────────────────────────────────────── */
  if (phase === "personality") {
    return (
      <PersonalityTest
        playerName={playerName}
        playerEmoji={playerEmoji}
        onBack={() => setPhase("catalog")}
      />
    );
  }

  /* ── FILL SECTION ──────────────────────────────────────────── */
  if (phase === "fill") {
    const quiz = getQuizById(selectedQuizId);
    return (
      <FillSection
        questions={quiz?.fillQuestions ?? []}
        playerName={playerName}
        playerEmoji={playerEmoji}
        quizTitle={quiz?.title ?? ""}
        mcScore={score}
        mcTotal={deck.length}
        onComplete={(fs, ft) => {
          setFillScore(fs);
          setFillTotal(ft);
          setPhase("results");
        }}
        onBack={() => setPhase("catalog")}
      />
    );
  }

  /* ── RESULTS ─────────────────────────────────────────────── */
  if (phase === "results") {
    const totalScore = score + fillScore;
    const totalTotal = deck.length + fillTotal;
    const pct =
      totalTotal > 0 ? Math.round((totalScore / totalTotal) * 100) : 0;
    const activeQuiz = getQuizById(selectedQuizId);
    let emoji: string, title: string, msg: string;
    if (pct === 100) {
      emoji = "🏆";
      title = "¡Perfecto!";
      msg = "Dominás todos los conceptos del tema. ¡Excelente trabajo!";
    } else if (pct >= 80) {
      emoji = "🌿";
      title = "¡Muy bien!";
      msg =
        "Tenés un sólido dominio del tema. Revisá las preguntas que te salieron mal para cerrar los detalles que te faltaron.";
    } else if (pct >= 60) {
      emoji = "📚";
      title = "Bien, pero podés mejorar";
      msg = "Conocés las bases, pero algunos conceptos necesitan repaso.";
    } else if (pct >= 40) {
      emoji = "🔍";
      title = "Hay que repasar";
      msg =
        "Te falta afianzar varios conceptos. Volvé a estudiar el tema con más atención.";
    } else {
      emoji = "💡";
      title = "¡A estudiar!";
      msg =
        "Todavía hay mucho por aprender. No te desanimes: repasá el material e intentalo de nuevo.";
    }

    const rank = savedEntry
      ? leaderboard
          .filter(
            (e) => e.difficulty === difficulty && e.quiz_id === selectedQuizId,
          )
          .findIndex((e) => e.id === savedEntry.id) + 1
      : null;

    return (
      <div className="trivia-container">
        <div className="results-screen">
          <span style={{ fontSize: "clamp(52px,14vw,72px)" }}>{emoji}</span>
          <div style={{ fontSize: "clamp(22px,5vw,28px)", marginTop: 2 }}>
            {playerEmoji}{" "}
            <span
              style={{
                color: "var(--verde-claro)",
                fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                fontWeight: 900,
              }}
            >
              {playerName.trim() || "Jugador"}
            </span>
          </div>
          {activeQuiz && (
            <div
              style={{
                color: "var(--gris)",
                fontSize: 12,
                marginTop: 2,
              }}
            >
              {activeQuiz.emoji} {activeQuiz.title}
            </div>
          )}
          {saving && (
            <p style={{ color: "var(--gris)", fontSize: 11, marginTop: -4 }}>
              Guardando resultado...
            </p>
          )}
          <div className="results-title">{title}</div>
          {fillTotal > 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div className="score-pill">
                  🅰️ <span>Sección A:</span>{" "}
                  <span
                    className="score-num"
                    style={{ color: "var(--verde-claro)" }}
                  >
                    {score}/{deck.length}
                  </span>
                </div>
                <div className="score-pill">
                  🅱️ <span>Sección B:</span>{" "}
                  <span
                    className="score-num"
                    style={{ color: "var(--azul-claro)" }}
                  >
                    {fillScore}/{fillTotal}
                  </span>
                </div>
              </div>
              <div className="results-score">
                {totalScore}/{totalTotal}
              </div>
            </>
          ) : (
            <div className="results-score">
              {score}/{deck.length}
            </div>
          )}
          <div style={{ color: "var(--gris)", fontSize: 13, marginBottom: 2 }}>
            respuestas correctas de {totalTotal} · {pct}%
          </div>

          {rank !== null && rank > 0 && (
            <div className="rank-badge">
              {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "🎯"}{" "}
              Posición #{rank} en el marcador{" "}
              {difficulty === "hard" ? "🔥 Difícil" : "🌱 Normal"}
            </div>
          )}

          <div className="results-message">{msg}</div>

          <div className="results-actions">
            <button
              className="restart-btn"
              onClick={() => {
                fetchLeaderboard();
                setPhase("catalog");
              }}
            >
              🎮 Elegir trivia
            </button>
            <button
              className="restart-btn-secondary"
              onClick={() => startGame(selectedQuizId, difficulty)}
            >
              ↺ Repetir {difficulty === "hard" ? "Difícil" : "Normal"}
            </button>
            <button
              style={{
                padding: "13px 20px",
                background: "#25D366",
                border: "none",
                borderRadius: 13,
                fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onClick={() => {
                const quiz = getQuizById(selectedQuizId);
                shareResultWhatsApp(
                  playerName,
                  playerEmoji,
                  quiz?.title ?? "Trivia",
                  totalScore,
                  totalTotal,
                  pct,
                  difficulty,
                );
              }}
            >
              💬 Compartir por WhatsApp
            </button>
            <button
              className="back-btn"
              onClick={() => {
                fetchLeaderboard();
                setPhase("welcome");
              }}
            >
              🏠 Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── GAME ─────────────────────────────────────────────────── */
  const activeQuiz = getQuizById(selectedQuizId);
  const q = deck[current];
  const total = deck.length;
  const progressPct = (current / total) * 100;
  const isCorrect = selected !== null && selected === q.correct;

  return (
    <div className="trivia-container">
      <header className="game-header">
        {activeQuiz && (
          <div className="trivia-badge">
            {activeQuiz.emoji} {activeQuiz.subject}
          </div>
        )}
        <h1 className="game-h1">
          {activeQuiz ? (
            <>
              {activeQuiz.emoji}{" "}
              <span style={{ color: "var(--verde-claro)" }}>
                {activeQuiz.title}
              </span>
            </>
          ) : (
            <>
              Trivia{" "}
              <span style={{ color: "var(--verde-claro)" }}>Educativa</span>
            </>
          )}
        </h1>
        <div className="player-info-row">
          <span style={{ fontSize: 16 }}>{playerEmoji}</span>
          <span style={{ color: "var(--gris)", fontSize: 12 }}>
            {playerName.trim() || "Jugador"}
          </span>
          <span
            className="difficulty-pill"
            style={{
              background:
                difficulty === "hard"
                  ? "rgba(244,197,66,0.12)"
                  : "rgba(82,183,136,0.1)",
              color:
                difficulty === "hard" ? "var(--dorado)" : "var(--verde-claro)",
              border: `1px solid ${
                difficulty === "hard"
                  ? "rgba(244,197,66,0.3)"
                  : "rgba(82,183,136,0.2)"
              }`,
            }}
          >
            {difficulty === "hard" ? "🔥 Difícil" : "🌱 Normal"}
          </span>
        </div>
      </header>

      {/* Score row */}
      <div className="score-row">
        <div className="score-pill">
          ✅ <span>Correctas:</span>{" "}
          <span className="score-num" style={{ color: "var(--verde-claro)" }}>
            {score}
          </span>
        </div>
        <div className="score-pill">
          ❌ <span>Errores:</span>{" "}
          <span className="score-num" style={{ color: "var(--rojo)" }}>
            {wrong}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-wrap">
        <div
          style={{
            flex: 1,
            height: 6,
            background: "var(--card)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background:
                "linear-gradient(90deg, var(--verde), var(--verde-claro))",
              borderRadius: 3,
              transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
              width: `${progressPct}%`,
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--verde-claro)",
            whiteSpace: "nowrap",
          }}
        >
          {current} / {total}
        </span>
      </div>

      {/* Question card */}
      <div key={current} className="question-card animate-slideIn">
        <div className="card-top-bar" />
        <div className="category-tag">{q.category}</div>
        <div className="q-num">
          Pregunta {current + 1} de {total}
        </div>
        {/* Schema table diagram if present */}
        {q.diagram && (
          <SchemaTable
            tables={q.diagram}
            relations={q.diagramRelations}
            caption={q.diagramCaption}
          />
        )}

        {/* Question text — plain segments + SQL code blocks */}
        <div style={{ marginBottom: 20 }}>
          {parseQuestionSegments(q.question).map((seg, si) =>
            seg.type === "code" ? (
              <SqlBlock key={si} code={seg.content} />
            ) : (
              <p key={si} className="question-text" style={{ marginBottom: 6 }}>
                {seg.content}
              </p>
            ),
          )}
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options.map((opt, i) => {
            let extraClass = "";
            let letterExtra = "";

            if (answered) {
              if (i === q.correct) {
                extraClass = "correct";
                letterExtra = "correct";
              } else if (i === selected && i !== q.correct) {
                extraClass = "wrong";
                letterExtra = "wrong";
              }
            }

            // Detect SQL code blocks (contain newlines + SQL keywords)
            const isSqlBlock =
              opt.includes("\n") &&
              /SELECT|FROM|WHERE|JOIN|WITH|GROUP|HAVING|ORDER|BEGIN|CREATE|IF|END|ROLLBACK|COMMIT|UPDATE|INSERT/i.test(
                opt,
              );

            return (
              <button
                key={i}
                className={`option-btn${extraClass ? ` ${extraClass}` : ""}`}
                disabled={answered}
                onClick={() => selectOption(i)}
                style={
                  isSqlBlock
                    ? { alignItems: "flex-start", paddingBottom: 6 }
                    : undefined
                }
              >
                <span
                  className={`option-letter${letterExtra ? ` ${letterExtra}` : ""}`}
                  style={isSqlBlock ? { marginTop: 10 } : undefined}
                >
                  {LETTERS[i]}
                </span>
                {isSqlBlock ? (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <SqlBlock code={opt} style={{ margin: "4px 0 0" }} />
                  </div>
                ) : (
                  opt
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div
            key={feedbackKey}
            className={`feedback-box animate-fadeUp ${isCorrect ? "correct-fb" : "wrong-fb"}`}
          >
            <strong style={{ display: "block", marginBottom: 4, fontSize: 12 }}>
              {isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto."}
            </strong>
            {q.explanation}
          </div>
        )}

        {/* Next button */}
        {answered && (
          <button className="next-btn" onClick={nextQuestion}>
            {current + 1 >= total ? "Ver resultados →" : "Siguiente pregunta →"}
          </button>
        )}
      </div>
    </div>
  );
}
