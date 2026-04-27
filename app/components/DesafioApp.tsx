"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Palette ────────────────────────────────────────────────────────────────
const TEAM_COLORS = [
  {
    bg: "rgba(82,183,136,0.15)",
    border: "rgba(82,183,136,0.4)",
    text: "var(--verde-claro)",
  },
  {
    bg: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.4)",
    text: "var(--azul)",
  },
  {
    bg: "rgba(139,92,246,0.15)",
    border: "rgba(139,92,246,0.4)",
    text: "var(--violeta)",
  },
  {
    bg: "rgba(244,197,66,0.15)",
    border: "rgba(244,197,66,0.4)",
    text: "var(--dorado)",
  },
  {
    bg: "rgba(249,115,22,0.15)",
    border: "rgba(249,115,22,0.4)",
    text: "var(--naranja)",
  },
  {
    bg: "rgba(224,82,82,0.15)",
    border: "rgba(224,82,82,0.4)",
    text: "var(--rojo)",
  },
  {
    bg: "rgba(183,228,199,0.15)",
    border: "rgba(183,228,199,0.4)",
    text: "var(--verde-menta)",
  },
];

// ─── Static data ─────────────────────────────────────────────────────────────
const NOMBRES = [
  "Sofía",
  "Mateo",
  "Valentina",
  "Lautaro",
  "Lucía",
  "Agustín",
  "Camila",
  "Facundo",
  "Martina",
  "Joaquín",
  "Julieta",
  "Nicolás",
  "Milagros",
  "Tomás",
  "Florencia",
  "Ezequiel",
  "Bianca",
  "Santiago",
  "Abril",
  "Ignacio",
  "Renata",
  "Marcos",
  "Isabella",
  "Rodrigo",
  "Paz",
  "Leandro",
  "Emilia",
  "Bruno",
  "Victoria",
  "Maximiliano",
];

const DESAFIOS = [
  {
    t: "App del kiosco escolar",
    d: "Una app para pedir sin hacer fila. Dibujen pantallas del alumno y del kiosquero.",
    tags: ["UX", "flujos"],
  },
  {
    t: "Sistema de préstamo de libros",
    d: "La biblioteca no tiene sistema. Diseñen uno: cómo se pide un libro, se registra y se avisa la devolución.",
    tags: ["lógica", "base de datos"],
  },
  {
    t: "App anti-pérdida de objetos",
    d: "Reportar y encontrar cosas perdidas en la escuela. ¿Cómo se busca? ¿Quién modera los reportes?",
    tags: ["social", "búsqueda"],
  },
  {
    t: "Turnos para la dirección",
    d: "Siempre hay cola. Diseñen un sistema para pedir turno y saber cuánto esperar.",
    tags: ["eficiencia", "notificaciones"],
  },
  {
    t: "Mapa de problemas del barrio",
    d: "Los vecinos marcan en un mapa baches, luces rotas o basura. El municipio ve los reportes y responde.",
    tags: ["comunidad", "mapas"],
  },
  {
    t: "Agenda de actividades extracurriculares",
    d: "Un sistema para que los alumnos vean qué talleres hay, se anoten y el profe controle la asistencia.",
    tags: ["organización", "registro"],
  },
  {
    t: "Red de intercambio escolar",
    d: "Los alumnos pueden ofrecer e intercambiar útiles, libros o ropa escolar. Sin plata, solo trueque.",
    tags: ["comunidad", "búsqueda"],
  },
  {
    t: "Panel de estado de la escuela",
    d: "Una pantalla en el hall que muestra: próximos actos, aulas ocupadas, noticias del día y clima. ¿Quién lo actualiza y cómo?",
    tags: ["información", "tiempo real"],
  },
];

const SORPRESAS = [
  "El servidor se cae seguido. ¿Cómo funciona sin internet?",
  "Deben incluir una función para personas con baja visión.",
  "Solo puede usarse en un teléfono viejo sin pantalla táctil.",
  "El director quiere ver estadísticas de uso. ¿Qué datos muestran?",
  "Un alumno nuevo que no habla español tiene que poder usarla. ¿Cómo la adaptan?",
  "El municipio quiere comprarla pero solo si funciona también en una computadora de escritorio.",
  "Agregan un modo para que los padres puedan ver información. ¿Qué ven y qué no?",
];

