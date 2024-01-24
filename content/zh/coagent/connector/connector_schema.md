---
title: Connector 中文文档
slug: Connector 中文文档
url: "coagent/connector-中文文档"
aliases:
- "/coagent/connector-zh"
- "/coagent/connector-中文文档"
---

## Agent Params
|Config Key Name|	Type|	Description|
| ------------------ | ---------- | ---------- |
|role|	Role	|角色描述|
|prompt_config	|List[PromptField]	|Enum：PromptManager 也可以继承以上几种Agent然后去构造相关的Agent|
|prompt_manager_type	|String	|Enum：PromptManager 也可以继承以上几种Agent然后去构造自定义的Enum：PromptManager|
|focus_agents	|List[String]	|metagpt的逻辑，关注哪些agent生成的message，可选值范围为：role_name
|focus_message_keys	|List[String]|	额外增加的逻辑，关注message里面具体的 key 信息可选值范围为：agent 的 output_keys|
|chat_turn	|int	|只针对ReactAgent有效|
|llm_config	|LLMConfig	|大语言模型配置|
|embed_config	|EmbedConfig	|向量模型配置|
|sandbox_server	|Dict	|沙盒环境即notebook启动配置|
|jupyter_work_path	|str	|沙盒环境的工作目录|
|kb_root_path	|str	|memory的存储路径|
|log_verbose	|str	|agent prompt&predict的日志打印级别|

## Chain Params
|Config Key Name|	Type	|Description|
| ------------------ | ---------- | ---------- |
|agents| List[BaseAgent] | 
|llm_config	|LLMConfig	|大语言模型配置|
|embed_config	|EmbedConfig	|向量模型配置|
|sandbox_server	|Dict	|沙盒环境即notebook启动配置|
|jupyter_work_path	|str	|沙盒环境的工作目录|
|kb_root_path	|str	|memory的存储路径|
|log_verbose	|str	|agent prompt&predict的日志打印级别|


## Phase Params
|Config Key Name	|Type	|Description|
| ------------------ | ---------- | ---------- |
|phase_name|	String|	场景名称|
|phase_config|CompletePhaseConfig| 默认为None，可直接指定完整的phaseconfig， 暂未实现|
|llm_config	|LLMConfig	|大语言模型配置|
|embed_config	|EmbedConfig	|向量模型配置|
|sandbox_server	|Dict	|沙盒环境即notebook启动配置|
|jupyter_work_path	|str	|沙盒环境的工作目录|
|kb_root_path	|str	|memory的存储路径|
|log_verbose	|str	|agent prompt&predict的日志打印级别|
| base_phase_config | Union[dict, str] | 默认配置：PHASE_CONFIGS，可通过实现对这个变量新增来实现自定义配置 |
| base_chain_config | Union[dict, str] | 默认配置：CHAIN_CONFIGS，可通过实现对这个变量新增来实现自定义配置 |
| base_role_config  | Union[dict, str] | 默认配置：AGETN_CONFIGS，可通过实现对这个变量新增来实现自定义配置 |
