import { ArrowUpRight } from "lucide-react"

import type { Dictionary } from "@/content/dictionary"
import type { Experience } from "@/content/experience"
import { getProfile } from "@/content/profile"
import { ExternalLink } from "@/components/external-link"
import { SectionHeading } from "@/components/section-heading"

type Props = {
  dict: Dictionary
  experience: Experience[]
  profile: ReturnType<typeof getProfile>
}

export function Trajectory({ dict, experience, profile }: Props) {
  const labels = dict.experience

  return (
    <section id="trajectory" aria-labelledby="trajectory-title" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <SectionHeading
          id="trajectory-title"
          index="02"
          label={labels.label}
          title={labels.title}
          subtitle={labels.subtitle}
        />

        <ol className="mt-14 border-t border-line">
          {experience.map((entry) => (
            <li
              key={`${entry.company}-${entry.period}`}
              className="reveal grid gap-4 border-b border-line py-10 md:grid-cols-[13rem_1fr] md:gap-10 md:py-12"
            >
              <div className="flex items-baseline gap-3 font-mono text-sm md:block md:pt-2">
                <p className="text-subtle">{entry.period}</p>
                <p className="text-xs tracking-[0.2em] text-accent-text uppercase md:mt-2">{labels.kinds[entry.kind]}</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{entry.role}</h3>
                <p className="mt-1 text-muted">{entry.company}</p>
                <p className="mt-5 max-w-2xl leading-relaxed text-pretty">{entry.description}</p>
                <ul className="mt-5 max-w-2xl space-y-3">
                  {entry.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 leading-relaxed text-pretty text-muted">
                      <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent-text" />
                      {achievement}
                    </li>
                  ))}
                </ul>
                {entry.links && (
                  <ul className="mt-4 flex flex-wrap gap-x-5 text-sm">
                    {entry.links.map((link) => (
                      <li key={link.url}>
                        <ExternalLink
                          href={link.url}
                          newTabLabel={dict.work.newTab}
                          className="group inline-flex min-h-11 items-center gap-1 font-medium text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg"
                        >
                          {link.label}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
          <div className="reveal">
            <h3 className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">{labels.skills}</h3>
            <dl className="mt-6 space-y-5">
              {profile.skills.map(({ group, items }) => (
                <div key={group} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-sm text-muted sm:pt-1">{group}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-fg"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal space-y-12">
            <div>
              <h3 className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">{labels.languages}</h3>
              <dl className="mt-6 space-y-3">
                {profile.languages.map(({ name, level }) => (
                  <div key={name} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-line pb-3">
                    <dt className="font-medium">{name}</dt>
                    <dd className="text-sm text-muted">{level}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="font-mono text-xs tracking-[0.2em] text-subtle uppercase">{labels.certifications}</h3>
              <ul className="mt-6 space-y-4">
                {profile.certifications.map(({ title, detail, year }) => (
                  <li key={title} className="grid grid-cols-[1fr_auto] gap-x-4">
                    <span className="font-medium">{title}</span>
                    <span className="font-mono text-xs text-subtle">{year}</span>
                    <span className="col-span-2 mt-0.5 text-sm text-muted">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
