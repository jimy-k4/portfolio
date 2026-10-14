"use client"

import { useEffect, useRef } from "react"

import "@/components/iso/iso.css"
import "./radiation-bench.css"
import type { BenchCopy } from "@/content/figures"
import type { BenchControl } from "./controller"
import { PROGRAMS } from "./model"

type Props = {
  copy: BenchCopy
  locale: string
}

// The kit's legend swatches: a raised block, the lit block and an edge line.
function Swatch({ mark }: { mark: "lit" | "raised" | "edge" }) {
  if (mark === "edge") {
    return (
      <svg className="iso-swatch" data-mark="edge" viewBox="0 0 16 10" aria-hidden="true">
        <path d="M1.5 5h13" />
      </svg>
    )
  }
  return (
    <svg className="iso-swatch" data-mark={mark} viewBox="0 0 16 10" aria-hidden="true">
      <path d="M2 4.5 8 1.5 14 4.5 14 6 8 9 2 6Z" />
      <path className="iso-swatch-crease" d="M2 4.5 8 7.5 14 4.5" />
    </svg>
  )
}

/**
 * Fig. 1 of the TFG entry: a radiation test bench drawn with the Anatomy kit. The drawing and its
 * live code load when the figure comes near the screen, so they cost nothing on the first view.
 */
export function RadiationBench({ copy, locale }: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)
  const control = useRef<BenchControl | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    const host = hostRef.current
    const readout = readoutRef.current
    const status = statusRef.current
    if (!stage || !host || !readout || !status) return
    let cancelled = false
    const near = new IntersectionObserver(
      (entries) => {
        if (!entries[entries.length - 1].isIntersecting) return
        near.disconnect()
        Promise.all([import("./art"), import("./controller")]).then(([{ benchSvg }, { createBench }]) => {
          if (cancelled) return
          host.innerHTML = benchSvg()
          control.current = createBench({ stage, host, readout, status }, copy, locale)
        })
      },
      { rootMargin: "400px 0px" },
    )
    near.observe(stage)
    return () => {
      cancelled = true
      near.disconnect()
      control.current?.destroy()
      control.current = null
    }
  }, [copy, locale])

  const first = PROGRAMS[0]
  const percent = new Intl.NumberFormat(locale, { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 })
  const fill = (template: string) => template.replace("{file}", first.file).replace("{predicted}", percent.format(first.predicted))

  return (
    <figure className="iso tfg-bench iso-figure">
      <div className="iso-plate">
        <div className="iso-plate-corners" aria-hidden="true">
          <span className="iso-plate-corner" data-corner="fig">
            {copy.fig}
          </span>
          <span className="iso-plate-corner" data-corner="title">
            {copy.title}
          </span>
          <span className="iso-plate-corner" data-corner="hint">
            {copy.hint}
          </span>
          <span ref={readoutRef} className="iso-plate-corner" data-corner="readout" data-readout suppressHydrationWarning>
            {fill(copy.readout.idle)}
          </span>
        </div>
        <div
          ref={stageRef}
          className="iso-stage"
          tabIndex={0}
          role="slider"
          aria-label={copy.label}
          aria-valuemin={1}
          aria-valuemax={PROGRAMS.length}
          aria-valuenow={1}
          aria-valuetext={fill(copy.value.idle)}
          suppressHydrationWarning
          onKeyDown={(event) => control.current?.key(event.nativeEvent)}
          onClick={() => control.current?.tap()}
          onPointerEnter={() => control.current?.enter()}
        >
          <div ref={hostRef} className="tf-host" />
          <span ref={statusRef} className="tf-sr" role="status" aria-live="polite" />
        </div>
      </div>
      <figcaption className="iso-legend">
        <span className="iso-keys">
          <span className="iso-key">
            <Swatch mark="lit" />
            {copy.keys.fault}
          </span>
          <span className="iso-key">
            <Swatch mark="raised" />
            {copy.keys.tubes}
          </span>
          <span className="iso-key">
            <Swatch mark="edge" />
            {copy.keys.needle}
          </span>
        </span>
        <span className="iso-caption">{copy.caption}</span>
      </figcaption>
    </figure>
  )
}
