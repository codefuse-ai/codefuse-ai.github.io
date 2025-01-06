---
group:
  title: 图谱推理
  order: 6
title: Memory 中的变量能力
order: 2
toc: content
---

### memory-变量能力介绍

以狼人杀游戏为例介绍 memory-变量能力介绍，增加了`存活的玩家`、`剩余解药的数量`、`剩余毒药的数量`这三个变量，在一定程度上减少了大模型的幻觉问题。

#### 1. `存活的玩家`变量

初始化变量：

```text
"存活的玩家": "梁军、朱丽、周欣怡、贺子轩、沈强、韩刚、周杰、人类玩家"
```

在狼人时刻\_统计票数、女巫时刻、统计票数更新变量，并在预言家时刻、女巫时刻、天亮讨论、票选凶手等时刻获取变量的值。

#### 2. `剩余解药的数量` 变量和 `剩余毒药的数量` 变量

初始化变量：

```text
"剩余毒药的数量": "1", "剩余解药的数量": "1"
```

在女巫时刻获取变量的值和更新变量。

### 核心代码

### 1. 初始化变量

根据节点的内容，将变量的值进行初始化，节点上的内容应该为 json 格式。

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

### 2. 变量的使用

将输入给大模型的 prompt 中的指定位置替换为存储在 memory 中变量的值，这样可以减少大模型的幻觉问题。

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

### 3. 更新变量

根据当前节点的游戏记录和相应的更新规则，更新 memory 中变量的值。

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
