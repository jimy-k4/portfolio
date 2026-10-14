// The truth behind the radiation bench, from the final degree project "Fiabilidad en sistemas
// embebidos" (Juan Llinares Mauri, Universidad de Alicante, 2024): section 5.6 and tables 6.1–6.3.
//
// UN-FIT runs each program on an emulated ARM Cortex-A15 (QEMU, vexpress-a15). For every fault it
// picks a random instruction of the trace and a random bit, stops there and flips that bit of a
// register with a XOR: 50 faults per register, 3000 per program. Each run ends as unACE (the right
// result), SDC (a wrong result) or hang (it ends unexpectedly or never ends). The model, PARIS's
// Gradient Boosting Regression trained on 70 programs with 30 features of their dynamic trace,
// predicts unACE.
//
// These are the 8 of the 13 validation programs whose measured unACE + SDC + hang add up to 1 in the
// thesis tables (EE, FS, MMS, SHS and T don't, so they are left out).

export const FAULTS = 3000
/** One drawn event stands for this many faults, so a campaign is 60 events. */
export const PER_EVENT = 50
export const EVENTS = FAULTS / PER_EVENT

export type Shares = [unace: number, sdc: number, hang: number]

export type Program = {
  file: string
  /** UN-FIT: unACE, SDC and hang (tables 6.1, 6.3 and 6.2). */
  measured: Shares
  /** The model's unACE (table 6.1). */
  predicted: number
}

export const PROGRAMS: Program[] = [
  { file: "bubble_sort.c", measured: [0.62, 0.09, 0.29], predicted: 0.610217 },
  { file: "demonetization.c", measured: [0.68, 0.12, 0.2], predicted: 0.552319 },
  { file: "dijkstra.c", measured: [0.529333, 0.17, 0.300667], predicted: 0.677192 },
  { file: "fibonacci_fast.c", measured: [0.45, 0.2, 0.35], predicted: 0.37142 },
  { file: "hash_sdbm.c", measured: [0.400333, 0.1, 0.499667], predicted: 0.472207 },
  { file: "heapsort.c", measured: [0.676, 0.035, 0.289], predicted: 0.598616 },
  { file: "insertsort.c", measured: [0.741, 0.106, 0.153], predicted: 0.3469 },
  { file: "quicksort.c", measured: [0.532, 0.123, 0.345], predicted: 0.598616 },
]

/** Events per outcome for one campaign, rounded so they add up to EVENTS (largest remainder). */
export function eventsOf({ measured }: Program): Shares {
  const raw = measured.map((share) => share * EVENTS)
  const counts = raw.map(Math.floor)
  let left = EVENTS - counts.reduce((sum, count) => sum + count, 0)
  const byRemainder = raw.map((value, index) => [value - counts[index], index] as const).sort((a, b) => b[0] - a[0])
  for (const [, index] of byRemainder) {
    if (left-- <= 0) break
    counts[index] += 1
  }
  return counts as Shares
}

/** The order the outcomes arrive in: spread evenly, so every tube rises through the campaign. */
export function sequenceOf(program: Program): number[] {
  const counts = eventsOf(program)
  const done = [0, 0, 0]
  return Array.from({ length: EVENTS }, (_, event) => {
    let pick = 0
    let behind = -Infinity
    counts.forEach((count, index) => {
      const gap = ((event + 1) * count) / EVENTS - done[index]
      if (gap > behind) [pick, behind] = [index, gap]
    })
    done[pick] += 1
    return pick
  })
}
