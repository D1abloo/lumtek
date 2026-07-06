#!/usr/bin/env bash
# Monta / actualiza la API de contacto (Node + SMTP) en la VPS.
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
WEB_ROOT="$(cd "${DEPLOY_DIR}/.." && pwd)"

HOST="${LUMTEK_DEPLOY_HOST:-root@31.70.109.174}"
APP_DIR="${LUMTEK_APP_DIR:-/var/www/lumtek-app}"
DOMAIN="${LUMTEK_DOMAIN:-lumtek.es}"
NGINX_SITE="/etc/nginx/sites-available/lumtek"

echo "==> API Lumtek en ${HOST}:${APP_DIR}"

ssh "${HOST}" "mkdir -p '${APP_DIR}'"

scp -q "${WEB_ROOT}/package.json" "${WEB_ROOT}/package-lock.json" "${HOST}:${APP_DIR}/"
scp -q -r "${WEB_ROOT}/server" "${HOST}:${APP_DIR}/"
scp -q "${DEPLOY_DIR}/env.production.template" "${HOST}:/tmp/lumtek-env.production.template"

SMTP_SYNC_FILE=""
if [ -n "${LUMTEK_SMTP_PASS:-}" ]; then
  SMTP_SYNC_FILE="$(mktemp)"
  printf 'SMTP_PASS=%s\n' "${LUMTEK_SMTP_PASS}" > "${SMTP_SYNC_FILE}"
elif [ -f "${WEB_ROOT}/.env" ] && grep -q '^SMTP_PASS=.\+' "${WEB_ROOT}/.env"; then
  SMTP_SYNC_FILE="$(mktemp)"
  grep '^SMTP_PASS=' "${WEB_ROOT}/.env" > "${SMTP_SYNC_FILE}"
fi
if [ -n "${SMTP_SYNC_FILE}" ]; then
  scp -q "${SMTP_SYNC_FILE}" "${HOST}:/tmp/lumtek-smtp-sync.env"
  rm -f "${SMTP_SYNC_FILE}"
fi

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
if [ ! -f "$APP_DIR/.env" ]; then
  cp /tmp/lumtek-env.production.template "$APP_DIR/.env"
  echo "==> Creado $APP_DIR/.env (rellena SMTP_PASS)"
else
  echo "==> Conservando $APP_DIR/.env existente"
fi

# Añade claves nuevas del template sin borrar SMTP_PASS existente
python3 - "$APP_DIR/.env" /tmp/lumtek-env.production.template <<'PY'
import pathlib
import sys

dest = pathlib.Path(sys.argv[1])
template = pathlib.Path(sys.argv[2])
lines = dest.read_text().splitlines() if dest.exists() else []
keys = {}
ordered = []
for line in lines:
    if not line.strip() or line.strip().startswith('#') or '=' not in line:
        ordered.append(line)
        continue
    key, _, value = line.partition('=')
    keys[key] = value
    ordered.append(line)

for line in template.read_text().splitlines():
    if not line.strip() or line.strip().startswith('#') or '=' not in line:
        continue
    key, _, value = line.partition('=')
    if key == 'SMTP_PASS':
        continue
    if key not in keys:
        keys[key] = value
        ordered.append(f"{key}={value}")

dest.write_text('\n'.join(ordered).rstrip() + '\n')
PY

if [ -f /tmp/lumtek-smtp-sync.env ]; then
  python3 - "$APP_DIR/.env" /tmp/lumtek-smtp-sync.env <<'PY'
import pathlib
import sys

dest = pathlib.Path(sys.argv[1])
sync = pathlib.Path(sys.argv[2])
smtp_pass = ''
for line in sync.read_text().splitlines():
    if line.startswith('SMTP_PASS='):
        smtp_pass = line.partition('=')[2]
        break
if not smtp_pass:
    raise SystemExit(0)
lines = dest.read_text().splitlines()
out = []
found = False
for line in lines:
    if line.startswith('SMTP_PASS='):
        out.append(f'SMTP_PASS={smtp_pass}')
        found = True
    else:
        out.append(line)
if not found:
    out.append(f'SMTP_PASS={smtp_pass}')
dest.write_text('\n'.join(out).rstrip() + '\n')
PY
  rm -f /tmp/lumtek-smtp-sync.env
  echo "==> SMTP_PASS actualizado en .env"
fi

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
        proxy_read_timeout 30s;
        client_max_body_size 32k;
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
sleep 2
curl -fsS "http://127.0.0.1:3001/api/health" | head -c 200
echo ""
REMOTE

echo "OK: API en https://${DOMAIN}/api/health"
echo "Edita SMTP_PASS: ssh ${HOST} nano ${APP_DIR}/.env && systemctl restart lumtek-api"
