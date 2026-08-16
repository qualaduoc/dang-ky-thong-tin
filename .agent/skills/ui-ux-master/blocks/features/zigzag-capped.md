---
id: block.features.zigzag-capped
title: Zigzag features (max 2)
category: features
surface: [landing, marketing]
dials: { variance: [5, 8], motion: [3, 6], density: [3, 5] }
stack: [html, react, next, tailwind]
---

# Zigzag features (capped)

## When
2 deep-dives image+text. **Tối đa 2** section zigzag liên tiếp; section 3 phải đổi family.

## Skeleton
```tsx
<section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
  <img src="https://picsum.photos/seed/zig1/900/700" alt="" className="rounded-2xl border border-zinc-200 dark:border-zinc-800" />
  <div>
    <h2 className="text-3xl font-semibold tracking-tight">Built for review cycles</h2>
    <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">Comment on the timeline. Resolve without tab hell.</p>
  </div>
</section>
<section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
  <div className="md:order-2">
    <img src="https://picsum.photos/seed/zig2/900/700" alt="" className="rounded-2xl border border-zinc-200 dark:border-zinc-800" />
  </div>
  <div className="md:order-1">
    <h2 className="text-3xl font-semibold tracking-tight">Policies that travel</h2>
    <p className="mt-4 max-w-md text-zinc-600 dark:text-zinc-400">Encode who can ship where. Enforce in CI.</p>
  </div>
</section>
```

## Anti-patterns
3+ zigzag liên tiếp · split-header (headline trái + filler phải).
