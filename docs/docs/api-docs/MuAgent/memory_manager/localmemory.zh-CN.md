---
group:
  title: 记忆管理器
  order: 3
title: 本地·记忆管理器
order: 0
toc: content
---

# LocalMemoryManager 类使用文档

`LocalMemoryManager` 是一个用于本地存储和检索消息的内存管理器，继承自 `BaseMemoryManager` 类。该类封装了一系列方法用于处理消息的存储、检索和管理，包括与向量数据库的交互。它在初始化时接收多个配置对象，并提供不同的操作选项。

## 功能介绍

### 基本属性:

- `memory_manager_type`: 该内存管理器的类型，默认为 "local_memory_manager"。
- `embed_config`: 向量模型的配置。
- `llm_config`: LLM（语言模型）的配置。
- `do_init`: 一个布尔值，指示是否需要初始化。
- `kb_root_path`: 存储知识库文件的路径。

### 类方法:

- `__init__`: 初始化 `LocalMemoryManager`，接收多个配置参数并设置初始值。
- `clear_local`: 清除本地内存并可选择重新初始化。
- `load`: 从文件加载内存数据。

### 实例方法:

- `append`: 将单条消息追加到本地内存中，并根据需要更新向量存储。
- `extend`: 从 `Memory` 对象中追加多条消息到本地内存。
- `get_memory_pool`: 根据会话索引获取记忆。
- `get_memory_pool_by_all`: 根据检索配置获取记忆。
- `embedding_retrieval`: 基于文本向量检索消息。
- `text_retrieval`: 根据文本内容检索消息。
- `datetime_retrieval`: 根据日期时间标准检索消息。
- `recursive_summary`: 生成提供消息的递归摘要。

## SDK 接口文档

以下是该类提供的主要方法及其接口文档：

### `__init__(embed_config, llm_config, vb_config=None, db_config=None, gb_config=None, tb_config=None, do_init=False, kb_root_path=KB_ROOT_PATH)`

- **描述**: 初始化 `LocalMemoryManager`。
- **参数**:
  - `embed_config`: 向量配置。
  - `llm_config`: LLM 配置。
  - `vb_config`: 向量数据库配置 (可选)。
  - `db_config`: 数据库配置 (可选)。
  - `gb_config`: 图数据库配置 (可选)。
  - `tb_config`: Tbase 配置 (可选)。
  - `do_init`: 指示是否需要初始化 (可选)。
  - `kb_root_path`: 存储知识库路径 (默认是 `KB_ROOT_PATH`)。

### `append(message: Message, role_tag: str=None) -> None`

- **描述**: 将消息追加到本地内存并更新向量存储（如果必要）。
- **参数**:
  - `message`: 要追加的消息。
  - `role_tag`: 消息的角色标签（可选）。

### `extend(memory: Memory, role_tag: str=None) -> None`

- **描述**: 将记忆追加到 Tbase。
- **参数**:
  - `memory`: 要追加的记忆。
  - `role_tag`: 记忆的角色标签 (可选)。

### `get_memory_pool(session_index: str = "") -> Memory`

- **描述**: 通过 session_index 来检索记忆
- **参数**:
  - `session_index`: 会话 id。

### `get_memory_pool_by_all(search_key_contents: dict, limit: int =10) -> Memory`

- **描述**: 通过多搜索参数来检索记忆
- **参数**:
  - `search_key_contents`: 包含多个 key-value 对的检索配置。
  - `limit`: 最多检索返回的消息数量

### `embedding_retrieval(text: str, top_k=1, score_threshold=0.7, session_index: str = "default", **kwargs) -> List[Message]`

- **描述**: 基于文本向量检索消息。
- **参数**:
  - `text`: 输入文本。
  - `top_k`: 要检索的结果数量 (默认是 1)。
  - `score_threshold`: 消息检索的最小分数 (默认是 0.7)。
  - `session_index`: 会话标识符 (默认是 "default")。

### `datetime_retrieval(session_index: str, datetime: str, text: str = None, n: int = 5, key: str = "start_datetime", **kwargs) -> Memory`

- **描述**: 根据日期时间范围检索消息。
- **参数**:
  - `session_index`: 会话索引。
  - `datetime`: 用于检索的时间戳。
  - `text`: 可选的文本。
  - `n`: 设定范围（默认 5 分钟）。
  - `key`: 用于过滤的字段名（默认是 "start_datetime"）。

