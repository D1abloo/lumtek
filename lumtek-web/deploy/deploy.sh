#!/usr/bin/env bash
# Redespliegue rápido (VPS ya montada). Ver setup-and-deploy.sh para VPS nueva.
set -euo pipefail
exec "$(cd "$(dirname "$0")" && pwd)/setup-and-deploy.sh" --deploy-only "$@"
