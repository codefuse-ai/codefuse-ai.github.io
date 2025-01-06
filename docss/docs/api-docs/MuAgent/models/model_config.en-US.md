---
group:
  title: models
  order: 1
title: Model
order: 0
toc: content
---

# ModelWrapperBase Class

## Overview

Here, we adopt the model base class from the open-source framework [agentscope](https://github.com/modelscope/agentscope/blob/main/src/agentscope/models/model.py) to integrate relevant open-source models and commercial models.

`ModelWrapperBase` is a base class used for wrapping large models. This class provides a basic framework and interface, allowing all model wrappers to inherit from it and implement the corresponding methods. The class is mainly used for interacting with APIs, managing model configurations, and making calls to the models.

## Feature Overview

**Basic Properties**:

- `model_type`: The type of the model wrapper, used to identify the wrapper class in model configuration.
- `config_name`: The name of the model configuration.
- `model_name`: The name of the model used to call the model API.
- `api_key`: The API key for the model, used for calling the model's API.
- `api_url`: The API address for the model, used for calling the model's API.

**Class Methods**:

- `from_config`: Creates a wrapper instance based on the model configuration.
- `get_wrapper`: Retrieves the specific model wrapper class, supporting registration and returning the appropriate wrapper based on its type.

**Instance Methods**:

- `__call__`: Handles input and interacts with the model. This method must be implemented by subclasses.
- `predict`: Generates the model's prediction results based on the provided prompt.
- `generate`: Calls the model to generate a response.
- `generate_stream`: Processes the model's generated responses in a streaming manner.
- `chat`: Handles chat messages and returns responses from the model.
- `chat_stream`: Returns chat responses in a streaming manner.
- `function_call`: Calls a function to process messages.
- `function_call_stream`: Streaming return of function call results.
- `batch`: Processes input in batches, which must be implemented by subclasses.
- `embed_query`: Embeds a query, and subclasses for vector models must implement this.
- `embed_documents`: Embeds documents; subclasses for vector models must implement this.
- `format`: Formats input messages to the required format for the model, this must be implemented by subclasses.
- `format_for_common_chat_models`: Formatting strategy for common chat models.

## SDK Interface

Here are the primary methods provided by the `ModelWrapperBase` class along with their documentation:

### `__init__(config_name: str, model_name: str, model_type: str = "codefuse", api_key: Optional[str] = "model_base_xxx", api_url: Optional[str] = "https://codefuse.ai", **kwargs: Any)`

- **Description**: Initializes basic parameters for the model wrapper.
- **Parameters**:
  - `config_name`: The configuration ID for the model.
  - `model_name`: The name of the model.
  - `model_type`: The type of the model wrapper (default is "codefuse").
  - `api_key`: The API key for the model.
  - `api_url`: The API address for the model.
  - `kwargs`: Other additional parameters.

### `__call__(prompt: str = None, messages: Sequence[dict] = [], tools: Sequence[object] = [], *, tool_choice: Optional[Literal['auto', 'required']] = None, parallel_tool_calls: Optional[bool] = None, stream: bool = None, stop: Optional[str] = '', format_type: Literal["str", "dict", "raw"] = "str", **kwargs: Any) -> Generator[Union[ChatCompletion, ChatCompletionChunk, str, Mapping], None, None]`

- **Description**: Processes input and calls the model to generate a response.
- **Parameters**:
  - `prompt`: The prompt string provided to the model.
  - `messages`: The sequence of chat messages.
  - `tools`: The sequence of available tools.
  - `tool_choice`: Tool selection strategy.
  - `parallel_tool_calls`: Whether to allow concurrent tool calls.
  - `stream`: Whether to return responses in a streaming manner.
  - `stop`: Marker for the end of generation.
  - `format_type`: The format of the output.
  - `kwargs`: Other optional parameters.
- **Returns**: Returns the generated response.

### `from_config(model_config: ModelConfig) -> 'ModelWrapperBase'`

- **Description**: Creates a model wrapper based on the model configuration.
- **Parameters**:
  - `model_config`: The model configuration object.
- **Returns**: Returns an instance of the model wrapper.

### `predict(prompt: str, stop: Optional[str] = '') -> Union[ChatCompletion, str]`

- **Description**: Generates the model's prediction results based on the provided prompt.
- **Parameters**:
  - `prompt`: The input prompt string.
  - `stop`: Optional marker for stopping generation.
- **Returns**: The prediction result from the model.

### `generate(prompt: str, stop: Optional[str] = '', format_type: Literal["str", "raw"] = "raw") -> Union[ChatCompletion, str]`

- **Description**: Calls the model to generate a response.
- **Parameters**:
  - `prompt`: The input prompt.
  - `stop`: Marker for stopping generation.
  - `format_type`: The output format.
- **Returns**: The generated response.
- **Streaming Interface**: `generate_stream`

### `chat(messages: Optional[Sequence[dict]], stop: Optional[str] = '', format_type: Literal["str", "raw"] = "raw") -> Union[ChatCompletion, str]`

- **Description**: Processes chat messages and returns responses from the model.
- **Parameters**:
  - `messages`: The sequence of chat messages.
  - `stop`: Marker for stopping generation.
  - `format_type`: The output format.
- **Returns**: The model's chat response.
- **Streaming Interface**: `chat_stream`

### `function_call(messages: Optional[Sequence[dict]] = None, tools: Sequence[object] = [], *, prompt: Optional[str] = None, tool_choice: Optional[Literal['auto', 'required']] = None, parallel_tool_calls: Optional[bool] = None, stream: Optional[bool] = False, stop: Optional[str] = '', format_type: Literal["raw"] = "raw") -> Union[ChatCompletion, Mapping]`

- **Description**: Calls a function to process the messages.
- **Parameters**:
  - `messages`: The sequence of chat messages.
  - `tools`: The sequence of available tools.
  - `prompt`: An optional prompt.
  - `tool_choice`: Tool selection strategy.
  - `parallel_tool_calls`: Whether to allow concurrent tool calls.
  - `stream`: Whether to return the output in a streaming manner.
  - `stop`: Marker for stopping generation.
  - `format_type`: The format of the output.
- **Returns**: The result from the function call.
- **Streaming Interface**: `function_call_stream`

### `batch(self, *args: Any, **kwargs: Any) -> List[ChatCompletion]`

- **Description**: Processes input in batches, allowing simultaneous handling of multiple requests and returning the respective results. Custom batch processing logic must be implemented in subclasses.
- **Parameters**:
  - `*args`: A variable number of input parameters of any type.
  - `kwargs`: Optional keyword arguments of any type.
- **Returns**: A list of model responses, with each response being of type `ChatCompletion`.
- **Throws Exception**:
  - `NotImplementedError`: Thrown if this method is not implemented in the subclass.

### `embed_query(self, text: str) -> List[float]`

- **Description**: Embeds a query by converting the input text into a vector representation. This method must be implemented in subclasses to adapt to different embedding logics.
- **Parameters**:
  - `text` (str): The text query content to embed.
- **Returns**: A list of floats representing the vector embedding of the text.
- **Throws Exception**:
  - `NotImplementedError`: Thrown if this method is not implemented in the subclass.

### `embed_documents(self, texts: List[str]) -> List[List[float]]`

- **Description**: Embeds documents, converting a list of input texts into a list of vector representations. This method must be implemented in subclasses to adapt to different embedding logics.
- **Parameters**:
  - `texts` (List[str]): The list of texts to embed.
- **Returns**: A list containing the vector embeddings of each document, with each vector represented as a list of floats.
- **Throws Exception**:
  - `NotImplementedError`: Thrown if this method is not implemented in the subclass.

### `format(self, *args: Union[Message, Sequence[Message]]) -> Union[List[dict], str]`

- **Description**: Formats input messages into the format required by the model for submission to the model API. This method must be implemented in subclasses to meet specific model formatting requirements.
- **Parameters**:
  - `*args`: One or more `Message` objects, or a sequence of `Message` objects.
- **Returns**: Returns the formatted messages, which may be a list of dictionaries or a string, depending on the model's requirements.
- **Throws Exception**:
  - `NotImplementedError`: Thrown if this method is not implemented in the subclass.

### `format_for_common_chat_models(self, *args: Union[Message, Sequence[Message]]) -> List[dict]`

- **Description**: Formatting strategy for common chat models, formatting input messages to meet the expected format for chat models. This method can handle multiple input messages and generate appropriately formatted outputs.
- **Parameters**:
  - `*args`: Input parameters can be one or more `Message` objects, or a sequence of `Message` objects.
- **Returns**: Returns a list of dictionaries, each representing a formatted chat message that complies with the common chat model inputs.
- **Throws Exception**:
  - `ValueError`: Thrown if no input messages are provided.
  - `TypeError`: Thrown if the input parameters do not conform to expected types (i.e., not `Message` or a list of `Message` objects).

## Model Usage

### Models List

List of currently integrated models.
| model_type | Large Model/Vector | Integration Status |
|----------------|---------| ---|
| openai_chat | Large Model | generate, chat, function_call |
| yi_chat | Large Model | generate, chat, function_call |
| qwen_chat | Large Model | generate, chat, function_call |
| dashscope_chat | Large Model | generate, chat, function_call |
| moonshot_chat | Large Model | generate, chat, function_call |
| ollama_chat | Large Model | generate, chat, function_call |
| dashscope_text_embedding| Vector | embed_query, embed_documents |
| ollama_embedding| Vector | embed_query, embed_documents |
| openai_embedding| Vector | embed_query, embed_documents |
| qwen_text_embedding| Vector | embed_query, embed_documents |

### Filling in Model Configuration

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
```

### Acquiring a Model

Quickly configure model parameters to access open-source or commercial models.

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

### Calling Large Models/Streaming Output

```python
# Fill in prompt - str
print(model.generate("Output 'Hello today'", stop="you", format_type='str'))
# for i in model.generate_stream("hello", stop="you", format_type='str'):
#     print(i)

# Fill in chat message
# print(model.chat([{"role": "user", "content":"hello"}], format_type='str'))
# for i in model.chat_stream([{"role": "user", "content":"hello"}], format_type='str'):
#     print(i)
```

### Tool Invocation

```python
# Tools
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

print(model.function_call(tools=tools, prompt="I want to check the weather in Beijing"))
# for i in model.function_call_stream(tools=tools, messages=[{"role": "user", "content":"I want to check the weather in Beijing"}]):
#     print(i)
```

### Vector Invocation

```python
model_type = "qwen_text_embedding"
model_config = MODEL_CONFIGS[model_type]
embed_config = ModelConfig(
    config_name="model_test",
    model_type=model_type,
    model_name=model_config["model_name"],
    api_key=model_config["api_key"],
)
model = get_model(embed_config)
print(model_type, model_config["model_name"], len(model.embed_query("hello")))
```

## Integrating Custom Models

Here, we adopt the model base class from the open-source framework [agentscope](https://github.com/modelscope/agentscope/blob/main/src/agentscope/models/model.py) to integrate relevant open-source models and commercial models.

The following is an example of implementation using Ollama:

### Defining the Client Model Class

This base class can be used for calls to both large models and vector models.

```python
class OllamaWrapperBase(ModelWrapperBase, ABC):
    """The base class for Ollama model wrappers.

    To use Ollama API, please
    1. First install the Ollama server from https://ollama.com/download and
    start the server.
    2. Pull the model by `ollama pull {model_name}` in the terminal.
    After that, you can use the Ollama API.
    """

    model_type: str
    """The type of the model wrapper, which identifies the model wrapper
    class in model configuration."""

    model_name: str
    """The model name used in Ollama API."""

    options: dict
    """A dict containing the options for Ollama generation API,
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
                The model name used in Ollama API.
            options (`dict`, default `None`):
                The extra keyword arguments used in Ollama API generation,
                e.g. `{"temperature": 0., "seed": 123}`.
            keep_alive (`str`, default `5m`):
                Controls how long the model will stay loaded into memory
                following the request.
            host (`str`, default `None`):
                The host port of the Ollama server.
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

### Large Model Integration

In this module's integration process, only the `__init__` and `__call__` interfaces need to be implemented.

Note! It is important to fill in `model_type` to enable direct generation of the model interface via configuration.

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
                The model name used in Ollama API.
            stream (`bool`, default `False`):
                Whether to enable stream mode.
            options (`dict`, default `None`):
                The extra keyword arguments used in Ollama API generation,
                e.g. `{"temperature": 0., "seed": 123}`.
            keep_alive (`str`, default `5m`):
                Controls how long the model will stay loaded into memory
                following the request.
            api_url (`str`, default `None`):
                The host port of the Ollama server.
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
                A list of messages, each message is a dict containing the `role`
                and `content` of the message.
            stream (`bool`, default `None`):
                Whether to enable stream mode, which will override the `stream`
                input in the constructor.
            options (`dict`, default `None`):
                The extra arguments used in Ollama chat API, which takes
                effect only on this call, and will be merged with the
                `options` input in the constructor,
                e.g. `{"temperature": 0., "seed": 123}`.
            keep_alive (`str`, default `None`):
                How long the model will stay loaded into memory following
                the request, which takes effect only on this call, and will
                override the `keep_alive` input in the constructor.

        Returns:
            `ModelResponse`:
                The response text in the `text` field, and the raw response in
                the `raw` field.
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

### Vector Model Integration

In this module's integration process, only the `__init__`, `embed_query`, and `embed_documents` interfaces need to be implemented.

Note! It is important to fill in `model_type` to enable direct generation of the model interface via configuration.

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
                The extra arguments used in Ollama embedding API, which takes
                effect only on this call, and will be merged with the
                `options` input in the constructor,
                e.g. `{"temperature": 0., "seed": 123}`.
            keep_alive (`str`, default `None`):
                How long the model will stay loaded into memory following
                the request, which takes effect only on this call, and will
                override the `keep_alive` input in the constructor.

        Returns:
            `ModelResponse`:
                The response embedding in the `embedding` field, and the raw
                response in the `raw` field.
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
