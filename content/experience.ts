import type { Locale } from "@/lib/i18n"

export type Experience = {
  role: string
  company: string
  period: string
  description: string
  achievements: string[]
}

type ExperienceData = {
  /** Hidden entries stay here so they can be shown again later. */
  show: boolean
  text: Record<Locale, Experience>
}

const experience: ExperienceData[] = [
  {
    show: true,
    text: {
      en: {
        role: "Full Stack Developer",
        company: "gtt - Gestión Tributaria Territorial S.A.",
        period: "2025 - Present",
        description:
          "I build tax management software in an agile team, from the database to the interface, with C#, PL/SQL, TypeScript and JavaScript.",
        achievements: [
          "End-to-end automated tests with Playwright, in TypeScript and JavaScript.",
          "Development of SIT, the national Tax Information and Management System, and of SITN, its international version for Costa Rica and Honduras.",
          "Design of Oracle tables and PL/SQL packages.",
          "Scrum and Kanban combined, with version control in every project.",
        ],
      },
      es: {
        role: "Desarrollador Full Stack",
        company: "gtt - Gestión Tributaria Territorial S.A.",
        period: "2025 - Presente",
        description:
          "Desarrollo software de gestión tributaria en un equipo ágil, de la base de datos a la interfaz, con C#, PL/SQL, TypeScript y JavaScript.",
        achievements: [
          "Pruebas automatizadas de extremo a extremo con Playwright, en TypeScript y JavaScript.",
          "Desarrollo de SIT, el Sistema de Información y gestión Tributario nacional, y de SITN, su versión internacional para Costa Rica y Honduras.",
          "Diseño de tablas Oracle y paquetes PL/SQL.",
          "Scrum y Kanban combinados, con control de versiones en todos los proyectos.",
        ],
      },
    },
  },
  {
    show: true,
    text: {
      en: {
        role: "eduroam IT Support",
        company: "University of Alicante",
        period: "2023 - 2025",
        description:
          "I helped students of the University of Alicante, and visitors from other universities, connect to eduroam. Real problems from real users: a lesson I apply to everything I build.",
        achievements: [
          "Support on Windows, macOS, Linux, Android, iOS and Chromebook.",
          "Help in several languages.",
          "Problems solved on the spot.",
        ],
      },
      es: {
        role: "Soporte IT eduroam",
        company: "Universidad de Alicante",
        period: "2023 - 2025",
        description:
          "Ayudaba a los alumnos de la Universidad de Alicante, y a los de otras universidades de visita, a conectarse a eduroam. Problemas reales de usuarios reales: una lección que aplico a todo lo que construyo.",
        achievements: [
          "Soporte en Windows, macOS, Linux, Android, iOS y Chromebook.",
          "Atención en varios idiomas.",
          "Incidencias resueltas en el momento.",
        ],
      },
    },
  },
  {
    show: false,
    text: {
      en: {
        role: "Delivery Driver",
        company: "Telepizza & Burger King",
        period: "2022 - 2025",
        description: "Provided food to the customers from Villajoyosa, Benidorm and Finestrat.",
        achievements: ["Customer satisfaction", "Time management", "Route optimization"],
      },
      es: {
        role: "Repartidor",
        company: "Telepizza & Burger King",
        period: "2022 - 2025",
        description: "Proporcioné comida a los clientes de Villajoyosa, Benidorm y Finestrat.",
        achievements: ["Satisfacción del cliente", "Gestión del tiempo", "Optimización de rutas"],
      },
    },
  },
]

export function getExperience(locale: Locale): Experience[] {
  return experience.filter(({ show }) => show).map(({ text }) => text[locale])
}
