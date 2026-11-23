import { expect, test } from "vitest";

test("does nothing where there are no animations (a file that runs in node inside a browser-like project)", async () => {
  expect("Animation" in globalThis).toBe(false);
  await expect(import("@sharadox/vitest-configuration-web-library/browser-animation")).resolves.toBeDefined();
});
