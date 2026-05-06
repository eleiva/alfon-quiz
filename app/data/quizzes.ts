import {
  questions,
  hardQuestions,
  bd2SectionB,
  type Question,
  type Difficulty,
  type FillQuestion,
} from "@/app/data/questions";

// Re-export for consumers that import from this module
export type { Question, Difficulty };

export type Quiz = {
  id: string;
  subject: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  accentColor: string;
  topics: string[];
  normal: Question[];
  hard: Question[];
  fillQuestions?: FillQuestion[]; // Section B
  hasFill?: boolean; // true if this quiz has a fill section
};

// ---------------------------------------------------------------------------
// Quiz 1 — Ecosistemas (Ciencias Naturales)
// ---------------------------------------------------------------------------

const ecosistemasQuiz: Quiz = {
  id: "ecosistemas",
  subject: "Ciencias Naturales",
  title: "Trivia de Ecosistemas",
  subtitle: "Relaciones biológicas y cadenas tróficas",
  emoji: "🌿",
  color: "var(--verde-claro)",
  accentColor: "var(--dorado)",
  topics: [
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
  ],
  normal: questions,
  hard: hardQuestions,
};

// ---------------------------------------------------------------------------
// Quiz 2 — Tecnología Básica
// ---------------------------------------------------------------------------

const techBasicoNormal: Question[] = [
  // Q1
  {
    category: "Hardware",
    question:
      "¿Cuál es la función principal del procesador (CPU) en una computadora?",
    options: [
      "Guardar los archivos de forma permanente",
      "Procesar y ejecutar las instrucciones de los programas",
      "Conectar la computadora a internet",
      "Mostrar la imagen en la pantalla",
    ],
    correct: 1,
    explanation:
      "La CPU (Unidad Central de Procesamiento) es el 'cerebro' de la computadora: interpreta y ejecuta todas las instrucciones de los programas y del sistema operativo.",
  },
  // Q2
  {
    category: "Hardware",
    question: "¿Qué diferencia hay entre la RAM y el disco duro (o SSD)?",
    options: [
      "La RAM guarda los datos permanentemente; el disco duro los borra al apagar",
      "La RAM es memoria temporal que se borra al apagar; el disco guarda datos de forma permanente",
      "Son exactamente lo mismo, solo cambia el nombre",
      "El disco duro procesa datos; la RAM los muestra en pantalla",
    ],
    correct: 1,
    explanation:
      "La RAM es memoria de trabajo: rápida pero temporal (se vacía al apagar). El disco duro o SSD almacena los datos de forma permanente, como documentos, fotos y programas instalados.",
  },
  // Q3
  {
    category: "Hardware",
    question: "¿Cuál de estos es un dispositivo de SALIDA de información?",
    options: ["Teclado", "Mouse", "Micrófono", "Parlantes"],
    correct: 3,
    explanation:
      "Los dispositivos de salida son los que envían información de la computadora hacia el usuario. Los parlantes emiten sonido hacia afuera. El teclado, mouse y micrófono son dispositivos de entrada.",
  },
  // Q4
  {
    category: "Software",
    question: "¿Qué es un sistema operativo?",
    options: [
      "Un programa para navegar por internet",
      "El hardware principal de la computadora",
      "El software que administra los recursos del equipo y permite usar otros programas",
      "Un antivirus que protege la computadora",
    ],
    correct: 2,
    explanation:
      "El sistema operativo (como Windows, macOS o Android) es el software base que gestiona el hardware y permite que otros programas funcionen. Sin él, la computadora no puede operar.",
  },
  // Q5
  {
    category: "Software",
    question: "¿Cuál es la diferencia entre software y hardware?",
    options: [
      "El software es la parte física; el hardware, los programas",
      "El hardware es la parte física y tangible; el software son los programas e instrucciones",
      "Son lo mismo, solo se usan en distintos países",
      "El hardware es lo que se descarga de internet; el software lo que se compra en tiendas",
    ],
    correct: 1,
    explanation:
      "Hardware es todo lo que podés tocar: pantalla, teclado, placa de video, etc. Software es todo lo intangible: programas, aplicaciones, el sistema operativo.",
  },
  // Q6
  {
    category: "Internet y redes",
    question: "¿Qué significa WWW?",
    options: [
      "World Wide Web",
      "Wireless Wide Wave",
      "Web World Wifi",
      "Wide World Windows",
    ],
    correct: 0,
    explanation:
      "WWW significa World Wide Web (Red Mundial). Es el sistema de páginas web interconectadas que funciona sobre internet. Internet es la infraestructura; la Web es uno de los servicios que usa esa infraestructura.",
  },
  // Q7
  {
    category: "Internet y redes",
    question: "¿Para qué sirve un navegador web?",
    options: [
      "Para crear redes WiFi en casa",
      "Para acceder y visualizar páginas web en internet",
      "Para guardar archivos en la nube",
      "Para proteger la computadora de virus",
    ],
    correct: 1,
    explanation:
      "Un navegador (como Chrome, Firefox o Edge) es el programa que permite acceder, interpretar y mostrar páginas web. Sin navegador no podés ver sitios web aunque tengas internet.",
  },
  // Q8
  {
    category: "Internet y redes",
    question: "¿Qué es una dirección IP?",
    options: [
      "El nombre de usuario de una red social",
      "Un número único que identifica a cada dispositivo en una red",
      "La contraseña de una red WiFi",
      "El nombre del proveedor de internet",
    ],
    correct: 1,
    explanation:
      "La dirección IP (Internet Protocol) es como el 'domicilio' de cada dispositivo en una red. Permite que los datos sepan a qué dispositivo llegar. Por ejemplo: 192.168.0.1.",
  },
  // Q9
  {
    category: "Internet y redes",
    question: "¿Qué hace un router en una red doméstica?",
    options: [
      "Guarda los archivos de todos los dispositivos conectados",
      "Distribuye la conexión a internet entre los distintos dispositivos del hogar",
      "Aumenta la potencia del procesador cuando hay muchos usuarios",
      "Filtra los virus antes de que lleguen a la computadora",
    ],
    correct: 1,
    explanation:
      "El router recibe la señal de internet del proveedor y la distribuye (por cable o WiFi) a todos los dispositivos del hogar: computadoras, celulares, tablets, etc.",
  },
  // Q10
  {
    category: "Software",
    question: "¿Qué es una aplicación (app)?",
    options: [
      "Un componente físico del celular",
      "Un programa diseñado para realizar una tarea específica en un dispositivo",
      "La memoria interna de un teléfono",
      "El sistema que conecta el celular a internet",
    ],
    correct: 1,
    explanation:
      "Una aplicación o app es un programa diseñado para una función concreta: chatear, escuchar música, editar fotos, etc. Puede instalarse en celulares, tablets o computadoras.",
  },
  // Q11
  {
    category: "Hardware",
    question: "¿Qué es una GPU?",
    options: [
      "Un tipo de memoria RAM para laptops",
      "Un procesador especializado en procesar gráficos e imágenes",
      "El puerto donde se conecta el cable de red",
      "Una unidad de almacenamiento externa",
    ],
    correct: 1,
    explanation:
      "La GPU (Unidad de Procesamiento Gráfico) es el procesador especializado en gráficos. Es fundamental para videojuegos, diseño y edición de video, ya que procesa imágenes mucho más rápido que la CPU.",
  },
  // Q12
  {
    category: "Internet y redes",
    question: "¿Qué significa que una red sea WiFi?",
    options: [
      "Que usa cables de fibra óptica para conectarse",
      "Que transmite datos de forma inalámbrica usando ondas de radio",
      "Que solo puede usarse dentro de un edificio",
      "Que es exclusiva para computadoras de escritorio",
    ],
    correct: 1,
    explanation:
      "WiFi es una tecnología que permite conectar dispositivos a una red de forma inalámbrica usando ondas de radio. No necesita cables entre el dispositivo y el router.",
  },
  // Q13
  {
    category: "Software",
    question: "¿Qué es un virus informático?",
    options: [
      "Un error de hardware que daña el procesador",
      "Un programa malicioso que puede dañar el sistema o robar información",
      "Una actualización del sistema operativo",
      "Un archivo que ocupa mucho espacio en el disco",
    ],
    correct: 1,
    explanation:
      "Un virus informático es un programa malicioso que, al ejecutarse, puede dañar archivos, robar información, espiar al usuario o propagarse a otros dispositivos sin permiso.",
  },
  // Q14
  {
    category: "Internet y redes",
    question: "¿Qué es la nube (cloud) en tecnología?",
    options: [
      "Un servidor físico dentro de tu computadora",
      "Un servicio que permite guardar y acceder a datos e información a través de internet, sin necesitar el dispositivo donde se crearon",
      "La señal WiFi que emite el router",
      "Un tipo especial de disco duro externo",
    ],
    correct: 1,
    explanation:
      "La nube son servidores remotos conectados a internet donde podés guardar archivos, usar programas o hacer copias de seguridad. Ejemplos: Google Drive, iCloud, OneDrive.",
  },
  // Q15
  {
    category: "Hardware",
    question:
      "¿Cuál es la unidad básica de almacenamiento digital y cuántos bits tiene un byte?",
    options: [
      "El pixel — 4 bits",
      "El byte — 8 bits",
      "El kilobyte — 2 bits",
      "El bit — 16 unidades",
    ],
    correct: 1,
    explanation:
      "El bit es la unidad mínima (0 o 1). Un byte equivale a 8 bits y es la unidad básica de almacenamiento. A partir del byte se construyen las unidades mayores: kilobyte (KB), megabyte (MB), gigabyte (GB), etc.",
  },
  // Q16
  {
    category: "Internet y redes",
    question: "¿Qué es el ancho de banda en una conexión a internet?",
    options: [
      "El tamaño físico del cable de red",
      "La cantidad de datos que pueden transmitirse por segundo en una conexión",
      "La distancia máxima a la que llega el WiFi",
      "El número de dispositivos que puede conectar un router",
    ],
    correct: 1,
    explanation:
      "El ancho de banda indica cuánta información puede viajar por la conexión por segundo. Se mide en Mbps (megabits por segundo). A mayor ancho de banda, más rápida es la conexión.",
  },
  // Q17
  {
    category: "Software",
    question: "¿Para qué sirve una contraseña segura?",
    options: [
      "Para que la computadora encienda más rápido",
      "Para proteger el acceso a una cuenta o dispositivo e impedir el ingreso de personas no autorizadas",
      "Para mejorar la velocidad de internet",
      "Para activar la licencia del sistema operativo",
    ],
    correct: 1,
    explanation:
      "Una contraseña segura protege la privacidad y la información personal. Se recomienda que sea larga, combine letras, números y símbolos, y no sea fácil de adivinar (como fechas de cumpleaños o '1234').",
  },
  // Q18
  {
    category: "Internet y redes",
    question: "¿Qué es el phishing?",
    options: [
      "Un método para acelerar la conexión WiFi",
      "Una técnica de engaño para robar datos personales haciéndose pasar por una entidad confiable",
      "Un tipo de antivirus gratuito",
      "Un protocolo para compartir archivos entre dispositivos",
    ],
    correct: 1,
    explanation:
      "El phishing es una estafa digital donde el atacante se hace pasar por un banco, red social u otra entidad para engañarte y robarte contraseñas o datos bancarios. Generalmente llega por correo electrónico o mensajes falsos.",
  },
  // Q19
  {
    category: "Hardware",
    question: "¿Qué ventaja tiene un SSD sobre un disco duro HDD tradicional?",
    options: [
      "El HDD es más rápido pero el SSD guarda más datos",
      "El SSD es más rápido, más silencioso y más resistente a golpes porque no tiene partes móviles",
      "El SSD consume más energía pero dura más tiempo",
      "Son idénticos en rendimiento; solo cambia el precio",
    ],
    correct: 1,
    explanation:
      "El SSD usa memoria flash (sin partes mecánicas), lo que lo hace mucho más rápido, silencioso y resistente que el HDD tradicional, que usa discos magnéticos giratorios. La desventaja del SSD suele ser su mayor costo por GB.",
  },
  // Q20
  {
    category: "Internet y redes",
    question: "¿Qué significa HTTP y HTTPS en una dirección web?",
    options: [
      "Son dos versiones del mismo buscador web",
      "HTTP es el protocolo básico de transferencia de datos; HTTPS es la versión segura que cifra la información",
      "HTTPS es más lento que HTTP porque usa más datos",
      "HTTP es para computadoras y HTTPS exclusivamente para celulares",
    ],
    correct: 1,
    explanation:
      "HTTP (HyperText Transfer Protocol) es el protocolo que permite transferir páginas web. HTTPS agrega una capa de seguridad (el cifrado SSL/TLS) que protege los datos entre tu dispositivo y el servidor. Siempre preferí sitios con HTTPS, especialmente al ingresar datos personales.",
  },
];

