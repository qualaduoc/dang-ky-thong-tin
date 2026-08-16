---
id: block.hero.product-demo
title: Product demo hero
category: hero
surface: [saas, landing, devtool]
dials: { variance: [4, 7], motion: [4, 8], density: [3, 6] }
stack: [html, react, next, tailwind]
---

# Product demo hero

## When
Devtool/SaaS: product UI là ngôi sao — frame thật hoặc image gen, không div fake.

## Wireframe
```
|     centered or slight-left copy (max 4 text units)   |
|     [CTA]                                             |
|     ┌─────────────────────────────────────────────┐   |
|     │         product window / screenshot         │   |
|     └─────────────────────────────────────────────┘   |
```

## Skeleton
```tsx
<section className="mx-auto max-w-5xl px-4 pb-20 pt-24 text-center">
  <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl text-balance">
    Observe every deploy in one timeline
  </h1>
  <p className="mx-auto mt-5 max-w-xl text-zinc-600 dark:text-zinc-400">
    Logs, metrics, and rollbacks without leaving the page.
  </p>
  <div className="mt-8 flex justify-center gap-3">
    <a href="/signup" className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white">Start free</a>
    <a href="/docs" className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm dark:border-zinc-700">Docs</a>
  </div>
  <div className="mx-auto mt-14 overflow-hidden rounded-xl border border-zinc-200 shadow-sm dark:border-zinc-800">
    <img src="https://picsum.photos/seed/demo-ui/1600/900" alt="Product dashboard preview" className="w-full" />
  </div>
</section>
```

## Anti-patterns
Fake terminal/task list bằng div · version chip `v0.6` trong hero.
