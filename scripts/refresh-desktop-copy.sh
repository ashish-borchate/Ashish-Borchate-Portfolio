#!/usr/bin/env bash
# Rebuild Desktop folder + launcher after git pull
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
npm run export:desktop
echo ""
echo "Done. Double-click: ~/Documents/cursor/Ashish-Borchate-Portfolio/Open Portfolio.command"
echo "Tip: After git pull, run this script (or export:desktop) so the launcher stays updated."