const techBasicoHard: Question[] = [
  // Q1 — correct: 1
  {
    category: "Hardware",
    question:
      "Una computadora tiene 8 GB de RAM y un procesador de 4 núcleos a 3.5 GHz. ¿Cuál de estas afirmaciones es correcta?",
    options: [
      "Los 4 núcleos significan que el procesador corre a 14 GHz en total",
      "Los 4 núcleos permiten procesar varias tareas en paralelo; los 3.5 GHz indican la velocidad de cada núcleo",
      "Los 8 GB de RAM determinan la velocidad del procesador",
      "Con 4 núcleos solo puede ejecutarse un programa a la vez por núcleo sin excepciones",
    ],
    correct: 1,
    explanation:
      "Los núcleos son unidades de procesamiento independientes que trabajan en paralelo. Los GHz indican cuántos ciclos por segundo puede ejecutar CADA núcleo. No se suman los GHz de los núcleos.",
  },
  // Q2 — correct: 1
  {
    category: "Hardware",
    question:
      "¿Por qué la velocidad de acceso de la RAM es mucho mayor que la del disco duro, aunque ambos almacenan datos?",
    options: [
      "Porque la RAM está físicamente más cerca del procesador en el motherboard",
      "Porque la RAM usa tecnología de memoria electrónica de acceso directo sin partes mecánicas, mientras que el HDD usa discos giratorios con cabezales físicos",
      "Porque la RAM tiene mayor capacidad de almacenamiento",
      "Porque la RAM es más cara y eso garantiza mayor velocidad automáticamente",
    ],
    correct: 1,
    explanation:
      "La RAM accede a cualquier posición de memoria electrónicamente en nanosegundos. El HDD debe mover físicamente un cabezal sobre discos giratorios, lo que toma milisegundos.",
  },
  // Q3 — correct: 1
  {
    category: "Software",
    question:
      "¿Qué diferencia hay entre un sistema operativo de código abierto (open source) y uno propietario?",
    options: [
      "El open source es siempre gratuito; el propietario siempre es pago",
      "En el open source el código fuente es público y puede modificarse; en el propietario el código es privado y no puede modificarse libremente",
      "El propietario funciona en más dispositivos porque tiene más recursos",
      "No hay diferencia real; es solo una estrategia de marketing",
    ],
    correct: 1,
    explanation:
      "Open source significa que el código fuente es público: cualquiera puede leerlo, modificarlo y distribuirlo (ejemplo: Linux). El software propietario (como Windows) mantiene el código privado.",
  },
  // Q4 — correct: 1
  {
    category: "Internet y redes",
    question:
      "¿Cuál es la diferencia entre una dirección IP pública y una IP privada?",
    options: [
      "La IP pública se usa dentro de la red del hogar; la privada identifica al router ante internet",
      "La IP pública identifica a tu red ante internet; la IP privada identifica a cada dispositivo dentro de tu red local",
      "Son sinónimos; todos los dispositivos tienen la misma IP",
      "La IP privada se compra al proveedor de internet; la pública se asigna automáticamente",
    ],
    correct: 1,
    explanation:
      "Tu proveedor de internet asigna una IP pública a tu router. Dentro de tu red, el router asigna IPs privadas a cada dispositivo. Es como la dirección de un edificio (pública) versus el número de departamento (privada).",
  },
  // Q5 — correct: 1
  {
    category: "Internet y redes",
    question: "¿Qué es el DNS y por qué es necesario para navegar en internet?",
    options: [
      "Es el cable que conecta el router a la computadora",
      "Es un sistema que traduce los nombres de dominio (como google.com) en direcciones IP numéricas que los dispositivos pueden entender",
      "Es el protocolo que cifra las páginas web con HTTPS",
      "Es el servidor donde se guardan todos los archivos de las páginas web",
    ],
    correct: 1,
    explanation:
      "DNS (Domain Name System) funciona como la 'agenda telefónica' de internet: cuando escribís google.com, el DNS lo traduce a una IP para que tu dispositivo sepa a qué servidor conectarse.",
  },
  // Q6 — correct: 1
  {
    category: "Internet y redes",
    question:
      "¿Qué es la latencia en una conexión a internet y por qué importa para los videojuegos online?",
    options: [
      "Es la cantidad de datos que se transfieren por segundo; importa porque determina la calidad del video",
      "Es el tiempo que tarda un paquete de datos en ir desde tu dispositivo hasta el servidor y volver; en juegos, una latencia alta causa lag y retrasos en las acciones",
      "Es la frecuencia con la que el router emite señal WiFi; importa para mantener la conexión estable",
      "Es el límite de datos mensual del plan de internet; en juegos consume más datos que otros servicios",
    ],
    correct: 1,
    explanation:
      "La latencia (medida en milisegundos) es el tiempo de ida y vuelta de un paquete de datos. En juegos online, alta latencia causa el temido 'lag'.",
  },
  // Q7 — correct: 1
  {
    category: "Software",
    question: "¿Qué es un algoritmo en el contexto de la computación?",
    options: [
      "Un tipo especial de virus informático que se propaga automáticamente",
      "Una secuencia finita y ordenada de instrucciones para resolver un problema o realizar una tarea",
      "El lenguaje de programación usado por Google para sus buscadores",
      "El conjunto de reglas que establece cómo deben conectarse los dispositivos en una red",
    ],
    correct: 1,
    explanation:
      "Un algoritmo es una serie de pasos lógicos y ordenados que, seguidos correctamente, resuelven un problema. Todos los programas son algoritmos implementados en un lenguaje de programación.",
  },
  // Q8 — correct: 1
  {
    category: "Hardware",
    question:
      "Si una imagen tiene una resolución de 1920×1080 píxeles y cada píxel usa 24 bits de color, ¿cuántos bytes ocupa aproximadamente sin compresión?",
    options: [
      "Aproximadamente 200 KB",
      "Aproximadamente 6.2 MB",
      "Exactamente 1080 KB",
      "Aproximadamente 50 MB",
    ],
    correct: 1,
    explanation:
      "1920 × 1080 = 2.073.600 píxeles. Cada píxel usa 24 bits = 3 bytes. Total: 2.073.600 × 3 = 6.220.800 bytes ≈ 6.2 MB. La compresión (JPG, PNG) reduce este tamaño drásticamente.",
  },
  // Q9 — correct: 1
  {
    category: "Software",
    question:
      "¿Qué diferencia existe entre compilar e interpretar un programa?",
    options: [
      "Compilar es más lento en ejecución; interpretar es más rápido",
      "Compilar traduce todo el código a lenguaje máquina antes de ejecutarlo; interpretar lo traduce y ejecuta línea por línea en tiempo real",
      "Interpretar genera un archivo ejecutable; compilar no genera archivos",
      "Son procesos idénticos con distinto nombre según el lenguaje usado",
    ],
    correct: 1,
    explanation:
      "Un compilador traduce el código fuente completo a código máquina previamente (genera un .exe, por ejemplo). Un intérprete lee y ejecuta el código línea por línea en tiempo real. Los compilados suelen ser más rápidos en ejecución.",
  },
  // Q10 — correct: 1
  {
    category: "Internet y redes",
    question:
      "¿Qué es un protocolo de comunicación en redes y para qué sirve TCP/IP?",
    options: [
      "Es el hardware que conecta computadoras; TCP/IP es el cable más utilizado",
      "Es un conjunto de reglas que define cómo se transmiten datos entre dispositivos; TCP/IP es el protocolo base de internet que garantiza la entrega ordenada de paquetes",
      "Es el software del router; TCP/IP es su sistema operativo",
      "Es la velocidad de transferencia; TCP/IP mide los megabits por segundo",
    ],
    correct: 1,
    explanation:
      "Un protocolo es un conjunto de reglas de comunicación. TCP/IP es el protocolo fundamental de internet: IP divide los datos en paquetes y los enruta; TCP garantiza que lleguen completos y en orden.",
  },
  // Q11 — correct: 1
  {
    category: "Hardware",
    question:
      "¿Qué es la memoria caché del procesador y por qué mejora el rendimiento?",
    options: [
      "Es una copia de seguridad del disco duro integrada en la CPU",
      "Es una memoria ultrarrápida integrada en la CPU que almacena datos de uso frecuente para evitar acceder a la RAM constantemente",
      "Es la memoria virtual que usa el sistema operativo cuando se llena la RAM",
      "Es un chip externo que acelera la velocidad del disco duro",
    ],
    correct: 1,
    explanation:
      "La caché es memoria integrada directamente en la CPU, extremadamente rápida. Guarda datos e instrucciones que el procesador usa frecuentemente, reduciendo la necesidad de acceder a la RAM (más lenta) y acelerando el procesamiento.",
  },
  // Q12 — correct: 1
  {
    category: "Internet y redes",
    question:
      "¿Qué diferencia hay entre cifrado simétrico y asimétrico en ciberseguridad?",
    options: [
      "El simétrico usa dos claves distintas; el asimétrico usa una sola clave compartida",
      "El simétrico usa una sola clave para cifrar y descifrar; el asimétrico usa un par de claves (pública y privada)",
      "Son idénticos; solo difieren en el algoritmo matemático utilizado",
      "El asimétrico solo funciona en redes WiFi; el simétrico solo en conexiones por cable",
    ],
    correct: 1,
    explanation:
      "Cifrado simétrico: misma clave para cifrar y descifrar (más rápido, pero hay que compartir la clave). Asimétrico: clave pública para cifrar, clave privada para descifrar (más seguro para intercambio inicial). HTTPS combina ambos.",
  },
  // Q13 — correct: 1
  {
    category: "Software",
    question:
      "¿Qué es la virtualización y cuál es su ventaja principal en servidores?",
    options: [
      "Es comprimir archivos para que ocupen menos espacio en disco",
      "Es ejecutar múltiples sistemas operativos o entornos aislados en un mismo hardware físico, maximizando el uso de recursos",
      "Es conectar varios servidores físicos para que actúen como uno solo",
      "Es hacer copias de seguridad automáticas del sistema operativo",
    ],
    correct: 1,
    explanation:
      "La virtualización permite crear máquinas virtuales (VMs) que comparten el hardware físico. Un servidor puede ejecutar 10 o más VMs simultáneamente, cada una con su propio SO. Reduce costos de hardware y mejora la utilización de recursos.",
  },
  // Q14 — correct: 1
  {
    category: "Hardware",
    question:
      "¿Por qué las computadoras usan el sistema binario (base 2) en lugar del sistema decimal (base 10)?",
    options: [
      "Porque los ingenieros que diseñaron las primeras computadoras preferían los números pares",
      "Porque los transistores electrónicos tienen dos estados físicos estables (encendido/apagado), que se representan naturalmente con 1 y 0",
      "Porque el sistema binario permite cálculos matemáticos más rápidos que el decimal",
      "Porque los cables de datos solo pueden transmitir dos tipos de señales de color",
    ],
    correct: 1,
    explanation:
      "Los transistores son interruptores electrónicos con dos estados: conducción (1) o corte (0). Este comportamiento físico binario es la base del hardware digital. Todo dato —texto, imagen, video— se codifica en secuencias de 0s y 1s.",
  },
  // Q15 — correct: 1
  {
    category: "Internet y redes",
    question: "¿Qué es una VPN y cuándo conviene usarla?",
    options: [
      "Es una red más rápida que el WiFi tradicional para gaming",
      "Es un servicio que crea un túnel cifrado entre tu dispositivo e internet, ocultando tu IP y protegiendo tus datos en redes públicas",
      "Es un antivirus que actúa en tiempo real mientras navegás",
      "Es el protocolo que usan los routers para distribuir direcciones IP",
    ],
    correct: 1,
    explanation:
      "Una VPN (Virtual Private Network) cifra tu tráfico y oculta tu IP real. Es útil en WiFi públicos (aeropuertos, cafés) donde tu tráfico podría ser interceptado, o para acceder a contenido geolocalizado.",
  },
  // Q16 — correct: 1
  {
    category: "Software",
    question:
      "¿Qué es la memoria virtual y cuándo la usa el sistema operativo?",
    options: [
      "Es la RAM que viene de fábrica en el procesador",
      "Es un espacio del disco duro que el sistema operativo usa como extensión de la RAM cuando esta se llena, aunque es mucho más lento",
      "Es la memoria gráfica de la GPU",
      "Es la memoria que se libera al cerrar programas",
    ],
    correct: 1,
    explanation:
      "Cuando la RAM se llena, el sistema operativo mueve datos temporalmente al disco (swap o archivo de paginación). Esto evita que el sistema se cuelgue, pero es mucho más lento que la RAM real, causando el efecto de 'computadora lenta'.",
  },
  // Q17 — correct: 1
  {
    category: "Internet y redes",
    question: "¿Qué es un ataque de denegación de servicio (DDoS)?",
    options: [
      "Un virus que cifra los archivos y pide rescate para recuperarlos",
      "Un ataque que satura un servidor con millones de solicitudes simultáneas hasta hacerlo inaccesible para usuarios legítimos",
      "Un método para robar contraseñas mediante correos falsos",
      "Un software que instala publicidad maliciosa en el navegador",
    ],
    correct: 1,
    explanation:
      "En un DDoS (Distributed Denial of Service), miles de dispositivos comprometidos (botnet) envían solicitudes masivas a un servidor hasta saturarlo y dejarlo fuera de servicio. Es uno de los ataques más comunes contra sitios web y servicios online.",
  },
  // Q18 — correct: 1
  {
    category: "Hardware",
    question: "¿Qué es el overclocking y cuál es su principal riesgo?",
    options: [
      "Es actualizar el firmware del router para mejorar la señal WiFi",
      "Es forzar al procesador u otros componentes a funcionar a una frecuencia mayor a la especificada de fábrica para obtener más rendimiento, a riesgo de mayor calor y daño por sobrecalentamiento",
      "Es conectar más RAM de la que soporta la motherboard para ampliar la memoria",
      "Es instalar más de un sistema operativo en la misma computadora",
    ],
    correct: 1,
    explanation:
      "El overclocking aumenta artificialmente la frecuencia del procesador. Esto genera más rendimiento pero también más calor. Sin refrigeración adecuada, puede causar inestabilidad del sistema, reducción de vida útil del componente o daño permanente.",
  },
  // Q19 — correct: 1
  {
    category: "Software",
    question:
      "¿Cuál es la diferencia entre un proceso y un hilo (thread) en un sistema operativo?",
    options: [
      "Son sinónimos; el término varía según el sistema operativo",
      "Un proceso es un programa en ejecución con su propio espacio de memoria; un hilo es una unidad de ejecución dentro de un proceso que comparte la memoria con otros hilos del mismo proceso",
      "Un hilo es más pesado que un proceso porque usa más recursos del sistema",
      "Un proceso solo puede tener un hilo; para tener varios hay que crear procesos separados",
    ],
    correct: 1,
    explanation:
      "Un proceso tiene su propio espacio de memoria aislado. Dentro de un proceso pueden existir múltiples hilos que comparten memoria entre sí. Los hilos son más livianos de crear y permiten paralelismo dentro de una misma aplicación.",
  },
  // Q20 — correct: 1
  {
    category: "Internet y redes",
    question:
      "¿Qué significa que internet sea una red 'descentralizada' y cuál es su ventaja?",
    options: [
      "Que no tiene un servidor central que almacene toda la información",
      "Que no existe un único punto de control o fallo: los datos pueden viajar por múltiples rutas alternativas, haciendo la red más resiliente",
      "Que todos los dispositivos conectados tienen la misma velocidad de conexión",
      "Que cualquier persona puede administrar los servidores principales de internet",
    ],
    correct: 1,
    explanation:
      "Internet fue diseñada sin un centro único de control. Si un nodo (servidor o ruta) falla, los datos simplemente toman otro camino. Esta descentralización la hace extremadamente resiliente: no hay un solo punto cuya destrucción apague toda la red.",
  },
];

