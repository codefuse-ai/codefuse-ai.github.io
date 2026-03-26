---
group:
  title: 模型
  order: 1
title: 大语言模型
order: 0
toc: content
---

以下是对于 `ModelWrapperBase` 类的中文使用文档，包含代码内容说明、功能介绍，以及 SDK 接口文档。

# ModelWrapperBase 类使用

## 代码内容说明

在这里我们采用了阿里开源框架[agentscope](https://github.com/modelscope/agentscope/blob/main/src/agentscope/models/model.py)中的 model 基类，用于接入相关的开源模型和商业化模型。

`ModelWrapperBase` 是一个用于封装大模型的基础类，该类提供了基本的框架和接口，使得所有模型包装器都能够继承此类，并实现对应的方法。

该类模型主要用于与 API 进行交互，管理模型的配置和调用。

## 功能介绍

**基本属性**:

- `model_type`: 模型包装器的类型，用于识别模型配置中的包装器类。
- `config_name`: 模型配置的名称。
- `model_name`: 模型的名称，用于调用模型 API。
- `api_key`: 模型的 API 密钥，用于调用模型的 API。
- `api_url`: 模型的 API 地址，用于调用模型的 API。

**类方法**:

- `from_config`: 根据模型配置创建包装器实例。
- `get_wrapper`: 获取特定模型包装器的类，支持注册并根据类型返回相应的包装器。

**实例方法**:

- `__call__`: 处理输入并与模型交互。该方法要求子类实现。
- `predict`: 根据提供的提示生成模型的预测结果。
- `generate`: 调用模型生成响应。
- `generate_stream`: 流式处理生成响应。
- `chat`: 处理聊天消息并返回模型响应。
- `chat_stream`: 流式返回聊天响应。
- `function_call`: 调用函数以处理消息。
- `function_call_stream`: 流式返回函数调用的结果。
- `batch`: 批量处理输入，子类需要实现。
- `embed_query`: 嵌入查询，向量模型子类需要实现。
- `embed_documents`: 嵌入文档，向量模型子类需要实现。
- `format`: 格式化输入消息为模型所需的格式，子类需要实现。
- `format_for_common_chat_models`: 针对常见聊天模型的格式化策略。

## SDK 接口

以下是 `ModelWrapperBase` 类提供的主要方法及其接口文档：

### `__init__(config_name: str, model_name: str, model_type: str = "codefuse", api_key: Optional[str] = "model_base_xxx", api_url: Optional[str] = "https://codefuse.ai", **kwargs: Any)`

- **描述**: 初始化模型包装器的基本参数。
- **参数**:
  - `config_name`: 模型的配置 ID。
  - `model_name`: 模型的名称。
  - `model_type`: 模型包装器的类型（默认为 "codefuse"）。
  - `api_key`: 模型 API 的密钥。
  - `api_url`: 模型 API 的地址。
  - `kwargs`: 其他额外参数。

### `__call__(prompt: str = None, messages: Sequence[dict] = [], tools: Sequence[object] = [], *, tool_choice: Optional[Literal['auto', 'required']] = None, parallel_tool_calls: Optional[bool] = None, stream: bool = None, stop: Optional[str] = '', format_type: Literal["str", "dict", "raw"] = "str", **kwargs: Any) -> Generator[Union[ChatCompletion, ChatCompletionChunk, str, Mapping], None, None]`

- **描述**: 处理输入并调用模型生成响应。
- **参数**:
  - `prompt`: 提供给模型的提示字符串。
  - `messages`: 聊天消息的序列。
  - `tools`: 可利用的工具序列。
  - `tool_choice`: 工具选择策略。
  - `parallel_tool_calls`: 是否允许并发调用工具。
  - `stream`: 是否流式返回响应。
  - `stop`: 生成结束的标记。
  - `format_type`: 输出格式。
  - `kwargs`: 其他可选参数。
- **返回**: 返回生成的响应。

### `from_config(model_config: ModelConfig) -> 'ModelWrapperBase'`

- **描述**: 从模型配置创建模型包装器。
- **参数**:
  - `model_config`: 模型配置对象。
- **返回**: 返回模型包装器实例。

### `predict(prompt: str, stop: Optional[str] = '') -> Union[ChatCompletion, str]`

- **描述**: 基于提供的提示生成模型的预测结果。
- **参数**:
  - `prompt`: 输入的提示字符串。
  - `stop`: 可选，停止生成的标记。
- **返回**: 模型的预测结果。

### `generate(prompt: str, stop: Optional[str] = '', format_type: Literal["str", "raw"] = "raw") -> Union[ChatCompletion, str]`

- **描述**: 调用模型生成响应。
- **参数**:
  - `prompt`: 输入提示。
  - `stop`: 停止生成的标记。
  - `format_type`: 输出格式。
- **返回**: 生成的响应。
- **流式接口**: `generate_stream`

### `chat(messages: Optional[Sequence[dict]], stop: Optional[str] = '', format_type: Literal["str", "raw"] = "raw") -> Union[ChatCompletion, str]`

- **描述**: 处理聊天消息并返回模型响应。
- **参数**:
  - `messages`: 聊天消息的序列。
  - `stop`: 停止生成的标记。
  - `format_type`: 输出格式。
- **返回**: 模型的聊天响应。
- **流式接口**: `chat_stream`

### `function_call(messages: Optional[Sequence[dict]] = None, tools: Sequence[object] = [], *, prompt: Optional[str] = None, tool_choice: Optional[Literal['auto', 'required']] = None, parallel_tool_calls: Optional[bool] = None, stream: Optional[bool] = False, stop: Optional[str] = '', format_type: Literal["raw"] = "raw") -> Union[ChatCompletion, Mapping]`

- **描述**: 调用函数来处理消息。
- **参数**:
  - `messages`: 聊天消息的序列。
  - `tools`: 可用的工具序列。
  - `prompt`: 可选的提示。
  - `tool_choice`: 工具选择策略。
  - `parallel_tool_calls`: 是否允许并行工具调用。
  - `stream`: 是否流式返回输出。
  - `stop`: 停止生成的标记。
  - `format_type`: 输出格式。
- **返回**: 调用结果。
- **流式接口**: `function_call_stream`

### `batch(self, *args: Any, **kwargs: Any) -> List[ChatCompletion]`

- **描述**: 批量处理输入，允许同时处理多个请求并返回相应的结果。此方法需要在子类中实现自定义的批量处理逻辑。
- **参数**:
  - `*args`：可变数量的输入参数，类型为任意。
  - `kwargs`：可选的关键字参数，类型为任意。
- **返回**: 返回一个包含多个模型响应的列表，每个响应类型为 `ChatCompletion`。
- **抛出异常**:
  - `NotImplementedError`: 如果该方法未在子类中实现，将抛出该异常。

### `embed_query(self, text: str) -> List[float]`

- **描述**: 嵌入查询，将输入文本转换为向量表示。此方法需要在子类中实现，以适应不同模型的嵌入逻辑。
- **参数**:
  - `text` (str): 要嵌入的文本查询内容。
- **返回**: 返回一个浮点数列表，表示文本的向量嵌入。
- **抛出异常**:
  - `NotImplementedError`: 如果该方法未在子类中实现，将抛出该异常。

### `embed_documents(self, texts: List[str]) -> List[List[float]]`

- **描述**: 嵌入文档，将输入文本列表转换为向量表示的列表。此方法需要在子类中实现，以适应不同模型的嵌入逻辑。
- **参数**:
  - `texts` (List[str]): 要嵌入的文本列表。
- **返回**: 返回一个包含每个文档向量嵌入的列表，每个向量表示为浮点数列表。
- **抛出异常**:
  - `NotImplementedError`: 如果该方法未在子类中实现，将抛出该异常。

### `format(self, *args: Union[Message, Sequence[Message]]) -> Union[List[dict], str]`

- **描述**: 格式化输入消息为模型所需的格式，以便发送到模型 API。此方法需要在子类中实现以适应特定模型的格式要求。
- **参数**:
  - `*args`: 一个或多个 `Message` 对象，或一个 `Message` 对象的序列。
- **返回**: 返回格式化后的消息，可能是一个字典列表或字符串，具体返回类型取决于模型的要求。
- **抛出异常**:
  - `NotImplementedError`: 如果该方法未在子类中实现，将抛出该异常。

### `format_for_common_chat_models(self, *args: Union[Message, Sequence[Message]]) -> List[dict]`

- **描述**: 针对常见聊天模型的格式化策略，格式化输入消息为聊天模型所期望的格式。该方法可以处理多个输入消息，并生成适当的格式化输出。
- **参数**:
  - `*args`: 入参可以是一个或多个 `Message` 对象，或一个 `Message` 对象的序列。
- **返回**: 返回一个字典列表，每个字典代表一个格式化后的聊天消息，符合常见聊天模型的输入要求。
- **抛出异常**:
  - `ValueError`: 如果没有提供输入消息，将抛出该异常。
  - `TypeError`: 如果输入参数不符合预期类型（即不是 `Message` 或 `Message` 列表），将抛出该异常。

## 模型使用

### 模型清单

当前接入的模型清单.
| model_type | 大模型/向量 | 接入情况 |
|----------------|---------| ---|
| openai_chat | 大模型 | generate、chat、function_call |
| yi_chat | 大模型 | generate、chat、function_call |
| qwen_chat | 大模型 | generate、chat、function_call |
| dashscope_chat | 大模型 | generate、chat、function_call |
| moonshot_chat | 大模型 | generate、chat、function_call |
| ollama_chat | 大模型 | generate、chat、function_call |
| dashscope_text_embedding| 向量 | embed_queruy、embed_documents |
| ollama_embedding| 向量 | embed_query、embed_documents |
| openai_embedding| 向量 | embed_query、embed_documents |
| qwen_text_embedding| 向量 | embed_query、embed_documents |

### 填写模型配置

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
        "api_key": "sk-xx",
    },
}
```

### 获取模型

快速配置模型参数，接入开源模型/商业化模型。

```python
model_type = "dashscope_chat"
model_config = MODEL_CONFIGS[model_type]
model_config = ModelConfig(
    config_name="model_test",
    model_type=model_type,
    model_name=model_config["model_name"],
    api_key=model_config["api_key"],
)
from muagent.models import get_model
model = get_model(model_config)
```

### 大模型调用/流式输出

```python
# 填写 prompt - str
print(model.generate("输出 '今天你好'", stop="你", format_type='str'))
# for i in model.generate_stream("hello", stop="你", format_type='str'):
    # print(i)

