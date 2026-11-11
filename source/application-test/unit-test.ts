import { expect, test } from "vitest";
import { defineApplicationTest } from "@sharadox/vitest-configuration-web-library/application-test";

const root = new URL("../library-test/test-fixture/project/", import.meta.url);

test("tests src/ with React in a browser-like environment, leaving route files to Playwright", () => {
  const configuration = defineApplicationTest({ root });
  expect(configuration.test).toMatchObject({ environment: "happy-dom", include: ["src/**/?(*-)unit-test.{ts,tsx}"] });
  expect((configuration.test!.coverage as { exclude: string[] }).exclude).toContain("src/app/**");
  expect(configuration.plugins!.length).toBeGreaterThan(0);
});

test("lets the application change the environment", () => {
  expect(defineApplicationTest({ root, environment: "node" }).test!.environment).toBe("node");
});