const techBasicoQuiz: Quiz = {
  id: "tech-basico",
  subject: "Tecnología",
  title: "Tecnología Básica",
  subtitle: "Hardware, software y redes",
  emoji: "💻",
  color: "var(--azul)",
  accentColor: "var(--violeta)",
  topics: [
    "Hardware",
    "Software",
    "Internet y redes",
    "Almacenamiento",
    "Seguridad",
  ],
  normal: techBasicoNormal,
  hard: techBasicoHard,
};

// ---------------------------------------------------------------------------
// Quiz 3 — Tecnología Avanzada (hard tech questions as normal, no hard)
// ---------------------------------------------------------------------------

const techAvanzadoQuiz: Quiz = {
  id: "tech-avanzado",
  subject: "Tecnología",
  title: "Tecnología Avanzada",
  subtitle: "Análisis y resolución de problemas tech",
  emoji: "🔬",
  color: "var(--violeta)",
  accentColor: "var(--azul)",
  topics: [
    "Arquitectura",
    "Redes avanzadas",
    "Algoritmos",
    "Ciberseguridad",
    "SO y procesos",
  ],
  normal: techBasicoHard,
  hard: [],
};

// ---------------------------------------------------------------------------
// Quiz 4 — Bases de Datos (Normal)
// ---------------------------------------------------------------------------

const baseDatosNormal: Question[] = [
  // Q1
  {
    category: "c01 — Intro SQL",
    question: "¿Qué significa la sigla SQL?",
    options: [
      "Structured Query Language",
      "Simple Queue Language",
      "Standard Question Logic",
      "Sequential Query List",
    ],
    correct: 0,
    explanation:
      "SQL significa Structured Query Language (Lenguaje de Consulta Estructurado). Es el estándar para interactuar con bases de datos relacionales.",
  },
  // Q2
  {
    category: "c01 — Intro SQL",
    question: "¿Cuáles son los dos sublenguajes principales del estándar SQL?",
    options: [
      "SQL-SELECT y SQL-INSERT",
      "SQL-DDL y SQL-DML",
      "SQL-READ y SQL-WRITE",
      "SQL-SCHEMA y SQL-DATA",
    ],
    correct: 1,
    explanation:
      "SQL-DDL (Data Definition Language) define la estructura de la base de datos. SQL-DML (Data Manipulation Language) permite consultar, insertar, modificar y eliminar datos.",
  },
  // Q3
  {
    category: "c01 — Intro SQL",
    question:
      "¿Qué institución fue clave en la estandarización de SQL junto a ANSI?",
    options: ["NASA", "NIST (antes llamado NBS)", "IEEE", "W3C"],
    correct: 1,
    explanation:
      "El NIST (National Institute of Standards and Technology), antes NBS, fue fundamental en la construcción de consenso para estandarizar SQL entre gobierno e industria.",
  },
  // Q4
  {
    category: "c02 — Normalización",
    question: "¿Qué exige la Primera Forma Normal (1FN)?",
    options: [
      "Que no haya dependencias transitivas",
      "Que todos los atributos sean atómicos y no haya grupos repetidos",
      "Que la tabla tenga clave primaria compuesta",
      "Que cada columna tenga un índice",
    ],
    correct: 1,
    explanation:
      "La 1FN exige que todos los atributos sean atómicos (no divisibles) y que no existan grupos repetidos ni atributos multivaluados en la misma columna.",
  },
  // Q5
  {
    category: "c02 — Normalización",
    question:
      "¿Qué tipo de anomalía ocurre cuando cambiar un dato lógico obliga a modificar múltiples filas?",
    options: [
      "Anomalía de inserción",
      "Anomalía de actualización",
      "Anomalía de borrado",
      "Anomalía de duplicación",
    ],
    correct: 1,
    explanation:
      "La anomalía de actualización ocurre cuando un cambio lógico (como el nombre de una ciudad) obliga a modificar múltiples filas, por ejemplo en 500 registros de clientes.",
  },
  // Q6
  {
    category: "c02 — Normalización",
    question:
      "¿Qué anomalía ocurre cuando no podés registrar un proveedor sin tener al menos un producto asociado?",
    options: [
      "Anomalía de actualización",
      "Anomalía de borrado",
      "Anomalía de inserción",
      "Anomalía de duplicación",
    ],
    correct: 2,
    explanation:
      "La anomalía de inserción ocurre cuando no es posible insertar un dato sin que existan otros relacionados. Ejemplo: no poder cargar un proveedor sin un producto que lo vincule.",
  },
  // Q7
  {
    category: "c03 — BCNF / 4FN",
    question: "¿Qué es una dependencia multivaluada?",
    options: [
      "Cuando A determina unívocamente a B",
      "Cuando A determina un conjunto de valores de B",
      "Cuando B depende de parte de una clave compuesta",
      "Cuando A depende transitivamente de la PK",
    ],
    correct: 1,
    explanation:
      "Una dependencia multivaluada A →→ B ocurre cuando A determina un conjunto de valores de B, independientemente de los demás atributos. La 4FN elimina este tipo de dependencia.",
  },
  // Q8
  {
    category: "c04 — Constraints",
    question:
      "¿Qué constraint en PostgreSQL garantiza que un campo no pueda tener valores duplicados?",
    options: ["NOT NULL", "CHECK", "UNIQUE", "DEFAULT"],
    correct: 2,
    explanation:
      "El constraint UNIQUE garantiza que ningún valor en esa columna (o combinación de columnas) se repita en la tabla.",
  },
  // Q9
  {
    category: "c04 — Constraints",
    question: "¿Qué hace ON DELETE CASCADE en una clave foránea?",
    options: [
      "Bloquea el borrado si hay registros hijos",
      "Pone NULL en la FK del hijo al borrar el padre",
      "Propaga el borrado a todos los registros hijos",
      "No hace nada; es el comportamiento por defecto",
    ],
    correct: 2,
    explanation:
      "ON DELETE CASCADE propaga el borrado: si se elimina un registro padre, todos sus registros hijos son eliminados automáticamente.",
  },
  // Q10
  {
    category: "c04 — Constraints",
    question:
      "¿Qué constraint usarías para garantizar que el campo 'precio' siempre sea mayor a cero?",
    options: ["NOT NULL", "UNIQUE", "CHECK (precio > 0)", "DEFAULT 0"],
    correct: 2,
    explanation:
      "El constraint CHECK permite definir una condición arbitraria. CHECK (precio > 0) rechaza cualquier insert o update que intente poner un precio negativo o cero.",
  },
  // Q11
  {
    category: "c05 — CTEs",
    question: "¿Qué significa CTE en SQL?",
    options: [
      "Column Table Expression",
      "Common Table Expression",
      "Conditional Transaction Engine",
      "Computed Temporary Entity",
    ],
    correct: 1,
    explanation:
      "CTE significa Common Table Expression. Se define con la cláusula WITH y permite nombrar subconsultas para reutilizarlas, mejorando la legibilidad de consultas complejas.",
  },
  // Q12
  {
    category: "c05 — Window Functions",
    question:
      "¿Cuál es la diferencia principal entre GROUP BY y las Window Functions?",
    options: [
      "GROUP BY es más rápido siempre",
      "Window Functions colapsan las filas igual que GROUP BY",
      "GROUP BY colapsa filas; las Window Functions calculan valores por fila sin colapsar el resultado",
      "No hay diferencia, son equivalentes",
    ],
    correct: 2,
    explanation:
      "GROUP BY agrupa y colapsa las filas en una por grupo. Las Window Functions calculan un valor por fila (rankings, acumulados) manteniendo todas las filas visibles en el resultado.",
  },
  // Q13
  {
    category: "c05 — Subconsultas",
    question: "¿Qué hace la cláusula NOT EXISTS en una consulta SQL?",
    options: [
      "Verifica que la subconsulta no tenga errores de sintaxis",
      "Retorna las filas donde la subconsulta no devuelve ningún resultado",
      "Elimina los duplicados del resultado principal",
      "Excluye los valores NULL del resultado",
    ],
    correct: 1,
    explanation:
      "NOT EXISTS retorna las filas externas para las cuales la subconsulta no encuentra ningún resultado. Se usa para encontrar registros sin relaciones, como clientes sin pedidos.",
  },
  // Q14
  {
    category: "c06 — Funciones y Procedures",
    question: "¿Con qué sentencia se invoca un Stored Procedure en PostgreSQL?",
    options: ["SELECT proc()", "EXECUTE proc()", "CALL proc()", "RUN proc()"],
    correct: 2,
    explanation:
      "Los Stored Procedures se invocan con CALL. Las funciones se usan dentro de un SELECT. Esta diferencia es clave entre ambos objetos en PostgreSQL.",
  },
  // Q15
  {
    category: "c06 — Funciones",
    question:
      "¿Qué lenguaje se usa para escribir funciones con lógica condicional (IF, loops) en PostgreSQL?",
    options: ["T-SQL", "PL/pgSQL", "PL/Python exclusivamente", "JavaScript"],
    correct: 1,
    explanation:
      "PL/pgSQL es el lenguaje procedural nativo de PostgreSQL. Permite escribir funciones y triggers con lógica condicional (IF/THEN/ELSE), bucles y manejo de excepciones.",
  },
  // Q16
  {
    category: "c06 — Triggers",
    question:
      "¿Qué tipo de trigger permite modificar los datos ANTES de que se inserten en la tabla?",
    options: [
      "AFTER trigger",
      "BEFORE trigger",
      "INSTEAD OF trigger",
      "ON COMMIT trigger",
    ],
    correct: 1,
    explanation:
      "El trigger BEFORE se ejecuta antes de cada fila afectada. En él, NEW puede modificarse (por ejemplo, normalizar el email a minúsculas antes del INSERT).",
  },
  // Q17
  {
    category: "c07 — Transacciones",
    question: "¿Qué significa ACID en el contexto de bases de datos?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Access, Control, Integrity, Distribution",
      "Automated, Concurrent, Indexed, Durable",
      "Atomic, Cached, Integrated, Dynamic",
    ],
    correct: 0,
    explanation:
      "ACID: Atomicity (todo o nada), Consistency (estado válido a válido), Isolation (sin interferencia entre transacciones) y Durability (persiste ante fallos).",
  },
  // Q18
  {
    category: "c07 — Transacciones",
    question:
      "¿Qué sentencia SQL deshace todos los cambios de una transacción en curso?",
    options: ["UNDO", "REVERT", "ROLLBACK", "CANCEL"],
    correct: 2,
    explanation:
      "ROLLBACK deshace todos los cambios realizados desde el BEGIN. Con ROLLBACK TO SAVEPOINT nombre solo deshace hasta un punto intermedio guardado.",
  },
  // Q19
  {
    category: "c07 — Transacciones",
    question:
      "¿Cómo opera PostgreSQL por defecto respecto a las transacciones?",
    options: [
      "Todas las sentencias quedan pendientes hasta un COMMIT manual",
      "En modo autocommit: cada sentencia es su propia transacción confirmada automáticamente",
      "Requiere siempre un BEGIN explícito antes de cualquier operación",
      "Nunca confirma cambios de forma automática",
    ],
    correct: 1,
    explanation:
      "PostgreSQL opera en modo autocommit por defecto: cada sentencia individual es una transacción separada que se confirma sola. Para agrupar operaciones hay que usar BEGIN explícitamente.",
  },
  // Q20
  {
    category: "c07 — Transacciones",
    question: "¿Qué es un SAVEPOINT en el contexto de una transacción?",
    options: [
      "Un backup automático que PostgreSQL hace cada cierto tiempo",
      "Un punto intermedio dentro de una transacción al que se puede volver con ROLLBACK TO",
      "Una confirmación parcial de los cambios realizados hasta ese momento",
      "Un mecanismo para pausar la transacción y reanudarla después",
    ],
    correct: 1,
    explanation:
      "Un SAVEPOINT es un marcador dentro de una transacción activa. Con ROLLBACK TO SAVEPOINT nombre se deshacen solo los cambios posteriores a ese punto, sin terminar la transacción.",
  },
];

