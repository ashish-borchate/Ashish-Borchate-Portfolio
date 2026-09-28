#!/bin/bash
# Double-click this file in Finder to open your portfolio in the browser.
# (Same idea as Altura’s index.html — one click, but this site needs a tiny local server.)

set -euo pipefail

SITE_DIR="${PORTFOLIO_STATIC_DIR:-$HOME/Documents/cursor/Ashish-Borchate-Portfolio}"
PORT="${PORT:-8765}"
URL="http://localhost:${PORT}"

if [[ ! -f "$SITE_DIR/index.html" ]]; then
  osascript -e "display alert \"Portfolio folder not found\" message \"Run npm run export:desktop from the repo first.\n\nExpected:\n$SITE_DIR\" as critical"
  exit 1
fi

# Reuse server if already running on this port
if curl -s -o /dev/null --connect-timeout 1 "$URL"; then
  open "$URL"
  exit 0
fi

cd "$SITE_DIR"
echo "Opening portfolio at $URL"
echo "Leave this window open while you browse. Close it to stop the server."

(
  sleep 2
  open "$URL"
) &

exec npx --yes serve -p "$PORT" .
