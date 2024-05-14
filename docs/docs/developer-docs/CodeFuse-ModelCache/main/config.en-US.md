---
store:
  title: CodeFuse-ModelCache
  version: main
group:
  title: 🌱 CodeFuse-ModelCache
  order: -1
title: How to better configure your cache
order: 2
toc: content
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
