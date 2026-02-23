# Test-Driven Development (TDD)

All feature development and bug fixes **MUST** follow the Red-Green-Refactor cycle. This is a mandatory sequential process — do not skip or reorder steps.

## The Mandatory TDD Protocol

### 1. Red: Write ONE Failing Test
Write a single test for the next behavior you need. Do not write implementation code yet.
- **Evidence of Failure**: You **MUST** run the test and show the failing output in your terminal/logs before proceeding to Step 2.
- **Fail for the Right Reason**: Verify the test fails because the logic is missing, not because of a syntax error or missing import (unless the import is what you're "implementing").
- **Stop if it Passes**: If the test passes immediately, you must stop and investigate. Either the behavior exists, or the test is invalid.

### 2. Green: Make It Pass (Minimal Code)
Write the simplest implementation that makes the failing test pass.
- **No Over-Engineering**: Do not add "extra" logic, error handling, or optimizations not required by the current test.
- **Verify the Pass**: Run the tests. All tests (new and old) must be green.

### 3. Refactor: Clean Up Under Green
With all tests passing, improve the code structure.
- **Safety Net**: Your tests are your safety net. Run them after every small refactor.
- **Small Steps**: If a refactor breaks a test, undo and try a smaller step.

### 4. Repeat
Once the cycle is complete, move to the next behavior.

## Evidence & Verification

To prove you are following TDD, your execution trace should clearly show:
1. The creation of a test file/case.
2. A command execution showing that *specific* test failing.
3. The implementation of the code.
4. A command execution showing the test passing.

## Anti-Patterns (TDD Violations)

- **Test-Confirmed Development**: Writing the code first and then the test. This is a violation.
- **The "Big Bang"**: Writing multiple tests before any implementation.
- **Silent Failure**: Claiming a test failed without actually running it and showing the output.
- **Skipping Refactor**: Leaving messy "minimum code" in the codebase.

## When TDD Doesn't Apply
TDD is for **logic**. It does not apply to:
- Pure configuration (JSON/YAML/TOML)
- Dependency updates (e.g., updating a version in `package.json`)
- Documentation (Markdown files)
- CI/CD pipeline edits
- Pure UI layout/styling (CSS/HTML structure with no logic)

For these, manually verify and document your verification in the commit message.

## Bug Fixes: Regression-First
1. **Red**: Write a test that reproduces the bug. Show it failing.
2. **Green**: Fix the bug. Show the test passing.
3. **Refactor**: Clean up the fix area.
4. **Commit**: The test is now a permanent regression guard.

---
**Version**: 2026-02-22 | **Agent**: Gemini CLI (Gemini 2.0 Flash)
