"""Tiny stand-in for https://www.lesswrong.com/graphql, serving the two queries fetch_feed.py makes.
Run: python3 tests/mock_lesswrong.py 8765"""
import json, sys
from http.server import BaseHTTPRequestHandler, HTTPServer

POSTS = [
 {"title": "[fixture] A LessWrong test post", "pageUrl": "https://www.lesswrong.com/posts/fixture1/a-lesswrong-test-post",
  "postedAt": "2026-06-20T14:03:00.000Z", "baseScore": 57, "contents": {"plaintextDescription": "Plaintext description returned by the GraphQL contents field."}},
 {"title": "[fixture] Another test post", "pageUrl": "https://www.lesswrong.com/posts/fixture2/another-test-post",
  "postedAt": "2026-03-02T08:30:00.000Z", "baseScore": 12, "contents": {"plaintextDescription": ""}},
]

class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass
    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
        q = body.get("query", "")
        if "user(" in q:
            assert body["variables"]["slug"] == "puria", body["variables"]
            resp = {"data": {"user": {"result": {"_id": "fixtureUserId123", "displayName": "puria"}}}}
        elif "posts(" in q:
            assert body["variables"]["uid"] == "fixtureUserId123", body["variables"]
            resp = {"data": {"posts": {"results": POSTS}}}
        else:
            resp = {"errors": [{"message": "unknown query"}]}
        out = json.dumps(resp).encode()
        self.send_response(200); self.send_header("Content-Type", "application/json"); self.send_header("Content-Length", str(len(out))); self.end_headers(); self.wfile.write(out)

HTTPServer(("127.0.0.1", int(sys.argv[1]) if len(sys.argv) > 1 else 8765), H).serve_forever()
