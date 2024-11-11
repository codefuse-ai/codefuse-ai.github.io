---
group:
  title: Connector
  order: 0
title: Prompt
order: 2
toc: content
---

## Prompt Manager

Managing prompt creation in multi-agent linkages

- Quick Configuration: Utilizing preset processing functions, users can easily configure by simply defining the inputs and outputs of the agents, enabling fast assembly and configuration of multi-agent prompts.
- Customization Support: Allows users to customize the internal processing logic of each module within the prompt to achieve personalized implementation of the agent prompt.

### Preset Template Structure for Prompts

- Agent Profile: This section involves the basic description of the agent, including but not limited to the type of agent, its functions, and command set. Users can set the basic attributes of the agent here to ensure its behavior aligns with expectations.
- Context: Contextual Information, provided as a reference for the agent, aiding in better decision-making.
  - Tool Information: This part provides the agent with a list of available tools, from which the agent can choose appropriate ones to assist in task execution based on current scenario requirements.
  - Reference Documents: This may include documents or code snippets for the agent to refer to when handling requests, to facilitate the use of relevant information.
  - Session Records: In multi-round conversations, this section records previous dialogue content to ensure continuity within the context.
- Response Output Format: Here the user can set the output format of the agent to ensure that the generated responses meet specific formatting requirements, including structure, grammar, etc.

## Standard Structure of Prompt

In the entire structure of a Prompt, we need to define three parts:

- Agent Profile
- Input Format: such as `**key_name:** key_description`
- Response Output Format: such as `**key_name:** key_description`

```
#### Agent Profile
Agent Description ...

#### Input Format
**Origin Query:** the initial question or objective that the user wanted to achieve
**Context:** the current status and history of the tasks to determine if Origin Query has been achieved.

#### Response Output Format
**Action Status:** finished or continued
If it's 'finished', the context can answer the origin query.
If it's 'continued', the context can't answer the origin query.
**REASON:** Justify the decision of choosing 'finished' or 'continued' by evaluating the progress step by step.
Consider all relevant information. If the tasks were aimed at an ongoing process, assess whether it has reached a satisfactory conclusion.
```

Here, we have integrated some of the common operations of the `Input Format`, with certain fields and operational procedures built in to form a standardized configurable operation.
In the future, we will also make parts of the Agent Profile and Response Output Format configurable to reduce the difficulty of writing Prompts.

### Customizing Agents

- Implement construction with custom fields according to actual needs

```
class CodeGenDocer(BaseAgent):
    def start_action_step(self, message: Message) -> Message:
        '''do action before agent predict '''
        # Get code snippets and node information based on the question
        action_json = CodeRetrievalSingle.run(message.code_engine_name, message.input_query, llm_config=self.llm_config,
                                              embed_config=self.embed_config, local_graph_path=message.local_graph_path, use_nh=message.use_nh,search_type="tag")
        current_vertex = action_json['vertex']
        message.customed_kargs["Code Snippet"] = action_json["code"]
        message.customed_kargs['Current_Vertex'] = current_vertex
        return message

```

### pre_print Function

After building phases, chains, or agents, we can confirm agent linkages using the pre-print function of methods, allowing for debugging in advance to avoid discovering issues only after execution.

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

question = "Confirm if employee_data.csv exists locally, and check its columns and data types; then draw a bar chart"
query = Message(
    user_name="test", role_type="user", role_name="user", input_query=question,
)
phase.pre_print(query)
```

Here, pre-defined agents are used,，custom case can be seen [customed_example](./customed_examples.en-US.md)
<br>

## check the pre-print prompt

```
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
