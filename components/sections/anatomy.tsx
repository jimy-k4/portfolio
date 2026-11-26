import type { Dictionary } from "@/content/dictionary"
import type { Project } from "@/content/projects"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"

type Props = {
  dict: Dictionary
  projects: Project[]
}

/** The interactive viewers of my own vehicles, apart from the other projects: one kit, one way of drawing. */
export function Anatomy({ dict, projects }: Props) {
  const anatomies = projects.filter((project) => project.group === "anatomy")
  if (anatomies.length === 0) return null

  return (
    <section id="anatomy" aria-labelledby="anatomy-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <SectionHeading
          id="anatomy-title"
          index="02"
          label={dict.anatomy.label}
          title={dict.anatomy.title}
          subtitle={dict.anatomy.subtitle}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {anatomies.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              labels={dict.work}
              featured
              wide={anatomies.length % 2 === 1 && index === anatomies.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
