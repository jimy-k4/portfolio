// The radiation bench drawn with the Anatomy kit: the static parts as one SVG string, plus the
// world measurements the live code needs. World: x across, y toward the viewer, z up, ~1 px per unit.
import * as k from "@/components/iso/iso-kit"
import type { Flat, Plan, Point3 } from "@/components/iso/iso-kit"
import { PROGRAMS } from "./model"

export const WIDTH = 600
export const HEIGHT = 340

const PLATE: Plan = { x: -175, y: -92, w: 350, d: 170, r: 8 }
const PLATE_H = 12
const FOOT_H = 5

// Irradiation station: the board, the socket and the chip with one register in view.
const BOARD: Plan = { x: -122, y: -42, w: 72, d: 58, r: 2 }
const BOARD_Z = 4
const BOARD_TOP = 6
const SOCKET: Plan = { x: -105, y: -31, w: 36, d: 36, r: 1.6 }
const SOCKET_TOP = 10
const CHIP: Plan = { x: -100, y: -26, w: 26, d: 26, r: 1 }
const CHIP_TOP = 13
const CELL = 2.4
const CELL_GAP = 0.6
const COLS = 8
const ROWS = 4
const GRID_X = CHIP.x + (CHIP.w - (COLS * (CELL + CELL_GAP) - CELL_GAP)) / 2
const GRID_Y = CHIP.y + (CHIP.d - (ROWS * (CELL + CELL_GAP) - CELL_GAP)) / 2
const HEADER: Plan = { x: -59, y: -36, w: 6, d: 14, r: 1 }
const HEADER_TOP = 11

// Emitter on a post, over the chip.
const MAG: Plan = { x: -168, y: -27, w: 30, d: 30, r: 3 }
const MAG_H = 18
const POST: Flat = [-153, -12]
const POST_TOP = 132
const CLAMP_Z = 98
const EMIT: Flat = [CHIP.x + CHIP.w / 2, CHIP.y + CHIP.d / 2]
const HOUSING_Z = 92
const HOUSING_TOP = 112
const NOZZLE_Z = 80

// Rack of three tubes (unACE, SDC, hang) with a dispenser bar above them.
const RACK: Plan = { x: -18, y: -21, w: 80, d: 22, r: 2 }
const RACK_TOP = 6
const TUBE_Y = -10
const TUBES = [0, 22, 44]
const TUBE_R = 7
const TUBE_TOP = 78
const FILL_FROM = RACK_TOP + 1
const FILL_SPAN = TUBE_TOP - 4 - FILL_FROM
const BAR_Z = 96
const SPOUT_TIP = 86

// The meter: a case whose front carries the unACE dial and the fault counter.
const CASE: Plan = { x: 84, y: -76, w: 76, d: 36, r: 4 }
const FRONT = CASE.y + CASE.d
const CASE_TOP = 98
const DIAL = { x: 122, z: 60, r: 24 }
const SCALE_R = 18
const SWEEP = (135 * Math.PI) / 180
const WINDOW = { x0: 103, x1: 141, z0: 13, z1: 27, r: 1.6, depth: 1.4 }

// Program selector on the plate, in front of the meter: one detent per program.
const KNOB: Flat = [122, 42]
const DETENT_R = 12.5
const POSITIONS = PROGRAMS.map((_, index) => ((-105 + (210 * index) / (PROGRAMS.length - 1)) * Math.PI) / 180)

export const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [POST[0], POST[1], POST_TOP + 2], ...k.boxCorners(CASE, 0, CASE_TOP)],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: 50 },
)

/** What the live code moves, in world units. */
export const BENCH = {
  chipTop: CHIP_TOP,
  emitter: [EMIT[0], EMIT[1], NOZZLE_Z] as Point3,
  grid: { x: GRID_X, y: GRID_Y, cols: COLS, rows: ROWS, cell: CELL, gap: CELL_GAP },
  tubes: TUBES,
  tubeY: TUBE_Y,
  tubeR: TUBE_R,
  fillFrom: FILL_FROM,
  fillSpan: FILL_SPAN,
  spoutTip: SPOUT_TIP,
  dial: DIAL,
  scaleR: SCALE_R,
  sweep: SWEEP,
  knob: KNOB,
  positions: POSITIONS,
}

