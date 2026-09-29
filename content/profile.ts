import type { Locale } from "@/lib/i18n"

type Profile = {
  location: string
  /** What I am open to, shown in the hero and in contact. */
  availability: string
  skills: { group: string; items: string[] }[]
  languages: { name: string; level: string }[]
  /** OpenWebinars courses, grouped by topic so the block stays short. */
  certifications: { title: string; detail: string; year: string }[]
}

// Skill names are the same in both languages; only the group labels change.
const skills = {
  languages: ["TypeScript", "JavaScript", "C#", "Java", "C++", "PL/SQL"],
  front: ["React", "Next.js", "Vue", "Nuxt", "Tailwind CSS"],
  back: [".NET", "Node.js", "Supabase", "PostgreSQL", "Oracle"],
  tools: ["Playwright", "Vite", "Git", "Docker"],
}

const profiles: Record<Locale, Profile> = {
  en: {
    location: "Alicante, Spain",
    availability: "Open to freelance work and new opportunities",
    skills: [
      { group: "Languages", items: skills.languages },
      { group: "Front end", items: skills.front },
      { group: "Back end and data", items: skills.back },
      { group: "Testing and tools", items: skills.tools },
    ],
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "Valencian", level: "Native" },
      { name: "English", level: "B1 (Cambridge), comfortable working in it" },
    ],
    certifications: [
      { title: "Generative AI and prompt engineering", detail: "3 courses", year: "2026" },
      { title: "Oracle performance", detail: "Analysis, tools, statistics and indexes · 3 courses", year: "2025" },
      { title: "C#", detail: "C# and intermediate C#", year: "2025" },
      { title: "SQL and PL/SQL", detail: "SQL, SQL Server and PL/SQL fundamentals", year: "2025" },
      { title: "JavaScript and Git", detail: "JavaScript fundamentals and Git", year: "2025" },
    ],
  },
  es: {
    location: "Alicante, España",
    availability: "Abierto a encargos y a nuevas oportunidades",
    skills: [
      { group: "Lenguajes", items: skills.languages },
      { group: "Front", items: skills.front },
      { group: "Back y datos", items: skills.back },
      { group: "Pruebas y herramientas", items: skills.tools },
    ],
    languages: [
      { name: "Castellano", level: "Nativo" },
      { name: "Valenciano", level: "Nativo" },
      { name: "Inglés", level: "B1 (Cambridge), con soltura para trabajar" },
    ],
    certifications: [
      { title: "IA generativa e ingeniería de prompts", detail: "3 cursos", year: "2026" },
      { title: "Rendimiento en Oracle", detail: "Análisis, herramientas, estadísticas e índices · 3 cursos", year: "2025" },
      { title: "C#", detail: "C# y C# intermedio", year: "2025" },
      { title: "SQL y PL/SQL", detail: "SQL, SQL Server y fundamentos de PL/SQL", year: "2025" },
      { title: "JavaScript y Git", detail: "Fundamentos de JavaScript y Git", year: "2025" },
    ],
  },
}

export function getProfile(locale: Locale): Profile {
  return profiles[locale]
}
