---
group:
  title: Retrieval
  order: 3
title: Custom retrieval
order: -1
toc: content
---

## Basic Introduction

`Doc Retrieval` is the document vector database, which is the most mainstream method for knowledge base construction nowadays. It uses Text Embedding models to vectorize documents and stores them in a vector database. In the future, we will also support querying based on knowledge graph and automatically extracting entities and relationships through large models to explore various complex relationships in data.

`Code Retrieval` LLM faces challenges in tasks such as code generation, repair, and component understanding, including lagging code training data and the inability to perceive the dependency structure of code context. During development, understanding existing codebases and dependencies, retrieving related code, querying metadata, etc., can take a significant amount of time. Therefore, we hope to support LLM with code outside of its knowledge system through code structure analysis and code retrieval.

`Search Retrieval` In addition to existing document and code knowledge bases, in daily practice, we browse a large amount of web content to acquire more knowledge, helping us understand emerging scenarios, businesses, technologies, etc., hence we integrated duckduckgo search, an open-source search tool, to provide LLM with content beyond its knowledge reserve.

## Retrieval Structure

```
class IMRertrieval:
    def __init__(self,):
        '''
        init your personal attributes
        '''
        pass

    def run(self, ):
        '''
        execute interface, and can use init' attributes
        '''
        pass


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
```

## Usage Example

- import dependcy and set config

```
# retrieval your customized register demo
from muagent.tools import DocRetrieval
from muagent.base_configs.env_config import JUPYTER_WORK_PATH
from muagent.connector.agents import BaseAgent, ReactAgent, ExecutorAgent, SelectorAgent
from muagent.connector.chains import BaseChain
from muagent.connector.phase import BasePhase
from muagent.connector.schema import Role, Message, ChainConfig
from muagent.llm_models.llm_config import EmbedConfig, LLMConfig
from muagent.base_configs.env_config import KB_ROOT_PATH
from muagent.retrieval.base_retrieval import IMRertrieval


# set your config
api_key = ""
api_base_url= ""
model_name = ""
embed_model = ""
embed_model_path = ""
```

- Customed retrieval

```
# retrieval your customized register demo
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
```

- llm&embedding Config

```
#
llm_config = LLMConfig(
    model_name=model_name, api_key=api_key,  api_base_url=api_base_url, temperature=0.3,
    stop="**Observation:**"
)

embed_config = EmbedConfig(
    embed_engine="model", embed_model=embed_model, embed_model_path=embed_model_path
)

```

- Load Document into local

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
```

- Doc RAG QA

```
doc_retrieval = BaseDocRetrieval(knowledge_base_name=kb_name, score_threshold=1.0, search_top=3, embed_config=embed_config)


llm_config = LLMConfig(
    model_name=model_name, api_key=api_key,  api_base_url=api_base_url, temperature=0.3,
    stop="**Observation:**"
)

embed_config = EmbedConfig(
    embed_engine="model", embed_model=embed_model, embed_model_path=embed_model_path
)


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