const at = (point: Point3) => k.iso(point, P)
const S = k.solidSvg
const L = k.lineSvg
const D = k.dotsSvg
const byDepth = (points: Flat[]) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P))
const planeOf = (y: number) => k.sideMatrix([0, y], 0, P, "left")
const flat = (x0: number, z0: number, x1: number, z1: number, r: number, steps = 6) =>
  k.pathOf(k.roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps).map(([u, z]) => [u, -z] as Flat), true)

export function cellOf(index: number): Plan {
  const col = index % COLS
  const row = Math.floor(index / COLS)
  return { x: GRID_X + col * (CELL + CELL_GAP), y: GRID_Y + row * (CELL + CELL_GAP), w: CELL, d: CELL, r: 0.3 }
}

type Recess = { x0: number; x1: number; z0: number; z1: number; r: number; depth: number }

// A recess in a vertical face facing +y, its inner walls shaded by facing (the kit's desk-computer example).
let clips = 0
function recess({ x0, x1, z0, z1, r, depth }: Recess, y: number, back = "", backClass = "tf-face", steps = 6) {
  const id = `tf-clip-${clips++}`
  const ring = k.roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps)
  const cx = (x0 + x1) / 2
  const cz = (z0 + z1) / 2
  const { sinA } = k.cameraOf(P)
  const tops: string[] = []
  const sides: string[][] = [[], [], [], []]
  ring.forEach(([ax, az], index) => {
    const [bx, bz] = ring[(index + 1) % ring.length]
    const length = Math.hypot(bx - ax, bz - az) || 1
    let [nx, nz] = [(bz - az) / length, -(bx - ax) / length]
    if (nx * (cx - (ax + bx) / 2) + nz * (cz - (az + bz) / 2) < 0) [nx, nz] = [-nx, -nz]
    if (nx <= 0 && nz <= 0) return
    const quad = k.pathOf([at([ax, y, az]), at([bx, y, bz]), at([bx, y - depth, bz]), at([ax, y - depth, az])], true)
    if (nz >= nx) tops.push(quad)
    else sides[Math.min(3, Math.max(0, Math.floor(((nx * -sinA + 1) / 2) * 4)))].push(quad)
  })
  const shape = flat(x0, z0, x1, z1, r, steps)
  return [
    `<clipPath id="${id}"><path transform="${planeOf(y)}" d="${shape}"/></clipPath>`,
    `<g clip-path="url(#${id})">`,
    `<path class="iso-top" d="${tops.join("")}"/>`,
    ...sides.map((d, shade) => (d.length ? `<path class="iso-shade" data-shade="${shade}" d="${d.join("")}"/>` : "")),
    `<g transform="${planeOf(y - depth)}"><path class="${backClass}" d="${shape}"/>${back}<path class="iso-line" data-tone="faint" d="${shape}"/></g>`,
    `</g>`,
    `<g transform="${planeOf(y)}"><path class="iso-line" data-tone="lo" d="${shape}"/></g>`,
  ].join("")
}

