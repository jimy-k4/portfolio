import { NextResponse, type NextRequest } from "next/server"

import { isLocale, localeCookie, negotiateLocale } from "@/lib/i18n"

/** "/" sends visitors to /en or /es: the language they picked before, or else their browser's. */
export function proxy(request: NextRequest) {
  const saved = request.cookies.get(localeCookie)?.value
  const locale = isLocale(saved) ? saved : negotiateLocale(request.headers.get("accept-language"))
  return NextResponse.redirect(new URL(`/${locale}`, request.url))
}

export const config = {
  matcher: "/",
}
