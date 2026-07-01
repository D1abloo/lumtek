#!/usr/bin/env bash
# Monta / actualiza la API de contacto (Node + SMTP) en la VPS.
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
WEB_ROOT="$(cd "${DEPLOY_DIR}/.." && pwd)"

HOST="${LUMTEK_DEPLOY_HOST:-root@31.70.109.174}"
APP_DIR="${LUMTEK_APP_DIR:-/var/www/lumtek-app}"
DOMAIN="${LUMTEK_DOMAIN:-lumtek.31.70.109.174.nip.io}"
NGINX_SITE="/etc/nginx/sites-available/lumtek"

echo "==> API Lumtek en ${HOST}:${APP_DIR}"

ssh "${HOST}" "mkdir -p '${APP_DIR}'"

scp -q "${WEB_ROOT}/package.json" "${WEB_ROOT}/package-lock.json" "${HOST}:${APP_DIR}/"
scp -q -r "${WEB_ROOT}/server" "${HOST}:${APP_DIR}/"
scp -q "${DEPLOY_DIR}/env.production.template" "${HOST}:${APP_DIR}/.env"

ssh "${HOST}" APP_DIR="${APP_DIR}" NGINX_SITE="${NGINX_SITE}" bash -s <<'REMOTE'
set -euo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "==> Instalando Node.js 20..."
  apt-get update -qq
  apt-get install -y -qq ca-certificates curl gnupg
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y -qq nodejs
fi

cd "$APP_DIR"
npm ci --omit=dev
chown -R www-data:www-data "$APP_DIR"
chown root:www-data "$APP_DIR/.env"
chmod 640 "$APP_DIR/.env"

cat > /etc/systemd/system/lumtek-api.service <<'UNIT'
[Unit]
Description=Lumtek contact API
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/var/www/lumtek-app
EnvironmentFile=/var/www/lumtek-app/.env
ExecStart=/usr/bin/node server/index.mjs
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable lumtek-api
systemctl restart lumtek-api

if ! grep -q 'location /api/' "$NGINX_SITE"; then
  echo "==> Añadiendo proxy /api en Nginx..."
  python3 - "$NGINX_SITE" <<'PY'
import pathlib
import sys

path = pathlib.Path(sys.argv[1])
text = path.read_text()
snippet = """    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

"""
if "location /api/" not in text:
    text = text.replace("    location / {", snippet + "    location / {", 1)
    path.write_text(text)
PY
  nginx -t
  systemctl reload nginx
fi

systemctl is-active lumtek-api
curl -fsS "http://127.0.0.1:3001/api/health" | head -c 200
echo ""
REMOTE

echo "OK: API en https://${DOMAIN}/api/health"
echo "Edita SMTP_PASS: ssh ${HOST} nano ${APP_DIR}/.env && systemctl restart lumtek-api"
