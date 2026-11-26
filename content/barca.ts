import type { AccentTitle } from "@/content/dictionary"
import type { Locale } from "@/lib/i18n"

/** More than a Hack 2027, the football data hackathon with FC Barcelona, under "Off the clock". */
export type Barca = {
  kicker: string
  /** Where the competition stands for us, shown as a badge. */
  status: string
  title: AccentTitle
  description: string
  /** What I do in the team. */
  highlights: string[]
  stats: { value: string; label: string }[]
  phases: { dates: string; title: string; detail: string; who: string }[]
  /** Badge on the last phase we played (`phase` below). */
  now: string
  /** Note on the phases after it, which we did not reach. */
  out: string
  links: { label: string; url: string }[]
  crestLabel: string
}

type BarcaText = Omit<Barca, "links"> & { links: Record<keyof typeof urls, string> }

const urls = {
  site: "https://gtt-talentarena.github.io/",
  log: "https://gtt-talentarena.github.io/log/",
  repo: "https://github.com/GTT-TalentArena/more-than-a-hack-2027",
  challenge: "https://landing.mobileworldcapital.com/more-than-a-hack-2027",
}

/** Index in `phases` of the last one we played. The ones after it show as not reached. */
export const phase = 0

const text: Record<Locale, BarcaText> = {
  en: {
    kicker: "More than a Hack 2027 · Talent Arena, Barcelona",
    status: "Finished · 374th of 800",
    title: { before: "Who has ", em: "the ball", after: "?" },
    description:
      "The football data hackathon by FC Barcelona, Metrica Sports and Mobile World Capital Barcelona. One full LaLiga match, Barça against Athletic Club, with automatic tracking of every player and the ball, and one question: which team has the ball, frame by frame. A script scores it against the real answer, with no jury.",
    highlights: [
      "I competed with GTT, a team of five. We studied first, wrote down what we found and only then coded, and every experiment went in the log, failures included.",
      "Our model finds the single best sequence of possessions for each half with an exact Viterbi decoder, and fills the frames without a clear ball with a model trained only on other matches. It runs in under 30 seconds on a CPU, the same every time, and anyone can reproduce it in Docker.",
      "I built the team's website and its log, where the scores of the timelines and pitches come from a TypeScript port of the official metric, and wrote the first studies: what the metric really rewards, and why tuning against the five public minutes would mislead us.",
      "We finished 374th of 800 and did not reach the top 20 of the second phase. The repository, the technical document and the log stay public.",
    ],
    stats: [
      { value: "374 / 800", label: "our place in the final ranking" },
      { value: "199,319", label: "frames labelled" },
      { value: "41%", label: "of the scored frames with the ball out of sight" },
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
    now: "374th of 800",
    out: "We did not reach it",
    links: {
      site: "Team website",
      log: "Project log",
      repo: "Code",
      challenge: "The challenge",
    },
    crestLabel: "FC Barcelona crest",
  },
  es: {
    kicker: "More than a Hack 2027 · Talent Arena, Barcelona",
    status: "Terminado · puesto 374 de 800",
    title: { before: "¿Quién tiene ", em: "el balón", after: "?" },
    description:
      "El hackathon de datos de fútbol del FC Barcelona, Metrica Sports y Mobile World Capital Barcelona. Un partido entero de LaLiga, Barça–Athletic Club, con el seguimiento automático de cada jugador y del balón, y una sola pregunta: qué equipo tiene el balón, fotograma a fotograma. Lo puntúa un script contra la respuesta real, sin jurado.",
    highlights: [
      "Competí con GTT, un equipo de cinco. Primero estudiábamos, escribíamos lo que encontrábamos y solo entonces programábamos, y cada experimento iba al log, también los fallos.",
      "Nuestro modelo busca la mejor secuencia de posesiones de cada parte con un decodificador de Viterbi exacto, y rellena los fotogramas sin un balón claro con un modelo entrenado solo con otros partidos. Tarda menos de 30 segundos en una CPU, da siempre lo mismo y cualquiera puede reproducirlo en Docker.",
      "Hice la web del equipo y su log, donde las puntuaciones de las líneas de tiempo y los campos salen de la métrica oficial portada a TypeScript, y escribí los primeros estudios: qué premia de verdad la métrica y por qué ajustar contra los cinco minutos públicos nos engañaría.",
      "Quedamos en el puesto 374 de 800 y no entramos en el top 20 de la segunda fase. El repositorio, la memoria técnica y el log siguen públicos.",
    ],
    stats: [
      { value: "374 / 800", label: "nuestro puesto en la clasificación final" },
      { value: "199.319", label: "fotogramas etiquetados" },
      { value: "41\u00a0%", label: "de los fotogramas puntuados, sin el balón a la vista" },
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
    now: "Puesto 374 de 800",
    out: "No llegamos",
    links: {
      site: "Web del equipo",
      log: "Log del proyecto",
      repo: "Código",
      challenge: "El reto",
    },
    crestLabel: "Escudo del FC Barcelona",
  },
}

export function getBarca(locale: Locale): Barca {
  const { links, ...rest } = text[locale]
  return {
    ...rest,
    links: (Object.keys(urls) as (keyof typeof urls)[]).map((key) => ({ label: links[key], url: urls[key] })),
  }
}
