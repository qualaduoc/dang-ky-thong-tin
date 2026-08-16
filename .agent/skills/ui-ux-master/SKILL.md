---
name: ui-ux-master
description: >
  Unified UI/UX design skill for all coding agents (Antigravity, Claude, Codex, Grok, Cursor, Gemini).
  Design, redesign, critique, audit, polish, and ship production-grade interfaces: landing pages,
  portfolios, dashboards, product UI, components, forms, onboarding, design systems, tokens.
  Proposes 3 UI directions from library catalog (recipes, blocks, external templates) before coding.
  Anti-slop rules, three design dials, searchable design intelligence, craft/audit/polish commands.
  Use for UI/UX work, /ui-ux-master, /design-suggest, template, layout, landing, dashboard, redesign.
  Prefer this over legacy ui-ux-pro-max.
---

# UI/UX Master — Skill tổng hợp (mọi Agent)

Production-grade frontend. Real code. Không AI slop.

Gộp: **Impeccable** (commands + registers) · **Taste** (dials + anti-slop + preflight) · **UI/UX Pro Max** (search DB + stacks).

> **Trong kit Antigravity (`.agent/`):** skill này là **lớp UI/UX chính**.  
> Vẫn kết hợp: `frontend-design` (psychology), `web-design-guidelines` (audit sau code), `tailwind-patterns`, `mobile-design`.  
> **Rules always-on** của project (tiếng Việt, xưng hô, 5 gợi ý…) **luôn ưu tiên** — skill này không ghi đè rule đó.

---

## 0. Path resolution (bắt buộc)

Gọi `SKILL_DIR` = thư mục chứa file `SKILL.md` này.

**Search engine (Python 3, stdlib only)** — thử theo thứ tự:

| Ưu tiên | Path |
|--------:|------|
| 1 | `.agent/.shared/ui-ux-master/scripts/search.py` (từ project root — Antigravity) |
| 2 | `SKILL_DIR/scripts/search.py` (skill tự chứa data — Codex / Grok / Claude / copy rời) |

Giữ **cwd = project root** của user, không cd vào skill.

```bash
# Antigravity / project có .agent
python .agent/.shared/ui-ux-master/scripts/search.py "<query>" --design-system -p "Project"

# Skill standalone (Windows: python hoặc py -3)
python "SKILL_DIR/scripts/search.py" "<query>" --design-system -p "Project"
```

---

## 1. Setup mỗi session UI

1. **Design read** (1 dòng trước khi code):  
   *"Reading this as: \<loại trang/product> for \<audience>, vibe \<…>, leaning \<system/aesthetic>."*
2. **Register** (bắt buộc):
   - Marketing / landing / portfolio → `references/core/brand-register.md`
   - App / admin / dashboard / tool → `references/core/product-register.md`
3. **Dials** → `references/core/dials.md` (`DESIGN_VARIANCE` / `MOTION_INTENSITY` / `VISUAL_DENSITY`)
4. Đọc token/theme/component hiện có trong project (giữ brand đã commit).
5. **Thư viện giao diện (đề xuất trước khi code)** — xem §1b.
6. Project/page mới → chạy `--design-system` (§2) sau khi đã chốt hướng (hoặc song song seed).
7. User gọi command (`craft`, `audit`, `polish`…) → load `references/commands/<command>.md`.
8. Sau khi code → preflight + skill `web-design-guidelines` (nếu có).

### 1b. UI Library — đề xuất & chọn template (bắt buộc với greenfield / “làm giao diện”)

**Catalog:** `library/catalog/manifest.json` (+ `library/catalog/index.md`)  
**Flow đầy đủ:** `.agent/workflows/design-suggest.md` · slash `/design-suggest`

| Tầng | Path |
|------|------|
| Recipes (cả trang) | `references/recipes/` |
| Blocks (mảnh UI) | `blocks/` |
| External (repo Khầy thả vào) | `library/external/` |
| Industries | `references/industries/` |

**Quy tắc:**
1. Đọc catalog → lọc recipe/block/external theo surface + industry + dials.
2. **Greenfield / “template / làm UI / landing / dashboard mới”:** xuất **đúng 3 hướng** (A/B/C) từ catalog — **chưa code full** cho đến khi user chọn (trừ user đã chỉ định recipe/id).
3. **Redesign site có sẵn:** 3 hướng *cải thiện* + map section → block IDs; rồi implement.
4. Sau chọn: load recipe + block files → search → implement skeleton → preflight → ghi `DESIGN.md` ở project root.
5. **Không bịa layout ngoài catalog** trừ khi không có match (nói rõ “custom”).

Khi user chỉ bảo “cải thiện layout” và scope đã rõ: vẫn được đề xuất 3 hướng nhanh rồi code ngay nếu user nói “cứ làm / chọn A giúp em”.

---

## 2. Design Intelligence

