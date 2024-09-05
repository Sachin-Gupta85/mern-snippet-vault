#!/usr/bin/env python3
"""Relevance ranking for the snippet vault.

A Python companion that ranks snippets for a query with simple weighted scoring:
a match in the title is worth more than a tag match, which is worth more than a
match in the code body. Run as:

    python3 search.py snippets.json "query"

snippets.json is a JSON list of {title, code, tags}.
"""
from __future__ import annotations

import json
import sys

W_TITLE, W_TAG, W_CODE = 3, 2, 1


def score(snippet: dict, query: str) -> int:
    q = query.lower().strip()
    if not q:
        return 0
    s = 0
    if q in snippet.get("title", "").lower():
        s += W_TITLE
    if any(q in t.lower() for t in snippet.get("tags", [])):
        s += W_TAG
    if q in snippet.get("code", "").lower():
        s += W_CODE
    return s


def rank(snippets: list[dict], query: str) -> list[dict]:
    """Snippets with a non-zero score, most relevant first (ties by title)."""
    scored = [(score(s, query), s) for s in snippets]
    hits = [(sc, s) for sc, s in scored if sc > 0]
    hits.sort(key=lambda pair: (-pair[0], pair[1].get("title", "")))
    return [s for _, s in hits]


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        sys.stderr.write('usage: search.py <snippets.json> "<query>"\n')
        return 2
    snippets = json.load(open(argv[0], encoding="utf-8"))
    for s in rank(snippets, argv[1]):
        print(f'{score(s, argv[1])}  {s.get("title", "")}')
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
