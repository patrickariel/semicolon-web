#!/usr/bin/env bash
set -euo pipefail

if [[ ! -v POSTGRES_PRISMA_URL ]]; then
    POSTGRES_PRISMA_URL="$(dotenvx get POSTGRES_PRISMA_URL)_test"
else
    POSTGRES_PRISMA_URL="${POSTGRES_PRISMA_URL}_test"
fi
export POSTGRES_PRISMA_URL

env -C ../db prisma db push --skip-generate --force-reset --accept-data-loss
vitest "$@"
