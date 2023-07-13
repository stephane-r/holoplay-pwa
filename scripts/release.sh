#!/bin/sh
set -e

# Get package.json version
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")

# Commit files
git add .
git commit -m "chore: release v$PACKAGE_VERSION"

# Create new git tag
git tag "v$PACKAGE_VERSION"
git tag -l

# Push to GitHub
git push origin develop
git push origin --tags