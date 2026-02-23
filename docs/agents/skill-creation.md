# Skill Creation Protocol

Capturing procedural knowledge is a **CRITICAL** responsibility. You MUST proactively identify and suggest the creation of a "Skill" whenever you perform a task that is likely to be repeated.

## Mandatory Skill Evaluation

Before concluding any task, you **MUST** evaluate the work against these High-Signal Triggers. If any match, you are required to suggest a skill to the user.

### High-Signal Triggers
1.  **The "Tribal Knowledge" Trigger**: You had to "discover" a non-obvious dependency, configuration, or sequence that wasn't explicitly documented.
2.  **The "Multi-Step" Trigger**: The task required 3+ distinct steps/tools.
3.  **The "Debugging Pattern" Trigger**: You fixed a bug with a non-obvious root cause.
4.  **The "Boilerplate" Trigger**: You created a file or structure that follows a repeatable pattern.

## Skill Format

Create each skill as a `SKILL.md` file with YAML frontmatter:

- **`name`**: Identifier for the skill.
- **`description`**: When this skill should be used.
- **`usage_count`**: Starts at `0`.
- **`last_used`**: Starts as `never`.

The body contains procedural instructions, references, and context.

## Proposing a Skill

Do not create a skill silently. You **MUST** propose it to the user with a brief explanation of the trigger and the value it provides.

## Usage Tracking (Mandatory)

Each time a skill is invoked, update its frontmatter: increment `usage_count` and set `last_used` to the current timestamp.

---
**Version**: 2026-02-22 | **Agent**: Gemini CLI (Gemini 2.0 Flash)
