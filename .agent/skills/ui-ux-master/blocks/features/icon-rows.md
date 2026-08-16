---
id: block.features.icon-rows
title: Icon feature rows
category: features
surface: [landing, saas, docs]
dials: { variance: [3, 6], motion: [1, 4], density: [4, 7] }
stack: [html, react, next, tailwind]
---

# Icon feature rows (not 3 equal cards)

## When
6–9 benefits; denser than bento. Dùng hàng / 2-col list, **không** grid 3 card icon+title+text giống hệt.

## Skeleton
```tsx
<section className="mx-auto max-w-3xl px-4 py-24">
  <h2 className="text-3xl font-semibold tracking-tight">Why teams switch</h2>
  <ul className="mt-12 divide-y divide-zinc-200 dark:divide-zinc-800">
    {[
      ["Fast review", "Thread comments stay on the artifact."],
      ["Clear owners", "Every deploy has a responsible human."],
      ["Quiet alerts", "Route by severity, not by volume."],
    ].map(([t, d]) => (
      <li key={t} className="flex gap-4 py-6">
        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
        <div>
          <h3 className="font-medium">{t}</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{d}</p>
        </div>
      </li>
    ))}
  </ul>
</section>
```

## Anti-patterns
Lucide rocket/shield cliché wall · emoji icons.
