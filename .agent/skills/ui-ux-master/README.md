# UI/UX Master Skill

Bộ skill UI/UX tổng hợp cho **mọi AI Agent** (Claude, Cursor, Codex, Grok, Gemini, …).

Gộp tinh hoa từ:

| Nguồn | Đóng góp chính |
|-------|----------------|
| **Impeccable** | Workflow lệnh (craft/shape/audit/polish), brand vs product register, craft rules |
| **Taste Skill** | Brief inference, 3 dials, anti-slop, pre-flight, aesthetic presets |
| **UI/UX Pro Max** | DB tìm kiếm: 84 styles, 192 palettes, 74 font pairings, 22 stacks, UX guidelines |

## Cài đặt nhanh

Copy cả thư mục `ui-ux-master-skill` vào skills path của agent (xem `AGENTS.md`).

Ví dụ Claude / Cursor / Grok:

```text
.claude/skills/ui-ux-master/
.cursor/skills/ui-ux-master/
.grok/skills/ui-ux-master/
```

Agent load `SKILL.md` khi task liên quan UI/UX.

## Dùng search (Python 3)

```bash
python scripts/search.py "fintech saas dashboard" --design-system -p "Acme Ops"
python scripts/search.py "accessibility focus" --domain ux
python scripts/search.py "glassmorphism" --domain style
python scripts/search.py "performance list" --stack react
```

## Cấu trúc

```text
SKILL.md              ← entry point
AGENTS.md             ← multi-agent install
references/core/      ← dials, anti-slop, preflight, registers
references/commands/  ← craft, audit, polish, …
references/aesthetics/← soft, minimalist, brutalist, redesign
references/intelligence/
data/ + scripts/      ← design intelligence engine
```

## License note

Upstream projects retain their original licenses (Apache 2.0 / project licenses). This pack is a **consolidation for agent use**, not a rebrand of the originals.
