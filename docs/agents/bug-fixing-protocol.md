# Bug Fixing Protocol

When fixing a bug, follow this test-driven sequence:

## 1. Reproduce First

Write a failing unit test that demonstrates the bug before writing any fix code.

The test should:

- **Isolate the bug**: Test only the broken behavior, not unrelated functionality
- **Be minimal**: Use the simplest possible input that triggers the bug
- **Have a descriptive name**: Clearly indicate what's broken (e.g., `test_parse_date_fails_on_leap_year_edge_case`)
- **Assert the expected behavior**: What _should_ happen, not what currently happens

## 2. Verify the Test Fails

Run the test to confirm it surfaces the bad behavior. If the test passes, either:

- The bug isn't what you thought it was
- The test doesn't actually cover the bug
- The bug was already fixed

Do not proceed until you have a failing test.

## 3. Fix the Bug

Make the minimal change needed to fix the issue. Resist the urge to refactor nearby code, add features, or "improve" things beyond the scope of the bug.

## 4. Verify the Test Passes

Run the test again. It should now pass. If it doesn't, iterate on the fix.

## 5. Keep the Test

This test now serves as a regression guard. It documents the bug and prevents it from being reintroduced.

## When Unit Tests Aren't Practical

Some bugs live in areas that are hard to unit test:

- Infrastructure/configuration issues
- Complex UI interactions
- Race conditions that are timing-dependent
- Third-party integration failures

In these cases:

1. Document why a unit test isn't practical
2. Consider an integration test or end-to-end test instead
3. If no automated test is possible, document manual verification steps
4. Proceed with the fix, but note the testing gap in the commit message
