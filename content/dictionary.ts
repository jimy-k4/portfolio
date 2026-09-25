import type { Locale } from "@/lib/i18n"

/** A heading with one word set in the italic serif: `${before}<em>${em}</em>${after}`. */
export type AccentTitle = { before: string; em: string; after: string }

const en = {
  meta: {
    title: "Juan Llinares · Full Stack Developer",
    description:
      "Computer engineer and full stack developer. I build Gym.y and Bruto: software that is easy to use and accessible to everyone.",
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
      "I build software people actually use. By day, tax management systems at gtt; the rest of the time, my own products like Gym.y and Bruto, with one rule: easy to use and accessible to everyone.",
    cta: "See my work",
    email: "Email me",
    nowBuilding: "Now building",
  },
  work: {
    label: "Work",
    title: { before: "Selected ", em: "work", after: "" } as AccentTitle,
    subtitle: "Products I have designed, built and shipped. The first two are live and in use.",
    code: "Code",
    privateCode: "Private code",
    tech: "Technologies",
    with: "With",
    highlights: "Highlights",
    newTab: "(opens in a new tab)",
  },
  experience: {
    label: "Experience",
    title: { before: "Professional ", em: "trajectory", after: "" } as AccentTitle,
    subtitle: "Passionate about creating and inspired by what I have yet to master. Ignorance is just a state of transition.",
  },
  contact: {
    label: "Contact",
    title: { before: "Let's build something ", em: "together", after: "." } as AccentTitle,
    description: "Have a project in mind, or want to talk about one of mine? Write to me.",
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
      "Ingeniero informático y desarrollador full stack. Creo Gym.y y Bruto: software fácil de usar y accesible para todos.",
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
      "Construyo software que la gente usa de verdad. De día, sistemas de gestión tributaria en gtt; el resto del tiempo, productos propios como Gym.y y Bruto, con una regla: que sean fáciles de usar y accesibles para todos.",
    cta: "Ver proyectos",
    email: "Escríbeme",
    nowBuilding: "Ahora mismo",
  },
  work: {
    label: "Proyectos",
    title: { before: "Proyectos ", em: "destacados", after: "" },
    subtitle: "Productos que he diseñado, construido y publicado. Los dos primeros están en marcha y en uso.",
    code: "Código",
    privateCode: "Código privado",
    tech: "Tecnologías",
    with: "Con",
    highlights: "Lo esencial",
    newTab: "(se abre en una pestaña nueva)",
  },
  experience: {
    label: "Trayectoria",
    title: { before: "Trayectoria ", em: "profesional", after: "" },
    subtitle: "Apasionado de crear e inspirado por lo que aún no domino. El desconocimiento es un simple estado de transición.",
  },
  contact: {
    label: "Contacto",
    title: { before: "¿Construimos algo ", em: "juntos", after: "?" },
    description: "¿Tienes un proyecto en mente o quieres hablar de alguno de los míos? Escríbeme.",
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
