---
store:
  title: CodeFuse-ModelCache
  version: main
group:
  title: 🌱 CodeFuse-ModelCache
  order: -1
title: 快速开始
order: 0
toc: content
github: https://github.com/codefuse-ai/CodeFuse-ModelCache
---

ModelCache 易于使用，只需 1 步骤即可构建缓存测试 Demo

## 快速开始

### Demo 服务启动

- 离线模型 bin 文件下载， 参考地址：[https://huggingface.co/shibing624/text2vec-base-chinese/tree/main](https://huggingface.co/shibing624/text2vec-base-chinese/tree/main)，并将下载的 bin 文件，放到 model/text2vec-base-chinese 文件夹中。
- 执行 flask4modelcache_demo.py 启动服务。

```shell
cd CodeFuse-ModelCache
```

```shell
python flask4modelcache_demo.py
```

### 正常服务启动

在启动服务前，应该进行如下环境配置：

1. 安装关系数据库 mysql， 导入 sql 创建数据表，sql 文件:`reference_doc/create_table.sql`
2. 安装向量数据库 milvus
3. 在配置文件中添加数据库访问信息，配置文件为：
   1. `modelcache/config/milvus_config.ini`
   2. `modelcache/config/mysql_config.ini`
4. 离线模型 bin 文件下载， 参考地址：[https://huggingface.co/shibing624/text2vec-base-chinese/tree/main](https://huggingface.co/shibing624/text2vec-base-chinese/tree/main)，并将下载的 bin 文件，放到 model/text2vec-base-chinese 文件夹中
5. 通过 flask4modelcache.py 脚本启动后端服务。

## 服务访问

当前服务以 restful API 方式提供 3 个核心功能：数据写入，cache 查询和 cache 数据清空。请求 demo 如下：

### cache 写入

```python
import json
import requests
url = 'http://127.0.0.1:5000/modelcache'
type = 'insert'
scope = {"model": "CODEGPT-1008"}
chat_info = [{"query": [{"role": "system", "content": "你是一个AI代码助手, 你必须提供中立的、无害的答案帮助用户解决代码相关的问题"}, {"role": "user", "content": "你是谁?"}],
                  "answer": "你好，我是智能助手，请问有什么能帮您!"}]
data = {'type': type, 'scope': scope, 'chat_info': chat_info}
headers = {"Content-Type": "application/json"}
res = requests.post(url, headers=headers, json=json.dumps(data))
```

### cache 查询

```python
import json
import requests
url = 'http://127.0.0.1:5000/modelcache'
type = 'query'
scope = {"model": "CODEGPT-1008"}
query = [{"role": "system", "content": "你是一个AI代码助手, 你必须提供中立的、无害的答案帮助用户解决代码相关的问题"}, {"role": "user", "content": "你是谁?"}]
data = {'type': type, 'scope': scope, 'query': query}

headers = {"Content-Type": "application/json"}
res = requests.post(url, headers=headers, json=json.dumps(data))
```

### cache 清空

```python
import json
import requests
url = 'http://127.0.0.1:5000/modelcache'
type = 'remove'
scope = {"model": "CODEGPT-1008"}
remove_type = 'truncate_by_model'
data = {'type': type, 'scope': scope, 'remove_type': remove_type}

headers = {"Content-Type": "application/json"}
res = requests.post(url, headers=headers, json=json.dumps(data))
```
