---
name: ui-skills-root
description: Use before UI-related work to select the smallest useful UI Skills context from locally installed skills.
license: MIT
metadata:
  author: ibelick
  version: "1.0.0"
---

# UI Skills Root

You are the routing layer for UI Skills.

Use the locally installed skill descriptions and files. The managed UI Skills source is Bing72/ui-skills; configuration sync and UI routing do not authorize registry downloads or source updates.

Use it when an agent in Codex, Cursor, or Claude Code has a clear UI goal.

If the goal is unclear, ask one short question.

If the goal is clear, choose the right category, load the smallest useful skill context, then implement.

## Protocol

1. decide if the task is UI-related
2. if not, return `no skill needed`
3. identify the likely category
4. inspect locally installed skills for that category
5. select the smallest useful skill set
6. load only selected skill(s)
7. implement using that context

## Local context selection

Select from installed skills such as baseline-ui, fixing-accessibility, fixing-metadata, fixing-motion-performance, create-design-md and improve-ui. Read the selected local SKILL.md and only its relevant supporting files. Do not run npx/bunx to obtain a new CLI or skill body, and do not fetch the upstream registry as part of routing. A missing skill is unavailable until separately reviewed and installed.

For source updates, use the personal-source/manual-cherry-pick policy in `$HOME/agent-config-portable/UPDATE_POLICY.md` and `fork-sources.json`. An existing CLI or an example package command in another skill is not approval to download or execute a new package version. Prefer existing local tools; report any missing reviewed dependency before using it.

## Selection Rules

Prefer 1 skill.

Use 2 only when the task needs two clear angles.

Use 3 only for broad review, redesign, or multi-surface work.

Never use more than 3.

Route by topic, then stack, then specificity.

Prefer specific skills over broad skills.

Prefer framework-specific skills when the stack is obvious.

For quick cleanup, prefer the most specific craft, visual, or layout skill available.

If unsure, inspect categories and pick the safest narrow skill.