function plate() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`]
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }))
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }))
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }))
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }))
  const screws = k.corners(PLATE, 10)
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }))
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }))
  // Label plate: three rule lines that stand for printed text.
  const label: Plan = { x: -160, y: 52, w: 46, d: 14, r: 1.2 }
  out.push(S(k.slabOf(label, 0, 0.8, P, 3), { tone: "lo", crease: "none" }))
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), 0.8, P, 3), { tone: "faint" }))
  out.push(L([32, 24, 28].map((w, i) => k.lineOnTop([label.x + 5, label.y + 4 + i * 3], [label.x + 5 + w, label.y + 4 + i * 3], 0.8, P)).join(""), { tone: "lo", free: true }))
  out.push(D([at([label.x + label.w - 3.5, label.y + 3.5, 0.8]), at([label.x + label.w - 3.5, label.y + label.d - 3.5, 0.8])], { size: 0.45 }))
  // Ruler strip along the front edge.
  const strip: Plan = { x: -100, y: 62, w: 170, d: 7, r: 1 }
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }))
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P)
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }))
  out.push(D([at([strip.x + 2, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 2, strip.y + 3.5, 0.6])], { size: 0.45 }))
  return out.join("")
}

// The signal cable from the board's edge, under the header, to the meter, laid on the plate behind the rack.
function cable() {
  const edge = BOARD.x + BOARD.w
  const y = HEADER.y + HEADER.d / 2
  return k.wireSvg(at([edge, y, (BOARD_Z + BOARD_TOP) / 2]), at([CASE.x + 2, -58, 0]), {
    via: [at([edge + 4, y, 0]), at([edge + 4, -58, 0])],
    tone: "lo",
    ends: "from",
    size: 1.1,
  })
}

function station() {
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(BOARD, 2), 0, 0.1, P)}" style="filter:blur(5px)"/>`]
  for (const [x, y] of byDepth(k.corners(BOARD, 5))) out.push(S(k.cylinder(x, y, 2.2, 0, BOARD_Z, P, 18), { tone: "mid" }))
  out.push(S(k.slabOf(BOARD, BOARD_Z, BOARD_TOP - BOARD_Z, P, 4, 0.4), { tone: "mid" }))
  out.push(D(k.corners(BOARD, 5).map(([x, y]) => at([x, y, BOARD_TOP])), { size: 0.5 }))
  // Traces from the socket to the header.
  const right = SOCKET.x + SOCKET.w
  const traces = Array.from({ length: 6 }, (_, i) => {
    const from = -27 + i * 2.4
    const to = HEADER.y + 2 + i * 2
    return k.onTop([[right, from], [right + 2.5, from], [HEADER.x - 2.5, to], [HEADER.x, to]], BOARD_TOP, P)
  })
  out.push(L(traces.join(""), { tone: "faint" }))
  // Header connector with its pins.
  out.push(S(k.slabOf(HEADER, BOARD_TOP, HEADER_TOP - BOARD_TOP, P, 3, 0.4), { tone: "mid" }))
  out.push(D(Array.from({ length: 6 }, (_, i) => at([HEADER.x + 3, HEADER.y + 2 + i * 2, HEADER_TOP])), { size: 0.45, tone: "hi" }))
  // ZIF socket with its lever.
  out.push(S(k.slabOf(SOCKET, BOARD_TOP, SOCKET_TOP - BOARD_TOP, P, 3, 0.5), { tone: "mid" }))
  const pins: Flat[] = []
  for (let i = 0; i < 9; i++) {
    const t = SOCKET.y + 4 + i * 3.5
    pins.push(at([SOCKET.x + 2, t, SOCKET_TOP]), at([SOCKET.x + SOCKET.w - 2, t, SOCKET_TOP]))
  }
  out.push(D(pins, { size: 0.35, tone: "lo" }))
  const lever: Plan = { x: SOCKET.x - 3, y: SOCKET.y + 2, w: 2.4, d: SOCKET.d - 2, r: 1 }
  out.push(S(k.slabOf(lever, BOARD_TOP + 1, 2.2, P, 2), { tone: "mid", crease: "none" }))
  out.push(S(k.cylinder(lever.x + 1.2, lever.y + lever.d + 1.4, 1.8, BOARD_TOP + 1, 3, P, 16), { tone: "mid" }))
  // The chip, the subject, with one register of 32 bits in view and the bit that flips.
  out.push(S(k.slabOf(CHIP, SOCKET_TOP, CHIP_TOP - SOCKET_TOP, P, 3, 0.6), { tone: "hi", crease: "lo" }))
  out.push(L(Array.from({ length: COLS * ROWS }, (_, i) => k.planOutline(cellOf(i), CHIP_TOP, P, 2)).join(""), { tone: "lo" }))
  out.push(D([at([CHIP.x + 2.4, CHIP.y + 2.4, CHIP_TOP])], { size: 0.55, tone: "mid" }))
  out.push(`<path class="tf-bit" data-part="bit" d="${k.planOutline(cellOf(11), CHIP_TOP, P, 2)}" style="opacity:0"/>`)
  return out.join("")
}

