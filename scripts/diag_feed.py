#!/usr/bin/env python3
"""TEMPORARY: probe every substack route/variant from wherever this runs, one line per result.

Never exits nonzero; purely informational. Delete once a route is proven on the runner.
"""
import time, urllib.parse, urllib.request, xml.etree.ElementTree as ET

FEED = "https://puriaradmard.substack.com/feed"
ARCHIVE = "https://puriaradmard.substack.com/api/v1/archive?sort=new&limit=50"
Q = urllib.parse.quote(FEED, safe="")
UA = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Accept": "application/rss+xml, application/xml, text/xml, */*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
}

try:
    from curl_cffi import requests as cffi
except ImportError:
    cffi = None


def verdict(body):
    if "<item>" in body:
        try:
            items = list(ET.fromstring(body).iter("item"))
            return f"RSS {len(items)} items [{(items[0].findtext('title') or '')[:40]}]"
        except Exception as e:
            return f"<item> present but parse failed: {e}"
    b = body.lstrip()
    if b[:1] in "[{":
        return f"JSON {len(body)}b [{b[:80]!r}]"
    return f"other {len(body)}b [{b[:80]!r}]"


def urllib_get(url, headers=UA):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.status, r.read().decode("utf-8", "replace")


def cffi_get(url, impersonate, **kw):
    r = cffi.get(url, headers=UA, impersonate=impersonate, timeout=25, **kw)
    return r.status_code, r.text


probes = [
    ("urllib direct", lambda: urllib_get(FEED)),
    ("urllib no-accept", lambda: urllib_get(FEED, {"User-Agent": UA["User-Agent"]})),
    ("urllib trailing-slash", lambda: urllib_get(FEED + "/")),
    ("urllib http://", lambda: urllib_get("http://puriaradmard.substack.com/feed")),
    ("urllib nocache", lambda: urllib_get(FEED + f"?nocache={int(time.time())}")),
    ("urllib archive", lambda: urllib_get(ARCHIVE)),
    ("proxy rss2json", lambda: urllib_get("https://api.rss2json.com/v1/api.json?rss_url=" + Q)),
    ("proxy allorigins", lambda: urllib_get("https://api.allorigins.win/raw?url=" + Q)),
    ("proxy codetabs", lambda: urllib_get("https://api.codetabs.com/v1/proxy?quest=" + Q)),
    ("proxy corsproxy", lambda: urllib_get("https://corsproxy.io/?url=" + Q)),
    ("proxy jina", lambda: urllib_get("https://r.jina.ai/" + FEED)),
]
if cffi is not None:
    for imp in ("chrome", "safari", "chrome_android", "safari_ios", "firefox"):
        probes.append((f"cffi {imp}", lambda imp=imp: cffi_get(FEED, imp)))
    try:
        from curl_cffi import CurlHttpVersion
        probes.append(("cffi chrome http1.1", lambda: cffi_get(FEED, "chrome", http_version=CurlHttpVersion.V1_1)))
    except ImportError:
        pass
    probes.append(("cffi chrome archive", lambda: cffi_get(ARCHIVE, "chrome")))
else:
    print("curl_cffi not installed; skipping impersonation probes")

for name, fn in probes:
    try:
        status, body = fn()
        print(f"{name:24s} {status} {verdict(body)}")
    except Exception as e:
        print(f"{name:24s} FAIL {type(e).__name__}: {str(e)[:120]}")
