"""
Local dev server — run from inside the dexcarte folder:
    python serve.py

Serves the parent (Downloads) folder so /dexcarte/ paths resolve correctly.
Open: http://127.0.0.1:5500/dexcarte/
"""
import http.server
import os
import sys

# Serve from parent directory so /dexcarte/ paths work
parent = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.dirname(parent))

PORT = 5500
Handler = http.server.SimpleHTTPRequestHandler

print(f"Serving at http://127.0.0.1:{PORT}/dexcarte/")
print("Press Ctrl+C to stop.\n")

with http.server.HTTPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
