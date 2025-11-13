#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import os

PORT = 8000

# Change to the script's directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

NoCacheHTTPRequestHandler.extensions_map.update({
    '.csv': 'text/csv',
})

print(f"Starting server at http://localhost:{PORT}")
print("Opening browser...")
print("Press Ctrl+C to stop the server\n")

webbrowser.open(f'http://localhost:{PORT}')

with socketserver.TCPServer(("", PORT), NoCacheHTTPRequestHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.shutdown()

