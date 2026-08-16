# UI/UX Master — Multi-Agent Runtime

## Layout inside Antigravity kit

```text
.agent/
├── skills/ui-ux-master/     # SKILL.md + references (+ local data/scripts fallback)
├── .shared/ui-ux-master/    # Canonical search data + Python engine
├── workflows/ui-ux-master.md
├── agents/frontend-specialist.md   # wires this skill
└── rules/                          # project rules ALWAYS win
```

## Path contract

1. Prefer: `python .agent/.shared/ui-ux-master/scripts/search.py ...` from **project root**
2. Fallback: `python <skill-dir>/scripts/search.py ...` (skill ships its own `data/`)
3. Never assume global npm package; Python 3 stdlib only

## Behavior with project rules

- If `.agent/rules/*` defines language, persona, commit notes, deploy lists — **obey those first**
- This skill adds UI craft; it does not replace always-on rules
- Communicate in the language the project rules require

## Slash / invoke

`/ui-ux-master` · `/design` · natural language UI requests · commands: craft, audit, polish, redesign

## Quality bar (UI)

Ship only after `references/core/preflight.md`. Zero em-dashes in UI copy. No AI-slop tells in `anti-slop.md`.
