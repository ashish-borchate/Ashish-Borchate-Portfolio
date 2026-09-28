#!/usr/bin/env bash
# Serves the static `out/` folder — use this instead of double-clicking index.html (JS needs HTTP).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/out"
PORT="${PORT:-8765}"

if [[ ! -f "$OUT/index.html" ]]; then
  echo "Missing $OUT/index.html — run: npm run build:static"
  exit 1
fi

echo "Serving $OUT at http://localhost:$PORT"
echo "Press Ctrl+C to stop."
cd "$OUT"
exec npx --yes serve -p "$PORT" .
