---
store:
  title: CodeFuse-ModelCache
  version: main
group:
  title: 🌱 CodeFuse-ModelCache
  order: -1
title: QuickStart
order: 0
toc: content
github: https://github.com/codefuse-ai/CodeFuse-ModelCache
---

ModelCache is easy to use, and you can build a cache testing demo in just one step.

## Quick Start

### Demo Service Startup

1. Download the embedding model bin file from the following address: [https://huggingface.co/shibing624/text2vec-base-chinese/tree/main](https://huggingface.co/shibing624/text2vec-base-chinese/tree/main). Place the downloaded bin file in the model/text2vec-base-chinese folder.
2. Start the backend service using the flask4modelcache_dome.py script.

```shell
cd CodeFuse-ModelCache
```

```shell
python flask4modelcache_demo.py
```

### Normal Service Startup

Before starting the service, the following environment configurations should be performed:

1. Install the relational database MySQL and import the SQL file to create the data tables. The SQL file can be found at: `reference_doc/create_table.sql`
2. Install the vector database Milvus.
3. Add the database access information to the configuration files:
   1. `modelcache/config/milvus_config.ini `
   2. `modelcache/config/mysql_config.ini`
4. Download the embedding model bin file from the following address: [https://huggingface.co/shibing624/text2vec-base-chinese/tree/main](https://huggingface.co/shibing624/text2vec-base-chinese/tree/main). Place the downloaded bin file in the model/text2vec-base-chinese folder.
5. Start the backend service using the flask4modelcache.py script.

## Service-Access

The current service provides three core functionalities through RESTful API.: Cache-Writing, Cache-Querying, and Cache-Clearing. Demos:

### Cache-Writing

```python
import json
import requests
url = 'http://127.0.0.1:5000/modelcache'
type = 'insert'
scope = {"model": "CODEGPT-1008"}
chat_info = [{"query": [{"role": "system", "content": "You are an AI code assistant and you must provide neutral and harmless answers to help users solve code-related problems."}, {"role": "user", "content": "你是谁?"}],
                  "answer": "Hello, I am an intelligent assistant. How can I assist you?"}]
data = {'type': type, 'scope': scope, 'chat_info': chat_info}
headers = {"Content-Type": "application/json"}
res = requests.post(url, headers=headers, json=json.dumps(data))
```

### Cache-Querying

```python
import json
import requests
url = 'http://127.0.0.1:5000/modelcache'
type = 'query'
scope = {"model": "CODEGPT-1008"}
query = [{"role": "system", "content": "You are an AI code assistant and you must provide neutral and harmless answers to help users solve code-related problems."}, {"role": "user", "content": "Who are you?"}]
data = {'type': type, 'scope': scope, 'query': query}

headers = {"Content-Type": "application/json"}
res = requests.post(url, headers=headers, json=json.dumps(data))
```

### Cache-Clearing

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
