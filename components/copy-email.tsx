"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"

type Props = {
  email: string
  copyLabel: string
  copiedLabel: string
  failedLabel: string
}

export function CopyEmail({ email, copyLabel, copiedLabel, failedLabel }: Props) {
  const [result, setResult] = useState<"copied" | "failed" | null>(null)

  useEffect(() => {
    if (!result) return
    // A failure stays visible so the address can be copied by hand.
    if (result === "failed") return
    const timeout = setTimeout(() => setResult(null), 3000)
    return () => clearTimeout(timeout)
  }, [result])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setResult("copied")
    } catch {
      // Clipboard blocked by the browser (permissions or insecure context).
      setResult("failed")
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={copy}
        className="grid size-14 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:bg-surface"
      >
        {result === "copied" ? (
          <Check aria-hidden="true" className="size-5 text-accent-text" />
        ) : (
          <Copy aria-hidden="true" className="size-5" />
        )}
        <span className="sr-only">{copyLabel}</span>
      </button>
      <span role="status" className="text-sm text-muted">
        {result === "copied" && copiedLabel}
        {result === "failed" && (
          <>
            {failedLabel} <span className="font-medium text-fg select-all">{email}</span>
          </>
        )}
      </span>
    </div>
  )
}
