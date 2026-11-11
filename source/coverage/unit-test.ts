import { expect, test } from "vitest";
import { FULL_COVERAGE, NOT_MEASURED } from "@sharadox/vitest-configuration-web-library/coverage";

test("requires full coverage and skips tests, types, fixtures and entry points", () => {
  expect(FULL_COVERAGE).toEqual({ statements: 100, branches: 100, functions: 100, lines: 100 });
  expect(NOT_MEASURED).toEqual(expect.arrayContaining(["**/type.ts", "**/test-fixture/**", "**/entry/**"]));
});
