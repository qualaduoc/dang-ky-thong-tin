---
name: ant-design
description: >
  Build enterprise React UIs with Ant Design (antd). Design language (Natural, Certain,
  Meaningful, Growing), design tokens / ConfigProvider theming, component selection for
  forms, tables, layouts, feedback. Use when project uses antd, Ant Design, AntD, enterprise
  admin/dashboard React UI, or user asks for Ant Design patterns. Complements ui-ux-master
  for visual direction; this skill owns Ant Design implementation.
---

# Ant Design (React) — Agent Skill

Enterprise design system + React component library. **Do not copy the full monorepo into projects** — use `antd` from npm and this skill's references.

Official AI resources (also vendored offline under `references/`):

| Resource | Local / remote |
|----------|----------------|
| Design language file | `references/design-language.md` · https://ant.design/design.md |
| LLMs index | `references/llms.txt` · https://ant.design/llms.txt |
| Full component docs (large) | https://ant.design/llms-full.txt (fetch when needed) |
| Spec (design guidelines) | `references/spec/*.en-US.md` |
| Theme API | `references/docs/customize-theme.en-US.md` |
| For agents | `references/docs/for-agents.en-US.md` |

## When to load

| Task | Load |
|------|------|
| Match Ant Design look / enterprise admin | `references/design-language.md` + `references/spec/values.en-US.md` |
| Colors / type / layout / motion principles | `references/spec/colors`, `font`, `layout`, `motion`, `visual` |
| Forms / data entry | `spec/data-entry` + `spec/research-form` |
| Tables / lists | `spec/data-list` + `spec/data-display` |
| Navigation / workbench | `spec/navigation` + `spec/research-workbench` |
| Feedback / empty / exception | `spec/feedback` + research-empty/exception |
| Theme tokens / dark / brand | `docs/customize-theme` + design-language |
| Component API detail | Prefer CLI/MCP or `https://ant.design/components/<name>.md` |

## Install (project)

```bash
npm install antd @ant-design/icons
# React 18/19 — follow current antd major docs
```

```tsx
import { ConfigProvider, App, theme } from 'antd';
import 'antd/dist/reset.css'; // or antd.css per major version

export function Root({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm, // or theme.darkAlgorithm / compactAlgorithm
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
```

## Core rules

1. **Wrap with `ConfigProvider` + `App`** for theme, message/modal context.
2. Prefer **antd components** over hand-rolled enterprise chrome (Table, Form, Layout, Menu, Modal).
3. Customize via **Design Tokens** (`theme.token` / component tokens) — not ad-hoc CSS fighting antd.
4. Forms: `Form` + `Form.Item` rules; labels visible; align with `spec/data-entry`.
5. Dense admin: consider `theme.compactAlgorithm`.
6. Icons: `@ant-design/icons` — one style family.
7. When generating **marketing landings**, still use **ui-ux-master** recipes; antd shines for **product/admin**.

## CLI / MCP (optional, powerful)

```bash
npm i -g @ant-design/cli
antd list
antd info Button
antd doc Table
antd token Button
antd design.md
antd mcp
```

MCP:

```json
{ "mcpServers": { "antd": { "command": "npx", "args": ["-y", "@ant-design/cli", "mcp"] } } }
```

## With ui-ux-master

| Layer | Owner |
|-------|--------|
| 3 directions / anti-slop / landing recipes | `ui-ux-master` + `/design-suggest` |
| Enterprise product shell, tables, forms | **this skill** |
| Stack search CSV | `search.py --stack` if available |

When user picks “enterprise Ant Design dashboard”:

1. design-suggest → product register, density high  
2. Load this skill + `design-language.md`  
3. Implement with Layout/Menu/Table/Form  

## Component cheat (common)

| Need | Component |
|------|-----------|
| App shell | `Layout`, `Menu`, `Breadcrumb` |
| Data table | `Table`, `Table.Summary` |
| Filters | `Form` layout inline + `Select`/`DatePicker` |
| CRUD drawer | `Drawer` + `Form` |
| Confirm | `Modal.confirm` or `Popconfirm` |
| Feedback | `message` / `notification` via `App.useApp()` |
| Empty | `Empty` |
| Descriptions | `Descriptions` |
| Steps wizard | `Steps` |
| Upload | `Upload` |

Single-component deep docs: `https://ant.design/components/<kebab-name>.md`

## Out of scope here

- Full antd source tree (do not vendor `components/*` implementation into app)
- Maintainer skills (changelog/PR) from ant-design monorepo
