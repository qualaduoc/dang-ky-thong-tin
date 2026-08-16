---
id: block.hero.editorial-manifesto
title: Editorial manifesto hero
category: hero
surface: [portfolio, agency, brand]
dials: { variance: [7, 10], motion: [2, 6], density: [1, 4] }
stack: [html, react, next, tailwind]
---

# Editorial manifesto hero

## When
Portfolio/agency: type là visual chính. Density thấp, whitespace lớn.

## Not for
Feature-heavy SaaS demos.

## Wireframe
```
|                                                    |
|   BIG MANIFESTO LINE ONE                           |
|   LINE TWO                                         |
|   short line · role or city (optional, 1 only)     |
|   [Work]  [Contact]                                |
|                                                    |
```

## Skeleton
```tsx
<section className="mx-auto flex min-h-[100dvh] max-w-5xl flex-col justify-end px-4 pb-20 pt-32">
  <h1 className="text-5xl font-medium tracking-tight md:text-7xl lg:text-8xl text-balance">
    Design systems for teams who ship
  </h1>
  <p className="mt-6 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
    Studio based work for product brands. Selected projects below.
  </p>
  <div className="mt-10 flex gap-4">
    <a href="#work" className="text-sm font-medium underline-offset-4 hover:underline">View work</a>
    <a href="#contact" className="text-sm font-medium underline-offset-4 hover:underline">Contact</a>
  </div>
</section>
```

## Anti-patterns
Eyebrow số `01 / INDEX` · decoration strip BRAND.MOTION · serif default Fraunces không lý do.
