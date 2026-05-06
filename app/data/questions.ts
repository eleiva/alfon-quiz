export type Question = {
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type Difficulty = "normal" | "hard";

export type FillQuestion = {
  id: number;
  category: string;
  question: string; // the prompt text
  answer: string; // canonical correct answer
  acceptedAnswers: string[]; // all accepted variants (lowercase, trimmed)
  hint: string; // shown after answering
};

export const bd2SectionB: FillQuestion[] = [
  {
    id: 1,
    category: "Normalización",
    question:
      "🔄 Llevar una tabla a 3FN eliminando dependencias transitivas moviendo atributos a su propia tabla se llama:\n💡 Pista: empieza con N, tiene 14 letras.",
    answer: "Normalización",
    acceptedAnswers: [
      "normalización",
      "normalizacion",
      "normalizar",
      "3fn",
      "tercera forma normal",
    ],
    hint: "Es el proceso de organizar las tablas de una BD eliminando redundancias y dependencias no deseadas. Tiene 14 letras: N-O-R-M-A-L-I-Z-A-C-I-Ó-N.",
  },
  {
    id: 2,
    category: "Window Functions",
    question:
      "🪟 En SQL, la cláusula que define el conjunto de filas sobre las que opera una window function se escribe: OVER (______ BY columna)\n💡 Pista: es la misma palabra que se usa para dividir grupos en GROUP BY — 3 letras.",
    answer: "PARTITION",
    acceptedAnswers: ["partition", "partition by"],
    hint: "OVER (PARTITION BY columna ORDER BY ...) — PARTITION divide el resultado en grupos para que la window function opere dentro de cada uno. 9 letras: P-A-R-T-I-T-I-O-N.",
  },
  {
    id: 3,
    category: "Triggers",
    question:
      "⚡ En PostgreSQL, la variable especial que representa el estado de la fila ANTES de un UPDATE en un trigger se llama:\n💡 Pista: 3 letras, antónimo de NEW.",
    answer: "OLD",
    acceptedAnswers: ["old", "old record", "old."],
    hint: "OLD contiene los valores anteriores al cambio. NEW contiene los nuevos valores que se van a escribir. 3 letras: O-L-D.",
  },
  {
    id: 4,
    category: "Transacciones",
    question:
      "💾 El comando que deshace parcialmente una transacción hasta un punto marcado, SIN cerrar la transacción, es:\n💡 Pista: empieza con ROLLBACK, tiene 3 palabras.",
    answer: "ROLLBACK TO SAVEPOINT",
    acceptedAnswers: [
      "rollback to savepoint",
      "rollback to",
      "savepoint",
      "rollback to sp",
    ],
    hint: "SAVEPOINT marca un punto intermedio. ROLLBACK TO SAVEPOINT vuelve a ese punto sin deshacer toda la transacción. La sintaxis completa tiene 3 palabras.",
  },
  {
    id: 5,
    category: "ACID",
    question:
      "🔒 La propiedad ACID que garantiza que dos transacciones concurrentes NO se ven entre sí hasta que hacen COMMIT se llama:\n💡 Pista: empieza con A, 11 letras, es la I de ACID.",
    answer: "Aislamiento",
    acceptedAnswers: [
      "aislamiento",
      "isolation",
      "isolación",
      "aislación",
      "i de acid",
    ],
    hint: "La I de ACID: Isolation / Aislamiento. Las transacciones no se ven entre sí hasta el COMMIT. 11 letras: A-I-S-L-A-M-I-E-N-T-O.",
  },
  {
    id: 6,
    category: "Normalización — Problema 1",
    question:
      "🏗️ Problema 1a) La tabla TURNO(turno_id, paciente_id, paciente_nombre, paciente_tel, medico_id, medico_nombre, especialidad, fecha, hora, consultorio, duracion_min, estado) tiene como dependencias: paciente_id → paciente_nombre, paciente_tel  y  medico_id → medico_nombre, especialidad. Estos atributos NO dependen directamente de la PK (turno_id). ¿En qué Forma Normal está? Escribí: 1FN, 2FN o 3FN.\n💡 Pista: hay dependencias transitivas (atributos que dependen de un no-clave), eso viola la _FN.",
    answer: "1FN",
    acceptedAnswers: ["1fn", "primera forma normal", "1° fn", "primera fn"],
    hint: "Está en 1FN: los datos son atómicos y hay PK, pero existen dependencias transitivas (paciente_nombre depende de paciente_id, no de turno_id). Eso viola la 3FN — el esquema actual solo cumple 1FN.",
  },
  {
    id: 7,
    category: "Normalización — Problema 1",
    question:
      "🗑️ Problema 1b) Si se borra el único turno del paciente P001 de la tabla TURNO, se pierden para siempre su nombre y teléfono. ¿Cómo se llama este tipo de anomalía? Elegí la opción correcta.\nA) Anomalía de actualización\nB) Anomalía de borrado\nC) Anomalía de inserción\nD) Inconsistencia referencial\n💡 Pista: la operación que causó el problema fue un DELETE — 6 letras, empieza con B.",
    answer: "B",
    acceptedAnswers: [
      "b",
      "anomalía de borrado",
      "anomalia de borrado",
      "borrado",
      "eliminación",
      "anomalía de eliminación",
      "delete anomaly",
    ],
    hint: "Es una anomalía de BORRADO (delete anomaly): al eliminar el único turno de un paciente, se pierde información del paciente que no debería estar en esa tabla. La solución es separar PACIENTES en su propia tabla.",
  },
  {
    id: 8,
    category: "Normalización — Problema 1",
    question:
      "📐 Problema 1c) Al descomponer TURNO en 3FN, obtenemos 3 tablas. Completá los nombres separados por comas (en cualquier orden):\n💡 Pista: una tabla por cada entidad independiente — paciente, médico, y el turno en sí.",
    answer: "TURNOS, PACIENTES, MEDICOS",
    acceptedAnswers: [
      "turnos, pacientes, medicos",
      "turnos, pacientes, médicos",
      "pacientes, medicos, turnos",
      "pacientes, médicos, turnos",
      "turno, paciente, medico",
      "turno, paciente, médico",
      "turno paciente medico",
      "pacientes medicos turnos",
    ],
    hint: "3 tablas: PACIENTES(paciente_id PK, nombre, tel) · MEDICOS(medico_id PK, nombre, especialidad) · TURNOS(turno_id PK, paciente_id FK, medico_id FK, fecha, hora, consultorio, duracion_min, estado). Cada tabla tiene una sola entidad y sus atributos dependen solo de su PK.",
  },
];

export const questions: Question[] = [
  {
    // Q1 — correct originally index 1 → placed at index 1
    category: "Componentes del ambiente",
    question: "¿Qué son los componentes bióticos de un ambiente?",
    options: [
      "Todo lo que no tiene vida, como el agua y los minerales",
      "Todo lo que es un ser vivo o proviene de ellos",
      "Solo las plantas y los animales visibles",
      "Los minerales que forman rocas",
    ],
    correct: 1,
    explanation:
      "Los componentes bióticos corresponden a todo lo que es un ser vivo o proviene de ellos: plantas, animales, hongos, microorganismos y sus desechos.",
  },
  {
    // Q2 — correct originally index 1 → placed at index 3
    category: "Niveles de organización",
    question: "¿Cuál es la diferencia entre una población y una comunidad?",
    options: [
      "La comunidad es más pequeña que la población",
      "La población incluye varias especies; la comunidad, solo una",
      "Son términos sinónimos en ecología",
      "La población reúne individuos de una misma especie; la comunidad reúne varias poblaciones",
    ],
    correct: 3,
    explanation:
      "La población es el conjunto de individuos de una misma especie en un área. La comunidad es el conjunto de todas las poblaciones que habitan e interactúan en esa área.",
  },
  {
    // Q3 — correct originally index 1 → placed at index 0
    category: "Productores",
    question: "¿Por qué los productores son fundamentales en un ecosistema?",
    options: [
      "Porque producen materiales complejos como glucosa y almidón a partir de sustancias simples",
      "Porque se alimentan de otros animales y regulan su número",
      "Porque descomponen los restos de otros organismos",
      "Porque compiten con los consumidores primarios",
    ],
    correct: 0,
    explanation:
      "Los productores (como las plantas) producen materiales complejos (glucosa, almidón) a partir de agua, CO₂ y luz solar mediante la fotosíntesis, siendo la base energética del ecosistema.",
  },
  {
    // Q4 — correct originally index 1 → placed at index 2
    category: "Productores",
    question:
      "El fitoplancton es un ejemplo de productor. ¿Qué importancia tiene en los océanos?",
    options: [
      "Es el principal depredador del kril",
      "Solo vive en aguas dulces como ríos y lagos",
      "Constituye el alimento del kril, que a su vez alimenta ballenas y otras especies",
      "Es un descomponedor microscópico",
    ],
    correct: 2,
    explanation:
      "El fitoplancton es microscópico y constituye el alimento del kril, que forma parte de la nutrición de peces y ballenas, siendo esencial para las cadenas marinas.",
  },
  {
    // Q5 — correct originally index 2 → placed at index 0
    category: "Consumidores",
    question:
      "¿Cómo se llaman los consumidores que se alimentan directamente de los productores?",
    options: [
      "Consumidores primarios",
      "Consumidores secundarios",
      "Consumidores terciarios",
      "Descomponedores herbívoros",
    ],
    correct: 0,
    explanation:
      "Los consumidores primarios son los que se alimentan directamente de los productores (plantas). Son el primer nivel de consumo en una cadena trófica.",
  },
  {
    // Q6 — correct originally index 1 → placed at index 3
    category: "Consumidores",
    question: "¿Cuál de los siguientes es un ejemplo de consumidor omnívoro?",
    options: [
      "Un animal que solo come plantas",
      "Un animal que solo come carne",
      "Un hongo que descompone materia orgánica",
      "Un animal que come tanto productores como otros consumidores",
    ],
    correct: 3,
    explanation:
      "Los omnívoros son consumidores que se alimentan tanto de productores (plantas) como de otros animales consumidores.",
  },
  {
    // Q7 — correct originally index 2 → placed at index 1
    category: "Descomponedores",
    question:
      "¿Cuál es la función principal de los descomponedores en un ecosistema?",
    options: [
      "Realizar la fotosíntesis en ausencia de luz",
      "Desintegrar los restos de organismos y devolver los materiales al aire, suelo y agua",
      "Cazar y alimentarse de consumidores secundarios",
      "Competir con los productores por la luz solar",
    ],
    correct: 1,
    explanation:
      "Los descomponedores (hongos, bacterias, etc.) degradan los restos de seres vivos y materiales simples, devolviéndolos al aire, suelo y agua para que sean aprovechados por los productores.",
  },
  {
    // Q8 — correct originally index 1 → placed at index 2
    category: "Descomponedores",
    question: "¿Cuáles son los principales descomponedores en un ecosistema?",
    options: [
      "Pumas, zorros y águilas",
      "Liebres, ciervos y carpinchos",
      "Hongos, bacterias y algunos invertebrados",
      "Sardinas, anchoas y pingüinos",
    ],
    correct: 2,
    explanation:
      "Los principales descomponedores son hongos, bacterias y otros microorganismos, además de algunos invertebrados como lombrices e insectos.",
  },
  {
    // Q9 — correct originally index 1 → placed at index 0
    category: "Cadenas y redes alimentarias",
    question: "¿Qué representa la flecha en una cadena alimentaria?",
    options: [
      "La dirección del flujo de energía: apunta hacia quien consume",
      "La dirección del movimiento físico de los animales",
      "La relación de competencia entre dos especies",
      "El orden cronológico en que aparecieron las especies",
    ],
    correct: 0,
    explanation:
      "En las redes y cadenas alimentarias, la flecha señala hacia la especie que consume, indicando hacia dónde va la energía.",
  },
  {
    // Q10 — correct originally index 1 → placed at index 3
    category: "Cadenas y redes alimentarias",
    question:
      "En la cadena: pasto ovillo → liebre pampeana → zorro pampeano → puma, ¿qué rol cumple la liebre?",
    options: [
      "Productora y consumidora primaria a la vez",
      "Consumidora secundaria (carnívora)",
      "Descomponedora del ecosistema pampeano",
      "Consumidora primaria (herbívora)",
    ],
    correct: 3,
    explanation:
      "La liebre pampeana se alimenta del pasto ovillo (productor), por lo que es una consumidora primaria o herbívora.",
  },
  {
    // Q11 — correct originally index 1 → placed at index 2
    category: "Cadenas y redes alimentarias",
    question:
      "¿Por qué una red alimentaria aporta más información que una cadena alimentaria?",
    options: [
      "Porque es más simple y fácil de entender",
      "Porque elimina a los productores de la representación",
      "Porque muestra con mayor precisión las múltiples relaciones tróficas de un ecosistema",
      "Porque solo incluye a los depredadores más importantes",
    ],
    correct: 2,
    explanation:
      "Las redes alimentarias son fragmentos del ecosistema real que muestran múltiples relaciones tróficas con mayor precisión que una cadena simple.",
  },
  {
    // Q12 — correct originally index 1 → placed at index 0
    category: "Relaciones interespecíficas",
    question: "¿Cuál es la definición correcta de depredación?",
    options: [
      "Un individuo de una especie caza y se alimenta de un individuo de otra especie",
      "Dos especies compiten por un mismo recurso limitado",
      "Una especie se beneficia sin afectar a la otra",
      "Un parásito vive dentro de su huésped sin matarlo",
    ],
    correct: 0,
    explanation:
      "En la depredación, el depredador caza a la presa y se alimenta de ella. Ejemplo: los pumas cazan guanacos en la Patagonia.",
  },
  {
    // Q13 — correct originally index 2 → placed at index 1
    category: "Relaciones interespecíficas",
    question:
      "Los guanacos y las ovejas compiten por el pasto en la Patagonia. ¿Qué tipo de relación es esta?",
    options: ["Mutualismo", "Competencia", "Parasitismo", "Comensalismo"],
    correct: 1,
    explanation:
      "Es competencia: dos o más especies disputan un recurso limitado (en este caso, el pasto). Ninguna se beneficia de la otra; ambas pueden verse perjudicadas.",
  },
  {
    // Q14 — correct originally index 1 → placed at index 3
    category: "Relaciones interespecíficas",
    question:
      "Las abejas polinizan flores de cardos y obtienen néctar y polen. ¿Qué tipo de relación es esta?",
    options: [
      "Parasitismo, porque la abeja daña la flor",
      "Amensalismo, porque la planta es perjudicada",
      "Comensalismo, porque solo la abeja se beneficia",
      "Mutualismo, porque ambas especies se benefician",
    ],
    correct: 3,
    explanation:
      "Es mutualismo: la abeja obtiene alimento (néctar y polen) y la planta se reproduce gracias a la polinización. Ambas se benefician.",
  },
  {
    // Q15 — correct originally index 3 → placed at index 0
    category: "Relaciones interespecíficas",
    question:
      "Los horneros construyen sus nidos en árboles donde viven los tucanes, obteniendo protección sin afectarlos. ¿Qué relación es esta?",
    options: ["Comensalismo", "Mutualismo", "Depredación", "Parasitismo"],
    correct: 0,
    explanation:
      "Es comensalismo: los horneros se benefician (protección) y los tucanes no se ven afectados. Solo una especie obtiene ventaja.",
  },
  {
    // Q16 — correct originally index 1 → placed at index 2
    category: "Relaciones interespecíficas",
    question:
      "Las garrapatas parasitan ciervos en la Mesopotamia alimentándose de su sangre. ¿Qué característica distingue al parasitismo?",
    options: [
      "El parásito mata inmediatamente al huésped",
      "El huésped no sufre ninguna consecuencia",
      "El parásito se beneficia y el huésped se debilita, pero no necesariamente muere",
      "Ambas especies se ven perjudicadas por igual",
    ],
    correct: 2,
    explanation:
      "En el parasitismo el parásito vive dentro o adherido al huésped, se nutre de él debilitándolo, pero generalmente no lo mata de inmediato.",
  },
  {
    // Q17 — correct originally index 1 → placed at index 1
    category: "Relaciones interespecíficas",
    question:
      "El ganado vacuno pisa y daña el hábitat de los ñandúes en la pampa sin obtener ningún beneficio de ello. ¿Qué tipo de relación es esta?",
    options: [
      "Competencia, porque compiten por el espacio",
      "Amensalismo, porque una especie perjudica a la otra sin obtener beneficio",
      "Comensalismo, porque el ganado no se ve afectado",
      "Mutualismo negativo",
    ],
    correct: 1,
    explanation:
      "Es amensalismo: los individuos de una especie perjudican a los de otra sin obtener ningún beneficio de ello.",
  },
  {
    // Q18 — correct originally index 1 → placed at index 3
    category: "Ecosistema",
    question: "¿Qué forma un ecosistema?",
    options: [
      "Solo los seres vivos que habitan en un área",
      "Únicamente los componentes abióticos como el agua y el suelo",
      "Solo las cadenas alimentarias de un bioma",
      "Todos los componentes de un ambiente (bióticos y abióticos) más los seres vivos que los habitan e interactúan en él",
    ],
    correct: 3,
    explanation:
      "El ecosistema está formado por todos los componentes (bióticos y abióticos) de un ambiente y los seres vivos relacionados. 'Eco' significa 'casa' o 'morada vital'.",
  },
  {
    // Q19 — correct originally index 1 → placed at index 2
    category: "Niveles de organización",
    question:
      "Un carpincho es un ejemplo de ____. Todos los carpinchos del delta del Río de la Plata forman una ____.",
    options: [
      "Comunidad / ecosistema",
      "Población / comunidad",
      "Individuo / población",
      "Especie / individuo",
    ],
    correct: 2,
    explanation:
      "Un carpincho es un individuo (organismo que cumple funciones vitales). El conjunto de todos los carpinchos de una misma área geográfica forma una población.",
  },
  {
    // Q20 — correct originally index 2 → placed at index 0
    category: "Cadenas y redes alimentarias",
    question:
      "En la red alimentaria del libro (pasto → ciervo de los pantanos → águila coronada → puma), ¿qué nivel trófico ocupa el águila coronada?",
    options: [
      "Consumidora secundaria",
      "Productora",
      "Consumidora primaria",
      "Descomponedora",
    ],
    correct: 0,
    explanation:
      "El águila coronada se alimenta del ciervo de los pantanos (consumidor primario), por lo tanto el águila es consumidora secundaria.",
  },
];

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const hardQuestions: Question[] = [
  {
    category: "Relaciones interespecíficas",
    question:
      "Los tordos se alimentan de los parásitos que crecen sobre la piel de los caimanes en los Esteros del Iberá. ¿Qué tipo de relación interespecífica es esta y por qué NO es comensalismo?",
    options: [
      "Es parasitismo porque los tordos dañan la piel del caimán",
      "Es mutualismo porque ambas especies se benefician: el tordo obtiene alimento y el caimán queda libre de parásitos",
      "Es comensalismo porque solo el tordo se beneficia y el caimán es indiferente",
      "Es amensalismo porque el tordo elimina parásitos que el caimán necesita",
    ],
    correct: 1,
    explanation:
      "Es mutualismo. El tordo obtiene alimento (los parásitos) y el caimán se beneficia al liberarse de ellos. En el comensalismo, una especie se beneficia y la otra NO se ve afectada, pero aquí el caimán sí se beneficia activamente.",
  },
  {
    category: "Cadenas y redes alimentarias",
    question:
      "En la red alimentaria del libro (pasto ovillo → liebre pampeana → zorro pampeano → puma), si se eliminara completamente la población de zorros pampeanos, ¿cuál sería el efecto más probable a corto plazo?",
    options: [
      "El puma desaparecería por falta de alimento y la liebre aumentaría sin control",
      "La liebre pampeana aumentaría su población y el puma debería cambiar de presa o disminuir",
      "El pasto ovillo desaparecería por sobreconsumo de liebres y el puma aumentaría",
      "No habría cambios porque el puma puede alimentarse directamente del pasto",
    ],
    correct: 1,
    explanation:
      "Sin zorros, la liebre pampeana perdería un depredador y su población crecería (sobrepastorearía el pasto). El puma, que depende del zorro como eslabón intermedio en esa cadena, se vería forzado a buscar presas alternativas o su población decrecería. Esto ilustra cómo la eliminación de un nodo afecta toda la red.",
  },
  {
    category: "Niveles de organización",
    question:
      "¿Por qué las hojas caídas de un árbol son un componente BIÓTICO y no abiótico, aunque ya no estén vivas?",
    options: [
      "Porque siguen realizando fotosíntesis en el suelo",
      "Porque provienen de un ser vivo, y la definición de biótico incluye todo lo que es un ser vivo O proviene de ellos",
      "Porque los descomponedores las convierten en seres vivos nuevamente",
      "En realidad son abióticas porque ya no tienen vida",
    ],
    correct: 1,
    explanation:
      "El libro aclara explícitamente que los componentes bióticos corresponden a 'todo lo que es un ser vivo O proviene de ellos', incluyendo los desechos y restos. Las hojas caídas provienen de un ser vivo, por lo tanto son bióticas. Este es un punto de confusión frecuente.",
  },
  {
    category: "Productores",
    question:
      "¿Por qué algunas plantas necesitan raíces con características especiales como las estomas para tomar agua, además del proceso de fotosíntesis?",
    options: [
      "Para realizar la respiración celular en lugar de la fotosíntesis",
      "Porque para completar la fotosíntesis necesitan elementos del ambiente que adquieren a través de diferentes estructuras: agua por raíces y CO₂ por estomas",
      "Porque las estomas reemplazan a las raíces en plantas acuáticas",
      "Para competir con los consumidores primarios por los mismos nutrientes",
    ],
    correct: 1,
    explanation:
      "Las plantas necesitan agua (captada por raíces), CO₂ (que ingresa por las estomas) y luz solar para realizar la fotosíntesis. Algunas plantas carnívoras desarrollaron además otras adaptaciones para obtener nitrógeno de insectos cuando el suelo es pobre en ese elemento.",
  },
  {
    category: "Descomponedores",
    question:
      "¿Cuál es la diferencia fundamental entre un consumidor carroñero y un descomponedor, si ambos se alimentan de organismos muertos?",
    options: [
      "No hay diferencia; son el mismo nivel trófico",
      "Los carroñeros ingieren trozos visibles de materia orgánica; los descomponedores (hongos, bacterias) degradan la materia a nivel microscópico devolviendo nutrientes al ambiente",
      "Los carroñeros son siempre más grandes que los descomponedores",
      "Los descomponedores solo actúan sobre vegetales; los carroñeros, sobre animales",
    ],
    correct: 1,
    explanation:
      "Los carroñeros consumen restos a nivel macroscópico (comen la carne, huesos, etc.). Los descomponedores como hongos y bacterias actúan a nivel microscópico, desintegrando completamente la materia orgánica y liberando nutrientes simples al suelo, aire y agua, cerrando el ciclo de la materia.",
  },
  {
    category: "Relaciones interespecíficas",
    question:
      "El tránsito de automóviles en la estepa patagónica perturba a los choiques. ¿Podría clasificarse esto como amensalismo entre humanos y choiques? ¿Por qué sí o no?",
    options: [
      "Sí, porque los humanos perjudican a los choiques sin obtener ningún beneficio directo de perturbarlos",
      "No, porque el amensalismo solo ocurre entre animales salvajes, no con humanos",
      "No, porque los humanos sí obtienen un beneficio: el transporte",
      "Sí, pero solo si los choiques mueren como consecuencia de la perturbación",
    ],
    correct: 0,
    explanation:
      "El libro clasifica este caso directamente como amensalismo: los automóviles (y por extensión los humanos) perjudican a los choiques al dañar su hábitat, sin que los humanos obtengan ningún beneficio directo de esa perturbación específica. El amensalismo no excluye a los humanos como especie interactuante.",
  },
  {
    category: "Cadenas y redes alimentarias",
    question:
      "En la cadena: pasto llorón → ciervo de los pantanos → águila coronada → puma, ¿en qué nivel trófico se ubica el puma y cómo se denomina ese tipo de consumidor?",
    options: [
      "Nivel 2 — consumidor primario",
      "Nivel 3 — consumidor secundario",
      "Nivel 4 — consumidor terciario",
      "Nivel 1 — superdepredador productor",
    ],
    correct: 2,
    explanation:
      "El pasto llorón es nivel 1 (productor). El ciervo es nivel 2 (consumidor primario). El águila es nivel 3 (consumidor secundario). El puma se alimenta del águila, ocupando el nivel 4: consumidor terciario. Es el superdepredador de esta cadena.",
  },
  {
    category: "Relaciones interespecíficas",
    question:
      "¿Cuál es la distinción clave entre competencia INTRAESPECÍFICA e INTERespecífica? Identificá cuál de estas situaciones es interespecífica.",
    options: [
      "Dos pumas machos pelean por territorio en la misma región — interespecífica",
      "Guanacos y ovejas compiten por el pasto en la Patagonia — interespecífica",
      "Dos cardúmenes de anchoas compiten por plancton — interespecífica",
      "Liebres pampeanas de la misma colonia compiten por pareja — interespecífica",
    ],
    correct: 1,
    explanation:
      "La competencia INTRAespecífica ocurre entre individuos de la MISMA especie (dos pumas, dos anchoas, dos liebres). La INTERespecífica ocurre entre individuos de DIFERENTES especies. Guanacos y ovejas son especies distintas compitiendo por el mismo recurso (pasto), lo que lo convierte en competencia interespecífica.",
  },
  {
    category: "Productores",
    question:
      "¿Qué proceso realizan las plantas para producir glucosa y almidón, y cuáles son sus tres ingredientes esenciales?",
    options: [
      "Respiración celular — glucosa, oxígeno y calor",
      "Fotosíntesis — agua, dióxido de carbono y luz solar",
      "Fermentación — azúcar, levadura y agua",
      "Quimiosíntesis — metano, sulfuro y temperatura",
    ],
    correct: 1,
    explanation:
      "Las plantas realizan la fotosíntesis, usando agua (captada por raíces), CO₂ (que ingresa por estomas) y energía luminosa para sintetizar glucosa y almidón. Este proceso las define como productores y es la base energética de casi todos los ecosistemas.",
  },
  {
    category: "Relaciones interespecíficas",
    question:
      "Los cormoranes imperiales usan los árboles de las islas del delta del Paraná para anidar sin afectar a otras aves. Los piojos se alimentan de la sangre de cóndores andinos afectando su salud. ¿Qué tienen en COMÚN estas dos relaciones?",
    options: [
      "En ambas, una especie se beneficia y la otra también",
      "En ambas, una especie usa a otra como recurso o soporte, pero se diferencian en si la otra resulta perjudicada o no",
      "Ambas son ejemplos de competencia por recursos espaciales",
      "En ambas, las dos especies resultan perjudicadas",
    ],
    correct: 1,
    explanation:
      "En ambas relaciones, una especie (el cormorán / el piojo) usa a otra como soporte o recurso. La diferencia es el efecto sobre la segunda especie: en el comensalismo (cormorán-árbol/aves) no hay perjuicio; en el parasitismo (piojo-cóndor) la segunda especie se debilita. El denominador común es la asimetría de la relación.",
  },
  {
    category: "Cadenas y redes alimentarias",
    question:
      "Si en la red pampeana tanto la liebre como el ciervo son consumidos por el zorro y el águila, y ambos se alimentan de pasto, ¿cómo se llama la posición que comparten liebre y ciervo en la red?",
    options: [
      "Superpredadores del segundo nivel",
      "Comparten el nivel trófico de consumidores primarios, siendo recursos alternativos para sus depredadores",
      "Son descomponedores primarios porque ambos comen vegetales",
      "Son productores secundarios porque transforman el pasto en carne",
    ],
    correct: 1,
    explanation:
      "Liebre y ciervo ocupan el mismo nivel trófico (consumidores primarios) y funcionan como presas alternativas para sus depredadores. Esto le da resiliencia a la red: si una presa escasea, el depredador puede recurrir a la otra. Es una de las ventajas de las redes sobre las cadenas simples.",
  },
  {
    category: "Niveles de organización",
    question:
      "¿Cuál es la diferencia entre 'especie' y 'población' según el glosario del libro?",
    options: [
      "La especie es el conjunto de individuos de un área; la población incluye varias especies",
      "La especie es el conjunto de individuos con características comunes y capaces de tener descendencia fértil; la población es el conjunto de individuos de una especie en un área geográfica determinada",
      "Son sinónimos en ecología moderna",
      "La población es más grande que la especie porque incluye individuos de diferentes regiones del planeta",
    ],
    correct: 1,
    explanation:
      "Según el glosario, especie es el conjunto de individuos con características comunes capaces de reproducirse entre sí con descendencia fértil. Población es el subconjunto de individuos de esa especie que comparten una misma área geográfica y pueden reproducirse entre ellos.",
  },
  {
    category: "Relaciones interespecíficas",
    question:
      "¿Por qué la relación entre las vizcachas y las águilas moras es depredación y NO parasitismo, si en ambos casos una especie se 'alimenta' de otra?",
    options: [
      "Porque las vizcachas son más grandes que los parásitos típicos",
      "Porque en la depredación el depredador mata y consume a la presa; en el parasitismo el parásito vive asociado al huésped sin necesariamente matarlo de inmediato",
      "Porque el águila vuela y los parásitos no",
      "Porque la vizcacha también deprede al águila en algún momento",
    ],
    correct: 1,
    explanation:
      "La distinción clave es que en la depredación el acto culmina con la muerte y consumo de la presa. En el parasitismo, el parásito convive con el huésped durante un tiempo (viviendo dentro o adherido a él) y lo debilita progresivamente sin necesariamente matarlo de inmediato.",
  },
  {
    category: "Ecosistema",
    question:
      "El libro dice que 'Eco' significa 'casa, morada o ámbito vital'. ¿Qué implicación conceptual tiene esto para entender qué es un ecosistema?",
    options: [
      "Que los ecosistemas solo existen donde hay construcciones humanas",
      "Que el ecosistema es el 'hogar' integral de los seres vivos: incluye tanto el ambiente físico (abiótico) como todos los organismos (bióticos) que lo habitan e interactúan",
      "Que los ecosistemas son estáticos e inmutables como una casa",
      "Que solo los animales que tienen refugio físico pertenecen a un ecosistema",
    ],
    correct: 1,
    explanation:
      "La etimología refuerza la idea de que el ecosistema no es solo el ambiente físico ni solo los seres vivos, sino la unidad funcional que los integra: el 'hogar' donde ocurren todas las interacciones entre componentes bióticos y abióticos.",
  },
  {
    category: "Consumidores",
    question:
      "Un pingüino se alimenta de merluza y anchoíta. ¿En qué nivel trófico se ubica si la merluza es consumidora secundaria y la anchoíta es consumidora primaria?",
    options: [
      "Siempre en el nivel 2, porque es un animal marino",
      "En el nivel 3 cuando come anchoíta y en el nivel 4 cuando come merluza, lo que lo hace un consumidor de nivel variable u omnívoro trófico",
      "En el nivel 1 porque es un ave y no un mamífero",
      "En el nivel 5 porque está en la cima de la cadena marina",
    ],
    correct: 1,
    explanation:
      "El nivel trófico de un consumidor depende de qué está comiendo en cada caso. Si el pingüino come anchoíta (consumidora primaria = nivel 2), él ocupa el nivel 3. Si come merluza (consumidora secundaria = nivel 3), él ocupa el nivel 4. Esto es lo que hace complejas a las redes reales: muchos organismos comen en múltiples niveles.",
  },
  {
    category: "Relaciones interespecíficas",
    question:
      "¿Por qué resulta difícil a veces distinguir entre comensalismo y mutualismo en la naturaleza?",
    options: [
      "Porque ambas relaciones siempre terminan en depredación",
      "Porque puede ser difícil determinar si la especie 'no afectada' obtiene algún beneficio sutil o indirecto que no es observable a simple vista",
      "Porque en la naturaleza todas las relaciones son negativas para alguna especie",
      "Porque comensalismo y mutualismo son el mismo concepto con distinto nombre",
    ],
    correct: 1,
    explanation:
      "La línea entre comensalismo (una se beneficia, la otra es neutra) y mutualismo (ambas se benefician) puede ser difusa: un beneficio puede existir pero ser tan sutil que no se detecte fácilmente. Por ejemplo, el árbol que aloja al hornero podría obtener algún beneficio indirecto como la dispersión de semillas, lo que lo haría mutualismo.",
  },
  {
    category: "Cadenas y redes alimentarias",
    question:
      "El libro indica que las actividades piden armar redes alimentarias e incluir al menos 4 niveles. ¿Qué elemento NO puede faltar en ninguna red alimentaria válida?",
    options: [
      "Al menos un carnívoro en el nivel más alto",
      "Un productor como punto de partida, ya que toda la energía de la red proviene de organismos que fotosintetizan",
      "Un descomponedor explícito dentro de la cadena principal",
      "Exactamente 5 especies, ni más ni menos",
    ],
    correct: 1,
    explanation:
      "Toda red o cadena alimentaria debe comenzar con un productor (organismo fotosintético), ya que es la única fuente primaria de energía en el sistema. Sin productores no hay base energética y la red no puede sostenerse. Los descomponedores suelen graficarse aparte, y el número de especies varía según el ecosistema.",
  },
  {
    category: "Relaciones interespecíficas",
    question:
      "Las sardinas y las anchoas compiten por el plancton en el mar Argentino. Si el plancton aumentara enormemente, ¿qué pasaría con la intensidad de la competencia entre estas especies?",
    options: [
      "La competencia aumentaría porque habría más individuos de ambas especies",
      "La competencia disminuiría porque el recurso limitante ya no sería escaso, reduciendo la presión competitiva",
      "La competencia se mantendría igual independientemente del plancton disponible",
      "Una especie exterminaría a la otra para aprovechar el exceso de plancton",
    ],
    correct: 1,
    explanation:
      "La competencia ocurre por recursos LIMITADOS. Si el plancton abundara, la escasez del recurso desaparecería y la presión competitiva entre sardinas y anchoas disminuiría significativamente. La competencia es más intensa cuando el recurso es escaso.",
  },
  {
    category: "Descomponedores",
    question:
      "¿Por qué los descomponedores son imprescindibles para que los productores puedan continuar existiendo, aunque no haya una relación directa entre ellos en la cadena alimentaria?",
    options: [
      "Porque los descomponedores producen oxígeno que los productores necesitan para respirar",
      "Porque los descomponedores liberan nutrientes simples al suelo y al agua que los productores necesitan para crecer y realizar la fotosíntesis",
      "Porque los descomponedores protegen a los productores de los herbívoros",
      "Porque los descomponedores compiten con los productores y los estimulan a crecer más rápido",
    ],
    correct: 1,
    explanation:
      "Los descomponedores cierran el ciclo de la materia: al degradar restos de organismos, liberan nutrientes minerales simples al suelo y al agua. Esos nutrientes son esenciales para que los productores (plantas) puedan crecer y realizar la fotosíntesis. Sin descomponedores, los nutrientes quedarían 'atrapados' en la materia orgánica muerta.",
  },
  {
    category: "Relaciones interespecíficas",
    question:
      "Analizando TODAS las relaciones interespecíficas del capítulo (depredación, competencia, mutualismo, comensalismo, parasitismo, amensalismo), ¿cuál es la única en que NINGUNA de las dos especies obtiene beneficio alguno?",
    options: [
      "Parasitismo, porque el huésped pierde y el parásito gana poco",
      "Competencia, porque ambas especies gastan energía sin que ninguna obtenga un beneficio neto directo de la interacción en sí",
      "Amensalismo, porque una especie es perjudicada y la otra no obtiene beneficio",
      "Comensalismo, porque la especie neutra no gana nada",
    ],
    correct: 2,
    explanation:
      "En el amensalismo, una especie es perjudicada y la otra no obtiene NINGÚN beneficio. En la depredación el depredador gana alimento. En el parasitismo el parásito se nutre. En la competencia ambas 'luchan' por un recurso que sí quieren obtener. En el mutualismo y comensalismo hay beneficios. Solo en el amensalismo la interacción es completamente 'gratuita' para la especie perjudicadora: daña a la otra sin sacar nada.",
  },
];
