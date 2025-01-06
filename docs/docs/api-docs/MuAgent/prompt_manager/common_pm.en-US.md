---
group:
  title: Prompt Manager
  order: 2
title: Common Prompt Manager
order: 0
toc: content
---

# Usage of the BasePromptManager Class

## Code Content Description

`BasePromptManager` is a base class used for managing prompts, providing a structured set of methods to create, manage, and generate prompt-related content. This class utilizes the metaclass `_PromptManagerWrapperMeta`, implementing a calling mechanism with error handling. The class is designed to be inherited by specific prompt managers and offers basic functionalities and interfaces to operate on prompt inputs and outputs.

## Features Overview

### Basic Attributes:

- `pm_type`: Type of the prompt manager, default is "BasePromptManager".
- `system_prompt`: Content of the system prompt, default is "you are a helpful assistant!\n".
- `input_template`: Input template, can be a string or a Pydantic model.
- `output_template`: Output template, can be a string or a Pydantic model.
- `prompt`: Optional basic prompt text.
- `language`: Language type of the prompt content, default is "en" (English), supports "zh" (Chinese).
- `monitored_agents`: List of monitored agents (deprecated).
- `monitored_fields`: List of monitored fields (deprecated).
- `extra_registry_titles`: Dictionary for storing additional registered titles.
- `extra_register_edges`: List for storing additional registered edges.
- `new_dfsindex_to_str_format`: Dictionary for formatting, used for marking descriptions and function values.

### Class Methods:

- `from_config(prompt_config: PromptConfig, **kwargs) -> 'BasePromptManager'`: Creates an instance of the prompt manager based on configuration.
- `get_wrapper(prompt_manager_type: str) -> Type['BasePromptManager']`: Retrieves the specified type of prompt manager wrapper.

### Instance Methods:

- `register_graph(...)`: Registers titles and edges in a graph structure for further operations.
- `register_env(...)`: Registers environment variables and configuration information.
- `register_prompt()`: Used to register input/output prompts (abstract method).
- `pre_print(**kwargs) -> str`: Generates and returns a pre-printed prompt string.
- `generate_prompt(**kwargs) -> str`: Generates the final prompt string.
- `parser(message: Message) -> Message`: Parses LLM output into dictionary format.
- `handle_empty_key(**kwargs) -> str`: Returns an empty string.
- `handler_input_key(**kwargs) -> str`: Returns input template string.
- `handler_output_key(**kwargs) -> str`: Returns output template string.

## SDK Interface

Below are the main methods provided by this class and their documentation:

### `__init__(...)`

- **Description**: Initializes `BasePromptManager`.
- **Parameters**:
  - `system_prompt`: System prompt (string).
  - `input_template`: Input template (string or model).
  - `output_template`: Output template (string or model).
  - `prompt`: Optional basic prompt text.
  - `language`: Prompt language (default is "en").
  - `monitored_agents`: List of monitored agents (deprecated).
  - `monitored_fields`: List of monitored fields (deprecated).
  - `**kwargs`: Other optional parameters.

### `from_config(prompt_config: PromptConfig, **kwargs) -> 'BasePromptManager'`

- **Description**: Initializes the prompt manager using the given configuration.
- **Parameters**:
  - `prompt_config`: Prompt configuration object.
  - `**kwargs`: Other optional parameters.

### `get_wrapper(prompt_manager_type: str) -> Type['BasePromptManager']`

- **Description**: Retrieves the corresponding wrapper based on specified prompt manager type.
- **Parameters**:
  - `prompt_manager_type`: String of the prompt manager type.

### `register_graph(...)`

- **Description**: Registers titles and edges to form an executable graph structure.
- **Parameters**:
  - `title_configs`: Title configuration dictionary.
  - `title_edges`: Sequence of edges between titles.
  - `title_format`: Formatting template dictionary.
  - `titles`: Dictionary of titles.
  - `zero_titles`: Dictionary of initial titles.
  - `common_texts`: Dictionary of shared texts.

