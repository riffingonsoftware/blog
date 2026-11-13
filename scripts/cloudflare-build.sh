#!/bin/sh
# Cloudflare Pages reads Bun's version only from its BUN_VERSION setting,
# so run the Bun that package.json pins instead. npm 12 skips install scripts
# unless allowed, and the bun package needs its postinstall to fetch the binary.
set -eu
bun=$(node -p 'require("./package.json").packageManager')
npx --yes --allow-scripts=bun "$bun" install --frozen-lockfile
npx --yes --allow-scripts=bun "$bun" run build
