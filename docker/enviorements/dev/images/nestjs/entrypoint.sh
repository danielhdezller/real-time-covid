#!/bin/sh
set -e

yarn install
yarn build

# retries until the migration will be executed correctly
while [ true ]; do
    sleep 3
    yarn typeorm migration:run && break
done

yarn start:debug