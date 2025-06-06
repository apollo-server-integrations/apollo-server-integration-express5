# @as-integrations/express5

## 1.1.0-alpha.0

### Minor Changes

- [#17](https://github.com/apollo-server-integrations/apollo-server-integration-express5/pull/17) [`94ea6bc`](https://github.com/apollo-server-integrations/apollo-server-integration-express5/commit/94ea6bc12aa20c583da15f440d3059ecd3c946a1) Thanks [@glasser](https://github.com/glasser)! - The package is now built for both CJS and ESM, instead of only for CJS; this is the same build approach taken by `@apollo/server`. This provides better compatibility with ESM-based build systems.

## 1.0.0

### Major Changes

Initial release.

Based on `@apollo/server/express4`, updated for Express v5.

The check to see if you forgot to install the JSON body parser now works with `body-parser` v2 (and thus `express.json()` in Express v5) as well as with the older version.

The middleware is now written as an async function, as supported in Express v5.
