# Architecture

## Dependency Management

> "A little copying is better than a little dependency." - Rob Pike

Before adding an external library or package for simple functionality (e.g., a single utility function, a basic data structure), prefer implementing it yourself. Avoid taking on a dependency for something that can be easily achieved with a small amount of local code. This reduces the project's dependency graph and keeps the codebase self-contained.
