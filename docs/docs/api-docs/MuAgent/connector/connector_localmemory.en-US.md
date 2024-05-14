---
group:
  title: Connector
  order: 0
subGroup:
  title: Memory
title: Tbase Memory Builder
order: 3
toc: content
---

## Usage Example

### Create memory manager instance

```
import os
import openai
from coagent.base_configs.env_config import KB_ROOT_PATH
from coagent.connector.memory_manager import BaseMemoryManager, LocalMemoryManager
from coagent.llm_models.llm_config import EmbedConfig, LLMConfig
from coagent.connector.schema import Message


os.environ["API_BASE_URL"] = OPENAI_API_BASE
os.environ["OPENAI_API_KEY"] = "sk-xx"
openai.api_key = "sk-xxx"
# os.environ["OPENAI_PROXY"] = "socks5h://127.0.0.1:13659"
os.environ["DUCKDUCKGO_PROXY"] = os.environ.get("DUCKDUCKGO_PROXY") or "socks5://127.0.0.1:13659"


# LLM and Embedding Model configurations
llm_config = LLMConfig(
    model_name=os.environ["model_name"], api_key=os.environ["OPENAI_API_KEY"],
    api_base_url=os.environ["API_BASE_URL"], temperature=0.3
)

embed_config = EmbedConfig(
    embed_engine="model", embed_model=os.environ["embed_model"],
    embed_model_path=os.environ["embed_model_path"]
)
```

### support memory manage

```
# prepare your message
message1 = Message(
    chat_index="default", role_name="test1", role_type="user", role_content="hello",
    parsed_output_list=[{"input": "hello"}], user_name="default"
)

text = "hi! how can I help you?"
message2 = Message(
    chat_index="shuimo", role_name="test2", role_type="assistant", role_content=text, parsed_output_list=[{"answer": text}],
    user_name="shuimo"
)

text = "they say hello and hi to each other"
message3 = Message(
    chat_index="shanshi", role_name="test3", role_type="summary", role_content=text,
    parsed_output_list=[{"summary": text}],
    user_name="shanshi"
    )

# append or extend test
local_memory_manager = LocalMemoryManager(embed_config=embed_config, llm_config=llm_config, do_init=True)
# append can ignore user_name
local_memory_manager.append(message=message1)
local_memory_manager.append(message=message2)
local_memory_manager.append(message=message3)
```

### Reload memory

```
local_memory_manager = LocalMemoryManager(embed_config=embed_config, llm_config=llm_config, do_init=False)
local_memory_manager.load()
print(local_memory_manager.get_memory_pool("default").messages)
print(local_memory_manager.get_memory_pool("shuimo").messages)
print(local_memory_manager.get_memory_pool("shanshi").messages)
```

### Support for memory retrieval

```
# embedding retrieval test
text = "say hi to each other, i want some help"
# retrieval_type=datetime => retrieval from datetime and jieba
print(local_memory_manager.router_retrieval(chat_index="shanshi", text=text, datetime="2024-03-12 17:48:00", n=4, top_k=5, retrieval_type= "datetime"))
# retrieval_type=eembedding => retrieval from embedding
print(local_memory_manager.router_retrieval(chat_index="shanshi", text=text, top_k=5, retrieval_type= "embedding"))
# retrieval_type=text => retrieval from jieba
print(local_memory_manager.router_retrieval(chat_index="shanshi", text=text, top_k=5, retrieval_type= "text"))
```

### Support for memory summarization

```
# recursive_summary test
print(local_memory_manager.recursive_summary(local_memory_manager.get_memory_pool("shanshi").messages, split_n=1, chat_index="shanshi"))
```
