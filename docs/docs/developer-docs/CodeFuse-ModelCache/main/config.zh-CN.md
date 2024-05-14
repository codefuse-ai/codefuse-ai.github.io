---
store:
  title: CodeFuse-ModelCache
  version: main
group:
  title: 🌱 CodeFuse-ModelCache
  order: -1
title: 最佳配置
order: 2
toc: content
---

## 环境依赖

- python 版本: 3.8 及以上
- 依赖包安装：
  `pip install requirements.txt `

## 服务启动

- 在启动服务前，应该进行如下环境配置：
- 安装关系数据库 mysql， 导入 sql 创建数据表，sql 文件: reference_doc/create_table.sql
- 安装向量数据库 milvus
- 在配置文件中添加数据库访问信息，配置文件为：
  - modelcache/config/milvus_config.ini
  - modelcache/config/mysql_config.ini
- 离线模型 bin 文件下载， 参考地址：https://huggingface.co/shibing624/text2vec-base-chinese/tree/main，并将下载的bin文件，放到 model/text2vec-base-chinese 文件夹中
- 通过 flask4modelcache.py 脚本启动后端服务。
