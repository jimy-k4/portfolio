// What moves on the bench, written straight to the SVG on every frame (the kit's way: no React
// re-renders). Choosing a program swings the needle to the model's prediction at once; a campaign
// then flips one bit per pulse, drops each outcome into its tube and, at the end, shows the
// measured unACE as a mark on the dial.
import { cylinder, iso, lineOnTop, planOutline, segment, solidSvg } from "@/components/iso/iso-kit"
import { BENCH, P, cellOf } from "./art"
import { EVENTS, FAULTS, PER_EVENT, PROGRAMS, sequenceOf } from "./model"
import type { BenchCopy } from "@/content/figures"

export type BenchControl = {
  key: (event: KeyboardEvent) => void
  tap: () => void
  enter: () => void
  destroy: () => void
}

type Parts = {
  stage: HTMLElement
  host: HTMLElement
  readout: HTMLElement
  status: HTMLElement
}

const EVERY = 0.11 // seconds between pulses
const STOP = 11 // seconds per program in the tour
const LEAD = 1.6 // seconds the needle settles before the campaign starts
// Every program once, starting with the closest prediction and then the furthest.
const TOUR = [0, 6, 7, 4, 2, 5, 3, 1]
const SEQUENCES = PROGRAMS.map(sequenceOf)
const TOTALS = SEQUENCES.map((sequence) => [0, 1, 2].map((outcome) => sequence.filter((o) => o === outcome).length))

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")

