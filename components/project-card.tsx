import Image from "next/image"
import { ArrowUpRight, Lock } from "lucide-react"

import type { Dictionary } from "@/content/dictionary"
import type { Project } from "@/content/projects"
import { ExternalLink } from "@/components/external-link"
import { GitHubIcon } from "@/components/icons"

type Props = {
  project: Project
  labels: Dictionary["work"]
  featured?: boolean
}

export function ProjectCard({ project, labels, featured = false }: Props) {
  return (
    <article
      id={project.slug}
      className="reveal group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-300 focus-within:border-line-strong hover:border-line-strong"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg">
        <Image
          src={project.image}
          alt={project.imageAlt}
          placeholder="blur"
          sizes={featured ? "(min-width: 1152px) 560px, (min-width: 1024px) 50vw, 100vw" : "(min-width: 1152px) 368px, (min-width: 768px) 33vw, 100vw"}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "p-6 sm:p-8" : "p-6"}`}>
        <div className="flex items-center gap-3 font-mono text-xs text-subtle">
          <span>{project.year}</span>
          {project.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 text-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-text" />
              {project.status}
            </span>
          )}
        </div>

        <h3 className={`font-semibold tracking-tight ${featured ? "mt-4 text-3xl" : "mt-3 text-xl"}`}>
          {/* The ::after overlay makes the whole card a link to the live project. */}
          <ExternalLink
            href={project.link}
            newTabLabel={labels.newTab}
            className="inline-flex items-center gap-1.5 after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
            <ArrowUpRight
              aria-hidden="true"
              className={`${featured ? "size-6" : "size-5"} text-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-text`}
            />
          </ExternalLink>
        </h3>

        <p className={`mt-3 leading-relaxed text-pretty text-muted ${featured ? "text-base sm:text-lg" : "text-[15px]"}`}>
          {project.description}
        </p>

        <ul aria-label={labels.tech} className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-full border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-muted">
              {tech}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-5 pt-6 text-sm">
          {project.repo ? (
            <ExternalLink
              href={project.repo}
              newTabLabel={labels.newTab}
              className="inline-flex min-h-11 items-center gap-2 font-medium text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              <GitHubIcon className="size-4" />
              {labels.code}
            </ExternalLink>
          ) : (
            <span className="inline-flex min-h-11 items-center gap-2 text-subtle">
              <Lock aria-hidden="true" className="size-4" />
              {labels.privateCode}
            </span>
          )}
          {project.credit && (
            <span className="inline-flex min-h-11 items-center gap-1 text-subtle">
              {labels.with}
              <ExternalLink
                href={project.credit.url}
                newTabLabel={labels.newTab}
                className="font-medium text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
              >
                {project.credit.name}
              </ExternalLink>
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