### `text_retrieval(text: str, session_index: str = "default", **kwargs) -> Memory`

- **描述**: 根据文本内容检索消息。
- **参数**:
  - `text`: 要匹配的文本。
  - `session_index`: 会话标识符 (默认是 "default")。

### `recursive_summary(messages: List[Message], split_n: int = 20, session_index: str="") -> Memory`

- **描述**: 生成提供消息的递归摘要。
- **参数**:
  - `messages`: 要总结的消息列表。
  - `split_n`: 每次摘要传递中包含的消息数量 (默认是 20)。
  - `session_index`: 会话标识符。

## 使用示例

### 填写·模型配置

快速配置模型参数，接入开源模型/商业化模型。

```python
from muagent.schemas import ModelConfig

MODEL_CONFIGS = {
    "dashscope_chat": {
        "model_type": "dashscope_chat",
        "model_name": "qwen2.5-72b-instruct" ,
        "api_key": "sk-xxx",
    },
    "qwen_text_embedding": {
        "model_type": "dashscope_text_embedding",
        "model_name": "text-embedding-v3",
        "api_key": "sk-xxx",
    },
}

embed_type = "qwen_text_embedding"
model_type = "dashscope_chat"
```

### 获取·模型配置

指定需要调用的模型。

```python
from muagent.models import ModelConfig, get_model

# 向量配置
embed_config = MODEL_CONFIGS[embed_type]
embed_config = ModelConfig(
    config_name="model_test",
    model_type=model_type,
    model_name=embed_config["model_name"],
    api_key=embed_config["api_key"],
)
# 大模型配置
model_config = MODEL_CONFIGS[model_type]
model_config = ModelConfig(
    config_name="model_test",
    model_type=model_type,
    model_name=model_config["model_name"],
    api_key=model_config["api_key"],
)
```

### 初始化·记忆管理器

```python
from muagent.schemas.db import VBConfig
from muagent.memory_manager import LocalMemoryManager

vb_config = VBConfig(vb_type="LocalFaissHandler")
memory_manager = LocalMemoryManager(
    embed_config=embed_config,
    llm_config=model_config,
    vb_config=vb_config,
    do_init=True
)
```

### 写入消息

```python
from muagent.schemas import Message

# prepare your message
message1 = Message(
    session_index="default",
    role_name="test1",
    role_type="user",
    content="hello",
    spec_parsed_contents=[{"input": "hello"}],
)

text = "hi! how can I help you?"
message2 = Message(
    session_index="xiaowang",
    role_name="test2",
    role_type="assistant",
    content=text,
    arsed_output_list=[{"answer": text}],
)

text = "they say hello and hi to each other"
message3 = Message(
    session_index="xiaoming",
    role_name="test3",
    role_type="summary",
    content=text,
    spec_parsed_contents=[{"summary": text}],
)

memory_manager.append(message=message1)
memory_manager.append(message=message2)
memory_manager.append(message=message3)
```

### 查询消息

通过 session_index 来完成检索。

```python
print(memory_manager.get_memory_pool("default").to_format_messages(
    content_key="content", format_type='str')
)
print(memory_manager.get_memory_pool("xiaowang").to_format_messages(
    content_key="content", format_type='str'))
print(memory_manager.get_memory_pool("xiaoming").to_format_messages(
    content_key="content", format_type='str'))
```

### 支持 memory 检索

支持多种检索方式。

- 时间检索

```python
from muagent.utils.common_utils import getCurrentDatetime
text = "say hi to each other,"
# retrieval_type=datetime => retrieval from datetime and jieba
print(memory_manager.router_retrieval(
    session_index="xiaoming", text=text, datetime=getCurrentDatetime(),
    n=4, top_k=5, retrieval_type= "datetime"))

```

- 向量检索

```python
# retrieval_type=embedding => retrieval from embedding
print(memory_manager.router_retrieval(
    session_index="xiaoming", text=text, top_k=5, retrieval_type= "embedding"))
```

- 文本检索

```python
# retrieval_type=text => retrieval from jieba
print(memory_manager.router_retrieval(
    session_index="xiaoming", text=text, top_k=5, retrieval_type= "text"))
```

### 支持 memory 总结

循环总结 memory。

```python
print(
    memory_manager.recursive_summary(
        memory_manager.get_memory_pool("xiaoming").messages, split_n=1, session_index="xiaoming"
    )
)
```