const FASES = [
  {
    nombre: "Kickoff",
    desc: "Presentá la actividad y sorteá equipos",
    dur: 10 * 60,
    min: "0:00",
  },
  {
    nombre: "Ronda 1 — analizar",
    desc: "Solo papel y lápiz, sin dibujar todavía",
    dur: 20 * 60,
    min: "0:10",
  },
  {
    nombre: "Ronda 2 — prototipar",
    desc: "Dibujan pantallas y flujos en papel",
    dur: 45 * 60,
    min: "0:30",
  },
  {
    nombre: "Ronda 3 — sorpresa",
    desc: "Anunciá el desafío y dan 15 min para adaptar",
    dur: 15 * 60,
    min: "1:15",
  },
  {
    nombre: "Presentaciones",
    desc: "5 min por equipo, celular solo para mostrar fotos",
    dur: 35 * 60,
    min: "1:30",
  },
];

type Screen =
  | "home"
  | "equipos"
  | "timer"
  | "desafios"
  | "roles"
  | "puntos"
  | "ayuda";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function sortear(): string[][] {
  const m = [...NOMBRES].sort(() => Math.random() - 0.5);
  const grupos: string[][] = [];
  for (let i = 0; i < 7; i++) grupos.push(m.slice(i * 4, i * 4 + 4));
  return grupos;
}

