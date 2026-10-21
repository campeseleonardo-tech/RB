#!/usr/bin/env python3
"""Robustness checks for outputs/analysis.md (plan A, 2026-10-21): confidence intervals and tests.

Run:  python scripts/robustness.py
Reads data/*.csv only and prints the tables used in section "Robustness, limits and possible bias".
Seeded, so the output is the same at every run. Standard library only.
"""

import csv
import os
import random
import re
import statistics

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEED = 20261021
N_BOOT = 10000
N_PERM = 10000

# The two comparison sets of round W (research/logs/W_round.md), as event ids.
LATIN_SET = ["E000074", "E000072", "E000071", "E000075", "E000139", "E000140", "E000141", "E000142",
             "E000152", "E000153", "E000086", "E000073", "E000154", "E000155", "E000156", "E000157",
             "E000158", "E000159", "E000160", "E000161"]
BREAKING_SET = ["E000110", "E000066", "E000162", "E000070", "E000163", "E000164", "E000165", "E000166",
                "E000167", "E000168", "E000169", "E000084", "E000090", "E000126", "E000128", "E000170",
                "E000171", "E000172", "E000173", "E000174"]
EXCLUDED = {"E000170": "WDSF account covers all dancesport"}
IG = "Instagram followers (profile page)"


def load(name):
    with open(os.path.join(ROOT, "data", name), encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def event_followers(facts, event_ids):
    out = {}
    for f in facts:
        if f["unit"] != IG or f["evidence_type"] == "not_found":
            continue
        for e in re.findall(r"E\d{6}", f["notes"]):
            if e in event_ids and e not in EXCLUDED and e not in out:
                out[e] = float(f["value"])
    return out


def dancer_followers(facts, athletes):
    out = {"Latin": [], "Breaking": []}
    for f in facts:
        if f["unit"] != IG or f["evidence_type"] == "not_found" or f["place_id"] != "GLOBAL":
            continue
        m = re.search(r"A\d{5}", f["notes"])
        if m and m.group(0) in athletes and f["task_id"] == "U3.2":
            out["Latin" if f["disc_id"].startswith("CAR-") else "Breaking"].append(float(f["value"]))
    return out


def boot_ci(rng, xs, stat=statistics.median):
    vals = sorted(stat(rng.choices(xs, k=len(xs))) for _ in range(N_BOOT))
    return vals[int(0.05 * N_BOOT)], vals[int(0.95 * N_BOOT)]


def superiority(a, b):
    """Probability that a random value of b is larger than a random value of a (ties count half)."""
    wins = sum(1.0 if y > x else 0.5 if y == x else 0.0 for x in a for y in b)
    return wins / (len(a) * len(b))


def perm_p(rng, a, b):
    """Two-sided permutation test on the difference of medians."""
    obs = abs(statistics.median(b) - statistics.median(a))
    pool = a + b
    hits = 0
    for _ in range(N_PERM):
        rng.shuffle(pool)
        if abs(statistics.median(pool[len(a):]) - statistics.median(pool[:len(a)])) >= obs:
            hits += 1
    return hits / N_PERM


def ratio_ci(rng, num, den):
    vals = sorted(statistics.median(rng.choices(num, k=len(num))) / statistics.median(rng.choices(den, k=len(den)))
                  for _ in range(N_BOOT))
    return vals[int(0.05 * N_BOOT)], vals[int(0.95 * N_BOOT)]


def fmt(x):
    return f"{x:,.0f}" if x >= 100 else f"{x:.2f}"


def main():
    rng = random.Random(SEED)
    facts = load("facts.csv")
    athletes = {a["athlete_id"] for a in load("athletes.csv")}
    lat = event_followers(facts, set(LATIN_SET))
    brk = event_followers(facts, set(BREAKING_SET))
    la, br = list(lat.values()), list(brk.values())
    d = dancer_followers(facts, athletes)

    print("## Event accounts, Instagram followers (W sets, Red Bull excluded)")
    print("| Set | n with a value | Median | 90% CI of the median (bootstrap) |")
    print("|---|---|---|---|")
    for name, xs, full in (("Latin", la, LATIN_SET), ("Breaking", br, BREAKING_SET)):
        lo, hi = boot_ci(rng, xs)
        print(f"| {name} | {len(xs)} of {len(full) - sum(1 for e in full if e in EXCLUDED)} | {fmt(statistics.median(xs))} | {fmt(lo)} - {fmt(hi)} |")
    print(f"P(random breaking event > random Latin event) = {superiority(la, br):.2f}; "
          f"permutation test on medians, two-sided p = {perm_p(rng, la, br):.3f}")
    print()
    print("## Top 30 dancers, Instagram followers")
    print("| World | n | Median | 90% CI |")
    print("|---|---|---|---|")
    for name in ("Latin", "Breaking"):
        lo, hi = boot_ci(rng, d[name])
        print(f"| {name} | {len(d[name])} | {fmt(statistics.median(d[name]))} | {fmt(lo)} - {fmt(hi)} |")
    print(f"P(random breaking dancer > random Latin dancer) = {superiority(d['Latin'], d['Breaking']):.2f}; "
          f"permutation p = {perm_p(rng, d['Latin'], d['Breaking']):.3f}")
    print(f"Totals: Latin {fmt(sum(d['Latin']))}, Breaking {fmt(sum(d['Breaking']))}")
    print()
    print("## H3 ratio: median top-30 dancer / median event account")
    for name, ev in (("Latin", la), ("Breaking", br)):
        lo, hi = ratio_ci(rng, d[name], ev)
        print(f"- {name}: {statistics.median(d[name]) / statistics.median(ev):.2f} (90% CI {lo:.2f} - {hi:.2f})")
    print()
    print("## Prices and stated sizes in the W sets")
    prices = {}
    sizes = {}
    for f in facts:
        for e in re.findall(r"E\d{6}", f["notes"]):
            world = "Latin" if e in LATIN_SET else "Breaking" if e in BREAKING_SET else None
            if not world or f["evidence_type"] == "not_found" or not f["value"]:
                continue
            if f["unit"] in ("EUR full pass, main event", "EUR spectator ticket, main event"):
                prices.setdefault(world, {})[e] = float(f["value"])
            if f["unit"] in ("participants stated (dancers)", "spectators stated"):
                sizes.setdefault((world, f["unit"]), {})[e] = float(f["value"])
    for world, p in prices.items():
        v = sorted(p.values())
        print(f"- {world} prices: n = {len(v)} of 20, median {fmt(statistics.median(v))}, range {fmt(v[0])} - {fmt(v[-1])}")
    for (world, unit), s in sizes.items():
        print(f"- {world} {unit}: n = {len(s)} of 20, values {', '.join(fmt(x) for x in sorted(s.values()))}")


if __name__ == "__main__":
    main()
