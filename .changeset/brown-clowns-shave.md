---
'@as-integrations/express5': major
---

Initial release.

Based on `@apollo/server/express4`, updated for Express v5.

The check to see if you forgot to install the JSON body parser now works with `body-parser` v2 (and thus `express.json()` in Express v5) as well as with the older version.

The middleware is now written as an async function, as supported in Express v5.
