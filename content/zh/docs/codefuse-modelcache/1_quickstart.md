---
title: QuickStart
description: 介绍主要功能
url: "/docs/codefuse-modelcache-quickstart-zh"
aliases:
- "/docs/codefuse-modelcache-quickstart-zh"
---



ModelCache易于使用，只需1步骤即可构建缓存测试Demo

## 快速开始
### 构建Cache
Cache的默认接口如下所示：
```
class Cache:
    # it should be called when start the cache system
    def __init__(self):
        self.has_init = False
        self.cache_enable_func = None
        self.embedding_func = None
        self.post_process_messages_func = None
        self.config = Config()
```

在创建ModelCache之前，请考虑以下问题：
- 你将如何为查询生成嵌入向量？（embedding_func） 该函数将文本嵌入到一个用于上下文相似性搜索的密集向量中。ModelCache可以支持多种嵌入上下文的方法：Huggingface、ONNX和SentenceTransformers。默认逻辑中，使用了在中文领域表现更好的huggingface中的text2vec模型。只需将你的嵌入函数初始化为：text2vec.to_embeddings

```
data_manager = get_data_manager(CacheBase("mysql", config=mysql_config),
                                VectorBase("milvus", dimension=data2vec.dimension, milvus_config=milvus_config))

cache.init(
    embedding_func=data2vec.to_embeddings,
    data_manager=data_manager,
    similarity_evaluation=SearchDistanceEvaluation(),
    query_pre_embedding_func=query_multi_splicing,
    insert_pre_embedding_func=insert_multi_splicing,
)
```

-  你将在哪里缓存数据？（data_manager缓存存储） 缓存存储用于存储所有标量数据，例如原始问题、提示、答案和访问时间。ModelCache支持多种缓存存储选项，如SQLite、MySQL和OceanBase。未来还将添加更多的NoSQL数据库选项。
-  你将在哪里存储和搜索向量嵌入？（data_manager向量存储） 向量存储组件用于存储和搜索所有嵌入向量，以便在语义上找到最相似的结果。ModelCache支持使用FAISS等向量搜索库或Milvus等向量数据库。未来还将添加更多的向量数据库和云服务选项。

以下是一些示例：
```
data_manager = get_data_manager(CacheBase("sqlite"), VectorBase("faiss", dimension=data2vec.dimension))
data_manager = get_data_manager(CacheBase("oceanbase"), VectorBase("milvus", dimension=data2vec.dimension))
```
