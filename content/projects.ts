import type { StaticImageData } from "next/image"
import type { Locale } from "@/lib/i18n"

import beaconSplit from "@/assets/projects/beacon-split.webp"
import bruto from "@/assets/projects/bruto.webp"
import gymy from "@/assets/projects/gymy.webp"
import homie from "@/assets/projects/homie.webp"
import nhoa from "@/assets/projects/nhoa.webp"

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
  /** A large card, and one of the screenshots in the hero. */
  featured: boolean
  /** Still being built: listed under "Now building" in the hero. */
  current?: boolean
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
    current: true,
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
          "Friends and share links for plans, routines and exercises, milestones across your whole history, and a character you design piece by piece.",
          "Installable app with push notifications for rests, reminders and news from your coach.",
          "Each user's data is isolated in Postgres with row-level security.",
        ],
        imageAlt:
          "Three phones with Gym.y, each in a different theme color: today's workout from the routine, a set being logged in training mode, and the muscle map in Progress",
      },
      es: {
        status: "En producción",
        description:
          "Un diario de entrenamiento pensado para usarse en el gimnasio, con el móvil en una mano. Nació para mí y hoy también sirve a entrenadores y a sus alumnos.",
        highlights: [
          "Modo sin distracciones para apuntar serie a serie, con RIR y descansos.",
          "Modo entrenador: programa mesociclos, asigna rutinas y sigue el progreso de cada alumno. El alumno decide qué comparte.",
          "Amigos y enlaces para compartir planes, rutinas y ejercicios, hitos de toda tu historia y un personaje que diseñas a piezas.",
          "App instalable con avisos push de descansos, recordatorios y novedades del entrenador.",
          "Los datos de cada usuario, aislados en Postgres con seguridad a nivel de fila.",
        ],
        imageAlt:
          "Tres móviles con Gym.y, cada uno con un color de tema: el entreno que toca hoy en la rutina, una serie en el modo entrenamiento y el visor de músculos de Progreso",
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
        status: "Finished · open source",
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
        status: "Terminado · código abierto",
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
    slug: "homie",
    title: "Homie",
    year: "2026",
    featured: false,
    tech: ["React", "TypeScript", "Hono", "SQLite", "Drizzle", "PWA", "Docker"],
    image: homie,
    // Self-hosted, so there is no public page to visit.
    link: null,
    repo: null,
    text: {
      en: {
        status: "In development",
        description:
          "The whole home in one app, shared in real time: shopping, receipts, money, pantry, meals, chores, maintenance and documents. It reads receipts with its own OCR, warns before anything expires or renews, and the shopping list works with no signal. Self-hosted, with passkeys, and the data never goes through a third party.",
        imageAlt:
          "Homie on the floor plan of a home: each room has the colour of its section and a piece of the app, like the pantry in the kitchen, chores in the bedroom and the money in the study, next to a phone with the home screen",
      },
      es: {
        status: "En desarrollo",
        description:
          "Toda la casa en una app compartida en tiempo real: compra, tickets, finanzas, despensa, menú, tareas, mantenimiento y documentos. Lee los tickets con su propio OCR, avisa antes de que algo caduque o se renueve y la lista de la compra funciona sin cobertura. Autoalojada, con passkeys, y los datos no pasan por ningún tercero.",
        imageAlt:
          "Homie sobre el plano de una casa: cada habitación tiene el color de su sección y una pieza de la app, como la despensa en la cocina, las tareas en el dormitorio y las finanzas en el estudio, junto a un móvil con la pantalla de Inicio",
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
        status: "Finished",
        description:
          "Edu Ruiz's workspace for running several Claude Code sessions at once, each with real terminals, files and git, and a tab that says which one is waiting for an answer. I ported it to Windows (a new transport to its background daemon, Windows' pseudo-console and an installer) and kept building it with him until it was done.",
        imageAlt:
          "Beacon Split window with project tabs along the top, a Claude Code session on the left and the project's files and git changes on the right",
      },
      es: {
        status: "Terminado",
        description:
          "El espacio de trabajo de Edu Ruiz para llevar varias sesiones de Claude Code a la vez, cada una con sus terminales, ficheros y git, y una pestaña que te dice cuál está esperando respuesta. Lo porté a Windows (un transporte nuevo hasta su daemon en segundo plano, la consola virtual de Windows y un instalador) y seguí construyéndolo con él hasta terminarlo.",
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
]

export function getProjects(locale: Locale): Project[] {
  return projects.map(({ text, ...project }) => ({ ...project, ...text[locale] }))
}
