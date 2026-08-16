---
id: recipe.portfolio-studio
title: Designer / studio portfolio
surface: [portfolio, agency]
industries: [agency, creative]
dials: { variance: 8, motion: 7, density: 3 }
blocks:
  - block.nav.minimal-single-line
  - block.hero.editorial-manifesto
  - block.features.zigzag-capped
  - block.cta.full-bleed
  - block.footer.compact
search_query: "portfolio creative studio editorial"
---

# Recipe: Portfolio studio

## Page spine
1. Nav minimal  
2. Editorial hero  
3. Selected work (zigzag or custom project grid — N projects = N cells)  
4. CTA contact  
5. Footer  

## Notes
Imagery bắt buộc. Density thấp. Motion motivated (reveal work, not confetti).

## Search
```bash
python .agent/.shared/ui-ux-master/scripts/search.py "portfolio creative studio editorial" --design-system --variance 8 --motion 7 --density 3 -p "Studio"
```
