---
id: recipe.saas-landing
title: SaaS marketing landing
surface: [landing, saas]
industries: [saas, devtool, fintech]
dials: { variance: 7, motion: 6, density: 4 }
blocks:
  - block.nav.minimal-single-line
  - block.hero.asymmetric-split
  - block.social.logo-wall
  - block.features.bento-rhythm
  - block.features.zigzag-capped
  - block.pricing.two-tier-honest
  - block.cta.full-bleed
  - block.footer.compact
search_query: "saas b2b productivity landing modern"
---

# Recipe: SaaS marketing landing

## Page spine
1. Nav  
2. Hero (asymmetric)  
3. Logo wall  
4. Bento features  
5. Zigzag deep-dive (max 2)  
6. Pricing two-tier  
7. CTA band  
8. Footer  

## Dials
7 / 6 / 4 — marketing brand register.

## Search
```bash
python .agent/.shared/ui-ux-master/scripts/search.py "saas b2b productivity landing modern" --design-system --variance 7 --motion 6 --density 4 -p "Project"
```

## Compose order
Load each block file in spine order; swap hero → `product-demo` nếu brief devtool screenshot-first.

## Anti-slop for this recipe
No 3 equal feature cards · no purple mesh default · logo wall not in hero · max 1 marquee.
