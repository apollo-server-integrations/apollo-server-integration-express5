# @as-integrations/express5

## 1.0.0

### Major Changes

- [#6](https://github.com/apollo-server-integrations/apollo-server-integration-express5/pull/6) [`0d6ea3f`](https://github.com/apollo-server-integrations/apollo-server-integration-express5/commit/0d6ea3f497e3e24df64420f7fb2a320ba86bf8a8) Thanks [@glasser](https://github.com/glasser)! - Initial release.

  Based on `@apollo/server/express4`, updated for Express v5.

  The check to see if you forgot to install the JSON body parser now works with `body-parser` v2 (and thus `express.json()` in Express v5) as well as with the older version.

  The middleware is now written as an async function, as supported in Express v5.