// ---------------------------------------------------------------------------
// Quiz 5 — Bases de Datos (Hard)
// ---------------------------------------------------------------------------

const baseDatosHard: Question[] = [
  // Q1
  {
    category: "c01 — Intro SQL",
    question:
      "¿Por qué se decidió estandarizar un lenguaje (SQL) en lugar de las capacidades internas de los motores de bases de datos?",
    options: [
      "Porque los lenguajes son más fáciles de aprender que las APIs internas",
      "Porque la única forma de estandarizar software es a través de una interfaz de lenguaje común que ambos lados entiendan",
      "Porque IBM propuso el lenguaje y los demás lo adoptaron por presión comercial",
      "Porque NIST obligó a todas las empresas a adoptar un único motor relacional",
    ],
    correct: 1,
    explanation:
      "Estandarizar capacidades internas es imposible porque cada motor es propietario. La única forma viable es definir un lenguaje como interfaz entre la aplicación y cualquier motor, sin importar su implementación interna.",
  },
  // Q2
  {
    category: "c01 — Intro SQL",
    question:
      "Según Elizabeth Fong, ¿cuál es el riesgo de estandarizar una tecnología demasiado pronto?",
    options: [
      "Que el estándar sea adoptado por muy pocas empresas",
      "Que el mercado quede fragmentado con demasiados enfoques incompatibles",
      "Que se ahuyente la innovación porque las empresas no ven cómo competir con el estándar ya definido",
      "Que el gobierno pierda control sobre las adquisiciones tecnológicas",
    ],
    correct: 2,
    explanation:
      "Estandarizar muy temprano mata la innovación: las empresas sienten que todo ya está decidido y un producto mejor sería 'no estándar', sin posibilidad de entrar al mercado.",
  },
  // Q3
  {
    category: "c01 — Intro SQL",
    question:
      "¿Cuáles son las 5 funcionalidades mínimas que debe tener un SGBD según el modelo de referencia del DBSSG?",
    options: [
      "Crear, Leer, Actualizar, Eliminar y Reportar datos",
      "Almacenar, Recuperar, Modificar, Organizar y Eliminar datos",
      "Indexar, Consultar, Replicar, Respaldar y Encriptar datos",
      "Conectar, Autenticar, Consultar, Modificar y Cerrar sesión",
    ],
    correct: 1,
    explanation:
      "El DBSSG definió que un SGBD mínimo debe poder: Almacenar, Recuperar, Modificar, Organizar y Eliminar datos. Esta definición fue la base del proceso de estandarización que derivó en SQL.",
  },
  // Q4
  {
    category: "c02 — Normalización",
    question:
      "Una tabla VENTAS(nro_factura, producto_id, producto_nombre, cantidad) tiene que producto_nombre depende de producto_id, no de la clave completa. ¿Qué forma normal se viola?",
    options: [
      "1FN — por tener atributos no atómicos",
      "2FN — por dependencia parcial de la clave compuesta",
      "3FN — por dependencia transitiva",
      "BCNF — porque producto_id no es superclave",
    ],
    correct: 1,
    explanation:
      "Se viola la 2FN. La dependencia parcial ocurre cuando un atributo no-clave (producto_nombre) depende de solo una parte de la clave primaria compuesta (producto_id), no de la clave completa.",
  },
  // Q5
  {
    category: "c02 — Normalización",
    question:
      "¿Cuándo conviene desnormalizar una tabla en lugar de mantenerla completamente normalizada?",
    options: [
      "Siempre que el número de tablas en el esquema supere 10",
      "Cuando hay queries de lectura muy frecuentes con muchos JOINs y el rendimiento es prioritario",
      "Cuando los datos son puramente históricos y nunca se modifican",
      "Nunca: la desnormalización siempre introduce inconsistencias inevitables",
    ],
    correct: 1,
    explanation:
      "La desnormalización controlada mejora la performance de lectura (dashboards, data warehouses) a cambio de mayor complejidad en escrituras. Requiere mitigaciones como triggers o documentar la fuente de verdad.",
  },
  // Q6
  {
    category: "c02 — Normalización",
    question:
      "Una tabla clientes tiene (id, nombre, codigo_postal, ciudad) donde ciudad depende de codigo_postal. ¿Qué forma normal se viola?",
    options: ["1FN", "2FN", "3FN", "BCNF"],
    correct: 2,
    explanation:
      "Se viola la 3FN por dependencia transitiva: ciudad depende de codigo_postal, que a su vez depende de la PK (id). La solución es separar en una tabla ciudades(codigo_postal, ciudad).",
  },
  // Q7
  {
    category: "c03 — BCNF",
    question:
      "Dada la relación Inscripciones(estudiante, materia, profesor) con dependencias: (estudiante, materia) → profesor y profesor → materia. ¿Por qué NO está en BCNF?",
    options: [
      "Porque tiene atributos multivaluados no declarados",
      "Porque 'profesor → materia' viola BCNF: profesor determina materia pero no es superclave",
      "Porque la clave primaria compuesta no está formalmente definida",
      "Porque viola la 1FN al tener grupos repetidos de inscripciones",
    ],
    correct: 1,
    explanation:
      "BCNF exige que para toda dependencia funcional X → Y, X sea superclave. Aquí 'profesor → materia' viola BCNF porque 'profesor' no es superclave de la relación, aunque sí esté en 3FN.",
  },
  // Q8
  {
    category: "c03 — 4FN",
    question:
      "Un empleado puede tener múltiples habilidades y pertenecer a múltiples proyectos de forma independiente. Si se modela en una sola tabla (empleado, habilidad, proyecto), ¿qué forma normal se viola?",
    options: [
      "2FN — porque habilidad y proyecto dependen parcialmente de empleado",
      "3FN — porque existe una dependencia transitiva entre habilidad y proyecto",
      "BCNF — porque empleado no es superclave para todas las dependencias",
      "4FN — porque hay dos dependencias multivaluadas independientes sobre el mismo atributo",
    ],
    correct: 3,
    explanation:
      "Se viola la 4FN. Hay dos dependencias multivaluadas independientes: empleado →→ habilidad y empleado →→ proyecto. La solución es crear dos tablas separadas: (empleado, habilidad) y (empleado, proyecto).",
  },
  // Q9
  {
    category: "c04 — Constraints",
    question:
      "¿Cuándo usarías ON DELETE RESTRICT en lugar de ON DELETE CASCADE en una clave foránea?",
    options: [
      "Cuando los hijos no tienen sentido sin el padre, como ítems de un pedido",
      "Cuando querés proteger integridad, como impedir borrar un producto con historial de ventas",
      "Cuando la clave foránea puede ser NULL opcionalmente",
      "Cuando la tabla referenciada es muy grande y CASCADE sería lento",
    ],
    correct: 1,
    explanation:
      "RESTRICT protege la integridad bloqueando el borrado si existen hijos. Se usa cuando borrar el padre sería peligroso (producto con ventas). CASCADE se usa cuando los hijos no tienen sentido sin el padre (ítems de un pedido).",
  },
  // Q10
  {
    category: "c04 — Constraints",
    question: "¿Qué hace ON DELETE SET NULL en una clave foránea?",
    options: [
      "Borra los registros hijos automáticamente",
      "Bloquea el borrado del padre si tiene hijos",
      "Pone NULL en la columna FK de los hijos cuando se borra el padre",
      "Asigna el valor DEFAULT a la FK de los hijos",
    ],
    correct: 2,
    explanation:
      "ON DELETE SET NULL pone NULL en la columna FK de todos los registros hijos cuando se borra el padre. Útil cuando el hijo puede existir sin padre (ej: un pedido cuyo cliente fue eliminado).",
  },
  // Q11
  {
    category: "c05 — Subconsultas",
    question:
      "¿Por qué EXISTS suele ser más eficiente que IN cuando la subconsulta puede devolver muchas filas?",
    options: [
      "Porque EXISTS usa índices automáticamente mientras que IN no puede usarlos",
      "Porque EXISTS hace short-circuit: se detiene en el primer match sin procesar el resto",
      "Porque IN requiere ordenar todos los resultados de la subconsulta antes de comparar",
      "Porque EXISTS usa menos memoria de trabajo que IN en cualquier caso",
    ],
    correct: 1,
    explanation:
      "EXISTS se detiene apenas encuentra el primer resultado que satisface la condición (short-circuit evaluation). IN en cambio evalúa y materializa todos los resultados de la subconsulta antes de comparar.",
  },
  // Q12
  {
    category: "c05 — Window Functions",
    question:
      "¿Cuál es la diferencia entre RANK() y DENSE_RANK() cuando hay empates en el ordenamiento?",
    options: [
      "No hay diferencia, ambas asignan los mismos números",
      "RANK() deja huecos en la numeración tras un empate; DENSE_RANK() no los deja",
      "DENSE_RANK() deja huecos; RANK() es siempre continuo",
      "RANK() solo funciona con ORDER BY DESC",
    ],
    correct: 1,
    explanation:
      "Con empate en posición 1: RANK() asigna 1,1,3 (deja hueco). DENSE_RANK() asigna 1,1,2 (no deja huecos). ROW_NUMBER() siempre asigna números únicos: 1,2,3.",
  },
  // Q13
  {
    category: "c05 — JSONB",
    question:
      "¿Qué operador JSONB en PostgreSQL verifica si un documento 'contiene' un JSON específico y es muy eficiente con índice GIN?",
    options: [
      "->> (extrae valor como texto)",
      "-> (extrae valor como JSON)",
      "@> (contiene)",
      "#>> (ruta anidada)",
    ],
    correct: 2,
    explanation:
      "El operador @> (contiene) verifica si el JSONB izquierdo contiene el JSON derecho. Ejemplo: atributos @> '{\"ram\": 16}'. Es muy eficiente cuando existe un índice GIN sobre la columna JSONB.",
  },
  // Q14
  {
    category: "c05 — JSONB",
    question:
      "¿Cuál es la diferencia entre los operadores -> y ->> en JSONB de PostgreSQL?",
    options: [
      "-> busca en rutas anidadas; ->> solo busca en el primer nivel",
      "-> devuelve el valor como JSON (con comillas); ->> devuelve el valor como texto plano (sin comillas)",
      "-> filtra documentos; ->> extrae campos del documento",
      "No hay diferencia funcional, son alias el uno del otro",
    ],
    correct: 1,
    explanation:
      '-> devuelve el valor como tipo JSON (por ejemplo: "Dell" con comillas). ->> devuelve el valor como texto plano (Dell sin comillas), útil para comparaciones en WHERE o para mostrar al usuario.',
  },
  // Q15
  {
    category: "c06 — Funciones vs Procedures",
    question:
      "¿Cuál es la diferencia más importante entre una función y un stored procedure en PostgreSQL respecto al control de transacciones?",
    options: [
      "Las funciones pueden hacer COMMIT explícito; los procedures no",
      "Los procedures pueden ejecutar COMMIT/ROLLBACK explícitos; las funciones no pueden hacerlo",
      "Ambos pueden controlar transacciones de la misma forma con BEGIN/COMMIT",
      "Ninguno de los dos puede controlar transacciones: eso es solo del cliente",
    ],
    correct: 1,
    explanation:
      "Un stored procedure puede ejecutar COMMIT y ROLLBACK explícitos dentro de su cuerpo. Una función no puede hacerlo porque se ejecuta dentro de la transacción del llamador.",
  },
  // Q16
  {
    category: "c06 — Triggers",
    question:
      "¿Por qué se recomienda usar triggers con precaución en producción?",
    options: [
      "Porque los triggers no son compatibles con todas las versiones de PostgreSQL",
      "Porque generan lógica oculta, pueden encadenarse entre sí y degradar la performance en inserciones masivas",
      "Porque solo funcionan con tablas que tienen clave primaria definida",
      "Porque no pueden combinarse con foreign keys en el mismo esquema",
    ],
    correct: 1,
    explanation:
      "Los triggers tienen lógica 'invisible' que no se ve al leer el SQL de la aplicación, pueden disparar otros triggers en cadena, y en modo FOR EACH ROW pueden ser muy lentos en inserciones masivas.",
  },
  // Q17
  {
    category: "c06 — Triggers",
    question:
      "¿Qué variables especiales están disponibles dentro de una función trigger en PostgreSQL?",
    options: [
      "SELF y PARENT",
      "NEW y OLD",
      "CURRENT y PREVIOUS",
      "INSERT_ROW y DELETE_ROW",
    ],
    correct: 1,
    explanation:
      "NEW contiene los valores del registro nuevo (disponible en INSERT y UPDATE). OLD contiene los valores del registro anterior (disponible en UPDATE y DELETE). TG_OP indica la operación que disparó el trigger.",
  },
  // Q18
  {
    category: "c07 — Transacciones",
    question: "¿Para qué sirve un SAVEPOINT dentro de una transacción?",
    options: [
      "Para confirmar parcialmente los cambios realizados hasta ese punto",
      "Para crear un punto de retorno intermedio al que se puede hacer ROLLBACK sin deshacer toda la transacción",
      "Para pausar la transacción y reanudarla en una sesión diferente",
      "Para duplicar el estado actual de la base de datos en ese momento",
    ],
    correct: 1,
    explanation:
      "SAVEPOINT crea un marcador dentro de una transacción activa. Con ROLLBACK TO SAVEPOINT nombre se deshacen solo los cambios posteriores a ese punto, sin afectar los anteriores. La transacción continúa activa.",
  },
  // Q19
  {
    category: "c07 — Transacciones",
    question:
      "¿Qué mensaje de error emite PostgreSQL si intentás ejecutar un comando después de que ocurrió un error dentro de un BEGIN?",
    options: [
      "TRANSACTION_LOCKED: please commit or rollback first",
      "ERROR: current transaction is aborted, commands ignored until end of transaction block",
      "WARNING: transaction in error state, results may be undefined",
      "FATAL: connection lost due to transaction error",
    ],
    correct: 1,
    explanation:
      "Cuando ocurre un error dentro de un bloque BEGIN, la transacción queda en estado abortado. PostgreSQL ignora todos los comandos siguientes con ese mensaje hasta que se hace ROLLBACK.",
  },
  // Q20
  {
    category: "c07 — Transacciones",
    question:
      "¿Qué propiedad ACID garantiza que si el servidor se apaga durante una transacción confirmada con COMMIT, los datos no se pierden?",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    correct: 3,
    explanation:
      "Durability garantiza que una vez que una transacción fue confirmada con COMMIT, sus cambios persisten incluso ante fallos del sistema. PostgreSQL lo implementa a través del WAL (Write-Ahead Log).",
  },
];

