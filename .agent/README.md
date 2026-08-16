# Antigravity Kit (`.agent/`) — Multi-Agent Ready

Bộ **agents · skills · workflows · rules · scripts** dùng chung cho:

| Agent runtime | Cách dùng `.agent` |
|---------------|-------------------|
| **Antigravity / Gemini** | Native: rules + skills + workflows trong `.agent/` |
| **Claude Code** | Copy/symlink skills cần thiết → `.claude/skills/`, hoặc trỏ project rules tới `.agent/rules` + skills |
| **Codex / OpenAI** | `.agents/skills/<name>` ← copy từ `.agent/skills/<name>`; đọc `rules/` nếu harness hỗ trợ |
| **Grok / xAI** | `~/.grok/skills/` hoặc project skills ← copy `ui-ux-master` (+ skill khác khi cần) |
| **Cursor / Windsurf** | Project rules import `.agent/rules/*`; skills path trỏ `.agent/skills/` |
| **Mọi agent khác** | Đọc `ARCHITECTURE.md` + load skill `SKILL.md` theo task |

---

## Ưu tiên rule

1. **`.agent/rules/*` always-on** (ngôn ngữ, xưng hô Em/Khầy, định dạng ADHD, 5 gợi ý, deploy list, …) — **không bị skill ghi đè**
2. Agent persona (`agents/*.md`)
3. Skill domain (`skills/*/SKILL.md`)
4. Workflow slash (`workflows/*.md`)

---

## Behavioral & Output Style (`i-have-adhd`)

| Thành phần | Path |
|------------|------|
| **Skill chính** | `skills/i-have-adhd/SKILL.md` |
| **Workflow** | `workflows/adhd-mode.md` → `/adhd-mode` |
| **Always-on Rule** | `rules/-agent-skills.md` (Quy tắc 16: Phản hồi chuẩn ADHD) |

---

## UI/UX (ưu tiên cao nhất cho design)

| Thành phần | Path |
|------------|------|
| **Skill chính** | `skills/ui-ux-master/SKILL.md` |
| **Đề xuất UI** | `workflows/design-suggest.md` → `/design-suggest` (3 hướng từ catalog) |
| **Catalog** | `skills/ui-ux-master/library/catalog/manifest.json` |
| **Blocks / recipes** | `skills/ui-ux-master/blocks/`, `.../references/recipes/` |
| **External / systems** | `library/external/` + skills `nuxt-ui`, `ant-design` |
| **Nuxt UI v4** | `skills/nuxt-ui/` (từ repo ui-4) |
| **Ant Design** | `skills/ant-design/` (spec + design.md từ ant-design-master) |
| **Search DB** | `.shared/ui-ux-master/scripts/search.py` |
| **Workflow craft** | `workflows/ui-ux-master.md` → `/ui-ux-master` |
| **Agent FE** | `agents/frontend-specialist.md` |
| Psychology / audit | `skills/frontend-design`, `skills/web-design-guidelines` |
| Legacy | `ui-ux-pro-max` = stub → master |

```bash
# Từ project root
python .agent/.shared/ui-ux-master/scripts/search.py "fintech saas" --design-system -p "MyApp"
```

### Cài `ui-ux-master` sang agent khác (1 skill)

```text
Copy folder:  .agent/skills/ui-ux-master/
Optional:     .agent/.shared/ui-ux-master/   (nếu agent không nằm cạnh .agent)
```

Skill **tự có** `data/` + `scripts/` fallback khi không có `.shared`.

---

## Cấu trúc

```text
.agent/
├── README.md / ARCHITECTURE.md
├── agents/           # persona
├── skills/           # knowledge modules
├── workflows/        # slash procedures
├── rules/            # always-on
├── scripts/          # verify_all, checklist, …
└── .shared/ui-ux-master/   # design intelligence engine
```

Chi tiết catalog: [ARCHITECTURE.md](ARCHITECTURE.md).
