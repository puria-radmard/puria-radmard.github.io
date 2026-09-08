#!/usr/bin/env python3
"""Fetch Substack RSS and LessWrong posts, write data/feed.json.

Standard library only, so the Action needs no pip step.
Run locally with:  python3 scripts/fetch_feed.py
"""
import json, os, re, sys, html, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

SUBSTACK_FEED = os.environ.get("SUBSTACK_FEED", "https://puriaradmard.substack.com/feed")
LW_SLUG = "puria"
LW_GRAPHQL = os.environ.get("LW_GRAPHQL", "https://www.lesswrong.com/graphql")
OUT = os.environ.get("FEED_OUT", "data/feed.json")
UA = {  # Substack sits behind Cloudflare, which 403s anything that doesn't look like a browser
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Accept": "application/rss+xml, application/xml, text/xml, application/json;q=0.9, */*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
}
SUBSTACK_ARCHIVE = os.environ.get("SUBSTACK_ARCHIVE", "https://puriaradmard.substack.com/api/v1/archive?sort=new&limit=50")


def get(url, data=None, headers=None):
    h = dict(UA)
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, data=data, headers=h)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8")


def strip_html(s, n=240):
    s = re.sub(r"<[^>]+>", " ", s or "")
    s = html.unescape(re.sub(r"\s+", " ", s)).strip()
    return s if len(s) <= n else s[: n - 1].rsplit(" ", 1)[0] + "…"


def substack():
    try:
        return substack_rss()
    except Exception as e:
        print(f"substack rss failed ({type(e).__name__}: {e}); trying archive api", file=sys.stderr)
        return substack_archive()


def substack_archive():
    """Fallback: Substack's public archive endpoint returns JSON with title/subtitle/canonical_url/post_date."""
    posts = json.loads(get(SUBSTACK_ARCHIVE))
    return [{
        "title": p.get("title", ""),
        "subtitle": strip_html(p.get("subtitle") or p.get("description") or ""),
        "url": p.get("canonical_url", ""),
        "date": (p.get("post_date") or "")[:10],
    } for p in posts if p.get("type", "newsletter") in ("newsletter", "podcast", "thread")]


def substack_rss():
    root = ET.fromstring(get(SUBSTACK_FEED))
    out = []
    for it in root.iter("item"):
        f = lambda tag: (it.findtext(tag) or "").strip()
        date = f("pubDate")
        try:
            date = parsedate_to_datetime(date).date().isoformat()
        except Exception:
            pass
        out.append({
            "title": f("title"),
            "subtitle": strip_html(f("description")),   # Substack puts the subtitle here
            "url": f("link"),
            "date": date,
        })
    return out


def lesswrong():
    q_user = {"query": 'query($slug:String){user(input:{selector:{slug:$slug}}){result{_id displayName}}}',
              "variables": {"slug": LW_SLUG}}
    u = json.loads(get(LW_GRAPHQL, json.dumps(q_user).encode(), {"Content-Type": "application/json"}))
    uid = u["data"]["user"]["result"]["_id"]
    q_posts = {"query": '''query($uid:String){posts(input:{terms:{view:"userPosts",userId:$uid,limit:50}}){
                 results{title pageUrl postedAt baseScore contents{plaintextDescription}}}}''',
               "variables": {"uid": uid}}
    p = json.loads(get(LW_GRAPHQL, json.dumps(q_posts).encode(), {"Content-Type": "application/json"}))
    out = []
    for r in p["data"]["posts"]["results"]:
        out.append({
            "title": r["title"],
            "subtitle": strip_html((r.get("contents") or {}).get("plaintextDescription", "")),
            "url": r["pageUrl"],
            "date": (r.get("postedAt") or "")[:10],
            "karma": r.get("baseScore"),
        })
    return out


def main():
    feed = {"generated": datetime.now(timezone.utc).isoformat(timespec="seconds"), "sample": False}
    errors = {}
    for name, fn in (("substack", substack), ("lesswrong", lesswrong)):
        try:
            feed[name] = fn()
            print(f"{name}: {len(feed[name])} items")
        except Exception as e:  # keep the other feed even if one breaks
            errors[name] = f"{type(e).__name__}: {e}"
            feed[name] = []
            print(f"{name}: FAILED {errors[name]}", file=sys.stderr)
    if errors:
        feed["errors"] = errors
    # Don't clobber a good file with an empty one if everything failed
    if not feed["substack"] and not feed["lesswrong"]:
        print("both feeds failed; leaving existing data/feed.json untouched", file=sys.stderr)
        sys.exit(1)
    with open(OUT, "w") as f:
        json.dump(feed, f, indent=2, ensure_ascii=False)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
