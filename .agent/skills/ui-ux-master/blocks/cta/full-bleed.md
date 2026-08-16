---
id: block.cta.full-bleed
title: Full-bleed CTA band
category: cta
surface: [landing, marketing]
dials: { variance: [4, 8], motion: [2, 6], density: [2, 5] }
stack: [html, react, next, tailwind]
---

# Full-bleed CTA band

## When
Cuối funnel marketing: 1 message + 1 primary CTA. Một intent label toàn page.

## Skeleton
```tsx
<section className="bg-zinc-900 px-4 py-20 text-white dark:bg-zinc-100 dark:text-zinc-900">
  <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
    <div>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Ready when you are</h2>
      <p className="mt-3 max-w-md text-zinc-300 dark:text-zinc-600">Start free. Upgrade when the team grows.</p>
    </div>
    <a href="/signup" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-zinc-900 dark:bg-zinc-900 dark:text-white">
      Start free
    </a>
  </div>
</section>
```

## Anti-patterns
2 CTA cùng intent khác label · em-dash trong headline.
