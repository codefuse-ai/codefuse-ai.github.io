---
title: How to better configure your cache
description: 介绍主要功能
url: "/docs/codefuse-modelcache-config"
aliases:
- "/docs/codefuse-modelcache-config"
---

## Environment Dependencies
- Python version: 3.8 or higher
- To install dependencies: pip install requirements.txt

## Service Startup
- Before starting the service, the following environment configurations should be performed:
- Install relational database MySQL, import SQL to create tables, SQL file: reference_doc/create_table.sql
- Install vector database Milvus
- Add database access information to the configuration files, which are:
    - modelcache/config/milvus_config.ini
    - modelcache/config/mysql_config.ini
- Download offline model bin files, refer to: https://huggingface.co/shibing624/text2vec-base-chinese/tree/main, and place the downloaded bin files into the model/text2vec-base-chinese folder
- Start the backend service using the flask4modelcache.py script.