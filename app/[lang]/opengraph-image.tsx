import { ImageResponse } from "next/og"

import { getDictionary } from "@/content/dictionary"
import { isLocale, locales } from "@/lib/i18n"

export const alt = "Juan Llinares"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const { hero } = getDictionary(isLocale(lang) ? lang : "en")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#f3f3f5",
          backgroundColor: "#0b0c0e",
          backgroundImage: "radial-gradient(circle at 12% 0%, rgba(197, 242, 74, 0.28), rgba(11, 12, 14, 0) 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, textTransform: "uppercase", color: "#a3a3ad" }}>
          {hero.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 168,
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: -8,
          }}
        >
          <div style={{ display: "flex" }}>Juan</div>
          <div style={{ display: "flex" }}>
            Llinares<span style={{ color: "#c5f24a" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a3a3ad" }}>Gym.y · Bruto · jimy-portfolio.vercel.app</div>
      </div>
    ),
    size,
  )
}