export function createBench({ stage, host, readout, status }: Parts, copy: BenchCopy, locale: string): BenchControl {
  const svg = host.querySelector("svg")
  if (!svg) throw new Error("radiation bench: no drawing")
  const part = <T extends Element>(name: string) => svg.querySelector<T>(`[data-part="${name}"]`)!
  const needle = part<SVGPathElement>("needle")
  const mark = part<SVGPathElement>("mark")
  const digits = part<SVGTextElement>("digits")
  const bit = part<SVGPathElement>("bit")
  const beam = part<SVGPathElement>("beam")
  const pointer = part<SVGPathElement>("pointer")
  const liquids = BENCH.tubes.map((_, i) => part<SVGGElement>(`liquid-${i}`))
  const drops = BENCH.tubes.map((_, i) => part<SVGCircleElement>(`drop-${i}`))

  const still = matchMedia("(prefers-reduced-motion: reduce)")
  const percent = new Intl.NumberFormat(locale, { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 })
  const count = new Intl.NumberFormat(locale)
  const angleOf = (share: number) => -BENCH.sweep + 2 * BENCH.sweep * share

  let program = 0
  let events = 0
  let running = false
  let done = false
  let clock = 0
  let beamAge = 9
  let needleAt = angleOf(PROGRAMS[0].predicted)
  let knobAt = BENCH.positions[0]
  let markShow = 0
  const counts = [0, 0, 0]
  const levels = [0, 0, 0]
  const falling: Array<number | null> = [null, null, null]
  let frame = 0
  let last = 0
  let visible = false
  let touring = !still.matches
  let tourClock = 0
  let tourStep = -1
  let idleTimer = 0

  const target = (i: number) => (TOTALS[program][i] ? PROGRAMS[program].measured[i] * (counts[i] / TOTALS[program][i]) : 0)
  const values = () => {
    const p = PROGRAMS[program]
    return {
      file: p.file,
      predicted: percent.format(p.predicted),
      measured: percent.format(p.measured[0]),
      done: count.format(events * PER_EVENT),
      total: count.format(FAULTS),
    }
  }

  // The readout follows the campaign; the accessible value only changes with the reader's choice.
  function say() {
    const text = fill(done ? copy.readout.done : running ? copy.readout.running : copy.readout.idle, values())
    if (readout.textContent !== text) readout.textContent = text
  }
  function describe() {
    stage.setAttribute("aria-valuenow", String(program + 1))
    stage.setAttribute("aria-valuetext", fill(done ? copy.value.done : copy.value.idle, values()))
    if (done) status.textContent = fill(copy.status, values())
  }

  function select(index: number) {
    program = (index + PROGRAMS.length) % PROGRAMS.length
    events = 0
    running = false
    done = false
    clock = 0
    beamAge = 9
    counts.fill(0)
    falling.fill(null)
    markShow = 0
    if (still.matches) finish()
    describe()
  }
  function start() {
    if (running) return
    if (done) select(program)
    running = true
    clock = 0
    if (still.matches) finish()
  }
  function finish() {
    while (events < EVENTS) counts[SEQUENCES[program][events++]] += 1
    running = false
    done = true
    describe()
  }
  function fire() {
    const outcome = SEQUENCES[program][events++]
    counts[outcome] += 1
    const cell = cellOf(Math.floor(Math.random() * BENCH.grid.cols * BENCH.grid.rows))
    bit.setAttribute("d", planOutline(cell, BENCH.chipTop, P, 2))
    beam.setAttribute("d", segment(BENCH.emitter, [cell.x + cell.w / 2, cell.y + cell.d / 2, BENCH.chipTop], P))
    beamAge = 0
    falling[outcome] = 0
    if (events >= EVENTS) {
      running = false
      done = true
      describe()
    }
  }

  function draw() {
    const p = PROGRAMS[program]
    const [cx, cz] = [BENCH.dial.x, -BENCH.dial.z]
    const r = BENCH.scaleR
    const xy = (a: number, radius: number) => `${(cx + Math.sin(a) * radius).toFixed(2)} ${(cz - Math.cos(a) * radius).toFixed(2)}`
    needle.setAttribute("d", `M${xy(needleAt, -4)}L${xy(needleAt, r - 2)}`)
    const m = angleOf(p.measured[0])
    mark.setAttribute("d", `M${xy(m, r + 0.6)}L${xy(m - 0.09, r + 4)}L${xy(m + 0.09, r + 4)}Z`)
    mark.style.opacity = markShow.toFixed(3)
    digits.textContent = String(events * PER_EVENT).padStart(4, "0")
    BENCH.tubes.forEach((x, i) => {
      const height = Math.max(0.01, levels[i] * BENCH.fillSpan)
      liquids[i].innerHTML =
        levels[i] > 0.002 ? solidSvg(cylinder(x, BENCH.tubeY, BENCH.tubeR - 1.2, BENCH.fillFrom, height, P, 32), { tone: "lo", className: "tf-liquid", crease: "none" }) : ""
      const t = falling[i]
      const z = t === null ? 0 : BENCH.spoutTip - 520 * t * t
      if (t === null || z <= BENCH.fillFrom + height) {
        falling[i] = null
        drops[i].style.opacity = "0"
        return
      }
      const [sx, sy] = iso([x, BENCH.tubeY, z], P)
      drops[i].setAttribute("cx", sx.toFixed(2))
      drops[i].setAttribute("cy", sy.toFixed(2))
      drops[i].style.opacity = "1"
    })
    beam.style.opacity = Math.max(0, 1 - beamAge / 0.14).toFixed(3)
    bit.style.opacity = events ? Math.max(0.55, 1 - beamAge / 0.5).toFixed(3) : "0"
    const [kx, ky] = BENCH.knob
    pointer.setAttribute("d", lineOnTop([kx, ky], [kx + Math.sin(knobAt) * 6.6, ky - Math.cos(knobAt) * 6.6], 8.2, P))
    say()
  }

  function tick(now: number) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60
    last = now
    const calm = still.matches
    if (touring && !calm) {
      tourClock += dt
      // Each stop: choose the program, let the needle settle, run the campaign, then hold.
      const step = Math.floor(tourClock / STOP)
      if (step !== tourStep) {
        tourStep = step
        select(TOUR[step % TOUR.length])
      }
      if (tourClock - step * STOP > LEAD && !running && !done) start()
    }
    if (running) {
      clock += dt
      while (running && clock >= EVERY) {
        clock -= EVERY
        fire()
      }
    }
    beamAge += dt
    falling.forEach((t, i) => {
      if (t !== null) falling[i] = t + dt
    })
    const ease = (from: number, to: number, tau: number) => (calm ? to : from + (to - from) * (1 - Math.exp(-dt / tau)))
    needleAt = ease(needleAt, angleOf(PROGRAMS[program].predicted), 0.22)
    knobAt = ease(knobAt, BENCH.positions[program], 0.12)
    for (let i = 0; i < 3; i++) levels[i] = ease(levels[i], target(i), 0.16)
    markShow = ease(markShow, done ? 1 : 0, 0.25)
    draw()
    const settled =
      !touring &&
      !running &&
      falling.every((t) => t === null) &&
      beamAge > 0.6 &&
      Math.abs(needleAt - angleOf(PROGRAMS[program].predicted)) < 1e-4 &&
      Math.abs(knobAt - BENCH.positions[program]) < 1e-4 &&
      levels.every((level, i) => Math.abs(level - target(i)) < 1e-4) &&
      Math.abs(markShow - (done ? 1 : 0)) < 1e-3
    frame = visible && !settled ? requestAnimationFrame(tick) : 0
  }
  const run = () => {
    if (!frame && visible) {
      last = 0
      frame = requestAnimationFrame(tick)
    }
  }
  // After 3.6 s without input the tour comes back, but never in the middle of a campaign someone
  // started: it waits for it to end and carries on from the program on the selector.
  function resume() {
    if (still.matches) return
    if (running) {
      idleTimer = window.setTimeout(resume, 1000)
      return
    }
    const at = Math.max(0, TOUR.indexOf(program))
    tourStep = at
    tourClock = at * STOP + (done ? LEAD + EVENTS * EVERY : 0)
    touring = true
    run()
  }
  const hold = () => {
    touring = false
    window.clearTimeout(idleTimer)
    idleTimer = window.setTimeout(resume, 3600)
    run()
  }

  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[entries.length - 1].isIntersecting
      if (visible) run()
    },
    { rootMargin: "120px 0px" },
  )
  observer.observe(stage)
  select(0)
  draw()

  return {
    key(event) {
      let handled = true
      if (event.key === "ArrowRight" || event.key === "ArrowUp") select(program + 1)
      else if (event.key === "ArrowLeft" || event.key === "ArrowDown") select(program - 1)
      else if (event.key === "Home") select(0)
      else if (event.key === "End") select(PROGRAMS.length - 1)
      else if (event.key === " " || event.key === "Enter") start()
      else handled = false
      if (handled) {
        event.preventDefault()
        hold()
      }
    },
    tap() {
      select(program + 1)
      start()
      hold()
    },
    enter() {
      if (touring) hold()
    },
    destroy() {
      observer.disconnect()
      window.clearTimeout(idleTimer)
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    },
  }
}
