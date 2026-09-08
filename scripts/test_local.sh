#!/usr/bin/env bash
# Runs the real fetcher against local fixtures and writes data/feed.json from what it parses.
set -e
cd "$(dirname "$0")/.."
python3 -m http.server 8764 --directory tests/fixtures >/dev/null 2>&1 & P1=$!
python3 tests/mock_lesswrong.py 8765 & P2=$!
trap 'kill $P1 $P2 2>/dev/null' EXIT
sleep 1
SUBSTACK_FEED=http://127.0.0.1:8764/substack.xml LW_GRAPHQL=http://127.0.0.1:8765/graphql python3 scripts/fetch_feed.py
# build a self-contained preview with the fixture feed inlined (index.html stays data-free)
python3 - <<'PY'
import json
s=open('index.html').read(); d=open('data/feed.json').read()
open('preview.html','w').write(s.replace('<script>\n/* ===================== CONFIG','<script>window.__FEED__='+d+';</script>\n<script>\n/* ===================== CONFIG',1))
print('wrote preview.html')
PY
