import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { notFound } from "next/navigation"

import { getDictionary } from "@/content/dictionary"
import { site } from "@/content/site"
import { isLocale, locales } from "@/lib/i18n"
import "../globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
})

// Only /en and /es exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const { meta } = getDictionary(lang)

  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}`,
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      locale: lang === "es" ? "es_ES" : "en_US",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
  ],
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
