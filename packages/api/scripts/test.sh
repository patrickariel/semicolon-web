#!/usr/bin/env bash
set -euo pipefail

export POSTGRES_PRISMA_URL="${POSTGRES_PRISMA_URL}_test"
env -C ../db prisma db push --skip-generate --force-reset --accept-data-loss
vitest "$@"
