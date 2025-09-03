#!/bin/bash
docker compose down --volumes --remove-orphans
docker system prune -f
echo "All containers, volumes, networks cleaned."
