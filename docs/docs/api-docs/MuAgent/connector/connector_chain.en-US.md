---
group:
  title: Connector
  order: 0
title: Chain
order: 0
toc: content
---

## Quickly Build an Agent

### First, add an OpenAI configuration, or a model with a similar interface to OpenAI (launched through fastchat)

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

### Then Set LLM Configuration and Vector Model Configuration

Configure related LLM and Embedding Model

```
from muagent.base_configs.env_config import JUPYTER_WORK_PATH
from muagent.connector.agents import BaseAgent, ReactAgent, ExecutorAgent, SelectorAgent
from muagent.connector.chains import BaseChain
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

### Agent Configuration

- Define two react agents for actual task execution

```
# Here, predefined prompts are used, but you can also refer to the above prompts to complete the writing
from muagent.connector.configs.prompts import REACT_CODE_PROMPT, REACT_TOOL_PROMPT

# A tool agent based on react is defined
tool_role = Role(role_type="assistant", role_name="tool_reacter", prompt=REACT_TOOL_PROMPT)
tool_react_agent = ReactAgent(
    role=tool_role,
    task="",
    chat_turn=3,
    focus_agents=[],
    focus_message_keys=[],
    llm_config=llm_config, embed_config=embed_config,
)

# A code agent based on react is defined
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

- Define a groupAgent for agent selection

```
prompt = """#### Agent Profile
Your goal is to respond according to the information in the Context Data with the role that will best facilitate a solution, taking into account all relevant context (Context) provided.
When you need to select the appropriate role for handling a user's query, carefully read the provided role names, role descriptions, and tool list.
ATTENTION: respond carefully following the "Response Output Format".
#### Response Output Format
**Thoughts:** think step by step about why you selected one role
**Role:** Select the role from the agent names.
"""
# A groupAgent is defined
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

### Chain Config

```
chain_config = ChainConfig(chain_name="group_chain", agents=[base_agent.role.role_name], chat_turn=1)
base_chain = BaseChain(
    chainConfig=chain_config, agents=[base_agent],
    llm_config=llm_config, embed_config=embed_config,
)
```

### Start Actual Q&A

```
# prepare your tools
tools = toLangchainTools([TOOL_DICT[i] for i in TOOL_SETS if i in TOOL_DICT])

# if you want to analyze a data.csv, please put the csv file into a jupyter_work_path (or your defined path)
import shutil
source_file = 'D://project/gitlab/llm/external/ant_code/Codefuse-chatbot/jupyter_work/employee_data.csv'
shutil.copy(source_file, JUPYTER_WORK_PATH)
question = "Confirm if employee_data.csv exists locally, and check its columns and data types; then draw a bar chart"
query = Message(
    user_name="test", role_type="user", role_name="user", input_query=question,
    tools=tools,
)

# base_chain.pre_print(query)
output_message, output_memory = base_chain.step(query)
print(output_message.input_query)
print(output_message.role_content)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```

## Chain Parameter Configuration

| Config Key Name   | Type            | Description                                           |
| ----------------- | --------------- | ----------------------------------------------------- |
| agents            | List[BaseAgent] |
| llm_config        | LLMConfig       | Large Language Model Configuration                    |
| embed_config      | EmbedConfig     | Vector Model Configuration                            |
| sandbox_server    | Dict            | Sandbox environment or notebook startup configuration |
| jupyter_work_path | str             | Working directory for the sandbox environment         |
| kb_root_path      | str             | Storage path for memory                               |
| log_verbose       | str             | Log printing level for agent prompts & predictions    |
