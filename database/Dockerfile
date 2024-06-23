FROM postgres:latest as db

USER postgres

COPY ./init.sql /docker-entrypoint-initdb.d/