// ---------------------------------------------------------------------------
// Quiz 6 — Bases de Datos (Avanzado / Desafío)
// ---------------------------------------------------------------------------

const baseDatosAvanzado: Question[] = [
  // Q1
  {
    category: "c01 — Estandarización SQL",
    question:
      "El proceso de estandarización de SQL tardó más de 10 años. Según el análisis de Elizabeth Fong, ¿por qué ese período prolongado fue beneficioso y no un fracaso?",
    options: [
      "Porque las disputas entre IBM y Oracle forzaron mejoras técnicas al estándar",
      "Porque el proceso fue bidireccional: la industria informó el estándar y el estándar impulsó I+D, dando tiempo a las empresas para adoptar el modelo relacional",
      "Porque el gobierno federal necesitaba tiempo para auditar cada propuesta antes de aprobarla",
      "Porque la complejidad matemática del modelo relacional requirió años de investigación académica adicional",
    ],
    correct: 1,
    explanation:
      "El largo proceso fue bidireccional: la I+D de la industria informó el estándar, y el proceso de estandarización impulsó más investigación. Las empresas tuvieron tiempo de adoptar el modelo relacional antes de que el estándar se finalizara, construyendo un consenso real y duradero.",
  },
  // Q2
  {
    category: "c01 — Estandarización SQL",
    question:
      "¿Por qué el gobierno federal de EE.UU. tenía tanto interés en estandarizar SQL, y quién tenía la decisión final de compra?",
    options: [
      "Porque quería fomentar la industria tecnológica nacional; el NIST decidía qué comprar",
      "Porque era un gran consumidor de tecnología propietaria y quería portabilidad; las agencias compradoras decidían, no el NIST",
      "Porque quería eliminar a IBM del mercado; el Congreso aprobaba cada compra",
      "Porque necesitaba interoperabilidad militar; el Departamento de Defensa tenía la decisión final",
    ],
    correct: 1,
    explanation:
      "El gobierno era un gran consumidor de sistemas costosos y propietarios. Necesitaba un estándar para evitar la dependencia de un proveedor. Sin embargo, la decisión final siempre fue de las agencias compradoras (las que pagan), no del NIST, que solo contribuía con el proceso de estandarización.",
  },
  // Q3
  {
    category: "c02 — Normalización avanzada",
    question:
      "Dada la relación R(A, B, C, D) con dependencias funcionales: AB → C, AB → D, C → B. ¿Está en BCNF? ¿Por qué?",
    options: [
      "Sí, porque la clave primaria AB determina todos los atributos restantes",
      "No, porque C → B viola BCNF: C determina B pero C no es superclave de R",
      "Sí, porque no existe ninguna dependencia transitiva entre atributos no-clave",
      "No, porque D no participa en ninguna clave candidata de la relación",
    ],
    correct: 1,
    explanation:
      "BCNF exige que para toda dependencia funcional X → Y no trivial, X sea superclave. Aquí C → B viola BCNF: C no es superclave (no determina todos los atributos de R). La relación puede estar en 3FN y aun así no estar en BCNF cuando hay múltiples claves candidatas superpuestas.",
  },
  // Q4
  {
    category: "c02 — Normalización avanzada",
    question:
      "¿Cuál es el riesgo principal de desnormalizar una columna (por ejemplo, guardar un campo 'total' calculado) y cómo se mitiga en PostgreSQL?",
    options: [
      "El riesgo es que la columna ocupe más espacio; se mitiga con compresión TOAST",
      "El riesgo es la inconsistencia de datos si se actualiza items pero no total; se mitiga con un trigger AFTER que recalcula",
      "El riesgo es que la columna desnormalizada no pueda indexarse; se mitiga con índice parcial",
      "El riesgo es que la query de lectura sea más lenta; se mitiga con una vista materializada",
    ],
    correct: 1,
    explanation:
      "El riesgo principal es la inconsistencia: si se insertan o modifican ítems sin actualizar el total, el dato desnormalizado queda desincronizado. Se mitiga con un trigger AFTER INSERT OR UPDATE OR DELETE en la tabla fuente que recalcula y actualiza el campo automáticamente.",
  },
  // Q5
  {
    category: "c03 — BCNF",
    question:
      "Dada la relación Inscripciones(estudiante, materia, profesor) con dependencias: (estudiante, materia) → profesor y profesor → materia. ¿Cuál es la descomposición correcta en BCNF?",
    options: [
      "Tabla1(estudiante, materia) y Tabla2(materia, profesor)",
      "Tabla1(profesor, materia) y Tabla2(estudiante, profesor)",
      "Tabla1(estudiante, materia, profesor) y Tabla2(profesor, materia) — sin cambios",
      "Tabla1(estudiante, profesor) y Tabla2(estudiante, materia)",
    ],
    correct: 1,
    explanation:
      "La descomposición BCNF correcta es: Tabla1(profesor, materia) — resuelve la dependencia problemática profesor → materia — y Tabla2(estudiante, profesor) — conecta al estudiante con su profesor. Así toda determinante es superclave en su tabla.",
  },
  // Q6
  {
    category: "c04 — Constraints avanzados",
    question:
      "Tenés una tabla rangos(id, minimo, maximo). Querés garantizar que minimo < maximo siempre. ¿Qué mecanismo usarías en PostgreSQL?",
    options: [
      "Dos constraints NOT NULL separados sobre minimo y maximo",
      "Un CHECK constraint a nivel de tabla: CHECK (minimo < maximo)",
      "Una foreign key de minimo hacia maximo",
      "Un índice UNIQUE compuesto sobre (minimo, maximo)",
    ],
    correct: 1,
    explanation:
      "Un CHECK a nivel de tabla puede referenciar múltiples columnas: CHECK (minimo < maximo). Se evalúa en cada INSERT y UPDATE, asegurando la invariante sin importar qué columna se modifique.",
  },
  // Q7
  {
    category: "c04 — Constraints avanzados",
    question:
      "¿Qué impacto tiene en producción ejecutar ALTER TABLE productos ADD CONSTRAINT chk_precio CHECK (precio > 0) sobre una tabla con millones de filas?",
    options: [
      "Ninguno: los nuevos constraints solo aplican a inserciones futuras",
      "Adquiere un lock sobre la tabla y valida TODOS los registros existentes antes de confirmar",
      "Falla inmediatamente si alguna fila viola el constraint, sin bloquear la tabla",
      "Solo valida una muestra aleatoria de filas para minimizar el bloqueo",
    ],
    correct: 1,
    explanation:
      "Agregar un CHECK con ALTER TABLE adquiere un lock y valida todas las filas existentes. En tablas grandes en producción esto puede ser disruptivo. La alternativa es ADD CONSTRAINT ... NOT VALID (solo valida futuras escrituras) y luego VALIDATE CONSTRAINT por separado con un lock más liviano.",
  },
  // Q8
  {
    category: "c05 — Window Functions avanzadas",
    question:
      "¿Qué calcula esta query? SELECT mes, ventas, AVG(ventas) OVER (ORDER BY mes ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS resultado FROM ventas_mensuales;",
    options: [
      "El promedio total de todas las ventas, repetido en cada fila",
      "El promedio móvil de los últimos 3 meses (mes actual + 2 anteriores)",
      "La suma acumulada de ventas desde el inicio hasta el mes actual",
      "El promedio de ventas del mes actual comparado con el mismo mes del año anterior",
    ],
    correct: 1,
    explanation:
      "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW define un marco de 3 filas: las 2 anteriores más la actual. AVG sobre ese marco calcula el promedio móvil de los últimos 3 meses. Técnica estándar para suavizar series temporales.",
  },
  // Q9
  {
    category: "c05 — Window Functions avanzadas",
    question:
      "¿Para qué sirve LAG() en una window function y qué caso de uso típico resuelve?",
    options: [
      "Para asignar un número de fila único dentro de cada partición",
      "Para acceder al valor de la fila anterior en el ordenamiento, permitiendo calcular variaciones o diferencias entre períodos",
      "Para obtener el valor máximo dentro de cada grupo sin colapsarlo",
      "Para contar cuántas filas existen antes de la fila actual",
    ],
    correct: 1,
    explanation:
      "LAG(columna) OVER (ORDER BY ...) devuelve el valor de la columna en la fila anterior según el orden definido. El caso de uso típico es calcular la variación entre períodos: ventas - LAG(ventas) OVER (ORDER BY mes) AS variacion_mensual.",
  },
  // Q10
  {
    category: "c05 — JSONB avanzado",
    question:
      "Tenés una columna atributos JSONB con miles de registros. Una query usa WHERE atributos @> '{\"ram\": 16}' y hace Seq Scan. ¿Cómo la optimizarías?",
    options: [
      "Índice B-tree sobre la columna atributos completa",
      "Índice HASH sobre atributos para búsquedas de igualdad exacta",
      "Índice GIN sobre atributos: es el tipo que soporta el operador @> en JSONB",
      "No se puede indexar JSONB; hay que extraer el campo a una columna normal",
    ],
    correct: 2,
    explanation:
      "El operador @> requiere un índice GIN (Generalized Inverted Index). Con CREATE INDEX idx ON productos USING GIN(atributos), la query pasa de Seq Scan a Bitmap Index Scan, reduciendo dramáticamente el tiempo de respuesta.",
  },
  // Q11
  {
    category: "c05 — CTEs avanzadas",
    question:
      "¿Cuál es la ventaja principal de encadenar múltiples CTEs (WITH cte1 AS (...), cte2 AS (...)) frente a subconsultas anidadas?",
    options: [
      "Las CTEs encadenadas siempre son más rápidas porque el optimizador las paraleliza",
      "Las CTEs mejoran la legibilidad al nombrar cada paso intermedio, facilitando debug y mantenimiento",
      "Las CTEs evitan que la subconsulta se evalúe más de una vez en cualquier escenario",
      "Las CTEs permiten hacer COMMIT parcial entre cada paso de la cadena",
    ],
    correct: 1,
    explanation:
      "La principal ventaja es la legibilidad y mantenibilidad: cada paso tiene un nombre descriptivo, el query se lee de arriba a abajo como una secuencia lógica, y es fácil debuggear ejecutando cada CTE por separado. En cuanto a performance, PostgreSQL decide si materializar o no según el optimizador.",
  },
  // Q12
  {
    category: "c06 — Lógica en DB vs aplicación",
    question:
      "Tenés una regla: 'un usuario no puede comprar si tiene más de 3 deudas vencidas'. ¿Dónde debería vivir esta lógica según las recomendaciones del curso?",
    options: [
      "En un trigger BEFORE INSERT en la tabla compras, para garantizarla a nivel motor",
      "En un stored procedure, porque puede hacer COMMIT/ROLLBACK según el resultado",
      "En la aplicación, porque es lógica de negocio compleja: testeable, versionable y debuggeable",
      "En un CHECK constraint, porque es la forma más eficiente de validar datos",
    ],
    correct: 2,
    explanation:
      "Las reglas de negocio complejas van en la aplicación: son testeables con unit tests, versionadas en git junto al código, y debuggeables en logs. Los triggers y constraints son para integridad estructural (PK, FK, NOT NULL, unicidad), no para workflows de negocio.",
  },
  // Q13
  {
    category: "c06 — Funciones avanzadas",
    question:
      "¿Cuál es la diferencia entre una función tabular (RETURNS TABLE) y una vista en PostgreSQL?",
    options: [
      "No hay diferencia; ambas son equivalentes en todos los contextos",
      "Las funciones tabulares pueden recibir parámetros y contener lógica condicional; las vistas son queries fijas sin parámetros",
      "Las vistas son más eficientes porque se materializan automáticamente",
      "Las funciones tabulares solo funcionan con PL/pgSQL; las vistas solo con SQL puro",
    ],
    correct: 1,
    explanation:
      "Una función tabular puede recibir parámetros (como cliente_id) y contener lógica condicional en PL/pgSQL. Una vista es una query fija reutilizable pero sin parámetros ni lógica dinámica. Se usan en contextos distintos.",
  },
  // Q14
  {
    category: "c07 — Transacciones y concurrencia",
    question:
      "¿Cuál es la anomalía de concurrencia donde dos transacciones leen un valor, cada una lo modifica basándose en el valor leído, y la segunda escritura sobreescribe a la primera sin ver su cambio?",
    options: [
      "Dirty Read: una transacción lee datos no confirmados de otra",
      "Phantom Read: una query devuelve filas distintas al repetirse en la misma transacción",
      "Lost Update: la actualización de una transacción es sobreescrita por otra sin ver su cambio",
      "Non-repeatable Read: el mismo SELECT devuelve resultados distintos en la misma transacción",
    ],
    correct: 2,
    explanation:
      "Lost Update ocurre cuando dos transacciones concurrentes leen un valor (ej: stock=10), cada una calcula su versión (10-3=7 y 10-2=8), y la segunda escritura (stock=8) sobreescribe a la primera (stock=7), perdiendo efectivamente el descuento de la primera transacción.",
  },
  // Q15
  {
    category: "c07 — Niveles de aislamiento",
    question:
      "¿Cuál es el nivel de aislamiento por defecto en PostgreSQL, y qué anomalía de concurrencia NO protege?",
    options: [
      "SERIALIZABLE — protege contra todo pero es el más restrictivo",
      "READ UNCOMMITTED — el más permisivo, permite dirty reads",
      "READ COMMITTED (default) — protege contra dirty reads pero no contra non-repeatable reads ni phantom reads",
      "REPEATABLE READ — protege contra dirty reads y non-repeatable reads pero no phantom reads",
    ],
    correct: 2,
    explanation:
      "READ COMMITTED es el nivel por defecto en PostgreSQL. Protege contra Dirty Reads (nunca ves datos no confirmados) pero no contra Non-repeatable Reads ni Phantom Reads. Para eliminar estas últimas se necesita REPEATABLE READ o SERIALIZABLE.",
  },
  // Q16
  {
    category: "c07 — Transacciones avanzadas",
    question:
      "¿Por qué SELECT ... FOR UPDATE SKIP LOCKED es la solución correcta para implementar una job queue con múltiples workers concurrentes en PostgreSQL?",
    options: [
      "Porque SKIP LOCKED es más rápido que FOR UPDATE en tablas grandes",
      "Porque FOR UPDATE bloquea la fila y SKIP LOCKED hace que otros workers la salteen en lugar de esperarla, garantizando que cada job se procese exactamente una vez",
      "Porque evita tener que usar COMMIT al final de la transacción del worker",
      "Porque permite que múltiples workers tomen el mismo job y el primero en terminar gana",
    ],
    correct: 1,
    explanation:
      "FOR UPDATE bloquea la fila seleccionada para el worker actual. SKIP LOCKED hace que los demás workers no esperen esa fila sino que la salteen y tomen la siguiente disponible. Resultado: cada job es procesado exactamente una vez, sin colisiones ni deadlocks.",
  },
  // Q17
  {
    category: "c07 — WAL",
    question:
      "El WAL (Write-Ahead Log) de PostgreSQL garantiza durabilidad. ¿Qué otro caso de uso moderno está directamente basado en el WAL?",
    options: [
      "La ejecución de índices GIN para búsquedas en JSONB",
      "Las window functions de tipo ROWS BETWEEN UNBOUNDED PRECEDING",
      "CDC (Change Data Capture) y replicación lógica: leer el WAL como stream de eventos para propagar cambios en tiempo real a otros sistemas",
      "La evaluación de CHECK constraints en tiempo de INSERT",
    ],
    correct: 2,
    explanation:
      "El WAL es la base del CDC y la replicación lógica. Herramientas como Supabase Realtime, Debezium y pglogical leen el WAL como stream de cambios para propagar INSERT/UPDATE/DELETE en tiempo real a WebSockets, Kafka, Elasticsearch u otros sistemas.",
  },
  // Q18
  {
    category: "c07 — Deadlocks",
    question:
      "Dos transacciones concurrentes acceden a las cuentas ID=1 e ID=2 en orden inverso y producen un deadlock. ¿Cuál es la estrategia de prevención más simple y efectiva?",
    options: [
      "Usar SERIALIZABLE como nivel de aislamiento en ambas transacciones",
      "Hacer COMMIT después de cada UPDATE individual para liberar los locks rápidamente",
      "Siempre acceder a los recursos en el mismo orden predefinido en todas las transacciones",
      "Usar FOR UPDATE NOWAIT para fallar rápido y reintentar desde la aplicación",
    ],
    correct: 2,
    explanation:
      "La prevención más simple es establecer un orden canónico de acceso: siempre bloquear la cuenta con ID menor primero. Si todas las transacciones respetan el mismo orden, ninguna puede crear un ciclo de espera. NOWAIT es una alternativa válida pero más compleja de manejar en la aplicación.",
  },
  // Q19
  {
    category: "c07 — WAL y recuperación",
    question:
      "¿Qué es Point-in-Time Recovery (PITR) y qué lo hace posible en PostgreSQL?",
    options: [
      "Una técnica para hacer ROLLBACK de una transacción específica por su ID",
      "La capacidad de restaurar la base de datos a cualquier momento exacto del pasado, usando un snapshot base más el WAL archivado",
      "Un mecanismo para replicar datos entre dos instancias de PostgreSQL en tiempo real",
      "La función de autoguardado que PostgreSQL hace cada 5 minutos por defecto",
    ],
    correct: 1,
    explanation:
      "PITR permite restaurar la base a cualquier instante específico del pasado. Requiere un backup base (snapshot) más el WAL archivado (stream de todos los cambios desde ese snapshot). Plataformas como Supabase y Neon lo ofrecen desde su dashboard sin configuración manual.",
  },
  // Q20
  {
    category: "c06 — Triggers avanzados",
    question:
      "Tenés un trigger AFTER INSERT en la tabla pedidos que actualiza un contador en la tabla clientes. Ese UPDATE en clientes dispara otro trigger. ¿Cuál es el problema y cómo se llama este patrón?",
    options: [
      "Se llama trigger recursivo y PostgreSQL lo bloquea automáticamente",
      "Se llaman triggers en cadena (cascading triggers). El problema es que son difíciles de debuggear, pueden generar comportamiento inesperado y degradar la performance",
      "No hay problema: PostgreSQL garantiza que el segundo trigger no se ejecute si fue disparado por otro trigger",
      "Se llama trigger circular y PostgreSQL emite un warning pero continúa ejecutando",
    ],
    correct: 1,
    explanation:
      "Los triggers en cadena (cascading triggers) ocurren cuando un trigger dispara una operación que activa otro trigger. Son difíciles de debuggear porque el comportamiento no es evidente leyendo el código, pueden crear cadenas largas e inesperadas de efectos, y degradan significativamente la performance en operaciones masivas.",
  },
];

