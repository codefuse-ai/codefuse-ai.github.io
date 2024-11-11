---
group:
  title: Connector
  order: 0
title: Prompt
order: 2
toc: content
---

## 提示管理器（Prompt Manager）

管理多智能体链路中的 prompt 创建

- 快速配置：采用预设的处理函数，用户仅需通过定义智能体的输入输出即可轻松配置，实现多智能体的 prompt 快速组装和配置。
- 自定义支持：允许用户自定义 prompt 内部各模块的处理逻辑，以达到个性化的智能体 prompt 实现。

### Prompt 预设模板结构

- Agent Profile：此部分涉及到智能体的基础描述，包括但不限于代理的类型、功能和指令集。用户可以在这里设置智能体的基本属性，确保其行为与预期相符。
- Context：上下文信息，给智能体做参考，帮助智能体更好的进行决策。
  - Tool Information：此部分为智能体提供了一套可用工具的清单，智能体可以根据当前的场景需求从中挑选合适的工具以辅助其执行任务。
  - Reference Documents：这里可以包含代理参考使用的文档或代码片段，以便于它在处理请求时能够参照相关资料。
  - Session Records：在进行多轮对话时，此部分会记录之前的交谈内容，确保智能体能够在上下文中保持连贯性。
- Response Output Format：用户可以在此设置智能体的输出格式，以确保生成的响应满足特定的格式要求，包括结构、语法等。

## Prompt 的标准结构

在整个 Prompt 的整个结构中，我们需要去定义三个部分

- Agent Profil
- Input Format: 需要写出 `**key_name:** key_description`
- Response Output Format：需要写出 `**key_name:** key_description`

```
#### Agent Profile

Agent Description ...

#### Input Format

**Origin Query:** the initial question or objective that the user wanted to achieve

**Context:** the current status and history of the tasks to determine if Origin Query has been achieved.

#### Response Output Format
**Action Status:** finished or continued
If it's 'finished', the context can answer the origin query.
If it's 'continued', the context cant answer the origin query.

**REASON:** Justify the decision of choosing 'finished' and 'continued' by evaluating the progress step by step.
Consider all relevant information. If the tasks were aimed at an ongoing process, assess whether it has reached a satisfactory conclusion.
```

其中，我们整合了部分 `Input Format` 的通用操作，内置了一部分字段和操作流程,形成通用的配置化操作。

未来我们会也会进一步将 Agent Profile 和 Response Output Format 的部分，实现可配置化操作，降低 Prompt 编写难度

### 自定义 Agent

- 有自定义字段需求，根据实际需求完成构造

```
class CodeGenDocer(BaseAgent):

    def start_action_step(self, message: Message) -> Message:
        '''do action before agent predict '''
        # 根据问题获取代码片段和节点信息
        action_json = CodeRetrievalSingle.run(message.code_engine_name, message.input_query, llm_config=self.llm_config,
                                              embed_config=self.embed_config, local_graph_path=message.local_graph_path, use_nh=message.use_nh,search_type="tag")
        current_vertex = action_json['vertex']
        message.customed_kargs["Code Snippet"] = action_json["code"]
        message.customed_kargs['Current_Vertex'] = current_vertex
        return message

```

### pre_print 功能

在我们构建 phase、chain 或者 agent 之后，可以通过函数的预打印功能，实现 agents 链路确认，避免在执行后才发现问题，可提前进行 debug

```
from muagent.base_configs.env_config import JUPYTER_WORK_PATH
from muagent.connector.agents import BaseAgent, ReactAgent, ExecutorAgent, SelectorAgent
from muagent.connector.chains import BaseChain
from muagent.connector.schema import Role, Message, ChainConfig
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig
from muagent.tools import toLangchainTools, TOOL_DICT, TOOL_SETS


import os, sys

api_key = "sk-xxx"
api_base_url= "https://api.openai.com/v1"
model_name = "gpt-3.5-turbo"
embed_model = "{{embed_model_name}}"
embed_model_path = "{{embed_model_path}}"
#
os.environ["DUCKDUCKGO_PROXY"] = os.environ.get("DUCKDUCKGO_PROXY") or "socks5://127.0.0.1:13659"

llm_config = LLMConfig(
    model_name="gpt-4", api_key=api_key,  api_base_url=api_base_url, temperature=0.3
)
embed_config = EmbedConfig(
    embed_engine="model", embed_model=embed_model, embed_model_path=embed_model_path
)

phase_name = "baseGroupPhase"
phase = BasePhase(
    phase_name, embed_config=embed_config, llm_config=llm_config,
)

question = "确认本地是否存在employee_data.csv，并查看它有哪些列和数据类型;然后画柱状图"
query = Message(
    user_name="test", role_type="user", role_name="user", input_query=question,
)
phase.pre_print(query)
```

