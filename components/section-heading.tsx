import type { AccentTitle } from "@/content/dictionary"

type Props = {
  id: string
  index: string
  label: string
  title: AccentTitle
  subtitle?: string
}

export function SectionHeading({ id, index, label, title, subtitle }: Props) {
  return (
    <div className="reveal grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
          <span className="text-accent-text">{index}</span> / {label}
        </p>
        <h2
          id={id}
          className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance"
        >
          {title.before}
          <AccentWord>{title.em}</AccentWord>
          {title.after}
        </h2>
      </div>
      {subtitle && <p className="max-w-md text-lg leading-relaxed text-pretty text-muted md:justify-self-end">{subtitle}</p>}
    </div>
  )
}

/** The italic serif word that gives headings their contrast. */
export function AccentWord({ children }: { children: string }) {
  return <em className="pr-[0.05em] font-serif text-[1.1em] font-normal tracking-[-0.01em] italic">{children}</em>
}
