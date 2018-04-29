#!/usr/bin/env bash
docker build -t zullxax.azurecr.io/zull/trade_dev:$1 .
docker image tag zullxax.azurecr.io/zull/trade_dev:$1 zullxax.azurecr.io/zull/trade_dev:latest
docker push zullxax.azurecr.io/zull/trade_dev:$1
docker push zullxax.azurecr.io/zull/trade_dev:latest
