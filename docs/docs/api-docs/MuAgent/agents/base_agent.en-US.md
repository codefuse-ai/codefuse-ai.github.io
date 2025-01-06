---
group:
  title: Agent
  order: 5
title: BaseAgent
order: -1
toc: content
---

Here is the English translation of the usage documentation for the BaseAgent class, including the code content description, functionality overview, and SDK interface documentation.

# `BaseAgent` Documentation

## Code Content Description

The `BaseAgent` class is a foundational class for implementing agents, providing initialization and interaction methods. Users can customize the agent as needed to handle specific tasks and inquiries.

### Functionality Overview

The `BaseAgent` class primarily serves as a foundational building block for agents. It supports interaction with large language models, prompt management, memory management, and response generation. Below are the main functionalities provided by this class:

- **Task Execution**: Provides `step` and `step_stream` methods for processing user requests and returning agent responses.
- **Memory Management**: Implements management of historical messages, allowing for optional clearing or restoration of historical records.
- **Prompt Management**: Generates dynamic prompts based on input queries and session contexts.

**Basic Attributes**:

- `agent_type`: String that defines the type of the agent (default is `BaseAgent`).
- `agent_name`: String representing the agent's name.
- `system_prompt`: String containing the system's prompt message.
- `input_template`: Input template, which can be a string or a base model.
- `output_template`: Output template, which can be a string or a base model.
- `prompt`: Optional string for prompt information.
- `agents`: List of agents for multi-agent interaction.
- `tools`: List of tools available for external use.
- `agent_desc`: Description of the agent.
- `agent_config`: Optional agent configuration.
- `model_config`: Optional model configuration.
- `prompt_config`: Prompt configuration (default is `PromptConfig()`).
- `project_config`: Optional project configuration.

**Class Methods**:

- `init_from_project_config`: Creates a new instance of the agent based on project configuration.
- `get_wrapper`: Retrieves the appropriate class wrapper based on the agent type.

**Instance Methods**:

- `step`: Processes a query and returns the agent's response.
- `step_stream`: Streams the agent's responses.
- `pre_print`: Generates and prints the agent's prompt format.
- `copy_config`: Creates a copy of the agent's configuration.
- `clear_history`: Clears the agent's memory history.
- `get_memory`: Retrieves memory for a specified session index.
- `append_history`: Appends new messages to the agent's history.
- `update_memory_manager`: Updates the memory manager to store the latest messages.
- `memory_to_format_messages`: Formats stored memory into specific message formats.

### SDK Interface Documentation

#### `__init__(agent_name: str = "codefuse_baser", system_prompt: str = "you are a helpful assistant!\n", input_template: Union[str, BaseModel] = "", output_template: Union[str, BaseModel] = "", prompt: Optional[str] = None, agents: List[str] = [], tools: List[str] = [], agent_desc: str = "", *, agent_config: Optional[AgentConfig] = None, model_config: Optional[ModelConfig] = None, prompt_config: Optional[PromptConfig] = PromptConfig(), project_config: Optional[ProjectConfig] = None, log_verbose: str = "0")`

- **Description**: Initializes the basic properties of the agent.
- **Parameters**:
  - `agent_name`: The name of the agent (default is "codefuse_baser").
  - `system_prompt`: The system's prompt message (default is "you are a helpful assistant!\n").
  - `input_template`: Input template, supporting string or base model types.
  - `output_template`: Output template, supporting string or base model types.
  - `prompt`: Optional prompt information.
  - `agents`: List of agents.
  - `tools`: List of tools.
  - `agent_desc`: Description of the agent.
  - `agent_config`: Optional agent configuration.
  - `model_config`: Optional model configuration.
  - `prompt_config`: Prompt configuration, default is `PromptConfig()`.
  - `project_config`: Optional project configuration.
  - `log_verbose`: Verbosity of logs (default is "0").

#### `step(query: Message, memory_manager: Optional[BaseMemoryManager]=None, session_index: str = "default", **kwargs) -> Optional[Message]`

- **Description**: Responds to user input and returns the agent's response.
- **Parameters**:
  - `query`: A user input message.
  - `memory_manager`: An optional memory manager instance for managing message history.
  - `session_index`: A string representing the session index (default is "default").
  - `kwargs`: Additional keyword arguments for extended functionality.
- **Returns**: Returns the message instance processed by the agent, or `None` if there is no response.

#### `step_stream(query: Message, memory_manager: Optional[BaseMemoryManager]=None, session_index: str = "default") -> Generator[Message, None, None]`

- **Description**: Responds to user input and returns the agent's streaming response.
- **Parameters**:
  - `query`: A user input message.
  - `memory_manager`: An optional memory manager instance for managing message history.
  - `session_index`: A string representing the session index (default is "default").
- **Returns**: Returns a generator for outputting messages one by one.

#### `pre_print(query: Message, memory_manager: Optional[BaseMemoryManager]=None, session_index: str = "default", **kwargs) -> None`

- **Description**: Generates and prints the agent's prompt format and performs pre-processing.
- **Parameters**:
  - `query`: A user input message.
  - `memory_manager`: An optional memory manager instance for managing message history.
  - `session_index`: A string representing the session index (default is "default").
  - `kwargs`: Additional keyword arguments for extended functionality.
- **Returns**: No return value.

#### `clear_history()`

- **Description**: Clears the agent's memory.
- **Returns**: No return value.

#### `get_memory(session_index: str, memory_manager: Optional[BaseMemoryManager] = None) -> Memory`

- **Description**: Retrieves memory for the specified session index.
- **Parameters**:
  - `session_index`: A string representing the session index.
  - `memory_manager`: An optional memory manager instance.
- **Returns**: Returns the `Memory` instance corresponding to the specified index.
