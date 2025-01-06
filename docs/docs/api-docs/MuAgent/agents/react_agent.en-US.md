---
group:
  title: Agent
  order: 5
title: ReactAgent
order: 1
toc: content
---

`ReactAgent` provides functionalities for basic question-answering, tool usage, and code execution, enabling a multi-step iterative execution process:

Input => LLM Response => Stop Output? => Output
=> LLM Response => Stop Output? => ...

<div align=center>
  <img src="../../../../static/api-docs/muAgent/reactagent.webp" alt="Image" style="width: 800px; height:auto;" >
</div>

## Usage of ReactAgent

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
role_prompt = "You are a helpful assistant!"
tools = ["KSigmaDetector", "MetricsQuery"]
AGENT_CONFIGS = {
    "reacter": {
        "system_prompt": role_prompt,
        "agent_type": "ReactAgent",
        "agent_name": "reacter",
        "tools": tools,
        "llm_config_name": "qwen_chat"
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
    "reacter", project_config
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
print("### input ###\n", output_message.input_text)
print("### content ###\n", output_message.content)
print("### step content ###\n", output_message.step_content)
```
