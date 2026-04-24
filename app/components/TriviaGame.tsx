"use client";

import { useState, useCallback } from "react";
import { questions, shuffleArray, type Question } from "@/app/data/questions";
import { useSound } from "@/app/hooks/useSound";

type Phase = "welcome" | "game" | "results";

const LETTERS = ["A", "B", "C", "D"];

export default function TriviaGame() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [deck, setDeck] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const { playCorrect, playWrong } = useSound();

  const startGame = useCallback(() => {
    setDeck(shuffleArray(questions));
    setCurrent(0);
    setScore(0);
    setWrong(0);
    setAnswered(false);
    setSelected(null);
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

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  /* ── WELCOME ─────────────────────────────────────────────── */
  if (phase === "welcome") {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.badge}>🌿 Ciencias Naturales</div>
          <h1 style={styles.h1}>
            Trivia de{" "}
            <span style={{ color: "var(--verde-claro)" }}>Ecosistemas</span>
          </h1>
          <p style={styles.subtitle}>20 preguntas · Nivel intermedio</p>
        </header>

        <div style={styles.welcomeCard}>
          <h2 style={styles.welcomeCardTitle}>¿Qué vas a estudiar?</h2>
          <p style={styles.welcomeCardBody}>
            Esta trivia cubre los contenidos del capítulo sobre ecosistemas y
            relaciones biológicas. Vas a necesitar recordar bien cada concepto.
          </p>
          <div style={styles.topics}>
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

        <div style={{ textAlign: "center" }}>
          <button style={styles.startBtn} onClick={startGame}>
            Empezar trivia →
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

    return (
      <div style={styles.container}>
        <div style={styles.results}>
          <span style={{ fontSize: 72 }}>{emoji}</span>
          <div style={styles.resultsTitle}>{title}</div>
          <div style={styles.resultsScore}>
            {score}/{total}
          </div>
          <div style={styles.resultsSub}>respuestas correctas de {total}</div>
          <div style={styles.resultsMessage}>{msg}</div>
          <button style={styles.restartBtn} onClick={restartGame}>
            🔄 Jugar de nuevo
          </button>
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
      <header style={styles.header}>
        <div style={styles.badge}>🌿 Ciencias Naturales</div>
        <h1 style={styles.h1}>
          Trivia de{" "}
          <span style={{ color: "var(--verde-claro)" }}>Ecosistemas</span>
        </h1>
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
          <div
            style={{
              ...styles.progressFill,
              width: `${progressPct}%`,
            }}
          />
        </div>
        <span style={styles.progressText}>
          {current} / {total}
        </span>
      </div>

      {/* Question card */}
      <div key={current} style={styles.card} className="animate-slideIn">
        {/* top gradient bar */}
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

/* ── STYLES ───────────────────────────────────────────────── */
const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 760,
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
    display: "flex",
    alignItems: "center",
    gap: 6,
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
  results: {
    textAlign: "center",
    padding: "60px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    animation: "slideIn 0.5s ease",
  },
  resultsTitle: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 28,
    fontWeight: 900,
    color: "#fff",
    marginTop: 8,
  },
  resultsScore: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 64,
    fontWeight: 900,
    color: "var(--verde-claro)",
    lineHeight: 1,
    margin: "12px 0",
  },
  resultsSub: {
    color: "var(--gris)",
    fontSize: 15,
    marginBottom: 8,
  },
  resultsMessage: {
    background: "var(--card)",
    border: "1px solid rgba(82,183,136,0.2)",
    borderRadius: 16,
    padding: "20px 24px",
    fontSize: 15,
    lineHeight: 1.6,
    color: "var(--texto)",
    marginBottom: 16,
    maxWidth: 520,
    textAlign: "left",
  },
  restartBtn: {
    padding: "18px 40px",
    background: "var(--verde-claro)",
    border: "none",
    borderRadius: 14,
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: "var(--fondo)",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  /* welcome */
  welcomeCard: {
    background: "var(--card)",
    border: "1px solid rgba(82,183,136,0.2)",
    borderRadius: 20,
    padding: "36px 28px",
    marginBottom: 24,
  },
  welcomeCardTitle: {
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: "var(--verde-claro)",
    marginBottom: 14,
  },
  welcomeCardBody: {
    color: "var(--gris)",
    fontSize: 14,
    lineHeight: 1.6,
  },
  topics: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginTop: 16,
  },
  chip: {
    background: "rgba(82,183,136,0.1)",
    border: "1px solid rgba(82,183,136,0.2)",
    borderRadius: 100,
    padding: "6px 14px",
    fontSize: 12,
    color: "var(--verde-claro)",
  },
  startBtn: {
    padding: "20px 48px",
    background: "linear-gradient(135deg, var(--verde), var(--verde-claro))",
    border: "none",
    borderRadius: 16,
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.5px",
  },
};
