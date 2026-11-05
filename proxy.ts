import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server"

import { isLocale, localeCookie, negotiateLocale } from "@/lib/i18n"

export function proxy(request: NextRequest, event: NextFetchEvent) {
  event.waitUntil(report(request))

  // "/" sends visitors to /en or /es: the language they picked before, or else their browser's.
  if (request.nextUrl.pathname !== "/") return NextResponse.next()
  const saved = request.cookies.get(localeCookie)?.value
  const locale = isLocale(saved) ? saved : negotiateLocale(request.headers.get("accept-language"))
  return NextResponse.redirect(new URL(`/${locale}`, request.url))
}

/**
 * Tells Superveil about every page served, before any JavaScript runs, so scrapers, link previews
 * and tools that never load p.js are counted too. SUPERVEIL_KEY comes from the Superveil dashboard.
 */
function report(request: NextRequest) {
  return fetch("https://jimy-superveil.vercel.app/api/r", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.SUPERVEIL_KEY}` },
    body: JSON.stringify({
      s: "portfolio",
      p: request.nextUrl.pathname,
      ua: request.headers.get("user-agent") ?? "",
      dest: request.headers.get("sec-fetch-dest") ?? "",
    }),
  }).catch(() => {})
}

export const config = {
  // Pages only: not assets, images or the generated social cards.
  matcher: ["/((?!api|_next|.*opengraph-image|icon|apple-icon|.*\\..*).*)"],
}
