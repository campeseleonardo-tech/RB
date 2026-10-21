#!/usr/bin/env python3
"""Build viewer/atlas.html: one self-contained page with all the data and code inside.

Run:  python viewer/build_viewer.py [folder]
Reads data/ when it holds at least one data row, otherwise viewer/sample_data/ (the page then
shows a SAMPLE DATA banner). Stops with the validator messages if the data has errors.
Inlined: viewer/src/page.html, viewer/src/core.js, viewer/src/analysis.js, viewer/src/views.js, viewer/lib/countries_110m.json.
The legend text in the About page is read from project/data_schema.md, so it matches the schema.
Standard library only; the result needs no internet.
"""

import datetime
import hashlib
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

from validate_data import check_folder, pick_folder, TABLES  # noqa: E402

SRC_PAGE = os.path.join(HERE, "src", "page.html")
SRC_JS = [os.path.join(HERE, "src", "core.js"), os.path.join(HERE, "src", "analysis.js"),
          os.path.join(HERE, "src", "views.js")]
GEO_FILE = os.path.join(HERE, "lib", "countries_110m.json")
SCHEMA_FILE = os.path.join(ROOT, "project", "data_schema.md")
OUT_PAGE = os.path.join(HERE, "atlas.html")

SCHEMA_KEYS = ["evidence_type", "confidence", "access_status", "place_type", "role", "scope",
               "red_bull_involvement"]


def read_schema_text():
    """Take the wording of the controlled values and rule 8 from the data contract, unchanged."""
    if not os.path.isfile(SCHEMA_FILE):
        return {}
    with open(SCHEMA_FILE, encoding="utf-8") as handle:
        lines = handle.read().splitlines()
    found = {}
    section = None
    for line in lines:
        if line.startswith("## "):
            section = line[3:].strip()
            continue
        if section and section.startswith("2.") and line.startswith("- `"):
            m = re.match(r"^- `(\w+)`(?: \(\w+\))?: (.*)$", line)
            if m and m.group(1) in SCHEMA_KEYS and m.group(1) not in found:
                found[m.group(1)] = m.group(2).strip()
        if section and section.startswith("1.") and line.startswith("8. "):
            found["rule_absent"] = line[3:].strip()
    return found


def main(argv):
    folder, is_sample = pick_folder(argv[1] if len(argv) > 1 else None)
    print(f"Building from: {folder}")
    report, tables = check_folder(folder)
    if report.errors:
        for line in report.errors:
            print(line)
        print("The viewer was NOT built: fix the errors above first.")
        return 1

    columns = {name: TABLES[name]["columns"] for name in TABLES}
    # Compact form: column names are not repeated on every row (keeps 50,000 rows well under 10 MB).
    table_data = {name: {"r": [row["_row"] for row in tables[name]],
                         "v": [[row[col] for col in columns[name]] for row in tables[name]]}
                  for name in TABLES}
    body = json.dumps({"tables": table_data, "columns": columns}, ensure_ascii=False, sort_keys=True)
    fingerprint = hashlib.sha1(body.encode("utf-8")).hexdigest()[:12]
    build = {
        "date": datetime.date.today().isoformat(),
        "source": "viewer/sample_data (fake)" if is_sample else "data/",
        "fingerprint": fingerprint,
        "sample": is_sample,
    }
    payload = json.dumps({"build": build, "tables": table_data, "columns": columns,
                          "schema": read_schema_text()}, ensure_ascii=False, separators=(",", ":"))
    payload = payload.replace("</", "<\\/")

    js = "\n".join(open(path, encoding="utf-8").read() for path in SRC_JS)
    if "</script" in js.lower():
        print("The viewer code contains '</script': the page would break. Build stopped.")
        return 1
    with open(GEO_FILE, encoding="utf-8") as handle:
        geo = json.dumps(json.loads(handle.read()), ensure_ascii=False, separators=(",", ":"))
    banner = ("<div class=\"sample-banner\">SAMPLE DATA: fake numbers for testing. "
              "Do not use for decisions.</div>") if is_sample else ""

    with open(SRC_PAGE, encoding="utf-8") as handle:
        page = handle.read()
    replacements = (("__SAMPLE_BANNER__", banner), ("__DATA_JSON__", payload),
                    ("__GEO_JSON__", geo), ("__APP_JS__", js))
    for token, value in replacements:
        if page.count(token) != 1:
            print(f"The page template is broken: {token} must appear exactly once.")
            return 1
        page = page.replace(token, value)

    with open(OUT_PAGE, "w", encoding="utf-8", newline="\n") as handle:
        handle.write(page)
    rows = sum(len(v) for v in tables.values())
    print(f"Wrote {OUT_PAGE} ({os.path.getsize(OUT_PAGE) // 1024} KB, {rows} rows, "
          f"fingerprint {fingerprint}).")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
