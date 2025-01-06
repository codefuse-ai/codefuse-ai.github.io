---
group:
  title: 提示管理器
  order: 2
title: 通用·提示词管理器
order: 0
toc: content
---

# BasePromptManager 类使用文档

## 代码内容说明

`BasePromptManager` 是一个用于管理提示的基类，提供了一组结构化的方法来创建、管理和生成提示相关的内容。这个类使用元类 `_PromptManagerWrapperMeta`，实现了一个包含错误处理的调用机制。该类旨在被具体的提示管理器所继承，并提供基本的功能和接口，以便对提示的输入和输出进行操作。

## 功能介绍

### 基本属性:

- `pm_type`: 提示管理器的类型，默认为 "BasePromptManager"。
- `system_prompt`: 系统提示的内容，默认为 "you are a helpful assistant!\n"。
- `input_template`: 输入模板，可以是字符串或 Pydantic 模型。
- `output_template`: 输出模板，可以是字符串或 Pydantic 模型。
- `prompt`: 可选的基本提示文本。
- `language`: 提示内容的语言类型，默认是 "en"（英语），支持 "zh"（中文）。
- `monitored_agents`: 监控的代理列表（已废弃）。
- `monitored_fields`: 监控的字段列表（已废弃）。
- `extra_registry_titles`: 用于存储额外注册标题的字典。
- `extra_register_edges`: 用于存储额外注册边的列表。
- `new_dfsindex_to_str_format`: 用于格式化的字典，用于标记描述和函数值。

### 类方法:

- `from_config(prompt_config: PromptConfig, **kwargs) -> 'BasePromptManager'`: 根据配置创建提示管理器的实例。
- `get_wrapper(prompt_manager_type: str) -> Type['BasePromptManager']`: 获取指定类型的提示管理器包装器。

### 实例方法:

- `register_graph(...)`: 注册标题和边的图结构，以执行进一步的操作。
- `register_env(...)`: 注册环境变量和配置信息。
- `register_prompt()`: 用于注册输入/输出的提示（抽象方法）。
- `pre_print(**kwargs) -> str`: 生成并返回预打印的提示字符串。
- `generate_prompt(**kwargs) -> str`: 生成最终的提示字符串。
- `parser(message: Message) -> Message`: 解析 LLM 输出为字典格式。
- `handle_empty_key(**kwargs) -> str`: 返回空字符串。
- `handler_input_key(**kwargs) -> str`: 返回输入模板字符串。
- `handler_output_key(**kwargs) -> str`: 返回输出模板字符串。

## SDK 接口

以下是该类提供的主要方法及其接口文档：

### `__init__(...)`

- **描述**: 初始化 `BasePromptManager`。
- **参数**:
  - `system_prompt`: 系统提示（字符串）。
  - `input_template`: 输入模板（字符串或模型）。
  - `output_template`: 输出模板（字符串或模型）。
  - `prompt`: 可选的基本提示文本。
  - `language`: 提示语言（默认为 "en"）。
  - `monitored_agents`: 监控的代理列表（已废弃）。
  - `monitored_fields`: 监控的字段列表（已废弃）。
  - `**kwargs`: 其他可选参数。

### `from_config(prompt_config: PromptConfig, **kwargs) -> 'BasePromptManager'`

- **描述**: 使用给定的配置初始化提示管理器。
- **参数**:
  - `prompt_config`: 提示配置对象。
  - `**kwargs`: 其他可选参数。

### `get_wrapper(prompt_manager_type: str) -> Type['BasePromptManager']`

- **描述**: 根据指定的提示管理器类型获取相应的包装器。
- **参数**:
  - `prompt_manager_type`: 提示管理器类型字符串。

### `register_graph(...)`

- **描述**: 注册标题和边以形成可以执行的图结构。
- **参数**:
  - `title_configs`: 标题配置字典。
  - `title_edges`: 标题之间的边的序列。
  - `title_format`: 格式化模板字典。
  - `titles`: 标题的字典。
  - `zero_titles`: 首标题的字典。
  - `common_texts`: 共享文本的字典。

### `register_env(...)`

- **描述**: 更新提示管理器的基本配置。
- **参数**:
  - `title_configs`: 标题配置字典。
  - `title_edges`: 标题边的序列。
  - `title_format`: 格式化模板字典。
  - `titles`: 标题的字典。
  - `zero_titles`: 零标题的字典。
  - `common_texts`: 共享文本的字典。

### `register_prompt()`

- **描述**: 注册输入和输出的提示（抽象方法，需在子类中实现）。

### `generate_prompt(**kwargs) -> str`

- **描述**: 生成并返回提示字符串。
- **参数**:
  - `**kwargs`: 其他可选参数。

### `parser(message: Message) -> Message`

- **描述**: 将 LLM 输出解析为消息对象。
- **参数**:
  - `message`: LLM 消息对象。

### `handle_empty_key(**kwargs) -> str`

- **描述**: 返回空字符串。

### `handler_input_key(**kwargs) -> str`

- **描述**: 返回输入模板字符串。

### `handler_output_key(**kwargs) -> str`

- **描述**: 返回输出模板字符串。

## 使用示例

可以将 `BasePromptManager` 作为基类构建不同的具体提示管理器，继承并实现 `register_prompt` 方法，以注册特定的输入和输出格式。用户可按需扩展这个类，提供不同的提示生成和管理逻辑，从而实现更灵活的提示管理系统。通过 `from_config` 方法，提示管理器能够从配置文件中生成，因此可以轻松集成到更大的系统或应用程序中。

### 注册个性化的 prompt manager

注意！需要填写 `pm_type` 作为该 prompt manageer 指定类型。

将需要注册的标题按配置进行个性化注册，同时按需实现 `handle_xx` 处理方法用于构建 prompt 的一部分。

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

### 初始化

快速初始化一个个性化的 prompt manager。

若有 system、input_template、output_template 需求自行填写，并完成注册。

```python
system_prompt = "you are a helpful assistant!\n"
intput_template = ""
output_template = ""
prompt = ""

bpm = NewPromptManager(
    # system_prompt=system_prompt,
    # input_template=intput_template,
    # output_template=output_template,
    # prompt=prompt,
    language="zh",
)
```

### 构建历史消息

构建两条历史消息。

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

### 构建本次问题输入

用`conent`记录本次问题，`spec_parsed_content`记录特殊消息内容，`global_kwargs` 记录全局信息。

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

### 预打印

预打印，可以帮忙提前确认 prompt 的结构。

```python
prompt = bpm.pre_print(
    query=query, memory=memory, tools=tools,
    agent_names=agent_names, agent_descs=agent_descs
)
print(prompt)
```

### 生成提示词

```python
prompt = bpm.generate_prompt(
    query=query, memory=memory, tools=tools,
    agent_names=agent_names, agent_descs=agent_descs
)
print(prompt)
```
