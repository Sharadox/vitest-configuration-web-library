import { expect, test } from "vitest";
import { readPackageName } from "@sharadox/vitest-configuration-web-library/package-name";

const fixture = (name: string) => new URL(`../library-test/test-fixture/${name}/`, import.meta.url);

test("reads the package name", () => {
  expect(readPackageName(fixture("project"))).toBe("@example/project");
  expect(readPackageName(fixture("project").href)).toBe("@example/project");
});

test("fails clearly without a name", () => {
  expect(() => readPackageName(fixture("nameless"))).toThrow("has no name");
});
