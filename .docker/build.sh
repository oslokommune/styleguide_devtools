#!/bin/bash
cp -R ../styleguide ./.docker
docker build -f ./.docker/Dockerfile -t styleguide .
rm -rf .docker/styleguide
