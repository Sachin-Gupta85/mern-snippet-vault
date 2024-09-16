from search import score, rank


SNIPS = [
    {"title": "Debounce", "code": "const debounce = ()=>{}", "tags": ["util", "timing"]},
    {"title": "Quicksort", "code": "def quicksort(a): pass", "tags": ["algo", "sort"]},
    {"title": "Fetch JSON", "code": "await fetch(url)", "tags": ["http"]},
]


def test_score_weights():
    assert score(SNIPS[0], "debounce") == 3 + 1          # title + code
    assert score(SNIPS[1], "sort") == 3 + 2 + 1          # title+tag+code all contain "sort"
    assert score(SNIPS[2], "nomatch") == 0
    assert score(SNIPS[0], "") == 0


def test_rank_orders_by_relevance():
    ranked = rank(SNIPS, "sort")
    assert ranked[0]["title"] == "Quicksort"
    # only matching snippets are returned
    assert all("sort" in (s["title"] + " ".join(s["tags"]) + s["code"]).lower() for s in ranked)


def test_rank_excludes_zero_and_breaks_ties_by_title():
    data = [
        {"title": "Beta", "code": "x", "tags": ["z"]},
        {"title": "Alpha", "code": "x", "tags": ["z"]},
    ]
    # both match "z" (tag) only -> equal score, sorted by title
    assert [s["title"] for s in rank(data, "z")] == ["Alpha", "Beta"]
    assert rank(data, "nope") == []
