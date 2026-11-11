export interface TestOptions {
  /** The project folder: pass `new URL("./", import.meta.url)` from vitest.config.ts. */
  root: URL | string;
  /** Where tests run: "node" (default) or "happy-dom" (browser APIs for components). */
  environment?: "node" | "happy-dom";
  /** Compile JSX with React and give CSS modules readable class names. */
  react?: boolean;
  /** Required coverage per measure; 100 by default. */
  coverage?: Partial<Record<"statements" | "branches" | "functions" | "lines", number>>;
}
