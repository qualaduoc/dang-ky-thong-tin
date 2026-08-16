---
id: block.forms.auth-split
title: Auth split panel
category: forms
surface: [auth, saas]
dials: { variance: [4, 7], motion: [2, 5], density: [3, 5] }
stack: [html, react, next, tailwind]
---

# Auth split panel

## When
Login/signup: form + brand panel. Labels visible; không placeholder-as-label.

## Skeleton
```tsx
<div className="grid min-h-[100dvh] md:grid-cols-2">
  <div className="flex items-center justify-center px-6 py-12">
    <form className="w-full max-w-sm space-y-4" onSubmit={(e) => e.preventDefault()}>
      <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input id="email" type="email" autoComplete="email" className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700" />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <input id="password" type="password" autoComplete="current-password" className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700" />
      </div>
      <button type="submit" className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-900">
        Continue
      </button>
    </form>
  </div>
  <div className="relative hidden bg-zinc-900 md:block">
    <img src="https://picsum.photos/seed/auth-side/1200/1600" alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
  </div>
</div>
```

## Anti-patterns
White-on-white button · errors only via alert() · no focus ring.
