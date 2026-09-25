import type { Locale } from "@/lib/i18n"

/** A heading with one word set in the italic serif: `${before}<em>${em}</em>${after}`. */
export type AccentTitle = { before: string; em: string; after: string }

const en = {
  meta: {
    title: "Juan Llinares · Full Stack Developer",
    description:
      "Computer engineer and full stack developer. Creator of Gym.y and Bruto. Projects, experience and contact.",
  },
  nav: {
    label: "Sections",
    skip: "Skip to content",
    backToTop: "back to top",
    work: "Work",
    experience: "Experience",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLabel: "Ver esta página en español",
  },
  hero: {
    eyebrow: "Computer Engineer · Full Stack Developer",
    description:
      "Passionate about creating and inspired by what I have yet to master. Ignorance is just a state of transition.",
    cta: "See my work",
    email: "Email me",
    nowBuilding: "Now building",
  },
  work: {
    label: "Work",
    title: { before: "Selected ", em: "work", after: "" } as AccentTitle,
    subtitle: "Things I have designed, built and shipped, from side projects to apps with real users.",
    code: "Code",
    privateCode: "Private code",
    tech: "Technologies",
    with: "With",
    newTab: "(opens in a new tab)",
  },
  experience: {
    label: "Experience",
    title: { before: "Professional ", em: "trajectory", after: "" } as AccentTitle,
    subtitle: "A concise overview of my work experience and career milestones.",
  },
  contact: {
    label: "Contact",
    title: { before: "Let's build something ", em: "together", after: "." } as AccentTitle,
    description: "Ready to collaborate on your next project? My inbox is open.",
    copy: "Copy email address",
    copied: "Email address copied",
    copyFailed: "Could not copy it, here it is:",
  },
  footer: {
    builtWith: "Built with Next.js and Tailwind CSS.",
    source: "Source code",
  },
}

export type Dictionary = typeof en

const es: Dictionary = {
  meta: {
    title: "Juan Llinares · Desarrollador Full Stack",
    description:
      "Ingeniero informático y desarrollador full stack. Creador de Gym.y y Bruto. Proyectos, trayectoria y contacto.",
  },
  nav: {
    label: "Secciones",
    skip: "Saltar al contenido",
    backToTop: "volver arriba",
    work: "Proyectos",
    experience: "Trayectoria",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    switchLabel: "View this page in English",
  },
  hero: {
    eyebrow: "Ingeniero Informático · Desarrollador Full Stack",
    description:
      "Apasionado de crear e inspirado por lo que aún no domino. El desconocimiento es un simple estado de transición.",
    cta: "Ver proyectos",
    email: "Escríbeme",
    nowBuilding: "Ahora mismo",
  },
  work: {
    label: "Proyectos",
    title: { before: "Proyectos ", em: "destacados", after: "" },
    subtitle: "Cosas que he diseñado, construido y publicado, desde proyectos personales hasta apps con usuarios reales.",
    code: "Código",
    privateCode: "Código privado",
    tech: "Tecnologías",
    with: "Con",
    newTab: "(se abre en una pestaña nueva)",
  },
  experience: {
    label: "Trayectoria",
    title: { before: "Trayectoria ", em: "profesional", after: "" },
    subtitle: "Una visión concisa de mi experiencia laboral e hitos profesionales.",
  },
  contact: {
    label: "Contacto",
    title: { before: "¿Construimos algo ", em: "juntos", after: "?" },
    description: "¿Listo para colaborar en tu próximo proyecto? Mi bandeja de entrada está abierta.",
    copy: "Copiar dirección de email",
    copied: "Dirección de email copiada",
    copyFailed: "No se ha podido copiar, aquí la tienes:",
  },
  footer: {
    builtWith: "Hecho con Next.js y Tailwind CSS.",
    source: "Código fuente",
  },
}

const dictionaries: Record<Locale, Dictionary> = { en, es }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
