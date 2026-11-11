import type { ViteUserConfig } from "vitest/config";
import { defineProjectTest } from "@sharadox/vitest-configuration-web-library/library-test";
import type { TestOptions } from "@sharadox/vitest-configuration-web-library/library-test/type";

/**
 * The Vitest configuration of a Next.js application (code in `src/`, React and browser APIs on). Route files in
 * `src/app/` are tested end to end with Playwright, so they are left out of unit coverage.
 *
 * @example
 * // vitest.config.ts
 * import { defineApplicationTest } from "@sharadox/vitest-configuration-web-library/application-test";
 * export default defineApplicationTest({ root: new URL("./", import.meta.url) });
 */
export function defineApplicationTest(options: TestOptions): ViteUserConfig {
  const configuration = defineProjectTest("src", { environment: "happy-dom", react: true, ...options });
  const coverage = configuration.test!.coverage as { exclude: string[] };
  coverage.exclude = [...coverage.exclude, "src/app/**"];
  return configuration;
}
