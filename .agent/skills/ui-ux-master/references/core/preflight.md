# Pre-Flight Check (mandatory)

Run before declaring UI work done. If any **critical** item fails, fix first.

---

## Process (critical)

- [ ] **Design read** one-liner stated (kind / audience / vibe / system)
- [ ] **Dials** explicit (V / M / D) reasoned from brief
- [ ] **Register** loaded: brand **or** product
- [ ] **Command ref** loaded if user invoked craft/audit/polish/…
- [ ] **Redesign mode** detected (greenfield / preserve / overhaul) when applicable
- [ ] Design-intelligence search used for new projects when Python available

---

## Visual consistency (critical)

- [ ] **Theme lock:** one light/dark/auto for the whole page
- [ ] **Color lock:** one accent used consistently
- [ ] **Shape lock:** one radius system (or documented multi-radius rule)
- [ ] No pure `#000` / `#fff` as default surfaces
- [ ] No default AI-purple mesh / cream-sand body unless brief owns it

---

## Typography & copy (critical)

- [ ] Body contrast ≥ 4.5:1; large text ≥ 3:1
- [ ] Body measure ~65–75ch for prose
- [ ] Display tracking ≥ −0.04em; hero clamp max ≤ 6rem
- [ ] **Zero em-dashes** (`—`) in visible strings
- [ ] Eyebrow count ≤ ceil(sections / 3)
- [ ] Copy self-audit: no broken grammar, no Elevate/Seamless/Unleash filler
- [ ] No generic names (John Doe, Acme) unless brief requires

---

## Layout (critical)

- [ ] Hero fits first viewport; CTA visible without scroll
- [ ] Hero top padding ≤ ~6rem desktop; max 4 text elements in hero
- [ ] Nav single line desktop; height ≤ 80px
- [ ] No 3 identical feature cards as default
- [ ] No 3+ zig-zag sections in a row
- [ ] Mobile collapse explicit for multi-column sections
- [ ] `min-h-[100dvh]` not `h-screen` for full-viewport sections
- [ ] Bento: N content items → N cells; some visual diversity in cells

---

## Interaction & a11y (critical)

- [ ] Full states: hover, focus, active, disabled, loading, empty, error
- [ ] Button text contrast AA on CTA backgrounds
- [ ] CTA labels single line at desktop; one label per intent
- [ ] Form: labels visible; errors inline; placeholders not labels
- [ ] Focus rings visible; keyboard path sane
- [ ] Touch targets ≥ 44×44 where applicable
- [ ] Icons from one library family; no emoji-as-icon

---

## Motion (critical when M &gt; 3)

- [ ] Every animation has a one-sentence purpose
- [ ] Only transform/opacity (or justified materials)
- [ ] `prefers-reduced-motion` honored
- [ ] No `window` scroll listeners
- [ ] If M &gt; 4, motion is actually present (or dial lowered)
- [ ] Marquee count ≤ 1

---

## Assets & code quality

- [ ] Real or generated images — no div fake screenshots
- [ ] Logo walls = logos only (real SVG / simpleicons / marks)
- [ ] Dependencies verified before import
- [ ] Complete code — no `// ... rest` placeholders
- [ ] Semantic HTML landmarks where relevant
- [ ] Z-index from a scale, not 9999
- [ ] One design system per project

---

## Product surfaces (extra)

- [ ] Fixed rem type scale (not fluid display heroes)
- [ ] Motion is state feedback, not page theater
- [ ] Consistent control vocabulary across screens
- [ ] Empty states teach next action

## Brand / marketing surfaces (extra)

- [ ] Imagery strategy (not text-only "minimalism")
- [ ] Named aesthetic reference (not generic modern)
- [ ] Category-reflex test passed (first + second order)

## Mobile / native (extra)

- [ ] Safe areas respected
- [ ] See also `references/intelligence/pro-rules.md`

---

## Severity

| Tier | Items | Rule |
|------|-------|------|
| Critical | Process, contrast, em-dash, theme/color lock, hero, a11y basics, complete code | Block ship |
| High | Motion, layout rhythm, assets, copy filler | Fix before ship if time |
| Polish | Optical 1px tweaks, extra delight | Optional |

If a critical box cannot be honestly ticked, the deliverable is not done.
