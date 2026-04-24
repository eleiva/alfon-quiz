"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  questions,
  hardQuestions,
  shuffleArray,
  type Question,
  type Difficulty,
} from "@/app/data/questions";
import { useSound } from "@/app/hooks/useSound";

type Phase = "welcome" | "difficulty" | "game" | "results";

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

type LeaderboardEntry = {
  id: string;
  name: string;
  emoji: string;
  score: number;
  total: number;
  difficulty: Difficulty;
  pct: number;
  date: string;
};

const LS_KEY = "ecosistemas_leaderboard";

function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveEntry(entry: LeaderboardEntry): LeaderboardEntry[] {
  const current = loadLeaderboard();
  const updated = [entry, ...current].slice(0, 50);
  localStorage.setItem(LS_KEY, JSON.stringify(updated));
  return updated;
}

export default function TriviaGame() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [playerName, setPlayerName] = useState("");
  const [playerEmoji, setPlayerEmoji] = useState("🌱");
  const [nameError, setNameError] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [deck, setDeck] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [lbFilter, setLbFilter] = useState<"all" | "normal" | "hard">("all");
  const [savedEntry, setSavedEntry] = useState<LeaderboardEntry | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { playCorrect, playWrong } = useSound();

  useEffect(() => {
    setLeaderboard(loadLeaderboard());
  }, []);

  const handleNameSubmit = useCallback(() => {
    const trimmed = playerName.trim();
    if (!trimmed) {
      setNameError("Ingresá tu nombre para continuar.");
      nameInputRef.current?.focus();
      return;
    }
    setNameError("");
    setPhase("difficulty");
  }, [playerName]);

  const startGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    setDeck(shuffleArray(diff === "hard" ? hardQuestions : questions));
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
      setPhase("results");
    } else {
      setCurrent((c) => c + 1);
      setAnswered(false);
      setSelected(null);
    }
  }, [current, deck.length]);

  // Save to leaderboard when results screen mounts (only once)
  useEffect(() => {
    if (phase !== "results" || savedEntry) return;
    const total = deck.length;
    if (total === 0) return;
    const entry: LeaderboardEntry = {
      id: crypto.randomUUID(),
      name: playerName.trim() || "Anónimo",
      emoji: playerEmoji,
      score,
      total,
      difficulty,
      pct: Math.round((score / total) * 100),
      date: new Date().toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
      }),
    };
    setSavedEntry(entry);
    const updated = saveEntry(entry);
    setLeaderboard(updated);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── WELCOME ─────────────────────────────────────────────── */
  if (phase === "welcome") {
    const filtered =
      lbFilter === "all"
        ? leaderboard
        : leaderboard.filter((e) => e.difficulty === lbFilter);

    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.badge}>🌿 Ciencias Naturales</div>
          <h1 style={styles.h1}>
            Trivia de{" "}
            <span style={{ color: "var(--verde-claro)" }}>Ecosistemas</span>
          </h1>
          <p style={styles.subtitle}>20 preguntas · Normal o Difícil</p>
        </header>

        <div style={styles.welcomeGrid} className="welcome-grid-responsive">
          {/* ── LEFT: form + topics ── */}
          <div style={styles.welcomeLeft}>
            <div style={styles.card}>
              <div style={styles.cardTopBar} />
              <h2 style={styles.welcomeCardTitle}>¿Quién juega?</h2>
              <p style={styles.welcomeCardBody}>
                Ingresá tu nombre y elegí un emoji para aparecer en el marcador.
              </p>

              {/* Emoji picker */}
              <div style={styles.emojiGrid}>
                {EMOJI_OPTIONS.map((em) => (
                  <button
                    key={em}
                    style={{
                      ...styles.emojiBtn,
                      background:
                        playerEmoji === em
                          ? "rgba(82,183,136,0.2)"
                          : "transparent",
                      border:
                        playerEmoji === em
                          ? "2px solid var(--verde-claro)"
                          : "2px solid transparent",
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
              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <span style={styles.selectedEmoji}>{playerEmoji}</span>
                <div style={{ flex: 1 }}>
                  <input
                    ref={nameInputRef}
                    style={{
                      ...styles.nameInput,
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
                  {nameError && <p style={styles.nameError}>{nameError}</p>}
                </div>
              </div>

              <button
                style={styles.startBtn}
                onClick={handleNameSubmit}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 12px 32px rgba(82,183,136,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "none";
                }}
              >
                Continuar →
              </button>
            </div>

            {/* Topics chips */}
            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexWrap: "wrap",
                gap: 7,
              }}
            >
              {[
                "Productores",
                "Consumidores",
                "Descomponedores",
                "Cadenas alimentarias",
                "Redes tróficas",
                "Depredación",
                "Competencia",
                "Mutualismo",
                "Comensalismo",
                "Parasitismo",
                "Amensalismo",
                "Niveles de organización",
              ].map((t) => (
                <span key={t} style={styles.chip}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: leaderboard ── */}
          <div style={styles.welcomeRight}>
            <div style={styles.lbHeader}>
              <span style={styles.lbTitle}>🏆 Marcador</span>
              <div style={styles.lbTabs}>
                {(["all", "normal", "hard"] as const).map((f) => (
                  <button
                    key={f}
                    style={{
                      ...styles.lbTab,
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
                      ? "Todo"
                      : f === "normal"
                        ? "🌱 Normal"
                        : "🔥 Difícil"}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div style={styles.lbEmpty}>
                <span style={{ fontSize: 32 }}>🌿</span>
                <p style={{ color: "var(--gris)", fontSize: 13, marginTop: 8 }}>
                  Todavía no hay resultados.
                  <br />
                  ¡Sé el primero en jugar!
                </p>
              </div>
            ) : (
              <div style={styles.lbList} className="lb-list-scroll">
                {filtered.map((entry, idx) => (
                  <div
                    key={entry.id}
                    className="lb-row-hover"
                    style={{
                      ...styles.lbRow,
                      background:
                        idx === 0 ? "rgba(244,197,66,0.06)" : "transparent",
                      borderColor:
                        idx === 0
                          ? "rgba(244,197,66,0.2)"
                          : "rgba(82,183,136,0.08)",
                    }}
                  >
                    <span style={styles.lbRank}>
                      {idx === 0
                        ? "🥇"
                        : idx === 1
                          ? "🥈"
                          : idx === 2
                            ? "🥉"
                            : `${idx + 1}`}
                    </span>
                    <span style={styles.lbEmoji}>{entry.emoji}</span>
                    <span style={styles.lbName}>{entry.name}</span>
                    <span
                      style={{
                        ...styles.lbDiffBadge,
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
                    <span style={styles.lbScore}>
                      {entry.score}/{entry.total}
                    </span>
                    <span
                      style={{
                        ...styles.lbPct,
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
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── DIFFICULTY SELECTION ────────────────────────────────── */
  if (phase === "difficulty") {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.badge}>🌿 Ciencias Naturales</div>
          <h1 style={styles.h1}>
            {playerEmoji}{" "}
            <span style={{ color: "var(--verde-claro)" }}>
              {playerName.trim() || "Jugador"}
            </span>
            , ¿qué nivel?
          </h1>
          <p style={styles.subtitle}>Elegí la dificultad para empezar</p>
        </header>

        <div style={styles.difficultyGrid}>
          {/* Normal card */}
          <button
            style={styles.diffCard}
            onClick={() => startGame("normal")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--verde-claro)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-4px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 12px 32px rgba(82,183,136,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(82,183,136,0.2)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            <span style={styles.diffEmoji}>🌱</span>
            <span style={styles.diffLabel}>Normal</span>
            <span style={styles.diffPill}>Intermedio</span>
            <p style={styles.diffDesc}>
              20 preguntas de comprensión y reconocimiento de conceptos clave
              sobre ecosistemas y relaciones biológicas.
            </p>
            <div style={styles.diffMeta}>
              <span style={styles.diffMetaItem}>📋 20 preguntas</span>
              <span style={styles.diffMetaItem}>⏱ ~10 min</span>
            </div>
          </button>

          {/* Hard card */}
          <button
            style={{ ...styles.diffCard, borderColor: "rgba(244,197,66,0.25)" }}
            onClick={() => startGame("hard")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--dorado)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-4px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 12px 32px rgba(244,197,66,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(244,197,66,0.25)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            <span style={styles.diffEmoji}>🔥</span>
            <span style={{ ...styles.diffLabel, color: "var(--dorado)" }}>
              Difícil
            </span>
            <span
              style={{
                ...styles.diffPill,
                background: "rgba(244,197,66,0.12)",
                color: "var(--dorado)",
                border: "1px solid rgba(244,197,66,0.25)",
              }}
            >
              Avanzado
            </span>
            <p style={styles.diffDesc}>
              20 preguntas de análisis, comparación y aplicación. Requiere
              razonar con los conceptos, no solo recordarlos.
            </p>
            <div style={styles.diffMeta}>
              <span style={styles.diffMetaItem}>📋 20 preguntas</span>
              <span style={styles.diffMetaItem}>🧠 Análisis profundo</span>
            </div>
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button style={styles.backBtn} onClick={() => setPhase("welcome")}>
            ← Cambiar nombre
          </button>
        </div>
      </div>
    );
  }

  /* ── RESULTS ─────────────────────────────────────────────── */
  if (phase === "results") {
    const total = deck.length;
    const pct = Math.round((score / total) * 100);
    let emoji: string, title: string, msg: string;
    if (pct === 100) {
      emoji = "🏆";
      title = "¡Perfecto!";
      msg =
        "Dominás todos los conceptos del capítulo. Ecosistemas, relaciones biológicas, cadenas tróficas... todo claro. ¡Excelente trabajo!";
    } else if (pct >= 80) {
      emoji = "🌿";
      title = "¡Muy bien!";
      msg =
        "Tenés un sólido dominio del tema. Revisá las preguntas que te salieron mal para cerrar los detalles que te faltaron.";
    } else if (pct >= 60) {
      emoji = "📚";
      title = "Bien, pero podés mejorar";
      msg =
        "Conocés las bases, pero algunos conceptos necesitan repaso. Prestá atención a los tipos de relaciones interespecíficas y los niveles de organización.";
    } else if (pct >= 40) {
      emoji = "🔍";
      title = "Hay que repasar";
      msg =
        "Te falta afianzar varios conceptos. Volvé a leer el capítulo prestando especial atención a productores, consumidores y los tipos de relaciones.";
    } else {
      emoji = "💡";
      title = "¡A estudiar!";
      msg =
        "Todavía hay mucho por aprender. No te desanimes: volvé al texto y cuando lo tengas más fresco, intentalo de nuevo.";
    }

    // rank of this entry in the full leaderboard
    const rank = savedEntry
      ? leaderboard
          .filter((e) => e.difficulty === difficulty)
          .sort((a, b) => b.pct - a.pct)
          .findIndex((e) => e.id === savedEntry.id) + 1
      : null;

    return (
      <div style={styles.container}>
        <div style={styles.results}>
          <span style={{ fontSize: 72 }}>{emoji}</span>
          <div style={{ fontSize: 28, marginTop: 4 }}>
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
          <div style={styles.resultsTitle}>{title}</div>
          <div style={styles.resultsScore}>
            {score}/{total}
          </div>
          <div style={styles.resultsSub}>
            respuestas correctas de {total} · {pct}%
          </div>

          {rank !== null && rank > 0 && (
            <div style={styles.rankBadge}>
              {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "🎯"}{" "}
              Posición #{rank} en el marcador{" "}
              {difficulty === "hard" ? "🔥 Difícil" : "🌱 Normal"}
            </div>
          )}

          <div style={styles.resultsMessage}>{msg}</div>

          <div style={styles.resultsActions}>
            <button
              style={styles.restartBtn}
              onClick={() => setPhase("difficulty")}
            >
              🔄 Elegir nivel
            </button>
            <button
              style={styles.restartBtnSecondary}
              onClick={() => startGame(difficulty)}
            >
              ↺ Repetir {difficulty === "hard" ? "Difícil" : "Normal"}
            </button>
            <button style={styles.backBtn} onClick={() => setPhase("welcome")}>
              🏠 Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── GAME ─────────────────────────────────────────────────── */
  const q = deck[current];
  const total = deck.length;
  const progressPct = (current / total) * 100;
  const isCorrect = selected !== null && selected === q.correct;

  return (
    <div style={styles.container}>
      <header style={{ ...styles.header, paddingBottom: 16 }}>
        <div style={styles.badge}>🌿 Ciencias Naturales</div>
        <h1 style={{ ...styles.h1, fontSize: "clamp(20px, 4vw, 32px)" }}>
          Trivia de{" "}
          <span style={{ color: "var(--verde-claro)" }}>Ecosistemas</span>
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 8,
          }}
        >
          <span style={{ fontSize: 18 }}>{playerEmoji}</span>
          <span style={{ color: "var(--gris)", fontSize: 13 }}>
            {playerName.trim() || "Jugador"}
          </span>
          <span
            style={{
              padding: "3px 10px",
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
              letterSpacing: 1,
              background:
                difficulty === "hard"
                  ? "rgba(244,197,66,0.12)"
                  : "rgba(82,183,136,0.1)",
              color:
                difficulty === "hard" ? "var(--dorado)" : "var(--verde-claro)",
              border: `1px solid ${difficulty === "hard" ? "rgba(244,197,66,0.3)" : "rgba(82,183,136,0.2)"}`,
            }}
          >
            {difficulty === "hard" ? "🔥 Difícil" : "🌱 Normal"}
          </span>
        </div>
      </header>

      {/* Score row */}
      <div style={styles.scoreRow}>
        <div style={styles.scorePill}>
          ✅ <span>Correctas:</span>{" "}
          <span style={{ ...styles.scoreNum, color: "var(--verde-claro)" }}>
            {score}
          </span>
        </div>
        <div style={styles.scorePill}>
          ❌ <span>Errores:</span>{" "}
          <span style={{ ...styles.scoreNum, color: "var(--rojo)" }}>
            {wrong}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={styles.progressWrap}>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progressPct}%` }} />
        </div>
        <span style={styles.progressText}>
          {current} / {total}
        </span>
      </div>

      {/* Question card */}
      <div key={current} style={styles.card} className="animate-slideIn">
        <div style={styles.cardTopBar} />
        <div style={styles.categoryTag}>{q.category}</div>
        <div style={styles.qNum}>
          Pregunta {current + 1} de {total}
        </div>
        <div style={styles.qText}>{q.question}</div>

        {/* Options */}
        <div style={styles.options}>
          {q.options.map((opt, i) => {
            let optStyle = { ...styles.optionBtn };
            let letterStyle = { ...styles.optionLetter };

            if (answered) {
              if (i === q.correct) {
                optStyle = {
                  ...optStyle,
                  borderColor: "var(--verde-claro)",
                  background: "rgba(82,183,136,0.15)",
                };
                letterStyle = {
                  ...letterStyle,
                  background: "var(--verde-claro)",
                  color: "var(--fondo)",
                };
              } else if (i === selected && i !== q.correct) {
                optStyle = {
                  ...optStyle,
                  borderColor: "var(--rojo)",
                  background: "rgba(224,82,82,0.1)",
                };
                letterStyle = {
                  ...letterStyle,
                  background: "var(--rojo)",
                  color: "white",
                };
              }
            }

            return (
              <button
                key={i}
                style={optStyle}
                disabled={answered}
                onClick={() => selectOption(i)}
                onMouseEnter={(e) => {
                  if (!answered) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "var(--verde-claro)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(82,183,136,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!answered) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(82,183,136,0.15)";
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--superficie)";
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateX(0)";
                  }
                }}
              >
                <span style={letterStyle}>{LETTERS[i]}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div
            key={feedbackKey}
            style={isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}
            className="animate-fadeUp"
          >
            <strong style={{ display: "block", marginBottom: 4, fontSize: 13 }}>
              {isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto."}
            </strong>
            {q.explanation}
          </div>
        )}

        {/* Next button */}
        {answered && (
          <button
            style={styles.nextBtn}
            onClick={nextQuestion}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 8px 24px rgba(82,183,136,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            {current + 1 >= total ? "Ver resultados →" : "Siguiente pregunta →"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── STYLES ─────────────────────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "24px 16px 60px",
    position: "relative",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    padding: "40px 0 32px",
  },
  badge: {
    display: "inline-block",
    background: "var(--verde-claro)",
    color: "var(--fondo)",
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: "uppercase",
    padding: "6px 16px",
    borderRadius: 100,
    marginBottom: 20,
  },
  h1: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: "clamp(24px, 5vw, 40px)",
    fontWeight: 900,
    lineHeight: 1.1,
    color: "#fff",
    marginBottom: 12,
  },
  subtitle: {
    color: "var(--gris)",
    fontSize: 15,
    fontWeight: 300,
  },

  /* Welcome two-column layout */
  welcomeGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
    gap: 20,
    alignItems: "start",
  },
  welcomeLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  welcomeRight: {
    background: "var(--card)",
    border: "1px solid rgba(82,183,136,0.15)",
    borderRadius: 20,
    overflow: "hidden",
  },

  /* Form */
  emojiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gap: 4,
    marginTop: 14,
  },
  emojiBtn: {
    fontSize: 20,
    padding: 5,
    borderRadius: 8,
    cursor: "pointer",
    lineHeight: 1,
    transition: "all 0.15s ease",
  },
  selectedEmoji: {
    fontSize: 32,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  nameInput: {
    width: "100%",
    background: "var(--superficie)",
    border: "1.5px solid rgba(82,183,136,0.25)",
    borderRadius: 12,
    padding: "12px 16px",
    fontSize: 15,
    color: "var(--texto)",
    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  nameError: {
    color: "var(--rojo)",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 2,
  },

  /* Leaderboard */
  lbHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 18px 12px",
    borderBottom: "1px solid rgba(82,183,136,0.1)",
  },
  lbTitle: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "var(--texto)",
  },
  lbTabs: {
    display: "flex",
    gap: 4,
  },
  lbTab: {
    fontSize: 10,
    fontWeight: 700,
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    padding: "4px 8px",
    borderRadius: 8,
    border: "1px solid transparent",
    cursor: "pointer",
    letterSpacing: 0.5,
    transition: "all 0.15s",
  },
  lbEmpty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    textAlign: "center",
  },
  lbList: {
    display: "flex",
    flexDirection: "column",
    maxHeight: 420,
    overflowY: "auto",
    padding: "8px 0",
  },
  lbRow: {
    display: "grid",
    gridTemplateColumns: "28px 24px 1fr 22px auto auto",
    alignItems: "center",
    gap: 8,
    padding: "8px 18px",
    borderBottom: "1px solid rgba(82,183,136,0.06)",
    transition: "background 0.15s",
  },
  lbRank: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: "var(--gris)",
    textAlign: "center",
  },
  lbEmoji: {
    fontSize: 16,
    textAlign: "center",
  },
  lbName: {
    fontSize: 13,
    color: "var(--texto)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  lbDiffBadge: {
    fontSize: 12,
    borderRadius: 6,
    padding: "2px 4px",
    textAlign: "center",
  },
  lbScore: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 11,
    color: "var(--gris)",
    whiteSpace: "nowrap",
  },
  lbPct: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 12,
    fontWeight: 700,
    whiteSpace: "nowrap",
    textAlign: "right",
  },

  /* chips */
  chip: {
    background: "rgba(82,183,136,0.1)",
    border: "1px solid rgba(82,183,136,0.2)",
    borderRadius: 100,
    padding: "5px 12px",
    fontSize: 11,
    color: "var(--verde-claro)",
  },

  /* Difficulty selection */
  difficultyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
    marginBottom: 24,
  },
  diffCard: {
    background: "var(--card)",
    border: "1px solid rgba(82,183,136,0.2)",
    borderRadius: 20,
    padding: "32px 24px",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    color: "var(--texto)",
  },
  diffEmoji: {
    fontSize: 40,
    lineHeight: 1,
    marginBottom: 4,
  },
  diffLabel: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 22,
    fontWeight: 900,
    color: "var(--verde-claro)",
    lineHeight: 1,
  },
  diffPill: {
    display: "inline-block",
    background: "rgba(82,183,136,0.1)",
    color: "var(--verde-claro)",
    border: "1px solid rgba(82,183,136,0.2)",
    borderRadius: 100,
    padding: "4px 12px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    textTransform: "uppercase" as const,
    alignSelf: "flex-start",
  },
  diffDesc: {
    color: "var(--gris)",
    fontSize: 14,
    lineHeight: 1.6,
    marginTop: 4,
  },
  diffMeta: {
    display: "flex",
    gap: 12,
    marginTop: 8,
    flexWrap: "wrap" as const,
  },
  diffMetaItem: {
    fontSize: 12,
    color: "var(--gris)",
    background: "rgba(143,168,154,0.08)",
    padding: "4px 10px",
    borderRadius: 8,
  },

  /* Game */
  scoreRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  scorePill: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "var(--card)",
    border: "1px solid rgba(82,183,136,0.2)",
    padding: "8px 16px",
    borderRadius: 100,
    fontSize: 13,
    color: "var(--texto)",
  },
  scoreNum: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 16,
    fontWeight: 700,
  },
  progressWrap: {
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  progressBar: {
    flex: 1,
    height: 6,
    background: "var(--card)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, var(--verde), var(--verde-claro))",
    borderRadius: 3,
    transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
  },
  progressText: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 12,
    fontWeight: 700,
    color: "var(--verde-claro)",
    whiteSpace: "nowrap",
  },
  card: {
    background: "var(--card)",
    border: "1px solid rgba(82,183,136,0.15)",
    borderRadius: 20,
    padding: "32px 28px 28px",
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
    maxWidth: 760,
    margin: "0 auto 20px",
  },
  cardTopBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background:
      "linear-gradient(90deg, var(--verde), var(--verde-claro), var(--dorado))",
  },
  categoryTag: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "var(--verde-claro)",
    marginBottom: 14,
  },
  qNum: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: "var(--gris)",
    marginBottom: 12,
  },
  qText: {
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.5,
    color: "#fff",
    marginBottom: 28,
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  optionBtn: {
    background: "var(--superficie)",
    border: "1.5px solid rgba(82,183,136,0.15)",
    borderRadius: 14,
    padding: "16px 20px",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
    fontSize: 15,
    color: "var(--texto)",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 14,
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
  optionLetter: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 11,
    fontWeight: 700,
    color: "var(--verde-claro)",
    background: "rgba(82,183,136,0.1)",
    width: 28,
    height: 28,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s",
  },
  feedbackCorrect: {
    marginTop: 20,
    padding: "16px 20px",
    borderRadius: 14,
    fontSize: 14,
    lineHeight: 1.5,
    background: "rgba(82,183,136,0.12)",
    border: "1px solid rgba(82,183,136,0.3)",
    color: "var(--verde-menta)",
  },
  feedbackWrong: {
    marginTop: 20,
    padding: "16px 20px",
    borderRadius: 14,
    fontSize: 14,
    lineHeight: 1.5,
    background: "rgba(224,82,82,0.1)",
    border: "1px solid rgba(224,82,82,0.25)",
    color: "#ffb3b3",
  },
  nextBtn: {
    display: "block",
    width: "100%",
    marginTop: 16,
    padding: 18,
    background: "linear-gradient(135deg, var(--verde), var(--verde-claro))",
    border: "none",
    borderRadius: 14,
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    letterSpacing: "0.5px",
    transition: "all 0.2s ease",
  },

  /* Results */
  results: {
    textAlign: "center",
    padding: "60px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    animation: "slideIn 0.5s ease",
    maxWidth: 560,
    margin: "0 auto",
  },
  resultsTitle: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 26,
    fontWeight: 900,
    color: "#fff",
    marginTop: 4,
  },
  resultsScore: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 64,
    fontWeight: 900,
    color: "var(--verde-claro)",
    lineHeight: 1,
    margin: "8px 0",
  },
  resultsSub: {
    color: "var(--gris)",
    fontSize: 14,
    marginBottom: 4,
  },
  rankBadge: {
    background: "rgba(244,197,66,0.1)",
    border: "1px solid rgba(244,197,66,0.25)",
    borderRadius: 12,
    padding: "10px 20px",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--dorado)",
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
  },
  resultsMessage: {
    background: "var(--card)",
    border: "1px solid rgba(82,183,136,0.2)",
    borderRadius: 16,
    padding: "20px 24px",
    fontSize: 15,
    lineHeight: 1.6,
    color: "var(--texto)",
    marginBottom: 8,
    textAlign: "left",
    width: "100%",
  },
  resultsActions: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  restartBtn: {
    padding: "16px 24px",
    background: "var(--verde-claro)",
    border: "none",
    borderRadius: 14,
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "var(--fondo)",
    cursor: "pointer",
    transition: "all 0.2s",
    width: "100%",
  },
  restartBtnSecondary: {
    padding: "14px 24px",
    background: "var(--card)",
    border: "1px solid rgba(82,183,136,0.3)",
    borderRadius: 14,
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "var(--verde-claro)",
    cursor: "pointer",
    transition: "all 0.2s",
    width: "100%",
  },
  startBtn: {
    marginTop: 20,
    width: "100%",
    padding: "16px 24px",
    background: "linear-gradient(135deg, var(--verde), var(--verde-claro))",
    border: "none",
    borderRadius: 14,
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.5px",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    color: "var(--gris)",
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    padding: "8px 16px",
    letterSpacing: 0.5,
    transition: "color 0.2s",
    width: "100%",
    textAlign: "center",
  },

  /* welcome card reuse */
  welcomeCardTitle: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: "var(--verde-claro)",
    marginBottom: 8,
  },
  welcomeCardBody: {
    color: "var(--gris)",
    fontSize: 13,
    lineHeight: 1.6,
  },
};
