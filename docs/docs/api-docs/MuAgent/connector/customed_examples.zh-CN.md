---
group:
  title: Connector
  order: 0
title: 自定义示例
order: 4
toc: content
---

## 如何创建你个性化的 agent phase 场景

下面通过 代码库来实现代码转 API 文档的自动生成， 来详细演示如何自定义一个 agent phase 的构建

### 设计你的 prompt 结构

- codeGenDocGroup_PROMPT, 构建 group Agent Prompt

```
# update new agent configs
codeGenDocGroup_PROMPT = """#### Agent Profile

Your goal is to response according the Context Data's information with the role that will best facilitate a solution, taking into account all relevant context (Context) provided.

When you need to select the appropriate role for handling a user's query, carefully read the provided role names, role descriptions and tool list.

#### Input Format

#### Response Output Format

**Code Path:** Extract the paths for the class/method/function that need to be addressed from the context

**Role:** Select the role from agent names
"""
```

- classGenDoc_PROMPT, 构建 class code to api doc Prompt

````
classGenDoc_PROMPT = """#### Agent Profile
As an advanced code documentation generator, you are proficient in translating class definitions into comprehensive documentation with a focus on instantiation parameters.
Your specific task is to parse the given code snippet of a class, extract information regarding its instantiation parameters.

#### Input Format

**Current_Vertex:** Provide the code vertex of the function or method.

**Code Snippet:** Provide the full class definition, including the constructor and any parameters it may require for instantiation.

#### Response Output Format
**Class Base:** Specify the base class or interface from which the current class extends, if any.

**Class Description:** Offer a brief description of the class's purpose and functionality.

**Init Parameters:** List each parameter from construct. For each parameter, provide:
    - `param`: The parameter name
    - `param_description`: A concise explanation of the parameter's purpose.
    - `param_type`: The data type of the parameter, if explicitly defined.

    ```json
    [
        {
            "param": "parameter_name",
            "param_description": "A brief description of what this parameter is used for.",
            "param_type": "The data type of the parameter"
        },
        ...
    ]
    ```


    If no parameter for construct, return
    ```json
    []
    ```
"""
````

- funcGenDoc_PROMPT，构建 function code to api doc Prompt

````
funcGenDoc_PROMPT = """#### Agent Profile
You are a high-level code documentation assistant, skilled at extracting information from function/method code into detailed and well-structured documentation.


#### Input Format
**Code Path:** Provide the code path of the function or method you wish to document.
This name will be used to identify and extract the relevant details from the code snippet provided.

**Current_Vertex:** Provide the code vertex of the function or method.

**Code Snippet:** A segment of code that contains the function or method to be documented.

#### Response Output Format

**Class Description:** Offer a brief description of the method(function)'s purpose and functionality.

**Parameters:** Extract parameter for the specific function/method Code from Code Snippet. For parameter, provide:
    - `param`: The parameter name
    - `param_description`: A concise explanation of the parameter's purpose.
    - `param_type`: The data type of the parameter, if explicitly defined.
    ```json
    [
        {
            "param": "parameter_name",
            "param_description": "A brief description of what this parameter is used for.",
            "param_type": "The data type of the parameter"
        },
        ...
    ]
    ```

    If no parameter for function/method, return
    ```json
    []
    ```

**Return Value Description:** Describe what the function/method returns upon completion.

**Return Type:** Indicate the type of data the function/method returns (e.g., string, integer, object, void).
"""
````

### 导包以及基础参数配置

- 首先增加 openai 配置，也可以是其它类似于 openai 接口的模型（通过 fastchat 启动）

```
import os, sys, json
from muagent.base_configs.env_config import CB_ROOT_PATH
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig
from muagent.connector.phase import BasePhase
from muagent.connector.agents import BaseAgent, SelectorAgent
from muagent.connector.chains import BaseChain
from muagent.connector.schema import Message, Role, ChainConfig
from muagent.codechat.codebase_handler.codebase_handler import CodeBaseHandler

from loguru import logger
from muagent.tools import CodeRetrievalSingle


api_key = "sk-xxx"
api_base_url= "https://api.openai.com/v1"
model_name = "gpt-3.5-turbo"
embed_model = "{{embed_model_name}}"
embed_model_path = "{{embed_model_path}}"
#
os.environ["DUCKDUCKGO_PROXY"] = os.environ.get("DUCKDUCKGO_PROXY") or "socks5://127.0.0.1:13659"
```

### 定义新的 agent 类

用于自定义 key-value 信息

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

### 准备 LLM & Embedding

```
llm_config = LLMConfig(
    model_name="gpt-4", api_key=api_key,  api_base_url=api_base_url, temperature=0.3
)
embed_config = EmbedConfig(
    embed_engine="model", embed_model=embed_model, embed_model_path=embed_model_path
)
```

