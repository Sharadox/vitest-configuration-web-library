# @sharadox/vitest-configuration-web-library

Shared [Vitest](https://vitest.dev) configurations for Sharadox libraries and Next.js applications. One line per project gives:

- **Self-imports:** imports of the package by its own name (`@scope/name/thing`) resolve to the TypeScript source in tests.
- **Test files:** `?(*-)unit-test.ts(x)` are tests and `?(*-)benchmark-test.ts(x)` are benchmarks; `test-fixture/` folders are skipped.
- **React (optional):** JSX through `@vitejs/plugin-react`, readable CSS-module class names, and Sass imports from the code folder.
- **Coverage:** V8 coverage with **100%** statements, branches, functions and lines required (lower one measure only if you must).

## Install

```sh
pnpm add -D vitest @vitest/coverage-v8 @sharadox/vitest-configuration-web-library
# browser-like tests:
pnpm add -D happy-dom
```

## Use

```ts
// vitest.config.ts (a library, code in source/)
import { defineLibraryTest } from "@sharadox/vitest-configuration-web-library/library-test";

export default defineLibraryTest({ root: new URL("./", import.meta.url) });
```

```ts
// vitest.config.ts (a React library)
export default defineLibraryTest({ root: new URL("./", import.meta.url), environment: "happy-dom", react: true });
```

```ts
// vitest.config.ts (a Next.js application, code in src/)
import { defineApplicationTest } from "@sharadox/vitest-configuration-web-library/application-test";

export default defineApplicationTest({ root: new URL("./", import.meta.url) });
```

Run with `vitest run --coverage` so the thresholds are enforced.

## API

| Import               | Export                               | Description                                                                                                  |
| -------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `…/library-test`     | `defineLibraryTest(options)`         | Library configuration, code in `source/`                                                                     |
| `…/library-test`     | `defineProjectTest(folder, options)` | The same for any code folder                                                                                 |
| `…/application-test` | `defineApplicationTest(options)`     | Next.js application: code in `src/`, `happy-dom` and React by default, `src/app/**` left to end-to-end tests |
| `…/package-name`     | `readPackageName(root)`              | The `name` in `<root>/package.json`                                                                          |
| `…/coverage`         | `FULL_COVERAGE`, `NOT_MEASURED`      | The thresholds, and the files never measured (tests, `type.ts`, fixtures, `entry/`)                          |

`options`:

- `root`: the project folder URL (required).
- `environment`: `"node"` or `"happy-dom"`.
- `react`: boolean.
- `coverage`: per-measure thresholds that override 100.

## Develop

`pnpm verify` runs formatting, lint, type-check, tests with 100% coverage and the build. Branches follow `<feature>.development` → `development` → `index`, and releases are `v<version>` tags on `index`.

## Licence

Licença Sharadox de Código Aberto, versão 0.1.0. See [português](LICENCA.md) (the binding text) and the [English translation](LICENSE.md).
