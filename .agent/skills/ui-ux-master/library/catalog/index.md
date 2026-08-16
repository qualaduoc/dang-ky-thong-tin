# UI Library Catalog

Đọc file này **hoặc** `manifest.json` trước khi đề xuất giao diện.

Workflow: `.agent/workflows/design-suggest.md`

---

## Recipes (cả trang)

| ID | Title | Surface | Dials V/M/D | Blocks chính |
|----|-------|---------|-------------|--------------|
| `recipe.saas-landing` | SaaS marketing landing | landing | 7/6/4 | nav, hero split, logos, bento, pricing, cta |
| `recipe.portfolio-studio` | Studio portfolio | portfolio | 8/7/3 | editorial hero, zigzag, cta |
| `recipe.saas-dashboard` | App dashboard | dashboard | 3/3/8 | shell, kpi |
| `recipe.pricing-page` | Pricing page | landing | 5/4/5 | pricing, icon rows, cta |
| `recipe.auth-screens` | Login/signup | auth | 5/3/4 | auth-split |
| `recipe.settings-billing` | Settings & billing | app | 2/2/7 | shell + forms |

Chi tiết: `references/recipes/<slug>.md`

---

## Blocks (mảnh UI)

| ID | Category |
|----|----------|
| `block.nav.minimal-single-line` | nav |
| `block.hero.asymmetric-split` | hero |
| `block.hero.editorial-manifesto` | hero |
| `block.hero.product-demo` | hero |
| `block.features.bento-rhythm` | features |
| `block.features.zigzag-capped` | features |
| `block.features.icon-rows` | features |
| `block.social.logo-wall` | social |
| `block.pricing.two-tier-honest` | pricing |
| `block.dashboard.shell-sidebar` | dashboard |
| `block.dashboard.kpi-row` | dashboard |
| `block.forms.auth-split` | forms |
| `block.cta.full-bleed` | cta |
| `block.footer.compact` | footer |

---

## Industries

`saas` · `fintech` · `healthcare` · `agency` · `devtool` · `ecommerce`  
→ `references/industries/`

---

## External templates / design systems

| ID | Pack | Skill entry | Notes |
|----|------|-------------|-------|
| `ext.nuxt-ui.v4` | Nuxt UI v4 | `skills/nuxt-ui/SKILL.md` | Vue/Nuxt: landing, dashboard, docs, chat, auth recipes |
| `ext.ant-design.react` | Ant Design | `skills/ant-design/SKILL.md` | React enterprise: tokens, specs, tables/forms/admin |

Thêm pack mới: `library/external/<name>/` + `META.md` + entry `manifest.json`.

---

## Quick match

| User nói… | Ưu tiên recipe |
|-----------|----------------|
| Landing SaaS / product site | `recipe.saas-landing` |
| Portfolio / agency | `recipe.portfolio-studio` |
| Dashboard / admin | `recipe.saas-dashboard` |
| Bảng giá | `recipe.pricing-page` |
| Login / đăng ký | `recipe.auth-screens` |
| Settings / billing | `recipe.settings-billing` |
| Vue/Nuxt UI kit | `ext.nuxt-ui.v4` |
| React enterprise admin (antd) | `ext.ant-design.react` |
| Cải thiện site có sẵn | redesign protocol + map section → blocks gần nhất |
