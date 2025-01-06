---
group:
  title: 智能体
  order: 5
title: 基础·智能体
order: -1
toc: content
---

以下是对于 `BaseAgen` 类的中文使用文档，包含代码内容说明、功能介绍，以及 SDK 接口文档。

# BaseAgent 类使用

## 代码内容说明

`BaseAgent` 类是一个用于实现 Agent 的基础类，提供了初始化和交互方法。用户可以根据需要自定义智能体，处理特定的任务和查询。

### 功能介绍

`BaseAgent` 类主要用于提高 agent 的基础构建块。它支持与大语言模型的交互，提示词管理，记忆管理，以及响应生成。以下是该类提供的主要功能：

- **任务执行**：提供 `step` 和 `step_stream` 方法，用于处理用户请求，并返回 agent 响应。
- **记忆管理**：实现对历史消息的管理，可以选择清除或恢复历史记录。
- **提示词管理**：基于输入的查询和会话上下文，生成动态提示。

**基本属性**:

- `agent_type`: 字符串，定义 agent 的类型（默认为 `BaseAgent`）。
- `agent_name`: 字符串，agent 的名称。
- `system_prompt`: 字符串，系统的提示信息。
- `input_template`: 输入模板，可以是字符串或基础模型。
- `output_template`: 输出模板，可以是字符串或基础模型。
- `prompt`: 可选字符串，提示信息。
- `agents`: 智能体列表，可进行多智能体交互。
- `tools`: 工具列表，可以使用外部工具。
- `agent_desc`: 智能体描述信息。
- `agent_config`: 可选智能体配置。
- `model_config`: 可选模型配置。
- `prompt_config`: 提示配置（默认为 `PromptConfig()`）。
- `project_config`: 可选项目配置。

**类方法**:

- `init_from_project_config`: 根据项目配置创建智能体的新实例。
- `get_wrapper`: 根据智能体类型获取相应的类包装器。

**实例方法**:

- `step`: 处理查询并返回智能体响应。
- `step_stream`: 流式处理智能体的响应。
- `pre_print`: 生成并打印智能体的提示格式。
- `copy_config`: 创建智能体配置的副本。
- `clear_history`: 清除智能体的内存历史。
- `get_memory`: 获取指定会话索引的记忆。
- `append_history`: 向智能体的历史记录中追加新消息。
- `update_memory_manager`: 更新内存管理器，以存储最新消息。
- `memory_to_format_messages`: 将存储的记忆格式化为特定消息格式。

### SDK 接口文档

#### `__init__(agent_name: str = "codefuse_baser", system_prompt: str = "you are a helpful assistant!\n", input_template: Union[str, BaseModel] = "", output_template: Union[str, BaseModel] = "", prompt: Optional[str] = None, agents: List[str] = [], tools: List[str] = [], agent_desc: str = "", *, agent_config: Optional[AgentConfig] = None, model_config: Optional[ModelConfig] = None, prompt_config: Optional[PromptConfig] = PromptConfig(), project_config: Optional[ProjectConfig] = None, log_verbose: str = "0")`

- **描述**: 初始化 agent 的基本属性。
- **参数**:
  - `agent_name`: agent 的名称（默认为 "codefuse_baser"）。
  - `system_prompt`: 系统的提示信息（默认为 "you are a helpful assistant!\n"）。
  - `input_template`: 输入模板，支持字符串或基础模型类型。
  - `output_template`: 输出模板，支持字符串或基础模型类型。
  - `prompt`: 可选的提示信息。
  - `agents`: 智能体列表。
  - `tools`: 工具列表。
  - `agent_desc`: agent 描述信息。
  - `agent_config`: 可选的 agent 配置。
  - `model_config`: 可选的模型配置。
  - `prompt_config`: 提示配置，默认为 `PromptConfig()`。
  - `project_config`: 可选的项目配置。
  - `log_verbose`: 日志详细程度（默认为 "0"）。

#### `step(query: Message, memory_manager: Optional[BaseMemoryManager]=None, session_index: str = "default", **kwargs) -> Optional[Message]`

- **描述**: 回答用户的输入并返回 agent 的响应。
- **参数**:
  - `query`: 一条用户输入消息。
  - `memory_manager`: 可选的内存管理器实例，用于管理消息历史。
  - `session_index`: 字符串，表示会话索引（默认为 "default"）。
  - `kwargs`: 其他扩展功能的关键字参数。
- **返回**: 返回智能体处理后的消息实例，或在没有响应时返回 `None`。

#### `step_stream(query: Message, memory_manager: Optional[BaseMemoryManager]=None, session_index: str = "default") -> Generator[Message, None, None]`

- **描述**: 回答用户输入并返回 agent 的流式响应。
- **参数**:
  - `query`: 一条用户输入消息。
  - `memory_manager`: 可选的内存管理器实例，用于管理消息历史。
  - `session_index`: 字符串，表示会话索引（默认为 "default"）。
- **返回**: 返回一个生成器，用于逐条输出消息。

#### `pre_print(query: Message, memory_manager: Optional[BaseMemoryManager]=None, session_index: str = "default", **kwargs) -> None`

- **描述**: 生成并打印 agent 的提示词格式，执行前置操作。
- **参数**:
  - `query`: 一条用户输入消息。
  - `memory_manager`: 可选的内存管理器实例，用于管理消息历史。
  - `session_index`: 字符串，表示会话索引（默认为 "default"）。
  - `kwargs`: 其他扩展功能的关键字参数。
- **返回**: 无返回值。

#### `clear_history()`

- **描述**: 清除 agent 的记忆。
- **返回**: 无返回值。

#### `get_memory(session_index: str, memory_manager: Optional[BaseMemoryManager] = None) -> Memory`

- **描述**: 获取指定会话索引的记忆。
- **参数**:
  - `session_index`: 字符串，表示会话索引。
  - `memory_manager`: 可选的内存管理器实例。
- **返回**: 返回对应索引的 `Memory` 实例。