function fmtTime(seg: number): string {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ─── Shared style primitives ──────────────────────────────────────────────────
const S = {
  card: {
    background: "var(--card)",
    border: "1px solid rgba(82,183,136,0.15)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "var(--gris)",
    letterSpacing: "0.07em",
    textTransform: "uppercase" as const,
    margin: "16px 0 8px",
    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
  } as React.CSSProperties,

  tipBox: {
    background: "rgba(82,183,136,0.1)",
    borderLeft: "3px solid var(--verde-claro)",
    borderRadius: "0 10px 10px 0",
    padding: "10px 12px",
    fontSize: 13,
    color: "var(--verde-menta)",
    marginBottom: 8,
    lineHeight: 1.5,
  } as React.CSSProperties,

  warnBox: {
    background: "rgba(244,197,66,0.1)",
    borderLeft: "3px solid var(--dorado)",
    borderRadius: "0 10px 10px 0",
    padding: "10px 12px",
    fontSize: 13,
    color: "var(--dorado)",
    marginBottom: 8,
    lineHeight: 1.5,
  } as React.CSSProperties,
};

// ─── Sub-screens ──────────────────────────────────────────────────────────────

function BackBtn({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      style={{
        background: "none",
        border: "none",
        color: "var(--gris)",
        fontSize: 14,
        cursor: "pointer",
        padding: "14px 16px 6px",
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
      }}
    >
      ← inicio
    </button>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomeScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const navCards: {
    screen: Screen;
    icon: string;
    label: string;
    sub: string;
  }[] = [
    {
      screen: "equipos",
      icon: "👥",
      label: "Equipos",
      sub: "7 grupos sorteados",
    },
    {
      screen: "timer",
      icon: "⏱",
      label: "Cronómetro",
      sub: "fases de la clase",
    },
    {
      screen: "desafios",
      icon: "🎯",
      label: "Desafíos",
      sub: "asignar a cada equipo",
    },
    {
      screen: "roles",
      icon: "🎭",
      label: "Roles",
      sub: "para mostrar en clase",
    },
    { screen: "puntos", icon: "🏆", label: "Puntaje", sub: "tabla de equipos" },
    { screen: "ayuda", icon: "📋", label: "Guía profe", sub: "tips rápidos" },
  ];

  return (
    <div>
      {/* top bar */}
      <div style={{ padding: "14px 16px 0", marginBottom: 4 }}>
        <a
          href="/"
          style={{ color: "var(--gris)", fontSize: 13, textDecoration: "none" }}
        >
          ← Volver a trivias
        </a>
      </div>

      {/* hero */}
      <div style={{ padding: "18px 16px 10px" }}>
        <div
          className="trivia-h1"
          style={{
            fontSize: "clamp(22px,6vw,34px)",
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          Diseñadores sin pantalla 🎨
        </div>
        <div
          style={{
            color: "var(--gris)",
            fontSize: 14,
            fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          }}
        >
          30 alumnos · 7 equipos · 2 horas
        </div>
      </div>

      {/* nav grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          padding: "8px 16px 24px",
        }}
      >
        {navCards.map((c) => (
          <button
            key={c.screen}
            onClick={() => onNav(c.screen)}
            style={{
              background: "var(--card)",
              border: "1px solid rgba(82,183,136,0.15)",
              borderRadius: 14,
              padding: "16px 12px",
              textAlign: "left",
              cursor: "pointer",
              color: "var(--texto)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(82,183,136,0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(82,183,136,0.15)")
            }
          >
            <span style={{ fontSize: 28 }}>{c.icon}</span>
            <span
              style={{
                fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {c.label}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "var(--gris)",
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              }}
            >
              {c.sub}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── EQUIPOS ───────────────────────────────────────────────────────────────────
function EquiposScreen({
  equipos,
  asignaciones,
  onBack,
  onResortear,
}: {
  equipos: string[][];
  asignaciones: Record<number, number>;
  onBack: () => void;
  onResortear: () => void;
}) {
  // Build reverse map: equipoIdx -> desafioIdx
  const equipoDesafio: Record<number, number> = {};
  Object.entries(asignaciones).forEach(([dIdx, eIdx]) => {
    equipoDesafio[eIdx] = Number(dIdx);
  });

  return (
    <div>
      <BackBtn onBack={onBack} />
      <div style={{ padding: "4px 16px 0" }}>
        <div style={S.sectionTitle}>Equipos</div>
      </div>

      <div style={{ padding: "0 16px" }}>
        {equipos.map((miembros, i) => {
          const tc = TEAM_COLORS[i];
          const dIdx = equipoDesafio[i];
          const desafio = dIdx !== undefined ? DESAFIOS[dIdx] : null;
          return (
            <div
              key={i}
              style={{
                ...S.card,
                background: tc.bg,
                border: `1px solid ${tc.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: tc.border,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 900,
                    color: tc.text,
                    flexShrink: 0,
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  }}
                >
                  E{i + 1}
                </span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: tc.text,
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  }}
                >
                  Equipo {i + 1}
                </span>
                {desafio && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 10,
                      background: tc.border,
                      color: tc.text,
                      borderRadius: 6,
                      padding: "2px 7px",
                      fontWeight: 700,
                      fontFamily:
                        "var(--font-unbounded), Unbounded, sans-serif",
                      maxWidth: 120,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {desafio.t}
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--texto)",
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  lineHeight: 1.5,
                }}
              >
                {miembros.join(" · ")}
              </div>
            </div>
          );
        })}

        <button
          onClick={onResortear}
          style={{
            marginTop: 8,
            marginBottom: 24,
            width: "100%",
            padding: "13px 0",
            borderRadius: 12,
            border: "1px solid rgba(82,183,136,0.3)",
            background: "rgba(82,183,136,0.08)",
            color: "var(--verde-claro)",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
          }}
        >
          🔀 Volver a sortear
        </button>
      </div>
    </div>
  );
}

// ── TIMER ─────────────────────────────────────────────────────────────────────
function TimerScreen({
  faseActual,
  setFaseActual,
  timerSeg,
  setTimerSeg,
  timerRunning,
  setTimerRunning,
  onBack,
}: {
  faseActual: number;
  setFaseActual: (n: number) => void;
  timerSeg: number;
  setTimerSeg: React.Dispatch<React.SetStateAction<number>>;
  timerRunning: boolean;
  setTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  onBack: () => void;
}) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeg((prev) => {
          if (prev <= 1) {
            clearTimer();
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerRunning]);

  function handleToggle() {
    if (timerSeg === 0) return;
    setTimerRunning(!timerRunning);
  }

  function handleReset() {
    setTimerRunning(false);
    setTimerSeg(FASES[faseActual].dur);
  }

  function handleFaseClick(idx: number) {
    setTimerRunning(false);
    setFaseActual(idx);
    setTimerSeg(FASES[idx].dur);
  }

  const fase = FASES[faseActual];
  const pct = fase.dur > 0 ? Math.max(0, timerSeg / fase.dur) : 0;
  const isFinished = timerSeg === 0;

  return (
    <div>
      <BackBtn onBack={onBack} />
      <div style={{ padding: "4px 16px 0" }}>
        <div style={S.sectionTitle}>Cronómetro</div>
      </div>

      <div style={{ padding: "0 16px" }}>
        {/* big timer card */}
        <div
          style={{
            ...S.card,
            textAlign: "center",
            padding: "24px 14px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--gris)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
              marginBottom: 8,
            }}
          >
            {fase.nombre}
          </div>

          {/* progress arc (simple bar) */}
          <div
            style={{
              height: 4,
              borderRadius: 4,
              background: "rgba(82,183,136,0.12)",
              marginBottom: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct * 100}%`,
                borderRadius: 4,
                background: isFinished ? "var(--rojo)" : "var(--verde-claro)",
                transition: "width 0.9s linear",
              }}
            />
          </div>

          <div
            style={{
              fontSize: "clamp(48px,12vw,72px)",
              fontWeight: 900,
              fontVariantNumeric: "tabular-nums",
              color: isFinished ? "var(--rojo)" : "var(--texto)",
              letterSpacing: "-2px",
              fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
              marginBottom: 10,
            }}
          >
            {fmtTime(timerSeg)}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "var(--gris)",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              marginBottom: 20,
              minHeight: 20,
            }}
          >
            {fase.desc}
          </div>

          {/* controls */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button
              onClick={handleToggle}
              disabled={isFinished}
              style={{
                flex: 1,
                maxWidth: 180,
                padding: "13px 0",
                borderRadius: 12,
                border: "none",
                background: isFinished
                  ? "rgba(82,183,136,0.15)"
                  : timerRunning
                    ? "rgba(139,92,246,0.25)"
                    : "var(--verde-claro)",
                color: isFinished
                  ? "var(--gris)"
                  : timerRunning
                    ? "var(--violeta-claro)"
                    : "var(--fondo)",
                fontWeight: 700,
                fontSize: 14,
                cursor: isFinished ? "not-allowed" : "pointer",
                fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
              }}
            >
              {isFinished ? "⏹ Fin" : timerRunning ? "⏸ Pausar" : "▶ Iniciar"}
            </button>
            <button
              onClick={handleReset}
              style={{
                flex: 1,
                maxWidth: 120,
                padding: "13px 0",
                borderRadius: 12,
                border: "1px solid rgba(82,183,136,0.2)",
                background: "transparent",
                color: "var(--gris)",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
              }}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* phases list */}
        <div style={S.sectionTitle}>Fases</div>
        {FASES.map((f, idx) => {
          const active = idx === faseActual;
          return (
            <button
              key={idx}
              onClick={() => handleFaseClick(idx)}
              style={{
                width: "100%",
                textAlign: "left",
                marginBottom: 6,
                padding: "10px 14px",
                borderRadius: 12,
                border: active
                  ? "1px solid rgba(139,92,246,0.5)"
                  : "1px solid rgba(82,183,136,0.12)",
                background: active ? "rgba(139,92,246,0.12)" : "var(--card)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--gris)",
                  minWidth: 32,
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                }}
              >
                {f.min}
              </span>
              <span style={{ flex: 1 }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 12,
                    color: active ? "var(--violeta-claro)" : "var(--texto)",
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  {f.nombre}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--gris)",
                    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  }}
                >
                  {f.desc}
                </span>
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: active ? "var(--violeta-claro)" : "var(--gris)",
                  fontWeight: 700,
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  minWidth: 36,
                  textAlign: "right",
                }}
              >
                {fmtTime(f.dur)}
              </span>
            </button>
          );
        })}
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

// ── DESAFIOS ──────────────────────────────────────────────────────────────────
function DesafiosScreen({
  equipos,
  asignaciones,
  setAsignaciones,
  sorpresaSel,
  setSorpresaSel,
  onBack,
}: {
  equipos: string[][];
  asignaciones: Record<number, number>;
  setAsignaciones: (a: Record<number, number>) => void;
  sorpresaSel: number;
  setSorpresaSel: (n: number) => void;
  onBack: () => void;
}) {
  const assignedEquipos = new Set(Object.values(asignaciones));

  function handleAsignar(dIdx: number) {
    // find first team not yet assigned any desafio
    let targetEquipo = -1;
    for (let i = 0; i < equipos.length; i++) {
      if (!assignedEquipos.has(i)) {
        targetEquipo = i;
        break;
      }
    }
    if (targetEquipo === -1) return; // all assigned
    setAsignaciones({ ...asignaciones, [dIdx]: targetEquipo });
  }

  function handleQuitar(dIdx: number) {
    const next = { ...asignaciones };
    delete next[dIdx];
    setAsignaciones(next);
  }

  return (
    <div>
      <BackBtn onBack={onBack} />
      <div style={{ padding: "4px 16px 0" }}>
        <div style={S.sectionTitle}>Desafíos</div>
      </div>

      <div style={{ padding: "0 16px" }}>
        {DESAFIOS.map((d, dIdx) => {
          const eIdx = asignaciones[dIdx];
          const assigned = eIdx !== undefined;
          const tc = assigned ? TEAM_COLORS[eIdx] : null;

          return (
            <div key={dIdx} style={S.card}>
              {/* header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: "var(--texto)",
                      fontFamily:
                        "var(--font-unbounded), Unbounded, sans-serif",
                      marginBottom: 4,
                    }}
                  >
                    {d.t}
                  </div>
                  {/* tags */}
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {d.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 10,
                          background: "rgba(82,183,136,0.12)",
                          color: "var(--verde-claro)",
                          borderRadius: 6,
                          padding: "2px 7px",
                          fontFamily:
                            "var(--font-dm-sans), DM Sans, sans-serif",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* team badge */}
                {assigned && tc && (
                  <span
                    style={{
                      fontSize: 10,
                      background: tc.bg,
                      border: `1px solid ${tc.border}`,
                      color: tc.text,
                      borderRadius: 8,
                      padding: "3px 8px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      fontFamily:
                        "var(--font-unbounded), Unbounded, sans-serif",
                    }}
                  >
                    E{eIdx + 1}
                  </span>
                )}
              </div>

              {/* description */}
              <div
                style={{
                  fontSize: 12,
                  color: "var(--gris)",
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  lineHeight: 1.55,
                  marginBottom: 10,
                }}
              >
                {d.d}
              </div>

              {/* action button */}
              {assigned ? (
                <button
                  onClick={() => handleQuitar(dIdx)}
                  style={{
                    fontSize: 11,
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(224,82,82,0.3)",
                    background: "rgba(224,82,82,0.08)",
                    color: "var(--rojo)",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  }}
                >
                  ✕ Quitar asignación
                </button>
              ) : (
                <button
                  onClick={() => handleAsignar(dIdx)}
                  disabled={assignedEquipos.size >= equipos.length}
                  style={{
                    fontSize: 11,
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(82,183,136,0.3)",
                    background: "rgba(82,183,136,0.08)",
                    color:
                      assignedEquipos.size >= equipos.length
                        ? "var(--gris)"
                        : "var(--verde-claro)",
                    cursor:
                      assignedEquipos.size >= equipos.length
                        ? "not-allowed"
                        : "pointer",
                    fontWeight: 700,
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  }}
                >
                  + Asignar al próximo equipo libre
                </button>
              )}
            </div>
          );
        })}

        {/* surprises */}
        <div style={S.sectionTitle}>Desafío sorpresa — Ronda 3</div>
        <div style={{ ...S.tipBox, marginBottom: 12 }}>
          Elegí una sorpresa antes de la Ronda 3 y anunciala cuando el timer
          llegue a cero.
        </div>
        {SORPRESAS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setSorpresaSel(sorpresaSel === idx ? -1 : idx)}
            style={{
              width: "100%",
              textAlign: "left",
              marginBottom: 6,
              padding: "11px 14px",
              borderRadius: 12,
              border:
                sorpresaSel === idx
                  ? "1px solid rgba(244,197,66,0.55)"
                  : "1px solid rgba(244,197,66,0.15)",
              background:
                sorpresaSel === idx ? "rgba(244,197,66,0.12)" : "var(--card)",
              cursor: "pointer",
              color: sorpresaSel === idx ? "var(--dorado)" : "var(--texto)",
              fontSize: 12,
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              lineHeight: 1.5,
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <span style={{ marginTop: 1, flexShrink: 0 }}>
              {sorpresaSel === idx ? "★" : "☆"}
            </span>
            {s}
          </button>
        ))}
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

// ── ROLES ─────────────────────────────────────────────────────────────────────
function RolesScreen({ onBack }: { onBack: () => void }) {
  const roles = [
    {
      titulo: "Líder de producto",
      desc: "Define el objetivo y el alcance. Toma las decisiones finales cuando el grupo no llega a un acuerdo. Escucha al equipo y mantiene el foco.",
      icon: "👑",
      bg: "rgba(139,92,246,0.13)",
      border: "rgba(139,92,246,0.4)",
      color: "var(--violeta-claro)",
    },
    {
      titulo: "Diseñador/a",
      desc: "Dibuja las pantallas y los flujos en papel. Es responsable de que la experiencia sea clara y coherente. Usa criterio, no solo estética.",
      icon: "✏️",
      bg: "rgba(82,183,136,0.13)",
      border: "rgba(82,183,136,0.4)",
      color: "var(--verde-claro)",
    },
    {
      titulo: "Analista",
      desc: "Piensa en los datos, los casos borde y los problemas técnicos. Pregunta: ¿qué pasa si el usuario no tiene internet? ¿Quién valida la información?",
      icon: "🔍",
      bg: "rgba(244,197,66,0.13)",
      border: "rgba(244,197,66,0.4)",
      color: "var(--dorado)",
    },
    {
      titulo: "Comunicador/a",
      desc: "Prepara y presenta la solución del equipo. Al final fotografía el trabajo. Es el único que puede usar el celular, y solo para eso.",
      icon: "📢",
      bg: "rgba(249,115,22,0.13)",
      border: "rgba(249,115,22,0.4)",
      color: "var(--naranja)",
    },
  ];

  return (
    <div>
      <BackBtn onBack={onBack} />
      <div style={{ padding: "4px 16px 0" }}>
        <div style={S.sectionTitle}>Roles en equipo</div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div style={{ ...S.warnBox, marginBottom: 16 }}>
          📵 El celular solo lo usa el comunicador/a — y solo para fotografiar
          al final.
        </div>

        {roles.map((r) => (
          <div
            key={r.titulo}
            style={{
              ...S.card,
              background: r.bg,
              border: `1px solid ${r.border}`,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 26 }}>{r.icon}</span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: r.color,
                  fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                }}
              >
                {r.titulo}
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--texto)",
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                lineHeight: 1.6,
              }}
            >
              {r.desc}
            </div>
          </div>
        ))}
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

// ── PUNTOS ────────────────────────────────────────────────────────────────────
function PuntosScreen({
  scores,
  setScores,
  onBack,
}: {
  scores: number[];
  setScores: (s: number[]) => void;
  onBack: () => void;
}) {
  function adjust(i: number, delta: number) {
    const next = [...scores];
    next[i] = Math.max(0, next[i] + delta);
    setScores(next);
  }

  const sorted = [...scores.map((s, i) => ({ s, i }))].sort(
    (a, b) => b.s - a.s,
  );

  return (
    <div>
      <BackBtn onBack={onBack} />
      <div style={{ padding: "4px 16px 0" }}>
        <div style={S.sectionTitle}>Puntaje</div>
      </div>

      <div style={{ padding: "0 16px" }}>
        {sorted.map(({ s, i }, rank) => {
          const tc = TEAM_COLORS[i];
          return (
            <div
              key={i}
              style={{
                ...S.card,
                background: tc.bg,
                border: `1px solid ${tc.border}`,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* rank */}
              <span
                style={{
                  fontSize: 16,
                  minWidth: 24,
                  textAlign: "center",
                  color: rank === 0 ? "var(--dorado)" : "var(--gris)",
                }}
              >
                {rank === 0
                  ? "🥇"
                  : rank === 1
                    ? "🥈"
                    : rank === 2
                      ? "🥉"
                      : `${rank + 1}.`}
              </span>

              {/* team name */}
              <span
                style={{
                  flex: 1,
                  fontWeight: 700,
                  fontSize: 13,
                  color: tc.text,
                  fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                }}
              >
                Equipo {i + 1}
              </span>

              {/* − score + */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => adjust(i, -1)}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: `1px solid ${tc.border}`,
                    background: "rgba(224,82,82,0.12)",
                    color: "var(--rojo)",
                    fontWeight: 900,
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    minWidth: 34,
                    textAlign: "center",
                    fontWeight: 900,
                    fontSize: 20,
                    fontVariantNumeric: "tabular-nums",
                    color: "var(--texto)",
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  }}
                >
                  {s}
                </span>
                <button
                  onClick={() => adjust(i, 1)}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: `1px solid ${tc.border}`,
                    background: "rgba(82,183,136,0.12)",
                    color: "var(--verde-claro)",
                    fontWeight: 900,
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}

        {/* criteria */}
        <div style={S.sectionTitle}>Criterios de evaluación</div>
        <div style={S.card}>
          {[
            [
              "🎯",
              "Claridad del flujo",
              "¿Se entiende cómo funciona sin explicaciones?",
            ],
            [
              "🧠",
              "Profundidad del análisis",
              "¿Pensaron en casos difíciles y en quién usa el sistema?",
            ],
            [
              "✏️",
              "Calidad del prototipo",
              "¿Las pantallas son coherentes y comunicativas?",
            ],
            [
              "🌟",
              "Respuesta a la sorpresa",
              "¿Adaptaron bien el diseño ante el nuevo desafío?",
            ],
            [
              "🗣️",
              "Presentación",
              "¿Explicaron con claridad y defendieron sus decisiones?",
            ],
          ].map(([icon, label, sub]) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                marginBottom: 10,
                paddingBottom: 10,
                borderBottom: "1px solid rgba(82,183,136,0.08)",
              }}
            >
              <span style={{ fontSize: 18, marginTop: 1 }}>{icon}</span>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 12,
                    color: "var(--texto)",
                    fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                    marginBottom: 2,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--gris)",
                    fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                    lineHeight: 1.5,
                  }}
                >
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* reset */}
        <button
          onClick={() => setScores([0, 0, 0, 0, 0, 0, 0])}
          style={{
            width: "100%",
            marginTop: 4,
            marginBottom: 24,
            padding: "12px 0",
            borderRadius: 12,
            border: "1px solid rgba(224,82,82,0.3)",
            background: "rgba(224,82,82,0.08)",
            color: "var(--rojo)",
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
          }}
        >
          🗑 Reiniciar puntajes
        </button>
      </div>
    </div>
  );
}

// ── AYUDA ─────────────────────────────────────────────────────────────────────
function AyudaScreen({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <BackBtn onBack={onBack} />
      <div style={{ padding: "4px 16px 0" }}>
        <div style={S.sectionTitle}>Guía para el profe</div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div style={S.tipBox}>
          🎯 <strong>Objetivo:</strong> Que los alumnos experimenten el
          pensamiento de diseño sin distracciones digitales. El foco es en el
          proceso, no en el producto.
        </div>
        <div style={S.tipBox}>
          🔀 <strong>Sorteá los equipos al principio.</strong> Evitá que los
          amigos se junten siempre — parte del aprendizaje es trabajar con quien
          no elegirían.
        </div>
        <div style={S.tipBox}>
          📵 <strong>Sin celulares.</strong> Solo el comunicador/a puede usarlo,
          y únicamente para fotografiar el trabajo al final. Explicalo antes de
          empezar.
        </div>
        <div style={S.tipBox}>
          ⏱ <strong>Respetá los tiempos.</strong> El cronómetro visible genera
          presión real, igual que en un entorno laboral. Si un equipo pide más
          tiempo, recordales que el cliente (vos) no negocia plazos.
        </div>
        <div style={S.tipBox}>
          🌟 <strong>Ronda sorpresa:</strong> Elegí la sorpresa en la pantalla
          Desafíos antes de clase. Anunciala cuando el timer de la Ronda 2
          llegue a cero. El impacto es mayor si es inesperado.
        </div>

        <div style={S.sectionTitle}>Presentaciones</div>
        <div style={S.tipBox}>
          5 minutos por equipo. El comunicador/a muestra las fotos del
          prototipo. El resto puede hablar pero no usar el celular. Si se pasan
          del tiempo, interrumpís — es parte de la dinámica.
        </div>

        <div style={S.sectionTitle}>Preguntas para el cierre</div>
        <div style={{ ...S.card, marginBottom: 8 }}>
          {[
            "¿Qué fue lo más difícil de diseñar sin computadora?",
            "¿Cambió algo en tu equipo después de la sorpresa?",
            "¿Cuántos flujos distintos encontraron para el mismo problema?",
            "Si tuviéramos más tiempo, ¿qué mejorarían primero?",
            "¿Qué aprendiste de escuchar la presentación de otro equipo?",
          ].map((q) => (
            <div
              key={q}
              style={{
                fontSize: 13,
                color: "var(--texto)",
                fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                lineHeight: 1.55,
                padding: "7px 0",
                borderBottom: "1px solid rgba(82,183,136,0.08)",
              }}
            >
              💬 {q}
            </div>
          ))}
        </div>

        <div style={S.sectionTitle}>Materiales necesarios</div>
        <div
          style={{
            ...S.warnBox,
            marginBottom: 8,
          }}
        >
          📦 Preparar con anticipación: hojas A4 (mínimo 5 por alumno), lápices
          o marcadores, cinta adhesiva para pegar en la pared, un espacio de
          pared libre por equipo para exponer.
        </div>

        <div style={S.sectionTitle}>Variantes</div>
        <div style={S.card}>
          <div
            style={{
              fontSize: 13,
              color: "var(--gris)",
              fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: "var(--texto)" }}>
              Versión rápida (1h):
            </strong>{" "}
            Saltear la Ronda 1, reducir la Ronda 2 a 25 minutos y la
            presentación a 3 min por equipo.
            <br />
            <br />
            <strong style={{ color: "var(--texto)" }}>
              Versión extendida (3h):
            </strong>{" "}
            Agregar una Ronda 0 de investigación (entrevistar a un compañero
            como "usuario") y una iteración post-presentación.
            <br />
            <br />
            <strong style={{ color: "var(--texto)" }}>Con votación:</strong> Al
            final, cada alumno tiene 3 puntos para distribuir entre los equipos
            (no al propio). Los puntajes se suman a la tabla.
          </div>
        </div>

        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────
export default function DesafioApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const [equipos, setEquipos] = useState<string[][]>([]);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [faseActual, setFaseActual] = useState(0);
  const [timerSeg, setTimerSeg] = useState(FASES[0].dur);
  const [timerRunning, setTimerRunning] = useState(false);
  const [asignaciones, setAsignaciones] = useState<Record<number, number>>({});
  const [sorpresaSel, setSorpresaSel] = useState(-1);

  // init equipos on mount
  useEffect(() => {
    setEquipos(sortear());
  }, []);

  function goHome() {
    setScreen("home");
  }

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "var(--fondo)",
    color: "var(--texto)",
    maxWidth: 540,
    margin: "0 auto",
    position: "relative",
  };

  return (
    <div style={containerStyle}>
      {screen === "home" && <HomeScreen onNav={setScreen} />}

      {screen === "equipos" && (
        <EquiposScreen
          equipos={equipos}
          asignaciones={asignaciones}
          onBack={goHome}
          onResortear={() => setEquipos(sortear())}
        />
      )}

      {screen === "timer" && (
        <TimerScreen
          faseActual={faseActual}
          setFaseActual={setFaseActual}
          timerSeg={timerSeg}
          setTimerSeg={setTimerSeg}
          timerRunning={timerRunning}
          setTimerRunning={setTimerRunning}
          onBack={goHome}
        />
      )}

      {screen === "desafios" && (
        <DesafiosScreen
          equipos={equipos}
          asignaciones={asignaciones}
          setAsignaciones={setAsignaciones}
          sorpresaSel={sorpresaSel}
          setSorpresaSel={setSorpresaSel}
          onBack={goHome}
        />
      )}

      {screen === "roles" && <RolesScreen onBack={goHome} />}

      {screen === "puntos" && (
        <PuntosScreen scores={scores} setScores={setScores} onBack={goHome} />
      )}

      {screen === "ayuda" && <AyudaScreen onBack={goHome} />}
    </div>
  );
}