# 填写 chat message
# print(model.chat([{"role": "user", "content":"hello"}], format_type='str'))
# for i in model.chat_stream([{"role": "user", "content":"hello"}], format_type='str'):
#     print(i)

```

### 工具调用

```python
# 工具
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "strict": True,
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string"},
                    "unit": {"type": "string", "enum": ["c", "f"]},
                },
                "required": ["location", "unit"],
                "additionalProperties": False,
            },
        },
    }
]

print(model.function_call(tools=tools, prompt="我想查北京的天气"))
# for i in model.function_call_stream(tools=tools, messages=[{"role": "user", "content":"我想查北京的天气"}]):
#     print(i)
```

### 向量调用

```
model_type = "qwen_text_embedding"
model_config = ModelConfigs[model_type]
embed_config = ModelConfig(
    config_name="model_test",
    model_type=model_type,
    model_name=model_config["model_name"],
    api_key=model_config["api_key"],
)
model = get_model(embed_config)
print(model_type, model_config["model_name"], len(model.embed_query("hello")))
```

## 接入自有模型

在这里我们采用了阿里开源框架[agentscope](https://github.com/modelscope/agentscope/blob/main/src/agentscope/models/model.py)中的 model 基类，用于接入相关的开源模型和商业化模型。

下面以 ollama 接入实现为例：

### 定义 client 的模型类

这个基础类可同时用于大模型的调用以及向量模型的调用。

```python
class OllamaWrapperBase(ModelWrapperBase, ABC):
    """The base class for Ollama model wrappers.

    To use Ollama API, please
    1. First install ollama server from https://ollama.com/download and
    start the server
    2. Pull the model by `ollama pull {model_name}` in terminal
    After that, you can use the ollama API.
    """

    model_type: str
    """The type of the model wrapper, which is to identify the model wrapper
    class in model configuration."""

    model_name: str
    """The model name used in ollama API."""

    options: dict
    """A dict contains the options for ollama generation API,
    e.g. {"temperature": 0, "seed": 123}"""

    keep_alive: str
    """Controls how long the model will stay loaded into memory following
    the request."""

    def __init__(
        self,
        config_name: str,
        model_name: str,
        api_key: str = '',
        options: dict = None,
        keep_alive: str = "5m",
        api_url: Optional[Union[str, None]] = "http://127.0.0.1:11434",
        **kwargs: Any,
    ) -> None:
        """Initialize the model wrapper for Ollama API.

        Args:
            model_name (`str`):
                The model name used in ollama API.
            options (`dict`, default `None`):
                The extra keyword arguments used in Ollama api generation,
                e.g. `{"temperature": 0., "seed": 123}`.
            keep_alive (`str`, default `5m`):
                Controls how long the model will stay loaded into memory
                following the request.
            host (`str`, default `None`):
                The host port of the ollama server.
                Defaults to `None`, which is 127.0.0.1:11434.
        """

        super().__init__(config_name=config_name, model_name=model_name)

        self.options = options
        self.keep_alive = keep_alive
        self.api_url = api_url or "http://127.0.0.1:11434"

        try:
            import ollama
        except ImportError as e:
            raise ImportError(
                "The package ollama is not found. Please install it by "
                'running command `pip install "ollama>=0.1.7"`',
            ) from e

        self.client = ollama.Client(host=self.api_url)
