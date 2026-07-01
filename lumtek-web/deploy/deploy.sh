#!/usr/bin/env bash
# Despliegue estático a la VPS Lumtek
set -euo pipefail

HOST="${LUMTEK_DEPLOY_HOST:-root@31.70.109.174}"
DEST="${LUMTEK_DEPLOY_PATH:-/var/www/lumtek}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"
npm run build
scp -r dist/. "${HOST}:${DEST}/"
ssh "$HOST" "chown -R www-data:www-data ${DEST}"
echo "OK: https://lumtek.31.70.109.174.nip.io"
