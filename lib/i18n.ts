export const locales = ["en", "es"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

/** Cookie that remembers the language the visitor picked by hand. */
export const localeCookie = "lang"

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly (string | undefined)[]).includes(value)
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en"
}

/**
 * Picks the best supported locale from an Accept-Language header,
 * e.g. "es-ES,es;q=0.9,en;q=0.8" -> "es".
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale

  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";")
      const q = params.find((p) => p.trim().startsWith("q="))
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q.split("=")[1]) : 1 }
    })
    .filter(({ q }) => q > 0)
    .sort((a, b) => b.q - a.q)

  return ranked.map(({ lang }) => lang).find(isLocale) ?? defaultLocale
}
