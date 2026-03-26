---
group:
  title: Intention Router
  order: 0
title: Intention Router
order: 0
toc: content
---

The following is the English documentation for the `IntentionRouter` class, which includes explanations of code content, functional introduction, and SDK interface documentation.

# Usage of IntentionRouter Class

## Code Content Explanation

The `IntentionRouter` class is responsible for all intent localization tasks within `muAgent` and can be used to bulk import intent nodes.

### Functional Introduction

The `IntentionRouter` class can accomplish the following tasks related to intent localization:

- **Execution or Inquiry**: Provides the method `get_intention_whether_execute` to determine whether the user's intent is to execute a task flow. The distinction is as follows:
  - **Execution**: Carrying out a task flow (e.g., "I want to see a doctor at xx hospital tomorrow; please make an appointment for me").
  - **Inquiry**: Answering questions based on the task flow (e.g., "How do I make an appointment for a visit to xx hospital?").
- **Inquiry Intent Subdivision**: Provides the method `get_intention_consult_which` to further classify user inquiry intents, enabling the extraction of key information from the task flow:
  - **Overall Process**: Asking about the overall process of the task flow (e.g., "How do I make an appointment for a visit to xx hospital?").
  - **Next Steps**: Asking about specific steps in the task flow (e.g., "I have entered the mini-program interface of xx hospital; what should I do next?").
  - **Chitchat**: Questions unrelated to the content of the task flow (e.g., "How is the weather today?").
- **Intent Tree Retrieval**: Provides the `get_intention_by_node_info` method to retrieve target intent nodes from the intent tree based on user input, including rule matching and LLM.

The `IntentionRouter` class also offers the `intention_df2graph` method for bulk importing intent nodes into the graph.

**Basic Properties**:

- `agent`: `Optional[BaseAgent]` type, an LLM-based Agent responsible for intent localization tasks.
- `embed_config`: `Optional[EmbedConfig]` type, used to obtain the semantic vector of user input.
- `gb_handler`: `Optional[GBHandler]` type, used for searching nodes from the graph database.
- `tb_handler`: `Optional[TBHandler]` type, used for retrieving nodes from Redis.
- `_max_num_tb_retrieval`: `int` type, the maximum number of nodes allowed for retrieval from Redis in a single instance.

**Instance Methods**:

- `get_intention_whether_execute`: Determines whether the user's input indicates the need to execute a task flow.
- `get_intention_consult_which`: Further classifies user inquiry intents.
- `get_intention_by_node_info`: Retrieves the target intent leaf node from the intent tree based on user input.
- `get_intention_by_node_info_match`: Completes rule matching in the intent tree retrieval function.
- `get_intention_by_node_info_nlp`: Completes semantic matching in the intent tree retrieval function.
- `intention_df2graph`: Bulk imports intent nodes into the graph.

## SDK Interface

The following are the main methods provided by the `IntentionRouter` class along with their interface documentation:

### `__init__(...)`

- **Description**: Initializes the `IntentionRouter` instance and configures various parameters and services.
- **Parameters**:
  - `agent`: `Optional[BaseAgent]` type, an LLM-based Agent.
  - `gb_handler`: `Optional[GBHandler]` type.
  - `tb_handler`: `Optional[TbaseHandler]` type.
  - `embed_config`: Optional embedding model configuration object (ModelConfig or EmbedConfig).

### `get_intention_whether_execute(self, query: str, agent: Optional[BaseAgent]=None) -> bool`

- **Description**: Determines whether the intent of the user based on the `query` is to execute a task flow.
- **Parameters**:
  - `query`: `str` type, user input.
  - `agent`: `Optional[BaseAgent]` type, an LLM-based Agent. If `agent=None`, uses `self.agent` for the determination.

### `get_intention_consult_which(self, query: Union[list, tuple, str], agent: Optional[BaseAgent]=None, root_node_id: Optional[str]=None) -> str`

- **Description**: Classifies the user's inquiry intent based on `query` and the root node `root_node_id`, including: overall process, next steps, and chitchat. The specific steps are as follows:

  1. Classify intent directly based on `query`, obtaining determination result I1.
  2. If `root_node_id` is empty, return I1; otherwise, proceed to step 3.
  3. If I1 is not "justChat", return I1; otherwise, use `get_intention_by_node_info_nlp` for intent tree retrieval.
  4. If retrieval is successful, modify I1 to "overall process"; otherwise, remain unchanged. Return I1.

- **Parameters**:
  - `query`: `str` type, user input.
  - `agent`: `Optional[BaseAgent]` type, an LLM-based Agent. If `agent=None`, uses `self.agent` instead.
  - `root_node_id`: `Optional[str]` type, intent tree root node ID.

### `get_intention_by_node_info_match(self, root_node_id: str, gb_handler: Optional[GBHandler] = None, rule: Union[Optional[str], list[Optional[str]]] = None, **kwargs) -> dict[str, Any]`

- **Description**: Intent tree retrieval through rule matching, implementing intent tree retrieval according to the specified rules. In this approach, from the root node down, a different input and matching rule is needed for each level.

- **Parameters**:

  - `root_node_id`: `str` type, intent tree root node ID.
  - `gb_handler`: `Optional[GBHandler]` type, used for searching nodes from the graph database. If `gb_handler=None`, uses `self.gb_handler` instead.
  - `rule`: `Union[Optional[str], list[Optional[str]]]` type, the matching rules for each layer of the intent tree. If `rule` is empty, use the edit distance (`rule="edit_distance"`); if `rule` is a string, all matches use the same matching rule.
  - `kwargs`: Input required for rule matching.