function emitterBase() {
  const out = [`<path class="iso-halo" d="${k.haloOf(MAG, 0, 2, P)}"/>`]
  out.push(S(k.slabOf(MAG, 0, 11, P, 6, 0.8), { tone: "mid" }))
  out.push(S(k.slabOf(k.insetPlan(MAG, 0.8), 11, MAG_H - 11, P, 6, 0.8), { tone: "mid" }))
  out.push(L(k.planOutline(k.insetPlan(MAG, 3), MAG_H, P), { tone: "faint" }))
  const knob: Flat = [MAG.x + 22, MAG.y + 22]
  out.push(S(k.cylinder(knob[0], knob[1], 5, MAG_H, 4, P, 28), { tone: "mid" }))
  out.push(L(k.knurl(knob[0], knob[1], 5, MAG_H, MAG_H + 4, 30, P), { tone: "lo" }))
  out.push(L(k.lineOnTop([knob[0], knob[1]], [knob[0] + 5, knob[1]], MAG_H + 4, P), { tone: "hi", free: "end" }))
  out.push(S(k.cylinder(POST[0], POST[1], 5, MAG_H, 4, P, 28), { tone: "mid" }))
  out.push(S(k.cylinder(POST[0], POST[1], 3.4, MAG_H + 4, CLAMP_Z - MAG_H - 4, P, 28), { tone: "mid", crease: "none" }))
  out.push(L([48, 72].map((z) => k.sideArc(POST[0], POST[1], 3.4, z, P, 16)).join(""), { tone: "faint" }))
  return out.join("")
}

function emitterHead() {
  const out: string[] = []
  const clamp: Plan = { x: POST[0] - 7, y: POST[1] - 7, w: 14, d: 14, r: 2.5 }
  out.push(S(k.slabOf(clamp, CLAMP_Z, 14, P, 4, 0.6), { tone: "mid" }))
  out.push(S(k.cylinder(POST[0], POST[1], 3.4, CLAMP_Z + 14, POST_TOP - CLAMP_Z - 14, P, 28), { tone: "mid", crease: "none" }))
  out.push(S(k.cylinder(POST[0], POST[1], 4, POST_TOP, 2, P, 28), { tone: "mid" }))
  const thumb: Flat = [clamp.x + 7, clamp.y + clamp.d + 3]
  out.push(S(k.slabOf({ x: thumb[0] - 1.4, y: clamp.y + clamp.d, w: 2.8, d: 3, r: 0.8 }, CLAMP_Z + 4, 4, P, 2), { tone: "mid", crease: "none" }))
  out.push(S(k.cylinder(thumb[0], thumb[1] + 1.4, 2.6, CLAMP_Z + 3, 6, P, 20), { tone: "mid" }))
  out.push(L(k.knurl(thumb[0], thumb[1] + 1.4, 2.6, CLAMP_Z + 3, CLAMP_Z + 9, 18, P), { tone: "lo" }))
  // Arm from the clamp to the housing.
  const arm: Plan = { x: clamp.x + clamp.w, y: POST[1] - 3, w: EMIT[0] - 9 - (clamp.x + clamp.w), d: 6, r: 1.5 }
  out.push(S(k.slabOf(arm, CLAMP_Z + 5, 4, P, 3, 0.5), { tone: "mid" }))
  out.push(D([at([arm.x + 5, POST[1], CLAMP_Z + 9]), at([arm.x + arm.w - 6, POST[1], CLAMP_Z + 9])], { size: 0.45 }))
  // The collimator, a collar, the housing with its knurled band and the cap.
  const [x, y] = EMIT
  out.push(S(k.cylinder(x, y, 2.8, NOZZLE_Z, 6, P, 20), { tone: "hi", crease: "lo" }))
  out.push(S(k.cylinder(x, y, 5.6, NOZZLE_Z + 6, HOUSING_Z - NOZZLE_Z - 6, P, 28), { tone: "mid" }))
  out.push(S(k.cylinder(x, y, 9, HOUSING_Z, HOUSING_TOP - HOUSING_Z, P, 40, 0.8), { tone: "mid" }))
  out.push(L(k.knurl(x, y, 9, HOUSING_TOP - 6, HOUSING_TOP - 2, 48, P, 0.3), { tone: "lo" }))
  out.push(L(k.sideArc(x, y, 9, HOUSING_TOP - 6, P, 28) + k.sideArc(x, y, 9, HOUSING_TOP - 2, P, 28), { tone: "faint" }))
  out.push(L(k.sideArc(x, y, 9, HOUSING_Z + 6, P, 28), { tone: "faint" }))
  out.push(S(k.cylinder(x, y, 6.4, HOUSING_TOP, 3, P, 32, 0.5), { tone: "mid" }))
  out.push(D([at([x, y, HOUSING_TOP + 3])], { size: 0.6, tone: "mid" }))
  return out.join("")
}

