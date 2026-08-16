---
description: UI/UX Master — design intelligence, anti-slop, dials, craft/audit/polish for web & mobile
---

# /ui-ux-master

Workflow chuẩn khi Khầy (user) yêu cầu thiết kế, build, redesign, review, polish UI/UX.

**Skill chính:** `.agent/skills/ui-ux-master/SKILL.md`  
**Search engine:** `.agent/.shared/ui-ux-master/scripts/search.py`  
**Rules always-on** trong `.agent/rules/` vẫn tuân thủ (ngôn ngữ, xưng hô, 5 gợi ý, …).

Alias tương thích: nếu user gọi `/ui-ux-pro-max` → chạy workflow này (pro-max đã gộp vào master).

---

## Prerequisites

```bash
python --version || python3 --version || py -3 --version
```

Thiếu Python → không tự cài hệ thống; hỏi user hoặc làm design bằng `references/` trong skill (không search DB).

---

## Step 0 — Design read + dials (bắt buộc)

Trước khi code, nêu 1 dòng:

> *Reading this as: \<page/product> for \<audience>, vibe \<…>, leaning \<system/aesthetic>.*

Set 3 dials (1–10): `DESIGN_VARIANCE` · `MOTION_INTENSITY` · `VISUAL_DENSITY`  
Chi tiết: `.agent/skills/ui-ux-master/references/core/dials.md`

Register:

- Landing / marketing / portfolio → đọc `references/core/brand-register.md`
- Dashboard / app / admin → đọc `references/core/product-register.md`

---

## Step 1 — Analyze requirements

- Product type, industry, audience, style keywords, stack (detect từ repo; không hardcode stack)

---

## Step 2 — Design system search (REQUIRED cho page/project mới)

```bash
python .agent/.shared/ui-ux-master/scripts/search.py "<product> <industry> <keywords>" --design-system -p "Project Name"
```

Kèm dials:

```bash
python .agent/.shared/ui-ux-master/scripts/search.py "<query>" --design-system --variance 8 --motion 6 --density 4 -p "Name"
```

Persist (ghi vào project):

```bash
python .agent/.shared/ui-ux-master/scripts/search.py "<query>" --design-system --persist -p "Name" --output-dir "."
```

---

## Step 3 — Domain / stack bổ sung (khi cần)

```bash
python .agent/.shared/ui-ux-master/scripts/search.py "<kw>" --domain ux
python .agent/.shared/ui-ux-master/scripts/search.py "<kw>" --domain style
python .agent/.shared/ui-ux-master/scripts/search.py "<kw>" --domain typography
python .agent/.shared/ui-ux-master/scripts/search.py "<kw>" --stack nextjs
```

Domains: `product`, `style`, `color`, `typography`, `landing`, `chart`, `ux`, `gsap`, `icons`, `react`, `web`, `google-fonts`  
Stacks: xem `.agent/.shared/ui-ux-master/data/stacks/`

---

## Step 4 — Commands (khi đúng intent)

Load file trong `.agent/skills/ui-ux-master/references/commands/`:

| Intent | Command ref |
|--------|-------------|
| Build end-to-end | `craft.md` / `shape.md` |
| Review UX | `critique.md` |
| A11y/perf | `audit.md` |
| Pre-ship | `polish.md` |
| Redesign site cũ | `../aesthetics/redesign.md` |

---

## Step 5 — Implement

- Áp anti-slop: `references/core/anti-slop.md`
- Output đầy đủ: `references/aesthetics/output-discipline.md`
- Stack FE: kết hợp `tailwind-patterns`, `nextjs-react-expert`, `frontend-design` khi cần
- Code production-ready, không placeholder `// ...`

---

## Step 6 — Preflight + audit

1. Chạy checklist: `references/core/preflight.md`
2. (Nếu có) skill `web-design-guidelines` sau khi code
3. (Nếu có) `frontend-design/scripts/ux_audit.py` cho audit UX

---

## Quick rules (không bỏ)

- Không emoji làm icon UI  
- Contrast ≥ 4.5:1 body  
- `prefers-reduced-motion`  
- Không em-dash `—` trong copy UI  
- Không 3 card icon giống hệt / AI purple mesh / cream default  
- Hero + CTA trong viewport đầu; `min-h-[100dvh]`  
- Light + dark (nếu consumer) đều testable  

---

## Related

- Skill: `.agent/skills/ui-ux-master/SKILL.md`
- Agent: `.agent/agents/frontend-specialist.md`
- Legacy name: `ui-ux-pro-max` → redirected here
