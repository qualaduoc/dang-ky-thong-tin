# Unified Design Workflow

## Decision tree

```
User request
    │
    ├─ New UI / greenfield ──────────► Brief → Dials → Search DS → Register → Build → Preflight
    ├─ Redesign existing ────────────► redesign.md → Audit → Preserve/Overhaul → Fix priority
    ├─ Named command (craft/audit…) ─► references/commands/<cmd>.md
    ├─ Style/color/font question ────► scripts/search.py --domain …
    ├─ Stack how-to ─────────────────► search.py --stack <name>
    ├─ Aesthetic named (soft/mini…) ─► references/aesthetics/<name>.md
    └─ Review only ──────────────────► critique / audit + intelligence/ux
```

## Always order

1. **Brief inference** — one-line design read; one clarifying question only if truly ambiguous.
2. **Register** — brand vs product.
3. **Dials** — V / M / D.
4. **Context** — read existing tokens, components, PRODUCT.md / DESIGN.md if present.
5. **Intelligence** — design-system search for new work; domain search for gaps.
6. **Implement** — complete, production-ready code.
7. **Preflight** — `preflight.md`.

## Build priority (redesign upgrades)

1. Font swap  
2. Color cleanup  
3. Hover / active states  
4. Layout & spacing  
5. Replace generic components  
6. Loading / empty / error  
7. Type scale polish + motion  

## Stack defaults (when project doesn't prescribe)

| Surface | Default stack stance |
|---------|----------------------|
| Marketing site | React/Next + Tailwind v4 + Motion; or static HTML+Tailwind |
| Product SaaS | Existing DS if any; else shadcn/ui or Radix Themes |
| Enterprise mapped | Official DS (Fluent / Carbon / Material / Polaris / …) |
| Mobile | Platform HIG / Material; see pro-rules.md |

Never mix two full design systems in one tree.
