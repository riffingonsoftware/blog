# Riffing on Software

Astro static blog deployed to Cloudflare Pages.

## Commands

- Dev: `aubr dev`
- Build: `aubr build`
- Format: `aubr format`
- Format check: `aubr format:check`
- Typecheck: `aubr typecheck`

## Git Workflow

- Use trunk-based development on `trunk`.
- Commit and push early and often in logical chunks.
- Keep each commit scoped to one coherent behavior, policy, or cleanup.
- Do not force-push or rewrite shared history unless explicitly asked.

## Issue Tracker

- Issues live in `.issues/<feature-slug>/NN-<slug>.md`, numbered from `01`,
  committed and pushed.
- First line of each issue: `Status: backlog`, `Status: claimed`, or `Status: ready`.
- An issue is blocked while any file listed under its `## Blocked by` still exists.
- Done is a deletion: delete the issue file in the commit that completes the work.
  Git history is the archive.

## Rules

- For confirmed bugs, capture the failure with a behavior-level repro test when practical, then fix it and keep the test as regression coverage.
- Do not write speculative tests for planned behavior, predicted risk, implementation details, coverage targets, or test-count goals.
- Delete low-signal tests when they obscure behavior, lock in implementation details, or no longer protect a real failure.
- For non-bug changes, use existing checks and focused manual verification unless the user explicitly asks for tests.
- Test only observable behavior through public interfaces; never private internals.
- Mock only system boundaries.
- Refactor after behavior is verified; simplify touched code without changing behavior.
- Ask before adding dependencies.
- Rob Pike: "A little copying is better than a little dependency."
- Prefer stdlib, existing helpers, or small local code over new packages.
- Before proposing a dependency, check maintenance, license, docs, security, and transitive deps.
- Follow existing patterns only when they are sound and intentional.
- Challenge unsound, accidental, or undocumented local patterns.
- Prefer the correct fix over the smallest patch; perform rewrites when local structure is the problem.
- Ask before risky or destructive changes.
- Run relevant checks before finishing.
