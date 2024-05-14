---
group:
  title: llm_models
  order: 1
title: LLM 配置
order: -1
toc: content
---

## 准备相关参数
首先增加openai配置，也可以是其它类似于openai接口的模型（通过fastchat启动）

```
import os, sys

api_key = "sk-xxx"
api_base_url= "https://api.openai.com/v1"
model_name = "gpt-3.5-turbo"
```


## 构建LLM Config
- 通过调用 类openai 传入
```
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig
llm_config = LLMConfig(
    model_name=model_name, api_key=api_key,  api_base_url=api_base_url, temperature=0.3,
    stop="**Observation:**"
)
```

- 自定义 langchain LLM 传入
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
            """_call
            """
            return ""

llm = CustomizedModel()
llm_config = LLMConfig(
    llm=llm
)
```