function rack() {
  const out = [`<path class="iso-halo" d="${k.haloOf(RACK, 0, 2, P)}"/>`]
  out.push(S(k.slabOf(RACK, 0, RACK_TOP, P, 4, 0.8), { tone: "mid" }))
  out.push(L(k.planOutline(k.insetPlan(RACK, 2.4), RACK_TOP, P, 4), { tone: "faint" }))
  out.push(L(TUBES.map((x) => k.ring(x, TUBE_Y, TUBE_R + 1.6, RACK_TOP, P, 32)).join(""), { tone: "lo" }))
  return out.join("")
}

function post(x: number) {
  return [
    S(k.cylinder(x, TUBE_Y, 3.2, RACK_TOP, 2, P, 20), { tone: "mid" }),
    S(k.cylinder(x, TUBE_Y, 2, RACK_TOP + 2, BAR_Z - RACK_TOP - 2, P, 20), { tone: "mid", crease: "none" }),
  ].join("")
}

// One tube: the liquid (rebuilt live), a falling drop, then the glass over them.
function tube(x: number, index: number) {
  const glass = k.cylinder(x, TUBE_Y, TUBE_R, RACK_TOP, TUBE_TOP - RACK_TOP, P, 40)
  const shineAt = (110 * Math.PI) / 180
  const sx = x + Math.cos(shineAt) * TUBE_R * 0.98
  const sy = TUBE_Y + Math.sin(shineAt) * TUBE_R * 0.98
  return [
    `<g data-part="liquid-${index}"></g>`,
    `<circle class="tf-drop" data-part="drop-${index}" r="1.3" cx="0" cy="0" style="opacity:0"/>`,
    `<path class="tf-glass" d="${glass.fill}"/>`,
    L(glass.outline, { tone: "mid" }),
    L(k.ring(x, TUBE_Y, TUBE_R, TUBE_TOP, P, 40) + k.ring(x, TUBE_Y, TUBE_R - 1, TUBE_TOP, P, 40), { tone: "mid" }),
    k.fadeLineSvg([at([sx, sy, RACK_TOP + 6]), at([sx, sy, TUBE_TOP - 6])], { fade: [8, 8], tone: "hi" }),
  ].join("")
}

function dispenser() {
  const out: string[] = []
  const bar: Plan = { x: -16, y: TUBE_Y - 4, w: 76, d: 8, r: 2 }
  out.push(S(k.slabOf(bar, BAR_Z, 4, P, 4, 0.5), { tone: "mid" }))
  out.push(D([at([bar.x + 3.5, TUBE_Y, BAR_Z + 4]), at([bar.x + bar.w - 3.5, TUBE_Y, BAR_Z + 4])], { size: 0.45 }))
  for (const x of TUBES) {
    out.push(S(k.cylinder(x, TUBE_Y, 2.6, SPOUT_TIP + 3, BAR_Z - SPOUT_TIP - 3, P, 20), { tone: "mid" }))
    out.push(S(k.cylinder(x, TUBE_Y, 1.4, SPOUT_TIP, 3, P, 16), { tone: "mid" }))
  }
  return out.join("")
}

