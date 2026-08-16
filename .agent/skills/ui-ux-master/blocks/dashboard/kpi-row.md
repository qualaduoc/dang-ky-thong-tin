---
id: block.dashboard.kpi-row
title: KPI metrics row
category: dashboard
surface: [dashboard, app]
dials: { variance: [2, 5], motion: [1, 4], density: [7, 10] }
stack: [react, next, tailwind]
---

# KPI metrics row

## When
Overview: 3–4 metrics. Không “hero-metric gradient SaaS cliché”.

## Skeleton
```tsx
<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
  {[
    ["Deploys", "128", "+12%"],
    ["Error rate", "0.12%", "-0.03"],
    ["p95 latency", "210ms", "stable"],
    ["Open incidents", "2", ""],
  ].map(([label, value, delta]) => (
    <div key={label} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">{value}</p>
      {delta ? <p className="mt-1 text-xs text-zinc-500">{delta}</p> : null}
    </div>
  ))}
</div>
```

## Anti-patterns
Big gradient number only · nested cards · animate width bars for show.
