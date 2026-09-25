import { notFound } from "next/navigation"

import { getDictionary } from "@/content/dictionary"
import { getExperience } from "@/content/experience"
import { getProjects } from "@/content/projects"
import { contact, site } from "@/content/site"
import { SiteHeader } from "@/components/site-header"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"
import { Trajectory } from "@/components/sections/trajectory"
import { isLocale } from "@/lib/i18n"

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const dict = getDictionary(lang)
  const projects = getProjects(lang)

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: `${site.url}/${lang}`,
    jobTitle: dict.hero.eyebrow,
    sameAs: [contact.github, contact.linkedin],
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-fg px-5 py-3 font-medium text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {dict.nav.skip}
      </a>
      <SiteHeader locale={lang} nav={dict.nav} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero dict={dict} current={projects.filter((project) => project.featured)} />
        <Projects dict={dict} projects={projects} />
        <Trajectory dict={dict} experience={getExperience(lang)} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    </>
  )
}
