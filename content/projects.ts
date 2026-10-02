import type { StaticImageData } from "next/image"
import type { Locale } from "@/lib/i18n"

import aruateam from "@/assets/projects/aruateam.webp"
import beaconSplit from "@/assets/projects/beacon-split.webp"
import bruto from "@/assets/projects/bruto.webp"
import gymy from "@/assets/projects/gymy.webp"
import mcloc from "@/assets/projects/mcloc.webp"
import memojiMy from "@/assets/projects/memoji-my.webp"
import nhoa from "@/assets/projects/nhoa.webp"
import particleLife from "@/assets/projects/particle-life.webp"
import superveil from "@/assets/projects/superveil.webp"

type ProjectText = {
  description: string
  /** The essential points, shown as a list on the large cards. */
  highlights?: string[]
  /** Short status shown as a badge, e.g. "In production". */
  status?: string
  /** A result worth showing off, e.g. a Product Hunt rank; links to `awardUrl`. */
  award?: string
  imageAlt: string
}

type ProjectData = {
  slug: string
  title: string
  year: string
  featured: boolean
  tech: string[]
  image: StaticImageData
  /** Live site, or `null` when there is no public page to visit. */
  link: string | null
  /** Public repository, or `null` when the code is private. */
  repo: string | null
  /** Someone who built it with me. */
  credit?: { name: string; url: string }
  /** The project's own account on a social network. */
  social?: { label: string; url: string }
  /** The project's page on Product Hunt. */
  productHunt?: string
  /** Proof of the award, e.g. that day's leaderboard. */
  awardUrl?: string
  text: Record<Locale, ProjectText>
}

export type Project = Omit<ProjectData, "text"> & ProjectText

const edu = { name: "Edu Ruiz", url: "https://github.com/hxst1" }

