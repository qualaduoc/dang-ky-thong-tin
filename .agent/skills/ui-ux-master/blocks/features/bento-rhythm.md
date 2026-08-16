---
id: block.features.bento-rhythm
title: Bento grid with rhythm
category: features
surface: [landing, saas, product]
dials: { variance: [6, 9], motion: [3, 7], density: [3, 6] }
stack: [html, react, next, tailwind]
---

# Bento grid with rhythm

## When
4–6 capabilities; need visual variety. **N items = N cells**.

## Wireframe
```
|  [ big feature     ] [ sm ] |
|  [ sm ] [ sm ] [  wide    ] |
```

## Skeleton
```tsx
<section className="mx-auto max-w-6xl px-4 py-24">
  <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">Everything in one workspace</h2>
  <div className="mt-12 grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
    <article className="md:col-span-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h3 className="text-lg font-medium">Orchestrate releases</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Ship with confidence using a single timeline.</p>
    </article>
    <article className="md:col-span-2 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      <h3 className="text-lg font-medium">Alerts</h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Noise-free routing.</p>
    </article>
    <article className="md:col-span-2 rounded-2xl bg-zinc-900 p-6 text-white dark:bg-zinc-100 dark:text-zinc-900">
      <h3 className="text-lg font-medium">Audit log</h3>
      <p className="mt-2 text-sm opacity-80">Every action attributed.</p>
    </article>
    <article className="md:col-span-4 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <img src="https://picsum.photos/seed/bento-feat/1000/480" alt="" className="h-40 w-full object-cover md:h-full" />
    </article>
  </div>
</section>
```

## Rules
≥2 cells có visual khác (image/tint). Không 6 card trắng giống hệt. Không empty cell.

## Anti-patterns
3 equal icon cards · eyebrow trên mọi tile.
