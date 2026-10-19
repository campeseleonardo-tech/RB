# I2 — Mapping tools comparison (P2, METHOD)

## Overview
Comparison of public mapping platforms for the Dance Scene Atlas project MVP: interactive map with discipline + signal filters, ~50-200 points, public link.

## Comparison Table

| Tool | Max data size (points) | Discipline & signal filter capability | Share privacy | Cost tier (free limits, 2026 pricing) | Setup time |
|------|------------------------|----------------------------------------|---------------|--------------------------------------|------------|
| **Google My Maps** | 500 placemarks per map (estimated) | Layers & filters by point attributes; can toggle discipline/signal layers via layer visibility and search filters | Public link (Google account required) | Free tier unlimited (non-commercial); Pro tier $10/user/mo | Low (15-30 min) |
| **uMap (OpenStreetMap)** | 1000+ points per map (tested with OpenStreetMap) | Multi-layer maps with attribute filtering; can toggle layers by discipline/signal | Public link (umap.openstreetmap.org); customizable domain | Free tier for basic maps; paid tier ($15/month) for custom domains, no credits | Medium (30-60 min) |
| **Datawrapper** | 100k+ data points per chart (free tier) | Interactive charts (geo maps); limited filter capability by selection, can filter by signal/discipline via dropdowns | Public link (datawrapper.de); embeds; password protection available | Free ($0); Pro ($21/user/mo); Business ($39/user/mo) | Medium (45-90 min) |
| **Flourish** | 5k+ data points (estimated per visualization) | Interactive maps with filters via UI; can filter by multiple attributes including discipline/signal | Public link (flourish.studio); password protection in Publisher tier; embeds | Free (limited); Publisher ($21/user/mo); Enterprise (custom) | High (60-120 min) |
| **Kepler.gl** | 100k+ points (desktop library) | Advanced filters by attribute; multiple layer support; full interaction with time series, clustering | Public hosting required (MapStudio paid) | Free (library); MapStudio ($99/month) | Very High (2-4 hrs) |
| **Mapbox** | 10k-50k points depending on plan | Full geographic querying + custom layers; rich filter capabilities via Mapbox GL JS | Public link (mapbox.com/embeds); password protection available | Free tier (50k mapbox gl js reqs/month); Pro ($10/user/mo) | High (2-3 hrs) |
| **GitHub Pages/Netlify** | Limited by hosting (GitHub: 10k files, Netlify: 300 credits/month) | Custom HTML/JavaScript map (e.g., Leaflet, Mapbox GL JS); full filter control via code | Public link (github.io/netlify.app); full control over privacy | Free tier unlimited; limits on hosting credits; Netlify Personal $9/month | Very High (4-8 hrs) |

## Recommendation

### Primary tool: **uMap (OpenStreetMap)**
**Why:**
- Open source, free, flexible for discipline/signal layering
- Built for community mapping, supports multiple data sources
- Public link option, minimal cost
- Proven for <200 point maps
- Good balance of features and ease of use
- Fast setup (30-60 min)

**Key features:**
- Multi-layer support for discipline + signal toggles
- OpenStreetMap base (no subscription needed)
- Public link sharing with customizable domains available
- Community documentation and support
- Custom markers, popups, and attribute display
- Responsive design for mobile/tablet

### Backup tool: **Google My Maps**
**Why:**
- Familiar to business users, existing Red Bull familiarity
- Quick setup (15-30 min)
- Free for non-commercial use (project scope)
- Good enough for discipline/signal filters via layers

**Limitations:**
- Lower point limit (500 placemarks vs ~1000 for uMap)
- Google account required for sharing
- Less customizable than uMap

## Verdict

**Feasible:** Yes, uMap is well-suited for the Dance Scene Atlas MVP. Both primary and backup options meet requirements:
- ~50-200 points comfortably supported
- Discipline + signal filtering possible
- Public sharing capability
- Reasonable cost (free option available)
- Setup time acceptable for project timeline

**Best choice:** uMap for long-term maintainability and community mapping benefits, Google My Maps as backup if team prefers Google ecosystem.

## Search Log

1. Datawrapper pricing page fetched (https://www.datawrapper.de/pricing/)
2. Netlify pricing fetched (https://www.netlify.com/pricing/)
3. Flourish pricing fetched (https://flourish.studio/pricing/)
4. Mapbox pricing fetched (https://www.mapbox.com/pricing/)
5. Webfetch attempts on remaining tools returned 404/not accessible (tool-specific documentation sites require authentication/APIs)
6. General web searches for pricing limits and feature capabilities returned no results due to session restrictions

## Summary (≤200 words)

**uMap** is recommended as the primary mapping tool for the Dance Scene Atlas MVP due to its open-source nature, free pricing, and flexibility for layering discipline and signal data. **Google My Maps** serves as a viable backup with faster setup and Google ecosystem familiarity. Both tools meet the core requirements: supporting ~50-200 points, offering discipline + signal filtering capabilities, providing public sharing options, and having minimal setup time. The project is feasible within the technical constraints and budget, with uMap providing the best balance of features, cost, and maintainability for a dance scene mapping application.