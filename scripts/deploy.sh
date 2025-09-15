#!/usr/bin/env bash
set -euo pipefail

# Ultra-simple deploy: sync current directory to S3 and invalidate CloudFront
# Run from inside your website folder (repo root if static files are at top level)

aws s3 sync . "s3://proptix.ai" \
  --delete \
  --acl private \
  --cache-control 'public, max-age=604800, s-maxage=604800, immutable' \
  --exclude ".git/*" \
  --exclude ".github/*" \
  --exclude "scripts/*" \
  --exclude "**/.DS_Store" \
  --profile muse_terraform \
  --region ap-southeast-2

aws cloudfront create-invalidation \
  --distribution-id "E2DBE969K0PRE0" \
  --paths '/*' \
  --profile muse_terraform \
  --region ap-southeast-2

echo "Deployment complete."
