#!/usr/bin/env bash
# Ejecutar EN el VPS (vía SSH desde setup-and-deploy.sh). Idempotente.
set -euo pipefail

DOMAIN="${LUMTEK_DOMAIN:?Falta LUMTEK_DOMAIN}"
WEB_ROOT="${LUMTEK_WEB_ROOT:-/var/www/lumtek}"
CERTBOT_EMAIL="${LUMTEK_CERTBOT_EMAIL:-}"
NGINX_CONF_SRC="${LUMTEK_NGINX_CONF_SRC:-/tmp/lumtek-nginx.conf}"

export DEBIAN_FRONTEND=noninteractive

echo "==> Lumtek bootstrap: ${DOMAIN} → ${WEB_ROOT}"

if ! command -v nginx >/dev/null 2>&1; then
  echo "==> Instalando nginx, certbot y ufw..."
  apt-get update -qq
  apt-get upgrade -y -qq
  apt-get install -y -qq nginx certbot python3-certbot-nginx ufw curl
fi

if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH >/dev/null 2>&1 || true
  ufw allow 'Nginx Full' >/dev/null 2>&1 || true
  if ufw status 2>/dev/null | grep -q 'Status: inactive'; then
    ufw --force enable
  fi
fi

mkdir -p "${WEB_ROOT}"
chown -R www-data:www-data "${WEB_ROOT}"

if [[ ! -f "${NGINX_CONF_SRC}" ]]; then
  echo "ERROR: no existe ${NGINX_CONF_SRC}" >&2
  exit 1
fi

cp "${NGINX_CONF_SRC}" /etc/nginx/sites-available/lumtek
ln -sf /etc/nginx/sites-available/lumtek /etc/nginx/sites-enabled/lumtek
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl reload nginx

has_cert() {
  certbot certificates 2>/dev/null | grep -Fq "Domains: ${DOMAIN}"
}

if has_cert; then
  echo "==> Certificado SSL ya presente para ${DOMAIN}"
  certbot renew --quiet 2>/dev/null || true
elif [[ -n "${CERTBOT_EMAIL}" ]]; then
  echo "==> Emitiendo certificado Let's Encrypt..."
  certbot --nginx \
    -d "${DOMAIN}" \
    --non-interactive \
    --agree-tos \
    -m "${CERTBOT_EMAIL}" \
    --redirect
else
  echo "WARN: Sin LUMTEK_CERTBOT_EMAIL — el sitio queda solo en HTTP." >&2
fi

systemctl reload nginx

echo "==> Bootstrap listo"
curl -sI "http://${DOMAIN}/" | head -3 || true
if has_cert; then
  curl -sI "https://${DOMAIN}/" | head -3 || true
fi
