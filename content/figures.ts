import type { Locale } from "@/lib/i18n"

/** Text of the radiation bench figure (the TFG entry). `{name}` slots are filled in live. */
export type BenchCopy = {
  fig: string
  title: string
  hint: string
  /** The stage's label: what it is and how to use it from the keyboard. */
  label: string
  keys: { fault: string; tubes: string; needle: string }
  caption: string
  readout: { idle: string; running: string; done: string }
  value: { idle: string; done: string }
  status: string
}

const copy: Record<Locale, BenchCopy> = {
  en: {
    fig: "Fig. 1",
    title: "Radiation test bench",
    hint: "Click · ← → · Space",
    label: "Radiation test bench from my thesis. Arrow keys change the program; Space runs the fault campaign.",
    keys: {
      fault: "The bit each injected fault flips",
      tubes: "Tubes, left to right: unACE, SDC and hang",
      needle: "Needle: what the model predicts. Mark: what UN-FIT measured",
    },
    caption:
      "UN-FIT runs each program on an emulated Cortex-A15 and, at a random instruction, flips one bit of a register: 50 times per register, 3,000 per program. Each run ends fine (unACE), with a wrong result (SDC) or hung (hang). The model predicts unACE from 30 features of the dynamic trace, without injecting anything.",
    readout: {
      idle: "{file} · predicted {predicted} unACE",
      running: "{file} · {done} of {total} faults",
      done: "{file} · predicted {predicted} · measured {measured}",
    },
    value: {
      idle: "{file}: the model predicts {predicted} unACE runs",
      done: "{file}: the model predicts {predicted} unACE runs; UN-FIT measured {measured} over {total} faults",
    },
    status: "{file}: predicted {predicted}, measured {measured}.",
  },
  es: {
    fig: "Fig. 1",
    title: "Banco de radiación",
    hint: "Pulsa · ← → · Espacio",
    label: "Banco de radiación de mi TFG. Flechas: cambia de programa. Espacio: lanza la campaña de fallos.",
    keys: {
      fault: "El bit que voltea cada fallo inyectado",
      tubes: "Tubos, de izquierda a derecha: unACE, SDC y hang",
      needle: "Aguja: lo que predice el modelo. Marca: lo que midió UN-FIT",
    },
    caption:
      "UN-FIT ejecuta cada programa en un Cortex-A15 emulado y, en una instrucción al azar, voltea un bit de un registro: 50 veces por registro, 3000 por programa. Cada ejecución acaba bien (unACE), con un resultado erróneo (SDC) o colgada (hang). El modelo predice unACE con 30 características de la traza dinámica, sin inyectar nada.",
    readout: {
      idle: "{file} · predicho {predicted} unACE",
      running: "{file} · {done} de {total} fallos",
      done: "{file} · predicho {predicted} · medido {measured}",
    },
    value: {
      idle: "{file}: el modelo predice un {predicted} de ejecuciones unACE",
      done: "{file}: el modelo predice un {predicted} de ejecuciones unACE y UN-FIT midió un {measured} en {total} fallos",
    },
    status: "{file}: predicho {predicted}, medido {measured}.",
  },
}

export function getBenchCopy(locale: Locale): BenchCopy {
  return copy[locale]
}
