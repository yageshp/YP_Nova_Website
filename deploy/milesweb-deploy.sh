#!/bin/bash
# Publishes the built site from MilesWeb's GitHub deploy folder into the folder ypnova.com is served from.
# MilesWeb runs this as the "Build script" (command: bash milesweb-deploy.sh) after cloning the `deploy` branch.
# Safety: it copies only when it finds exactly ONE existing YP Nova site folder (index.html + our .htaccess marker)
# outside MilesWeb's deploys/ folders. Otherwise it changes nothing and prints what it found. Never deletes files.
set -u
SRC="$(pwd)"
MARKER='YP Nova — routing, canonical URLs and caching'
echo "== YP Nova publish script =="
echo "user: $(whoami)   source: $SRC   HOME: ${HOME:-unset}"

# Candidate roots: the user's home and the site root two/three levels above the deploys folder.
ROOTS=()
[ -n "${HOME:-}" ] && [ -d "$HOME" ] && ROOTS+=("$HOME")
case "$SRC" in */deploys/*) SITE_ROOT="${SRC%%/deploys/*}"; ROOTS+=("$SITE_ROOT");; esac

declare -A SEEN
CANDIDATES=()
for R in "${ROOTS[@]}"; do
  while IFS= read -r ht; do
    d="$(dirname "$ht")"
    case "$d" in */deploys/*|"$SRC"*) continue;; esac
    [ -n "${SEEN[$d]:-}" ] && continue
    SEEN[$d]=1
    if grep -q "$MARKER" "$ht" 2>/dev/null && [ -f "$d/index.html" ]; then CANDIDATES+=("$d"); fi
  done < <(find "$R" -maxdepth 4 -name .htaccess -type f 2>/dev/null)
done

echo "folders checked under: ${ROOTS[*]:-none}"
echo "live-site folders found: ${#CANDIDATES[@]}"
for c in "${CANDIDATES[@]}"; do echo "  - $c  (index.html modified $(date -r "$c/index.html" '+%F %T' 2>/dev/null))"; done

if [ "${#CANDIDATES[@]}" -ne 1 ]; then
  echo "NOT PUBLISHED: expected exactly one live-site folder. Nothing was changed."
  echo "-- diagnostics --"
  for R in "${ROOTS[@]}"; do echo "[$R]"; ls -la "$R" 2>&1 | head -40; done
  exit 0
fi

T="${CANDIDATES[0]}"
if [ ! -w "$T" ]; then echo "NOT PUBLISHED: $T is not writable by $(whoami). Nothing was changed."; exit 0; fi

echo "publishing to: $T"
cd "$SRC" || exit 1
for item in * .htaccess; do
  case "$item" in milesweb-deploy.sh|.cpanel.yml|.git) continue;; esac
  cp -R "$item" "$T"/ || { echo "COPY FAILED for $item"; exit 1; }
done
if cmp -s "$SRC/index.html" "$T/index.html"; then
  echo "PUBLISHED OK: $T now serves deploy commit $(git -C "$SRC" rev-parse --short HEAD 2>/dev/null)"
else
  echo "WARNING: index.html in $T differs from the deployed build after copying"; exit 1
fi
