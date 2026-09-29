import type { Locale } from "@/lib/i18n"

export type Experience = {
  kind: "work" | "education"
  role: string
  company: string
  period: string
  description: string
  achievements: string[]
  /** Extra reading, e.g. the thesis document. */
  links?: { label: string; url: string }[]
}

type ExperienceText = Omit<Experience, "kind">

type ExperienceData = {
  kind: Experience["kind"]
  /** Hidden entries stay here so they can be shown again later. */
  show: boolean
  text: Record<Locale, ExperienceText>
}

const thesisPost =
  "https://www.linkedin.com/posts/juan-llinares-mauri_tfg-activity-7241391095534829569-9FMg"
const thesisRepo = "https://github.com/jimy-k4/TFG"

const experience: ExperienceData[] = [
  {
    kind: "work",
    show: true,
    text: {
      en: {
        role: "Senior Full Stack Developer",
        company: "gtt - Gestión Tributaria Territorial S.A.",
        period: "Jul 2025 - Present",
        description:
          "I build software for tax administrations in Spain, Costa Rica, Honduras and Colombia. Every day I work across all three layers: the virtual office citizens use, the APIs behind it and the Oracle database.",
        achievements: [
          "Pages of the virtual office that citizens use for their tax procedures, in Nuxt and Vue.",
          "Views of SIT, the tax management system civil servants work with every day, in its case files module.",
          "APIs in C# and .NET 10, WCF services, and Oracle tables and PL/SQL packages.",
          "Around 120 end-to-end tests with Playwright for Spain and Costa Rica, which also check the database and the PDFs the system generates.",
        ],
      },
      es: {
        role: "Desarrollador Senior Full Stack",
        company: "gtt - Gestión Tributaria Territorial S.A.",
        period: "Jul 2025 - Presente",
        description:
          "Desarrollo software para las haciendas públicas de España, Costa Rica, Honduras y Colombia. Cada día toco las tres capas: la oficina virtual que usan los ciudadanos, las APIs que hay detrás y la base de datos Oracle.",
        achievements: [
          "Páginas de la oficina virtual con las que los ciudadanos hacen sus trámites, en Nuxt y Vue.",
          "Vistas del SIT, el sistema de gestión tributaria con el que trabajan a diario los funcionarios, en su módulo de expedientes.",
          "APIs en C# y .NET 10, servicios WCF, y tablas y paquetes PL/SQL en Oracle.",
          "Unas 120 pruebas de extremo a extremo con Playwright para España y Costa Rica, que comprueban también la base de datos y los PDF que genera el sistema.",
        ],
      },
    },
  },
  {
    kind: "work",
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
          "Help in Spanish, Valencian and English.",
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
          "Atención en castellano, valenciano e inglés.",
          "Incidencias resueltas en el momento.",
        ],
      },
    },
  },
  {
    kind: "education",
    show: true,
    text: {
      en: {
        role: "Degree in Computer Engineering",
        company: "University of Alicante",
        period: "2020 - 2025",
        description:
          "Final degree project graded 9 out of 10: a machine learning model that predicts how resilient a program is to the errors radiation causes in hardware, learning from how the program runs.",
        achievements: [
          "Dynamic traces of each program with LLVM-Tracer, turned into 30 features with PARIS.",
          "A fault injection campaign with UN-FIT to train and check the model.",
        ],
        links: [
          { label: "Read the thesis", url: thesisPost },
          { label: "Code", url: thesisRepo },
        ],
      },
      es: {
        role: "Grado en Ingeniería Informática",
        company: "Universidad de Alicante",
        period: "2020 - 2025",
        description:
          "Trabajo de fin de grado con un 9: un modelo de aprendizaje automático que predice cómo de resistente es un programa a los errores que provoca la radiación en el hardware, a partir de cómo se ejecuta.",
        achievements: [
          "Trazas dinámicas de cada programa con LLVM-Tracer, convertidas en 30 características con PARIS.",
          "Una campaña de inyección de fallos con UN-FIT para entrenar y comprobar el modelo.",
        ],
        links: [
          { label: "Leer el TFG", url: thesisPost },
          { label: "Código", url: thesisRepo },
        ],
      },
    },
  },
  {
    kind: "work",
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
  return experience.filter(({ show }) => show).map(({ kind, text }) => ({ kind, ...text[locale] }))
}
