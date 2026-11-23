# Changelog

What changed in each version of `@sharadox/vitest-configuration-web-library`, newest first.

## 0.2.1

happy-dom projects get a setup file (browser-animation): a cancelled animation's finished promise rejects as handled, as in browsers, so motion 14 (which animates natively) doesn't fail tests with unhandled rejections.

## 0.2.0

style-web-library's Sass helpers (`style-helper`) are on the Sass load path, so `@use "style-helper"` works in every library, test and site.