```bash
python <SEARCH> "<product industry keywords>" --design-system -p "Name"
python <SEARCH> "<q>" --domain style|color|typography|ux|landing|chart|gsap|product
python <SEARCH> "<q>" --stack nextjs|react|html-tailwind|shadcn|vue|…
python <SEARCH> "<q>" --design-system --variance 8 --motion 6 --density 4 -p "Name"
python <SEARCH> "<q>" --design-system --persist -p "Name" --output-dir "<project-root>"
```

Bảng rule đầy đủ: `references/intelligence/quick-reference.md`, `pro-rules.md`.

---

## 3. Commands

| Command | File |
|---------|------|
| craft / shape / init / document / extract | `references/commands/` |
| critique / audit / polish | `references/commands/` |
| bolder / quieter / distill / harden / onboard | `references/commands/` |
| animate / colorize / typeset / layout / delight | `references/commands/` |
| clarify / adapt / optimize | `references/commands/` |
| redesign | `references/aesthetics/redesign.md` |

Intent map: "sửa spacing" → `layout` · "error message" → `clarify` · "nhạt quá" → `bolder` · "ồn quá" → `quieter`.

---

## 4. Aesthetic presets (optional, 1 preset)

| Preset | File |
|--------|------|
| Soft / premium | `references/aesthetics/soft.md` |
| Minimalist | `references/aesthetics/minimalist.md` |
| Brutalist | `references/aesthetics/brutalist.md` |
| Output full code | `references/aesthetics/output-discipline.md` |

---

## 5. Craft rules (always on)

**Color:** contrast body ≥4.5:1; OKLCH ưu tiên; 1 accent; cấm cream/sand default & AI purple glow; không pure `#000`/`#fff`.  
**Type:** body 65–75ch; tracking display ≥ −0.04em; hero clamp ≤6rem; tránh Inter/Fraunces/Instrument Serif làm default.  
**Layout:** không nested cards; Grid 2D; hero `min-h-[100dvh]` không `h-screen`; z-index có scale.  
**Motion:** transform/opacity; có lý do; `prefers-reduced-motion`; cấm `window.onscroll`.  
**States:** default/hover/focus/active/disabled/loading/empty/error.  
**Icons:** 1 family (Phosphor/HugeIcons/Radix/Tabler…); không emoji-icon; không fake screenshot bằng div.  
**Output:** code đủ — cấm `// ... rest` (xem `output-discipline.md`).

---

## 6. Absolute bans (AI tells)

Side-stripe accent · gradient text · glass mặc định · hero-metric · 3 card icon giống hệt · eyebrow mọi section · `01/02/03` scaffolding · **em-dash `—`** · Inter+purple mesh+Acme+John Doe · scroll cue · ghost card (border+shadow rộng) · card radius 32px+.

Chi tiết: `references/core/anti-slop.md`.  
Preflight: `references/core/preflight.md` (**bắt buộc trước khi ship**).  
Workflow tree: `references/core/workflow.md`.

---

## 7. Kết hợp skill khác trong `.agent` (nếu có)

| Việc | Skill |
|------|--------|
| Vue/Nuxt + `@nuxt/ui` | **`nuxt-ui`** · catalog `ext.nuxt-ui.v4` |
| React enterprise + `antd` | **`ant-design`** · catalog `ext.ant-design.react` |
| UX psychology / quyết định design | `frontend-design` |
| Audit a11y/perf sau code | `web-design-guidelines` |
| Tailwind utilities | `tailwind-patterns` |
| React/Next perf | `nextjs-react-expert` |
| Mobile native | `mobile-design` |
| Persona FE | agent `frontend-specialist` |

---

## 8. Slash / intents

| Intent | Action |
|--------|--------|
| `/design-suggest`, “gợi ý UI”, “chọn template”, “3 hướng” | Workflow design-suggest |
| `/ui-ux-master`, craft/audit/polish | Workflow + commands |
| “thêm template repo” | Hướng dẫn `library/external/README.md` + cập nhật manifest |

## 9. Multi-agent install

| Runtime | Gợi ý |
|---------|--------|
| **Antigravity** | Đã nằm trong `.agent/skills/ui-ux-master` + `.agent/.shared/ui-ux-master` |
| **Claude Code** | Copy/symlink → `.claude/skills/ui-ux-master` hoặc dùng cả `.agent` |
| **Cursor** | `.cursor/skills/ui-ux-master` hoặc rules trỏ `SKILL.md` |
| **Codex** | `.agents/skills/ui-ux-master` |
| **Grok** | `~/.grok/skills/ui-ux-master` hoặc project skills |
| **Gemini / khác** | Trỏ agent đọc `SKILL.md` + cho phép `scripts/` + `references/` |

Chi tiết: `AGENTS.md` (cùng folder).

---

## 10. Out of scope

Backend-only, API/DB thuần, infra — trừ khi task đổi look/feel/interaction.
