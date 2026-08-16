# Anti-Slop — Forbidden AI Design Tells

If someone can say "AI made that" without hesitation, the work failed. Match-and-refuse: rewrite structure, do not ship.

Merged from Taste Skill + Impeccable absolute bans + production-tested tells.

---

## A. Structure & layout

| Ban | Why | Do instead |
|-----|-----|------------|
| Identical 3-column icon+heading+text cards | #1 SaaS template | Asymmetric grid, zig-zag (max 2), bento with rhythm |
| Nested cards | Lazy hierarchy | Spacing, dividers, one elevation level |
| Side-stripe accent (`border-left` &gt; 1px color) | AI callout cliché | Full border, tint bg, leading icon/number |
| Hero-metric (big # + tiny label + gradient) | SaaS poster | Real product story / imagery |
| Split-header as default (big H left + filler para right) | Templated section head | Vertical stack: headline then body ≤65ch |
| 3+ consecutive image/text zig-zags | Rhythm death | Break with full-bleed, bento, marquee (max 1) |
| Section layout family repeated | Template smell | ≥4 layout families across 8 sections |
| Empty bento cells | Grid planned wrong | N items → N cells |
| Hero overflow (CTA below fold) | Broken first paint | Headline ≤2 lines, sub ≤20 words, CTA in viewport |
| Nav wrapping to 2 lines at desktop | Broken chrome | Condense labels; height ≤80px |
| `h-screen` heroes | iOS jump | `min-h-[100dvh]` |

---

## B. Typography & labels

| Ban | Do instead |
|-----|------------|
| Eyebrow on every section | Max ~1 per 3 sections; often drop entirely |
| Numbered markers `01 · About` as default | Only when order is real sequence |
| Em-dash `—` or en-dash `–` as design/copy | Hyphen `-` only |
| Gradient text | Solid color; weight/size for emphasis |
| Inter / Fraunces / Instrument Serif as reflex | Geist, Satoshi, Cabinet, Outfit, or brief-named fonts |
| Display tracking tighter than −0.04em | −0.02 to −0.03em typical |
| Hero display &gt; 6rem clamp max | Ceiling 6rem |
| Mixed-family emphasis in one headline | Italic/bold of same family |
| Section-number eyebrows / `Scroll · 001` | Plain language or nothing |
| Middle-dot spam (`a · b · c · d`) | Max 1 per meta line; prefer columns/hairlines |

---

## C. Color & surface

| Ban | Do instead |
|-----|------------|
| AI purple/blue glow mesh default | Neutral base + one intentional accent |
| Cream/sand/beige body default 2026 | Brand-saturated body, true off-white, or tinted brand neutral |
| Pure `#000` / `#fff` | Off-black / off-white |
| Warm-beige + brass + espresso as premium-consumer default | Rotate: cold luxury, forest, cobalt+cream, monochrome+pop |
| Glassmorphism as decoration | Rare, purposeful, with solid fallback |
| Ghost card: 1px border + soft wide shadow | Pick border **or** tight shadow (blur ≤8px) |
| Cards radius 32px+ | Cards 12–16px; pills only for tags/buttons |
| Section theme flip mid-page | One page theme lock |
| Multi-accent chaos | One accent locked project-wide |

---

## D. Motion & interaction

| Ban | Do instead |
|-----|------------|
| Uniform fade-in on every section | Reveal fits the content; vary or omit |
| Image scale on hover (esp. via parent group) | Animate card bg/border/shadow |
| `window.addEventListener('scroll')` | Motion `useScroll`, ScrollTrigger, IO, CSS timeline |
| Animate width/height/top/left | transform + opacity |
| Motion with no purpose | Hierarchy / story / feedback / state only |
| Multiple marquees | Max one per page |
| Claimed high motion but static page | Ship motion or lower dial |

---

## E. Content & copy

| Ban | Do instead |
|-----|------------|
| John Doe / Acme / Nexus / SmartFlow | Locale-real names, contextual brands |
| Elevate / Seamless / Unleash / Next-Gen / Revolutionize | Concrete verbs |
| Fake-perfect stats (`99.99%`) without source | Organic numbers or label as mock |
| "Quietly trusted by" / craftsman micro-meta | Plain "Trusted by" or none |
| Version stamps in marketing hero | Only for real launch briefs |
| Locale/weather strips as decoration | Only place-focused briefs |
| Scroll cues ("Scroll to explore") | Trust the user |
| Decorative status dots everywhere | Only real semantic state |
| Pills overlaid on stock photos | Caption below or none |
| Div fake product UI / fake terminal | Real shot, gen image, or skip |
| Duplicate CTA intent labels | One label per intent |

---

## F. Category-reflex test (two altitudes)

1. **First-order:** Could someone guess theme+palette from category alone? If yes, rework.
2. **Second-order:** Could they guess aesthetic family from category + anti-references? If yes, rework again.

Brand surfaces need a named reference lane (not "generic modern SaaS"). Product surfaces need category familiarity without novelty for its own sake.

---

## G. Em-dash ban (non-negotiable)

Character `—` is forbidden in all visible UI strings: headlines, eyebrows, body, quotes, buttons, captions, alt text. Use period, comma, colon, parentheses, or hyphen `-`. Date/number ranges use hyphen.

---

## H. Codex-prone extras

- Sketchy / doodle SVG as illustration fallback → no illustration
- Stripe `repeating-linear-gradient` body decoration → remove
- Decorative CSS grid overlay backgrounds (unless blueprint tool) → remove
- Meta-irony copy ("not another X…") → make the claim directly
