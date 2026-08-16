---
id: block.pricing.two-tier-honest
title: Two-tier honest pricing
category: pricing
surface: [landing, saas]
dials: { variance: [4, 7], motion: [2, 5], density: [4, 7] }
stack: [html, react, next, tailwind]
---

# Two-tier honest pricing

## When
SaaS: Free/Pro hoặc Pro/Team. Highlight 1 tier. Tránh 3 tháp “Most popular” sáo.

## Skeleton
```tsx
<section id="pricing" className="mx-auto max-w-4xl px-4 py-24">
  <h2 className="text-center text-3xl font-semibold tracking-tight">Simple pricing</h2>
  <div className="mt-12 grid gap-6 md:grid-cols-2">
    <div className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
      <h3 className="text-lg font-medium">Starter</h3>
      <p className="mt-4 text-4xl font-semibold tracking-tight">$0</p>
      <ul className="mt-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        <li>3 projects</li>
        <li>Community support</li>
      </ul>
      <a href="/signup" className="mt-8 block rounded-full border border-zinc-300 py-2.5 text-center text-sm dark:border-zinc-700">Get started</a>
    </div>
    <div className="rounded-2xl border-2 border-zinc-900 bg-zinc-50 p-8 dark:border-white dark:bg-zinc-900">
      <h3 className="text-lg font-medium">Pro</h3>
      <p className="mt-4 text-4xl font-semibold tracking-tight">$24<span className="text-base font-normal text-zinc-500">/mo</span></p>
      <ul className="mt-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        <li>Unlimited projects</li>
        <li>SSO ready</li>
        <li>Priority support</li>
      </ul>
      <a href="/signup" className="mt-8 block rounded-full bg-zinc-900 py-2.5 text-center text-sm text-white dark:bg-white dark:text-zinc-900">Start Pro</a>
    </div>
  </div>
</section>
```

## Anti-patterns
3 columns default · fake 99.99% uptime badge · CTA label wrap.
