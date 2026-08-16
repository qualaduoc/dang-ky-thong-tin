---
description: Đề xuất 3 hướng giao diện từ thư viện (recipes/blocks/external) rồi mới code
---

# /design-suggest

**Mục tiêu:** Agent không nhảy code UI ngay. Luôn **đề xuất → user chọn → implement** từ catalog.

**Skill:** `.agent/skills/ui-ux-master/`  
**Catalog:** `skills/ui-ux-master/library/catalog/manifest.json`  
**Rules always-on** vẫn áp dụng.

Alias ý định: “gợi ý UI”, “chọn template”, “hướng thiết kế”, “layout nào đẹp”, “làm landing/dashboard” (greenfield), “cải thiện giao diện” (có thể 3 hướng cải thiện).

---

## Phase 0 — Context (im lặng hoặc 1 câu)

Thu thập (từ brief + repo, **không dump 5 câu hỏi**):

| Signal | Nguồn |
|--------|--------|
| Surface | landing / portfolio / dashboard / auth / settings |
| Industry | saas, fintech, healthcare… |
| Stack | package.json / existing CSS |
| Brand | màu/font đã có? |
| Mode | greenfield \| redesign-preserve \| redesign-overhaul |

Nếu redesign: ưu tiên **audit-first** (map section hiện có → blocks tương đương), vẫn đưa 3 hướng *cải thiện*.

Ambiguous thật sự → **một** câu hỏi chốt (vd Linear-clean vs experimental).

---

## Phase 1 — Load catalog

1. Đọc `library/catalog/manifest.json` (fallback `index.md`).
2. Lọc `recipes` + `blocks` + `external[]` theo surface/industry/dials/stack.
3. Đọc industry file nếu khớp: `references/industries/<id>.md`.
4. Nếu external `ext.nuxt-ui.v4` / `ext.ant-design.react` khớp stack → **một trong 3 hướng** nên gắn skill tương ứng (`nuxt-ui` / `ant-design`).
5. (Optional) Search:

```bash
python .agent/.shared/ui-ux-master/scripts/search.py "<industry surface keywords>" --design-system -p "Project"
```

---

## Phase 2 — Xuất đúng 3 hướng (CHƯA CODE)

Format bắt buộc:

```markdown
## Design read
> Reading this as: …

## Dials
VARIANCE=·  MOTION=·  DENSITY=·

## Hướng A — <tên ngắn>
- **Recipe / external:** `recipe.…` hoặc `ext.…` hoặc custom-mix
- **Vibe:** …
- **Blocks:** id1, id2, …
- **Wireframe:**
  ```
  [ASCII 5–8 dòng]
  ```
- **Palette seed:** bg / ink / accent (hoặc từ search)
- **Type:** display + body
- **Sections:** 1…n
- **Phù hợp vì:** …
- **Tránh:** 2–3 anti-slop

## Hướng B — …
## Hướng C — …

## Chọn
Reply **A**, **B**, **C**, hoặc **mix A+C** (nêu phần lấy từ đâu).
```

**Ràng buộc:**
- 3 hướng **khác layout family** (không 3 bản “hero + 3 card” đổi màu).
- Ưu tiên recipe/external trong catalog; nếu custom → ghi rõ “ngoài catalog vì…”.
- Không implement full page trong phase này (được 1 ASCII + bullet).

---

## Phase 3 — Sau khi user chọn

1. Load file recipe + từng block listed.
2. Chạy search `--design-system` (nếu chưa) với dials đã chốt.
3. Implement **đủ** theo skeleton blocks (output-discipline).
4. Preflight: `references/core/preflight.md`.
5. Ghi/ cập nhật `DESIGN.md` ở project root:

```markdown
# DESIGN.md
- design_read: …
- dials: V/M/D
- recipe: recipe.…
- blocks: […]
- external: […]
- palette: …
- fonts: …
- updated: ISO date
```

---

## Phase 4 — Redesign site có sẵn

1. Scan layouts/pages.
2. 3 hướng = 3 **chiến lược cải thiện** (vd A: spacing+type only · B: recomposite hero+features · C: bolder brand sections) — map block IDs thay thế.
3. User chọn → sửa theo priority redesign (type → space → color → states → layout).

---

## Anti-patterns của chính workflow này

- Code full UI trước khi user chọn hướng  
- 3 hướng chỉ khác màu tím/xanh  
- Bỏ catalog, bịa bento 6 ô trắng  
- Hỏi 5 câu thay vì đề xuất  

---

## Related

- Blocks: `skills/ui-ux-master/blocks/`
- Recipes: `skills/ui-ux-master/references/recipes/`
- External drop-in: `skills/ui-ux-master/library/external/`
- Full craft: `workflows/ui-ux-master.md`
