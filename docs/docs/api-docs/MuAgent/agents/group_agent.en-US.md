---
group:
  title: Agent
  order: 5
title: SingleAgent
order: 3
toc: content
---

`GroupAgent` provides functionalities for basic question-answering, tool usage, and code execution, facilitating a group scheduling execution process: input => agent => output.

<div align=center>
  <img src="../../../../static/api-docs/muAgent/selectoragent.webp" alt="Image" style="width: 800px; height:auto;" >
</div>

## Usage of GroupAgent

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

### Configure the Agents

```python
tools = ["KSigmaDetector", "MetricsQuery"]
role_prompt = "You are a helpful assistant!"

AGENT_CONFIGS = {
    "grouper": {
        "agent_type": "GroupAgent",
        "agent_name": "grouper",
        "agents": ["codefuse_reacter_1", "codefuse_reacter_2"]
    },
    "codefuse_reacter_1": {
        "agent_type": "ReactAgent",
        "agent_name": "codefuse_reacter_1",
        "tools": tools,
    },
    "codefuse_reacter_2": {
        "agent_type": "ReactAgent",
        "agent_name": "codefuse_reacter_2",
        "tools": tools,
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
from muagent.agents import BaseAgent
agent = BaseAgent.init_from_project_config(
    "grouper", project_config
)
```

### Respond to User Requests

```python
query_content = "Please help me check if there are any anomalies on the server at 127.0.0.1 at 10 o'clock."
query = Message(
    role_name="human",
    role_type="user",
    content=query_content,
)
# agent.pre_print(query)
output_message = agent.step(query)
print("input:", output_message.input_text)
print("content:", output_message.content)
print("step_content:", output_message.step_content)
```
