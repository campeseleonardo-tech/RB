# Libraries and data in viewer/lib

## countries_110m.json
- What: country outlines (outer rings only, rounded to 0.1 degree) for the geographic view.
- Source: Natural Earth, 1:110m Admin 0 - Countries, https://www.naturalearthdata.com/ (file ne_110m_admin_0_countries.geojson from https://github.com/nvkelso/natural-earth-vector, accessed 2026-10-19).
- Licence: public domain (Natural Earth terms of use: no restrictions; attribution appreciated).
- Made by: a one-off conversion (keep the outer ring of each polygon, round coordinates). No other changes.

No other libraries are used. The concept map layout and the map are plain JavaScript and SVG, inlined by viewer/build_viewer.py.
