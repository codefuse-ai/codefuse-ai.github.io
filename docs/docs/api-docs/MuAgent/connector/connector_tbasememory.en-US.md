---
group:
  title: Connector
  order: 0
subGroup:
  title: Memory
title: Local Memory Builder
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

# TBASE CONFIG
TBASE_ARGS = {
        'host': '{url}',
        'port': 6379,
        'username': '',
        'password': ''
    }


# LLM and Embedding Model configurations
llm_config = LLMConfig(
    model_name=os.environ["model_name"], api_key=os.environ["OPENAI_API_KEY"],
    api_base_url=os.environ["API_BASE_URL"], temperature=0.3
)

embed_config = EmbedConfig(
    embed_engine="model", embed_model=os.environ["embed_model"],
    embed_model_path=os.environ["embed_model_path"]
)


#specify index_name
index_name = 'your_index_name'
th = TbaseHandler(TBASE_ARGS, index_name, definition_value="message")


# # drop index
# th.drop_index(index_name)

# create tbase memory manager
memory_manager = TbaseMemoryManager(
            unique_name="EKG",
            embed_config=embed_config,
            llm_config=llm_config,
            tbase_handler=th,
            use_vector=False
        )
```

### support memory manage

```
import uuid

# example1
message = Message(
    chat_index="wyp311395_test_chatindex_0",
    message_index= f"nodeid0-{uuid.uuid4()}",
    user_name="311395",
    role_name = "311395", # agent 名字，
    role_type = "user", # agent 类型，默认assistant，可选observation
    ## llm output
    role_content = "今天天气如何？", # 输入
)

memory_manager.append(message)

# example2
message = Message(
    chat_index="wyp311395_test_chatindex_0",
    message_index= f"nodeid1-{uuid.uuid4()}",
    user_name="311395",
    role_name = "tester_0", # agent 名字，
    role_type = "assistant", # agent 类型，默认assistant，可选observation
    ## llm output
    role_content = "<functioncall> {'date': '2024-04-17'}", # 输入
)

memory_manager.append(message)
```

### Support for memory retrieval

```

logger.debug(f'按user_name检索：{memory_manager.get_memory_pool("311395")}')

logger.debug(f'全局检索：{memory_manager.get_memory_pool_by_content("今天天气如何？")}')

logger.debug(f'全局检索：{memory_manager.get_memory_pool_by_content("functioncall")}')

logger.debug(f'按kev-value检索：{memory_manager.get_memory_pool_by_key_content("role_content", "functioncall")}')

logger.debug(f'按key-value检索：{memory_manager.get_memory_pool_by_all({"chat_index": "wyp311395_test_chatindex_0", "role_content": "functioncall"})}')

logger.debug(f'按key-value检索：{memory_manager.get_memory_pool_by_all({"keyword": "nodeid3"})}')

#
logger.debug(f'按datetime检索：{memory_manager.router_retrieval(chat_index="wyp311395_test_chatindex_0", datetime="2024-03-12 17:48:00", n=4, top_k=5, retrieval_type= "datetime")}')

#
logger.debug(f'按datetime检索：{memory_manager.router_retrieval(chat_index="wyp311395_test_chatindex_0", datetime="2024-04-18 11:30:00", n=4, top_k=5, retrieval_type= "datetime")}')

#
logger.debug(f'按text检索：{memory_manager.router_retrieval(chat_index="wyp311395_test_chatindex_0", text="今天天气", top_k=5, retrieval_type= "text")}')

#
logger.debug(f'按embedding检索：{memory_manager.router_retrieval(chat_index="wyp311395_test_chatindex_0", text="今天天气", top_k=5, retrieval_type= "embedding")}')

```

### Support for memory summarization

```
# recursive_summary test
messages = memory_manager.router_retrieval(chat_index="wyp311395_test_chatindex_0", text="今天天气", top_k=5, retrieval_type= "embedding")
print(memory_manager.recursive_summary(messages, chat_index="wyp311395_test_chatindex_0", nodeid="nodeid3", user_name="311395", split_n=1))
```
