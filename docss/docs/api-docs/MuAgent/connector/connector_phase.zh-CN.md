---
group:
  title: Connector
  order: 0
title: Phase
order: 1
toc: content
---

## 快速构建一个 Agent Phase

- 首先增加 openai 配置，也可以是其它类似于 openai 接口的模型（通过 fastchat 启动）

```
import os, sys

api_key = "sk-xxx"
api_base_url= "https://api.openai.com/v1"
model_name = "gpt-3.5-turbo"
embed_model = "{{embed_model_name}}"
embed_model_path = "{{embed_model_path}}"
#
os.environ["DUCKDUCKGO_PROXY"] = os.environ.get("DUCKDUCKGO_PROXY") or "socks5://127.0.0.1:13659"
```

### 然后设置 LLM 配置和向量模型配置

- 配置相关 LLM 和 Embedding Model

```
from muagent.base_configs.env_config import JUPYTER_WORK_PATH
from muagent.connector.agents import BaseAgent, ReactAgent, ExecutorAgent, SelectorAgent
from muagent.connector.chains import BaseChain
from muagent.connector.phase import BasePhase
from muagent.connector.schema import Role, Message, ChainConfig
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig
from muagent.tools import toLangchainTools, TOOL_DICT, TOOL_SETS


llm_config = LLMConfig(
    model_name=model_name, api_key=api_key,  api_base_url=api_base_url, temperature=0.3,
    stop="**Observation:**"
)

embed_config = EmbedConfig(
    embed_engine="model", embed_model=embed_model, embed_model_path=embed_model_path
)
```

### Agent 配置

- 定义两个 react agent，进行实际任务执行

```
# 这里采用了预定义的prompt，也可以参考上述prompt完成编写
from muagent.connector.configs.prompts import REACT_CODE_PROMPT, REACT_TOOL_PROMPT
# 定义了基于react的tool agent
tool_role = Role(role_type="assistant", role_name="tool_reacter", prompt=REACT_TOOL_PROMPT)
tool_react_agent = ReactAgent(
    role=tool_role,
    task="",
    chat_turn=3,
    focus_agents=[],
    focus_message_keys=[],
    llm_config=llm_config, embed_config=embed_config,
)

# 定义了基于react的code agent
code_role = Role(role_type="assistant", role_name="code_reacter", prompt=REACT_CODE_PROMPT)
code_react_agent = ReactAgent(
    role=code_role,
    task="",
    chat_turn=3,
    focus_agents=[],
    focus_message_keys=[],
    llm_config=llm_config, embed_config=embed_config,
)

```

- 定义 groupAgent，用于 agent 选择

```
prompt = """#### Agent Profile

Your goal is to response according the Context Data's information with the role that will best facilitate a solution, taking into account all relevant context (Context) provided.

When you need to select the appropriate role for handling a user's query, carefully read the provided role names, role descriptions and tool list.

ATTENTION: response carefully referenced "Response Output Format" in format.

#### Response Output Format

**Thoughts:** think the reason step by step about why you selecte one role

**Role:** Select the role from agent names.
"""

# 定义了一个groupAgent
role = Role(role_type="assistant", role_name="qaer", prompt=prompt)
base_agent = SelectorAgent(
    role=role,
    task="",
    chat_turn=3,
    focus_agents=[],
    focus_message_keys=[],
    llm_config=llm_config, embed_config=embed_config,
    group_agents=[tool_react_agent, code_react_agent]
)
```

### Chain 配置

```
chain_config = ChainConfig(chain_name="group_chain", agents=[base_agent.role.role_name], chat_turn=1)
base_chain = BaseChain(
    chainConfig=chain_config, agents=[base_agent],
    llm_config=llm_config, embed_config=embed_config,
)

```

### Phase 配置

```
base_phase = BasePhase(
    phase_name="group_phase", chains=[base_chain],
    embed_config=embed_config, llm_config=llm_config
)
```

### 开始实际问答

- 开始执行

```
# prepare your tools
tools = toLangchainTools([TOOL_DICT[i] for i in TOOL_SETS if i in TOOL_DICT])

# if you want to analyze a data.csv, please put the csv file into a jupyter_work_path (or your defined path)
import shutil
source_file = 'D://project/gitlab/llm/external/ant_code/Codefuse-chatbot/jupyter_work/employee_data.csv'
shutil.copy(source_file, JUPYTER_WORK_PATH)

question = "确认本地是否存在employee_data.csv，并查看它有哪些列和数据类型;然后画柱状图"
query = Message(
    user_name="test", role_type="user", role_name="user", input_query=question,
    tools=tools,
)

# base_phase.pre_print(query)
output_message, output_memory = base_phase.step(query)
print(output_message.input_query)
print(output_message.role_content)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```

## Phase 参数配置

| Config Key Name   | Type        | Description                         |
| ----------------- | ----------- | ----------------------------------- |
| phase_name        | String      | 场景名称                            |
| chains            | List[Chain] | chain 列表，按顺序执行              |
| llm_config        | LLMConfig   | 大语言模型配置                      |
| embed_config      | EmbedConfig | 向量模型配置                        |
| sandbox_server    | Dict        | 沙盒环境即 notebook 启动配置        |
| jupyter_work_path | str         | 沙盒环境的工作目录                  |
| kb_root_path      | str         | memory 的存储路径                   |
| log_verbose       | str         | agent prompt&predict 的日志打印级别 |
