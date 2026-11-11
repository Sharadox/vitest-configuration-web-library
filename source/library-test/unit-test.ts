import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import { defineLibraryTest } from "@sharadox/vitest-configuration-web-library/library-test";

const root = new URL("./test-fixture/project/", import.meta.url);
const source = fileURLToPath(new URL("source/", root));

describe("defineLibraryTest", () => {
  test("resolves the package's own name to source/ and finds the tests", () => {
    const configuration = defineLibraryTest({ root });
    const [alias] = configuration.resolve!.alias as { find: RegExp; replacement: string }[];
    expect("@example/project/style/token".replace(alias!.find, alias!.replacement)).toBe(`${source}style/token`);
    expect(alias!.find.test("@example/project-other/x")).toBe(false);
    expect(configuration.test).toMatchObject({
      environment: "node",
      include: ["source/**/?(*-)unit-test.{ts,tsx}"],
      exclude: ["**/node_modules/**", "**/test-fixture/**"],
      benchmark: { include: ["source/**/?(*-)benchmark-test.{ts,tsx}"] },
    });
    expect(configuration.plugins).toEqual([]);
  });

  test("measures every source file and requires full coverage", () => {
    expect(defineLibraryTest({ root }).test!.coverage).toMatchObject({
      provider: "v8",
      include: ["source/**/*.{ts,tsx}"],
      thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
    });
    expect(defineLibraryTest({ root, coverage: { branches: 90 } }).test!.coverage).toMatchObject({
      thresholds: { statements: 100, branches: 90 },
    });
  });

  test("adds React, readable CSS module names and Sass imports from source/", () => {
    const configuration = defineLibraryTest({ root, environment: "happy-dom", react: true });
    expect(configuration.plugins!.length).toBeGreaterThan(0);
    expect(configuration.test).toMatchObject({
      environment: "happy-dom",
      css: { modules: { classNameStrategy: "non-scoped" } },
    });
    expect(configuration.css).toEqual({ preprocessorOptions: { scss: { loadPaths: [source] } } });
  });
});