const projects: ProjectData[] = [
  {
    slug: "gymy",
    title: "Gym.y",
    year: "2026",
    featured: true,
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "PWA", "Web Push"],
    image: gymy,
    link: "https://gym-y.vercel.app/",
    repo: null,
    text: {
      en: {
        status: "In production",
        description:
          "A training log made to be used at the gym, with your phone in one hand. It started as my own and now also serves coaches and their athletes.",
        highlights: [
          "Distraction-free mode to log set by set, with RIR and rest timers.",
          "Coach mode: plan mesocycles, assign routines and follow each athlete's progress. The athlete decides what to share.",
          "Installable app with push notifications for rests, reminders and news from your coach.",
          "Each user's data is isolated in Postgres with row-level security.",
        ],
        imageAlt:
          "Three phones with Gym.y: the routine for the day, a set being logged in distraction-free mode, and the muscles and weight progress of an exercise",
      },
      es: {
        status: "En producción",
        description:
          "Un diario de entrenamiento pensado para usarse en el gimnasio, con el móvil en una mano. Nació para mí y hoy también sirve a entrenadores y a sus alumnos.",
        highlights: [
          "Modo sin distracciones para apuntar serie a serie, con RIR y descansos.",
          "Modo entrenador: programa mesociclos, asigna rutinas y sigue el progreso de cada alumno. El alumno decide qué comparte.",
          "App instalable con avisos push de descansos, recordatorios y novedades del entrenador.",
          "Los datos de cada usuario, aislados en Postgres con seguridad a nivel de fila.",
        ],
        imageAlt:
          "Tres móviles con Gym.y: la rutina del día, una serie en el modo sin distracciones y los músculos y la progresión de peso de un ejercicio",
      },
    },
  },
  {
    slug: "bruto",
    title: "Bruto",
    year: "2026",
    featured: true,
    tech: ["React", "TypeScript", "Vite", "File System Access API", "MCP", "Node.js", "PWA", "Playwright"],
    image: bruto,
    link: "https://jimy-k4.github.io/bruto/",
    repo: "https://github.com/jimy-k4/bruto",
    social: { label: "@brutoboard", url: "https://x.com/brutoboard" },
    productHunt: "https://www.producthunt.com/products/bruto",
    awardUrl: "https://www.producthunt.com/leaderboard/daily/2026/9/30",
    text: {
      en: {
        status: "Open source",
        award: "#14 of the day on Product Hunt",
        description:
          "A brutalist, local-first task board for building projects with AI. It started as a tool for my own work at gtt and I use it every day: the notes live in a file inside each project, so you and any assistant work from the same source.",
        highlights: [
          "#14 of the day on Product Hunt (30 September 2026) among 1,134 launches, built by one person, with fixes from the comments shipped that same day.",
          "Your AI assistant reads the notes and answers inside them, over MCP or with the context you copy with one key. You review and ask for changes in the note itself.",
          "Every change an agent makes over MCP is on record: who made it, when and with what, tied to the commit and the exact files. A note can be read-only for agents. The MCP server is on npm as bruto-mcp.",
          "It understands the project: web pages and components, APIs (.NET, Express, Spring…) and databases (Oracle PL/SQL, PostgreSQL, Prisma…). A note can block or relate to one on another project's board.",
          "No account and no server: install it as an app, use it offline, in 9 languages.",
        ],
        imageAlt: "Bruto board with notes connected by arrows, each with its age, and the note editor open",
      },
      es: {
        status: "Código abierto",
        award: "#14 del día en Product Hunt",
        description:
          "Un tablero de tareas brutalista y local-first para construir proyectos con IA. Nació como herramienta para mi trabajo en gtt y hoy lo uso cada día: las notas viven en un fichero dentro de cada proyecto, así que tú y cualquier asistente trabajáis sobre la misma fuente.",
        highlights: [
          "#14 del día en Product Hunt (30 de septiembre de 2026) entre 1.134 lanzamientos, hecho por una sola persona y con arreglos salidos de los comentarios ese mismo día.",
          "Tu asistente de IA lee las notas y las contesta dentro de ellas, por MCP o con el contexto que copias de una tecla. Tú revisas y pides cambios en la propia nota.",
          "Cada cambio que hace un agente por MCP queda registrado: quién, cuándo y con qué, ligado al commit y a los ficheros exactos. Una nota puede ser de solo lectura para los agentes. El servidor MCP está en npm como bruto-mcp.",
          "Entiende el proyecto: páginas y componentes web, APIs (.NET, Express, Spring…) y bases de datos (Oracle PL/SQL, PostgreSQL, Prisma…). Una nota puede bloquear o relacionarse con otra del tablero de otro proyecto.",
          "Sin cuenta ni servidor: se instala como app, funciona sin conexión y está en 9 idiomas.",
        ],
        imageAlt: "Tablero de Bruto con notas unidas por flechas, cada una con su edad, y el editor de notas abierto",
      },
    },
  },
  {
    slug: "beacon-split",
    title: "Beacon Split",
    year: "2026",
    featured: false,
    tech: ["Tauri", "Rust", "React", "TypeScript", "xterm.js"],
    image: beaconSplit,
    link: "https://beacon-split.vercel.app/",
    repo: "https://github.com/hxst1/Beacon-Split",
    credit: edu,
    text: {
      en: {
        status: "In development",
        description:
          "Edu Ruiz's workspace for running several Claude Code sessions at once, each with real terminals, files and git, and a tab that says which one is waiting for an answer. I ported it to Windows (a new transport to its background daemon, Windows' pseudo-console and an installer) and keep building it with him.",
        imageAlt:
          "Beacon Split window with project tabs along the top, a Claude Code session on the left and the project's files and git changes on the right",
      },
      es: {
        status: "En desarrollo",
        description:
          "El espacio de trabajo de Edu Ruiz para llevar varias sesiones de Claude Code a la vez, cada una con sus terminales, ficheros y git, y una pestaña que te dice cuál está esperando respuesta. Lo porté a Windows (un transporte nuevo hasta su daemon en segundo plano, la consola virtual de Windows y un instalador) y sigo construyéndolo con él.",
        imageAlt:
          "Ventana de Beacon Split con las pestañas de proyectos arriba, una sesión de Claude Code a la izquierda y los ficheros y cambios de git del proyecto a la derecha",
      },
    },
  },
  {
    slug: "nhoa",
    title: "nhoa",
    year: "2026",
    featured: false,
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: nhoa,
    link: "https://nhoa-portfolio.vercel.app/",
    repo: null,
    text: {
      en: {
        description:
          "Portfolio for Ainhoa Franco, who works in marketing, advertising and PR: editorial design, her work told as campaign case studies, and all the content editable from a single file.",
        imageAlt: "Home page of Ainhoa Franco Granja's portfolio, with her name in large type and the round nhoa logo",
      },
      es: {
        description:
          "Portfolio para Ainhoa Franco, de marketing, publicidad y relaciones públicas: diseño editorial, su trabajo contado como casos de campaña y todo el contenido editable desde un solo fichero.",
        imageAlt: "Portada del portfolio de Ainhoa Franco Granja, con su nombre en grande y el logotipo redondo de nhoa",
      },
    },
  },
  {
    slug: "superveil",
    title: "Superveil",
    year: "2026",
    featured: false,
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Playwright"],
    image: superveil,
    // The dashboard is behind a password, so there is nothing public to visit.
    link: null,
    repo: null,
    text: {
      en: {
        description:
          "The traffic of all my sites on one screen: visits, who is on them right now and where people come from. One line adds a site, it uses no cookies and the data stays in my own database.",
        imageAlt:
          "Superveil dashboard with today's visits and one card per project, each with a screenshot of the site and its chart for the week",
      },
      es: {
        description:
          "El tráfico de todas mis webs en una pantalla: visitas, quién está dentro ahora mismo y de dónde llega la gente. Una línea añade una web, no usa cookies y los datos se quedan en mi propia base de datos.",
        imageAlt:
          "Panel de Superveil con las visitas de hoy y una tarjeta por proyecto, cada una con una captura de la web y su gráfica de la semana",
      },
    },
  },
  {
    slug: "mcloc",
    title: "MCLoc",
    year: "2025",
    featured: false,
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    image: mcloc,
    link: "https://mcloc.vercel.app/",
    repo: "https://github.com/jimy-k4/mcloc",
    text: {
      en: {
        description:
          "A coordinates tracker for Minecraft: save bases, portals and structures by world and dimension, see them on a map, measure distances and convert them to the Nether. It also has tools, like a pixel-perfect circle generator.",
        imageAlt: "MCLoc circle generator drawing a circle of green blocks",
      },
      es: {
        description:
          "Un rastreador de coordenadas para Minecraft: guarda bases, portales y estructuras por mundo y dimensión, míralos en un mapa, mide distancias y conviértelas al Nether. Trae herramientas, como un generador de círculos pixel-perfect.",
        imageAlt: "Generador de círculos de MCLoc dibujando un círculo de bloques verdes",
      },
    },
  },
  {
    slug: "aruateam",
    title: "aruateam",
    year: "2024",
    featured: false,
    tech: ["Next.js", "Tailwind CSS", "Node.js", "Koa", "Prisma"],
    image: aruateam,
    link: "https://new-aruateam-frontend.vercel.app/",
    repo: "https://github.com/hxst1/aruateam",
    credit: edu,
    text: {
      en: {
        description:
          "Website for the drift team aruateam. The first version had a public site, a CMS for the team and its own backend; today it lives on as the team's shop.",
        imageAlt: "aruateam shop with drift team merchandise",
      },
      es: {
        description:
          "Web del equipo de drift aruateam. La primera versión tenía web pública, un CMS para el equipo y backend propio; hoy sigue viva como la tienda del equipo.",
        imageAlt: "Tienda de aruateam con productos del equipo de drift",
      },
    },
  },
  {
    slug: "particle-life",
    title: "Particle Life",
    year: "2024",
    featured: false,
    tech: ["JavaScript", "p5.js", "HTML", "CSS"],
    image: particleLife,
    link: "https://particle-life-arua.vercel.app/",
    repo: "https://github.com/jimy-k4/particle-life",
    credit: edu,
    text: {
      en: {
        description:
          "Artificial life in 2D: particles of each colour attract or repel the others following a matrix of rules, and patterns that look alive emerge from them. Every parameter can be tuned live.",
        imageAlt: "Particle Life simulation running on a laptop",
      },
      es: {
        description:
          "Vida artificial en 2D: las partículas de cada color atraen o repelen a las demás según una matriz de reglas, y de ahí surgen patrones que parecen vivos. Cada parámetro se ajusta en directo.",
        imageAlt: "Simulación de Particle Life en un portátil",
      },
    },
  },
  {
    slug: "memoji-my",
    title: "Memoji-my",
    year: "2024",
    featured: false,
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "DiceBear"],
    image: memojiMy,
    link: "https://memoji-my.vercel.app/",
    repo: "https://github.com/jimy-k4/memoji-my",
    text: {
      en: {
        description:
          "A memory game with new characters every match: the avatars are generated with the DiceBear API, in the style you pick, with light and dark mode.",
        imageAlt: "Three screens of the Memoji-my memory game with different avatar styles",
      },
      es: {
        description:
          "Un juego de memoria con personajes nuevos en cada partida: los avatares se generan con la API de DiceBear, en el estilo que elijas, con modo claro y oscuro.",
        imageAlt: "Tres pantallas del juego de memoria Memoji-my con distintos estilos de avatar",
      },
    },
  },
]

export function getProjects(locale: Locale): Project[] {
  return projects.map(({ text, ...project }) => ({ ...project, ...text[locale] }))
}
