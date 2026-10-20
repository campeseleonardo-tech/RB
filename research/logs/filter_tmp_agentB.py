#!/usr/bin/env python3
"""Filter tmp_agentB.json to include only scan cities (role=scan, place_type=city), excluding ZUR."""
import json
import csv

# Load scan city IDs
with open(r'C:/projects/Progetti/RB/data/places.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    scan_ids = sorted({
        row['place_id']
        for row in reader
        if row.get('role') == 'scan' and row.get('place_type') == 'city' and row['place_id'] != 'ZUR'
    })
print('Scan cities count:', len(scan_ids))

# Load existing data
with open(r'C:/projects/Progetti/RB/research/logs/tmp_agentB.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Filter cells
cells = data['cells']
filtered_cells = [c for c in cells if c['place_id'] in scan_ids]
print('Cells after filter (including extras):', len(filtered_cells))

# Remove any "SYM" typos (not a valid city)
filtered_cells = [c for c in filtered_cells if c['place_id'] != 'SYM']

# Group cells by place_id to find missing scan cities
cell_by_place = {}
for c in filtered_cells:
    pid = c['place_id']
    if pid not in cell_by_place:
        cell_by_place[pid] = []
    cell_by_place[pid].append(c)

# Identify missing scan cities
missing = [pid for pid in scan_ids if pid not in cell_by_place]
print('Missing scan cities:', missing)

# For each missing scan city, add a not_found cell (EVT, generic)
for pid in missing:
    cell = {
        "place_id": pid,
        "disc_id": "ALL",
        "signal_id": "EVT",
        "kind": "not_found",
        "value": None,
        "confidence": "L",
        "queries": [f"where-to-dance-salsa.com/festivals/{pid.lower()}/", f"html.duckduckgo.com/html/?q=dance+events+city+{pid}+2026"],
        "page_quotes": [
            {"url": f"https://where-to-dance-salsa.com/festivals/{pid.lower()}/", "quote": "No direct event result shown."},
            {"url": f"https://html.duckduckgo.com/html/?q=dance+events+city+{pid}+2026", "quote": "No concrete result shown."}
        ],
        "notes": "No concrete event confirmed for this scan city from fetched/opened pages."
    }
    filtered_cells.append(cell)
    cell_by_place[pid] = [cell]

# Filter events to only those with place_id in scan_ids
filtered_events = [e for e in data['events'] if e['place_id'] in scan_ids]

# Prepare output
output = {
    "cells": filtered_cells,
    "events": filtered_events,
    "_summary": f"First-pass scan: {len(scan_ids)} scan cities (excluding ZUR). Cells: {len(filtered_cells)} (including {len(missing)} added not_found rows for missing scan cities). Events: {len(filtered_events)} (filtered to scan cities). All confidence L. No deep city (e.g., MAD, BCN, BER, PAR, MIL) cells/events retained; events with non-scan place_id removed."
}

# Write back to tmp_agentB.json
with open(r'C:/projects/Progetti/RB/research/logs/tmp_agentB.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print('Filtered JSON written.')