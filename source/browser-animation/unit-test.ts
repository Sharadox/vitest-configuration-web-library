/// <reference lib="dom" />
// @vitest-environment happy-dom
import { expect, test } from "vitest";
import "@sharadox/vitest-configuration-web-library/browser-animation";

test("a cancelled animation's finished promise rejects, handled, as in browsers (motion cancels them all the time)", async () => {
  const unhandled: unknown[] = [];
  const collect = (reason: unknown) => unhandled.push(reason);
  process.on("unhandledRejection", collect);
  const element = document.createElement("div");
  document.body.append(element);
  const animation = element.animate([{ opacity: 0 }, { opacity: 1 }], 1000);
  animation.cancel();
  await new Promise((resolve) => setTimeout(resolve, 20));
  process.off("unhandledRejection", collect);
  expect(unhandled).toEqual([]);
  // Whoever waits for it still learns it was cancelled.
  await expect(animation.finished).rejects.toThrow("canceled");
});
