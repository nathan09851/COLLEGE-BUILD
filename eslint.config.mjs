import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Config files
    "jest.config.js",
    "jest.setup.js",
    "lighthouserc.js",
    "playwright.config.ts",
  ]),
  {
    rules: {
      // Allow <img> elements since images come from Supabase dynamic URLs
      "@next/next/no-img-element": "warn",
    },
  },
]);

export default eslintConfig;
