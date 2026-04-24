export type Question = {
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

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
    options: [
      "Mutualismo",
      "Competencia",
      "Parasitismo",
      "Comensalismo",
    ],
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
    options: [
      "Comensalismo",
      "Mutualismo",
      "Depredación",
      "Parasitismo",
    ],
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
