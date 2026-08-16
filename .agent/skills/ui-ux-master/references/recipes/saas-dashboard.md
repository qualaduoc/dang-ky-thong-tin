---
id: recipe.saas-dashboard
title: SaaS app dashboard
surface: [dashboard, app]
industries: [saas, fintech, ops]
dials: { variance: 3, motion: 3, density: 8 }
blocks:
  - block.dashboard.shell-sidebar
  - block.dashboard.kpi-row
search_query: "analytics dashboard dense product ui"
---

# Recipe: SaaS dashboard

## Page spine
1. Shell (sidebar + top bar)  
2. KPI row  
3. Main panel: table or chart (stack-specific)  
4. Empty/loading/error states for main panel  

## Register
**Product** — restrained color, fixed rem type, state motion only.

## Search
```bash
python .agent/.shared/ui-ux-master/scripts/search.py "analytics dashboard dense product ui" --design-system --variance 3 --motion 3 --density 8 -p "Ops"
```
