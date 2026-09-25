import type { Dictionary } from "@/content/dictionary"
import { site } from "@/content/site"
import { ExternalLink } from "@/components/external-link"

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          {dict.footer.builtWith}{" "}
          <ExternalLink
            href={site.repo}
            newTabLabel={dict.work.newTab}
            className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
          >
            {dict.footer.source}
          </ExternalLink>
        </p>
      </div>
    </footer>
  )
}
