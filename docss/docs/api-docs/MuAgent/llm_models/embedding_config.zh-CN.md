---
group:
  title: llm_models
  order: 1
title: Embedding 配置
order: 0
toc: content
---

## 准备相关参数

首先增加 openai 配置，也可以是其它类似于 openai 接口的模型（通过 fastchat 启动）

```
import os, sys

api_key = "sk-xxx"
api_base_url= "https://api.openai.com/v1"
embed_model = "{{embed_model_name}}"
embed_model_path = "{{embed_model_path}}"
```

## 构建 LLM Config

- 通过本地模型文件构建

```
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig

embed_config = EmbedConfig(
    embed_engine="model", embed_model=embed_model, embed_model_path=embed_model_path
)
```

- 通过 openai 构建

```
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig

embed_config = EmbedConfig(
    embed_engine="openai", api_key=api_key,  api_base_url=api_base_url,
)
```

- 自定义 langchain embeddings 传入

```
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig


class CustomizedEmbeddings(Embeddings):

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        embeddings = []
        # add your embedding code
        return embeddings

    def embed_query(self, text: str) -> List[float]:
        """Compute query embeddings using a HuggingFace transformer model.

        Args:
            text: The text to embed.

        Returns:
            Embeddings for the text.
        """
        # add your embedding code
        return embedding

embeddings = CustomizedEmbeddings()
embed_config = EmbedConfig(
    embed_model="default",
    langchain_embeddings=embeddings
)
```
