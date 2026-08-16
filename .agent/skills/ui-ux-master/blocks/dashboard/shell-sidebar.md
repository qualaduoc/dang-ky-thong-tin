---
id: block.dashboard.shell-sidebar
title: Dashboard shell + sidebar
category: dashboard
surface: [dashboard, app, admin]
dials: { variance: [1, 4], motion: [1, 3], density: [7, 10] }
stack: [react, next, tailwind]
---

# Dashboard shell + sidebar

## When
Product UI: nav ổn định, content pane. Motion thấp, density cao. Product register.

## Skeleton
```tsx
<div className="flex min-h-[100dvh] bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
  <aside className="hidden w-56 shrink-0 border-r border-zinc-200 bg-white p-4 md:block dark:border-zinc-800 dark:bg-zinc-900">
    <div className="mb-8 text-sm font-semibold">Acme Ops</div>
    <nav className="space-y-1 text-sm">
      {["Overview", "Deploys", "Alerts", "Settings"].map((l) => (
        <a key={l} href="#" className="block rounded-md px-3 py-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
          {l}
        </a>
      ))}
    </nav>
  </aside>
  <div className="flex min-w-0 flex-1 flex-col">
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
      <h1 className="text-sm font-medium">Overview</h1>
      <button type="button" className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs dark:border-zinc-700">New deploy</button>
    </header>
    <main className="flex-1 p-4 md:p-6">{/* page content */}</main>
  </div>
</div>
```

## Anti-patterns
Display serif trong nav · page-load choreography · modal-first cho mọi action.
