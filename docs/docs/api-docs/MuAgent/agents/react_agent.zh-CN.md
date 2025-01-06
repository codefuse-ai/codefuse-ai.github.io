---
group:
  title: 智能体
  order: 5
title: React·智能体
order: 1
toc: content
---

`ReactAgent`提供基础问答、工具使用、代码执行的功能，实现多步循环执行的过程

输入 => LLM 响应 => 是否停止输出 => 输出
=> LLM 响应 => 是否停止输出 => ...

<div align=center>
  <img src="../../../../static/api-docs/muAgent/reactagent.webp" alt="图片" style="width: 800px;  height:auto;" >
</div>

## ReactAgent 使用

### 填写模型配置

```python
from muagent.schemas import ModelConfig
import json, os

MODEL_CONFIGS = {
    "qwen_chat": {
        "model_type": "qwen_chat",
        "model_name": "qwen2.5-72b-instruct" ,
        "api_key": "sk-xxx",
    },
}
os.environ["MODEL_CONFIGS"] = json.dumps(MODEL_CONFIGS)
```

### 填写智能体配置

```python
role_prompt = "you are a helpful assistant!"
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

### 初始化配置

```python
from muagent import get_ekg_project_config_from_env
project_config = get_ekg_project_config_from_env()
```

### 初始化 agent

```python
from muagent.agents import BaseAgent
agent = BaseAgent.init_from_project_config(
    "reacter", project_config
)
```

### 响应用户请求

```python
query_content = "帮我确认下127.0.0.1这个服务器的在10点是否存在异常，请帮我判断一下"
query = Message(
    role_name="human",
    role_type="user",
    content=query_content,
)
# agent.pre_print(query)
output_message = agent.step(query)
print("### intput ###\n", output_message.input_text)
print("### content ###\n", output_message.content)
print("### step content ###\n", output_message.step_content)
```
