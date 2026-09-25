# Juan Llinares · Portfolio

My personal site: projects, professional trajectory and contact, in English and Spanish.

**Live:** [jimy-portfolio.vercel.app](https://jimy-portfolio.vercel.app/)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static generation, `proxy.ts` for the language redirect)
- React 19 and TypeScript
- [Tailwind CSS 4](https://tailwindcss.com), with the design tokens in `app/globals.css`
- Geist, Geist Mono and Instrument Serif through `next/font`
- Deployed on Vercel

## Features

- **Two languages with their own URLs.** `/en` and `/es` are prerendered pages. `/` redirects to the
  language picked last time (a `lang` cookie) or, the first time, to the browser's language.
- **Light and dark** following the system setting. Every text colour keeps at least 4.5:1 contrast.
- **Accessible by default:** skip link, visible focus, 44 px touch targets, `lang` on every page and
  link, screen-reader hints for links that open a new tab, and animations only when the visitor
  has not asked for reduced motion.
- **SEO:** per-language metadata with `hreflang` alternates, a generated Open Graph image, sitemap,
  robots.txt and schema.org `Person` data.

## Development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Editing the content

Everything visible lives in `content/`, separate from the components:

| File                    | What it holds                                                    |
| ----------------------- | ---------------------------------------------------------------- |
| `content/projects.ts`   | Projects: links, tech, year, image and the text in each language |
| `content/experience.ts` | Jobs. `show: false` hides one without deleting it                |
| `content/dictionary.ts` | Interface text (navigation, headings, buttons)                   |
| `content/site.ts`       | Site URL and contact links                                       |

To add a project, drop a 16:10 screenshot in `assets/projects/` (WebP around 1600 px wide) and add
an entry to `content/projects.ts`. Projects with `featured: true` get the large cards and appear
under _Now building_ in the hero.

## Project structure

```
app/
  [lang]/            layout, page and Open Graph image for /en and /es
  globals.css        design tokens (colours, fonts) and animations
  icon.svg, robots.ts, sitemap.ts
assets/projects/     project screenshots
components/          header, project card, copy button, icons
  sections/          hero, projects, trajectory, contact, footer
content/             all the text and data
lib/i18n.ts          locales and Accept-Language negotiation
proxy.ts             redirects / to the right language
```
