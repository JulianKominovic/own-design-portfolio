#!/bin/bash
echo "Committing..."
git commit -am "#RELEASE"
echo "Pushing..."
git push origin master
echo "Building..."
pnpm build
echo "Deploying..."
firebase deploy