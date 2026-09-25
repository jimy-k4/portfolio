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
        role: "Full Stack",
        company: "gtt - Gestión Tributaria Territorial S.A.",
        period: "2025 - Present",
        description:
          "Implementing software solutions for tax management, working in an agile and collaborative team. Specialized in C#, PL/SQL, TypeScript and JavaScript.",
        achievements: [
          "Development of automated tests in TypeScript and JavaScript using Playwright.",
          "Participation in the development of the “SIT” national project (Tax Information and Management System) for Spain and the “SITN” international project for Costa Rica and Honduras, working with multiple languages.",
          "Design and creation of tables and packages in databases using PL/SQL.",
          "Effective and agile collaboration using a hybrid SCRUM and Kanban method in work teams with version control across all projects.",
        ],
      },
      es: {
        role: "Full Stack",
        company: "gtt - Gestión Tributaria Territorial S.A.",
        period: "2025 - Presente",
        description:
          "Implementando soluciones de software para la gestión tributaria, trabajando en un equipo ágil y colaborativo. Especializado en C#, PL/SQL, TypeScript y JavaScript.",
        achievements: [
          "Desarrollo de pruebas automatizadas en TypeScript y JavaScript utilizando Playwright.",
          "Participación en el desarrollo del proyecto nacional “SIT” (Sistema de Información y gestión Tributario) e internacional “SITN”, trabajando con múltiples lenguajes, para los países España, Costa Rica y Honduras.",
          "Diseño y creación de tablas y paquetes en bases de datos mediante PL/SQL.",
          "Colaboración eficaz y ágil usando un híbrido de SCRUM y Kanban en equipos de trabajo con control de versiones en todos los proyectos.",
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
          "Providing assistance to students at the University of Alicante and others with access to the eduroam network. Learned from real user problems and developed effective solutions.",
        achievements: [
          "Cross-platform support: Windows, macOS, Linux, Android, iOS, Chromebook",
          "Multilingual support",
          "Real-time problem resolution",
        ],
      },
      es: {
        role: "Soporte IT eduroam",
        company: "Universidad de Alicante",
        period: "2023 - 2025",
        description:
          "Prestando ayuda a los alumnos de la Universidad de Alicante y otras con el acceso a la red eduroam. Aprendí de los problemas reales de los usuarios y desarrollé soluciones efectivas.",
        achievements: [
          "Multiplataforma: Windows, macOS, Linux, Android, iOS, Chromebook",
          "Apoyo multilingüe",
          "Resolución de problemas en tiempo real",
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
