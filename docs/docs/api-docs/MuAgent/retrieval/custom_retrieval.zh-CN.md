---
group:
  title: Retrieval
  order: 3
title: 自定义 Retrieval 接入
order: -1
toc: content
---

## 基本介绍

`Doc Retrieval` 文档向量数据库是当前最主流的知识库构建方法，使用 Text Embedding 模型对文档进行向量化并在向量数据库中存储。未来我们也会去支持基于知识图谱查询以及通过大模型自动抽取实体和关系的方式，来挖掘数据中多种复杂关系。

`Code Retrieval` LLM 在代码生成、修复以及组件理解的任务上，会面临代码训练数据滞后、无法感知代码上下文依赖结构。以及在开发的过程中，对现有代码库和依赖包的理解、检索相关代码、查询元信息等会占用较长的时间。于是我们希望通过代码结构分析和代码检索生成来，以及为 LLM 提供知识体系外的代码。

`Search Retrieval` 除了现成的文档和代码知识库以及之外，在日常中实践中会去浏览大量网页内容获取更多的知识，帮助我们理解新兴的场景、业务、技术等，于是我们接入了 duckduckgosearch 这款开源的搜索工具，能够为 LLM 提供知识储备以外的内容。

## Rertrieval 结构

- 基本的 retrieval 结构定义

```
from muagent.base_configs.env_config import KB_ROOT_PATH
# from muagent.retrieval.base_retrieval import IMRertrieval

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

## 使用示例

- 准备配置和导包

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

- 自定义检索器

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

- llm 和 embedding 配置

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

- 本地加载知识库

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

- 知识库问答

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
query_content = "langchain有哪些模块"
query = Message(
    role_name="human", role_type="user", input_query=query_content,
)
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))

# round-2
query_content = "提示（prompts）有什么用？"
query = Message(
    role_name="human", role_type="user", input_query=query_content,
)
output_message, output_memory = phase.step(query)
print(output_memory.to_str_messages(return_all=True, content_key="parsed_output_list"))
```
