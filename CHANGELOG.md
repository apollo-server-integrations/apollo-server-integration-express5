# @as-integrations/express5

## 2.0.0-alpha.1

### Patch Changes

- [#14](https://github.com/apollo-server-integrations/apollo-server-integration-express5/pull/14) [`fa9111b`](https://github.com/apollo-server-integrations/apollo-server-integration-express5/commit/fa9111b7930831c3d09baad53490baf9e65f7ac4) Thanks [@glasser](https://github.com/glasser)! - Make more compatible with CJS TS apps

## 2.0.0-alpha.0

### Major Changes

- [#11](https://github.com/apollo-server-integrations/apollo-server-integration-express5/pull/11) [`d52e670`](https://github.com/apollo-server-integrations/apollo-server-integration-express5/commit/d52e67004b117ab0df949eb0308535a715a09d2d) Thanks [@glasser](https://github.com/glasser)! - Publish as ESM-only, and require Node v20.19 (which enables require(esm) support by default).

## 1.0.0

### Major Changes

Initial release.

Based on `@apollo/server/express4`, updated for Express v5.

The check to see if you forgot to install the JSON body parser now works with `body-parser` v2 (and thus `express.json()` in Express v5) as well as with the older version.

The middleware is now written as an async function, as supported in Express v5.
