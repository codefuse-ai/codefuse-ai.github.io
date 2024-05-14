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
---

ModelCache is easy to use, and you can build a cache testing demo in just one step.

## Quick Start

### Building a Cache

The default interface for Cache is shown below:

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

Before creating a ModelCache, consider the following questions:

How will you generate embedding vectors for queries? (embedding_func) This function embeds text into a dense vector for contextual similarity search. ModelCache can support various methods of embedding context: Huggingface, ONNX, and SentenceTransformers. In the default logic, the text2vec model from huggingface, which performs better in the Chinese domain, is used. Simply initialize your embedding function to: text2vec.to_embeddings

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

Where will you cache data? (data_manager cache storage) The cache storage is used to store all scalar data such as original questions, prompts, answers, and access times. ModelCache supports multiple cache storage options like SQLite, MySQL, and OceanBase. More NoSQL database options will be added in the future.
Where will you store and search vector embeddings? (data_manager vector storage) The vector storage component is used to store and search all embedding vectors to semantically find the most similar results. ModelCache supports vector search libraries like FAISS or vector databases like Milvus. More vector database and cloud service options will be added in the future.
Here are some examples:

```
data_manager = get_data_manager(CacheBase("sqlite"), VectorBase("faiss", dimension=data2vec.dimension))
data_manager = get_data_manager(CacheBase("oceanbase"), VectorBase("milvus", dimension=data2vec.dimension))
```
