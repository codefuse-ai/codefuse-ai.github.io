---
group:
  title: Agent
  order: 5
title: SingleAgent
order: 0
toc: content
---

`SingleAgent` provides functionalities for basic question-answering, tool usage, and code execution, implementing a single-step execution process: input => output.

<div align=center>
  <img src="../../../../static/api-docs/muAgent/baseagent.png" alt="Image" style="width: 800px; height:auto;" >
</div>

## Usage of SingleAgent

### Configure the Model

```python
from muagent.schemas import ModelConfig
import json, os

MODEL_CONFIGS = {
    "qwen_chat": {
        "model_type": "qwen_chat",
        "model_name": "qwen2.5-72b-instruct",
        "api_key": "sk-xxx",
    },
}
os.environ["MODEL_CONFIGS"] = json.dumps(MODEL_CONFIGS)
```

### Configure the Agent

```python
role_prompt = """#### AGENT PROFILE
You are a helpful assistant!

#### RESPONSE OUTPUT FORMAT
**Action Status:** Set to 'stopped' or 'code_executing'.
If it's 'stopped', the action is to provide the final answer to the session records and executed steps.
If it's 'code_executing', the action is to write the code.

**Action:**
# Write your code here
...
"""

role_prompt = """#### AGENT PROFILE
You are a helpful assistant!

#### RESPONSE OUTPUT FORMAT
**Action Status:** Set to either 'stopped' or 'tool_using'. If 'stopped', provide the final response to the original question. If 'tool_using', proceed with using the specified tool.

**Action:** Use the tools by formatting the tool action in JSON. The format should be:

{
  "tool_name": "$TOOL_NAME",
  "tool_params": "$INPUT"
}
"""

role_prompt = "You are a helpful assistant!"
tools = ["KSigmaDetector", "MetricsQuery"]

AGENT_CONFIGS = {
    "codefuse_simpler": {
        "agent_type": "SingleAgent",
        "agent_name": "codefuse_simpler",
        "llm_config_name": "qwen_chat",
        "system_prompt": role_prompt,
    }
}
os.environ["AGENT_CONFIGS"] = json.dumps(AGENT_CONFIGS)
```

### Initialize Configuration

```python
from muagent import get_ekg_project_config_from_env
project_config = get_ekg_project_config_from_env()
```

### Initialize the Agent

```python
from muagent.agents import SingleAgent, BaseAgent

# Option one
agent = BaseAgent.init_from_project_config(
    "codefuse_simpler", project_config
)

# Option two
# base_agent = SingleAgent(
#     project_config=project_config,
#     tools=tools
# )
```

### Respond to User Requests

```python
query_content = "Please help me check if there are any anomalies on the server at 127.0.0.1 at 10 o'clock."
query = Message(
    role_name="human",
    role_type="user",
    input_text=query_content,
)
# base_agent.pre_print(query)
output_message = agent.step(query)
print("### input ###\n", output_message.input_text)
print("### content ###\n", output_message.content)
print("### step content ###\n", output_message.step_content)


# Uncomment to use the question below
# question = "Use Python to draw a heart"
# query = Message(
#     role_type="human",
#     role_name="user",
#     content=question,
# )
# output_message = agent.step(query)
```
