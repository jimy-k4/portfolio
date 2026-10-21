import { ArrowUpRight } from "lucide-react"

import { phase, type Barca as BarcaContent } from "@/content/barca"
import type { Dictionary } from "@/content/dictionary"
import { BarcaCrest } from "@/components/barca-crest"
import { ExternalLink } from "@/components/external-link"

type Props = {
  dict: Dictionary
  barca: BarcaContent
}

/** More than a Hack 2027: a blaugrana panel with the club's crest, apart from the projects. */
export function Barca({ dict, barca }: Props) {
  return (
    <section id="barca" aria-labelledby="barca-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <p className="reveal font-mono text-xs tracking-[0.2em] text-subtle uppercase">
          <span className="text-accent-text">01</span> / {barca.label}
        </p>

        <div className="blaugrana reveal relative mt-6 overflow-hidden rounded-3xl text-white">
          <div aria-hidden="true" className="blaugrana-stripes pointer-events-none absolute inset-0" />

          <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16 lg:p-14">
            <div className="lg:order-first">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-white/75">
                <span>{barca.kicker}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-0.5 text-white">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-barca-gold" />
                  {barca.status}
                </span>
              </div>

              <h2
                id="barca-title"
                className="mt-6 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance"
              >
                {barca.title.before}
                <em className="pr-[0.05em] font-serif text-[1.1em] font-normal tracking-[-0.01em] text-barca-gold italic">
                  {barca.title.em}
                </em>
                {barca.title.after}
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/80">{barca.description}</p>

              <ul className="mt-8 max-w-2xl space-y-3">
                {barca.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 leading-relaxed text-pretty">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-barca-gold" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="row-start-1 flex items-start justify-center lg:col-start-2 lg:items-center">
              <BarcaCrest label={barca.crestLabel} className="crest w-36 sm:w-44 lg:w-full" />
            </div>
          </div>

          <dl className="relative grid grid-cols-2 border-t border-white/15 lg:grid-cols-4">
            {barca.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col-reverse justify-end gap-1 p-6 sm:px-10 lg:px-8 lg:first:pl-14 ${index % 2 === 1 ? "border-l border-white/15" : ""} ${index >= 2 ? "border-t border-white/15 lg:border-t-0 lg:border-l" : ""}`}
              >
                <dt className="text-sm leading-snug text-pretty text-white/75">{stat.label}</dt>
                <dd className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <ol className="relative grid border-t border-white/15 md:grid-cols-3">
            {barca.phases.map((item, index) => (
              <li
                key={item.title}
                aria-current={index === phase ? "step" : undefined}
                className="flex flex-col gap-2 border-white/15 p-6 not-first:border-t sm:px-10 md:not-first:border-t-0 md:not-first:border-l lg:px-8 lg:first:pl-14"
              >
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-white/75">
                  {item.dates}
                  {index === phase && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-barca-gold px-2 py-0.5 font-medium text-barca-navy">
                      {barca.now}
                    </span>
                  )}
                </p>
                <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-pretty text-white/80">{item.detail}</p>
                <p className="mt-auto pt-2 font-mono text-xs tracking-[0.15em] text-white/75 uppercase">{item.who}</p>
              </li>
            ))}
          </ol>

          <ul className="relative flex flex-wrap gap-3 border-t border-white/15 p-6 sm:px-10 lg:px-14">
            {barca.links.map((link, index) => (
              <li key={link.url}>
                <ExternalLink
                  href={link.url}
                  newTabLabel={dict.work.newTab}
                  className={`group inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 text-sm font-medium transition-colors ${index === 0 ? "bg-white text-barca-navy hover:bg-white/90" : "border border-white/30 text-white hover:border-white/60 hover:bg-white/10"}`}
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
