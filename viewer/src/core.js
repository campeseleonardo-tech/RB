/* Dance Scene Atlas viewer: core (data indexes, badges, tables, side panel, navigation).
   View only: nothing here writes data. Inlined into atlas.html by viewer/build_viewer.py. */
(function () {
  "use strict";

  var DATA = window.ATLAS_DATA;
  var COLS = DATA.columns;
  var BUILD = DATA.build;

  // Tables are stored as column-ordered arrays; expand them once into row objects.
  var T = {};
  Object.keys(COLS).forEach(function (name) {
    var src = DATA.tables[name];
    var cols = COLS[name];
    T[name] = src.v.map(function (values, i) {
      var row = { _row: src.r[i] };
      cols.forEach(function (c, j) { row[c] = values[j]; });
      return row;
    });
  });

  var FILE_LABEL = {
    "places.csv": "Places",
    "disciplines.csv": "Disciplines",
    "signals.csv": "Signals",
    "sources.csv": "Sources",
    "facts.csv": "Facts",
    "events.csv": "Events",
    "organisations.csv": "Organisations",
    "athletes.csv": "Athletes",
    "redbull_finance.csv": "Red Bull finance",
    "relations.csv": "Relations",
    "review_log.csv": "Review log"
  };
  var TABLE_NAMES = Object.keys(FILE_LABEL);

  // Columns that hold an id of a row in another table, and the kind of that table.
  var REF_KIND = {
    place_id: "place", base_place_id: "place", disc_id: "disc", signal_id: "signal",
    source_id: "source", website_source_id: "source", organiser_org_id: "org",
    org_id: "org", event_id: "event", athlete_id: "athlete"
  };
  var KIND_TABLE = {
    place: "places.csv", disc: "disciplines.csv", signal: "signals.csv", source: "sources.csv",
    org: "organisations.csv", event: "events.csv", athlete: "athletes.csv"
  };
  var KIND_KEY = {
    place: "place_id", disc: "disc_id", signal: "signal_id", source: "source_id",
    org: "org_id", event: "event_id", athlete: "athlete_id"
  };
  var KIND_NAME = {
    place: "name", disc: "discipline", signal: "signal", source: "title",
    org: "name", event: "name", athlete: "public_name"
  };
  var TYPE_KIND = {
    place: "place", discipline: "disc", org: "org", event: "event", athlete: "athlete"
  };
  // Columns that refer to the same kind of thing under another name.
  var SAME_COLS = {
    place_id: ["base_place_id"], base_place_id: ["place_id"],
    org_id: ["organiser_org_id"], organiser_org_id: ["org_id"],
    source_id: ["website_source_id"], website_source_id: ["source_id"]
  };
  var BADGE = {
    found: ["found", "b-found"],
    stated_by_organiser: ["stated by organiser", "b-stated"],
    inferred: ["inferred", "b-stated"],
    not_found: ["not found", "b-nf"],
    H: ["confidence H (high)", "b-H"],
    M: ["confidence M (medium)", "b-M"],
    L: ["confidence L (low)", "b-L"],
    opened: ["opened", "b-found"],
    rendered: ["rendered", "b-found"],
    blocked: ["blocked", "b-bad"],
    not_opened: ["never opened", "b-nf"],
    not_checked: ["not checked", "b-nf"],
    confirmed_absent: ["confirmed absent", "b-nf"]
  };
  // Columns shown as badges, with a words prefix.
  var BADGE_COLS = {
    evidence_type: "", confidence: "", access_status: "", scale_evidence: "scale: ",
    red_bull_involvement: "Red Bull: ", red_bull_athlete: "Red Bull athlete: "
  };
  var ROW_H = 34;

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
    });
  }

  function indexBy(rows, key) {
    var map = {};
    rows.forEach(function (r) {
      if (r[key] && map[r[key]] === undefined) map[r[key]] = r;
    });
    return map;
  }

  function groupBy(rows, key) {
    var map = {};
    rows.forEach(function (r) {
      var k = r[key];
      if (!k) return;
      (map[k] || (map[k] = [])).push(r);
    });
    return map;
  }

  var IDX = {};
  Object.keys(KIND_TABLE).forEach(function (kind) {
    IDX[kind] = indexBy(T[KIND_TABLE[kind]], KIND_KEY[kind]);
  });

  // Kind of the table that a column refers to in this row (relations use from_type/to_type).
  function kindOf(name, col, row) {
    if (name === "relations.csv" && (col === "from_id" || col === "to_id")) {
      return TYPE_KIND[row[col === "from_id" ? "from_type" : "to_type"]] || null;
    }
    return REF_KIND[col] || null;
  }

  function labelFor(name, col, row) {
    var value = row[col];
    if (!value) return "";
    var kind = kindOf(name, col, row);
    if (!kind) return "";
    var ref = IDX[kind][value];
    return ref ? String(ref[KIND_NAME[kind]]) : "";
  }

  function badge(col, value) {
    var b = BADGE[value];
    if (!b) return esc(value);
    var prefix = BADGE_COLS[col] || "";
    return '<span class="badge ' + b[1] + '">' + esc(prefix + b[0]) + "</span>";
  }

  function sourceCell(id) {
    if (!id) return "";
    var s = IDX.source[id];
    if (!s) return esc(id) + ' <span class="badge b-bad">missing source row</span>';
    return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" title="' +
      esc(s.url) + '">' + esc(s.title) + "</a> " + badge("access_status", s.access_status);
  }

  function cellHtml(name, col, row) {
    var value = row[col];
    if (value === "" || value == null) return "";
    if (col === "source_id" || col === "website_source_id") return sourceCell(value);
    if (col === "url") return '<a href="' + esc(value) + '" target="_blank" rel="noopener noreferrer">' + esc(value) + "</a>";
    if (BADGE_COLS.hasOwnProperty(col)) return badge(col, value);
    var label = labelFor(name, col, row);
    if (label) return esc(label) + ' <span class="code">' + esc(value) + "</span>";
    return esc(value);
  }

  // Plain text of a cell, used by the search and the filters (includes names behind ids).
  function cellText(name, col, row) {
    var value = row[col] == null ? "" : String(row[col]);
    var extra = labelFor(name, col, row);
    var word = BADGE[value] ? BADGE[value][0] : "";
    return value + " " + extra + " " + word;
  }

  function rowTitle(name, row) {
    if (name === "facts.csv") {
      return row.fact_id + " · " + (IDX.signal[row.signal_id] ? IDX.signal[row.signal_id].signal : row.signal_id) +
        " · " + (row.value || (row.value_low ? row.value_low + "–" + row.value_high : "not found"));
    }
    var first = COLS[name][0];
    var label = row.name || row.title || row.public_name || row.entity || row.metric ||
      row.item || row.relation || "";
    return row[first] + (label ? " · " + label : "");
  }

  /* ---------- side panel ---------- */
  var REG = [];
  var panel, panelBody;

  function openPanel(title, html) {
    panelBody.innerHTML = '<h2 class="panel-title">' + esc(title) + "</h2>" + html;
    panel.hidden = false;
    panelBody.scrollTop = 0;
  }

  function closePanel() {
    panel.hidden = true;
  }

  function registerRow(name, row) {
    REG.push({ table: name, row: row });
    return REG.length - 1;
  }

  function sourceBlock(row) {
    var id = row.source_id || row.website_source_id;
    if (!id) {
      return '<p class="note">No source on this row. It is a <b>not found</b> record or has no source yet; see the notes.</p>';
    }
    var s = IDX.source[id];
    if (!s) return '<p class="note">Source ' + esc(id) + " is missing from sources.csv.</p>";
    var used = 0;
    T["facts.csv"].concat(T["events.csv"], T["organisations.csv"], T["athletes.csv"],
      T["redbull_finance.csv"], T["relations.csv"]).forEach(function (r) {
      if (r.source_id === id || r.website_source_id === id) used++;
    });
    return '<dl class="kv">' +
      "<dt>Title</dt><dd>" + esc(s.title) + "</dd>" +
      "<dt>Publisher</dt><dd>" + esc(s.publisher) + "</dd>" +
      "<dt>Source type</dt><dd>" + esc(s.source_type) + "</dd>" +
      "<dt>Link</dt><dd>" + (s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.url) + "</a>" : "none") + "</dd>" +
      "<dt>Access</dt><dd>" + badge("access_status", s.access_status) + (s.access_date ? " on " + esc(s.access_date) : "") + "</dd>" +
      "<dt>Notes</dt><dd>" + esc(s.notes) + "</dd>" +
      "<dt>Rows that use it</dt><dd>" + used + ' · <a href="#" data-go="sources" data-src="' + esc(id) + '">open in Sources</a></dd>' +
      "</dl>";
  }

  var HUMAN_COL = {
    place_id: "place", base_place_id: "place", disc_id: "discipline", signal_id: "signal",
    source_id: "source", website_source_id: "source", org_id: "organisation",
    organiser_org_id: "organisation", event_id: "event", athlete_id: "athlete", series: "series"
  };

  function relatedHtml(name, row) {
    var checks = [];
    COLS[name].forEach(function (col) {
      var value = row[col];
      if (!value) return;
      if (name === "relations.csv" && (col === "from_id" || col === "to_id")) return;
      if (col === "series") {
        checks.push({ col: col, value: value, cands: ["series"] });
      } else if (REF_KIND[col]) {
        checks.push({ col: col, value: value, cands: [col].concat(SAME_COLS[col] || []) });
      }
    });
    var html = "";
    checks.forEach(function (c) {
      TABLE_NAMES.forEach(function (tn) {
        var hits = T[tn].filter(function (r) {
          if (r === row) return false;
          return c.cands.some(function (k) { return COLS[tn].indexOf(k) >= 0 && r[k] === c.value; });
        });
        if (!hits.length) return;
        var shown = hits.slice(0, 25);
        var what = HUMAN_COL[c.col] || c.col;
        var label = labelFor(name, c.col, row) || c.value;
        html += '<div class="rel"><h4>' + esc(FILE_LABEL[tn]) + " with the same " + esc(what) +
          ": " + esc(label) + " (" + hits.length + ")</h4><ul>";
        shown.forEach(function (r) {
          html += '<li><a href="#" data-reg="' + registerRow(tn, r) + '">' + esc(rowTitle(tn, r)) + "</a></li>";
        });
        html += "</ul>";
        if (hits.length > shown.length) {
          html += '<p class="note">Showing 25 of ' + hits.length + '. <a href="#" data-filter-table="' + esc(tn) +
            '" data-col="' + esc(c.cands[0]) + '" data-val="' + esc(c.value) + '">Show all in the table</a></p>';
        } else {
          html += '<p class="note"><a href="#" data-filter-table="' + esc(tn) + '" data-col="' + esc(c.cands[0]) +
            '" data-val="' + esc(c.value) + '">Open in the table</a></p>';
        }
        html += "</div>";
      });
    });
    return html || '<p class="note">No other rows share an id with this row.</p>';
  }

  function openRow(name, row) {
    REG = [];
    var evidence = [];
    ["evidence_type", "confidence", "red_bull_involvement", "red_bull_athlete", "scale_evidence", "access_status"]
      .forEach(function (col) {
        if (row[col] !== undefined && row[col] !== "") {
          evidence.push('<span class="evlabel">' + esc(col.replace(/_/g, " ")) + ":</span> " + badge(col, row[col]));
        }
      });
    var columns = COLS[name].map(function (col) {
      return "<dt>" + esc(col) + "</dt><dd>" + (cellHtml(name, col, row) || '<span class="muted">empty</span>') + "</dd>";
    }).join("");
    var html =
      '<p class="muted">' + esc(FILE_LABEL[name]) + " · " + esc(name) + " · row " + row._row + " in the file</p>" +
      (evidence.length ? '<div class="evstrip">' + evidence.join(" &nbsp; ") + "</div>" : "") +
      "<h3>Source</h3>" + sourceBlock(row) +
      "<h3>All columns</h3><dl class=\"kv\">" + columns + "</dl>" +
      "<h3>Related rows</h3>" + relatedHtml(name, row);
    openPanel(rowTitle(name, row), html);
  }

  /* ---------- tables ---------- */
  var TS = {};

  function tstate(name) {
    return TS[name] || (TS[name] = { q: "", f: {}, sort: null, dir: 1, hidden: {}, view: [] });
  }

  function visibleCols(name) {
    var st = tstate(name);
    return COLS[name].filter(function (c) { return !st.hidden[c]; });
  }

  function isNumeric(v) {
    return v !== "" && !isNaN(Number(v));
  }

  function tableView(name) {
    var st = tstate(name);
    var q = st.q.toLowerCase();
    var filters = Object.keys(st.f).filter(function (c) { return st.f[c]; });
    var out = T[name].filter(function (row) {
      if (q) {
        var hit = COLS[name].some(function (c) {
          return cellText(name, c, row).toLowerCase().indexOf(q) >= 0;
        });
        if (!hit) return false;
      }
      return filters.every(function (c) {
        return cellText(name, c, row).toLowerCase().indexOf(st.f[c].toLowerCase()) >= 0;
      });
    });
    if (st.sort) {
      var col = st.sort;
      var dir = st.dir;
      out.sort(function (a, b) {
        var x = a[col] || "";
        var y = b[col] || "";
        if (isNumeric(x) && isNumeric(y)) return (Number(x) - Number(y)) * dir;
        return x.localeCompare(y) * dir;
      });
    }
    return out;
  }

  function theadHtml(name) {
    var st = tstate(name);
    var cols = visibleCols(name);
    var top = cols.map(function (c) {
      var mark = st.sort === c ? (st.dir > 0 ? " ▲" : " ▼") : "";
      return '<th data-sort="' + esc(c) + '"' + (st.sort === c ? ' class="sorted"' : "") + ">" + esc(c) + mark + "</th>";
    }).join("");
    var filters = cols.map(function (c) {
      return '<th><input data-f="' + esc(c) + '" value="' + esc(st.f[c] || "") + '" placeholder="filter" aria-label="filter ' + esc(c) + '"></th>';
    }).join("");
    return "<tr>" + top + '</tr><tr class="frow">' + filters + "</tr>";
  }

  function renderBody(name) {
    var st = tstate(name);
    var scroller = document.getElementById("tscroll");
    var tbody = document.getElementById("tbody");
    if (!scroller || !tbody) return;
    var cols = visibleCols(name);
    var view = st.view;
    var start = Math.max(0, Math.floor(scroller.scrollTop / ROW_H) - 15);
    var count = Math.ceil((scroller.clientHeight || 600) / ROW_H) + 30;
    var end = Math.min(view.length, start + count);
    var span = cols.length || 1;
    var html = '<tr class="spacer" style="height:' + (start * ROW_H) + 'px"><td colspan="' + span + '"></td></tr>';
    for (var i = start; i < end; i++) {
      var row = view[i];
      html += '<tr data-i="' + i + '">';
      cols.forEach(function (c) {
        html += "<td>" + cellHtml(name, c, row) + "</td>";
      });
      html += "</tr>";
    }
    html += '<tr class="spacer" style="height:' + ((view.length - end) * ROW_H) + 'px"><td colspan="' + span + '"></td></tr>';
    tbody.innerHTML = html;
  }

  function refreshView(name, resetScroll) {
    var st = tstate(name);
    st.view = tableView(name);
    var count = document.getElementById("tcount");
    if (count) {
      count.textContent = "Showing " + st.view.length + " of " + T[name].length + " rows";
    }
    if (resetScroll) {
      var scroller = document.getElementById("tscroll");
      if (scroller) scroller.scrollTop = 0;
    }
    renderBody(name);
  }

  function csvText(name, rows, cols) {
    function q(v) {
      var s = v == null ? "" : String(v);
      return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }
    return [cols.map(q).join(",")].concat(rows.map(function (r) {
      return cols.map(function (c) { return q(r[c]); }).join(",");
    })).join("\r\n");
  }

  function copyCsv(name) {
    var st = tstate(name);
    var cols = visibleCols(name);
    var text = csvText(name, st.view, cols);
    function fallback() {
      openPanel("Copy this text (CSV)", '<p class="note">Copying is not allowed here. Select the text below and copy it (Ctrl+C).</p>' +
        '<textarea class="copybox" readonly rows="18">' + esc(text) + "</textarea>");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        document.getElementById("tcopied").textContent = "Copied " + st.view.length + " rows as CSV.";
      }, fallback);
    } else {
      fallback();
    }
  }

  function viewTables(el, parts) {
    var name = decodeURIComponent(parts[0] || "");
    if (TABLE_NAMES.indexOf(name) < 0) name = "facts.csv";
    var st = tstate(name);
    var tabs = TABLE_NAMES.map(function (tn) {
      return '<a href="#/tables/' + encodeURIComponent(tn) + '" class="tab' + (tn === name ? " on" : "") + '">' +
        esc(FILE_LABEL[tn]) + " <span class=\"muted\">" + T[tn].length + "</span></a>";
    }).join("");
    var cols = COLS[name].map(function (c) {
      return '<label class="colpick"><input type="checkbox" data-col-toggle="' + esc(c) + '"' +
        (st.hidden[c] ? "" : " checked") + "> " + esc(c) + "</label>";
    }).join("");
    el.innerHTML =
      "<h1>Tables</h1>" +
      '<p class="muted">One tab per CSV file (<code>data/' + esc(name) + "</code>). Click a row to see its source and related rows. Every source link is clickable. Column names are the data schema names.</p>" +
      '<nav class="tabs" aria-label="Tables">' + tabs + "</nav>" +
      '<div class="tbar">' +
      '<input id="tq" type="search" placeholder="Search all columns" value="' + esc(st.q) + '" aria-label="Search all columns">' +
      '<span id="tcount" class="muted"></span>' +
      '<details class="colmenu"><summary>Show or hide columns</summary><div class="colbox">' + cols + "</div></details>" +
      '<button id="tcopy" type="button">Copy as CSV</button>' +
      '<span id="tcopied" class="muted" aria-live="polite"></span>' +
      "</div>" +
      '<div id="tscroll" class="tscroll"><table class="data"><thead id="thead">' + theadHtml(name) +
      '</thead><tbody id="tbody"></tbody></table></div>';

    refreshView(name, false);

    var scroller = document.getElementById("tscroll");
    scroller.onscroll = function () { renderBody(name); };
    document.getElementById("tq").oninput = function (e) {
      st.q = e.target.value;
      refreshView(name, true);
    };
    document.getElementById("tcopy").onclick = function () { copyCsv(name); };
    el.onclick = function (e) {
      var th = e.target.closest ? e.target.closest("th[data-sort]") : null;
      if (th) {
        var col = th.getAttribute("data-sort");
        if (st.sort === col) { st.dir = -st.dir; } else { st.sort = col; st.dir = 1; }
        document.getElementById("thead").innerHTML = theadHtml(name);
        refreshView(name, false);
        return;
      }
      var tr = e.target.closest ? e.target.closest("tbody tr[data-i]") : null;
      if (tr) openRow(name, st.view[Number(tr.getAttribute("data-i"))]);
    };
    el.oninput = function (e) {
      var f = e.target.getAttribute && e.target.getAttribute("data-f");
      if (!f) return;
      st.f[f] = e.target.value;
      refreshView(name, true);
    };
    el.onchange = function (e) {
      var c = e.target.getAttribute && e.target.getAttribute("data-col-toggle");
      if (!c) return;
      st.hidden[c] = !e.target.checked;
      document.getElementById("thead").innerHTML = theadHtml(name);
      refreshView(name, false);
    };
  }

  // Opens a table with a filter on one column (used by links from numbers and related rows).
  function openTableFilter(name, col, value) {
    var st = tstate(name);
    st.q = "";
    st.f = {};
    if (col) st.f[col] = value;
    go("#/tables/" + encodeURIComponent(name));
  }

  /* ---------- navigation ---------- */
  var VIEWS = {};
  var NAV = [
    ["overview", "Overview"], ["tables", "Tables"], ["grid", "Grid"], ["map", "Geographic map"],
    ["concept", "Concept map"], ["sources", "Sources"], ["about", "About"]
  ];

  function registerView(name, fn) {
    VIEWS[name] = fn;
  }

  function route() {
    var parts = decodeURIComponent(location.hash.replace(/^#\/?/, "")).split("/");
    var view = parts[0] || "overview";
    if (!VIEWS[view]) view = "overview";
    document.querySelectorAll("nav a[data-view]").forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("data-view") === view);
    });
    var el = document.getElementById("view");
    el.innerHTML = "";
    closePanel();
    VIEWS[view](el, parts.slice(1));
    window.scrollTo(0, 0);
  }

  function go(hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  }

  function buildShell() {
    var app = document.getElementById("app");
    var nav = NAV.map(function (item) {
      return '<a href="#/' + item[0] + '" data-view="' + item[0] + '">' + esc(item[1]) + "</a>";
    }).join("");
    app.innerHTML =
      '<header class="top"><div class="brand">Dance Scene Atlas <span class="muted">data viewer</span></div>' +
      '<div class="built muted">Built ' + esc(BUILD.date) + " from " + esc(BUILD.source) +
      " · fingerprint " + esc(BUILD.fingerprint) + "</div></header>" +
      '<div class="layout"><nav class="menu" aria-label="Main">' + nav + "</nav>" +
      '<main id="view" class="main"></main></div>' +
      '<aside id="panel" class="panel" hidden><button id="pclose" class="pclose" type="button" aria-label="Close">Close ×</button>' +
      '<div id="pbody" class="pbody"></div></aside>';
    panel = document.getElementById("panel");
    panelBody = document.getElementById("pbody");
    document.getElementById("pclose").onclick = closePanel;
    panelBody.onclick = function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (!a) return;
      var reg = a.getAttribute("data-reg");
      var ft = a.getAttribute("data-filter-table");
      var go2 = a.getAttribute("data-go");
      if (reg !== null) {
        e.preventDefault();
        openRow(REG[Number(reg)].table, REG[Number(reg)].row);
      } else if (ft) {
        e.preventDefault();
        openTableFilter(ft, a.getAttribute("data-col"), a.getAttribute("data-val"));
      } else if (go2) {
        e.preventDefault();
        if (go2 === "sources") {
          var st = tstate("sources.csv");
          st.q = a.getAttribute("data-src") || "";
          st.f = {};
          go("#/tables/sources.csv");
          closePanel();
        }
      }
    };
  }

  window.ATLAS = {
    T: T, COLS: COLS, IDX: IDX, BUILD: BUILD, FILE_LABEL: FILE_LABEL, TABLE_NAMES: TABLE_NAMES,
    esc: esc, badge: badge, sourceCell: sourceCell, labelFor: labelFor, cellHtml: cellHtml,
    openRow: openRow, openPanel: openPanel, closePanel: closePanel, registerRow: registerRow,
    openTableFilter: openTableFilter, go: go, registerView: registerView, groupBy: groupBy,
    indexBy: indexBy, rowTitle: rowTitle, registerViewFn: registerView
  };

  registerView("tables", viewTables);
  buildShell();
  // views.js registers the other views and then calls start().
  window.ATLAS_START = function () {
    window.addEventListener("hashchange", route);
    route();
  };
})();
