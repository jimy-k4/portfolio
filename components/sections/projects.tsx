import { ArrowUpRight } from "lucide-react"

import type { Dictionary } from "@/content/dictionary"
import type { Project } from "@/content/projects"
import { contact } from "@/content/site"
import { ExternalLink } from "@/components/external-link"
import { GitHubIcon } from "@/components/icons"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"

type Props = {
  dict: Dictionary
  projects: Project[]
}

export function Projects({ dict, projects }: Props) {
  const featured = projects.filter((project) => project.featured)
  const others = projects.filter((project) => !project.featured)
  // The "More on GitHub" card takes whatever the last row of three leaves free: one gap, two, or a full row.
  const moreSpan = ["md:col-span-3", "md:col-span-2", ""][others.length % 3]
  const moreIsWide = moreSpan !== ""

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <SectionHeading
          id="projects-title"
          index="01"
          label={dict.work.label}
          title={dict.work.title}
          subtitle={dict.work.subtitle}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} labels={dict.work} featured />
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {others.map((project) => (
            <ProjectCard key={project.slug} project={project} labels={dict.work} />
          ))}
          <ExternalLink
            href={contact.github}
            newTabLabel={dict.work.newTab}
            className={`reveal group flex flex-col justify-between gap-6 rounded-3xl border border-dashed border-line-strong p-6 transition-colors hover:border-fg/40 hover:bg-surface ${moreSpan} ${moreIsWide ? "min-h-40 md:min-h-0 md:flex-row md:items-center md:justify-start" : "min-h-56"}`}
          >
            <GitHubIcon className="size-8 shrink-0 text-muted transition-colors group-hover:text-fg" />
            <span>
              <span className="flex items-center gap-1.5 text-xl font-semibold tracking-tight">
                {dict.work.more.title}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 text-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-text"
                />
              </span>
              <span className="mt-2 block text-[15px] leading-relaxed text-pretty text-muted">{dict.work.more.description}</span>
            </span>
          </ExternalLink>
        </div>
      </div>
    </section>
  )
}
