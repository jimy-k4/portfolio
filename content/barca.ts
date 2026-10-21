import type { AccentTitle } from "@/content/dictionary"
import type { Locale } from "@/lib/i18n"

/** More than a Hack 2027, the football data hackathon with FC Barcelona. It has its own section, above the projects. */
export type Barca = {
  label: string
  kicker: string
  /** Where the competition stands, shown as a badge. Update it with `phase` below. */
  status: string
  title: AccentTitle
  description: string
  /** What I do in the team. */
  highlights: string[]
  stats: { value: string; label: string }[]
  phases: { dates: string; title: string; detail: string; who: string }[]
  now: string
  links: { label: string; url: string }[]
  crestLabel: string
  /** Text for the chip in the hero. */
  chip: string
}

type BarcaText = Omit<Barca, "links"> & { links: Record<keyof typeof urls, string> }

const urls = {
  site: "https://gtt-talentarena.github.io/",
  log: "https://gtt-talentarena.github.io/log/",
  repo: "https://github.com/GTT-TalentArena/more-than-a-hack-2027",
  challenge: "https://landing.mobileworldcapital.com/more-than-a-hack-2027",
}

/** Index in `phases` of the one being played now. Move it forward as the competition goes on. */
export const phase = 0

const text: Record<Locale, BarcaText> = {
  en: {
    label: "Barça",
    kicker: "More than a Hack 2027 · Talent Arena, Barcelona",
    status: "Phase 1 · in play",
    title: { before: "Who has ", em: "the ball", after: "?" },
    description:
      "The football data hackathon by FC Barcelona, Metrica Sports and Mobile World Capital Barcelona. One full LaLiga match, Barça against Athletic Club, with automatic tracking of every player and the ball, and one question: which team has the ball, frame by frame. A script scores it against the real answer, with no jury.",
    highlights: [
      "I compete with GTT, a team of five. We study first, write down what we find and only then code, and every experiment goes in the log, failures included.",
      "I built the team's website and its log. An entry can draw timelines and pitches whose scores come from a TypeScript port of the official metric, so no number is typed by hand.",
      "I wrote the first studies: what the metric really rewards, and why tuning against the five public minutes would mislead us.",
    ],
    stats: [
      { value: "199,319", label: "frames to label" },
      { value: "41%", label: "of the scored frames with the ball out of sight" },
      { value: "0.2433", label: "baseline spellF1 to beat" },
      { value: "5", label: "people, one codebase" },
    ],
    phases: [
      {
        dates: "20 Oct – 17 Nov 2026",
        title: "Initial Challenge",
        detail: "The possession CSV, a public repository and a technical write-up.",
        who: "All teams",
      },
      {
        dates: "26 Nov 2026 – 14 Jan 2027",
        title: "Innovation Challenge",
        detail: "Open analytical and tactical questions on the same match.",
        who: "Top 20",
      },
      {
        dates: "2 Mar 2027",
        title: "Final Pitch",
        detail: "On stage at Talent Arena, in front of a professional jury.",
        who: "Top 5",
      },
    ],
    now: "Now",
    links: {
      site: "Team website",
      log: "Project log",
      repo: "Code",
      challenge: "The challenge",
    },
    crestLabel: "FC Barcelona crest",
    chip: "More than a Hack",
  },
  es: {
    label: "Barça",
    kicker: "More than a Hack 2027 · Talent Arena, Barcelona",
    status: "Fase 1 · en juego",
    title: { before: "¿Quién tiene ", em: "el balón", after: "?" },
    description:
      "El hackathon de datos de fútbol del FC Barcelona, Metrica Sports y Mobile World Capital Barcelona. Un partido entero de LaLiga, Barça–Athletic Club, con el seguimiento automático de cada jugador y del balón, y una sola pregunta: qué equipo tiene el balón, fotograma a fotograma. Lo puntúa un script contra la respuesta real, sin jurado.",
    highlights: [
      "Compito con GTT, un equipo de cinco. Primero estudiamos, escribimos lo que encontramos y solo entonces programamos, y cada experimento va al log, también los fallos.",
      "Hice la web del equipo y su log. Una entrada puede dibujar líneas de tiempo y campos cuyas puntuaciones salen de la métrica oficial portada a TypeScript, así que ningún número se escribe a mano.",
      "Escribí los primeros estudios: qué premia de verdad la métrica y por qué ajustar contra los cinco minutos públicos nos engañaría.",
    ],
    stats: [
      { value: "199.319", label: "fotogramas que etiquetar" },
      { value: "41\u00a0%", label: "de los fotogramas puntuados, sin el balón a la vista" },
      { value: "0,2433", label: "spellF1 de referencia que superar" },
      { value: "5", label: "personas, un solo repositorio" },
    ],
    phases: [
      {
        dates: "20 oct – 17 nov 2026",
        title: "Initial Challenge",
        detail: "El CSV de posesión, un repositorio público y una memoria técnica.",
        who: "Todos los equipos",
      },
      {
        dates: "26 nov 2026 – 14 ene 2027",
        title: "Innovation Challenge",
        detail: "Preguntas abiertas, analíticas y tácticas, sobre el mismo partido.",
        who: "Top 20",
      },
      {
        dates: "2 mar 2027",
        title: "Final Pitch",
        detail: "En el escenario del Talent Arena, ante un jurado profesional.",
        who: "Top 5",
      },
    ],
    now: "Ahora",
    links: {
      site: "Web del equipo",
      log: "Log del proyecto",
      repo: "Código",
      challenge: "El reto",
    },
    crestLabel: "Escudo del FC Barcelona",
    chip: "More than a Hack",
  },
}

export function getBarca(locale: Locale): Barca {
  const { links, ...rest } = text[locale]
  return {
    ...rest,
    links: (Object.keys(urls) as (keyof typeof urls)[]).map((key) => ({ label: links[key], url: urls[key] })),
  }
}
