# puria's site

Static site for GitHub Pages. One HTML file, one JSON feed, one weekly Action.

## deploy
1. Create a repo named `<username>.github.io` and push these files.
2. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/`.
3. Settings → Actions → General → Workflow permissions: "Read and write" (so the bot can commit `data/feed.json`).
4. Actions tab → "refresh feed" → Run workflow. It also runs every Monday.

## edit
- Papers, email, links: `CONFIG` in `js/config.js`.
- Feed sources: constants at the top of `scripts/fetch_feed.py`.
- Test locally against fixtures (no network): `./scripts/test_local.sh` — runs the real fetcher against `tests/fixtures/substack.xml` and a mock LessWrong GraphQL server, writes `data/feed.json`, and builds `preview.html` with that feed inlined. Fixture titles are prefixed `[fixture]`.
- Serve: `python3 -m http.server` then open http://localhost:8000

Until the Action has run once, `data/feed.json` is whatever you last committed; the site shows "no feed" if it is missing. Controls: drag to pan, ctrl/⌘+scroll or pinch or +/− to zoom, `0` or "back to centre" to return, `i` for the index, `Esc` to close.
