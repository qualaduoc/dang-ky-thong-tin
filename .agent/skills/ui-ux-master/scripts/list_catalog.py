#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""List UI library catalog for design-suggest. Run from any cwd."""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "library" / "catalog" / "manifest.json"


def main() -> int:
    ap = argparse.ArgumentParser(description="List ui-ux-master library catalog")
    ap.add_argument("--surface", help="Filter by surface tag")
    ap.add_argument("--industry", help="Filter recipes by industry")
    ap.add_argument("--kind", choices=["all", "recipes", "blocks", "external"], default="all")
    ap.add_argument("--json", action="store_true", help="Raw JSON subset")
    args = ap.parse_args()

    if not MANIFEST.exists():
        print(f"Missing manifest: {MANIFEST}", file=sys.stderr)
        return 1

    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    surface = (args.surface or "").lower()
    industry = (args.industry or "").lower()

    def match_surface(item: dict) -> bool:
        if not surface:
            return True
        s = item.get("surface") or []
        if isinstance(s, str):
            s = [s]
        return surface in [x.lower() for x in s]

    def match_industry(item: dict) -> bool:
        if not industry:
            return True
        inds = item.get("industries") or []
        return industry in [x.lower() for x in inds]

    out = {"recipes": [], "blocks": [], "external": []}

    if args.kind in ("all", "recipes"):
        for r in data.get("recipes", []):
            if match_surface(r) and match_industry(r):
                out["recipes"].append(r)

    if args.kind in ("all", "blocks"):
        for b in data.get("blocks", []):
            if match_surface(b):
                out["blocks"].append(b)

    if args.kind in ("all", "external"):
        for e in data.get("external", []):
            if match_surface(e) and match_industry(e):
                out["external"].append(e)

    if args.json:
        print(json.dumps(out, ensure_ascii=False, indent=2))
        return 0

    print(f"# UI catalog ({MANIFEST})")
    print(f"protocol: {data.get('protocol')}  version: {data.get('version')}\n")

    if out["recipes"]:
        print("## Recipes")
        for r in out["recipes"]:
            d = r.get("dials") or {}
            print(f"- {r['id']}: {r.get('title')}  dials={d}  file={r.get('file')}")
        print()

    if out["blocks"]:
        print("## Blocks")
        for b in out["blocks"]:
            print(f"- {b['id']}: {b.get('title')}  [{b.get('category')}]  file={b.get('file')}")
        print()

    if out["external"]:
        print("## External")
        for e in out["external"]:
            print(f"- {e.get('id')}: {e.get('title')}  entry={e.get('entry')}")
    else:
        print("## External\n(empty — drop packs into library/external/ and update manifest)\n")

    print("## Selection rules")
    for k, v in (data.get("selection_rules") or {}).items():
        print(f"- {k}: {v}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
