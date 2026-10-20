/* Dance Scene Atlas viewer: analysis views (city comparison, breaking vs Latin).
   Reads the same tables as the other views. Shows raw values side by side; the only derived
   numbers are plain sums and ratios, always labelled as computed. View only. */
(function () {
  "use strict";

  var A = window.ATLAS;
  var T = A.T;
  var esc = A.esc;
  var badge = A.badge;
  var FACTS = T["facts.csv"];
  var EVENTS = T["events.csv"];
  var PLACES = T["places.csv"];
  var DISCS = T["disciplines.csv"];
  var SIGNALS = T["signals.csv"];

  var MAIN = ["URB-BRK", "CAR-SAL", "CAR-BCH"];
  var MAIN_LABEL = { "URB-BRK": "Breaking", "CAR-SAL": "Salsa", "CAR-BCH": "Bachata" };
  var SCENE_SIGNALS = ["EVT", "SCH", "COM", "CMP", "ATH", "SPA", "PRC", "LAD", "ORG"];
  var CONF_RANK = { H: 0, M: 1, L: 2 };
  var EV_RANK = { found: 0, stated_by_organiser: 1, inferred: 2, not_found: 3 };

  function isFlagged(f) { return /^REVIEW /.test(f.notes || ""); }
  function isReal(f) { return f.evidence_type !== "not_found"; }
  function num(v) { var n = parseFloat(v); return isNaN(n) ? null : n; }
  function fmt(n) { return n === null || n === undefined ? "" : Number(n).toLocaleString("en-GB"); }
  function valueText(f) {
    if (f.value !== "") return f.value;
    if (f.value_low !== "" || f.value_high !== "") return f.value_low + "–" + f.value_high;
    return "";
  }
  function better(a, b) {
    var ea = EV_RANK[a.evidence_type], eb = EV_RANK[b.evidence_type];
    if (ea !== eb) return ea - eb;
    return (CONF_RANK[a.confidence] || 3) - (CONF_RANK[b.confidence] || 3);
  }
  function placeById(id) { return A.IDX.place[id]; }
  function confBadge(c) { return '<span class="badge b-' + esc(c) + '" title="confidence ' + esc(c) + '">' + esc(c) + "</span>"; }
  // Area a population figure refers to, read from its unit and notes.
  function areaOf(f) {
    var s = (f.unit || "") + " " + (f.notes || "");
    if (/FUA/.test(s)) return "metro (FUA)";
    if (/greater city/i.test(s)) return "greater city";
    if (/city proper|comune|Gemeinde|urb_cpop1/i.test(s)) return "city";
    return "unclear";
  }

  // Clickable rows: each view keeps its own list and opens the side panel on click.
  function linker() {
    var rows = [];
    return {
      link: function (table, row, html, title) {
        rows.push({ table: table, row: row });
        return '<a href="#" data-arow="' + (rows.length - 1) + '"' + (title ? ' title="' + esc(title) + '"' : "") + ">" + html + "</a>";
      },
      handler: function (e) {
        var a = e.target.closest ? e.target.closest("a[data-arow]") : null;
        if (!a) return false;
        e.preventDefault();
        var r = rows[Number(a.getAttribute("data-arow"))];
        A.openRow(r.table, r.row);
        return true;
      }
    };
  }

  function contextFact(placeId, signal) {
    var fs = FACTS.filter(function (f) {
      return f.place_id === placeId && f.disc_id === "ALL" && f.signal_id === signal && isReal(f);
    });
    function areaRank(f) { return signal === "POP" && areaOf(f) !== "city" ? 1 : 0; }
    fs.sort(function (a, b) { return areaRank(a) - areaRank(b) || better(a, b) || String(b.period).localeCompare(String(a.period)); });
    return fs[0] || null;
  }

  function redBullEvents(placeId) {
    return EVENTS.filter(function (e) {
      var y = String(e.date_start).slice(0, 4);
      return e.place_id === placeId && e.red_bull_involvement === "found" && y >= "2024" && y <= "2026";
    });
  }

  /* ---------- city comparison ---------- */
  var cmpState = { signal: "EVT", unit: "", hideFlagged: false, order: "pop" };

  function viewCompare(el) {
    var L = linker();
    var cities = PLACES.filter(function (p) { return p.role === "deep"; });

    function cell(place, disc, signal) {
      var fs = FACTS.filter(function (f) {
        return f.place_id === place.place_id && f.disc_id === disc && f.signal_id === signal;
      });
      var level = "city";
      if (!fs.some(isReal)) {
        // Ladders and some sizes are recorded per country: show them, marked as country values.
        var cfs = FACTS.filter(function (f) {
          return f.place_id === place.country_iso2 && f.disc_id === disc && f.signal_id === signal && isReal(f);
        });
        if (cfs.length) { fs = cfs; level = "country"; }
      }
      if (cmpState.hideFlagged) fs = fs.filter(function (f) { return !isFlagged(f); });
      if (cmpState.unit) fs = fs.filter(function (f) { return !isReal(f) || f.unit === cmpState.unit; });
      var real = fs.filter(isReal).sort(better);
      if (!real.length) {
        var nf = fs.filter(function (f) { return f.evidence_type === "not_found"; });
        if (nf.length) return { html: L.link("facts.csv", nf[0], '<span class="muted">not found</span>', nf[0].notes), unit: null };
        return { html: '<span class="muted">—</span>', unit: null };
      }
      var f = real[0];
      var flag = isFlagged(f) ? ' <span class="badge b-bad" title="Flagged for review">!</span>' : "";
      var more = real.length > 1 ? ' <span class="muted small">+' + (real.length - 1) + "</span>" : "";
      var where = level === "country" ? ' <span class="muted small">(' + esc(place.country_iso2) + ")</span>" : "";
      var html = L.link("facts.csv", f, "<b>" + esc(valueText(f)) + "</b>", f.notes) +
        ' <span class="small muted">' + esc(f.unit) + "</span>" + where + flag + more +
        " " + confBadge(f.confidence);
      return { html: html, unit: f.unit, level: level };
    }

    function unitsFor(sig) {
      var u = {};
      FACTS.forEach(function (f) {
        if (f.signal_id !== sig || MAIN.indexOf(f.disc_id) < 0 || !isReal(f) || !f.unit) return;
        var p = placeById(f.place_id);
        if (!p || (p.role !== "deep" && p.place_type !== "country")) return;
        u[f.unit] = (u[f.unit] || 0) + 1;
      });
      return Object.keys(u).sort(function (a, b) { return u[b] - u[a] || a.localeCompare(b); }).map(function (k) { return [k, u[k]]; });
    }

    function draw() {
      var sig = cmpState.signal;
      var unitList = unitsFor(sig);
      if (cmpState.unit && !unitList.some(function (x) { return x[0] === cmpState.unit; })) cmpState.unit = "";
      var rows = cities.map(function (p) {
        var pop = contextFact(p.place_id, "POP");
        var stu = contextFact(p.place_id, "STU");
        return { p: p, pop: pop, stu: stu, popN: pop ? num(pop.value) : null, rb: redBullEvents(p.place_id) };
      });
      rows.sort(function (a, b) {
        if (cmpState.order === "name") return a.p.name.localeCompare(b.p.name);
        return (b.popN || 0) - (a.popN || 0);
      });
      var units = {};
      MAIN.forEach(function (d) { units[d] = {}; });
      var withValue = {};
      MAIN.forEach(function (d) { withValue[d] = 0; });

      var body = rows.map(function (r) {
        var p = r.p;
        var rbHtml = r.rb.length
          ? r.rb.map(function (e) { return L.link("events.csv", e, esc(e.series.replace("Red Bull ", "")), e.name + " " + e.date_start); }).join(", ")
          : '<span class="muted">none found</span>';
        var tds = MAIN.map(function (d) {
          var c = cell(p, d, sig);
          if (c.unit) { units[d][c.unit] = (units[d][c.unit] || 0) + 1; withValue[d] += 1; }
          return "<td>" + c.html + "</td>";
        }).join("");
        return "<tr><td><b>" + esc(p.name) + '</b> <span class="muted small">' + esc(p.country_iso2) + "</span></td>" +
          "<td>" + (r.pop ? L.link("facts.csv", r.pop, fmt(r.popN), (r.pop.unit || "") + " · " + r.pop.period + " · " + r.pop.notes) +
            ' <span class="small muted">' + esc(areaOf(r.pop)) + "</span>" : '<span class="muted">—</span>') + "</td>" +
          "<td>" + (r.stu ? L.link("facts.csv", r.stu, fmt(num(r.stu.value)), r.stu.period + " · " + r.stu.notes) : '<span class="muted">—</span>') + "</td>" +
          '<td class="small">' + rbHtml + "</td>" + tds + "</tr>";
      }).join("");

      var sigInfo = A.IDX.signal[sig];
      var unitNotes = MAIN.map(function (d) {
        var list = Object.keys(units[d]);
        var verdict = list.length > 1
          ? '<span class="badge b-bad">not comparable as is: ' + list.length + " different units</span>"
          : (list.length === 1 ? '<span class="badge b-found">one unit</span>' : '<span class="badge b-nf">no values</span>');
        return "<li><b>" + MAIN_LABEL[d] + "</b>: values for " + withValue[d] + " of " + cities.length + " cities · " + verdict +
          (list.length ? '<br><span class="small muted">' + list.map(function (u) { return esc(u) + " (" + units[d][u] + ")"; }).join(" · ") + "</span>" : "") + "</li>";
      }).join("");

      el.innerHTML =
        "<h1>City comparison</h1>" +
        '<p class="muted">The 15 deep cities side by side: size, Red Bull dance events 2024-2026, and one scene signal for breaking, salsa and bachata. ' +
        'Each cell shows the best row on file (found before inferred, H before L); "+n" means more rows exist. Click a value for its row and source. ' +
        'A red <span class="badge b-bad">!</span> marks a row flagged for review (2026-10-20). Values marked with a country code are national, not city values. ' +
        'Pick one unit to see only values measured the same way.</p>' +
        '<div class="ctrl"><label>Signal <select id="csig">' + SCENE_SIGNALS.map(function (s) {
          var info = A.IDX.signal[s];
          return '<option value="' + s + '"' + (s === sig ? " selected" : "") + ">" + s + (info ? " · " + esc(info.signal) : "") + "</option>";
        }).join("") + "</select></label>" +
        '<label>Order <select id="cord"><option value="pop"' + (cmpState.order === "pop" ? " selected" : "") + '>by population</option><option value="name"' + (cmpState.order === "name" ? " selected" : "") + ">by name</option></select></label>" +
        '<label>Unit <select id="cunit"><option value="">all units</option>' + unitList.map(function (x) {
          return '<option value="' + esc(x[0]) + '"' + (x[0] === cmpState.unit ? " selected" : "") + ">" + esc(x[0]) + " (" + x[1] + ")</option>";
        }).join("") + "</select></label>" +
        '<label><input type="checkbox" id="cflag"' + (cmpState.hideFlagged ? " checked" : "") + "> hide flagged rows</label></div>" +
        (sigInfo && sigInfo.definition ? '<p class="note"><b>' + esc(sig) + "</b>: " + esc(sigInfo.definition) + "</p>" : "") +
        '<div class="hscroll"><table class="data small"><thead><tr><th>City</th><th>Population</th><th>Students</th><th>Red Bull dance events 2024-2026</th>' +
        MAIN.map(function (d) { return "<th>" + MAIN_LABEL[d] + " · " + esc(sig) + "</th>"; }).join("") +
        "</tr></thead><tbody>" + body + "</tbody></table></div>" +
        "<h2>Can this signal be compared across cities?</h2><ul class=\"plain\">" + unitNotes + "</ul>" +
        '<p class="note">A signal is comparable only when every city uses the same unit, the same method and the same source type. ' +
        "Counts taken from one listing site measure that site, not the scene. Population: the city-proper figure is shown when one is on file; the area is written next to each number, and figures for different areas must not be compared directly.</p>";

      document.getElementById("csig").onchange = function (e) { cmpState.signal = e.target.value; cmpState.unit = ""; draw(); };
      document.getElementById("cunit").onchange = function (e) { cmpState.unit = e.target.value; draw(); };
      document.getElementById("cord").onchange = function (e) { cmpState.order = e.target.value; draw(); };
      document.getElementById("cflag").onchange = function (e) { cmpState.hideFlagged = e.target.checked; draw(); };
    }
    el.onclick = function (e) { L.handler(e); };
    draw();
  }

  /* ---------- breaking vs Latin ---------- */
  function wikiRows() {
    // One value per language and discipline: prefer rows whose unit names the article.
    var out = {};
    FACTS.forEach(function (f) {
      if (f.place_id !== "GLOBAL" || f.signal_id !== "ONL" || !isReal(f) || MAIN.indexOf(f.disc_id) < 0) return;
      var m = /\((?:[^,]*), (\w\w)\.wiki article "([^"]+)"\)/.exec(f.unit);
      var lang = m ? m[1] : null;
      var strong = !!m;
      if (!lang) {
        var m2 = /(\w\w)\.wikipedia/.exec(f.notes || "");
        if (m2) lang = m2[1];
      }
      if (!lang) return;
      var key = lang + "|" + f.disc_id;
      if (!out[key] || (strong && !out[key].strong)) out[key] = { f: f, strong: strong, title: m ? m[2] : "" };
    });
    return out;
  }

  function viewMarket(el) {
    var L = linker();
    var W = wikiRows();
    var langs = ["en", "de", "fr", "es", "it", "pl", "nl", "pt"];
    var LANG = { en: "English", de: "German", fr: "French", es: "Spanish", it: "Italian", pl: "Polish", nl: "Dutch", pt: "Portuguese" };
    var max = 1;
    langs.forEach(function (l) { MAIN.forEach(function (d) { var r = W[l + "|" + d]; if (r && num(r.f.value) > max) max = num(r.f.value); }); });

    var wikiBody = langs.map(function (l) {
      var vals = {};
      var cells = MAIN.map(function (d) {
        var r = W[l + "|" + d];
        if (!r) return '<td><span class="muted">not on file</span></td>';
        var v = num(r.f.value);
        vals[d] = v;
        var w = Math.max(2, Math.round(v / max * 100));
        return '<td><div class="mini-bar"><span style="width:' + w + '%"></span></div>' +
          L.link("facts.csv", r.f, fmt(v), (r.title ? r.title + " · " : "") + r.f.notes) + "</td>";
      }).join("");
      var latin = (vals["CAR-SAL"] || 0) + (vals["CAR-BCH"] || 0);
      var both = vals["CAR-SAL"] !== undefined && vals["CAR-BCH"] !== undefined;
      var ratio = vals["URB-BRK"] && latin && both ? (latin / vals["URB-BRK"]).toFixed(1) + "×" : "";
      return "<tr><td>" + LANG[l] + "</td>" + cells + "<td>" + (latin ? fmt(latin) + (both ? "" : ' <span class="muted small">(partial)</span>') : "") +
        "</td><td><b>" + ratio + "</b>" + (!both ? '<span class="muted small">not computed (a value is missing)</span>' : "") + "</td></tr>";
    }).join("");

    // Large events with a stated size, by family.
    var sized = EVENTS.filter(function (e) { return num(e.scale_value) !== null && e.scale_type !== "none"; });
    function family(d) { return d.indexOf("CAR-") === 0 ? "Latin (salsa, bachata)" : (d.indexOf("URB-") === 0 ? "Hip hop family (breaking, all styles)" : "Other"); }
    var fam = {};
    sized.forEach(function (e) { (fam[family(e.disc_id)] || (fam[family(e.disc_id)] = [])).push(e); });
    var eventsHtml = Object.keys(fam).sort().map(function (k) {
      var list = fam[k].sort(function (a, b) { return num(b.scale_value) - num(a.scale_value); });
      return "<h3>" + esc(k) + " (" + list.length + ")</h3>" +
        '<div class="hscroll"><table class="data small"><thead><tr><th>Event</th><th>City</th><th>Date</th><th>Size</th><th>Evidence</th><th>Red Bull</th></tr></thead><tbody>' +
        list.map(function (e) {
          var p = placeById(e.place_id);
          return "<tr><td>" + L.link("events.csv", e, esc(e.name)) + "</td><td>" + esc(p ? p.name : e.place_id) + "</td><td>" + esc(e.date_start) +
            "</td><td><b>" + fmt(num(e.scale_value)) + "</b> " + esc(e.scale_type) + "</td><td>" + badge("evidence_type", e.scale_evidence) +
            "</td><td>" + badge("red_bull_involvement", e.red_bull_involvement) + "</td></tr>";
        }).join("") + "</tbody></table></div>";
    }).join("");

    // National and global size figures: breaking-specific next to all-dance figures.
    var sizeSignals = ["ATH", "ORG", "COM", "SCH"];
    var sizes = FACTS.filter(function (f) {
      var p = placeById(f.place_id);
      return p && (p.place_type === "country" || p.place_type === "global") && isReal(f) &&
        sizeSignals.indexOf(f.signal_id) >= 0 && (f.disc_id === "ALL" || MAIN.indexOf(f.disc_id) >= 0) &&
        !/Red Bull/.test(f.unit);
    }).sort(function (a, b) { return a.place_id.localeCompare(b.place_id) || a.disc_id.localeCompare(b.disc_id); });
    var sizesHtml = '<div class="hscroll"><table class="data small"><thead><tr><th>Where</th><th>Applies to</th><th>Value</th><th>Unit</th><th>Year</th><th>Evidence</th></tr></thead><tbody>' +
      sizes.map(function (f) {
        var p = placeById(f.place_id);
        return "<tr><td>" + esc(p ? p.name : f.place_id) + "</td><td>" + (MAIN_LABEL[f.disc_id] ? "<b>" + MAIN_LABEL[f.disc_id] + "</b>" : '<span class="muted">all dance / dancesport</span>') +
          "</td><td>" + L.link("facts.csv", f, "<b>" + esc(valueText(f)) + "</b>", f.notes) + "</td><td>" + esc(f.unit) + "</td><td>" + esc(f.period) +
          "</td><td>" + badge("evidence_type", f.evidence_type) + " " + badge("confidence", f.confidence) + "</td></tr>";
      }).join("") + "</tbody></table></div>";

    // Red Bull footprint per discipline.
    var rb = {};
    EVENTS.forEach(function (e) {
      if (e.red_bull_involvement !== "found") return;
      var d = A.IDX.disc[e.disc_id];
      var k = d ? d.discipline : e.disc_id;
      rb[k] = (rb[k] || 0) + 1;
    });
    var rbList = Object.keys(rb).sort(function (a, b) { return rb[b] - rb[a]; }).map(function (k) {
      return "<li>" + esc(k) + ": <b>" + rb[k] + "</b> event rows</li>";
    }).join("");
    var latinRb = EVENTS.filter(function (e) { return e.red_bull_involvement === "found" && e.disc_id.indexOf("CAR-") === 0; }).length;

    el.innerHTML =
      "<h1>Breaking vs Latin: how big is each audience?</h1>" +
      '<p class="muted">What the data on file says about the size of the breaking and the salsa/bachata worlds. ' +
      "Two different things are mixed in the word \"market\": <b>people who dance</b> (take classes, go to socials and congresses, pay) and <b>people who watch</b> (audience, content, brand reach). " +
      "Each block below says which one it measures.</p>" +

      "<h2>1. Online interest: Wikipedia page views, Jan-Oct 2025</h2>" +
      '<p class="note">Measures curiosity (watch and learn), per language, not per city. Computed columns: Latin = salsa + bachata; ratio = Latin ÷ breaking.</p>' +
      '<div class="hscroll"><table class="data small"><thead><tr><th>Language</th><th>Breaking</th><th>Salsa</th><th>Bachata</th><th>Latin (computed)</th><th>Latin ÷ breaking</th></tr></thead><tbody>' +
      wikiBody + "</tbody></table></div>" +
      '<p class="note">Caveats: in some languages the salsa and bachata articles also cover the music genre, which inflates them (Spanish bachata most of all). ' +
      "2025 is the year after the Paris Olympics, so breaking interest may be falling from a peak. Views say nothing about how many people actually dance.</p>" +

      "<h2>2. Large events with a stated size</h2>" +
      '<p class="note">Measures people who dance and travel (participants, seats, attendees). Sizes are mostly stated by organisers and are not checked independently; the units differ (seats per day vs participants).</p>' +
      eventsHtml +

      "<h2>3. National and international size figures</h2>" +
      '<p class="note">Federation members, licences, clubs, athletes. Most figures cover all dance or dancesport, not one style: read the "Applies to" column. No national figure for salsa/bachata dancers is on file.</p>' +
      sizesHtml +

      "<h2>4. Red Bull's dance footprint on file</h2><ul class=\"plain\">" + rbList +
      "<li>Salsa / bachata: <b>" + latinRb + "</b> Red Bull event rows (research A3 found no dedicated Red Bull Latin event)</li></ul>" +

      "<h2>5. What is still missing to answer the question</h2>" +
      '<ul><li>The same count, made the same way, for both worlds in each of the 15 cities: events listed per year (goandance for Latin, and8.dance for breaking), schools with a weekly class, the largest public community group.</li>' +
      "<li>Google Trends per city, comparing the dance topics directly (manual).</li>" +
      "<li>Salzburg ground truth from a local teacher, to measure how much the platforms miss.</li>" +
      "<li>Audience: views of the main breaking and salsa/bachata video channels.</li></ul>" +
      '<p class="note">See project/analysis_and_plan.md for the plan.</p>';

    el.onclick = function (e) { L.handler(e); };
  }

  A.registerViewFn("compare", viewCompare);
  A.registerViewFn("market", viewMarket);
})();
