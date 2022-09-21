#!/bin/zsh

mkdir -p ssl
openssl genrsa -out ssl/server.key 2048
openssl req -new -x509 -key ssl/server.key -out ssl/server.cert -days 365