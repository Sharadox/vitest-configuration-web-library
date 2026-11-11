import { readFileSync } from "node:fs";

/**
 * Reads the `name` field of the package.json in a project folder (a `file:` URL, such as `import.meta.url` of a
 * file in that folder, or a folder URL ending in `/`).
 *
 * @example
 * readPackageName(new URL("./", import.meta.url)); // "@sharadox/web-library"
 */
export function readPackageName(root: URL | string): string {
  const { name } = JSON.parse(readFileSync(new URL("package.json", root), "utf8")) as { name?: unknown };
  if (typeof name !== "string" || !name) throw new Error(`package.json in ${root} has no name`);
  return name;
}
