#!/usr/bin/env bash
# Aprovisiona una VPS nueva (Nginx + SSL nip.io) y despliega Lumtek en un solo paso.
#
# Uso (VPS nueva):
#   export LUMTEK_VPS_IP=203.0.113.10
#   export LUMTEK_CERTBOT_EMAIL=admin@ejemplo.com
#   bash deploy/setup-and-deploy.sh
#
# Solo redesplegar build (VPS ya montada):
#   bash deploy/setup-and-deploy.sh --deploy-only
#
# Solo montar servidor sin subir build:
#   bash deploy/setup-and-deploy.sh --provision-only
#
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
WEB_ROOT="$(cd "${DEPLOY_DIR}/.." && pwd)"

MODE=full

usage() {
  sed -n '2,14p' "$0" | sed 's/^# \{0,1\}//'
}

for arg in "$@"; do
  case "$arg" in
    --deploy-only) MODE=deploy-only ;;
    --provision-only) MODE=provision-only ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Opción desconocida: $arg" >&2
      usage >&2
      exit 1
      ;;
  esac
done

LUMTEK_VPS_IP="${LUMTEK_VPS_IP:-31.70.109.174}"
LUMTEK_VPS_USER="${LUMTEK_VPS_USER:-root}"
LUMTEK_SITE_PREFIX="${LUMTEK_SITE_PREFIX:-lumtek}"
LUMTEK_DEPLOY_PATH="${LUMTEK_DEPLOY_PATH:-/var/www/lumtek}"
LUMTEK_CERTBOT_EMAIL="${LUMTEK_CERTBOT_EMAIL:-}"
LUMTEK_DEPLOY_HOST="${LUMTEK_DEPLOY_HOST:-${LUMTEK_VPS_USER}@${LUMTEK_VPS_IP}}"
LUMTEK_DOMAIN="${LUMTEK_DOMAIN:-${LUMTEK_SITE_PREFIX}.${LUMTEK_VPS_IP}.nip.io}"

HOST="${LUMTEK_DEPLOY_HOST}"
TMP_NGINX="$(mktemp)"

cleanup() {
  rm -f "${TMP_NGINX}"
}
trap cleanup EXIT

need_ssh() {
  if ! ssh -o BatchMode=yes -o ConnectTimeout=12 "${HOST}" 'echo ok' >/dev/null 2>&1; then
    echo "ERROR: no hay SSH a ${HOST}. Configura clave o LUMTEK_DEPLOY_HOST." >&2
    exit 1
  fi
}

render_nginx() {
  sed \
    -e "s|__LUMTEK_DOMAIN__|${LUMTEK_DOMAIN}|g" \
    -e "s|__LUMTEK_WEB_ROOT__|${LUMTEK_DEPLOY_PATH}|g" \
    "${DEPLOY_DIR}/nginx-site.conf.template" > "${TMP_NGINX}"
}

provision_remote() {
  echo "==> Montando VPS ${HOST} (${LUMTEK_DOMAIN})"
  render_nginx
  scp -q "${DEPLOY_DIR}/vps-bootstrap.sh" "${HOST}:/tmp/lumtek-vps-bootstrap.sh"
  scp -q "${TMP_NGINX}" "${HOST}:/tmp/lumtek-nginx.conf"
  ssh "${HOST}" "chmod +x /tmp/lumtek-vps-bootstrap.sh && \
    LUMTEK_DOMAIN='${LUMTEK_DOMAIN}' \
    LUMTEK_WEB_ROOT='${LUMTEK_DEPLOY_PATH}' \
    LUMTEK_CERTBOT_EMAIL='${LUMTEK_CERTBOT_EMAIL}' \
    LUMTEK_NGINX_CONF_SRC='/tmp/lumtek-nginx.conf' \
    bash /tmp/lumtek-vps-bootstrap.sh"
}

deploy_app() {
  echo "==> Build y subida a ${HOST}:${LUMTEK_DEPLOY_PATH}"
  cd "${WEB_ROOT}"
  if [[ -f package-lock.json ]]; then
    npm ci
  else
    npm install
  fi
  npm run build
  ssh "${HOST}" "mkdir -p '${LUMTEK_DEPLOY_PATH}'"
  scp -rq dist/. "${HOST}:${LUMTEK_DEPLOY_PATH}/"
  ssh "${HOST}" "chown -R www-data:www-data '${LUMTEK_DEPLOY_PATH}'"
}

need_ssh

case "${MODE}" in
  full)
    if [[ -z "${LUMTEK_CERTBOT_EMAIL}" ]]; then
      echo "WARN: LUMTEK_CERTBOT_EMAIL vacío — la VPS quedará sin HTTPS en el primer montaje." >&2
    fi
    provision_remote
    deploy_app
    ;;
  provision-only)
    if [[ -z "${LUMTEK_CERTBOT_EMAIL}" ]]; then
      echo "WARN: LUMTEK_CERTBOT_EMAIL vacío — sin HTTPS." >&2
    fi
    provision_remote
    ;;
  deploy-only)
    deploy_app
    ;;
esac

PROTO="https"
if [[ -z "${LUMTEK_CERTBOT_EMAIL}" ]] && [[ "${MODE}" != "deploy-only" ]]; then
  PROTO="http"
fi

echo ""
echo "OK: ${PROTO}://${LUMTEK_DOMAIN}"
