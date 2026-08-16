---
id: block.social.logo-wall
title: Logo wall under hero
category: social
surface: [landing, saas]
dials: { variance: [2, 6], motion: [1, 4], density: [3, 6] }
stack: [html, react, next, tailwind]
---

# Logo wall

## When
Social proof ngay **dưới** hero — không nhét trong hero.

## Rules
- Logo only (SVG / simpleicons). Không label ngành dưới logo.
- Heading plain: “Trusted by” / bỏ heading.

## Skeleton
```tsx
<section className="border-y border-zinc-200 py-10 dark:border-zinc-800">
  <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 opacity-70 grayscale">
    {/* Replace with real SVGs */}
    {["Northwind", "Globex", "Initech", "Umbrella", "Hooli"].map((n) => (
      <span key={n} className="text-sm font-semibold tracking-wide text-zinc-500">{n}</span>
    ))}
  </div>
</section>
```

## Anti-patterns
“Quietly trusted by” · text wordmarks giả làm logo khi có thể dùng SVG.
