---
group:
  title: 意图识别
  order: 0
title: 意图识别
order: 0
toc: content
---

以下是对于 `IntentionRouter` 类的中文使用文档，包含代码内容说明、功能介绍，以及 SDK 接口文档。

# IntentionRouter 类使用

## 代码内容说明

`IntentionRouter` 类负责完成 `muAgent` 中所有与意图定位有关的任务，也可用于批量导入意图节点。

### 功能介绍

`IntentionRouter` 类可完成以下意图定位的任务：

- **执行 or 询问**：提供 `get_intention_whether_execute` 方法，用于判断用户的意图是否为执行任务流，两者的区别如下：
  - **执行**：执行任务流（如“我明天要去 xx 医院看病，给我约个号”）；
  - **询问**：根据任务流回答用户的问题（如“去 xx 医院看病要怎么约号呢？”）
- **询问类意图细分**：提供`get_intention_consult_which`方法，对用户的询问意图做进一步细分，以便从任务流中提取出关键信息，具体如下：
  - **整体流程**：询问任务流的整体流程是什么（如“去 xx 医院看病要怎么约号呢？”）
  - **下一步计划**：询问任务流的某一步（或几步）是如何完成的（如“我已经进入 xx 医院的小程序界面了，下一步该干嘛？”）
  - **闲聊**：询问内容与任务流中的内容无关（如“今天天气怎么样”）
- **意图树检索**：提供`get_intention_by_node_info`方法，根据用户输入从意图树中检索出目标意图节点，包含规则匹配、LLM。

`IntentionRouter` 类还提供了`intention_df2graph`方法，用于批量导入意图节点至图谱中。

**基本属性**:

- `agent`: `Optional[BaseAgent]` 类型，基于 LLM 的 Agent，负责完成意图定位的相关任务；
- `embed_config`: `Optional[EmbedConfig]` 类型，用于获取用户输入的语义向量；
- `gb_handler`: `Optional[GBHandler]` 类型，用于从图数据库中搜索节点；
- `tb_handler`: `Optional[TBHandler]` 类型，用于从 redis 中检索节点；
- `_max_num_tb_retrieval`: `int` 类型，允许从 redis 单次检索出的节点数量的最大值；

**实例方法**:

- `get_intention_whether_execute`: 根据用户输入判断是否需要执行任务流；
- `get_intention_consult_which`: 对用户的询问意图做进一步细分；
- `get_intention_by_node_info`: 根据用户输入从意图树中检索出目标意图叶节点。
- `get_intention_by_node_info_match`: 在意图树检索功能中，用于完成规则匹配；
- `get_intention_by_node_info_nlp`: 在意图树检索功能中，用于完成语义匹配；
- `intention_df2graph`: 用于批量导入意图节点至图谱中。

## SDK 接口

以下是 `IntentionRouter` 类提供的主要方法及其接口文档：

### `__init__(...)`

- **描述**: 初始化 `IntentionRouter` 实例，配置各项参数及服务。
- **参数**:
  - `agent`: `Optional[BaseAgent]` 类型，基于 LLM 的 Agent.
  - `gb_handler`: `Optional[GBHandler]` 类型。
  - `tb_handler`: `Optional[TBHandler]` 类型。
  - `embed_config`: 可选的嵌入模型配置对象 (ModelConfig 或 EmbedConfig)。

### `get_intention_whether_execute(self, query: str, agent: Optional[BaseAgent]=None) -> bool`

- **描述**: 根据`query`判断用户的意图是否为执行任务流。
- **参数**:
  - `query`: `str`类型，用户输入。
  - `agent`: `Optional[BaseAgent]` 类型，基于 LLM 的 Agent。若 `agent=None`，使用 `self.agent` 来进行判断。

### `get_intention_consult_which(self, query: Union[list, tuple, str], agent: Optional[BaseAgent]=None, root_node_id: Optional[str]=None) -> str`

