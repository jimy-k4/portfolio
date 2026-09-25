import type { StaticImageData } from "next/image"
import type { Locale } from "@/lib/i18n"

import aruateam from "@/assets/projects/aruateam.webp"
import bruto from "@/assets/projects/bruto.webp"
import gymy from "@/assets/projects/gymy.webp"
import memojiMy from "@/assets/projects/memoji-my.webp"
import particleLife from "@/assets/projects/particle-life.webp"

type ProjectText = {
  description: string
  /** The essential points, shown as a list on the large cards. */
  highlights?: string[]
  /** Short status shown as a badge, e.g. "In production". */
  status?: string
  imageAlt: string
}

type ProjectData = {
  slug: string
  title: string
  year: string
  featured: boolean
  tech: string[]
  image: StaticImageData
  link: string
  /** Public repository, or `null` when the code is private. */
  repo: string | null
  /** Someone who built it with me. */
  credit?: { name: string; url: string }
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
        imageAlt: "Gym.y welcome screen: “Get to know yourself. To failure.” next to the sign-in form",
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
        imageAlt: "Pantalla de bienvenida de Gym.y: «Conócete. Al fallo.» junto al formulario de acceso",
      },
    },
  },
  {
    slug: "bruto",
    title: "Bruto",
    year: "2026",
    featured: true,
    tech: ["React", "TypeScript", "Vite", "File System Access API", "PWA", "Playwright"],
    image: bruto,
    link: "https://jimy-k4.github.io/bruto/",
    repo: "https://github.com/jimy-k4/bruto",
    text: {
      en: {
        status: "Open source",
        description:
          "A brutalist, local-first task board for building projects with AI. The notes live in a file inside the project, so you and any assistant work from the same source. I use it every day to build Gym.y and this site.",
        highlights: [
          "Copy exactly the context the AI needs with one key, as clean Markdown with a token estimate.",
          "The AI answers inside the note and leaves it for review; Bruto picks it up live without overwriting what you type.",
          "Views that understand the project: web pages and components, .NET APIs and Oracle PL/SQL databases.",
          "No account and no server: install it as an app, use it offline, in 9 languages.",
        ],
        imageAlt: "Bruto board with notes connected by arrows and the note editor open",
      },
      es: {
        status: "Código abierto",
        description:
          "Un tablero de tareas brutalista y local-first para construir proyectos con IA. Las notas viven en un fichero dentro del propio proyecto, así que tú y cualquier asistente trabajáis sobre la misma fuente. Lo uso cada día para construir Gym.y y esta web.",
        highlights: [
          "Copia el contexto justo para la IA con una tecla, en Markdown limpio y con una estimación de tokens.",
          "La IA responde dentro de la nota y la deja para revisar; Bruto lo recoge al momento sin pisar lo que escribes.",
          "Vistas que entienden el proyecto: páginas y componentes web, APIs .NET y bases de datos Oracle PL/SQL.",
          "Sin cuenta ni servidor: se instala como app, funciona sin conexión y está en 9 idiomas.",
        ],
        imageAlt: "Tablero de Bruto con notas unidas por flechas y el editor de notas abierto",
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
