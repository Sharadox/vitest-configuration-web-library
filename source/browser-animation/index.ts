/**
 * A Vitest setup file for browser-like tests (happy-dom): a cancelled animation's `finished` promise still rejects,
 * but as handled, as the Web Animations standard has browsers do. Without it, every animation motion stops (it
 * cancels them all the time) is an "unhandled rejection" that fails the run, though nothing is wrong.
 * `defineLibraryTest` and `defineApplicationTest` add it to every "happy-dom" project.
 *
 * @example
 * // vitest.config.ts (only when not using defineLibraryTest)
 * test: { setupFiles: ["@sharadox/vitest-configuration-web-library/browser-animation"] }
 */
/** The part of the Web Animations `Animation` used here (this library builds without the DOM's types). */
interface Animation {
  finished: Promise<unknown>;
  cancel(): void;
}
// A file that runs in node inside a browser-like project has no animations: nothing to do.
const prototype = (globalThis as unknown as { Animation?: { prototype: Animation } }).Animation?.prototype;
if (prototype) {
  const cancel = prototype.cancel;
  prototype.cancel = function (this: Animation) {
    this.finished.catch(() => {});
    cancel.call(this);
  };
}
