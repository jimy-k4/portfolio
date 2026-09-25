import { Mail } from "lucide-react"

import type { Dictionary } from "@/content/dictionary"
import { contact } from "@/content/site"
import { CopyEmail } from "@/components/copy-email"
import { ExternalLink } from "@/components/external-link"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"
import { AccentWord } from "@/components/section-heading"

export function Contact({ dict }: { dict: Dictionary }) {
  const { contact: text } = dict

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="accent-glow pointer-events-none absolute inset-0 rotate-180" />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-36">
        <p className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">
          <span className="text-accent-text">03</span> / {text.label}
        </p>
        <h2
          id="contact-title"
          className="reveal mt-4 max-w-4xl text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-balance"
        >
          {text.title.before}
          <AccentWord>{text.title.em}</AccentWord>
          {text.title.after}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">{text.description}</p>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex min-h-14 max-w-full items-center gap-3 rounded-full bg-accent px-6 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 motion-reduce:transition-none sm:text-lg"
          >
            <Mail aria-hidden="true" className="size-5 shrink-0" />
            <span className="truncate">{contact.email}</span>
          </a>
          <CopyEmail email={contact.email} copyLabel={text.copy} copiedLabel={text.copied} failedLabel={text.copyFailed} />
        </div>

        <ul className="mt-8 flex flex-wrap gap-3">
          <li>
            <ExternalLink
              href={contact.linkedin}
              newTabLabel={dict.work.newTab}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line px-5 font-medium text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <LinkedInIcon className="size-4" />
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href={contact.github}
              newTabLabel={dict.work.newTab}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line px-5 font-medium text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </ExternalLink>
          </li>
        </ul>
      </div>
    </section>
  )
}
