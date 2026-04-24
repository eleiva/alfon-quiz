"use client";

import { useState } from "react";
import {
  personalityQuestions,
  profileResults,
  calculateProfile,
  type PersonalityProfile,
} from "@/app/data/personalityTest";
import { useSound } from "@/app/hooks/useSound";

/* ── Props ──────────────────────────────────────────────────── */

type Props = {
  playerName: string;
  playerEmoji: string;
  onBack: () => void;
};

/* ── Constants ──────────────────────────────────────────────── */

const LETTERS = ["A", "B", "C", "D"] as const;

const PROFILE_ORDER: PersonalityProfile[] = [
  "innovador",
  "creativo",
  "racional",
  "logico",
];

/* ── Component ──────────────────────────────────────────────── */

export default function PersonalityTest({
  playerName,
  playerEmoji,
  onBack,
}: Props) {
  const [phase, setPhase] = useState<"intro" | "test" | "results">("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<PersonalityProfile[]>([]);
  const [result, setResult] = useState<PersonalityProfile | null>(null);

  // useSound is imported for audio feedback parity with the rest of the app,
  // though personality tests give no right/wrong feedback.
  const { playCorrect } = useSound();

  const total = personalityQuestions.length; // 20
  const progressPct = total > 0 ? Math.round((current / total) * 100) : 0;

  /* ── Handlers ─────────────────────────────────────────────── */

  function handleStart() {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
    setPhase("test");
  }

  function handleAnswer(profile: PersonalityProfile) {
    playCorrect();
    const newAnswers = [...answers, profile];
    if (current + 1 >= total) {
      const winner = calculateProfile(newAnswers);
      setAnswers(newAnswers);
      setResult(winner);
      setPhase("results");
    } else {
      setAnswers(newAnswers);
      setCurrent((c) => c + 1);
    }
  }

  function handleRepeat() {
    setCurrent(0);
    setAnswers([]);
    setResult(null);
    setPhase("intro");
  }

  /* ── Helpers ──────────────────────────────────────────────── */

  function countForProfile(profile: PersonalityProfile): number {
    return answers.filter((a) => a === profile).length;
  }

  /* ── Render: intro ────────────────────────────────────────── */

  if (phase === "intro") {
    return (
      <div className="trivia-container animate-slideIn">
        {/* Header */}
        <div className="trivia-header">
          <div
            className="trivia-badge"
            style={{
              background:
                "linear-gradient(135deg, var(--violeta), var(--violeta-claro))",
              color: "#fff",
            }}
          >
            PERSONALIDAD TECH
          </div>
          <h1 className="trivia-h1">🧠 Test de Personalidad Tech</h1>
          <p
            style={{
              color: "var(--gris)",
              fontSize: "clamp(13px, 3.5vw, 16px)",
              marginTop: 8,
            }}
          >
            Descubrí tu estilo como Genio Tech
          </p>
        </div>

        {/* Explainer card */}
        <div
          className="welcome-card"
          style={{
            borderColor: "rgba(139, 92, 246, 0.25)",
            marginBottom: 24,
            maxWidth: 680,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                "linear-gradient(90deg, var(--violeta), var(--violeta-claro))",
              borderRadius: "16px 16px 0 0",
            }}
          />
          <p
            style={{
              fontSize: "clamp(13px, 3.5vw, 15px)",
              lineHeight: 1.7,
              color: "var(--texto)",
              textAlign: "center",
            }}
          >
            <strong style={{ color: "var(--violeta-claro)" }}>
              20 preguntas
            </strong>{" "}
            sin respuestas correctas o incorrectas.{" "}
            <strong>Elegí la opción que mejor te represente.</strong> Al final
            descubrís tu perfil tech único.
          </p>
        </div>

        {/* Profile preview grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 28,
            maxWidth: 680,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {PROFILE_ORDER.map((profileKey) => {
            const prof = profileResults[profileKey];
            return (
              <div
                key={profileKey}
                style={{
                  background: "var(--card)",
                  border: `1px solid rgba(139, 92, 246, 0.18)`,
                  borderRadius: 14,
                  padding: "16px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: prof.color,
                  }}
                />
                <span style={{ fontSize: 28, lineHeight: 1 }}>
                  {prof.emoji}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-unbounded), Unbounded, sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      color: prof.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {prof.title}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--gris)",
                      marginTop: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {prof.techIcon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA button */}
        <div style={{ maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <button
            onClick={handleStart}
            style={{
              display: "block",
              width: "100%",
              padding: "16px 24px",
              background:
                "linear-gradient(135deg, var(--violeta), var(--violeta-claro))",
              border: "none",
              borderRadius: 13,
              fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
              fontSize: "clamp(12px, 3vw, 14px)",
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "all 0.2s ease",
              marginBottom: 12,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 12px 32px rgba(139, 92, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
            }}
          >
            Empezar el test →
          </button>

          <button className="back-btn" onClick={onBack}>
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  /* ── Render: test ─────────────────────────────────────────── */

  if (phase === "test") {
    const q = personalityQuestions[current];

    return (
      <div className="trivia-container animate-fadeUp">
        {/* Game header */}
        <div className="game-header">
          <h1 className="game-h1" style={{ color: "var(--violeta-claro)" }}>
            🧠 Test de Personalidad Tech
          </h1>
          <div className="player-info-row">
            <span style={{ fontSize: 13, color: "var(--gris)" }}>
              ¿Quién responde?
            </span>
            <span style={{ fontSize: 16 }}>{playerEmoji}</span>
            <span
              style={{
                fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--violeta-claro)",
              }}
            >
              {playerName}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="progress-wrap"
          style={{ maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}
        >
          <div
            style={{
              flex: 1,
              height: 7,
              background: "rgba(139,92,246,0.15)",
              borderRadius: 100,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background:
                  "linear-gradient(90deg, var(--violeta), var(--violeta-claro))",
                borderRadius: 100,
                transition: "width 0.35s ease",
                width: `${progressPct}%`,
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--violeta-claro)",
              whiteSpace: "nowrap",
            }}
          >
            {current}/{total}
          </span>
        </div>

        {/* Question card */}
        <div
          className="question-card"
          style={{ borderColor: "rgba(139,92,246,0.2)" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background:
                "linear-gradient(90deg, var(--violeta), var(--violeta-claro))",
            }}
          />

          <div className="q-num">
            PREGUNTA {current + 1} DE {total}
          </div>

          <p className="question-text">{q.question}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                className="option-btn"
                onClick={() => handleAnswer(opt.profile)}
                style={{
                  borderColor: "rgba(139,92,246,0.2)",
                  transition: "all 0.18s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "var(--violeta-claro)";
                  el.style.background = "rgba(139,92,246,0.09)";
                  el.style.transform = "translateX(3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "rgba(139,92,246,0.2)";
                  el.style.background = "";
                  el.style.transform = "";
                }}
              >
                <span
                  className="option-letter"
                  style={{
                    color: "var(--violeta-claro)",
                    background: "rgba(139,92,246,0.12)",
                  }}
                >
                  {LETTERS[idx]}
                </span>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Render: results ──────────────────────────────────────── */

  if (phase === "results" && result !== null) {
    const prof = profileResults[result];

    function handleShare() {
      const text = prof.shareText + ` → ${window.location.origin}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }

    return (
      <div className="trivia-container animate-slideIn">
        <div
          style={{
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: 24,
            paddingBottom: 48,
          }}
        >
          {/* Profile emoji with glow */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "clamp(96px,20vw,120px)",
                height: "clamp(96px,20vw,120px)",
                borderRadius: "50%",
                background: "var(--card)",
                border: `2px solid ${prof.color}`,
                boxShadow: `0 0 32px ${prof.color}55, 0 0 64px ${prof.color}22`,
                fontSize: "clamp(48px,10vw,72px)",
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {prof.emoji}
            </div>
          </div>

          {/* Player attribution */}
          <p
            style={{
              textAlign: "center",
              fontSize: "clamp(13px, 3.5vw, 15px)",
              color: "var(--gris)",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 20 }}>{playerEmoji}</span>{" "}
            <strong style={{ color: "var(--texto)" }}>{playerName}</strong>, tu
            perfil es:
          </p>

          {/* Profile title */}
          <h2
            style={{
              fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
              fontSize: "clamp(20px, 5.5vw, 30px)",
              fontWeight: 900,
              color: prof.color,
              textAlign: "center",
              lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            {prof.title}
          </h2>

          {/* Tagline */}
          <p
            style={{
              textAlign: "center",
              fontStyle: "italic",
              color: "var(--gris)",
              fontSize: "clamp(13px, 3.5vw, 15px)",
              marginBottom: 24,
            }}
          >
            "{prof.tagline}"
          </p>

          {/* Result card */}
          <div
            style={{
              background: "var(--card)",
              border: `1px solid ${prof.color}44`,
              borderRadius: 18,
              padding: "22px 20px",
              marginBottom: 20,
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 4px 32px ${prof.color}18`,
            }}
          >
            {/* Top accent bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${prof.color}, var(--violeta-claro))`,
              }}
            />

            {/* Description */}
            <p
              style={{
                fontSize: "clamp(13px, 3.5vw, 15px)",
                lineHeight: 1.7,
                color: "var(--texto)",
                marginBottom: 18,
              }}
            >
              {prof.description}
            </p>

            {/* Strengths */}
            <div style={{ marginBottom: 18 }}>
              <p
                style={{
                  fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--gris)",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Tus fortalezas:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {prof.strengths.map((s) => (
                  <span
                    key={s}
                    style={{
                      background: `${prof.color}18`,
                      border: `1px solid ${prof.color}44`,
                      borderRadius: 100,
                      padding: "5px 13px",
                      fontSize: "clamp(11px, 2.5vw, 13px)",
                      fontWeight: 600,
                      color: prof.color,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Famous example */}
            <div
              style={{
                background: "var(--superficie)",
                borderRadius: 12,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 18,
              }}
            >
              <span style={{ fontSize: 28 }}>{prof.techIcon}</span>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--gris)",
                    marginBottom: 2,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                  }}
                >
                  🌐 Tu referente tech:
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                    fontSize: "clamp(12px, 3vw, 14px)",
                    fontWeight: 700,
                    color: prof.color,
                  }}
                >
                  {prof.famousExample}
                </p>
              </div>
            </div>

            {/* Percentage breakdown */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--gris)",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Composición de tu perfil:
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {PROFILE_ORDER.map((profileKey) => {
                  const p = profileResults[profileKey];
                  const count = countForProfile(profileKey);
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  const isWinner = profileKey === result;
                  return (
                    <div key={profileKey}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 5,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "clamp(11px, 2.5vw, 13px)",
                            fontWeight: isWinner ? 700 : 400,
                            color: isWinner ? p.color : "var(--gris)",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span>{p.emoji}</span>
                          {p.title}
                          {isWinner && (
                            <span
                              style={{
                                fontSize: 9,
                                background: `${p.color}22`,
                                border: `1px solid ${p.color}55`,
                                borderRadius: 100,
                                padding: "1px 7px",
                                color: p.color,
                                fontFamily:
                                  "var(--font-unbounded), Unbounded, sans-serif",
                                fontWeight: 700,
                                letterSpacing: "0.5px",
                              }}
                            >
                              TU PERFIL
                            </span>
                          )}
                        </span>
                        <span
                          style={{
                            fontFamily:
                              "var(--font-unbounded), Unbounded, sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            color: isWinner ? p.color : "var(--gris)",
                          }}
                        >
                          {pct}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: 7,
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: 100,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${pct}%`,
                            background: p.color,
                            borderRadius: 100,
                            transition: "width 0.6s ease",
                            opacity: isWinner ? 1 : 0.55,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="results-actions">
            <button
              onClick={handleRepeat}
              style={{
                padding: "15px 20px",
                background:
                  "linear-gradient(135deg, var(--violeta), var(--violeta-claro))",
                border: "none",
                borderRadius: 13,
                fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                fontSize: "clamp(11px, 2.5vw, 13px)",
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                width: "100%",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 8px 24px rgba(139,92,246,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
              }}
            >
              🔄 Repetir el test
            </button>

            <button
              onClick={handleShare}
              style={{
                padding: "15px 20px",
                background: "#25D366",
                border: "none",
                borderRadius: 13,
                fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                fontSize: "clamp(11px, 2.5vw, 13px)",
                fontWeight: 700,
                color: "#fff",
                cursor: "pointer",
                width: "100%",
                transition: "all 0.2s ease",
                letterSpacing: "0.3px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 8px 24px rgba(37,211,102,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
              }}
            >
              💬 Compartir por WhatsApp
            </button>

            <button className="back-btn" onClick={onBack}>
              🏠 Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/* ── Shared helper — exported for other quizzes ─────────────── */

export function shareResultWhatsApp(
  playerName: string,
  playerEmoji: string,
  quizTitle: string,
  score: number,
  total: number,
  pct: number,
  difficulty: string,
) {
  const diffLabel = difficulty === "hard" ? "🔥 Difícil" : "🌱 Normal";
  const text = `${playerEmoji} ${playerName} sacó ${score}/${total} (${pct}%) en "${quizTitle}" — Nivel ${diffLabel}! 🎯\nJugá vos también → ${window.location.origin}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}
