"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import type { Dictionary } from "@/content/dictionary"
import { localeCookie, otherLocale, type Locale } from "@/lib/i18n"

type Props = {
  locale: Locale
  nav: Dictionary["nav"]
}

export function SiteHeader({ locale, nav }: Props) {
  const [active, setActive] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const links = [
    { id: "projects", label: nav.work },
    { id: "trajectory", label: nav.experience },
    { id: "contact", label: nav.contact },
  ]

  // Highlight the section that crosses the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    for (const id of ["top", "projects", "trajectory", "contact"]) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    const closeOnOutsideTap = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    window.addEventListener("pointerdown", closeOnOutsideTap)
    return () => {
      window.removeEventListener("keydown", closeOnEscape)
      window.removeEventListener("pointerdown", closeOnOutsideTap)
    }
  }, [menuOpen])

  const other = otherLocale(locale)
  const rememberLocale = () => {
    document.cookie = `${localeCookie}=${other}; path=/; max-age=31536000; samesite=lax`
  }

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-line bg-bg/75 py-1.5 pr-1.5 pl-1.5 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl sm:pl-2">
        <a href="#top" className="flex min-h-11 items-center gap-2.5 rounded-full pr-3 text-sm font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full bg-fg text-[13px] font-bold tracking-[-0.04em] text-bg"
          >
            JL
          </span>
          <span className="sr-only sm:not-sr-only">Juan Llinares</span>
          <span className="sr-only">, {nav.backToTop}</span>
        </a>

        <nav aria-label={nav.label} className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  className="relative flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-muted transition-colors hover:text-fg aria-[current]:bg-surface aria-[current]:text-fg"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={`/${other}`}
            hrefLang={other}
            onClick={rememberLocale}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line px-3 font-mono text-xs font-medium tracking-wider text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <span lang={other}>{other.toUpperCase()}</span>
            <span className="sr-only" lang={other}>
              , {nav.switchLabel}
            </span>
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-full text-fg transition-colors hover:bg-surface sm:hidden"
          >
            {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            <span className="sr-only">{menuOpen ? nav.closeMenu : nav.openMenu}</span>
          </button>
        </div>

        <nav
          id="mobile-menu"
          hidden={!menuOpen}
          aria-label={nav.label}
          className="absolute inset-x-0 top-full mt-2 rounded-3xl border border-line bg-bg/95 p-2 shadow-xl backdrop-blur-xl sm:hidden"
        >
          <ul>
            {links.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === id ? "location" : undefined}
                  className="flex min-h-12 items-center rounded-2xl px-4 text-lg font-medium text-muted transition-colors hover:bg-surface hover:text-fg aria-[current]:text-fg"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
