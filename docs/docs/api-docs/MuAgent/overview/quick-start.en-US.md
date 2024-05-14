---
group:
  title: ❤️ Codefuse-muAgent
  order: -1
title: QuickStart
order: 1
toc: content
---

## Quick Start

For a complete example, see [examples/muagent_examples](htpps://)

### First, prepare the relevant configuration information

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

### Then, set up LLM configuration and Embedding model configuration

```
from muagent.base_configs.env_config import JUPYTER_WORK_PATH
from muagent.tools import toLangchainTools, TOOL_DICT, TOOL_SETS
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig
from muagent.connector.phase import BasePhase
from muagent.connector.schema import Message


llm_config = LLMConfig(
    model_name=model_name, api_key=api_key,  api_base_url=api_base_url, temperature=0.3,
    stop="**Observation:**"
)
embed_config = EmbedConfig(
    embed_engine="model", embed_model=embed_model, embed_model_path=embed_model_path
)
```

### Finally, choose an existing scenario to execute

```
# if you want to analyze a data.csv, please put the csv file into a jupyter_work_path (or your defined path)
import shutil
source_file = 'D://project/gitlab/llm/external/ant_code/Codefuse-chatbot/jupyter_work/employee_data.csv'
shutil.copy(source_file, JUPYTER_WORK_PATH)

# Choose a scenario
phase_name = "baseGroupPhase"
phase = BasePhase(
    phase_name, embed_config=embed_config, llm_config=llm_config
)

# round-1 needs to be completed by code interpreter
query_content = "Confirm whether employee_data.csv exists locally and view its columns and data types; then draw a bar chart"
query = Message(
    role_name="human", role_type="user", tools=[], input_query=query_content,
)
# phase.pre_print(query)  # This function is used to pre-print the Prompt of the Agents' execution chain
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))


# round-2 requires the execution of a tool
tools = toLangchainTools([TOOL_DICT[i] for i in TOOL_SETS if i in TOOL_DICT])
query_content = "Please help me check if the server at 127.0.0.1 had any issues at 10 o'clock, help me to determine"
query = Message(
    role_name="human", role_type="user", tools=tools, input_query=query_content,
)
# phase.pre_print(query)  # This function is used to pre-print the Prompt of the Agents' execution chain
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```

## Phase Customization

Refer to [How to Customize Phase](../connector/connector_agent.en-US.md)

## Introduction and Usage of Scenes

Below are some specific scene introductions and usages.
We also welcome everyone to brainstorm and construct some interesting cases.

### baseTaskPhase

Scenarios involving task segmentation and multi-step execution of xAgents

```
# if you want to analyze a data.csv, please put the csv file into a jupyter_work_path (or your defined path)
import shutil
source_file = 'D://project/gitlab/llm/external/ant_code/Codefuse-chatbot/jupyter_work/employee_data.csv'
shutil.copy(source_file, JUPYTER_WORK_PATH)

# log-level，print prompt和llm predict
os.environ["log_verbose"] = "2"

phase_name = "baseTaskPhase"
phase = BasePhase(
phase_name, embed_config=embed_config, llm_config=llm_config,
)


# round-1
query_content = "Check if employee_data.csv exists locally and see what columns and data types it has; then draw a bar chart"
query = Message(
    role_name="human", role_type="user", input_query=query_content,
    )
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```

### codeReactPhase

The code interpreter scenario based on React

```
# if you want to analyze a data.csv, please put the csv file into a jupyter_work_path (or your defined path)
import shutil
source_file = 'D://project/gitlab/llm/external/ant_code/Codefuse-chatbot/jupyter_work/book_data.csv'
shutil.copy(source_file, JUPYTER_WORK_PATH)

# then, create a data analyze phase
phase_name = "codeReactPhase"
phase = BasePhase(
    phase_name, embed_config=embed_config, llm_config=llm_config,
    jupyter_work_path=JUPYTER_WORK_PATH,
)

# round-1
query_content = "Check if 'employee_data.csv' exists locally, view its columns and data types; then draw a bar chart"
query = Message(
    role_name="human", role_type="user",
    role_content=query_content, input_query=query_content, origin_query=query_content,
    )

output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```

### codeToolReactPhase

The tool invocation and code interpreter scenario based on the React template

```
TOOL_SETS = [
     "StockName", "StockInfo",
    ]
tools = toLangchainTools([TOOL_DICT[i] for i in TOOL_SETS if i in TOOL_DICT])

# log-level，print prompt和llm predict
os.environ["log_verbose"] = "2"

phase_name = "codeToolReactPhase"

phase = BasePhase(
    phase_name, embed_config=embed_config, llm_config=llm_config,
)

query_content =  "Query the stock code of Kweichow Moutai and acquire the time series data of the last 10 days up to the current date (December 24th, 2023); then use code to draw a line chart and analyze it"

query = Message(role_name="human", role_type="user", input_query=query_content, tools=tools)
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```

### docChatPhase

Knowledge Base Retrieval and Question-Answering Pipeline

- example 1

```
# create your knowledge base
from muagent.service.kb_api import create_kb, upload_files2kb
from muagent.utils.server_utils import run_async
from muagent.orm import create_tables


# use to test, don't create some directory
create_tables()

# create a knowledge base
kb_name = "example_test"
run_async(create_kb(knowledge_base_name=kb_name, vector_store_type="faiss", embed_config=embed_config, kb_root_path=KB_ROOT_PATH))

# add doc to knowledge base
file = os.path.join("D://project/gitlab/llm/external/ant_code/Codefuse-chatbot/sources/docs/langchain_text_10.jsonl")
files = [file]
upload_files2kb(files, kb_name, embed_config, kb_root_path=KB_ROOT_PATH)


## start to chat with knowledge base
# log-level, print prompt, and llm predict
os.environ["log_verbose"] = "0"

## example 1
# set chat phase
phase_name = "docChatPhase"
phase = BasePhase(
    phase_name, embed_config=embed_config, llm_config=llm_config, kb_root_path=KB_ROOT_PATH,
)

# round-1
query_content = "What modules does langchain have?"
query = Message(
    role_name="human", role_type="user", input_query=query_content,
    doc_engine_name=kb_name, score_threshold=1.0, top_k=3
    )

output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))

# round-2
query_content = "What is the use of prompts?"
query = Message(
    role_name="human", role_type="user", input_query=query_content,
    doc_engine_name=kb_name, score_threshold=1.0, top_k=3
    )

output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```

- example 2

```
## Customized register demo
from muagent.tools import DocRetrieval
class BaseDocRetrieval(IMRertrieval):

    def __init__(self, knowledge_base_name: str, search_top=5, score_threshold=1.0, embed_config: EmbedConfig=EmbedConfig(), kb_root_path: str=KB_ROOT_PATH):
        self.knowledge_base_name = knowledge_base_name
        self.search_top = search_top
        self.score_threshold = score_threshold
        self.embed_config = embed_config
        self.kb_root_path = kb_root_path

    def run(self, query: str, search_top=None, score_threshold=None, ):
        docs = DocRetrieval.run(
            query=query, knowledge_base_name=self.knowledge_base_name,
            search_top=search_top or self.search_top,
            score_threshold=score_threshold or self.score_threshold,
            embed_config=self.embed_config,
            kb_root_path=self.kb_root_path
        )
        return docs


doc_retrieval = BaseDocRetrieval(knowledge_base_name=kb_name, score_threshold=1.0, search_top=3, embed_config=embed_config)

# set chat phase
phase_name = "docChatPhase"
phase = BasePhase(
    phase_name, embed_config=embed_config, llm_config=llm_config, kb_root_path=KB_ROOT_PATH,
    doc_retrieval=doc_retrieval
)

# round-1
query_content = "What modules does langchain have?"
query = Message(
    role_name="human", role_type="user", input_query=query_content,
)
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))


# round-2
query_content = "What is the use of prompts?"
query = Message(
    role_name="human", role_type="user", input_query=query_content,
)
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```

### metagpt_code_devlop

The code construction Phase in metagpt

```
# log level, print prompt, and llm predict
os.environ["log_verbose"] = "2"
phase_name = "metagpt_code_development"

phase = BasePhase(
    phase_name, embed_config=embed_config, llm_config=llm_config
)

query_content = "create a snake game"
query = Message(role_name="human", role_type="user", input_query=query_content)
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```

### searchChatPhase

Fixed scenario chain, search first then directly answer based on LLM

```
# log-level，print prompt和llm predict
os.environ["log_verbose"] = "2"

# This can be configured when the duckduckgo connection is not available
os.environ["DUCKDUCKGO_PROXY"] = os.environ.get("DUCKDUCKGO_PROXY") or "socks5h://127.0.0.1:13659"
phase_name = "searchChatPhase"
phase = BasePhase(
    phase_name, embed_config=embed_config, llm_config=llm_config
)


# round-1
query_content1 = "Who is the current President of the United States?"
query = Message(
    role_name="human", role_type="user", input_query=query_content1,
    search_engine_name="duckduckgo", score_threshold=1.0, top_k=3
)
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))

# round-2
query_content2 = "Who was the previous president of the United States, and do these two people have any relationship?"
query = Message(
    role_name="human", role_type="user", input_query=query_content2,
    search_engine_name="duckduckgo", score_threshold=1.0, top_k=3
)
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```

### toolReactPhase

The tool invocation scene based on the React template

```
# log-level，print prompt和llm predict
os.environ["log_verbose"] = "2"
phase_name = "toolReactPhase"

phase = BasePhase(
    phase_name, embed_config=embed_config, llm_config=llm_config
)

# round-1
tools = toLangchainTools([TOOL_DICT[i] for i in TOOL_SETS if i in TOOL_DICT])
query_content = "Please help me check if there were any issues with the server at 127.0.0.1 at 10 o'clock, I need your assistance in determining this."
query = Message(
    role_name="human", role_type="user", tools=tools, input_query=query_content,
)

# phase.pre_print(query)
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```