### 代码库加载

```

# initialize codebase
# delete codebase
codebase_name = 'client_nebula'
code_path = "D://chromeDownloads/devopschat-bot/client_v2/client"
use_nh = True
do_interpret = False
cbh = CodeBaseHandler(codebase_name, code_path, crawl_type='dir', use_nh=use_nh, local_graph_path=CB_ROOT_PATH,
                      llm_config=llm_config, embed_config=embed_config)
cbh.delete_codebase(codebase_name=codebase_name)

# load codebase
cbh = CodeBaseHandler(codebase_name, code_path, crawl_type='dir', use_nh=use_nh, local_graph_path=CB_ROOT_PATH,
                      llm_config=llm_config, embed_config=embed_config)
cbh.import_code(do_interpret=do_interpret)

```

### 接下来就构建 phase 实例，开始执行

```

# log-level，print prompt和llm predict
os.environ["log_verbose"] = "1"

funcGenDoc_role = Role(role_type="assistant", role_name="funcGenDoc_role", prompt=funcGenDoc_PROMPT)
funcGenDoc = CodeGenDocer(
    role=funcGenDoc_role,
    chat_turn=1,
    llm_config=llm_config, embed_config=embed_config,
)


classGenDoc_role = Role(role_type="assistant", role_name="classGenDoc_role", prompt=classGenDoc_PROMPT)
classGenDoc = CodeGenDocer(
    role=classGenDoc_role,
    chat_turn=1,
    llm_config=llm_config, embed_config=embed_config,
)

codeGenDocGroup_role = Role(role_type="assistant", role_name="codeGenDocGroup_role", prompt=codeGenDocGroup_PROMPT)
codeGenDocGroup = SelectorAgent(
    role=codeGenDocGroup_role,
    chat_turn=1,
    llm_config=llm_config, embed_config=embed_config,
    group_agents=[funcGenDoc, classGenDoc]
)

chain_config = ChainConfig(
    chain_name="codeGenDocGroup_chain", agents=[codeGenDocGroup.role.role_name,],
    chat_turn=1)

chain = BaseChain(
    chainConfig=chain_config, agents=[codeGenDocGroup],
    llm_config=llm_config, embed_config=embed_config,
)

phase = BasePhase(
    phase_name="codeGenDocGroup_phase", chains=[chain],
    embed_config=embed_config, llm_config=llm_config
)
```

### 开始代码转 api 文档

```
# 根据前面的load过程进行初始化
cbh = CodeBaseHandler(codebase_name, code_path, crawl_type='dir', use_nh=use_nh, local_graph_path=CB_ROOT_PATH,
                      llm_config=llm_config, embed_config=embed_config)

cbh.search_vertices(vertex_type="method")

# 开始代码转换API文档结构
for vertex_type in ["class", "method"]:
    vertexes = cbh.search_vertices(vertex_type=vertex_type)
    logger.info(f"vertexes={vertexes}")

    # round-1
    docs = []
    for vertex in vertexes:
        vertex = vertex.split("-")[0] # -为method的参数
        query_content = f"为{vertex_type}节点 {vertex}生成文档"
        query = Message(
            role_name="human", role_type="user", input_query=query_content,
            code_engine_name=codebase_name, score_threshold=1.0, top_k=3, cb_search_type="tag", use_nh=use_nh,
            local_graph_path=CB_ROOT_PATH,
            )
        output_message, output_memory = phase.step(query, reinit_memory=True)
        # print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
        docs.append(output_memory.get_spec_parserd_output())

        os.makedirs(f"{CB_ROOT_PATH}/docs", exist_ok=True)
        with open(f"{CB_ROOT_PATH}/docs/raw_{vertex_type}.json", "w") as f:
            json.dump(docs, f)


# 下面把生成的文档信息转换成markdown文本
from muagent.utils.code2doc_util import *

import json
with open(f"/home/user/code_base/docs/raw_method.json", "r") as f:
    method_raw_data = json.load(f)

with open(f"/home/user/code_base/docs/raw_class.json", "r") as f:
    class_raw_data = json.load(f)


method_data = method_info_decode(method_raw_data)
class_data = class_info_decode(class_raw_data)
method_mds = encode2md(method_data, method_text_md)
class_mds = encode2md(class_data, class_text_md)

docs_dict = {}
for k,v in class_mds.items():
    method_textmds = method_mds.get(k, [])
    for vv in v:
        # 理论上只有一个
        text_md = vv

    for method_textmd in method_textmds:
        text_md += "\n<br>" + method_textmd

    docs_dict.setdefault(k, []).append(text_md)

    with open(f"/home/user/code_base/docs/{k}.md", "w") as f:
        f.write(text_md)
```
