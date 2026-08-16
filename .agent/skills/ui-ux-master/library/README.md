# UI Template Library

Thư viện **đề xuất & chọn giao diện** cho agent. Gồm 3 tầng:

| Tầng | Path | Vai trò |
|------|------|---------|
| **Blocks** | `../blocks/` | Mảnh UI tái sử dụng (hero, pricing, shell…) |
| **Recipes** | `../references/recipes/` | Công thức cả trang (ghép blocks + dials) |
| **External** | `external/` | Repo/template Khầy mang về (HTML/React/Figma export…) |

**Catalog (mục lục):** `catalog/index.md` + `catalog/manifest.json`

---

## Agent protocol (bắt buộc khi gợi ý UI)

1. Đọc `catalog/manifest.json` (hoặc `index.md`) để biết có gì.
2. Lọc theo: `surface` (landing/dashboard/…), `industry`, `dials`, `stack`.
3. Đề xuất **đúng 3 hướng** (mỗi hướng = 1 recipe **hoặc** 1 external template + 2–4 blocks).
4. Chờ user chọn **A / B / C / mix** (trừ khi user đã chỉ định recipe/template).
5. Implement từ skeleton trong block/recipe/external — **không bịa layout ngoài catalog** trừ khi catalog không có gì khớp (nói rõ “custom”).

Chi tiết flow: `.agent/workflows/design-suggest.md`

---

## Thêm template từ repo ngoài (Khầy mang về)

### Cách nhanh

1. Clone/copy repo (hoặc chỉ folder `templates/`) vào:

```text
library/external/<vendor-or-name>/
```

2. Thêm entry vào `catalog/manifest.json` (và 1 dòng trong `catalog/index.md`).

3. (Khuyến nghị) Tạo `library/external/<name>/META.md`:

```markdown
---
id: vendor-saas-01
title: Clean SaaS Landing
surface: landing
industries: [saas, devtool]
dials: { variance: [6,8], motion: [4,7], density: [3,5] }
stack: [html, react, tailwind]
entry: index.html
---
# Notes
- Hero asymmetric, logo wall, pricing 3-col
- Cần thay copy/brand; giữ spacing scale
```

### Quy ước folder external

```text
external/
  <pack-name>/
    META.md           # bắt buộc nếu muốn agent ưu tiên
    README.md         # optional
    **/*              # source templates
```

### License

Chỉ gộp template **được phép dùng** (MIT/Apache/own). Ghi license trong `META.md`.

---

## ID naming

- Block: `block.<category>.<slug>` — vd `block.hero.asymmetric-split`
- Recipe: `recipe.<slug>` — vd `recipe.saas-landing`
- External: `ext.<pack>.<slug>` — vd `ext.awesome-saas.hero-01`