const baseDatosNormalQuiz: Quiz = {
  id: "base-datos-normal",
  subject: "Bases de Datos",
  title: "Bases de Datos — Conceptos",
  subtitle: "SQL, normalización, constraints, funciones y transacciones",
  emoji: "🗄️",
  color: "var(--azul)",
  accentColor: "var(--verde-claro)",
  topics: [
    "Intro SQL",
    "Normalización",
    "BCNF / 4FN",
    "Constraints",
    "CTEs y Window Functions",
    "Funciones y Procedures",
    "Transacciones",
  ],
  normal: baseDatosNormal,
  hard: baseDatosHard,
};

const baseDatosAvanzadoQuiz: Quiz = {
  id: "base-datos-avanzado",
  subject: "Bases de Datos",
  title: "Bases de Datos — Desafío",
  subtitle: "Análisis profundo, concurrencia y casos de producción",
  emoji: "🧠",
  color: "var(--violeta)",
  accentColor: "var(--dorado)",
  topics: [
    "Estandarización SQL",
    "Normalización avanzada",
    "BCNF / 4FN",
    "Constraints avanzados",
    "Window Functions y JSONB",
    "Funciones vs Procedures",
    "Transacciones y concurrencia",
    "WAL y deadlocks",
  ],
  normal: baseDatosAvanzado,
  hard: [],
};

