---
id: block.footer.compact
title: Compact footer
category: footer
surface: [landing, portfolio, saas, docs]
dials: { variance: [2, 6], motion: [1, 3], density: [3, 6] }
stack: [html, react, next, tailwind]
---

# Compact footer

## When
Marketing/docs: không “link farm” 4 cột mặc định.

## Skeleton
```tsx
<footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
  <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
    <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Brand</p>
    <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/contact">Contact</a>
    </nav>
  </div>
</footer>
```

## Anti-patterns
Version footer `v1.4.2` trên marketing · locale/weather strip.
