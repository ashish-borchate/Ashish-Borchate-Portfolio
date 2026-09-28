#!/bin/bash
# Double-click in Finder — runs the full Next.js site (scroll Journey, metrics, tabs).

set -euo pipefail

REPO="${PORTFOLIO_REPO_DIR:-$HOME/Ashish-Borchate-Portfolio}"
STATIC_DIR="${PORTFOLIO_STATIC_DIR:-$HOME/Documents/cursor/Ashish-Borchate-Portfolio}"
PORT="${PORT:-8765}"
URL="http://127.0.0.1:${PORT}"

free_port() {
  local pids
  pids=$(lsof -ti tcp:"$PORT" 2>/dev/null || true)
  if [[ -n "$pids" ]]; then
    echo "Stopping previous server on port $PORT…"
    kill $pids 2>/dev/null || true
    sleep 1
  fi
}

open_browser() {
  (
    sleep 2
    open "$URL"
  ) &
}

run_static_fallback() {
  if [[ ! -f "$STATIC_DIR/index.html" ]]; then
    osascript -e "display alert \"Portfolio not found\" message \"Clone the repo to $REPO, then run:\n\nnpm install\nnpm run build\n\nOr: npm run export:desktop\" as critical"
    exit 1
  fi
  free_port
  cd "$STATIC_DIR"
  echo "Serving static copy at $URL"
  echo "For best Journey scroll, use the repo copy (npm run build && npm run start)."
  open_browser
  exec npx --yes serve -p "$PORT" .
}

if [[ -f "$REPO/package.json" ]]; then
  cd "$REPO"
  if [[ ! -d node_modules ]]; then
    echo "Installing dependencies…"
    npm install
  fi
  if [[ ! -d .next ]]; then
    echo "Building site (first time)…"
    npm run build
  fi
  free_port
  echo "Starting portfolio at $URL"
  echo "Leave this window open. Close it to stop the server."
  open_browser
  exec npm run start -- -p "$PORT" -H 127.0.0.1
fi

run_static_fallback