- **描述**: 根据`query`和根节点`root_node_id`来对用户的询问意图做进一步细分，包括：整体流程、下一步计划、闲聊。具体步骤如下：

  1. 直接根据`query`细分意图，得到判定结果 I1；
  2. 若`root_node_id`为空，返回 I1；否则，进入步骤 3；
  3. 若 I1 不是闲聊，返回 I1；否则，使用`get_intention_by_node_info_nlp`做意图树检索，获取检索结果；
  4. 若检索成功，将 I1 修改为“整体流程”，否则不变。返回 I1。

- **参数**:
  - `query`: `str`类型，用户输入。
  - `agent`: `Optional[BaseAgent]` 类型，基于 LLM 的 Agent。若 `agent=None`，使用 `self.agent` 来替代。
  - `root_node_id`: `Optional[str]` 类型，意图树根节点 id。

### `get_intention_by_node_info_match(self, root_node_id: str, gb_handler: Optional[GBHandler] = None, rule: Union[Optional[str], list[Optional[str]]] = None, **kwargs) -> dict[str, Any]`

- **描述**: 意图树检索规则匹配，根据给定的规则来实现意图树检索。该种方式下，从根节点开始，每往下一层，都需要一个不同的输入和一个匹配规则。

- **参数**:

  - `root_node_id`: `str` 类型，意图树根节点 id。
  - `gb_handler`: `Optional[GBHandler]` 类型,用于从图数据库中搜索节点。若 `gb_handler=None`，使用 `self.gb_handler` 来替代。
  - `rule`: `Union[Optional[str], list[Optional[str]]]`类型，意图树每一层的匹配规则。若 `rule` 为空，使用编辑距离（`rule="edit_distance"`）替代之；若 `rule` 为字符串，所有匹配都使用同一匹配规则。
  - `kwargs`: 规则匹配所需的输入。

- **匹配规则**:
  - 默认规则：`edit_distance`，即输入与目标节点`description`的编辑距离，距离最短的节点即为检索结果。
  - 自定义规则：用户可编写`Python`代码来构建自定义规则，编写的方式如下：
  ```python
  def custom_rule(node: GNode, **kwargs) -> Union[int, float]:
      # your code to compute the similarity between the input kwargs and the node.
  ```

### `get_intention_by_node_info_nlp(self, root_node_id: str, query: str, start_from_root: bool = False, gb_handler: Optional[GBHandler] = None, tb_handler: Optional[TbaseHandler] = None, agent=None) -> dict[str, Any]`

- **描述**: 意图树检索语义匹配，根据 `query` 的语义来检索目标意图节点。根据 `start_from_root` 为 True or False，语义检索可划分为两种方式：

  - 逐层检索：从根节点开始，逐层做语义匹配，直至到达意图叶节点或无法匹配。
  - 向量检索：首先从 redis 中检索出意图树下的候选节点，过滤掉不符合条件的节点，再逐层检索，整体流程如下图所示：

![向量检索整体流程](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*3BN8QJfsm24AAAAAAAAAAAAADlHYAQ/original)

- **参数**:
  - `root_node_id`: `str` 类型，意图树根节点 id。
  - `query`: `str` 类型，用户输入。
  - `start_from_root`: `bool` 类型，默认为 `False`。若 `start_from_root=True`，走逐层检索；否则，走向量检索。
  - `gb_handler`: `Optional[GBHandler]` 类型,用于从图数据库中搜索节点。若 `gb_handler=None`，使用 `self.gb_handler` 来替代。
  - `tb_handler`: `Optional[TBHandler]` 类型，用于从 redis 中检索节点。若 `gb_handler=None`，使用 `self.tb_handler` 来替代。
  - `agent`: `Optional[BaseAgent]` 类型，基于 LLM 的 Agent。若 `agent=None`，使用 `self.agent` 来替代。

### `get_intention_by_node_info(self, query: Union[str, list, tuple], root_node_id: str, rule: Union[str, list[str]], start_from_root=True) -> dict[str, Any]`

- **描述**: 意图树检索，规则匹配和语义匹配的统一接口。若 `rule="nlp"`，使用语义匹配，否则使用规则匹配。

