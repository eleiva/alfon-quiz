export type PersonalityProfile =
  | "creativo"
  | "racional"
  | "logico"
  | "innovador";

export type PersonalityOption = {
  text: string;
  profile: PersonalityProfile;
};

export type PersonalityQuestion = {
  id: number;
  question: string;
  options: PersonalityOption[];
};

export type ProfileResult = {
  id: PersonalityProfile;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  strengths: string[];
  techIcon: string;
  color: string;
  famousExample: string;
  shareText: string;
};

// ─── Questions ────────────────────────────────────────────────────────────────

export const personalityQuestions: PersonalityQuestion[] = [
  {
    id: 1,
    question: "Cuando aprendés una tecnología nueva, ¿qué hacés primero?",
    options: [
      {
        text: "Me pongo a experimentar y a jugar con ella hasta entender cómo se siente usarla.",
        profile: "creativo",
      },
      {
        text: "Leo la documentación oficial, reviso benchmarks y comparo con alternativas.",
        profile: "racional",
      },
      {
        text: "Imagino cómo podría usarla para disrumpir algo que existe o crear algo completamente nuevo.",
        profile: "innovador",
      },
      {
        text: "Investigo cómo funciona por dentro: la arquitectura, los algoritmos, el motor.",
        profile: "logico",
      },
    ],
  },
  {
    id: 2,
    question: "Te dan un proyecto libre de tecnología. ¿Por dónde empezás?",
    options: [
      {
        text: "Diseño la arquitectura de datos y el modelo del sistema antes de escribir una sola línea.",
        profile: "logico",
      },
      {
        text: "Investigo si hay alguna tecnología emergente que pueda hacer el proyecto 10 veces mejor.",
        profile: "innovador",
      },
      {
        text: "Empiezo bocetando la interfaz: cómo se va a ver, cómo se va a sentir.",
        profile: "creativo",
      },
      {
        text: "Analizo los requerimientos y las restricciones antes de tomar cualquier decisión.",
        profile: "racional",
      },
    ],
  },
  {
    id: 3,
    question:
      "¿Qué parte del desarrollo de una app te genera más satisfacción?",
    options: [
      {
        text: "Cuando las métricas confirman que la app rinde exactamente como fue diseñada.",
        profile: "racional",
      },
      {
        text: "El diseño visual, las animaciones, esa sensación de que todo se ve y se mueve bien.",
        profile: "creativo",
      },
      {
        text: "Cuando todos los tests pasan, el código está limpio y no hay deuda técnica.",
        profile: "logico",
      },
      {
        text: "Cuando me doy cuenta de que la idea podría convertirse en un producto que la gente no sabía que necesitaba.",
        profile: "innovador",
      },
    ],
  },
  {
    id: 4,
    question:
      "Un colega propone una solución que funciona pero es poco elegante. ¿Qué hacés?",
    options: [
      {
        text: "Evalúo si la deuda técnica que genera justifica el costo de mejorarlo ahora.",
        profile: "racional",
      },
      {
        text: "Propongo reemplazarla con un enfoque más moderno que resuelva el problema de raíz.",
        profile: "innovador",
      },
      {
        text: "La refactorizo: la calidad del código importa a largo plazo y no hay excusas.",
        profile: "logico",
      },
      {
        text: "Sugiero un rediseño que sea funcional y además elegante, porque ambas cosas pueden coexistir.",
        profile: "creativo",
      },
    ],
  },
  {
    id: 5,
    question: "¿Con qué frase te identificás más?",
    options: [
      {
        text: '"Primero medí, después optimizá."',
        profile: "racional",
      },
      {
        text: '"Todo problema complejo tiene una solución simple si lo descomponés bien."',
        profile: "logico",
      },
      {
        text: '"El mejor código es el que no necesitás escribir porque usás la herramienta correcta."',
        profile: "innovador",
      },
      {
        text: '"La tecnología debería ser tan intuitiva que no necesite manual."',
        profile: "creativo",
      },
    ],
  },
  {
    id: 6,
    question:
      "Si tuvieras que elegir una carrera en tech, ¿cuál elegiría tu perfil?",
    options: [
      {
        text: "Tech Entrepreneur / Startup Founder: construir desde cero algo que cambie el mercado.",
        profile: "innovador",
      },
      {
        text: "UX Designer / Product Designer: crear experiencias digitales que las personas amen.",
        profile: "creativo",
      },
      {
        text: "Software Engineer / Backend Developer: construir sistemas robustos, eficientes y escalables.",
        profile: "logico",
      },
      {
        text: "Data Scientist / Business Intelligence: transformar datos en decisiones estratégicas.",
        profile: "racional",
      },
    ],
  },
  {
    id: 7,
    question: "¿Cómo reaccionás ante un bug difícil de encontrar?",
    options: [
      {
        text: "Reviso logs y datos de performance para identificar el patrón que delata el error.",
        profile: "racional",
      },
      {
        text: "Pienso si este bug es una señal de que la arquitectura necesita ser repensada.",
        profile: "innovador",
      },
      {
        text: "Pruebo un enfoque poco convencional que nadie más consideró, a veces funciona.",
        profile: "creativo",
      },
      {
        text: "Lo depuro paso a paso, de forma sistemática, hasta aislar exactamente dónde está.",
        profile: "logico",
      },
    ],
  },
  {
    id: 8,
    question: "¿Qué tecnología emergente te genera más curiosidad?",
    options: [
      {
        text: "Computación cuántica y sus implicancias para los algoritmos que usamos hoy.",
        profile: "logico",
      },
      {
        text: "Inteligencia General Artificial y lo que viene después de los LLMs.",
        profile: "innovador",
      },
      {
        text: "Big Data y analítica predictiva para tomar mejores decisiones en tiempo real.",
        profile: "racional",
      },
      {
        text: "Spatial computing e interfaces inmersivas: AR/VR como nueva capa de la realidad.",
        profile: "creativo",
      },
    ],
  },
  {
    id: 9,
    question:
      "Estás en una reunión y el equipo está atascado en una decisión técnica. ¿Cuál es tu rol natural?",
    options: [
      {
        text: "Visualizo las opciones de forma clara para que todos entiendan los trade-offs.",
        profile: "creativo",
      },
      {
        text: "Traigo datos y casos comparables para fundamentar la decisión con evidencia.",
        profile: "racional",
      },
      {
        text: "Descompongo la decisión en sus componentes lógicos y dependencias para clarificar el camino.",
        profile: "logico",
      },
      {
        text: "Replanteo el problema desde otro ángulo que el equipo no había considerado.",
        profile: "innovador",
      },
    ],
  },
  {
    id: 10,
    question: "¿Qué describís cuando te preguntan qué hacés en tecnología?",
    options: [
      {
        text: '"Resuelvo problemas complejos de la forma más eficiente posible."',
        profile: "logico",
      },
      {
        text: '"Trabajo en construir el futuro."',
        profile: "innovador",
      },
      {
        text: '"Analizo sistemas y tomo decisiones basadas en datos."',
        profile: "racional",
      },
      {
        text: '"Creo experiencias digitales que conectan con las personas."',
        profile: "creativo",
      },
    ],
  },
  {
    id: 11,
    question: "¿Qué libro o recurso de tech preferirías leer?",
    options: [
      {
        text: '"The Design of Everyday Things" de Don Norman — diseño centrado en las personas.',
        profile: "creativo",
      },
      {
        text: '"Introduction to Algorithms" de Cormen — la biblia de los algoritmos.',
        profile: "logico",
      },
      {
        text: '"The Innovator\'s Dilemma" de Christensen — por qué las grandes empresas fallan ante la disrupción.',
        profile: "innovador",
      },
      {
        text: '"Designing Data-Intensive Applications" de Kleppmann — sistemas distribuidos en profundidad.',
        profile: "racional",
      },
    ],
  },
  {
    id: 12,
    question:
      "Cuando algo tecnológico no te funciona, ¿cuál es tu primer instinto?",
    options: [
      {
        text: "Me pregunto si esa herramienta o plataforma sigue siendo la adecuada para el problema.",
        profile: "innovador",
      },
      {
        text: "Leo el mensaje de error con atención y rastro el flujo de ejecución hacia atrás.",
        profile: "logico",
      },
      {
        text: "Busco reportes de error similares y reviso Stack Overflow para soluciones documentadas.",
        profile: "racional",
      },
      {
        text: "Pruebo un enfoque completamente diferente, a veces la solución está en otro camino.",
        profile: "creativo",
      },
    ],
  },
  {
    id: 13,
    question: "¿Cómo describís tu relación con la documentación técnica?",
    options: [
      {
        text: "La trato como una especificación: tiene que ser precisa, medible y sin ambigüedades.",
        profile: "racional",
      },
      {
        text: "La hago visual y llena de ejemplos para que cualquiera pueda entenderla.",
        profile: "creativo",
      },
      {
        text: "La escribo porque el yo del futuro y mis compañeros la van a necesitar.",
        profile: "logico",
      },
      {
        text: "Escribo lo mínimo indispensable y prefiero sistemas que se documenten solos.",
        profile: "innovador",
      },
    ],
  },
  {
    id: 14,
    question:
      "Un cliente pide una feature complicada con plazo ajustado. ¿Qué proponés?",
    options: [
      {
        text: "Diseño una implementación mínima pero correcta que pueda extenderse después.",
        profile: "logico",
      },
      {
        text: "Prototipo una versión simplificada para validar la idea antes del desarrollo completo.",
        profile: "creativo",
      },
      {
        text: "Sugiero una solución usando IA o una API existente que entregue el 80% del valor en el 20% del tiempo.",
        profile: "innovador",
      },
      {
        text: "Defino el scope con precisión, separo lo esencial de lo opcional, y comprometo solo lo que los datos confirman que es viable.",
        profile: "racional",
      },
    ],
  },
  {
    id: 15,
    question: "¿Cuál de estos proyectos preferirías trabajar?",
    options: [
      {
        text: "Construir un motor de búsqueda eficiente desde cero, optimizando cada componente.",
        profile: "logico",
      },
      {
        text: "Desarrollar una startup de IA que resuelva un problema que todavía no existe como producto.",
        profile: "innovador",
      },
      {
        text: "Rediseñar la experiencia digital de una institución cultural para acercarla a la gente.",
        profile: "creativo",
      },
      {
        text: "Crear un dashboard que ayude a una empresa a entender sus KPIs en tiempo real.",
        profile: "racional",
      },
    ],
  },
  {
    id: 16,
    question: "¿Qué te molesta más de un producto tecnológico?",
    options: [
      {
        text: "Que esté lleno de bugs y deuda técnica que frena todo el desarrollo.",
        profile: "logico",
      },
      {
        text: "Que funcione pero sea feo o confuso de usar.",
        profile: "creativo",
      },
      {
        text: "Que resuelva el problema de ayer en vez de anticipar el de mañana.",
        profile: "innovador",
      },
      {
        text: "Que tenga features que nadie usa en vez de optimizar lo que realmente importa.",
        profile: "racional",
      },
    ],
  },
  {
    id: 17,
    question: "¿Cómo aprendés mejor tecnología?",
    options: [
      {
        text: "Experimentando con herramientas nuevas antes de que sean mainstream.",
        profile: "innovador",
      },
      {
        text: "Trabajando en algo con un output visual o interactivo que pueda mostrarle a alguien.",
        profile: "creativo",
      },
      {
        text: "Siguiendo cursos estructurados con objetivos claros y métricas de progreso.",
        profile: "racional",
      },
      {
        text: "Construyendo un proyecto desde cero para entender cada componente profundamente.",
        profile: "logico",
      },
    ],
  },
  {
    id: 18,
    question: "¿Cuál es tu superpoder en un equipo de tecnología?",
    options: [
      {
        text: "Encontrar la causa raíz de problemas que nadie más puede resolver.",
        profile: "logico",
      },
      {
        text: "Traducir conceptos técnicos complejos en algo que todos entienden.",
        profile: "creativo",
      },
      {
        text: "Ver oportunidades que todavía nadie más notó.",
        profile: "innovador",
      },
      {
        text: "Mantener al equipo anclado en evidencia y evitar decisiones costosas.",
        profile: "racional",
      },
    ],
  },
  {
    id: 19,
    question: "¿Cómo definirías el éxito de un proyecto tech?",
    options: [
      {
        text: "Que los usuarios lo amen y se convierta en parte de su vida cotidiana.",
        profile: "creativo",
      },
      {
        text: "Que sea mantenible, escalable y que otros desarrolladores puedan trabajar con él fácilmente.",
        profile: "logico",
      },
      {
        text: "Que cambie un comportamiento o cree un mercado que antes no existía.",
        profile: "innovador",
      },
      {
        text: "Que cumpla sus KPIs y entregue un ROI medible y justificable.",
        profile: "racional",
      },
    ],
  },
  {
    id: 20,
    question:
      "¿Con qué personaje histórico de la tecnología te identificás más?",
    options: [
      {
        text: "Nikola Tesla — décadas adelante de su tiempo, un visionario incomprendido que imaginó el futuro.",
        profile: "innovador",
      },
      {
        text: "Ada Lovelace — la primera programadora, pura lógica aplicada a las máquinas.",
        profile: "logico",
      },
      {
        text: "Jony Ive — el diseño que hace que la tecnología se sienta humana.",
        profile: "creativo",
      },
      {
        text: "Bill Gates — sistemático, orientado a datos, construyó sistemas que escalaron al mundo.",
        profile: "racional",
      },
    ],
  },
];

