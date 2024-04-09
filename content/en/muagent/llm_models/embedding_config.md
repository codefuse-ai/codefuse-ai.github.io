---
title: Embedding Config
url: "muagent/embedding-model-config"
aliases:
- "/muagent/embedding-model-config"
---


## Prepare Relevant Parameters
First, add the OpenAI configuration; this could also be a model similar to the OpenAI interface (launched via fastchat).
```
import os, sys

api_key = "sk-xxx"
api_base_url= "https://api.openai.com/v1"
embed_model = "{{embed_model_name}}"
embed_model_path = "{{embed_model_path}}"
```

## Build LLM Config
- Constructing with a local model file
```
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig

embed_config = EmbedConfig(
    embed_engine="model", embed_model=embed_model, embed_model_path=embed_model_path
)
```


- Constructing via OpenAI
```
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig

embed_config = EmbedConfig(
    embed_engine="openai", api_key=api_key, api_base_url=api_base_url,
)
```

- Customizing and inputting langchain embeddings
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