---
title: LLM Config
url: "muagent/llm-model-config"
aliases:
- "/muagent/llm-model-config"
---

## Prepare Relevant Parameters
First, add the OpenAI configuration, or you can use another model similar to the OpenAI interface (launched through fastchat).
```
import os, sys

api_key = "sk-xxx"
api_base_url= "https://api.openai.com/v1"
model_name = "gpt-3.5-turbo"
```


## Build LLM Config
- By passing the class `openai`

```
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig

llm_config = LLMConfig(
    model_name=model_name, api_key=api_key, api_base_url=api_base_url, temperature=0.3,
    stop="**Observation:**"
)
```


- Customizing and inputting langchain LLM
```
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig
from langchain.llms.base import BaseLLM, LLM


class CustomizedModel(LLM):
        repetition_penalty = 1.1
        temperature = 0.2
        top_k = 40
        top_p = 0.9
        
        def predict(self, prompt: str, stop: Optional[List[str]] = None) -> str:
            return self._call(prompt, stop)

        def _call(self, prompt: str,
                  stop: Optional[List[str]] = None) -> str:
            """_call"""
            return ""


llm = CustomizedModel()
llm_config = LLMConfig(
    llm=llm
)
```