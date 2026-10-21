#!/usr/bin/env python3
"""Merge the event lists of round Y, find the same event across sources, estimate the true number of events.

Run:  python scripts/census_merge.py
Reads every research/census/*.csv except merged_events.csv. Each list has the columns
source, world, name, city, country_iso2, date_start, date_end, price_eur, listing_url, notes
(world = latin | breaking | hyrox; date_start ISO; price_eur optional). One file per source and world,
for example research/census/latin_goandance.csv.

Writes research/census/merged_events.csv (one row per distinct event, with the sources that list it)
and prints, per world: events per source, overlaps, the Chapman capture-recapture estimate of the total
for each pair of sources, events per country and per period. Standard library only.
"""

import csv
import glob
import itertools
import os
import re
import unicodedata
from collections import Counter, defaultdict
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CENSUS = os.path.join(ROOT, "research", "census")
OUT = os.path.join(CENSUS, "merged_events.csv")
TODAY = date(2026, 10, 21)
STOP = {"the", "festival", "fest", "congress", "congreso", "congresso", "kongress", "international", "int",
        "edition", "ed", "weekend", "weekender", "event", "salsa", "bachata", "breaking", "battle", "jam",
        "dance", "danza", "baile", "tanz", "de", "di", "la", "le", "el", "and", "y", "e", "et", "und", "vol",
        "hyrox", "world", "championship", "championships", "open", "cup"}
MAX_DAYS = 3        # same event if the start dates differ by at most this
MIN_JACCARD = 0.5   # and the names share at least this share of distinctive words


def norm_tokens(name):
    text = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode().lower()
    words = re.findall(r"[a-z]+", text)
    return {w for w in words if w not in STOP and len(w) > 1}


def parse_date(s):
    try:
        y, m, d = (int(x) for x in s[:10].split("-"))
        return date(y, m, d)
    except (ValueError, AttributeError):
        return None


def period(d):
    if d is None:
        return "unknown"
    if d > TODAY:
        return "next 12 months"
    if (TODAY - d).days <= 365:
        return "past 0-12 months"
    if (TODAY - d).days <= 730:
        return "past 12-24 months"
    return "older"


def same_event(a, b):
    if a["world"] != b["world"] or a["country_iso2"] != b["country_iso2"]:
        return False
    if a["_d"] and b["_d"] and abs((a["_d"] - b["_d"]).days) > MAX_DAYS:
        return False
    same_city = a["city"].strip().lower() == b["city"].strip().lower() and a["city"].strip() != ""
    if same_city and a["_d"] and a["_d"] == b["_d"]:
        return True  # same city, same start day, same world: one event under two names
    ta, tb = a["_t"], b["_t"]
    if not ta or not tb:
        return False
    return len(ta & tb) / len(ta | tb) >= MIN_JACCARD


def chapman(n1, n2, m):
    return (n1 + 1) * (n2 + 1) / (m + 1) - 1


def main():
    rows = []
    for path in sorted(glob.glob(os.path.join(CENSUS, "*.csv"))):
        if os.path.basename(path) == "merged_events.csv":
            continue
        with open(path, encoding="utf-8") as handle:
            for r in csv.DictReader(handle):
                r["_d"] = parse_date(r.get("date_start", ""))
                r["_t"] = norm_tokens(r.get("name", ""))
                r["world"] = r.get("world", "").strip().lower()
                r["country_iso2"] = r.get("country_iso2", "").strip().upper()
                rows.append(r)
    if not rows:
        print("No lists in research/census/ yet.")
        return 0

    clusters = []  # each: list of rows
    for r in rows:
        for c in clusters:
            if any(same_event(r, x) for x in c):
                c.append(r)
                break
        else:
            clusters.append([r])

    with open(OUT, "w", encoding="utf-8", newline="") as handle:
        w = csv.writer(handle, lineterminator="\n")
        w.writerow(["event_key", "world", "name", "city", "country_iso2", "date_start", "period", "sources", "n_sources", "price_eur"])
        for i, c in enumerate(clusters, 1):
            first = c[0]
            prices = [x.get("price_eur", "") for x in c if x.get("price_eur", "")]
            w.writerow([f"K{i:05d}", first["world"], first["name"], first["city"], first["country_iso2"],
                        first.get("date_start", ""), period(first["_d"]), ";".join(sorted({x["source"] for x in c})),
                        len({x["source"] for x in c}), prices[0] if prices else ""])
    print(f"Wrote {OUT}: {len(rows)} listings, {len(clusters)} distinct events")

    by_world = defaultdict(list)
    for c in clusters:
        by_world[c[0]["world"]].append(c)
    for world, cs in sorted(by_world.items()):
        print(f"\n## {world}: {len(cs)} distinct events")
        sources = Counter(s for c in cs for s in {x['source'] for x in c})
        for s, n in sources.most_common():
            print(f"- {s}: {n} events")
        print("Pairwise overlap and Chapman estimate of the total (assumes the two lists are independent):")
        for a, b in itertools.combinations(sorted(sources), 2):
            sets = [{x["source"] for x in c} for c in cs]
            n1 = sum(1 for s in sets if a in s)
            n2 = sum(1 for s in sets if b in s)
            m = sum(1 for s in sets if a in s and b in s)
            est = chapman(n1, n2, m)
            print(f"  {a} ({n1}) x {b} ({n2}): {m} in both -> about {est:,.0f} events in total; "
                  f"{a} covers about {n1 / est:.0%}, {b} about {n2 / est:.0%}" if est > 0 else f"  {a} x {b}: no estimate")
        print("By period:", dict(Counter(period(c[0]["_d"]) for c in cs)))
        print("Top countries:", Counter(c[0]["country_iso2"] for c in cs).most_common(12))
        print("Top cities:", Counter((c[0]["city"], c[0]["country_iso2"]) for c in cs).most_common(12))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
