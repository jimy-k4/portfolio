import type { AnchorHTMLAttributes } from "react"

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  /** Screen-reader hint, e.g. "(opens in a new tab)". */
  newTabLabel: string
}

/** Link that opens in a new tab and says so to screen readers. */
export function ExternalLink({ newTabLabel, children, ...props }: Props) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  )
}
