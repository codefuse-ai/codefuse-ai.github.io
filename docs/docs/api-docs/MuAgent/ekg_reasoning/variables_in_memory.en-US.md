---
group:
  title: EKG Reasoning
  order: 6
title: Variables in Memory
order: 2
toc: content
---

### Introducing the memory-variable capability

Using the Werewolf game as an example, which adds three variables: `number of surviving players`, `remaining antidote count`, and `remaining poison count`. This, to a certain extent, mitigates the hallucination problem often encountered in large models.

#### 1. `number of surviving players` variable

Initialize variables：

```text
"number of surviving players": "梁军、朱丽、周欣怡、贺子轩、沈强、韩刚、周杰、人类玩家"
```

During the Werewolf phase, vote counts are tallied and variables are updated. The values of the variables are retrieved during the Seer phase, the Witch phase, the daytime discussion, and the phase for voting to lynch the suspected murderer.

#### 2. `remaining antidote count` variable and `remaining poison count` variable

Initialize variables：

```text
"remaining antidote count": "1", "remaining poison count": "1"
```

Retrieve and update the values of the variables during the Witch phase.

### Code

### 1. Initialize variables

Initialize the values of the variables based on the content of the node, which should be in JSON format.

```python
def initialize_replacements(self, nodeId: str, nodeType: str) -> bool:
    """
    初始化变量，调用self.memory_manager.init_global_msg实现
    """
    try:
        node_envdescription = self.gb_handler.get_tag(rootNodeId = nodeId, rootNodeType = nodeType, key = 'envdescription')
        cur_node_envdescription = json.loads(node_envdescription)
    except Exception as e:
        logging.info(f"发生了一个错误：{e}")
        logging.info(f"输入不是json格式或者为空，变量初始化失败，略过")
        logging.info(f"node_envdescription: {node_envdescription}")
        return False


    init_flag = False
    try:
        for role_name, role_content in cur_node_envdescription.items():
            if role_name and role_content:
                init_flag = self.memory_manager.init_global_msg(self.sessionId, role_name, role_content)
    except Exception as e:
        logging.info(f"变量初始化错误！{e}")
    return init_flag
```

### 2. Use of variables

Replace the specified positions in the prompt input to the large model with the values stored in the memory variables. This can help to reduce the hallucination problems often encountered in large models.

```python
def fill_replacements(self, node_description: str, sessionId: str) -> str:
    """
    构建替换后的 prompt 字符串。
    :param sessionId: 一个函数，接收占位符名称并返回对应的值
    :return prompt: 替换后的 prompt 字符串
    :return placeholders 涉及到的变量
    """
    prompt = node_description
    logging.info(f'prompt:{prompt}')
    placeholders = re.findall(r"#\$\#(.*?)#\$\#", prompt)
    logging.info("开始变量替换")
    logging.info(f'需要替换的变量{placeholders}')
    try:
        for placeholder in placeholders:
            logging.info(f'placeholder为{placeholder}')
            value = self.memory_manager.get_msg_content_by_rule_name(sessionId, placeholder)
            logging.info(f'value为{value}')
            if value != None:
                prompt = prompt.replace(f'#$#{placeholder}#$#', value)
            logging.info(f'替换后的prompt{prompt}')
    except Exception as e:
        logging.info(f"变量替换出现错误！{e}")

    return prompt
```

### 3. Update variables

Update the values of the variables stored in memory based on the current game records at the node and the corresponding update rules.

```python
def update_replacement(self, sessionId: str, nodeId: str) -> bool:
    """
    更新变量名，
    :param sessionId: 对话id
    :param nodeId: 节点id
    """
    cur_node_memory = self.get_cur_node_memory(sessionId, nodeId)
    logging.info(f'当前节点游戏记录:{cur_node_memory}')
    cur_node_memory = "当前节点游戏记录:" + ''.join(cur_node_memory)

    try:
        updaterule = self.gb_handler.get_tag(rootNodeId = nodeId, rootNodeType = "opsgptkg_task", key = 'updaterule')
        cur_node_updaterule = json.loads(updaterule)
    except Exception as e:
        logging.info(f"出现错误: {e}")
        logging.info(f"输入不是json格式或者为空，变量更新失败，略过.")
        logging.info(f"node_envdescription: {updaterule}")
        return False

    update_flag = False
    try:
        for placeholder, update_role in cur_node_updaterule.items():
            logging.info(f'更新的变量为:{placeholder}')
            logging.info(f'当前节点游戏记录为:{cur_node_memory}')
            update_flag = self.memory_manager.update_msg_content_by_rule(sessionId, placeholder, cur_node_memory, update_role)
            logging.info(f'update_flag:{update_flag}')
    except Exception as e:
        logging.info(f"变量更新出现错误！{e}")
    return update_flag
```
