#!/usr/bin/env bash
set -euo pipefail

export POSTGRES_PRISMA_URL=postgres://postgres:postgres@localhost:5432/vitest
docker-compose up -d --wait
env -C ../db prisma db push --skip-generate --force-reset --accept-data-loss
vitest "$@"
