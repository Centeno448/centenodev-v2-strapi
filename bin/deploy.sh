#!/bin/bash
cd centenodev-v2-strapi

# pull latest changes
git pull

# build updated image
docker-compose build strapi

# restart app
docker-compose down

docker-compose up -d