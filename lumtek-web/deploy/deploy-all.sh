#!/usr/bin/env bash
# Despliega front estático + API de contacto en la VPS.
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
bash "${DIR}/deploy.sh"
bash "${DIR}/deploy-api.sh"
