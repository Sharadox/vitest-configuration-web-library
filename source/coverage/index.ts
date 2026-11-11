/** Every coverage measure at 100%: Sharadox code is fully tested. */
export const FULL_COVERAGE = { statements: 100, branches: 100, functions: 100, lines: 100 } as const;

/** Files that are never measured: tests, type-only files, fixtures and command-line entry points. */
export const NOT_MEASURED = [
  "**/*unit-test.{ts,tsx}",
  "**/*benchmark-test.{ts,tsx}",
  "**/*end-to-end-test.{ts,tsx}",
  "**/type.ts",
  "**/test-fixture/**",
  "**/entry/**",
] as const;