### `register_env(...)`

- **Description**: Updates the basic configuration of the prompt manager.
- **Parameters**:
  - `title_configs`: Title configuration dictionary.
  - `title_edges`: Sequence of title edges.
  - `title_format`: Formatting template dictionary.
  - `titles`: Dictionary of titles.
  - `zero_titles`: Dictionary of zero titles.
  - `common_texts`: Dictionary of shared texts.

### `register_prompt()`

- **Description**: Registers input and output prompts (abstract method that needs to be implemented in subclasses).

### `generate_prompt(**kwargs) -> str`

- **Description**: Generates and returns the prompt string.
- **Parameters**:
  - `**kwargs`: Other optional parameters.

### `parser(message: Message) -> Message`

- **Description**: Parses LLM output into a message object.
- **Parameters**:
  - `message`: LLM message object.

### `handle_empty_key(**kwargs) -> str`

- **Description**: Returns an empty string.

### `handler_input_key(**kwargs) -> str`

- **Description**: Returns input template string.

### `handler_output_key(**kwargs) -> str`

- **Description**: Returns output template string.

## Usage Example

The `BasePromptManager` can be used as a base class to build different specific prompt managers by inheriting and implementing the `register_prompt` method to register specific input and output formats. Users can extend this class as needed to provide different prompt generation and management logic, thus creating a more flexible prompt management system. By using the `from_config` method, the prompt manager can be generated from configuration files, making it easy to integrate into larger systems or applications.

### Registering a Personalized Prompt Manager

Note! Ensure to fill in `pm_type` to specify the type of the prompt manager.

Register the required titles according to the configuration and implement the necessary `handle_xx` methods to build parts of the prompt.

```python
from muagent.schemas import Memory, Message
from muagent.prompt_manager import BasePromptManager

from typing import (
    List,
    Any,
    Union,
    Optional,
    Dict,
    Literal
)
from pydantic import BaseModel

class NewPromptManager(BasePromptManager):

    pm_type: str = "NewPromptManager"
    """The type of prompt manager."""

    def __init__(
            self,
            system_prompt: str = "you are a helpful assistant!\n",
            input_template: Union[str, BaseModel] = "",
            output_template: Union[str, BaseModel] = "",
            prompt: Optional[str] = None,
            language: Literal["en", "zh"] = "en",
            *,
            monitored_agents=[],
            monitored_fields=[],
            **kwargs
        ):
        super().__init__(
            system_prompt=system_prompt,
            input_template=input_template,
            output_template=output_template,
            prompt=prompt,
            language=language,
            monitored_agents=monitored_agents,
            monitored_fields=monitored_fields,
            **kwargs
        )
        # update new titles
        self.extra_registry_titles: Dict = {
            "AGENT PROFILE": {
                "description": "",
                "function": "handle_agent_profile",
                "display_type": "title"
            },
            "TOOL INFORMATION": {
                "description": "",
                "prompt": """Below is a list of tools that are available for your use:{formatted_tools}\nvalid "tool_name" value is:\n{tool_names}""",
                "function": "handle_tool_data",
                "display_type": "description",
                "str_template": "**{}\n{}"
            },
            "AGENT INFORMATION": {
                "description": "",
                "prompt": '''Please ensure your selection is one of the listed roles. Available roles for selection:\n{agents}Please ensure select the Role from agent names, such as {agent_names}''',
                "function": "handle_agent_data",
                "display_type": "description"
            },
        }
        #
        self.extra_register_edges: List = [
            ("AGENT PROFILE", "AGENT INFORMATION"),
            ("AGENT PROFILE", "TOOL INFORMATION"),
        ]

        #
        self.new_dfsindex_to_str_format: Dict = {
            0: "#### {}\n{}",
            1: "### {}\n{}",
            2: "## {}\n{}",
            3: "# {}\n{}",
        }
        """use {title name} {description/function_value}"""
        #
        self.register_graph({}, [], {}, {})

    def register_prompt(self):
        """register input/output/prompt into titles and edges"""
        pass

    def handle_agent_profile(self, **kwargs) -> str:
        return self.system_prompt

    def handle_tool_data(self, **kwargs):
        import random
        from textwrap import dedent
        from muagent.tools import get_tool, BaseToolModel

        if 'tools' not in kwargs: return ""

        tools: List = kwargs.get('tools')
        prompt: str = kwargs.get('prompt')
        tools: List[BaseToolModel] = [get_tool(tool) for tool in tools if isinstance(tool, str)]

        if len(tools) == 0: return ""

        tool_strings = []
        for tool in tools:
            args_str = f'args: {str(tool.intput_to_json_schema())}' if tool.ToolInputArgs else ""
            tool_strings.append(f"{tool.name}: {tool.description}, {args_str}")
        formatted_tools = "\n".join(tool_strings)

        tool_names = ", ".join([tool.name for tool in tools])

        tool_prompt = dedent(prompt.format(formatted_tools=formatted_tools, tool_names=tool_names))
        while "\n " in tool_prompt:
            tool_prompt = tool_prompt.replace("\n ", "\n")

        return tool_prompt

    def handle_agent_data(self, **kwargs):
        """"""
        import random
        from textwrap import dedent
        if 'agent_names' not in kwargs or "agent_descs" not in kwargs:
            return ""

        agent_names: List = kwargs.get('agent_names')
        agent_descs: List = kwargs.get('agent_descs')
        prompt: str = kwargs.get('prompt')

        if len(agent_names) == 0: return ""

        random.shuffle(agent_names)
        agent_descriptions = []
        for agent_name, desc in zip(agent_names, agent_descs):
            while "\n\n" in desc:
                desc = desc.replace("\n\n", "\n")
            desc = desc.replace("\n", ",")
            agent_descriptions.append(
                f'"role name: {agent_name}\nrole description: {desc}"'
            )

        agent_description =  "\n".join(agent_descriptions)
        agent_prompt = dedent(
            prompt.format(agents=agent_description, agent_names=agent_names)
        )

        while "\n " in agent_prompt:
            agent_prompt = agent_prompt.replace("\n ", "\n")

        return agent_prompt
```

