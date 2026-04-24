import {
  questions,
  hardQuestions,
  type Question,
  type Difficulty,
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
// Exported collection
// ---------------------------------------------------------------------------

export const quizzes: Quiz[] = [
  ecosistemasQuiz,
  techBasicoQuiz,
  techAvanzadoQuiz,
];

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}
