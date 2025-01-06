---
group:
  title: Memory Manager
  order: 3
title: Local Memory Manager
order: 0
toc: content
---

# LocalMemoryManager Class Documentation

`LocalMemoryManager` is a memory manager used for locally storing and retrieving messages, inheriting from the `BaseMemoryManager` class. This class encapsulates a series of methods for handling the storage, retrieval, and management of messages, including interactions with vector databases. It receives multiple configuration objects during initialization and provides various operational options.

## Feature Overview

### Basic Properties:

- `memory_manager_type`: The type of the memory manager, defaulting to "local_memory_manager".
- `embed_config`: Configuration for the vector model.
- `llm_config`: Configuration for the LLM (Language Model).
- `do_init`: A boolean value indicating whether initialization is required.
- `kb_root_path`: The path for storing knowledge base files.

### Class Methods:

- `__init__`: Initializes the `LocalMemoryManager`, receiving multiple configuration parameters and setting initial values.
- `clear_local`: Clears local memory and optionally reinitializes.
- `load`: Loads memory data from a file.

### Instance Methods:

- `append`: Appends a single message to the local memory and updates the vector store if needed.
- `extend`: Appends multiple messages from a `Memory` object to the local memory.
- `get_memory_pool`: Retrieves memory by session index.
- `get_memory_pool_by_all`: Retrieves memory using retrieval configurations.
- `embedding_retrieval`: Retrieves messages based on text vectors.
- `text_retrieval`: Retrieves messages based on text content.
- `datetime_retrieval`: Retrieves messages based on date-time criteria.
- `recursive_summary`: Generates a recursive summary of the provided messages.

## SDK Interface

Here are the main methods provided by this class along with their documentation:

### `__init__(embed_config, llm_config, vb_config=None, db_config=None, gb_config=None, tb_config=None, do_init=False, kb_root_path=KB_ROOT_PATH)`

- **Description**: Initializes the `LocalMemoryManager`.
- **Parameters**:
  - `embed_config`: Configuration for embedding.
  - `llm_config`: Configuration for the LLM.
  - `vb_config`: Configuration for the vector database (optional).
  - `db_config`: Configuration for the main database (optional).
  - `gb_config`: Configuration for the graph database (optional).
  - `tb_config`: Configuration for Tbase (optional).
  - `do_init`: Indicates whether initialization is required (optional).
  - `kb_root_path`: Path for storing knowledge base files (default is `KB_ROOT_PATH`).

### `append(message: Message, role_tag: str=None) -> None`

- **Description**: Appends a message to local memory and updates the vector store if necessary.
- **Parameters**:
  - `message`: The message to append.
  - `role_tag`: An optional role tag for the message.

### `extend(memory: Memory, role_tag: str=None) -> None`

- **Description**: Appends memory to Tbase.
- **Parameters**:
  - `memory`: The memory to append.
  - `role_tag`: An optional role tag for the memory.

### `get_memory_pool(session_index: str = "") -> Memory`

- **Description**: Retrieves memory based on session index.
- **Parameters**:
  - `session_index`: The session ID.

### `get_memory_pool_by_all(search_key_contents: dict, limit: int = 10) -> Memory`

- **Description**: Retrieves memory based on multiple search parameters.
- **Parameters**:
  - `search_key_contents`: Dictionary containing multiple key-value pairs for retrieval.
  - `limit`: Maximum number of returned messages.

### `embedding_retrieval(text: str, top_k=1, score_threshold=0.7, session_index: str = "default", **kwargs) -> List[Message]`

- **Description**: Retrieves messages based on text vectors.
- **Parameters**:
  - `text`: The input text.
  - `top_k`: The number of top results to retrieve (default is 1).
  - `score_threshold`: Minimum score for message retrieval (default is 0.7).
  - `session_index`: Session identifier (default is "default").

### `datetime_retrieval(session_index: str, datetime: str, text: str = None, n: int = 5, key: str = "start_datetime", **kwargs) -> Memory`

- **Description**: Retrieves messages based on date-time criteria.
- **Parameters**:
  - `session_index`: Session index.
  - `datetime`: Timestamp used for retrieval.
  - `text`: Optional text.
  - `n`: Range defined in minutes (default is 5).
  - `key`: Field name for filtering (default is "start_datetime").

### `text_retrieval(text: str, session_index: str = "default", **kwargs) -> Memory`

- **Description**: Retrieves messages based on text content.
- **Parameters**:
  - `text`: The text to match against.
  - `session_index`: Session identifier (default is "default").

### `recursive_summary(messages: List[Message], split_n: int = 20, session_index: str="") -> Memory`

- **Description**: Generates a recursive summary of the provided messages.
- **Parameters**:
  - `messages`: List of messages to summarize.
  - `split_n`: Number of messages to include in each summary pass (default is 20).
  - `session_index`: Session identifier.

## Usage Examples

### Filling in Model Configuration

Quickly configure model parameters to access open-source or commercial models.

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

### Acquiring Model Configuration

Specify the model to call.

```python
from muagent.models import ModelConfig, get_model

# Configuration for embedding
embed_config = MODEL_CONFIGS[embed_type]
embed_config = ModelConfig(
    config_name="model_test",
    model_type=model_type,
    model_name=embed_config["model_name"],
    api_key=embed_config["api_key"],
)
# Configuration for large model
model_config = MODEL_CONFIGS[model_type]
model_config = ModelConfig(
    config_name="model_test",
    model_type=model_type,
    model_name=model_config["model_name"],
    api_key=model_config["api_key"],
)
```

### Initializing the Memory Manager

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

### Writing Messages

```python
from muagent.schemas import Message

# Prepare your message
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
    parsed_output_list=[{"answer": text}],
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

### Querying Messages

Retrieve messages by session index.

```python
print(memory_manager.get_memory_pool("default").to_format_messages(
    content_key="content", format_type='str')
)
print(memory_manager.get_memory_pool("xiaowang").to_format_messages(
    content_key="content", format_type='str'))
print(memory_manager.get_memory_pool("xiaoming").to_format_messages(
    content_key="content", format_type='str'))
```

### Supporting Memory Retrieval

Supports various retrieval methods.

- Time Retrieval

```python
from muagent.utils.common_utils import getCurrentDatetime
text = "say hi to each other,"
# retrieval_type=datetime => retrieval from datetime andjieba
print(memory_manager.router_retrieval(
    session_index="xiaoming", text=text, datetime=getCurrentDatetime(),
    n=4, top_k=5, retrieval_type= "datetime"))

```

- Vector Retrieval

```python
# retrieval_type=embedding => retrieval from embedding
print(memory_manager.router_retrieval(
    session_index="xiaoming", text=text, top_k=5, retrieval_type= "embedding"))
```

- Text Retrieval

```python
# retrieval_type=text => retrieval from jieba
print(memory_manager.router_retrieval(
    session_index="xiaoming", text=text, top_k=5, retrieval_type= "text"))
```

### Supporting Memory Summarization

Summarize memory iteratively.

```python
print(
    memory_manager.recursive_summary(
        memory_manager.get_memory_pool("xiaoming").messages, split_n=1, session_index="xiaoming"
    )
)
```
