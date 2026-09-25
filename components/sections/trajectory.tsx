import type { Dictionary } from "@/content/dictionary"
import type { Experience } from "@/content/experience"
import { SectionHeading } from "@/components/section-heading"

type Props = {
  dict: Dictionary
  experience: Experience[]
}

export function Trajectory({ dict, experience }: Props) {
  return (
    <section id="trajectory" aria-labelledby="trajectory-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <SectionHeading
          id="trajectory-title"
          index="02"
          label={dict.experience.label}
          title={dict.experience.title}
          subtitle={dict.experience.subtitle}
        />

        <ol className="mt-14 border-t border-line">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.period}`}
              className="reveal grid gap-4 border-b border-line py-10 md:grid-cols-[13rem_1fr] md:gap-10 md:py-12"
            >
              <p className="font-mono text-sm text-subtle md:pt-2">{job.period}</p>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{job.role}</h3>
                <p className="mt-1 text-muted">{job.company}</p>
                <p className="mt-5 max-w-2xl leading-relaxed text-pretty">{job.description}</p>
                <ul className="mt-5 max-w-2xl space-y-3">
                  {job.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 leading-relaxed text-pretty text-muted">
                      <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent-text" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
