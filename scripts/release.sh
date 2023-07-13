#!/bin/sh
set -e

# Checkout main and merge develop
git checkout main
git merge develop

# Back to develop
git checkout -

# Push to GitHub
git push origin --tags
git push origin develop
git push origin main