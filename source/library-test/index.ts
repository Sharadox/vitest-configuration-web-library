import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import type { ViteUserConfig } from "vitest/config";
import { FULL_COVERAGE, NOT_MEASURED } from "@sharadox/vitest-configuration-web-library/coverage";
import { readPackageName } from "@sharadox/vitest-configuration-web-library/package-name";
import type { TestOptions } from "@sharadox/vitest-configuration-web-library/library-test/type";

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

/**
 * Builds the Vitest configuration of a project whose code lives in `folder` (`source` for libraries, `src` for
 * Next.js applications): imports of the package by its own name resolve to that folder, `?(*-)unit-test.ts(x)` and
 * `?(*-)benchmark-test.ts(x)` files are tests, fixtures are skipped, and coverage must reach the thresholds.
 */
export function defineProjectTest(
  folder: string,
  { root, environment = "node", react: withReact = false, coverage }: TestOptions,
): ViteUserConfig {
  const name = readPackageName(root);
  const code = fileURLToPath(new URL(`${folder}/`, root));
  return {
    plugins: withReact ? [react()] : [],
    // Only the package's own imports resolve to its source; dependencies keep their published builds.
    resolve: { alias: [{ find: new RegExp(`^${escape(name)}/(.*)$`), replacement: `${code}$1` }] },
    css: { preprocessorOptions: { scss: { loadPaths: [code] } } },
    test: {
      environment,
      ...(withReact ? { css: { modules: { classNameStrategy: "non-scoped" as const } } } : {}),
      include: [`${folder}/**/?(*-)unit-test.{ts,tsx}`],
      exclude: ["**/node_modules/**", "**/test-fixture/**"],
      benchmark: { include: [`${folder}/**/?(*-)benchmark-test.{ts,tsx}`] },
      coverage: {
        provider: "v8",
        include: [`${folder}/**/*.{ts,tsx}`],
        exclude: [...NOT_MEASURED],
        thresholds: { ...FULL_COVERAGE, ...coverage },
      },
    },
  };
}

/**
 * The Vitest configuration of a library (code in `source/`).
 *
 * @example
 * // vitest.config.ts
 * import { defineLibraryTest } from "@sharadox/vitest-configuration-web-library/library-test";
 * export default defineLibraryTest({ root: new URL("./", import.meta.url), environment: "happy-dom", react: true });
 */
export function defineLibraryTest(options: TestOptions): ViteUserConfig {
  return defineProjectTest("source", options);
}