- **参数**:
  - `query`: `Union[str, list, tuple]` 类型，用户输入。
  - `root_node_id`: `str` 类型，意图树根节点 id。
  - `rule`: `Union[str, list[str]]`类型，匹配规则。若 `rule="nlp"`，使用语义匹配，否则使用规则匹配。
  - `start_from_root`: `bool` 类型，仅在语义匹配时有效。

### `intention_df2graph(self, data_df: pandas.DataFrame, teamid: str, root_node_id: Optional[str] = None , gb_handler: Optional[GBHandler] = None, tb_handler: Optional[TbaseHandler] = None, embed_config=None, cat_root_node_id=True, delete_edge=False) -> tuple[bool, str]`

- **描述**: 批量导入意图节点以构建意图树，也可用于覆盖原意图树，以修改节点属性、增加或删除节点。

- **参数**:

  - `data_df`: `pandas.DataFrame` 类型，需要导入的意图节点和边。
  - `teamid`: `str` 类型，团队 ID。
  - `root_node_id`: `Optional[str]` 类型，需要挂靠的根节点 id。`root_node_id` 为空则表示不需要挂靠在别的节点上。
  - `gb_handler`: `Optional[GBHandler]` 类型,用于从图数据库中搜索节点。若 `gb_handler=None`，使用 `self.gb_handler` 来替代。
  - `tb_handler`: `Optional[TBHandler]` 类型，用于从 redis 中检索节点。若 `gb_handler=None`，使用 `self.tb_handler` 来替代。
  - `embed_config`: 可选的嵌入模型配置对象 (ModelConfig 或 EmbedConfig)。
  - `cat_root_node_id`: `bool` 类型，当且仅当 `root_node_id` 不为空时有效。若为 True，将所有需要导入的节点 id 与根节点 id 拼接，以保证 id 的唯一性。
  - `delete_edge`: `bool` 类型，方法用于覆盖原意图树时有效。若`delete_edge=True`，覆盖前删除掉原意图树下的所有边。

- `data_df` 的格式如下：

|    列名     |         类型          |                  含义                  |
| :---------: | :-------------------: | :------------------------------------: |
|     id      |         `str`         |                节点 id                 |
| description |         `str`         | 意图节点的描述（明确说明该意图的含义） |
|    name     |         `str`         |               节点 name                |
|  child_ids  | `Optional[list[str]]` |    子节点 id，若为空，表示为叶节点     |

## `IntentionRouter` 使用

```python
intention_router = IntentionRouter(...)
query = '如何使用花呗申请贷款'

# 执行 or 询问
whether_execute = intention_router.get_intention_whether_execute(query)
# whether_execute = False

# 询问意图细分
consult_which = intention_router.get_intention_consult_which(query)
# consult_which = 'allPlan'

# 意图树检索——语义匹配
start_node_id = 'ekg_team_default'
ret = intention_router.get_intention_by_node_info(
    query=query,
    root_node_id=start_node_id,
    rule='nlp',
    start_from_root=False
)
# ret = {'node_id': xx, 'is_leaf': True, 'error_msg': '', 'status': 'success', 'nodes_to_choose': None, 'answer': None}

# 意图树检索-规则匹配
rule = """
def custom_rule(cls, node: GNode, pattern=None, **kwargs):
    if len(kwargs) == 0:
        return -float('inf')

    s = list(kwargs.values())[0]
    desc: str = node.attributes.get('description', '')

    if pattern is None:
        return -ed.edit_distance(desc, s)[0]

    desc_list = re.findall(pattern, desc)
    if not desc_list:
        return -float('inf')

    return max([-ed.edit_distance(x, s)[0] for x in desc_list])
"""

ret = intention_router.get_intention_by_node_info(
    root_node_id=start_node_id,
    rule=rule,
    query=['个人的事务', '金融相关', query]
)
# ret = {'node_id': xx, 'is_leaf': True, 'error_msg': '', 'status': 'success'}
```