这里采用预定义好的链路，自定义 case 可见[customed_example](./customed_examples.zh-CN.md)
<br>

```
>>> 完整信息确认 muagent.connector.configs中进行确认

##########################
<<<<baseGroup's prompt>>>>
##########################

### Agent Profile
Your goal is to response according the Context Data's information with the role that will best facilitate a solution, taking into account all relevant context (Context) provided.
When you need to select the appropriate role for handling a user's query, carefully read the provided role names, role descriptions and tool list.
ATTENTION: response carefully referenced "Response Output Format" in format.

### Tool Information

### Agent Infomation
        Please ensure your selection is one of the listed roles. Available roles for selection:
        "role name: tool_react
role description:  Agent Profile,When interacting with users, your role is to respond in a helpful and accurate manner using the tools available. Follow the steps below to ensure efficient and effective use of the tools.,Please note that all the tools you can use are listed below. You can only choose from these tools for use. ,If there are no suitable tools, please do not invent any tools. Just let the user know that you do not have suitable tools to use.,ATTENTION: The Action Status field ensures that the tools or code mentioned in the Action can be parsed smoothly. Please make sure not to omit the Action Status field when replying.,"
"role name: code_react
role description:  Agent Profile,When users need help with coding, your role is to provide precise and effective guidance.,Write the code step by step, showing only the part necessary to solve the current problem. Each reply should contain only the code required for the current step.,"
        Please ensure select the Role from agent names, such as tool_react, code_react

### Context Data

#### Reference Documents

#### Session Records

#### Current Plan

### Response Output Format
**Thoughts:** think the reason step by step about why you selecte one role
**Role:** Select the role from agent names.

### Begin!!!

###################
<<<<LLM PREDICT>>>>
###################

**Thoughts:**
**Role:**


###########################
<<<<tool_react's prompt>>>>
###########################
### Agent Profile
When interacting with users, your role is to respond in a helpful and accurate manner using the tools available. Follow the steps below to ensure efficient and effective use of the tools.
Please note that all the tools you can use are listed below. You can only choose from these tools for use.
If there are no suitable tools, please do not invent any tools. Just let the user know that you do not have suitable tools to use.
ATTENTION: The Action Status field ensures that the tools or code mentioned in the Action can be parsed smoothly. Please make sure not to omit the Action Status field when replying.

### Tool Information

### Context Data

#### Reference Documents

#### Session Records

#### Task Records

### Response Output Format
**Thoughts:** According the previous observations, plan the approach for using the tool effectively.
...

### Begin!!!

###################
<<<<LLM PREDICT>>>>
###################
**Thoughts:**
**Action Status:**
**Action:**
**Observation:**
**Thoughts:**
**Action Status:**
**Action:**

###########################
<<<<code_react's prompt>>>>
###########################
### Agent Profile
When users need help with coding, your role is to provide precise and effective guidance.
Write the code step by step, showing only the part necessary to solve the current problem. Each reply should contain only the code required for the current step.

### Context Data

#### Reference Documents

#### Session Records

### Response Output Format

**Thoughts:** According the previous context, solve the problem step by step, only displaying the thought process necessary for the current step of solving the problem,
outline the plan for executing this step.

**Action Status:** Set to 'stopped' or 'code_executing'.
If it's 'stopped', the action is to provide the final answer to the session records and executed steps.
If it's 'code_executing', the action is to write the code.
...

### Begin!!!

###################
<<<<LLM PREDICT>>>>
###################

**Thoughts:**
**Action Status:**
**Action:**
**Observation:**
**Thoughts:**
**Action Status:**
**Action:**

```
