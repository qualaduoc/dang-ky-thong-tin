---
id: block.nav.minimal-single-line
title: Minimal single-line nav
category: nav
surface: [landing, portfolio, marketing]
dials: { variance: [3, 8], motion: [1, 6], density: [2, 5] }
stack: [html, react, next, tailwind]
---

# Minimal single-line nav

## When
Marketing/portfolio: logo + 3–5 links + 1 primary CTA. Height ≤ 72–80px.

## Not for
App shells with 12 nav items (use dashboard shell).

## Wireframe
```
| Logo     Features  Pricing  Docs     [Get started] |
```

## Skeleton (React + Tailwind)
```tsx
<header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
  <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
    <a href="/" className="font-semibold tracking-tight">Brand</a>
    <nav className="hidden items-center gap-8 text-sm text-zinc-600 md:flex dark:text-zinc-300">
      <a href="#features" className="hover:text-zinc-900 dark:hover:text-white">Features</a>
      <a href="#pricing" className="hover:text-zinc-900 dark:hover:text-white">Pricing</a>
      <a href="#docs" className="hover:text-zinc-900 dark:hover:text-white">Docs</a>
    </nav>
    <a href="/signup" className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-zinc-900">
      Get started
    </a>
  </div>
</header>
```

## Mobile
Hamburger hoặc link CTA only; không wrap 2 dòng ở desktop.

## Anti-patterns
Nav > 80px · 2-line desktop · version badge trong nav · scroll cue.