// ─── Profile Results ───────────────────────────────────────────────────────────

export const profileResults: Record<PersonalityProfile, ProfileResult> = {
  creativo: {
    id: "creativo",
    emoji: "🎨",
    title: "El Creativo Digital",
    tagline: "Ves posibilidades donde otros ven problemas",
    description:
      "Tu mente conecta ideas de mundos distintos y las transforma en experiencias únicas. En tecnología, sos el que imagina interfaces hermosas, narrativas visuales y soluciones que sorprenden. No te conformás con que algo funcione: tiene que sentirse bien.",
    strengths: [
      "Diseño UX/UI",
      "Storytelling digital",
      "Prototipado rápido",
      "Pensamiento lateral",
    ],
    techIcon: "🖥️",
    color: "var(--naranja)",
    famousExample: "Steve Jobs",
    shareText:
      "Soy El Creativo Digital 🎨 — en tecnología, combino diseño e innovación para crear experiencias que sorprenden. ¿Cuál es tu estilo tech?",
  },
  racional: {
    id: "racional",
    emoji: "📊",
    title: "El Analista Racional",
    tagline: "Los datos no mienten, y vos sabés leerlos",
    description:
      "Tomás decisiones basadas en evidencia, no en intuición. Sos el tipo de persona que antes de implementar algo revisa benchmarks, analiza casos de uso y evalúa el costo-beneficio. En tecnología sos el arquitecto que garantiza que los sistemas escalen.",
    strengths: [
      "Análisis de datos",
      "Arquitectura de sistemas",
      "Toma de decisiones",
      "Documentación técnica",
    ],
    techIcon: "🗄️",
    color: "var(--azul)",
    famousExample: "Linus Torvalds",
    shareText:
      "Soy El Analista Racional 📊 — tomo decisiones tecnológicas basadas en datos y evidencia. ¿Cuál es tu estilo tech?",
  },
  logico: {
    id: "logico",
    emoji: "🧩",
    title: "El Lógico Sistemático",
    tagline: "Si tiene una solución, tiene que ser la óptima",
    description:
      "Sos el que no descansa hasta encontrar la solución más eficiente. Los algoritmos, los patrones y la optimización son tu lenguaje natural. Cuando todos ven un problema, vos ya estás pensando en tres formas distintas de resolverlo.",
    strengths: [
      "Algoritmia",
      "Debugging",
      "Optimización de código",
      "Pensamiento estructurado",
    ],
    techIcon: "⚙️",
    color: "var(--verde-claro)",
    famousExample: "Grace Hopper",
    shareText:
      "Soy El Lógico Sistemático 🧩 — encuentro siempre la solución más eficiente y elegante a los problemas tech. ¿Cuál es tu estilo tech?",
  },
  innovador: {
    id: "innovador",
    emoji: "🚀",
    title: "El Innovador Visionario",
    tagline: "Pensás en lo que todavía no existe",
    description:
      "Te aburrís rápido con lo establecido. Siempre estás mirando qué viene después: IA, blockchain, interfaces del futuro. Sos el que propone ideas que suenan locas hasta que alguien las construye y cambian el mundo.",
    strengths: [
      "Visión estratégica",
      "Tecnologías emergentes",
      "Evangelización tech",
      "Disruption",
    ],
    techIcon: "🌐",
    color: "var(--violeta)",
    famousExample: "Elon Musk",
    shareText:
      "Soy El Innovador Visionario 🚀 — siempre pienso en las tecnologías del futuro antes de que existan. ¿Cuál es tu estilo tech?",
  },
};

// ─── Calculate Profile ─────────────────────────────────────────────────────────

/**
 * Counts the frequency of each profile in the answers array and returns the
 * most frequent one. Ties are broken by priority:
 *   innovador > creativo > racional > logico
 */
export function calculateProfile(
  answers: PersonalityProfile[],
): PersonalityProfile {
  const counts: Record<PersonalityProfile, number> = {
    innovador: 0,
    creativo: 0,
    racional: 0,
    logico: 0,
  };

  for (const answer of answers) {
    counts[answer]++;
  }

  // Tie-breaking order: innovador > creativo > racional > logico
  const priority: PersonalityProfile[] = [
    "innovador",
    "creativo",
    "racional",
    "logico",
  ];

  let winner: PersonalityProfile = priority[0];
  for (const profile of priority) {
    if (counts[profile] > counts[winner]) {
      winner = profile;
    }
  }

  return winner;
}
