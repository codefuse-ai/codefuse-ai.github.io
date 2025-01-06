---
group:
  title: Memory Manager
  order: 3
title: Tbase Memory Manager
order: 2
toc: content
---

# TbaseMemoryManager Class Documentation

## Code Overview

`TbaseMemoryManager` is a memory manager used for interacting with the Tbase database, inheriting from the `BaseMemoryManager` class. It implements the storage, retrieval, and management of messages and supports vector embedding retrieval functionality. This class encapsulates methods and tools to access Tbase effectively, facilitating the handling of message data along with flexible query interfaces.

## Feature Overview

### Basic Properties:

- `memory_manager_type`: The type of the memory manager, defaulting to "tbase_memory_manager".
- `embed_config`: Configuration for the vector model.
- `llm_config`: Configuration for the LLM (Language Model).
- `use_vector`: A boolean value indicating whether vector embeddings are to be used.

### Class Methods:

- `__init__`: Initializes the `TbaseMemoryManager`, setting up the Tbase handler and index based on configurations.

### Instance Methods:

- `append`: Appends a single message to the Tbase database.
- `extend`: Appends multiple messages to Tbase.
- `get_memory_pool`: Retrieves memory by session index.
- `get_memory_pool_by_all`: Retrieves memory using retrieval configurations.
- `embedding_retrieval`: Retrieves messages based on text vectors.
- `text_retrieval`: Retrieves messages based on text content.
- `datetime_retrieval`: Retrieves messages based on date-time criteria.
- `recursive_summary`: Generates a recursive summary of provided messages.

## SDK Interface Documentation

Here are the primary methods provided by this class along with their documentation:

### `__init__(embed_config, llm_config, tbase_handler=None, use_vector=False, vb_config=None, db_config=None, gb_config=None, tb_config=None, do_init=False)`

- **Description**: Initializes the `TbaseMemoryManager`.
- **Parameters**:
  - `embed_config`: Vector configuration.
  - `llm_config`: LLM configuration.
  - `tbase_handler`: Instance for Tbase database operations (optional).
  - `use_vector`: Whether to use vectors (default is `False`).
  - `vb_config`: Configuration for the vector database (optional).
  - `db_config`: Configuration for the main database (optional).
  - `gb_config`: Configuration for the graph database (optional).
  - `tb_config`: Configuration for Tbase (optional).
  - `do_init`: Whether initialization is required (optional).

### `append(message: Message, role_tag: str=None) -> None`

- **Description**: Appends a message to Tbase.
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

### `embedding_retrieval(text: str, top_k=1, score_threshold=1.0, session_index: str = "default", **kwargs) -> Memory`

- **Description**: Retrieves messages using vectors.
- **Parameters**:
  - `text`: Input text.
  - `top_k`: The number of top results to retrieve (default is 1).
  - `score_threshold`: Minimum score for message retrieval (default is 1.0).
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
  - `split_n`: Number of messages included in each summary pass (default is 20).
  - `session_index`: Session identifier.

### `get_msg_by_role_name(session_index: str, role_name: str) -> Optional[Message]`

- **Description**: Retrieves messages by their role name within a session.
- **Parameters**:
  - `session_index`: The session index to search within.
  - `role_name`: The role name of the desired message.

## Usage Examples

### Filling in Model Configuration

Quickly configure model parameters to access open-source or commercial models.

```python
from muagent.schemas import ModelConfig

MODEL_CONFIGS = {
    "dashscope_chat": {
        "model_type": "dashscope_chat",
        "model_name": "qwen2.5-72b-instruct",
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

Specify the model to be called.

```python
from muagent.models import ModelConfig, get_model

# Vector configuration
embed_config = MODEL_CONFIGS[embed_type]
embed_config = ModelConfig(
    config_name="model_test",
    model_type=model_type,
    model_name=embed_config["model_name"],
    api_key=embed_config["api_key"],
)
# Large model configuration
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
from muagent.schemas.db import TBConfig
from muagent.memory_manager import TbaseMemoryManager

# Tbase configuration
tb_config = TBConfig(
    tb_type="TbaseHandler",
    index_name="muagent_test",
    host=os.environ['tb_host'],
    port=os.environ['tb_port'],
    username=os.environ['tb_username'],
    password=os.environ['tb_password'],
)

memory_manager = TbaseMemoryManager(
    embed_config=embed_config,
    llm_config=model_config,
    tb_config=tb_config,
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
# retrieval_type=datetime => retrieval from datetime and jieba
print(memory_manager.router_retrieval(
    session_index="xiaoming", text=text, datetime=getCurrentDatetime(),
    n=4, top_k=5, retrieval_type="datetime"))

```

- Vector Retrieval

```python
# retrieval_type=embedding => retrieval from embedding
print(memory_manager.router_retrieval(
    session_index="xiaoming", text=text, top_k=5, retrieval_type="embedding"))
```

- Text Retrieval

```python
# retrieval_type=text => retrieval from jieba
print(memory_manager.router_retrieval(
    session_index="xiaoming", text=text, top_k=5, retrieval_type="text"))
```

### Supporting Memory Summarization

Iteratively summarize memory.

```python
print(
    memory_manager.recursive_summary(
        memory_manager.get_memory_pool("xiaoming").messages, split_n=1, session_index="xiaoming"
    )
)
```
