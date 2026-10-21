/* Dance Scene Atlas viewer: views (overview, grid, geographic map, concept map, sources, about).
   Counts and raw evidence only. No scores, no rankings. View only. */
(function () {
  "use strict";

  var A = window.ATLAS;
  var T = A.T;
  var COLS = A.COLS;
  var IDX = A.IDX;
  var BUILD = A.BUILD;
  var esc = A.esc;
  var badge = A.badge;
  var EVIDENCE = ["found", "stated_by_organiser", "inferred", "not_found"];
  var REGION_ORDER = ["europe", "north_america", "latin_america", "asia", "africa", "oceania"];
  var ROLE_ORDER = ["deep", "benchmark", "scan", "country", "global"];
  var FACTS = T["facts.csv"];
  var EVENTS = T["events.csv"];
  var ORGS = T["organisations.csv"];
  var ATHLETES = T["athletes.csv"];
  var PLACES = T["places.csv"];
  var DISCS = T["disciplines.csv"];
  var SIGNALS = T["signals.csv"];
  var SOURCES = T["sources.csv"];
  var RELATIONS = T["relations.csv"];

  function group(rows, keyFn) {
    var map = {};
    rows.forEach(function (r) {
      var k = keyFn(r);
      (map[k] || (map[k] = [])).push(r);
    });
    return map;
  }

  var FACTS_PD = group(FACTS, function (r) { return r.place_id + "|" + r.disc_id; });
  var EVENTS_PD = group(EVENTS, function (r) { return r.place_id + "|" + r.disc_id; });
  var ORGS_PD = group(ORGS, function (r) { return r.place_id + "|" + r.disc_id; });

  function yearOf(text) {
    var m = /^(\d{4})/.exec(text || "");
    return m ? Number(m[1]) : null;
  }

  function rowLink(table, row, text) {
    return '<a href="#" data-reg="' + A.registerRow(table, row) + '">' + esc(text || A.rowTitle(table, row)) + "</a>";
  }

  function listRows(table, rows, empty) {
    if (!rows.length) return '<p class="note">' + esc(empty || "No rows.") + "</p>";
    return "<ul class=\"plain\">" + rows.map(function (r) {
      return "<li>" + rowLink(table, r) + "</li>";
    }).join("") + "</ul>";
  }

  function placeName(id) {
    return IDX.place[id] ? IDX.place[id].name : id;
  }

  function discName(id) {
    return IDX.disc[id] ? IDX.disc[id].discipline : id;
  }

  function uniqueSources(rows) {
    var seen = {};
    rows.forEach(function (r) {
      var s = r.source_id || r.website_source_id;
      if (s) seen[s] = true;
    });
    return Object.keys(seen);
  }

  /* ---------- small helpers for bars ---------- */
  function bars(items) {
    var max = 1;
    items.forEach(function (it) { if (it.value > max) max = it.value; });
    return '<div class="bars">' + items.map(function (it) {
      var w = Math.round((it.value / max) * 100);
      var inner = it.onclick
        ? '<a href="#" data-go-link="' + esc(it.onclick) + '">' + esc(it.label) + "</a>"
        : esc(it.label);
      return '<div class="bar-row"><span class="bar-label">' + inner + '</span>' +
        '<span class="bar-track"><span class="bar-fill ' + (it.cls || "") + '" style="width:' + w + '%"></span></span>' +
        '<span class="bar-val">' + it.value + "</span></div>";
    }).join("") + "</div>";
  }

  /* ---------- overview ---------- */
  function viewOverview(el) {
    var countRows = A.TABLE_NAMES.map(function (tn) {
      return '<tr><td><a href="#/tables/' + encodeURIComponent(tn) + '">' + esc(A.FILE_LABEL[tn]) +
        "</a></td><td>" + T[tn].length + "</td><td><code>" + esc(tn) + "</code></td></tr>";
    }).join("");

    var evCounts = {}; var confCounts = {};
    EVIDENCE.forEach(function (e) { evCounts[e] = 0; });
    ["H", "M", "L"].forEach(function (c) { confCounts[c] = 0; });
    FACTS.forEach(function (f) {
      if (evCounts[f.evidence_type] !== undefined) evCounts[f.evidence_type]++;
      if (confCounts[f.confidence] !== undefined) confCounts[f.confidence]++;
    });
    var evBars = bars(EVIDENCE.map(function (e) {
      return { label: e.replace(/_/g, " "), value: evCounts[e], cls: "c-" + e,
        onclick: "facts.csv|evidence_type|" + e };
    }));
    var confBars = bars(["H", "M", "L"].map(function (c) {
      return { label: "confidence " + c, value: confCounts[c], cls: "c-conf-" + c,
        onclick: "facts.csv|confidence|" + c };
    }));

    var statusCounts = {};
    SOURCES.forEach(function (s) { statusCounts[s.access_status] = (statusCounts[s.access_status] || 0) + 1; });
    var srcBars = bars(["opened", "rendered", "blocked", "not_opened"].map(function (s) {
      return { label: s.replace(/_/g, " "), value: statusCounts[s] || 0, cls: "c-src-" + s,
        onclick: "sources.csv|access_status|" + s };
    }));

    // Gaps: deep and benchmark places x disciplines with no fact, or only not_found facts.
    var keyPlaces = PLACES.filter(function (p) { return p.role === "deep" || p.role === "benchmark"; });
    var discs = DISCS.filter(function (d) { return d.disc_id !== "ALL" && d.scope !== "out" && d.scope; });
    var gaps = [];
    keyPlaces.forEach(function (p) {
      discs.forEach(function (d) {
        var fs = FACTS_PD[p.place_id + "|" + d.disc_id] || [];
        var real = fs.filter(function (f) { return f.evidence_type !== "not_found"; });
        if (!real.length) {
          gaps.push({ place: p, disc: d, why: fs.length ? "only not found" : "no facts" });
        }
      });
    });

    // Conflicts: same place, discipline, signal and period with different values.
    var buckets = {};
    FACTS.forEach(function (f) {
      if (f.evidence_type === "not_found") return;
      var key = [f.place_id, f.disc_id, f.signal_id, f.period].join("|");
      var v = f.value || (f.value_low + "–" + f.value_high);
      (buckets[key] || (buckets[key] = { rows: [], values: {} }));
      buckets[key].rows.push(f);
      buckets[key].values[v] = true;
    });
    var conflicts = Object.keys(buckets).filter(function (k) {
      return Object.keys(buckets[k].values).length > 1;
    }).map(function (k) { return buckets[k].rows; });

    var log = T["review_log.csv"].slice().reverse().slice(0, 20);
    var logHtml = log.length ? '<div class="hscroll"><table class="data small"><thead><tr><th>date</th><th>item</th><th>issue</th><th>action</th></tr></thead><tbody>' +
      log.map(function (r) {
        return "<tr><td>" + esc(r.date) + "</td><td>" + esc(r.item) + "</td><td>" + esc(r.issue) + "</td><td>" + esc(r.action) + "</td></tr>";
      }).join("") + "</tbody></table></div>" : '<p class="note">The review log is empty.</p>';

    var gapHtml = gaps.length ? '<ul class="plain">' + gaps.slice(0, 200).map(function (g) {
      return '<li><a href="#" data-gap="' + esc(g.place.place_id + "|" + g.disc.disc_id) + '">' +
        esc(g.place.name) + " × " + esc(g.disc.discipline) + "</a> · " + esc(g.why) + "</li>";
    }).join("") + "</ul>" + (gaps.length > 200 ? '<p class="note">Showing 200 of ' + gaps.length + ".</p>" : "") :
      '<p class="note">No gaps for the deep and benchmark places.</p>';

    var conflictHtml = conflicts.length ? '<ul class="plain">' + conflicts.map(function (rows) {
      var f = rows[0];
      return "<li>" + esc(placeName(f.place_id)) + " × " + esc(discName(f.disc_id)) + " · " +
        esc((IDX.signal[f.signal_id] || {}).signal || f.signal_id) + " · " + esc(f.period) + ": " +
        rows.map(function (r) { return rowLink("facts.csv", r, (r.value || r.value_low + "–" + r.value_high)); }).join(" vs ") +
        "</li>";
    }).join("") + "</ul>" : '<p class="note">No conflicts: each place, discipline, signal and period has one value.</p>';

    el.innerHTML =
      "<h1>Overview</h1>" +
      '<p class="muted">Data quality at a glance. Counts and raw evidence only; no scores, no rankings. Click a number to open its rows.</p>' +
      '<section class="cards">' + A.TABLE_NAMES.slice(0, 11).map(function (tn) {
        return '<a class="card" href="#/tables/' + encodeURIComponent(tn) + '"><span class="card-n">' + T[tn].length +
          '</span><span class="card-t">' + esc(A.FILE_LABEL[tn]) + "</span></a>";
      }).join("") + "</section>" +
      "<h2>Facts by evidence type</h2>" + evBars +
      "<h2>Facts by confidence</h2>" + confBars +
      "<h2>Sources by access status</h2>" + srcBars +
      "<h2>Gaps</h2>" +
      '<p class="muted">Deep and benchmark places × pilot and adjacent disciplines, where there is no fact or only "not found" facts (' + gaps.length + " combinations).</p>" +
      gapHtml +
      "<h2>Conflicts</h2>" +
      '<p class="muted">Same place, discipline, signal and period, with different values. Both are kept (' + conflicts.length + " cases).</p>" +
      conflictHtml +
      "<h2>Latest review log lines</h2>" + logHtml +
      "<h2>Table sizes</h2>" +
      '<div class="hscroll"><table class="data small"><thead><tr><th>Table</th><th>Rows</th><th>File</th></tr></thead><tbody>' + countRows + "</tbody></table></div>";

    el.onclick = function (e) {
      var g = e.target.closest ? e.target.closest("a[data-gap]") : null;
      if (g) {
        e.preventDefault();
        var parts = g.getAttribute("data-gap").split("|");
        showCell(parts[0], parts[1]);
        return;
      }
      var link = e.target.closest ? e.target.closest("a[data-go-link]") : null;
      if (link) {
        e.preventDefault();
        var p = link.getAttribute("data-go-link").split("|");
        A.openTableFilter(p[0], p[1], p[2]);
      }
    };
  }

  /* ---------- grid ---------- */
  var gridState = { signal: "ALL", adjacent: false };

  function cellStats(placeId, discId) {
    var key = placeId + "|" + discId;
    var fs = (FACTS_PD[key] || []).filter(function (f) {
      return gridState.signal === "ALL" || f.signal_id === gridState.signal;
    });
    var evs = EVENTS_PD[key] || [];
    var orgs = (ORGS_PD[key] || []);
    var ev = { found: 0, stated: 0, nf: 0, inf: 0 };
    fs.forEach(function (f) {
      if (f.evidence_type === "found" || f.evidence_type === "stated_by_organiser") ev.found++;
      else if (f.evidence_type === "not_found") ev.nf++;
      else if (f.evidence_type === "inferred") ev.inf++;
    });
    var rb = "none";
    var rank = { found: 4, stated_by_organiser: 3, not_found: 2, confirmed_absent: 2, not_checked: 1 };
    evs.forEach(function (e) {
      var v = e.red_bull_involvement;
      if (rank[v] && (rb === "none" || rank[v] > rank[rb])) rb = v;
    });
    return { key: key, facts: fs, events: evs, orgs: orgs, ev: ev, rb: rb };
  }

  function rbMarker(rb) {
    if (rb === "found") return '<span class="rb rb-found" title="Red Bull is organiser or named sponsor of an event here">● Red Bull found</span>';
    if (rb === "stated_by_organiser") return '<span class="rb rb-stated" title="Stated by the organiser">◐ Red Bull stated</span>';
    if (rb === "not_found" || rb === "confirmed_absent") return '<span class="rb rb-nf" title="Searched: no Red Bull found">○ Red Bull not found</span>';
    return "";
  }

  function showCell(placeId, discId) {
    var c = cellStats(placeId, discId);
    var place = IDX.place[placeId];
    var disc = IDX.disc[discId];
    var srcs = uniqueSources(c.facts.concat(c.orgs));
    var html =
      '<p class="muted">' + esc(place ? place.name : placeId) + " × " + esc(disc ? disc.discipline : discId) +
      (gridState.signal !== "ALL" ? " · signal " + esc(gridState.signal) : " · all signals") + "</p>" +
      "<h3>Facts (" + c.facts.length + ")</h3>" +
      (c.facts.length ? '<ul class="plain">' + c.facts.map(function (f) {
        return "<li>" + rowLink("facts.csv", f) + " " + badge("evidence_type", f.evidence_type) + " " + badge("confidence", f.confidence) + "</li>";
      }).join("") + "</ul>" : '<p class="note">No facts in this cell.</p>') +
      "<h3>Events (" + c.events.length + ")</h3>" + listRows("events.csv", c.events, "No events in this cell.") +
      "<h3>Organisations (" + c.orgs.length + ")</h3>" + listRows("organisations.csv", c.orgs, "No organisations in this cell.") +
      "<h3>Sources (" + srcs.length + ")</h3>" +
      (srcs.length ? '<ul class="plain">' + srcs.map(function (s) {
        return "<li>" + A.sourceCell(s) + "</li>";
      }).join("") + "</ul>" : '<p class="note">No sources in this cell.</p>') +
      '<p class="note"><a href="#" data-cell-table="facts">Open all facts of this cell in the table</a></p>';
    A.openPanel("Cell: " + (place ? place.name : placeId) + " × " + (disc ? disc.discipline : discId), html);
    var panelLink = document.querySelector("#pbody a[data-cell-table]");
    if (panelLink) {
      panelLink.onclick = function (e) {
        e.preventDefault();
        A.openTableFilter("facts.csv", "place_id", placeId);
      };
    }
  }

  function viewGrid(el) {
    var discs = DISCS.filter(function (d) { return d.disc_id !== "ALL" && (d.scope === "pilot_main" || d.scope === "pilot_light"); });
    var adj = DISCS.filter(function (d) { return d.scope === "adjacent"; });
    var extra = DISCS.filter(function (d) { return d.disc_id === "ALL"; });
    function draw() {
      var cols = discs.concat(gridState.adjacent ? adj : [], extra);
      var places = PLACES.slice().sort(function (a, b) {
        var ra = REGION_ORDER.indexOf(a.region); var rb2 = REGION_ORDER.indexOf(b.region);
        if (ra !== rb2) return (ra < 0 ? 99 : ra) - (rb2 < 0 ? 99 : rb2);
        var oa = ROLE_ORDER.indexOf(a.role); var ob = ROLE_ORDER.indexOf(b.role);
        return (oa < 0 ? 99 : oa) - (ob < 0 ? 99 : ob);
      });
      var signalOptions = '<option value="ALL">All signals</option>' + SIGNALS.map(function (s) {
        return '<option value="' + esc(s.signal_id) + '"' + (gridState.signal === s.signal_id ? " selected" : "") + ">" +
          esc(s.signal) + " (" + esc(s.signal_id) + ")</option>";
      }).join("");
      var head = '<tr><th class="sticky">Place</th>' + cols.map(function (d) {
        return '<th title="' + esc(d.family) + " · scope " + esc(d.scope) + '">' + esc(d.discipline) +
          (d.sub_style ? " (" + esc(d.sub_style) + ")" : "") + '<br><span class="code">' + esc(d.disc_id) + "</span></th>";
      }).join("") + "</tr>";
      var body = "";
      var lastRegion = null; var lastRole = null;
      places.forEach(function (p) {
        if (p.region !== lastRegion) {
          body += '<tr class="grp"><td colspan="' + (cols.length + 1) + '">' + esc(p.region || "no region") + "</td></tr>";
          lastRegion = p.region; lastRole = null;
        }
        if (p.role !== lastRole) {
          body += '<tr class="grp2"><td colspan="' + (cols.length + 1) + '">' + esc(p.role) + "</td></tr>";
          lastRole = p.role;
        }
        body += '<tr><th class="sticky place">' + esc(p.name) + '<br><span class="code">' + esc(p.place_id) + " · " + esc(p.role) + "</span></th>";
        cols.forEach(function (d) {
          var c = cellStats(p.place_id, d.disc_id);
          var n = c.facts.length + c.events.length + c.orgs.length;
          var total = c.ev.found + c.ev.stated + c.ev.nf + c.ev.inf || 1;
          var band = c.facts.length ? '<span class="band"><span class="bd-f" style="flex:' + c.ev.found + '"></span>' +
            '<span class="bd-i" style="flex:' + c.ev.inf + '"></span><span class="bd-n" style="flex:' + c.ev.nf + '"></span></span>' : "";
          body += '<td><button class="cell' + (n ? "" : " empty") + '" data-cell="' + esc(p.place_id + "|" + d.disc_id) + '" type="button" title="Open the cell">' +
            '<span class="counts">F ' + c.facts.length + " · E " + c.events.length + " · O " + c.orgs.length + "</span>" +
            band + "<br>" + rbMarker(c.rb) + "</button></td>";
        });
        body += "</tr>";
      });
      el.innerHTML =
        "<h1>Grid</h1>" +
        '<p class="muted">Place × discipline. Counts only, no scores: F = facts, E = events, O = organisations. The bar shows the evidence of the facts: green = found or stated by organiser, amber = inferred, grey = not found. Click a cell for its rows and sources.</p>' +
        '<div class="ctrl"><label>Signal <select id="gsig">' + signalOptions + "</select></label>" +
        '<label class="chk"><input type="checkbox" id="gadj"' + (gridState.adjacent ? " checked" : "") + "> Show adjacent disciplines</label></div>" +
        '<div class="legend"><span class="rb rb-found">● Red Bull found</span> <span class="rb rb-stated">◐ stated by organiser</span> <span class="rb rb-nf">○ not found</span> (no marker = not checked)</div>' +
        '<div class="gridwrap"><table class="grid"><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div>";
      document.getElementById("gsig").onchange = function (e) { gridState.signal = e.target.value; draw(); };
      document.getElementById("gadj").onchange = function (e) { gridState.adjacent = e.target.checked; draw(); };
    }
    el.onclick = function (e) {
      var b = e.target.closest ? e.target.closest("button[data-cell]") : null;
      if (!b) return;
      var parts = b.getAttribute("data-cell").split("|");
      showCell(parts[0], parts[1]);
    };
    draw();
  }

  /* ---------- pan and zoom (SVG viewBox) ---------- */
  function panZoom(svg, base) {
    var v = { x: base.x, y: base.y, w: base.w, h: base.h };
    var drag = null;
    function apply() {
      svg.setAttribute("viewBox", [v.x, v.y, v.w, v.h].map(function (n) { return n.toFixed(2); }).join(" "));
    }
    function zoomAt(f, px, py) {
      var cx = v.x + px * v.w; var cy = v.y + py * v.h;
      v.w *= f; v.h *= f;
      v.x = cx - px * v.w; v.y = cy - py * v.h;
      apply();
    }
    svg.addEventListener("wheel", function (e) {
      e.preventDefault();
      var r = svg.getBoundingClientRect();
      zoomAt(e.deltaY > 0 ? 1.15 : 1 / 1.15, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    }, { passive: false });
    svg.addEventListener("pointerdown", function (e) {
      if (e.target.closest && e.target.closest("[data-node],[data-place]")) return;
      drag = { x: e.clientX, y: e.clientY, vx: v.x, vy: v.y };
      svg.setPointerCapture(e.pointerId);
    });
    svg.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var r = svg.getBoundingClientRect();
      v.x = drag.vx - (e.clientX - drag.x) * v.w / r.width;
      v.y = drag.vy - (e.clientY - drag.y) * v.h / r.height;
      apply();
    });
    svg.addEventListener("pointerup", function () { drag = null; });
    apply();
    return {
      zoom: function (f) { zoomAt(f, 0.5, 0.5); },
      reset: function (b) { v = { x: b.x, y: b.y, w: b.w, h: b.h }; apply(); }
    };
  }

  /* ---------- geographic map ---------- */
  var MAP_W = 1000;
  var MAP_H = 500;
  function mapX(lon) { return (lon + 180) / 360 * MAP_W; }
  function mapY(lat) { return (90 - lat) / 180 * MAP_H; }

  function viewMap(el) {
    var geo = window.ATLAS_GEO || [];
    var landPath = geo.map(function (c) {
      return c.r.map(function (ring) {
        return "M" + ring.map(function (p, i) {
          return (i ? "L" : "") + mapX(p[0]).toFixed(1) + " " + mapY(p[1]).toFixed(1);
        }).join("") + "Z";
      }).join("");
    }).join("");

    var st = { metric: "facts", disc: "ALL_DISCS", ev: "ALL_EV", rb: "ALL_RB", y0: "", y1: "" };
    var pz = null;

    function countsFor(place) {
      var pid = place.place_id;
      var fs = FACTS.filter(function (f) { return f.place_id === pid; });
      var evs = EVENTS.filter(function (e) { return e.place_id === pid; });
      var os = ORGS.filter(function (o) { return o.place_id === pid; });
      var y0 = st.y0 ? Number(st.y0) : null; var y1 = st.y1 ? Number(st.y1) : null;
      function inYears(text) {
        var y = yearOf(text);
        if (y === null) return !(y0 !== null || y1 !== null);
        return (y0 === null || y >= y0) && (y1 === null || y <= y1);
      }
      if (st.disc !== "ALL_DISCS") {
        fs = fs.filter(function (f) { return f.disc_id === st.disc; });
        evs = evs.filter(function (e) { return e.disc_id === st.disc; });
        os = os.filter(function (o) { return o.disc_id === st.disc; });
      }
      fs = fs.filter(function (f) { return inYears(f.period) && (st.ev === "ALL_EV" || f.evidence_type === st.ev); });
      evs = evs.filter(function (e) { return inYears(e.date_start) && (st.rb === "ALL_RB" || e.red_bull_involvement === st.rb); });
      os = os.filter(function (o) { return st.ev === "ALL_EV" || o.evidence_type === st.ev; });
      var rbEvs = evs.filter(function (e) { return e.red_bull_involvement === "found"; });
      return { facts: fs, events: evs, orgs: os, rbEvents: rbEvs };
    }

    function metricValue(c) {
      if (st.metric === "facts") return c.facts.length;
      if (st.metric === "events") return c.events.length;
      if (st.metric === "orgs") return c.orgs.length;
      return c.rbEvents.length;
    }

    var mapPlaces = PLACES.filter(function (p) { return p.lat !== "" && p.lon !== ""; });
    var noCoords = PLACES.filter(function (p) { return p.lat === "" || p.lon === ""; });

    function draw() {
      var maxV = 1;
      var data = mapPlaces.map(function (p) {
        var c = countsFor(p);
        var v = metricValue(c);
        if (v > maxV) maxV = v;
        return { p: p, c: c, v: v };
      });
      var circles = data.map(function (d) {
        var r = d.v ? 4 + 14 * Math.sqrt(d.v / maxV) : 3;
        var tip = d.p.name + " · facts " + d.c.facts.length + " · events " + d.c.events.length +
          " · organisations " + d.c.orgs.length + " · Red Bull events " + d.c.rbEvents.length;
        return '<g data-place="' + esc(d.p.place_id) + '" class="pl' + (d.v ? "" : " zero") + '">' +
          '<circle cx="' + mapX(Number(d.p.lon)).toFixed(1) + '" cy="' + mapY(Number(d.p.lat)).toFixed(1) +
          '" r="' + r.toFixed(1) + '"><title>' + esc(tip) + "</title></circle></g>";
      }).join("");
      var discOptions = '<option value="ALL_DISCS">All disciplines</option>' + DISCS.map(function (d) {
        return '<option value="' + esc(d.disc_id) + '"' + (st.disc === d.disc_id ? " selected" : "") + ">" + esc(d.discipline) + "</option>";
      }).join("");
      var rbOptions = [["ALL_RB", "All Red Bull values"], ["found", "found"], ["stated_by_organiser", "stated by organiser"],
        ["not_found", "not found"], ["not_checked", "not checked"], ["confirmed_absent", "confirmed absent"]].map(function (o) {
        return '<option value="' + o[0] + '"' + (st.rb === o[0] ? " selected" : "") + ">" + esc(o[1]) + "</option>";
      }).join("");
      var evOptions = [["ALL_EV", "All evidence"]].concat(EVIDENCE.map(function (e) { return [e, e.replace(/_/g, " ")]; })).map(function (o) {
        return '<option value="' + o[0] + '"' + (st.ev === o[0] ? " selected" : "") + ">" + esc(o[1]) + "</option>";
      }).join("");
      var metricOptions = [["facts", "facts"], ["events", "events"], ["orgs", "organisations"], ["rb", "Red Bull events (found)"]].map(function (o) {
        return '<option value="' + o[0] + '"' + (st.metric === o[0] ? " selected" : "") + ">" + esc(o[1]) + "</option>";
      }).join("");
      var years = [];
      EVENTS.concat(FACTS).forEach(function (r) {
        var y = yearOf(r.date_start || r.period);
        if (y !== null) years.push(y);
      });
      var yearOpts = '<option value="">any</option>' + Array.from(new Set(years)).sort().map(function (y) {
        return "<option>" + y + "</option>";
      }).join("");

      el.innerHTML =
        "<h1>Geographic map</h1>" +
        '<p class="muted">Places with coordinates. Circle size = the number chosen below (bigger = more rows). Hollow dots = zero rows. Hover for counts; click for the place. Drag to move, wheel or buttons to zoom. Map drawn from simplified Natural Earth outlines; no internet needed.</p>' +
        '<div class="ctrl">' +
        '<label>Size by <select id="mmet">' + metricOptions + "</select></label>" +
        '<label>Discipline <select id="mdisc">' + discOptions + "</select></label>" +
        '<label>Evidence (facts, organisations) <select id="mev">' + evOptions + "</select></label>" +
        '<label>Red Bull (events) <select id="mrb">' + rbOptions + "</select></label>" +
        '<label>Year from <select id="my0">' + yearOpts + "</select></label>" +
        '<label>to <select id="my1">' + yearOpts + "</select></label>" +
        "</div>" +
        '<div class="mapctrl"><button type="button" id="mpw">World</button><button type="button" id="mpe">Europe</button>' +
        '<button type="button" id="mzi">+</button><button type="button" id="mzo">−</button></div>' +
        '<div class="mapwrap"><svg id="msvg" class="map" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="World map with places">' +
        '<rect x="-2000" y="-1000" width="5000" height="3000" class="sea"></rect>' +
        '<path d="' + landPath + '" class="land"></path>' + circles + "</svg></div>" +
        '<p class="note">Places shown: ' + mapPlaces.length + ". Filters apply to: discipline (facts, events, organisations), evidence (facts, organisations), Red Bull and years (events; years also to facts).</p>" +
        '<p class="note">Places without coordinates (not on the map): ' +
        (noCoords.length ? noCoords.map(function (p) { return esc(p.name) + " (" + esc(p.place_id) + ")"; }).join(", ") : "none") + ".</p>";

      document.getElementById("mmet").onchange = function (e) { st.metric = e.target.value; draw(); };
      document.getElementById("mdisc").onchange = function (e) { st.disc = e.target.value; draw(); };
      document.getElementById("mev").onchange = function (e) { st.ev = e.target.value; draw(); };
      document.getElementById("mrb").onchange = function (e) { st.rb = e.target.value; draw(); };
      document.getElementById("my0").onchange = function (e) { st.y0 = e.target.value; draw(); };
      document.getElementById("my1").onchange = function (e) { st.y1 = e.target.value; draw(); };
      var svg = document.getElementById("msvg");
      pz = panZoom(svg, { x: 0, y: 0, w: MAP_W, h: MAP_H });
      document.getElementById("mpw").onclick = function () { pz.reset({ x: 0, y: 0, w: MAP_W, h: MAP_H }); };
      document.getElementById("mpe").onclick = function () { pz.reset({ x: 400, y: 30, w: 250, h: 160 }); };
      document.getElementById("mzi").onclick = function () { pz.zoom(1 / 1.5); };
      document.getElementById("mzo").onclick = function () { pz.zoom(1.5); };
    }

    el.onclick = function (e) {
      var g = e.target.closest ? e.target.closest("g[data-place]") : null;
      if (!g) return;
      showPlace(g.getAttribute("data-place"));
    };
    draw();
  }

  function showPlace(placeId) {
    var place = IDX.place[placeId];
    var fs = FACTS.filter(function (f) { return f.place_id === placeId; });
    var evs = EVENTS.filter(function (e) { return e.place_id === placeId; });
    var os = ORGS.filter(function (o) { return o.place_id === placeId; });
    var html =
      '<p class="muted">' + esc(place.region) + " · " + esc(place.role) + " · " + esc(place.metro_definition || "") + "</p>" +
      "<h3>Facts (" + fs.length + ")</h3>" + listRows("facts.csv", fs, "No facts for this place.") +
      "<h3>Events (" + evs.length + ")</h3>" + listRows("events.csv", evs, "No events for this place.") +
      "<h3>Organisations (" + os.length + ")</h3>" + listRows("organisations.csv", os, "No organisations for this place.") +
      '<p class="note"><a href="#" data-open-place="1">Open all facts of this place in the table</a></p>';
    A.openPanel(place.name, html);
    var link = document.querySelector("#pbody a[data-open-place]");
    if (link) {
      link.onclick = function (e) {
        e.preventDefault();
        A.openTableFilter("facts.csv", "place_id", placeId);
      };
    }
  }

  /* ---------- concept map ---------- */
  var KIND_ORDER = ["disc", "place", "org", "series", "signal", "athlete", "rb", "src"];
  var KIND_LABEL = { disc: "Discipline", place: "Place", org: "Organisation", series: "Event series",
    signal: "Signal", athlete: "Athlete", rb: "Red Bull", src: "Source" };
  var EV_RANK = { found: 4, stated_by_organiser: 3, inferred: 2, not_found: 1 };
  var EV_STYLE = { found: "e-solid", stated_by_organiser: "e-dash", inferred: "e-dash", not_found: "e-dot" };

  function buildGraph(opt) {
    var nodes = {};
    var edges = {};
    function node(id, kind, label, table, row) {
      if (!nodes[id]) nodes[id] = { id: id, kind: kind, label: label || id, table: table, row: row, deg: 0 };
      return nodes[id];
    }
    function edge(a, b, ev) {
      if (!a || !b || a === b) return;
      var key = a < b ? a + "~" + b : b + "~" + a;
      var e = edges[key];
      if (!e) e = edges[key] = { a: a < b ? a : b, b: a < b ? b : a, ev: "not_found", count: 0 };
      e.count++;
      if ((EV_RANK[ev] || 0) > (EV_RANK[e.ev] || 0)) e.ev = ev;
    }
    PLACES.forEach(function (p) { node("p:" + p.place_id, "place", p.name, "places.csv", p); });
    DISCS.forEach(function (d) { if (d.disc_id !== "ALL") node("d:" + d.disc_id, "disc", d.discipline, "disciplines.csv", d); });
    ATHLETES.forEach(function (a) { node("a:" + a.athlete_id, "athlete", a.public_name, "athletes.csv", a); });
    var seriesRows = {};
    EVENTS.forEach(function (e) {
      var sid = "s:" + e.series;
      node(sid, "series", e.series, null, null);
      (seriesRows[sid] || (seriesRows[sid] = [])).push(e);
      edge(sid, "p:" + e.place_id, "found");
      if (e.organiser_org_id) edge(sid, "o:" + e.organiser_org_id, "found");
      if (e.red_bull_involvement === "found") edge(sid, "rb", "found");
      if (e.red_bull_involvement === "stated_by_organiser") edge(sid, "rb", "stated_by_organiser");
      if (opt.sources && e.source_id) edge(sid, "src:" + e.source_id, "found");
    });
    ORGS.forEach(function (o) {
      node("o:" + o.org_id, "org", o.name, "organisations.csv", o);
      edge("o:" + o.org_id, "p:" + o.place_id, o.evidence_type);
      if (o.disc_id !== "ALL") edge("o:" + o.org_id, "d:" + o.disc_id, o.evidence_type);
      if (opt.sources && o.website_source_id) edge("o:" + o.org_id, "src:" + o.website_source_id, o.evidence_type);
    });
    FACTS.forEach(function (f) {
      node("g:" + f.signal_id, "signal", (IDX.signal[f.signal_id] || {}).signal || f.signal_id, "signals.csv", IDX.signal[f.signal_id]);
      edge("p:" + f.place_id, "g:" + f.signal_id, f.evidence_type);
      if (f.disc_id !== "ALL") edge("p:" + f.place_id, "d:" + f.disc_id, f.evidence_type);
      if (opt.sources && f.source_id) edge("g:" + f.signal_id, "src:" + f.source_id, f.evidence_type);
    });
    ATHLETES.forEach(function (a) {
      if (a.base_place_id) edge("a:" + a.athlete_id, "p:" + a.base_place_id, "found");
      if (a.disc_id !== "ALL") edge("a:" + a.athlete_id, "d:" + a.disc_id, "found");
    });
    RELATIONS.forEach(function (r) {
      function ref(type, id) {
        if (type === "place") return "p:" + id;
        if (type === "discipline") return "d:" + id;
        if (type === "org") return "o:" + id;
        if (type === "athlete") return "a:" + id;
        if (type === "event") {
          var ev = IDX.event[id];
          return ev ? "s:" + ev.series : null;
        }
        if (type === "series") { node("s:" + id, "series", id, null, null); return "s:" + id; }
        return null;
      }
      edge(ref(r.from_type, r.from_id), ref(r.to_type, r.to_id), r.evidence_type);
    });
    if (opt.sources) {
      SOURCES.forEach(function (s) { node("src:" + s.source_id, "src", s.title, "sources.csv", s); });
    }
    // Attach labels to series and signal nodes that have a row.
    Object.keys(nodes).forEach(function (id) {
      if (nodes[id].kind === "signal" && !nodes[id].row) nodes[id].row = null;
    });
    if (Object.keys(edges).some(function (k) { return edges[k].a === "rb" || edges[k].b === "rb"; })) {
      node("rb", "rb", "Red Bull", null, null);
    }
    return { nodes: nodes, edges: edges, seriesRows: seriesRows };
  }

  function filterGraph(g, opt) {
    var nodes = g.nodes; var edges = g.edges;
    var allowed = function (n) { return opt.kinds[n.kind] !== false; };
    var keep = {};
    Object.keys(nodes).forEach(function (id) {
      var n = nodes[id];
      if (!allowed(n)) return;
      if (n.kind === "disc" && opt.disc !== "ALL" && n.id !== "d:" + opt.disc) return;
      if (n.kind === "place" && opt.region !== "ALL" && n.row && n.row.region !== opt.region) return;
      keep[id] = true;
    });
    var out = {};
    Object.keys(edges).forEach(function (k) {
      var e = edges[k];
      if (keep[e.a] && keep[e.b]) out[k] = e;
    });
    // Drop nodes that lost all their edges (isolated nodes add nothing to the graph).
    var deg = {};
    Object.keys(out).forEach(function (k) { deg[out[k].a] = (deg[out[k].a] || 0) + 1; deg[out[k].b] = (deg[out[k].b] || 0) + 1; });
    var final = {};
    Object.keys(keep).forEach(function (id) { if (deg[id]) final[id] = nodes[id]; });
    var finalEdges = {};
    Object.keys(out).forEach(function (k) { if (final[out[k].a] && final[out[k].b]) finalEdges[k] = out[k]; });
    Object.keys(final).forEach(function (id) { final[id].deg = 0; });
    Object.keys(finalEdges).forEach(function (k) { final[finalEdges[k].a].deg++; final[finalEdges[k].b].deg++; });
    return { nodes: final, edges: finalEdges };
  }

  function limitGraph(f, limit) {
    var ids = Object.keys(f.nodes);
    var total = ids.length;
    if (total <= limit) return { g: f, total: total, cut: false };
    ids.sort(function (a, b) { return f.nodes[b].deg - f.nodes[a].deg || (a < b ? -1 : 1); });
    var keepIds = {};
    ids.slice(0, limit).forEach(function (id) { keepIds[id] = true; });
    var nodes = {}; var edges = {};
    Object.keys(keepIds).forEach(function (id) { nodes[id] = f.nodes[id]; });
    Object.keys(f.edges).forEach(function (k) {
      var e = f.edges[k];
      if (keepIds[e.a] && keepIds[e.b]) edges[k] = e;
    });
    return { g: { nodes: nodes, edges: edges }, total: total, cut: true };
  }

  function forceLayout(nodes, edges, W, H) {
    var ids = Object.keys(nodes);
    var pos = {};
    var seed = 12345;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    ids.forEach(function (id) {
      pos[id] = { x: W / 2 + (rnd() - 0.5) * W * 0.8, y: H / 2 + (rnd() - 0.5) * H * 0.8, dx: 0, dy: 0 };
    });
    var k = Math.sqrt((W * H) / Math.max(ids.length, 1)) * 0.9;
    var iters = ids.length > 200 ? 120 : 200;
    var ek = Object.keys(edges).map(function (key) { return edges[key]; });
    for (var it = 0; it < iters; it++) {
      var temp = (W / 12) * (1 - it / iters) + 0.5;
      ids.forEach(function (a) { pos[a].dx = 0; pos[a].dy = 0; });
      for (var i = 0; i < ids.length; i++) {
        for (var j = i + 1; j < ids.length; j++) {
          var p = pos[ids[i]]; var q = pos[ids[j]];
          var dx = p.x - q.x; var dy = p.y - q.y;
          var d2 = dx * dx + dy * dy + 0.01;
          var f = (k * k) / d2;
          p.dx += dx * f; p.dy += dy * f; q.dx -= dx * f; q.dy -= dy * f;
        }
      }
      ek.forEach(function (e) {
        var p = pos[e.a]; var q = pos[e.b];
        var dx = p.x - q.x; var dy = p.y - q.y;
        var d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        var f = (d * d) / k;
        p.dx -= dx / d * f; p.dy -= dy / d * f; q.dx += dx / d * f; q.dy += dy / d * f;
      });
      ids.forEach(function (id) {
        var p = pos[id];
        p.dx += (W / 2 - p.x) * 0.01; p.dy += (H / 2 - p.y) * 0.01;
        var m = Math.sqrt(p.dx * p.dx + p.dy * p.dy) + 0.01;
        var s = Math.min(m, temp) / m;
        p.x += p.dx * s; p.y += p.dy * s;
      });
    }
    return pos;
  }

  function layeredLayout(nodes, W, H) {
    var cols = { disc: 0, place: 1, org: 2, series: 3, signal: 4, athlete: 5, rb: 6, src: 7 };
    var by = {};
    Object.keys(nodes).forEach(function (id) {
      var k = cols[nodes[id].kind];
      (by[k] || (by[k] = [])).push(nodes[id]);
    });
    var pos = {};
    var colKeys = Object.keys(by).map(Number).sort(function (a, b) { return a - b; });
    colKeys.forEach(function (c, idx) {
      var list = by[c].sort(function (a, b) { return b.deg - a.deg || (a.label < b.label ? -1 : 1); });
      var x = 60 + idx * ((W - 120) / Math.max(colKeys.length - 1, 1));
      list.forEach(function (n, i) {
        pos[n.id] = { x: x, y: 40 + i * (H - 80) / Math.max(list.length - 1, 1) };
      });
    });
    return pos;
  }

  function viewConcept(el) {
    var st = { mode: "auto", limit: 300, sources: false, search: "", disc: "ALL", region: "ALL", sel: null,
      kinds: { disc: true, place: true, org: true, series: true, signal: true, athlete: true, rb: true, src: false } };
    var pz = null;
    var baseGraph = null;

    function render() {
      var g = buildGraph({ sources: st.sources });
      var f = filterGraph(g, { kinds: st.kinds, disc: st.disc, region: st.region });
      var lim = limitGraph(f, st.limit);
      var graph = lim.g;
      var ids = Object.keys(graph.nodes);
      var mode = st.mode === "auto" ? (ids.length <= 400 ? "force" : "layered") : st.mode;
      var W = 1000; var H = 700;
      var pos = mode === "force" ? forceLayout(graph.nodes, graph.edges, W, H) : layeredLayout(graph.nodes, W, H);
      // Normalise to the drawing area.
      var minX = Infinity; var minY = Infinity; var maxX = -Infinity; var maxY = -Infinity;
      ids.forEach(function (id) {
        var p = pos[id]; if (!p) return;
        minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x); minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
      });
      if (!ids.length) { minX = 0; minY = 0; maxX = W; maxY = H; }
      var sx = (W - 80) / Math.max(maxX - minX, 1); var sy = (H - 80) / Math.max(maxY - minY, 1);
      var s = mode === "force" ? Math.min(sx, sy) : 1;
      ids.forEach(function (id) {
        var p = pos[id];
        if (!p) return;
        p.X = 40 + (p.x - minX) * s + (mode === "force" ? ((W - 80) - (maxX - minX) * s) / 2 : 0);
        p.Y = 40 + (p.y - minY) * s + (mode === "force" ? ((H - 80) - (maxY - minY) * s) / 2 : 0);
      });

      var edgeSvg = Object.keys(graph.edges).map(function (k) {
        var e = graph.edges[k];
        var pa = pos[e.a]; var pb = pos[e.b];
        if (!pa || !pb) return "";
        return '<line class="edge ' + EV_STYLE[e.ev] + '" data-a="' + esc(e.a) + '" data-b="' + esc(e.b) +
          '" x1="' + pa.X.toFixed(1) + '" y1="' + pa.Y.toFixed(1) + '" x2="' + pb.X.toFixed(1) + '" y2="' + pb.Y.toFixed(1) +
          '"><title>' + esc(e.ev.replace(/_/g, " ")) + "</title></line>";
      }).join("");
      var nodeSvg = ids.map(function (id) {
        var n = graph.nodes[id]; var p = pos[id];
        var r = 4 + Math.min(n.deg, 12) * 0.6;
        return '<g class="node k-' + n.kind + '" data-node="' + esc(id) + '"><circle cx="' + p.X.toFixed(1) + '" cy="' +
          p.Y.toFixed(1) + '" r="' + r.toFixed(1) + '"><title>' + esc(KIND_LABEL[n.kind] + ": " + n.label) + "</title></circle></g>";
      }).join("");
      // Labels: highest degree first, skip any label that would overlap one already placed.
      var placed = []; var labelSvg = "";
      ids.slice().sort(function (a, b) { return graph.nodes[b].deg - graph.nodes[a].deg || (a < b ? -1 : 1); }).forEach(function (id) {
        var n = graph.nodes[id]; var p = pos[id];
        var text = n.label.length > 26 ? n.label.slice(0, 25) + "…" : n.label;
        var w = text.length * 7.4; var x = p.X + 8; var y = p.Y + 4;
        var box = { x1: x - 2, y1: y - 15, x2: x + w + 2, y2: y + 6 };
        var clash = placed.some(function (b) { return !(box.x2 < b.x1 || box.x1 > b.x2 || box.y2 < b.y1 || box.y1 > b.y2); });
        if (clash) return;
        placed.push(box);
        labelSvg += '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" data-l="' + esc(id) + '">' + esc(text) + "</text>";
      });

      var typeChecks = Object.keys(KIND_LABEL).map(function (k) {
        return '<label class="chk"><input type="checkbox" data-kind="' + k + '"' + (st.kinds[k] ? " checked" : "") + "> " + esc(KIND_LABEL[k]) + "</label>";
      }).join("");
      var discOpts = '<option value="ALL">All disciplines</option>' + DISCS.filter(function (d) { return d.disc_id !== "ALL"; }).map(function (d) {
        return '<option value="' + esc(d.disc_id) + '"' + (st.disc === d.disc_id ? " selected" : "") + ">" + esc(d.discipline) + "</option>";
      }).join("");
      var regOpts = '<option value="ALL">All regions</option>' + REGION_ORDER.map(function (r) {
        return '<option value="' + r + '"' + (st.region === r ? " selected" : "") + ">" + esc(r.replace(/_/g, " ")) + "</option>";
      }).join("");
      var cut = lim.cut ? '<p class="warn">Showing ' + ids.length + " of " + lim.total + " nodes (the most connected ones). Narrow the filters or raise the limit to see more.</p>" : "";
      var big = ids.length > 800 ? '<p class="note">Large graph: a plain layout is used.</p>' : "";

      el.innerHTML =
        "<h1>Concept map</h1>" +
        '<p class="muted">How the data items connect. Lines are derived from the links between rows (an event to its place, organiser and series; a fact to its place, discipline and signal; relations from relations.csv). Line style = evidence: solid = found, dashed = stated or inferred, dotted = not found. Click a node for its rows and neighbours.</p>' +
        '<div class="ctrl">' +
        '<label>Search <input id="cq" type="search" value="' + esc(st.search) + '" placeholder="name"></label>' +
        '<label>Layout <select id="cmode"><option value="auto"' + (st.mode === "auto" ? " selected" : "") + '>automatic</option><option value="force"' + (st.mode === "force" ? " selected" : "") + '>force</option><option value="layered"' + (st.mode === "layered" ? " selected" : "") + ">layered</option></select></label>" +
        '<label>Limit <input id="climit" type="number" min="20" max="2000" step="50" value="' + st.limit + '"> nodes</label>' +
        '<label>Discipline <select id="cdisc">' + discOpts + "</select></label>" +
        '<label>Region <select id="creg">' + regOpts + "</select></label>" +
        '<label class="chk"><input id="csrc" type="checkbox"' + (st.sources ? " checked" : "") + "> Show sources</label>" +
        '<button type="button" id="creset">Reset view</button></div>' +
        '<div class="ctrl kinds">' + typeChecks + "</div>" +
        cut + big +
        '<div class="legend"><span class="legend-line e-solid"></span> found <span class="legend-line e-dash"></span> stated or inferred <span class="legend-line e-dot"></span> not found</div>' +
        '<div class="mapwrap"><svg id="csvg" class="concept" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Concept map">' +
        edgeSvg + nodeSvg + labelSvg + "</svg></div>" +
        '<p class="note">Nodes: ' + ids.length + " · links: " + Object.keys(graph.edges).length + ". Isolated items are hidden. Mouse wheel zooms, drag pans.</p>";

      var svg = document.getElementById("csvg");
      pz = panZoom(svg, { x: 0, y: 0, w: W, h: H });
      document.getElementById("cq").oninput = function (e) { st.search = e.target.value; highlight(); };
      document.getElementById("cmode").onchange = function (e) { st.mode = e.target.value; render(); };
      document.getElementById("climit").onchange = function (e) { st.limit = Math.max(20, Math.min(2000, Number(e.target.value) || 300)); render(); };
      document.getElementById("cdisc").onchange = function (e) { st.disc = e.target.value; render(); };
      document.getElementById("creg").onchange = function (e) { st.region = e.target.value; render(); };
      document.getElementById("csrc").onchange = function (e) { st.sources = e.target.checked; st.kinds.src = e.target.checked; render(); };
      document.getElementById("creset").onclick = function () { pz.reset({ x: 0, y: 0, w: W, h: H }); };
      el.querySelectorAll("input[data-kind]").forEach(function (c) {
        c.onchange = function () { st.kinds[c.getAttribute("data-kind")] = c.checked; render(); };
      });
      baseGraph = graph;
      highlight();
      svg.onclick = function (e) {
        var n = e.target.closest ? e.target.closest("g[data-node]") : null;
        if (!n) return;
        st.sel = n.getAttribute("data-node");
        highlight();
        showNode(graph, st.sel);
      };
      if (st.sel && graph.nodes[st.sel]) showNode(graph, st.sel);
    }

    function highlight() {
      var svg = document.getElementById("csvg");
      if (!svg) return;
      var q = st.search.trim().toLowerCase();
      var sel = st.sel;
      var neigh = {};
      if (sel && baseGraph && baseGraph.nodes[sel]) {
        neigh[sel] = true;
        Object.keys(baseGraph.edges).forEach(function (k) {
          var e = baseGraph.edges[k];
          if (e.a === sel) neigh[e.b] = true;
          if (e.b === sel) neigh[e.a] = true;
        });
      }
      svg.querySelectorAll("g[data-node]").forEach(function (g) {
        var id = g.getAttribute("data-node");
        var label = baseGraph && baseGraph.nodes[id] ? baseGraph.nodes[id].label.toLowerCase() : "";
        var hit = !q || label.indexOf(q) >= 0;
        var dim = (sel && !neigh[id]) || (q && !hit);
        g.classList.toggle("dim", !!dim);
        g.classList.toggle("sel", id === sel);
      });
      svg.querySelectorAll("line.edge").forEach(function (l) {
        var dim = sel && l.getAttribute("data-a") !== sel && l.getAttribute("data-b") !== sel;
        l.classList.toggle("dim", !!dim);
      });
      svg.querySelectorAll("text[data-l]").forEach(function (t) {
        t.classList.toggle("dim", !!(sel && !neigh[t.getAttribute("data-l")]));
      });
    }

    function showNode(graph, id) {
      var n = graph.nodes[id];
      if (!n) return;
      var neighbours = {};
      Object.keys(graph.edges).forEach(function (k) {
        var e = graph.edges[k];
        if (e.a === id) neighbours[e.b] = graph.nodes[e.b];
        if (e.b === id) neighbours[e.a] = graph.nodes[e.a];
      });
      var byKind = {};
      Object.keys(neighbours).forEach(function (nid) {
        var nb = neighbours[nid];
        (byKind[nb.kind] || (byKind[nb.kind] = [])).push(nb);
      });
      var extra = "";
      if (n.kind === "series") {
        var evs = EVENTS.filter(function (ev) { return "s:" + ev.series === id; });
        extra = "<h3>Events in this series (" + evs.length + ")</h3>" + listRows("events.csv", evs, "No events.");
      }
      var rowHtml = n.row ? '<p><a href="#" data-reg="' + A.registerRow(n.table, n.row) + '">Open this row</a></p>' : "";
      var nb = KIND_ORDER.filter(function (k) { return byKind[k]; }).map(function (k) {
        return "<h4>" + esc(KIND_LABEL[k]) + " (" + byKind[k].length + ")</h4><ul class=\"plain\">" +
          byKind[k].slice(0, 60).map(function (x) { return "<li>" + esc(x.label) + "</li>"; }).join("") +
          (byKind[k].length > 60 ? "<li>… and " + (byKind[k].length - 60) + " more</li>" : "") + "</ul>";
      }).join("");
      A.openPanel(n.label, '<p class="muted">' + esc(KIND_LABEL[n.kind]) + " · " + Object.keys(neighbours).length + " linked items</p>" +
        rowHtml + extra + "<h3>Linked items</h3>" + (nb || '<p class="note">No links.</p>'));
    }

    render();
  }

  /* ---------- sources ---------- */
  function viewSources(el) {
    var st = { filter: "all", q: "" };
    function draw() {
      var rows = SOURCES.filter(function (s) {
        if (st.filter === "never" && s.access_status !== "not_opened") return false;
        if (st.filter === "blocked" && s.access_status !== "blocked") return false;
        if (st.filter === "opened" && s.access_status !== "opened" && s.access_status !== "rendered") return false;
        if (st.q) {
          var text = [s.title, s.publisher, s.url, s.notes].join(" ").toLowerCase();
          if (text.indexOf(st.q.toLowerCase()) < 0) return false;
        }
        return true;
      });
      var usage = {};
      var uses = { facts: "facts.csv", events: "events.csv", organisations: "organisations.csv",
        athletes: "athletes.csv", redbull_finance: "redbull_finance.csv", relations: "relations.csv" };
      Object.keys(uses).forEach(function (k) {
        T[uses[k]].forEach(function (r) {
          var id = r.source_id || r.website_source_id;
          if (!id) return;
          usage[id] = usage[id] || {};
          usage[id][uses[k]] = (usage[id][uses[k]] || 0) + 1;
        });
      });
      var groups = {};
      rows.forEach(function (s) { (groups[s.source_type] || (groups[s.source_type] = [])).push(s); });
      var html = Object.keys(groups).sort().map(function (type) {
        return "<h2>" + esc(type) + " (" + groups[type].length + ")</h2>" +
          '<div class="hscroll"><table class="data small"><thead><tr><th>Title</th><th>Status</th><th>Opened</th><th>Rows that use it</th></tr></thead><tbody>' +
          groups[type].map(function (s) {
            var u = usage[s.source_id] || {};
            var used = Object.keys(u).map(function (t) {
              var col = t === "organisations.csv" ? "website_source_id" : "source_id";
              return '<a href="#" data-src-table="' + esc(t) + '" data-col="' + col + '" data-src="' + esc(s.source_id) + '">' +
                esc(A.FILE_LABEL[t] || t) + " " + u[t] + "</a>";
            }).join(", ");
            return '<tr><td><a href="#" data-reg="' + A.registerRow("sources.csv", s) + '">' + esc(s.title) + "</a><br><span class=\"code\">" +
              esc(s.url) + "</span></td><td>" + badge("access_status", s.access_status) + "</td><td>" + esc(s.access_date || "not opened") +
              "</td><td>" + (used || '<span class="muted">none</span>') + "</td></tr>";
          }).join("") + "</tbody></table></div>";
      }).join("") || '<p class="note">No sources match this filter.</p>';
      el.innerHTML =
        "<h1>Sources</h1>" +
        '<p class="muted">Every source with its access status. "Never opened" and "blocked" sources must not be trusted for values. Click a title for its row; click a count to see the rows that use it.</p>' +
        '<div class="ctrl"><label>Show <select id="sf">' +
        [["all", "All"], ["never", "Never opened"], ["blocked", "Blocked"], ["opened", "Opened or rendered"]].map(function (o) {
          return '<option value="' + o[0] + '"' + (st.filter === o[0] ? " selected" : "") + ">" + o[1] + "</option>";
        }).join("") + '</select></label><label>Search <input id="sq" type="search" value="' + esc(st.q) + '"></label></div>' +
        html;
      document.getElementById("sf").onchange = function (e) { st.filter = e.target.value; draw(); };
      document.getElementById("sq").oninput = function (e) { st.q = e.target.value; draw(); };
      el.onclick = function (e) {
        var a = e.target.closest ? e.target.closest("a[data-src-table]") : null;
        if (!a) return;
        e.preventDefault();
        A.openTableFilter(a.getAttribute("data-src-table"), a.getAttribute("data-col"), a.getAttribute("data-src"));
      };
    }
    draw();
  }

  /* ---------- about ---------- */
  function viewAbout(el) {
    var S = (window.ATLAS_DATA.schema) || {};
    function text(key) { return S[key] ? esc(S[key]).replace(/`([^`]+)`/g, "<code>$1</code>") : "(see data_schema.md)"; }
    var rows = [
      ["evidence_type", "Evidence type"], ["confidence", "Confidence"], ["access_status", "Access status"],
      ["red_bull_involvement", "Red Bull involvement"]
    ].map(function (k) {
      return "<h3>" + esc(k[1]) + " <span class=\"code\">" + esc(k[0]) + "</span></h3><p>" + text(k[0]) + "</p>";
    }).join("");
    var counts = A.TABLE_NAMES.map(function (tn) {
      return "<li>" + esc(A.FILE_LABEL[tn]) + ": " + T[tn].length + " rows</li>";
    }).join("");
    el.innerHTML =
      "<h1>About this page</h1>" +
      '<p>This page shows the data of the Dance Scene Atlas. It is view only: nothing can be edited here. Corrections are made in the CSV files, then the page is rebuilt.</p>' +
      "<h2>How to read it</h2><ul>" +
      "<li><b>Overview</b>: data quality, gaps and conflicts.</li>" +
      "<li><b>City comparison</b>: the 15 deep cities side by side for breaking, salsa and bachata, one signal at a time, with a check of whether the values can be compared.</li>" +
      "<li><b>Breaking vs Latin</b>: what the data says about the size of each world (online interest, large events, national figures, Red Bull footprint) and what is still missing.</li>" +
      "<li><b>Tables</b>: every CSV file. Search, filter, sort, show or hide columns; click a row for its source and related rows.</li>" +
      "<li><b>Grid</b>: places × disciplines, counts only.</li>" +
      "<li><b>Geographic map</b>: places with coordinates; circle size is a count.</li>" +
      "<li><b>Concept map</b>: how items connect.</li>" +
      "<li><b>Sources</b>: every source with its access status.</li></ul>" +
      "<h2>Legend and definitions</h2>" +
      '<p class="muted">Taken from the data contract (project/data_schema.md, section 2).</p>' + rows +
      "<h3>Rules</h3><p>" + text("rule_absent") + "</p>" +
      '<p><b>No scores are shown: raw evidence only.</b> No rankings, no composite indexes. The two analysis views add only plain sums and ratios, labelled as computed.</p>' +
      "<h2>This build</h2><ul>" +
      "<li>Built: " + esc(BUILD.date) + " from " + esc(BUILD.source) + "</li>" +
      "<li>Fingerprint: " + esc(BUILD.fingerprint) + "</li>" +
      "<li>Counts:</li></ul><ul>" + counts + "</ul>";
  }

  /* ---------- register and start ---------- */
  A.registerViewFn("overview", viewOverview);
  A.registerViewFn("grid", viewGrid);
  A.registerViewFn("map", viewMap);
  A.registerViewFn("concept", viewConcept);
  A.registerViewFn("sources", viewSources);
  A.registerViewFn("about", viewAbout);
  window.ATLAS_START();
})();