function meter() {
  const out = [`<path class="iso-halo" d="${k.haloOf(CASE, 0, 4, P)}"/>`]
  out.push(S(k.slabOf(k.insetPlan(CASE, 2), 0, 4, P, 6), { tone: "lo" }))
  out.push(S(k.slabOf(CASE, 4, CASE_TOP - 4, P, 6, 1.2), { tone: "mid", inner: L(k.sideSeam(CASE, CASE_TOP - 8, P, 6), { tone: "faint" }) }))
  out.push(D(k.corners(CASE, 5).map(([x, y]) => at([x, y, CASE_TOP])), { size: 0.5 }))
  out.push(L(k.planOutline(k.insetPlan(CASE, 3.5), CASE_TOP, P, 6), { tone: "faint" }))
  // Front panel: an inset outline and four screws.
  out.push(`<g transform="${planeOf(FRONT)}"><path class="iso-line" data-tone="faint" d="${flat(CASE.x + 4, 8, CASE.x + CASE.w - 4, CASE_TOP - 12, 3)}"/></g>`)
  const screws: Flat[] = [[CASE.x + 8, 12], [CASE.x + CASE.w - 8, 12], [CASE.x + 8, CASE_TOP - 16], [CASE.x + CASE.w - 8, CASE_TOP - 16]]
  out.push(`<g transform="${planeOf(FRONT)}">${L(screws.map(([x, z]) => k.pathOf(k.circleRing(x, -z, 1.8, 14), true)).join(""), { tone: "lo" })}</g>`)
  out.push(D(screws.map(([x, z]) => at([x, FRONT, z])), { size: 0.45 }))

  // The dial: a round recess with the unACE scale, the predicted needle and the measured mark.
  const point = (a: number, r: number) => `${(DIAL.x + Math.sin(a) * r).toFixed(2)} ${(-DIAL.z - Math.cos(a) * r).toFixed(2)}`
  const ticks = Array.from({ length: 21 }, (_, i) => {
    const a = -SWEEP + (2 * SWEEP * i) / 20
    return `M${point(a, SCALE_R)}L${point(a, SCALE_R - (i % 5 === 0 ? 3.2 : 1.6))}`
  })
  const arc = `M${point(-SWEEP, SCALE_R)}A${SCALE_R} ${SCALE_R} 0 1 1 ${point(SWEEP, SCALE_R)}`
  const face = [
    `<path class="iso-line" data-tone="mid" d="${arc}"/>`,
    `<path class="iso-line" data-tone="lo" d="${ticks.filter((_, i) => i % 5).join("")}"/>`,
    `<path class="iso-line" data-tone="hi" d="${ticks.filter((_, i) => i % 5 === 0).join("")}"/>`,
    `<text class="tf-dial-text" x="${DIAL.x}" y="${-DIAL.z + 10}" text-anchor="middle">unACE %</text>`,
    `<path class="tf-mark" data-part="mark" d="" style="opacity:0"/>`,
    `<path class="iso-line" data-tone="hi" data-part="needle" data-free="start" d="" style="stroke-width:1.1"/>`,
    `<circle class="tf-hub" cx="${DIAL.x}" cy="${-DIAL.z}" r="1.8"/>`,
  ].join("")
  out.push(recess({ x0: DIAL.x - DIAL.r, x1: DIAL.x + DIAL.r, z0: DIAL.z - DIAL.r, z1: DIAL.z + DIAL.r, r: DIAL.r, depth: 1.8 }, FRONT, face, "tf-face", 16))

  // The fault counter: four digits behind a window.
  const digits = `<text class="tf-digits" data-part="digits" x="${WINDOW.x1 - 4}" y="${-(WINDOW.z0 + 3.6)}" text-anchor="end">0000</text>`
  out.push(recess(WINDOW, FRONT, digits, "tf-window"))
  return out.join("")
}

function selector() {
  const [x, y] = KNOB
  const out: string[] = []
  out.push(S(k.cylinder(x, y, 16, 0, 1.2, P, 48, 0.4), { tone: "lo" }))
  out.push(L(k.ring(x, y, DETENT_R, 1.2, P, 48), { tone: "lo" }))
  out.push(L(POSITIONS.map((a) => k.lineOnTop([x + Math.sin(a) * DETENT_R, y - Math.cos(a) * DETENT_R], [x + Math.sin(a) * 15, y - Math.cos(a) * 15], 1.2, P)).join(""), { tone: "mid" }))
  out.push(S(k.cylinder(x, y, 8, 1.2, 7, P, 36), { tone: "mid" }))
  out.push(L(k.knurl(x, y, 8, 2.2, 7.2, 40, P), { tone: "lo" }))
  out.push(L(k.ring(x, y, 6, 8.2, P, 32), { tone: "faint" }))
  out.push(`<path class="iso-line" data-tone="hi" data-part="pointer" data-free="end" d="" style="stroke-width:1"/>`)
  out.push(D([at([x, y, 8.2])], { size: 0.5, tone: "hi" }))
  return out.join("")
}

/** The static drawing. It is decorative: the stage around it carries the label and the value. */
export function benchSvg() {
  clips = 0
  return k
    .figureSvg({
      width: WIDTH,
      height: HEIGHT,
      label: "",
      body: [
        plate(),
        cable(),
        emitterBase(),
        station(),
        `<path class="tf-beam" data-part="beam" d="" style="opacity:0"/>`,
        emitterHead(),
        rack(),
        post(-11),
        ...TUBES.map((x, i) => tube(x, i)),
        post(55),
        dispenser(),
        meter(),
        selector(),
      ],
    })
    .replace(/ role="img"(?: aria-label="[^"]*")?/, ' aria-hidden="true" focusable="false"')
}
