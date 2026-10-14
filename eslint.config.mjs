import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // .agents/ holds agent skills installed locally with `npx skills add`: third-party, not part of the site.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".agents/**"]),
])
