import type { Locale } from "@/lib/i18n"

/** A heading with one word set in the italic serif: `${before}<em>${em}</em>${after}`. */
export type AccentTitle = { before: string; em: string; after: string }

const en = {
  meta: {
    title: "Juan Llinares · Senior Full Stack Developer",
    description:
      "Senior full stack developer and computer engineer in Alicante, Spain. I build Gym.y and Bruto, and help build Beacon Split: software that is easy to use and accessible to everyone. Open to freelance work.",
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
    eyebrow: "Computer Engineer · Senior Full Stack Developer",
    description:
      "I build software people actually use. By day, software for tax administrations in Spain and Latin America at gtt; the rest of the time, my own products like Gym.y and Bruto, with one rule: easy to use and accessible to everyone.",
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
    more: {
      title: "More on GitHub",
      description: "Experiments, university assignments and small tools.",
    },
    newTab: "(opens in a new tab)",
  },
  experience: {
    label: "Experience",
    title: { before: "Professional ", em: "trajectory", after: "" } as AccentTitle,
    subtitle: "Passionate about creating and inspired by what I have yet to master. Ignorance is just a state of transition.",
    kinds: { work: "Work", education: "Education" },
    skills: "Tech I work with",
    languages: "Languages",
    certifications: "Certifications · OpenWebinars",
  },
  contact: {
    label: "Contact",
    title: { before: "Let's build something ", em: "together", after: "." } as AccentTitle,
    description: "Have a project in mind, or want to talk about one of mine? I take on freelance work and I'm open to new opportunities.",
    copy: "Copy email address",
    copied: "Email address copied",
    copyFailed: "Could not copy it, here it is:",
    brutoOnX: "Bruto on X",
  },
  footer: {
    builtWith: "Built with Next.js and Tailwind CSS.",
    source: "Source code",
  },
}

export type Dictionary = typeof en

const es: Dictionary = {
  meta: {
    title: "Juan Llinares · Desarrollador Senior Full Stack",
    description:
      "Desarrollador senior full stack e ingeniero informático en Alicante. Creo Gym.y y Bruto, y ayudo a construir Beacon Split: software fácil de usar y accesible para todos. Acepto encargos.",
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
    eyebrow: "Ingeniero Informático · Desarrollador Senior Full Stack",
    description:
      "Construyo software que la gente usa de verdad. De día, software para haciendas públicas de España y Latinoamérica en gtt; el resto del tiempo, productos propios como Gym.y y Bruto, con una regla: que sean fáciles de usar y accesibles para todos.",
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
    more: {
      title: "Más en GitHub",
      description: "Experimentos, prácticas de la universidad y herramientas pequeñas.",
    },
    newTab: "(se abre en una pestaña nueva)",
  },
  experience: {
    label: "Trayectoria",
    title: { before: "Trayectoria ", em: "profesional", after: "" },
    subtitle: "Apasionado de crear e inspirado por lo que aún no domino. El desconocimiento es un simple estado de transición.",
    kinds: { work: "Trabajo", education: "Formación" },
    skills: "Con qué trabajo",
    languages: "Idiomas",
    certifications: "Certificaciones · OpenWebinars",
  },
  contact: {
    label: "Contacto",
    title: { before: "¿Construimos algo ", em: "juntos", after: "?" },
    description: "¿Tienes un proyecto en mente o quieres hablar de alguno de los míos? Acepto encargos y estoy abierto a nuevas oportunidades.",
    copy: "Copiar dirección de email",
    copied: "Dirección de email copiada",
    copyFailed: "No se ha podido copiar, aquí la tienes:",
    brutoOnX: "Bruto en X",
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