// ---------------------------------------------------------------------------
// Exported collection
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Quiz 4 — Bases de Datos II
// ---------------------------------------------------------------------------

const bd2Quiz: Quiz = {
  id: "bd2",
  subject: "Bases de Datos II",
  title: "Parcial · Bases de Datos II",
  subtitle: "Sección A: 15 múltiple choice · Sección B: completá el término",
  emoji: "🗄️",
  color: "var(--azul-claro)",
  accentColor: "var(--violeta)",
  topics: [
    "Normalización",
    "Dependencias funcionales",
    "Anomalías",
    "Constraints e integridad",
    "Subconsultas",
    "Window Functions",
    "Triggers",
    "Stored Procedures",
    "Transacciones ACID",
  ],
  normal: [
    // Q1
    {
      category: "Normalización",
      question:
        "Una tabla tiene la clave compuesta (turno_id, medico_id). El atributo paciente_nombre depende solo de turno_id. Esto es una dependencia:",
      options: ["Transitiva", "Parcial", "Multivaluada", "Trivial"],
      correct: 1,
      explanation:
        "Es una dependencia PARCIAL: paciente_nombre depende solo de una parte de la clave compuesta (turno_id), no de la clave completa (turno_id, medico_id). Esto viola la 2FN.",
    },
    // Q2
    {
      category: "Normalización",
      question:
        "Una tabla FACTURA(factura_id, cliente_id, cliente_ciudad, item_id, descripcion, precio) donde cliente_id → cliente_ciudad y factura_id → cliente_id. ¿Qué forma normal viola?",
      options: [
        "1FN — hay atributos no atómicos",
        "2FN — hay una dependencia parcial",
        "3FN — hay una dependencia transitiva",
        "No viola ninguna",
      ],
      correct: 2,
      explanation:
        "Viola la 3FN: cliente_ciudad depende de cliente_id (no de la PK factura_id). La cadena factura_id → cliente_id → cliente_ciudad es una dependencia transitiva. La 3FN exige que todo atributo dependa directamente de la clave primaria.",
    },
    // Q3
    {
      category: "Anomalías",
      question: "¿Cuál de estas situaciones es una anomalía de INSERCIÓN?",
      options: [
        "Al borrar el último pedido de un cliente, se pierde su dirección de envío",
        "Para registrar un nuevo proveedor hay que ingresar al menos un producto, aunque el proveedor aún no tenga productos",
        "Cambiar el nombre de una ciudad obliga a actualizar 500 filas",
        "Un constraint NOT NULL impide insertar una fila incompleta",
      ],
      correct: 1,
      explanation:
        "La anomalía de inserción ocurre cuando no podés agregar un dato sin que existan otros relacionados. No poder registrar un proveedor sin un producto es el ejemplo clásico.",
    },
    // Q4
    {
      category: "Integridad referencial",
      question: "ON DELETE RESTRICT en una FK significa:",
      options: [
        "Al eliminar el padre, los hijos se eliminan también",
        "Al eliminar el padre, los hijos quedan con NULL",
        "No se puede eliminar el padre si tiene hijos — el motor lanza un error",
        "Al eliminar el padre, los hijos adoptan el valor por defecto",
      ],
      correct: 2,
      explanation:
        "RESTRICT impide el borrado del padre si existen registros hijos que referencian esa clave. El motor lanza un error antes de ejecutar el DELETE.",
    },
    // Q5
    {
      category: "Constraints",
      question: "¿Cuál es la diferencia entre UNIQUE y PRIMARY KEY?",
      options: [
        "PRIMARY KEY puede tener NULLs; UNIQUE no",
        "UNIQUE puede tener NULLs (uno por columna en PostgreSQL); PRIMARY KEY no admite NULLs y es única por tabla",
        "Son idénticos, solo difieren en el nombre",
        "PRIMARY KEY permite duplicados si la tabla tiene muchas filas",
      ],
      correct: 1,
      explanation:
        "UNIQUE garantiza unicidad pero permite NULLs. PRIMARY KEY = UNIQUE + NOT NULL, y solo puede haber una por tabla.",
    },
    // Q6
    {
      category: "Subconsultas",
      question:
        "Una subconsulta en el FROM (también llamada derived table o inline view):",
      options: [
        "Se re-ejecuta por cada fila de la consulta exterior",
        "Se evalúa una sola vez y su resultado se trata como una tabla temporal",
        "Solo puede devolver una columna",
        "No puede usarse junto con JOIN",
      ],
      correct: 1,
      explanation:
        "Una derived table en el FROM se evalúa una sola vez y actúa como tabla temporal. El optimizador puede decidir materializarla o integrarla (inline) según el plan de ejecución.",
    },
    // Q7
    {
      category: "Subconsultas",
      question: "EXISTS (SELECT 1 FROM ...) devuelve:",
      options: [
        "El primer valor de la subconsulta",
        "La cantidad de filas que devuelve la subconsulta",
        "TRUE si la subconsulta devuelve al menos una fila, FALSE si no devuelve ninguna",
        "TRUE solo si la subconsulta devuelve exactamente una fila",
      ],
      correct: 2,
      explanation:
        "EXISTS evalúa si la subconsulta retorna al menos una fila. No importa el valor — por eso se usa SELECT 1 para eficiencia. Retorna TRUE o FALSE.",
    },
    // Q8
    {
      category: "Window Functions",
      question: "¿Para qué sirve una window function en SQL?",
      options: [
        "Para filtrar filas antes de que se aplique el GROUP BY",
        "Para calcular un valor por fila usando un conjunto de filas relacionadas, sin eliminar filas del resultado",
        "Para ejecutar una función sobre cada tabla en una ventana de tiempo determinada",
        "Para reemplazar los JOINs cuando se consultan varias tablas a la vez",
      ],
      correct: 1,
      explanation:
        "Las window functions calculan sobre una 'ventana' de filas relacionadas sin colapsar el resultado como GROUP BY. Permiten rankings, acumulados, promedios móviles, etc.",
    },
    // Q9
    {
      category: "Triggers",
      question: "Un trigger BEFORE UPDATE FOR EACH ROW puede:",
      options: [
        "Modificar los valores de NEW antes de que se escriban en la tabla",
        "Solo leer NEW y OLD, no modificarlos",
        "Cancelar el UPDATE devolviendo OLD en lugar de NEW",
        "Hacer COMMIT dentro del trigger",
      ],
      correct: 0,
      explanation:
        "En un BEFORE trigger podés modificar NEW antes de que se persista. Es útil para validaciones y transformaciones automáticas de datos.",
    },
    // Q10
    {
      category: "Stored Procedures",
      question:
        "Un stored procedure en PostgreSQL se diferencia de una function en que:",
      options: [
        "El procedure es más rápido porque no retorna valores",
        "El procedure puede ejecutar COMMIT y ROLLBACK internamente; la function no puede",
        "La function solo puede usarse con triggers; el procedure con cualquier operación",
        "No hay diferencia práctica en PostgreSQL moderno",
      ],
      correct: 1,
      explanation:
        "La diferencia clave: los stored procedures pueden controlar transacciones (COMMIT, ROLLBACK). Las functions corren dentro de la transacción del llamador.",
    },
    // Q11
    {
      category: "Transacciones ACID",
      question:
        "BEGIN; UPDATE ...; UPDATE ...; COMMIT; — si el segundo UPDATE viola un CHECK constraint:",
      options: [
        "El primer UPDATE queda confirmado, el segundo no",
        "Ambos UPDATEs se revierten — ninguno tiene efecto",
        "Solo el segundo UPDATE falla, el primero sigue en la base",
        "PostgreSQL hace COMMIT automático del primer UPDATE antes de fallar",
      ],
      correct: 1,
      explanation:
        "Las transacciones son atómicas: todo o nada. Si el segundo UPDATE falla, la transacción queda en estado abortado y al hacer ROLLBACK (o al detectar el error) ambos cambios se deshacen.",
    },
    // Q12
    {
      category: "ACID",
      question: "La propiedad ACID de CONSISTENCIA garantiza que:",
      options: [
        "Las transacciones se ejecutan sin interferencia entre sí",
        "Los cambios confirmados sobreviven a fallos de hardware",
        "La base de datos pasa de un estado válido a otro estado válido — los constraints nunca quedan violados al finalizar una transacción",
        "Todas las operaciones de una transacción ocurren o ninguna ocurre",
      ],
      correct: 2,
      explanation:
        "Consistencia: la DB siempre pasa de un estado válido a otro. Ninguna transacción puede dejar la base en un estado que viole las reglas de integridad definidas.",
    },
    // Q13
    {
      category: "Transacciones ACID",
      question: "ROLLBACK TO SAVEPOINT sp1:",
      options: [
        "Termina la transacción y deshace todo desde el BEGIN",
        "Deshace solo los cambios posteriores a SAVEPOINT sp1 y mantiene la transacción abierta",
        "Es equivalente a ROLLBACK completo",
        "Confirma los cambios hasta sp1 y descarta los posteriores",
      ],
      correct: 1,
      explanation:
        "ROLLBACK TO SAVEPOINT vuelve al estado del savepoint sin terminar la transacción. Los cambios anteriores al savepoint se preservan; los posteriores se deshacen.",
    },
    // Q14
    {
      category: "Stored Procedures",
      question:
        "¿Cuál de las siguientes es una razón válida para usar un stored procedure en lugar de SQL directo desde la aplicación?",
      options: [
        "Los stored procedures son siempre más rápidos que el SQL enviado por la app",
        "Permiten encapsular lógica compleja de negocio con manejo de errores y transacciones en la base, reutilizable desde múltiples clientes",
        "Son obligatorios para operaciones con más de 3 tablas",
        "Evitan la necesidad de usar índices",
      ],
      correct: 1,
      explanation:
        "Los procedures encapsulan lógica de negocio, manejo de errores y control transaccional directamente en la BD, haciéndola reutilizable desde cualquier cliente.",
    },
    // Q15
    {
      category: "Triggers",
      question:
        "Tenés este trigger:\nCREATE OR REPLACE FUNCTION validar_stock()\nRETURNS TRIGGER AS $$\nBEGIN\n    IF NEW.stock < 0 THEN\n        RAISE EXCEPTION 'Stock no puede ser negativo';\n    END IF;\n    RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER chk_stock\nBEFORE INSERT OR UPDATE ON productos\nFOR EACH ROW EXECUTE FUNCTION validar_stock();\n\nAhora ejecutás: UPDATE productos SET stock = -5 WHERE producto_id = 1;\n¿Qué ocurre?",
      options: [
        "El UPDATE se ejecuta y luego se lanza el error",
        "El UPDATE se cancela y se lanza el error 'Stock no puede ser negativo'",
        "El trigger no se dispara porque es un UPDATE, no un INSERT",
        "RETURN NEW confirma el UPDATE aunque el stock sea negativo",
      ],
      correct: 1,
      explanation:
        "El trigger es BEFORE, así que se ejecuta antes del UPDATE. Como NEW.stock = -5 < 0, RAISE EXCEPTION cancela la operación y PostgreSQL lanza el error. El dato nunca se persiste.",
    },
    // Q16
    {
      category: "Anomalías",
      question:
        "Se borra el único empleado del departamento D04. Como resultado, se pierde para siempre el nombre y la ciudad de ese departamento.\n\n¿Cómo se llama este tipo de anomalía?",
      options: [
        "Anomalía de actualización",
        "Anomalía de borrado",
        "Anomalía de inserción",
        "Inconsistencia referencial",
      ],
      correct: 1,
      explanation:
        "Es una anomalía de BORRADO: al eliminar el único empleado del departamento, se pierden sus datos (nombre, ciudad) que no deberían estar en la tabla EMPLEADO. La solución es separar DEPARTAMENTOS en su propia tabla.",
    },
    // Q17 — 3FN decomposition
    {
      category: "Normalización",
      question:
        "La tabla EMPLEADO (empleado_id PK, nombre, departamento_id, departamento_nombre, departamento_ciudad) está en 2FN pero viola 3FN.\n\nEl diagrama muestra su estado actual. ¿Cuántas tablas hacen falta para llevarla a 3FN?",
      diagram: [
        {
          name: "EMPLEADO",
          columns: [
            { type: "int", name: "empleado_id", constraints: ["PK"] },
            { type: "string", name: "nombre", constraints: [] },
            { type: "int", name: "departamento_id", constraints: [] },
            { type: "string", name: "departamento_nombre", constraints: [] },
            { type: "string", name: "departamento_ciudad", constraints: [] },
          ],
        },
      ],
      diagramCaption:
        "Estado actual (2FN) — ¿cuántas tablas hacen falta para llegar a 3FN?",
      options: [
        "1 tabla — solo hay que agregar un índice en departamento_id",
        "2 tablas — EMPLEADOS y DEPARTAMENTOS, con FK de empleados a departamentos",
        "3 tablas — EMPLEADOS, DEPARTAMENTOS y CIUDADES",
        "4 tablas — una por cada atributo del departamento",
      ],
      correct: 1,
      explanation:
        "En 3FN cada atributo no-clave debe depender directamente de la PK. departamento_nombre y departamento_ciudad dependen de departamento_id (no de empleado_id) — eso es una dependencia transitiva. La solución son 2 tablas: EMPLEADOS(empleado_id PK, nombre, departamento_id FK) y DEPARTAMENTOS(departamento_id PK, departamento_nombre, departamento_ciudad).",
    },
    // Q18 — SQL Streaming
    {
      category: "SQL — Streaming",
      question:
        "Tenés estas tablas:\nartistas(artista_id, nombre, pais, genero)\ncanciones(cancion_id, artista_id, titulo, duracion_seg, anio)\nescuchas(escucha_id, cancion_id, usuario_id, fecha)\n\nEscribí una consulta que liste los artistas con al menos una canción que tenga más de 100 escuchas. Mostrar nombre, pais y total_escuchas. Ordenar por total_escuchas DESC.\n\n¿Cuál de estas queries es correcta?",
      options: [
        "SELECT a.nombre, a.pais, COUNT(*) AS total_escuchas\nFROM artistas a\nJOIN canciones c ON a.artista_id = c.artista_id\nJOIN escuchas e ON c.cancion_id = e.cancion_id\nGROUP BY a.artista_id, a.nombre, a.pais\nORDER BY total_escuchas DESC;",
        "SELECT a.nombre, a.pais, COUNT(e.escucha_id) AS total_escuchas\nFROM artistas a\nJOIN canciones c ON a.artista_id = c.artista_id\nJOIN escuchas e ON c.cancion_id = e.cancion_id\nGROUP BY a.artista_id, a.nombre, a.pais\nHAVING COUNT(e.escucha_id) > 100\nORDER BY total_escuchas DESC;",
        "SELECT a.nombre, a.pais, COUNT(*) AS total_escuchas\nFROM artistas a\nJOIN canciones c ON a.artista_id = c.artista_id\nJOIN escuchas e ON c.cancion_id = e.cancion_id\nWHERE total_escuchas > 100\nGROUP BY a.artista_id, a.nombre, a.pais\nORDER BY total_escuchas DESC;",
        "SELECT a.nombre, a.pais, COUNT(*) AS total_escuchas\nFROM artistas a\nJOIN escuchas e ON a.artista_id = e.cancion_id\nGROUP BY a.artista_id\nHAVING total_escuchas > 100\nORDER BY total_escuchas DESC;",
      ],
      correct: 1,
      explanation:
        "La opción B es correcta. Clave: (1) HAVING filtra grupos después del GROUP BY — no se puede usar WHERE con aliases agregados; (2) el JOIN correcto es artistas→canciones→escuchas; (3) se agrupa por artista_id para no duplicar si hay homónimos. La opción A no tiene HAVING. La opción C usa WHERE con alias (inválido). La D hace JOIN incorrecto entre artista_id y cancion_id.",
    },
    // Q17 — ya existente, se mantiene
    {
      category: "SQL — Streaming",
      question:
        "Usando las mismas tablas (artistas, canciones, escuchas), escribí una CTE que encuentre el artista con más escuchas por género. Columnas: genero, nombre, total_escuchas.\n\n¿Cuál de estas queries es correcta?",
      options: [
        "WITH escuchas_por_artista AS (\n  SELECT a.genero, a.nombre,\n         COUNT(e.escucha_id) AS total_escuchas\n  FROM artistas a\n  JOIN canciones c ON a.artista_id = c.artista_id\n  JOIN escuchas e ON c.cancion_id = e.cancion_id\n  GROUP BY a.genero, a.artista_id, a.nombre\n)\nSELECT genero, nombre, total_escuchas\nFROM escuchas_por_artista\nORDER BY total_escuchas DESC;",
        "WITH escuchas_por_artista AS (\n  SELECT a.genero, a.nombre,\n         COUNT(e.escucha_id) AS total_escuchas\n  FROM artistas a\n  JOIN canciones c ON a.artista_id = c.artista_id\n  JOIN escuchas e ON c.cancion_id = e.cancion_id\n  GROUP BY a.genero, a.artista_id, a.nombre\n),\nmax_por_genero AS (\n  SELECT genero, MAX(total_escuchas) AS max_escuchas\n  FROM escuchas_por_artista\n  GROUP BY genero\n)\nSELECT e.genero, e.nombre, e.total_escuchas\nFROM escuchas_por_artista e\nJOIN max_por_genero m\n  ON e.genero = m.genero\n  AND e.total_escuchas = m.max_escuchas\nORDER BY e.genero;",
        "WITH top_genero AS (\n  SELECT a.genero, a.nombre,\n         COUNT(*) AS total_escuchas,\n         ROW_NUMBER() OVER (PARTITION BY a.genero ORDER BY COUNT(*) DESC) AS rn\n  FROM artistas a\n  JOIN canciones c ON a.artista_id = c.artista_id\n  JOIN escuchas e ON c.cancion_id = e.cancion_id\n  GROUP BY a.genero, a.artista_id, a.nombre\n)\nSELECT genero, nombre, total_escuchas\nFROM top_genero\nWHERE rn = 1\nORDER BY genero;",
        "WITH escuchas_genero AS (\n  SELECT a.genero, MAX(COUNT(*)) AS total_escuchas\n  FROM artistas a\n  JOIN escuchas e ON a.artista_id = e.escucha_id\n  GROUP BY a.genero\n)\nSELECT genero, nombre, total_escuchas\nFROM escuchas_genero;",
      ],
      correct: 1,
      explanation:
        "La opción B es correcta: usa dos CTEs — la primera calcula total por artista, la segunda obtiene el máximo por género — y el JOIN final cruza ambas para quedarse con el artista que iguale ese máximo. La opción A no filtra por género. La C es también correcta técnicamente (usa ROW_NUMBER en una sola CTE) pero el enunciado pide explicitamente una CTE clásica. La D usa MAX(COUNT(*)) que es inválido y hace un JOIN incorrecto.",
    },
    // Q18
    {
      category: "SQL — Transacciones",
      question:
        "Problema 3a) Un sistema bancario ejecuta una transferencia entre cuentas:\n1. Verificar saldo suficiente en cuenta origen\n2. Descontar monto de cuenta origen\n3. Acreditar monto en cuenta destino\n4. Registrar en tabla movimientos\n\nTablas: cuentas(cuenta_id, saldo) y movimientos\n\n¿Cuál de estos bloques ejecuta la transferencia de forma CORRECTA y atómica?",
      options: [
        "-- Opción A\nUPDATE cuentas SET saldo = saldo - 500 WHERE cuenta_id = 1;\nUPDATE cuentas SET saldo = saldo + 500 WHERE cuenta_id = 2;\nINSERT INTO movimientos(origen, destino, monto) VALUES (1, 2, 500);\nCOMMIT;",
        "-- Opción B\nBEGIN;\n  IF (SELECT saldo FROM cuentas WHERE cuenta_id = 1) < 500 THEN\n    RAISE EXCEPTION 'Saldo insuficiente';\n  END IF;\n  UPDATE cuentas SET saldo = saldo - 500 WHERE cuenta_id = 1;\n  UPDATE cuentas SET saldo = saldo + 500 WHERE cuenta_id = 2;\n  INSERT INTO movimientos(origen, destino, monto) VALUES (1, 2, 500);\nCOMMIT;",
        "-- Opción C\nBEGIN;\n  UPDATE cuentas SET saldo = saldo - 500 WHERE cuenta_id = 1;\n  UPDATE cuentas SET saldo = saldo + 500 WHERE cuenta_id = 2;\n  INSERT INTO movimientos(origen, destino, monto) VALUES (1, 2, 500);\nROLLBACK;",
        "-- Opción D\nBEGIN;\n  UPDATE cuentas SET saldo = saldo - 500 WHERE cuenta_id = 1;\nCOMMIT;\n  UPDATE cuentas SET saldo = saldo + 500 WHERE cuenta_id = 2;\n  INSERT INTO movimientos(origen, destino, monto) VALUES (1, 2, 500);\nCOMMIT;",
      ],
      correct: 1,
      explanation:
        "La opción B es correcta: (1) usa BEGIN para abrir la transacción; (2) verifica el saldo ANTES de operar y lanza RAISE EXCEPTION si es insuficiente — lo que cancela todo automáticamente; (3) ejecuta ambos UPDATEs y el INSERT dentro del mismo bloque atómico; (4) cierra con COMMIT solo si todo anduvo bien.\n\nLa A no tiene BEGIN ni validación de saldo. La C termina con ROLLBACK — deshace todo siempre. La D hace un COMMIT en el medio — rompe la atomicidad: si falla el segundo UPDATE, el dinero ya salió pero no llegó.",
    },
    // Q19
    {
      category: "SQL — Transacciones",
      question:
        "Problema 3b) El servidor se cae justo después de que PostgreSQL ejecutó COMMIT en la transferencia.\n\n¿Qué propiedad ACID garantiza que la transferencia igual persiste? ¿Cómo la implementa PostgreSQL?",
      options: [
        "Atomicidad — PostgreSQL garantiza que si el COMMIT se ejecutó, la transacción completa quedó guardada en RAM hasta el próximo inicio.",
        "Durabilidad — PostgreSQL escribe los cambios en el WAL (Write-Ahead Log) antes de confirmar el COMMIT. Al reiniciar, reproduce el WAL para recuperar las transacciones confirmadas.",
        "Consistencia — PostgreSQL valida todos los constraints antes del COMMIT y guarda una copia del estado válido en disco.",
        "Aislamiento — PostgreSQL usa MVCC para que otras transacciones vean los datos confirmados incluso si el servidor reinicia.",
      ],
      correct: 1,
      explanation:
        "Es DURABILIDAD (la D de ACID). PostgreSQL la implementa con el WAL (Write-Ahead Log): antes de confirmar el COMMIT, registra todos los cambios en un log secuencial en disco. Si el servidor cae justo después del COMMIT, al reiniciar PostgreSQL reproduce el WAL y restaura exactamente el estado confirmado. Sin WAL, un corte de luz posterior al COMMIT podría perder los datos que estaban solo en memoria.",
    },
  ],
  hard: [],
  fillQuestions: bd2SectionB,
  hasFill: true,
};

export const quizzes: Quiz[] = [
  ecosistemasQuiz,
  techBasicoQuiz,
  techAvanzadoQuiz,
  baseDatosNormalQuiz,
  baseDatosAvanzadoQuiz,
  bd2Quiz,
];

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}
