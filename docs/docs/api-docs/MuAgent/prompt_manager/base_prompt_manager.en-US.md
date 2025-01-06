---
group:
  title: Prompt Manager
  order: 2
title: Base Prompt Manager
order: 0
toc: content
---

# BasePromptManager Class Documentation

## Code Overview

`BasePromptManager` is a base class used for managing prompts, providing a structured set of methods for creating, managing, and generating content related to prompts. This class uses the metaclass `_PromptManagerWrapperMeta` to implement a call mechanism with error handling. It is designed to be inherited by specific prompt managers and provides basic functionality and interfaces for working with prompt inputs and outputs.

## Feature Overview

### Basic Properties:

- `pm_type`: The type of the prompt manager, defaulting to "BasePromptManager".
- `system_prompt`: The content of the system prompt, defaulting to "you are a helpful assistant!\n".
- `input_template`: The input template, which can be a string or a Pydantic model.
- `output_template`: The output template, which can be a string or a Pydantic model.
- `prompt`: An optional base prompt text.
- `language`: The language type of the prompt content, defaulting to "en" (English), with support for "zh" (Chinese).
- `monitored_agents`: A list of monitored agents (deprecated).
- `monitored_fields`: A list of monitored fields (deprecated).
- `extra_registry_titles`: A dictionary used to store additional registered titles.
- `extra_register_edges`: A list used to store additional registered edges.
- `new_dfsindex_to_str_format`: A dictionary used for formatting, for labeling descriptions and function values.

### Class Methods:

- `from_config(prompt_config: PromptConfig, **kwargs) -> 'BasePromptManager'`: Creates an instance of the prompt manager based on configuration.
- `get_wrapper(prompt_manager_type: str) -> Type['BasePromptManager']`: Retrieves the specific type of prompt manager wrapper.

### Instance Methods:

- `register_graph(...)`: Registers titles and edges into a graph structure to execute further actions.
- `register_env(...)`: Registers environmental variables and configuration information.
- `register_prompt()`: Abstract method for registering input/output prompts (must be implemented in subclasses).
- `pre_print(**kwargs) -> str`: Generates and returns a pre-printed prompt string.
- `generate_prompt(**kwargs) -> str`: Generates the final prompt string.
- `parser(message: Message) -> Message`: Parses LLM output into message format.
- `handle_empty_key(**kwargs) -> str`: Returns an empty string.
- `handler_input_key(**kwargs) -> str`: Returns the input template string.
- `handler_output_key(**kwargs) -> str`: Returns the output template string.

## SDK Interface Documentation

Here are the main methods provided by the `BasePromptManager` class, along with their documentation:

### `__init__(...)`

- **Description**: Initializes the `BasePromptManager`.
- **Parameters**:
  - `system_prompt`: System prompt (string).
  - `input_template`: Input template (string or model).
  - `output_template`: Output template (string or model).
  - `prompt`: An optional base prompt text.
  - `language`: Language for the prompt (default is "en").
  - `monitored_agents`: List of monitored agents (deprecated).
  - `monitored_fields`: List of monitored fields (deprecated).
  - `**kwargs`: Other optional parameters.

### `from_config(prompt_config: PromptConfig, **kwargs) -> 'BasePromptManager'`

- **Description**: Initializes the prompt manager using the provided configuration.
- **Parameters**:
  - `prompt_config`: Prompt configuration object.
  - `**kwargs`: Other optional parameters.

### `get_wrapper(prompt_manager_type: str) -> Type['BasePromptManager']`

- **Description**: Retrieves the respective wrapper for a specified prompt manager type.
- **Parameters**:
  - `prompt_manager_type`: String identifying the prompt manager type.

### `register_graph(...)`

- **Description**: Registers titles and edges into a graph structure to execute actions.
- **Parameters**:
  - `title_configs`: Dictionary of title configurations.
  - `title_edges`: Sequence of edges between titles.
  - `title_format`: Dictionary for formatting templates.
  - `titles`: Dictionary of titles.
  - `zero_titles`: Dictionary of zero titles.
  - `common_texts`: Dictionary of shared texts.

### `register_env(...)`

- **Description**: Updates the basic configurations of the prompt manager.
- **Parameters**:
  - `title_configs`: Dictionary of title configurations.
  - `title_edges`: Sequence of edges between titles.
  - `title_format`: Dictionary for formatting templates.
  - `titles`: Dictionary of titles.
  - `zero_titles`: Dictionary of zero titles.
  - `common_texts`: Dictionary of shared texts.

### `register_prompt()`

- **Description**: Registers the input and output prompts (abstract method, must be implemented in subclasses).

### `generate_prompt(**kwargs) -> str`

- **Description**: Generates and returns a prompt string.
- **Parameters**:
  - `**kwargs`: Other optional parameters.

### `parser(message: Message) -> Message`

- **Description**: Parses the LLM output into a message object.
- **Parameters**:
  - `message`: LLM message object.

### `handle_empty_key(**kwargs) -> str`

- **Description**: Returns an empty string.

### `handler_input_key(**kwargs) -> str`

- **Description**: Returns the input template string.

### `handler_output_key(**kwargs) -> str`

- **Description**: Returns the output template string.

## Usage Examples

You can use `BasePromptManager` as a base class to build different specific prompt managers by inheriting and implementing the `register_prompt` method to register specific input and output formats. Users can extend this class as needed, providing different logic for prompt generation and management, thus creating a more flexible prompt management system. Through the `from_config` method, prompt managers can be generated from configuration files, enabling easy integration into larger systems or applications.

### Registering a Personalized Prompt Manager

Note! You need to fill in `pm_type` to specify the type of this prompt manager.

Register the required titles according to the configuration, and implement needed `handle_xx` methods for constructing parts of the prompt.

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
    """The type of the prompt manager."""

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
        # Update new titles
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
                "str_template": "**{}:** {}"
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

If you require `system_prompt`, `input_template`, or `output_template`, fill them in accordingly and complete the registration.

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

### Constructing Historical Messages

Build two historical messages.

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
    content="hi! can I help you!"
)
memory = Memory(messages=[message1, message2])
```

### Constructing Input for the Current Query

Use `content` to record the current query, `spec_parsed_content` for special message content, and `global_kwargs` to log global information.

```python
query = Message(
    role_name="test",
    role_type="user",
    content="I want to know the weather of Beijing",
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

### Pre-printing

Pre-printing helps confirm the structure of the prompt in advance.

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

This translation provides a comprehensible version in English while retaining the technical elements and context of the documentation.