### Initialization

Quickly initialize a personalized prompt manager.

Fill in `system`, `input_template`, `output_template` as needed and complete the registration.

```python
system_prompt = "you are a helpful assistant!\n"
input_template = ""
output_template = ""
prompt = ""

bpm = NewPromptManager(
    # system_prompt=system_prompt,
    # input_template=input_template,
    # output_template=output_template,
    # prompt=prompt,
    language="zh",
)
```

### Building Historical Messages

Construct two historical messages.

```python
#
message1 = Message(
    role_name="test",
    role_type="user",
    content="hello"
)
message2 = Message(
    role_name="test",
    role_type="assistant",
    content="hi! can i help you!"
)
memory = Memory(messages=[message1, message2])

```

### Constructing Input for the Current Question

Use `content` to record the current question, `spec_parsed_content` to record special message content, and `global_kwargs` to store global information.

```python
query = Message(
    role_name="test",
    role_type="user",
    content="i want to know the weather of beijing",
    spec_parsed_content={
        "Retrieval Code Snippets": "hi"
    },
    global_kwargs={
        "Code Snippet": "hello",
        "Test Code": "nice to meet you."
    }
)

agent_names = ["agent1", "agent2"]
agent_descs = [f"hello {agent}" for agent in agent_names]
tools = ["Multiplier", "WeatherInfo"]
```

### Pre-Print

Pre-printing can help to confirm the structure of the prompt in advance.

```python
prompt = bpm.pre_print(
    query=query, memory=memory, tools=tools,
    agent_names=agent_names, agent_descs=agent_descs
)
print(prompt)
```

### Generating Prompts

```python
prompt = bpm.generate_prompt(
    query=query, memory=memory, tools=tools,
    agent_names=agent_names, agent_descs=agent_descs
)
print(prompt)
```
