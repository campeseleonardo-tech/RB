#!/usr/bin/env python3
"""Count result entries in saved PDF/HTML pages under scripts/input/.

One file is treated as one result segment. The parser intentionally uses only
saved files; it does not make network requests. PDF support uses pypdf when it
is already installed. HTML result rows should put the entrant name(s) in the
first non-numeric table cell after the rank.
"""

from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path

INPUT = Path(__file__).resolve().parent / "input"
PAIR_MARKERS = re.compile(r"\b(?:duo|couple|paar|pareja|2\s*vs\s*2|2x2|jack\s*(?:and|&)\s*jill)\b", re.I)
NAME_SPLIT = re.compile(r"\s+(?:/|&|\+|\band\b|\by\b)\s+", re.I)
RESULT_LINE = re.compile(r"^\s*\d{1,3}[.)]?\s+(.+?)\s*$")
REGIONS = re.compile(
    r"\s+(?=(?:Comunidad de Madrid|Catalu(?:ñ|n)a|Galicia|Andaluc(?:í|i)a|Pa(?:í|i)s Vasco|"
    r"Comunitat Valenciana|Arag(?:ó|o)n|Extremadura|Castilla|Murcia|Cantabria|Asturias|Navarra|"
    r"La Rioja|Canarias|Baleares)\b)", re.I
)


class ResultTableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.rows: list[list[str]] = []
        self._row: list[str] | None = None
        self._cell: list[str] | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "tr":
            self._row = []
        elif tag in {"td", "th"} and self._row is not None:
            self._cell = []

    def handle_data(self, data: str) -> None:
        if self._cell is not None:
            self._cell.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag in {"td", "th"} and self._cell is not None and self._row is not None:
            self._row.append(" ".join(" ".join(self._cell).split()))
            self._cell = None
        elif tag == "tr" and self._row is not None:
            self.rows.append(self._row)
            self._row = None


def pdf_text(path: Path) -> str:
    try:
        from pypdf import PdfReader
    except ImportError as exc:
        raise RuntimeError("pypdf is not installed; no package was installed") from exc
    return "\n".join(page.extract_text() or "" for page in PdfReader(str(path)).pages)


def html_rows(text: str) -> list[str]:
    parser = ResultTableParser()
    parser.feed(text)
    names = []
    for row in parser.rows:
        if len(row) < 2 or not re.fullmatch(r"\d{1,3}[.)]?", row[0].strip()):
            continue
        candidate = next((cell for cell in row[1:] if cell and not re.fullmatch(r"[\d.,%+-]+", cell)), "")
        if candidate:
            names.append(candidate)
    return names


def pdf_rows(text: str) -> list[str]:
    names = []
    for line in text.splitlines():
        match = RESULT_LINE.match(line)
        if not match:
            continue
        body = match.group(1)
        # FEBD result exports put the full name (then AKA and club) before the
        # autonomous-community column. Keep that complete, repeatable prefix.
        region = REGIONS.search(body)
        if region:
            body = body[:region.start()].strip()
        if len(body.split()) >= 2:
            names.append(body)
    return names


def normalize(name: str) -> str:
    return " ".join(re.sub(r"[^\w ]", " ", name.casefold(), flags=re.UNICODE).split())


def main() -> None:
    files = sorted(p for p in INPUT.rglob("*") if p.is_file() and p.suffix.lower() in {".pdf", ".html", ".htm"})
    total_entries = couples = solos = 0
    distinct: set[str] = set()
    for path in files:
        if path.suffix.lower() == ".pdf":
            text = pdf_text(path)
            names = pdf_rows(text)
        else:
            text = path.read_text(encoding="utf-8", errors="replace")
            names = html_rows(text)
        pair_segment = bool(PAIR_MARKERS.search(path.stem + " " + text[:5000]))
        total_entries += len(names)
        if pair_segment:
            couples += len(names)
        else:
            solos += len(names)
        for name in names:
            for person in NAME_SPLIT.split(name):
                person = normalize(person)
                if person:
                    distinct.add(person)
        print(f"{path.name}: entries={len(names)} type={'couples' if pair_segment else 'solos'}")
    print(f"segments read: {len(files)}")
    print(f"entries: {total_entries}")
    print(f"distinct names: {len(distinct)}")
    print(f"couples: {couples}")
    print(f"solos: {solos}")


if __name__ == "__main__":
    main()
