!#/bin/sh

docker exec strapi_postgres_1 pg_dump -U strapi strapi > backup.sql