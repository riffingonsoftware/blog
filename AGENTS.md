# Riffing on Software

Astro static blog deployed to Cloudflare Pages.

## Commands

- `pnpm run build`: installs Chromium headless shell, checks Astro,
  generates OG images, builds, and runs Playwright tests.
- `pnpm run format:check`: checks formatting.
- `pnpm run typecheck`: checks Astro without building.

## Git

- Work directly on `trunk`.
- Make scoped, logical commits; commit and push early and often.
- Never force-push or rewrite shared history without approval.

## Issues

- Track work in GitHub Issues in `riffingonsoftware/blog`.
- Do not create `.issues/` files.
- Record blockers in the issue and close it when the work is complete.

## Implementation

- Understand the full flow and callers before changing code.
- Stop at the first working option: remove the need; reuse repo code,
  config, tooling, or workflow; use standard-library or native features;
  use an installed dependency; write small local code; only then add
  an abstraction, file, service, config surface, or dependency.
- Prefer fewer files and explicit, boring code.
- Work in reviewable vertical slices and simplify touched code.
  Follow local patterns only when sound and intentional.
- Fix root causes. Prefer correctness over the smallest patch;
  explain tradeoffs and rewrite bad structure in reviewable slices.

## Verification and safety

- Tests are executable acceptance criteria, not a design method.
  For agreed behavior or confirmed bugs, prefer one smallest scenario
  through a public interface or artifact boundary. Extend an existing
  scenario first; prove bugs before fixing when practical and retain
  the regression. Stop once broken and fixed behavior are distinguished.
- Otherwise use existing checks or focused manual verification.
- No unit-test-first TDD, private-mechanics tests, speculative cases,
  equivalent-branch tests, coverage targets, test-only APIs, or fixture
  scaffolding. Mock only system boundaries. Add BDD tooling only on request.
- Preserve security, trust-boundary validation, data-loss protection,
  accessibility, observability, and repo safeguards.
- Ask before adding dependencies. Evaluate maintenance, license, docs,
  security, and transitive dependencies before proposing one.
- Ask before risky or destructive changes.
- Run relevant checks before finishing.
