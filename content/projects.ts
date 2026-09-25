import type { StaticImageData } from "next/image"
import type { Locale } from "@/lib/i18n"

import aruateam from "@/assets/projects/aruateam.webp"
import bruto from "@/assets/projects/bruto.webp"
import gymy from "@/assets/projects/gymy.webp"
import memojiMy from "@/assets/projects/memoji-my.webp"
import particleLife from "@/assets/projects/particle-life.webp"

type ProjectText = {
  description: string
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
  text: Record<Locale, ProjectText>
}

export type Project = Omit<ProjectData, "text"> & ProjectText

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
          "A training log made for the gym floor: record every set in a distraction-free mode, plan your routines and follow how your strength, body and wellbeing evolve. Its coach mode lets trainers program mesocycles for their athletes and track their progress, with push notifications.",
        imageAlt: "Gym.y welcome screen: “Get to know yourself. To failure.” next to the sign-in form",
      },
      es: {
        status: "En producción",
        description:
          "Un diario de entrenamiento pensado para usarse en el gimnasio: apunta cada serie en un modo sin distracciones, planifica tus rutinas y sigue la evolución de tu fuerza, tu físico y tu bienestar. Su modo entrenador permite programar mesociclos a los alumnos y seguir su progreso, con avisos push.",
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
          "A brutalist, local-first task board for projects built with AI. Notes live in a file inside your project, so you and any AI assistant work from the same source. No account, no server, and it works offline.",
        imageAlt: "Bruto board with notes connected by arrows and the note editor open",
      },
      es: {
        status: "Código abierto",
        description:
          "Un tablero de tareas brutalista y local-first para proyectos hechos con IA. Las notas viven en un fichero dentro del propio proyecto, así que tú y cualquier asistente de IA trabajáis sobre la misma fuente. Sin cuenta, sin servidor y funciona sin conexión.",
        imageAlt: "Tablero de Bruto con notas unidas por flechas y el editor de notas abierto",
      },
    },
  },
  {
    slug: "aruateam",
    title: "aruateam",
    year: "2025",
    featured: false,
    tech: ["React", "Node.js", "Supabase", "Tailwind"],
    image: aruateam,
    link: "https://new-aruateam-frontend.vercel.app/",
    repo: null,
    text: {
      en: {
        description: "Web platform for the drift team aruateam, including CMS, Backend, and Frontend.",
        imageAlt: "aruateam shop with drift team merchandise",
      },
      es: {
        description: "Plataforma web para el equipo de drift aruateam, con CMS, Backend y Frontend.",
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
    text: {
      en: {
        description:
          "2D particle life simulation where particles interact with each other and the environment. Developed in collaboration with a friend.",
        imageAlt: "Particle Life simulation running on a laptop",
      },
      es: {
        description:
          "Simulación de vida de partículas en 2D, donde las partículas interactúan entre sí y con el entorno. Desarrollado en conjunto con un amigo.",
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
          "A simple web game where you have to find the matching pairs of emojis. You'll never find the same pair twice!",
        imageAlt: "Three screens of the Memoji-my memory game with different avatar styles",
      },
      es: {
        description:
          "Un simple juego web donde tienes que encontrar los pares de emojis coincidentes. ¡Nunca encontrarás el mismo par dos veces!",
        imageAlt: "Tres pantallas del juego de memoria Memoji-my con distintos estilos de avatar",
      },
    },
  },
]

export function getProjects(locale: Locale): Project[] {
  return projects.map(({ text, ...project }) => ({ ...project, ...text[locale] }))
}