```

### 大模型接入

在这个模块的接入过程中，只需要实现 `__init__` 和 `__call__`的接口即可。

注意！需要填写 `model_type`，用于后续的配置直接生成 model 接口。

````python
class OllamaChatWrapper(OllamaWrapperBase):
    """The model wrapper for Ollama chat API.

    Response:
        - Refer to
        https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion

        ```json
        {
            "model": "registry.ollama.ai/library/llama3:latest",
            "created_at": "2023-12-12T14:13:43.416799Z",
            "message": {
                "role": "assistant",
                "content": "Hello! How are you today?"
            },
            "done": true,
            "total_duration": 5191566416,
            "load_duration": 2154458,
            "prompt_eval_count": 26,
            "prompt_eval_duration": 383809000,
            "eval_count": 298,
            "eval_duration": 4799921000
        }
        ```
    """

    model_type: str = 'ollama_chat'

    def __init__(
        self,
        config_name: str,
        model_name: str,
        stream: bool = False,
        options: dict = None,
        keep_alive: str = "5m",
        api_url: Optional[Union[str, None]] = None,
        **kwargs: Any,
    ) -> None:
        """Initialize the model wrapper for Ollama API.

        Args:
            model_name (`str`):
                The model name used in ollama API.
            stream (`bool`, default `False`):
                Whether to enable stream mode.
            options (`dict`, default `None`):
                The extra keyword arguments used in Ollama api generation,
                e.g. `{"temperature": 0., "seed": 123}`.
            keep_alive (`str`, default `5m`):
                Controls how long the model will stay loaded into memory
                following the request.
            api_url (`str`, default `None`):
                The host port of the ollama server.
                Defaults to `None`, which is 127.0.0.1:11434.
        """

        super().__init__(
            config_name=config_name,
            model_name=model_name,
            options=options,
            keep_alive=keep_alive,
            api_url=api_url,
            **kwargs,
        )

        self.stream = stream

    def __call__(
        self,
        prompt: str = None,
        messages: Sequence[dict] = [],
        tools: Sequence[object] = [],
        *,
        tool_choice: Optional[Literal['auto', 'required']] = None,
        parallel_tool_calls: Optional[bool] = None,
        stop: Optional[str] = '',
        stream: Optional[bool] = None,
        options: Optional[dict] = None,
        keep_alive: Optional[str] = None,
        format_type: Literal['str', 'raw', 'dict'] = 'raw',
        **kwargs: Any,
    ):
        """Generate response from the given messages.

        Args:
            messages (`Sequence[dict]`):
                A list of messages, each message is a dict contains the `role`
                and `content` of the message.
            stream (`bool`, default `None`):
                Whether to enable stream mode, which will override the `stream`
                input in the constructor.
            options (`dict`, default `None`):
                The extra arguments used in ollama chat API, which takes
                effect only on this call, and will be merged with the
                `options` input in the constructor,
                e.g. `{"temperature": 0., "seed": 123}`.
            keep_alive (`str`, default `None`):
                How long the model will stay loaded into memory following
                the request, which takes effect only on this call, and will
                override the `keep_alive` input in the constructor.

        Returns:
            `ModelResponse`:
                The response text in `text` field, and the raw response in
                `raw` field.
        """

        messages = [{"role": "user", "content": prompt}] if prompt else messages
        # step1: prepare parameters accordingly
        if options is None:
            options = self.options or {"stop": [stop]}
        else:
            options = {**self.options, **options}

        keep_alive = keep_alive or self.keep_alive

        # step2: forward to generate response
        stream = self.stream if stream is None else stream

        kwargs.update(
            {
                "model": self.model_name,
                "messages": messages,
                "tools": tools,
                "stream": stream,
                "options": options,
                "keep_alive": keep_alive,
            },
        )

        response = self.client.chat(**kwargs)
        if format_type == "str":
            content = ""
            if stream:
                for chunk in response:
                    content += chunk["message"]["content"] or ''
                    yield content
            else:
                yield response["message"]["content"]
        else:
            if stream:
                for chunk in response:
                    yield chunk
            else:
                yield response
````

### 向量模型接入

在这个模块的接入过程中，只需要实现 `__init__` 、 `embed_query` 和 `embed_documents` 的接口即可。

注意！需要填写 `model_type`，用于后续的配置直接生成 model 接口。

````python
class OllamaEmbeddingWrapper(OllamaWrapperBase):
    """The model wrapper for Ollama embedding API.

    Response:
        - Refer to
        https://github.com/ollama/ollama/blob/main/docs/api.md#generate-embeddings

        ```json
        {
            "model": "all-minilm",
            "embeddings": [[
                0.010071029, -0.0017594862, 0.05007221, 0.04692972,
                0.008599704, 0.105441414, -0.025878139, 0.12958129,
            ]]
        }
        ```
    """

    model_type: str = "ollama_embedding"

    def __call__(
        self,
        texts: str,
        options: Optional[dict] = None,
        keep_alive: Optional[str] = None,
        **kwargs: Any,
    ) -> Mapping[str, Sequence[float]]:
        """Generate embedding from the given prompt.

        Args:
            prompt (`str`):
                The prompt to generate response.
            options (`dict`, default `None`):
                The extra arguments used in ollama embedding API, which takes
                effect only on this call, and will be merged with the
                `options` input in the constructor,
                e.g. `{"temperature": 0., "seed": 123}`.
            keep_alive (`str`, default `None`):
                How long the model will stay loaded into memory following
                the request, which takes effect only on this call, and will
                override the `keep_alive` input in the constructor.

        Returns:
            `ModelResponse`:
                The response embedding in `embedding` field, and the raw
                response in `raw` field.
        """
        # step1: prepare parameters accordingly
        if options is None:
            options = self.options
        else:
            options = {**self.options, **options}

        keep_alive = keep_alive or self.keep_alive

        # step2: forward to generate response
        response = self.client.embed(
            model=self.model_name,
            input=texts,
            options=options,
            keep_alive=keep_alive,
            **kwargs,
        )
        # step5: return response
        return response

    def embed_query(self, text: str) -> List[float]:
        response = self([text])
        embeddings = response["embeddings"]
        return embeddings[0]

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        response = self(texts)
        embeddings = response["embeddings"]
        return embeddings

    def format(
        self,
        *args: Union[Message, Sequence[Message]],
    ) -> Union[List[dict], str]:
        raise RuntimeError(
            f"Model Wrapper [{type(self).__name__}] doesn't "
            f"need to format the input. Please try to use the "
            f"model wrapper directly.",
        )
````