- **Matching Rules**:
  - Default Rule: `edit_distance`, which computes the edit distance between the input and the target node's `description`, with the shortest distance node being the retrieval result.
  - Custom Rule: Users can write custom rules using Python code as follows:
  ```python
  def custom_rule(node: GNode, **kwargs) -> Union[int, float]:
      # your code to compute similarity between input kwargs and the node.
  ```

### `get_intention_by_node_info_nlp(self, root_node_id: str, query: str, start_from_root: bool = False, gb_handler: Optional[GBHandler] = None, tb_handler: Optional[TbaseHandler] = None, agent=None) -> dict[str, Any]`

- **Description**: Intent tree retrieval through semantic matching, retrieving the target intent node based on the semantics of `query`. Depending on whether `start_from_root` is True or False, semantic retrieval can be categorized into two methods:
  - Layered Retrieval: Starts from the root node and performs semantic matching layer by layer until reaching the intent leaf node or failing to match.
  - Vector Retrieval: First retrieves candidate nodes under the intent tree from Redis, filters out those that do not meet the criteria, and then performs layered retrieval. The whole process is as follows:

![向量检索整体流程](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*3BN8QJfsm24AAAAAAAAAAAAADlHYAQ/original)

- **Parameters**:
  - `root_node_id`: `str` type, intent tree root node ID.
  - `query`: `str` type, user input.
  - `start_from_root`: `bool` type, default is `False`. If `start_from_root=True`, it does layered retrieval; otherwise, it does vector retrieval.
  - `gb_handler`: `Optional[GBHandler]` type, used for searching nodes from the graph database. If `gb_handler=None`, uses `self.gb_handler` instead.
  - `tb_handler`: `Optional[TBHandler]` type, used for retrieving nodes from Redis. If `gb_handler=None`, uses `self.tb_handler` instead.
  - `agent`: `Optional[BaseAgent]` type, an LLM-based Agent. If `agent=None`, uses `self.agent` instead.

### `get_intention_by_node_info(self, query: Union[str, list, tuple], root_node_id: str, rule: Union[str, list[str]], start_from_root=True) -> dict[str, Any]`

- **Description**: Unified interface for intent tree retrieval, both rule matching and semantic matching. If `rule="nlp"`, semantic matching is used; otherwise, rule matching is applied.

- **Parameters**:
  - `query`: `Union[str, list, tuple]` type, user input.
  - `root_node_id`: `str` type, intent tree root node ID.
  - `rule`: `Union[str, list[str]]` type, matching rules. If `rule="nlp"`, semantic matching is used; otherwise, rule matching is applied.
  - `start_from_root`: `bool` type, only effective during semantic matching.

### `intention_df2graph(self, data_df: pandas.DataFrame, teamid: str, root_node_id: Optional[str] = None , gb_handler: Optional[GBHandler] = None, tb_handler: Optional[TbaseHandler] = None, embed_config=None, cat_root_node_id=True, delete_edge=False) -> tuple[bool, str]`

- **Description**: Bulk import intent nodes to construct the intent tree, which can also be used to overwrite the original intent tree and modify node properties, add, or delete nodes.

- **Parameters**:

  - `data_df`: `pandas.DataFrame` type, containing the intent nodes and edges to import.
  - `teamid`: `str` type, team ID.
  - `root_node_id`: `Optional[str]` type, root node ID to hang onto. If `root_node_id` is empty, it indicates no need to associate with other nodes.
  - `gb_handler`: `Optional[GBHandler]` type, used for searching nodes from the graph database. If `gb_handler=None`, uses `self.gb_handler` instead.
  - `tb_handler`: `Optional[TBHandler]` type, used for retrieving nodes from Redis. If `gb_handler=None`, uses `self.tb_handler` instead.
  - `embed_config`: Optional embedding model configuration object (ModelConfig or EmbedConfig).
  - `cat_root_node_id`: `bool` type, only valid if `root_node_id` is not empty. If True, will concatenate all nodes to be imported with the root node ID to ensure the uniqueness of IDs.
  - `delete_edge`: `bool` type, effective when overwriting the original intent tree. If `delete_edge=True`, all edges under the original intent tree will be deleted before overwriting.

- The format of `data_df` is as follows:

| Column Name |         Type          |                                 Description                                 |
| :---------: | :-------------------: | :-------------------------------------------------------------------------: |
|     id      |         `str`         |                                   Node ID                                   |
| description |         `str`         | Description of the intent node (clearly stating the meaning of this intent) |
|    name     |         `str`         |                                  Node name                                  |
|  child_ids  | `Optional[list[str]]` |             Child node IDs; if empty, it indicates a leaf node              |

## Usage of IntentionRouter

```python
intention_router = IntentionRouter(...)
query = '如何使用花呗申请贷款？'

# Execution or inquiry
whether_execute = intention_router.get_intention_whether_execute(query)
# whether_execute = False

# Inquiry intent classification
consult_which = intention_router.get_intention_consult_which(query)
# consult_which = 'allPlan'

# Intent tree retrieval - semantic matching
start_node_id = 'ekg_team_default'
ret = intention_router.get_intention_by_node_info(
    query=query,
    root_node_id=start_node_id,
    rule='nlp',
    start_from_root=False
)
# ret = {'node_id': xx, 'is_leaf': True, 'error_msg': '', 'status': 'success', 'nodes_to_choose': None, 'answer': None}

# Intent tree retrieval - rule matching
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
