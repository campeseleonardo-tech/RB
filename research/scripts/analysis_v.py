"""Round V: numbers for outputs/analysis.md, computed from data/*.csv only. Run: python research/scripts/analysis_v.py"""
import csv, re, statistics as st
R = lambda n: list(csv.DictReader(open(f'data/{n}.csv', encoding='utf-8')))
facts, ath, ev = R('facts'), R('athletes'), R('events')
ig = [f for f in facts if f['unit'] == 'Instagram followers (profile page)' and f['value']]
byid = {}
for f in ig:
    m = re.search(r'athlete_id (A\d+)', f['notes'])
    if m: byid[m.group(1)] = f
names = {a['athlete_id']: a for a in ath}
for w, pre in (('Latin', 'CAR'), ('Breaking', 'URB')):
    rows = sorted(((int(f['value']), i, f['fact_id']) for i, f in byid.items() if f['disc_id'].startswith(pre)), reverse=True)
    v = [r[0] for r in rows]
    print(w, 'dancers', len(v), 'total', sum(v), 'median', st.median(v), 'top3', [(names[i]['public_name'], x, fid, i) for x, i, fid in rows[:3]])
    ctry = {}
    for x, i, fid in rows: ctry[names[i]['country_iso2'] or '?'] = ctry.get(names[i]['country_iso2'] or '?', 0) + 1
    print('  countries', ctry)
    acc = [f for f in ig if 'event account' in f['notes'] and f['disc_id'].startswith(pre)]
    a = sorted(((int(f['value']), f['fact_id']) for f in acc), reverse=True)
    av = [x for x, _ in a]
    print('  accounts', len(av), 'median', st.median(av), 'total', sum(av), 'top3', a[:3], 'ratio median dancer/median account', round(st.median(v) / st.median(av), 2))
    ex = [x for x, _ in a if x < 900000]
    print('  accounts excl. Red Bull (<900k)', len(ex), 'median', st.median(ex), 'ratio', round(st.median(v) / st.median(ex), 2))
# passes
for lo, hi, n in ((2000, 2500, 'AMS participants'),):
    print(n, 'revenue EUR', lo * 120, '-', hi * 190)
print('2000x120', 2000*120, '2000x190', 2000*190, '2500x190', 2500*190, '5000x120', 5000*120, '5000x190', 5000*190, '1500x120', 1500*120, '1500x190', 1500*190)
