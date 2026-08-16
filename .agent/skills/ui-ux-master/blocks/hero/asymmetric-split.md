---
id: block.hero.asymmetric-split
title: Asymmetric split hero
category: hero
surface: [landing, saas, product]
dials: { variance: [6, 10], motion: [3, 8], density: [2, 5] }
stack: [html, react, next, tailwind]
---

# Asymmetric split hero

## When
SaaS/product: message mạnh + 1 visual (product shot / UI frame). Variance ≥ 6.

## Not for
Editorial manifesto (dùng `editorial-manifesto`) · dense dashboard.

## Wireframe
```
| Headline 2 lines          |  [ visual /          |
| Sub ≤ 20 words            |    product frame ]   |
| [Primary] [Secondary]     |                      |
|         (logo wall BELOW section, not inside)          |
```

## Skeleton
```tsx
<section className="mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-20">
  <div className="space-y-6">
    <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl dark:text-zinc-50 text-balance">
      Ship product UI that does not look templated
    </h1>
    <p className="max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
      One clear value prop. Short subtext. CTA visible without scroll.
    </p>
    <div className="flex flex-wrap gap-3">
      <a className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-900" href="/signup">
        Start free
      </a>
      <a className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium dark:border-zinc-700" href="#demo">
        View demo
      </a>
    </div>
  </div>
  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
    {/* real image or next/image — never div fake screenshot */}
    <img src="https://picsum.photos/seed/product-hero/1200/900" alt="Product interface preview" className="h-full w-full object-cover" />
  </div>
</section>
```

## Mobile
Stack: copy → visual; `min-h` không bắt buộc full trên mobile.

## Anti-patterns
Centered default khi variance > 4 · trust logos trong hero · sub > 20 words · CTA dưới fold.
