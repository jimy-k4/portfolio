import Image from "next/image"
import { ArrowDown, Mail } from "lucide-react"

import type { Dictionary } from "@/content/dictionary"
import type { Project } from "@/content/projects"
import { contact } from "@/content/site"
import { ExternalLink } from "@/components/external-link"
import { GitHubIcon, LinkedInIcon } from "@/components/icons"

type Props = {
  dict: Dictionary
  current: Project[]
}

export function Hero({ dict, current }: Props) {
  const { hero } = dict

  return (
    <section id="top" aria-labelledby="top-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="accent-glow pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 pt-32 pb-20 sm:px-6 sm:pt-48 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="rise">
          <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">{hero.eyebrow}</p>

          <h1
            id="top-title"
            className="mt-6 text-[clamp(3.5rem,16vw,9.5rem)] leading-[0.85] font-semibold tracking-[-0.055em]"
          >
            Juan
            <br />
            Llinares<span className="text-accent-text">.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">{hero.description}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-fg px-6 font-medium text-bg transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              {hero.cta}
              <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 font-medium transition-colors hover:bg-surface"
            >
              <Mail aria-hidden="true" className="size-4" />
              {hero.email}
            </a>
            <div className="flex items-center gap-1">
              <ExternalLink
                href={contact.github}
                newTabLabel={dict.work.newTab}
                className="grid size-12 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
              >
                <GitHubIcon className="size-5" />
                <span className="sr-only">GitHub</span>
              </ExternalLink>
              <ExternalLink
                href={contact.linkedin}
                newTabLabel={dict.work.newTab}
                className="grid size-12 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
              >
                <LinkedInIcon className="size-5" />
                <span className="sr-only">LinkedIn</span>
              </ExternalLink>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="mr-1 inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-subtle uppercase">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-text" />
              </span>
              {hero.nowBuilding}
            </span>
            {current.map((project) => (
              <a
                key={project.slug}
                href={`#${project.slug}`}
                className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface/60 px-4 text-sm font-medium backdrop-blur transition-colors hover:border-line-strong"
              >
                {project.title}
              </a>
            ))}
          </div>
        </div>

        <ProjectStack projects={current} />
      </div>
    </section>
  )
}

/** Decorative stack with the screenshots of the current projects; the chips carry the links. */
function ProjectStack({ projects }: { projects: Project[] }) {
  const [front, back] = projects
  if (!front || !back) return null

  return (
    <div aria-hidden="true" className="stack-in relative hidden aspect-square lg:block">
      <div className="absolute top-0 right-0 w-[88%] rotate-[5deg] overflow-hidden rounded-2xl border border-line-strong shadow-2xl shadow-black/40">
        <Image src={back.image} alt="" sizes="416px" placeholder="blur" className="h-auto w-full" />
      </div>
      <div className="absolute bottom-2 left-0 w-[88%] -rotate-[4deg] overflow-hidden rounded-2xl border border-line-strong shadow-2xl shadow-black/40">
        <Image src={front.image} alt="" sizes="416px" placeholder="blur" className="h-auto w-full" />
      </div>
    </div>
  )
}
