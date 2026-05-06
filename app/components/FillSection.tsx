"use client";

import { useState, useEffect, useRef } from "react";
import { type FillQuestion } from "@/app/data/questions";
import { useSound } from "@/app/hooks/useSound";

type Props = {
  questions: FillQuestion[];
  playerName: string;
  playerEmoji: string;
  quizTitle: string;
  mcScore: number;
  mcTotal: number;
  onComplete: (fillScore: number, fillTotal: number) => void;
  onBack: () => void;
};

type Result = {
  correct: boolean;
  given: string;
  expected: string;
};

function checkAnswer(input: string, q: FillQuestion): boolean {
  const normalized = input.trim().toLowerCase().replace(/[()]/g, "");
  return q.acceptedAnswers.some(
    (a) =>
      normalized === a ||
      normalized.includes(a) ||
      (a.includes(normalized) && normalized.length > 2),
  );
}

export default function FillSection({
  questions,
  playerName,
  playerEmoji,
  quizTitle,
  mcScore,
  mcTotal,
  onComplete,
  onBack,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [phase, setPhase] = useState<"test" | "summary">("test");

  const inputRef = useRef<HTMLInputElement>(null);
  const { playCorrect, playWrong } = useSound();

  // Autofocus input when question changes
  useEffect(() => {
    if (phase === "test" && !answered) {
      inputRef.current?.focus();
    }
  }, [current, phase, answered]);

  const total = questions.length;

  function handleSubmit() {
    if (answered || input.trim() === "") return;
    const q = questions[current];
    const correct = checkAnswer(input, q);
    setAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      playCorrect();
    } else {
      playWrong();
    }
    setResults((prev) => [
      ...prev,
      { correct, given: input.trim(), expected: q.answer },
    ]);
  }

  function handleNext() {
    if (current + 1 >= total) {
      setPhase("summary");
    } else {
      setCurrent((c) => c + 1);
      setInput("");
      setAnswered(false);
      setIsCorrect(false);
    }
  }

  const progressPct = (current / total) * 100;

  /* ── SUMMARY ─────────────────────────────────────────────── */
  if (phase === "summary") {
    const finalFillScore = results.filter((r) => r.correct).length;
    const combinedScore = mcScore + finalFillScore;
    const combinedTotal = mcTotal + total;
    const combinedPct = Math.round((combinedScore / combinedTotal) * 100);

    return (
      <div className="trivia-container">
        <header className="game-header">
          <div
            className="trivia-badge"
            style={{
              borderColor: "var(--azul-claro)",
              color: "var(--azul-claro)",
            }}
          >
            🗄️ {quizTitle}
          </div>
          <h1 className="game-h1">
            <span style={{ color: "var(--azul-claro)" }}>Sección B</span> —
            Resumen
          </h1>
          <div className="player-info-row">
            <span style={{ fontSize: 16 }}>{playerEmoji}</span>
            <span style={{ color: "var(--gris)", fontSize: 12 }}>
              {playerName.trim() || "Jugador"}
            </span>
          </div>
        </header>

        {/* Section B results list */}
        <div
          className="question-card"
          style={{ borderColor: "var(--azul-claro)", gap: 10 }}
        >
          <div
            className="card-top-bar"
            style={{ background: "var(--azul-claro)" }}
          />
          <div
            style={{
              fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--azul-claro)",
              marginBottom: 8,
            }}
          >
            Sección B — Completá el término
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {results.map((r, i) => {
              const q = questions[i];
              const truncated =
                q.question.length > 80
                  ? q.question.slice(0, 80) + "…"
                  : q.question;
              return (
                <div
                  key={i}
                  style={{
                    background: r.correct
                      ? "rgba(82,183,136,0.08)"
                      : "rgba(224,82,82,0.08)",
                    border: `1px solid ${r.correct ? "rgba(82,183,136,0.25)" : "rgba(224,82,82,0.25)"}`,
                    borderRadius: 10,
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--gris)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ marginRight: 6 }}>
                      {r.correct ? "✅" : "❌"}
                    </span>
                    {truncated}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 2,
                    }}
                  >
                    <span style={{ color: "var(--gris)" }}>
                      Tu respuesta:{" "}
                      <span
                        style={{
                          color: r.correct
                            ? "var(--verde-claro)"
                            : "var(--rojo)",
                          fontWeight: 600,
                        }}
                      >
                        {r.given || "—"}
                      </span>
                    </span>
                    {!r.correct && (
                      <span style={{ color: "var(--gris)" }}>
                        Correcta:{" "}
                        <span
                          style={{
                            color: "var(--azul-claro)",
                            fontWeight: 600,
                          }}
                        >
                          {r.expected}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Score pills */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 14,
              padding: "14px 0 4px",
              borderTop: "1px solid rgba(96,165,250,0.15)",
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <div className="score-pill">
                🅰️ <span>Sección A:</span>{" "}
                <span
                  className="score-num"
                  style={{ color: "var(--verde-claro)" }}
                >
                  {mcScore}/{mcTotal}
                </span>
              </div>
              <div className="score-pill">
                🅱️ <span>Sección B:</span>{" "}
                <span
                  className="score-num"
                  style={{ color: "var(--azul-claro)" }}
                >
                  {finalFillScore}/{total}
                </span>
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--texto)",
              }}
            >
              Total:{" "}
              <span
                style={{
                  color:
                    combinedPct >= 70
                      ? "var(--verde-claro)"
                      : combinedPct >= 50
                        ? "var(--dorado)"
                        : "var(--rojo)",
                }}
              >
                {combinedScore}/{combinedTotal}
              </span>{" "}
              <span
                style={{ color: "var(--gris)", fontSize: 11, fontWeight: 400 }}
              >
                ({combinedPct}%)
              </span>
            </div>
          </div>
        </div>

        <button
          className="next-btn"
          style={{
            background: "var(--azul-claro)",
            borderColor: "var(--azul-claro)",
          }}
          onClick={() => onComplete(finalFillScore, total)}
        >
          Ver resultado final →
        </button>
      </div>
    );
  }

  /* ── TEST ─────────────────────────────────────────────────── */
  const q = questions[current];

  return (
    <div className="trivia-container">
      <header className="game-header">
        <div
          className="trivia-badge"
          style={{
            borderColor: "var(--azul-claro)",
            color: "var(--azul-claro)",
          }}
        >
          🗄️ Sección B — Completá el término
        </div>
        <h1 className="game-h1">
          {playerEmoji}{" "}
          <span style={{ color: "var(--azul-claro)" }}>
            {playerName.trim() || "Jugador"}
          </span>
        </h1>
        <div className="player-info-row">
          <span style={{ color: "var(--gris)", fontSize: 12 }}>
            Pregunta {current + 1} de {total}
          </span>
        </div>
      </header>

      {/* MC score recap pill */}
      <div className="score-row">
        <div className="score-pill">
          🅰️ <span>Sección A:</span>{" "}
          <span className="score-num" style={{ color: "var(--verde-claro)" }}>
            {mcScore}/{mcTotal}
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
                "linear-gradient(90deg, var(--azul), var(--azul-claro))",
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
            color: "var(--azul-claro)",
            whiteSpace: "nowrap",
          }}
        >
          {current} / {total}
        </span>
      </div>

      {/* Question card */}
      <div
        key={current}
        className="question-card animate-slideIn"
        style={{ borderColor: "var(--azul-claro)" }}
      >
        <div
          className="card-top-bar"
          style={{ background: "var(--azul-claro)" }}
        />
        <div
          className="category-tag"
          style={{
            color: "var(--azul-claro)",
            borderColor: "rgba(96,165,250,0.3)",
          }}
        >
          {q.category}
        </div>
        <div className="q-num">
          Pregunta {current + 1} de {total}
        </div>
        <div className="question-text">{q.question}</div>

        {/* Text input */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            ref={inputRef}
            className="name-input"
            style={{
              borderColor: answered
                ? isCorrect
                  ? "var(--verde-claro)"
                  : "var(--rojo)"
                : "rgba(96,165,250,0.35)",
              width: "100%",
            }}
            type="text"
            placeholder="Escribí tu respuesta..."
            value={input}
            disabled={answered}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !answered) handleSubmit();
            }}
          />

          {/* Confirm button */}
          {!answered && (
            <button
              className="next-btn"
              style={{
                background: "var(--azul-claro)",
                opacity: input.trim() === "" ? 0.5 : 1,
              }}
              disabled={input.trim() === ""}
              onClick={handleSubmit}
            >
              Confirmar →
            </button>
          )}
        </div>

        {/* Feedback */}
        {answered && (
          <div
            className={`feedback-box animate-fadeUp ${isCorrect ? "correct-fb" : "wrong-fb"}`}
          >
            <strong style={{ display: "block", marginBottom: 4, fontSize: 12 }}>
              {isCorrect ? "✅ ¡Correcto!" : "❌ Incorrecto."}
            </strong>
            <span style={{ display: "block", marginBottom: 4 }}>{q.hint}</span>
            {!isCorrect && (
              <span style={{ display: "block", fontSize: 12, marginTop: 4 }}>
                Respuesta correcta:{" "}
                <strong style={{ color: "var(--azul-claro)" }}>
                  {q.answer}
                </strong>
              </span>
            )}
          </div>
        )}

        {/* Next button */}
        {answered && (
          <button
            className="next-btn"
            style={{ background: "var(--azul-claro)" }}
            onClick={handleNext}
          >
            {current + 1 >= total ? "Ver resultados →" : "Siguiente →"}
          </button>
        )}
      </div>

      {/* Back button */}
      <button className="back-btn" onClick={onBack}>
        ← Volver al catálogo
      </button>
    </div>
  );
}
