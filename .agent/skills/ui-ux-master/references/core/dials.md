# Three Design Dials

Global configuration after the design-read one-liner. Every layout, motion, and density decision is gated by these. Variable names are exact — do not invent aliases.

| Dial | Range | Meaning |
|------|-------|---------|
| `DESIGN_VARIANCE` | 1–10 | 1 = perfect symmetry · 10 = artsy chaos |
| `MOTION_INTENSITY` | 1–10 | 1 = static · 10 = cinematic / physics |
| `VISUAL_DENSITY` | 1–10 | 1 = art gallery · 10 = cockpit / packed data |

Baseline for marketing: **8 / 6 / 4**. Override from the brief — never ask the user to edit this file.

---

## Inference from brief signals

| Signal | VARIANCE | MOTION | DENSITY |
|--------|----------|--------|---------|
| minimalist / clean / calm / Linear-style | 5–6 | 3–4 | 2–3 |
| premium consumer / Apple-y / luxury | 7–8 | 5–7 | 3–4 |
| playful / Awwwards / experimental / agency | 9–10 | 8–10 | 3–4 |
| landing / portfolio / marketing (default) | 7–9 | 6–8 | 3–5 |
| trust-first / public-sector / regulated | 3–4 | 2–3 | 4–5 |
| dashboard / admin / data tool | 2–4 | 2–4 | 7–9 |
| redesign — preserve | match existing | +1 | match |
| redesign — overhaul | +2 | +2 | match |

---

## Use-case presets

| Use case | V | M | D |
|----------|---|---|---|
| Landing (SaaS mainstream) | 7 | 6 | 4 |
| Landing (agency / creative) | 9 | 8 | 3 |
| Landing (premium consumer) | 7 | 6 | 3 |
| Portfolio (designer) | 8 | 7 | 3 |
| Portfolio (developer) | 6 | 5 | 4 |
| Editorial / blog | 6 | 4 | 3 |
| Product dashboard | 3 | 3 | 8 |
| Public-sector service | 3 | 2 | 5 |
| Soft / high-end agency feel | 7 | 7 | 3 |
| Minimalist utilitiarian | 5 | 3 | 2 |
| Brutalist / industrial | 8 | 2 | 6 |

---

## Technical bands

### DESIGN_VARIANCE
- **1–3:** Symmetrical grid, equal paddings, centered.
- **4–7:** Overlaps, mixed aspect ratios, left headers over mixed content.
- **8–10:** Masonry, fractional tracks (`2fr 1fr 1fr`), large empty zones.
- **Mobile:** levels 4–10 collapse to single column below 768px.

### MOTION_INTENSITY
- **1–3:** CSS `:hover` / `:active` only.
- **4–7:** 0.3s cubic-bezier reveals, stagger, transform/opacity.
- **8–10:** ScrollTrigger / scroll-driven animation / Motion hooks. No `window.onscroll`.

If intensity &gt; 4, the page **must actually move**. If you cannot ship working motion, drop dial to ≤3.

### VISUAL_DENSITY
- **1–3:** Huge section gaps (`py-32`–`py-48`).
- **4–7:** Standard app (`py-16`–`py-24`).
- **8–10:** Tight paddings; prefer lines over card boxes; mono for numbers.

---

## Coupling with design-system search

```bash
python "<SKILL_DIR>/scripts/search.py" "<query>" --design-system \
  --variance <V> --motion <M> --density <D> -p "Project"
```

- `--motion` attaches a GSAP tier snippet from `data/motion.csv`.
- `--density` overrides spacing token table in MASTER.md output.
