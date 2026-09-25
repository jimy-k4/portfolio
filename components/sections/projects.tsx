import type { Dictionary } from "@/content/dictionary"
import type { Project } from "@/content/projects"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"

type Props = {
  dict: Dictionary
  projects: Project[]
}

export function Projects({ dict, projects }: Props) {
  const featured = projects.filter((project) => project.featured)
  const others = projects.filter((project) => !project.featured)

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
        </div>
      </div>
    </section>
  )
}
