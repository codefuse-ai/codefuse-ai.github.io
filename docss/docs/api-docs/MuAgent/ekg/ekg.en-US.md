---
group:
  title: EKG
  order: 0
title: EKG
order: 0
toc: content
---

# EKG Usage

## Code Content Description

The `EKG` class acts as a coordinator, integrating multiple configurations and initializing critical services necessary for processing tasks related to EKG. This class is designed to manage complex workflows, including agents, tools, and event graphs.

## Functional Overview

**Basic Attributes**:

- `tb_config`: Redis basic configuration.
- `gb_config`: Graph database basic configuration.
- `embed_config`: Vector model configuration.
- `llm_config`: Large language model configuration.
- `project_config`: Project configuration.
- `agents`: List of agents.
- `tools`: List of tools.
- `initialize_space`: Boolean value determining whether to initialize space for the project.

**Class Methods**:

- `from_project(cls, project_config: EKGProjectConfig, initialize_space=False) -> 'EKG'`
  This method constructs an `EKG` instance from a specific project configuration, allowing for direct initialization of the EKG object from the project settings.

**Instance Methods**:

- `add_node`: Adds a node to the EKG graph. Accepts either a dictionary representation of the node or a `GNode` instance.
- `add_edge`: Creates an edge between two existing nodes in the EKG graph based on their IDs.
- `run`: Begins processing a query in the specified scene. This method manages interactions and can yield user input when necessary.

## SDK Interfaces

The following are the main methods provided by the `EKG` class and their interface documentation:

### `__init__(...)`

- **Description**: Initializes the EKG instance, configuring various parameters and services.
- **Parameters**:
  - `tb_config`: An optional time-based configuration object (TBConfig).
  - `gb_config`: An optional graph-based configuration object (GBConfig).
  - `embed_config`: An optional embedding model configuration object (ModelConfig or EmbedConfig).
  - `llm_config`: An optional language model configuration object (ModelConfig or LLMConfig).
  - `project_config`: The configuration object for the EKG project (EKGProjectConfig).
  - `agents`: A list of agent names (List[str]), defaulting to an empty list.
  - `tools`: A list of tool names (List[str]), defaulting to an empty list.
  - `initialize_space`: A boolean value to determine whether to initialize space, defaulting to True.

### `from_project(project_config: EKGProjectConfig, initialize_space=False) -> 'EKG'`

- **Description**: Creates an instance of EKG from the project configuration.
- **Parameters**:
  - `project_config`: The configuration object for the EKG project (EKGProjectConfig).
  - `initialize_space`: A boolean value to determine whether to initialize space, defaulting to False.

### `add_node(node: Union[Dict, GNode], *, teamid: str = "default") -> None`

- **Description**: Adds a node to the EKG graph.
- **Parameters**:
  - `node`: Can be a dictionary representation of the node or a GNode instance.
  - `teamid`: The team ID, defaulting to "default".

### `add_edge(start_id: str, end_id: str, *, teamid: str = "") -> None`

- **Description**: Creates an edge between two nodes in the EKG graph.
- **Parameters**:
  - `start_id`: The ID of the starting node.
  - `end_id`: The ID of the ending node.
  - `teamid`: The team ID, defaulting to an empty string.

### `run(query: str, scene: str = "NEXA", rootid: str = "ekg_team_default")`

- **Description**: Starts processing with the EKG, using the provided query and scene.
- **Parameters**:
  - `query`: The query string to process.
  - `scene`: The scene name, defaulting to "NEXA".
  - `rootid`: The root node ID, defaulting to "ekg_team_default".

## EKG Usage

### Fill in Model Configuration

```python
from muagent.schemas import ModelConfig
import json

MODEL_CONFIGS = {
    "dashscope_chat": {
        "model_type": "dashscope_chat",
        "model_name": "qwen2.5-72b-instruct",
        "api_key": "sk-xxx",
    },
    "qwen_text_embedding": {
        "model_type": "dashscope_text_embedding",
        "model_name": "text-embedding-v3",
        "api_key": "sk-xx",
    },
}
os.environ["MODEL_CONFIGS"] = json.dumps(MODEL_CONFIGS)
```

### Fill in Agent Configuration

```python
AGENT_CONFIGS = {
    "codefuse_function_caller": {
        "config_name": "codefuse_function_caller",
        "agent_type": "FunctioncallAgent",
        "agent_name": "codefuse_function_caller",
        "llm_config_name": "qwen_chat"
    }
}
os.environ["AGENT_CONFIGS"] = json.dumps(AGENT_CONFIGS)
```

### Initialize Configuration

```python
from muagent import get_ekg_project_config_from_env
project_config = get_ekg_project_config_from_env()
```

### Initialize EKG

```python
from muagent import EKG
ekg = EKG(project_config=project_config, initialize_space=False)
```

### add nodes

```python
nodes = [{'id': 'haPvrjEkz4LARZyR7OAuPmVMHMIQPMew',
  'type': 'opsgptkg_intent',
  'attributes': {'description': '需要公司多人参与的事务，以及相关的问题', 'name': '公司事务'}},
 {'id': 'dicVRAk5rT3y9LxcmBCN2jDi1TjHc5rm',
  'type': 'opsgptkg_intent',
  'attributes': {'description': '与个人有关的事务(如个人贷款），或遇到的个人问题，不涉及公司事务',
   'name': '个人事务'}},
 {'id': 'ClKvwjBRZUJC7ttSZaiT0dh7lhSujNWi',
  'type': 'opsgptkg_intent',
  'attributes': {'description': '公司活动', 'name': '公司活动'}},
 {'id': 'NyBXAHQckQx1xL5lnSgBGlotbZkkQ9C7',
  'type': 'opsgptkg_intent',
  'attributes': {'description': '金融（如借款、存款、贷款等）', 'name': '金融'}},
 {'id': '6sa4zJCnVKJxKMtOtypapjZk4sdo93QU',
  'type': 'opsgptkg_intent',
  'attributes': {'description': '医疗(包括预约、挂号、看病、诊断等)', 'name': '医疗'}},
 {'id': 'a8d85669_141a_4f54_ab8c_209c08d27c35',
  'type': 'opsgptkg_schedule',
  'attributes': {'description': '组织一次公司活动',
   'name': '组织一次公司活动',
   'enable': 'False'}},
 {'id': '2b8df337_f29e_4d49_865f_84088c3a94e7',
  'type': 'opsgptkg_schedule',
  'attributes': {'description': '在线申请贷款',
   'name': '在线申请贷款',
   'enable': 'False'}},
 {'id': 'b9fe38f1_33f6_468b_a1dd_43efdfd8e2d1',
  'type': 'opsgptkg_schedule',
  'attributes': {'description': '预约医生', 'name': '预约医生', 'enable': 'False'}},
 {'id': '98234102_4e4a_4997_9b1e_3cda6382b1c7',
  'type': 'opsgptkg_task',
  'attributes': {'description': '确定活动主题：确定活动的主要目的（如团建、庆祝活动等）',
   'name': '确定活动主题：确定活动的主要目的（如团建、庆祝活动等）'}},
 {'id': '59030678_760d_4a10_8d61_0d4e4cc5fbcb',
  'type': 'opsgptkg_task',
  'attributes': {'description': '访问贷款平台：输入网址并访问贷款申请网站',
   'name': '访问贷款平台：输入网址并访问贷款申请网站'}},
 {'id': '5afab73b_8f03_422f_856e_386f183bdd71',
  'type': 'opsgptkg_task',
  'attributes': {'description': '选择医院/医生：访问医院官网或APP，查找相关科室和医生',
   'name': '选择医院/医生：访问医院官网或APP，查找相关科室和医生'}},
 {'id': '95ec00ef_cc9c_4947_a21c_88eeb9a71af5',
  'type': 'opsgptkg_task',
  'attributes': {'description': '选择活动类型', 'name': '选择活动类型'}},
 {'id': '5504af87_416e_4ee5_bfce_86b969a63433',
  'type': 'opsgptkg_task',
  'attributes': {'description': '注册/登录：如果你已经注册,输入用户名和密码进行登录。如果你还没有注册,点击“注册”按钮，填写个人信息，创建账户',
   'name': '注册/登录：如果你已经注册,输入用户名和密码进行登录。如果你还没有注册,点击“注册”按钮，填写个人信息，创建账户'}},
 {'id': '3ff8f54a_fa65_4368_86ce_d65058035dd0',
  'type': 'opsgptkg_task',
  'attributes': {'description': '查看可预约时间：点击医生姓名，查看可预约时段',
   'name': '查看可预约时间：点击医生姓名，查看可预约时段'}},
 {'id': 'd5e760b4_ae82_410d_a73d_4c0c98926ae5',
  'type': 'opsgptkg_phenomenon',
  'attributes': {'description': '室内活动', 'name': '室内活动'}},
 {'id': '2a37b90a_fd96_4548_989c_7c1e8fa9d881',
  'type': 'opsgptkg_phenomenon',
  'attributes': {'description': '户外活动', 'name': '户外活动'}},
 {'id': '88d4cf2b_7cf5_4e40_b54e_59268f119f63',
  'type': 'opsgptkg_task',
  'attributes': {'description': '选择贷款类型：浏览可用的贷款类型（如个人贷款、汽车贷款、房屋贷款），选择适合自己的贷款类型',
   'name': '选择贷款类型：浏览可用的贷款类型（如个人贷款、汽车贷款、房屋贷款），选择适合自己的贷款类型'}},
 {'id': '39021995_6e63_4907_9d67_26ba50d0cd44',
  'type': 'opsgptkg_task',
  'attributes': {'description': '填写个人信息：输入姓名、联系方式等，选择预约时间',
   'name': '填写个人信息：输入姓名、联系方式等，选择预约时间'}},
 {'id': '59fe9c1d_0731_403e_936a_2e2bbba4b3ee',
  'type': 'opsgptkg_task',
  'attributes': {'description': '选择具体的室内活动（如会议、晚会、游戏），确定场地和时间，准备相关的设备（如投影仪、音响），安排餐饮和娱乐节目，发出邀请通知',
   'name': '选择具体的室内活动（如会议、晚会、游戏），确定场地和时间，准备相关的设备（如投影仪、音响），安排餐饮和娱乐节目，发出邀请通知'}},
 {'id': '60163dc6_87af_4972_b350_6b9275975c83',
  'type': 'opsgptkg_task',
  'attributes': {'description': '选择具体的户外活动（如远足、烧烤、运动会），确定地点和时间，安排交通工具和安全措施，联系供应商（如餐饮、设备租赁），发出邀请通知',
   'name': '选择具体的户外活动（如远足、烧烤、运动会），确定地点和时间，安排交通工具和安全措施，联系供应商（如餐饮、设备租赁），发出邀请通知'}},
 {'id': '910f3634_b999_4cf3_94c9_346a67b0d5ed',
  'type': 'opsgptkg_task',
  'attributes': {'description': '填写申请表：提供个人信息（如姓名、年龄、收入等），提供贷款金额和贷款目的',
   'name': '填写申请表：提供个人信息（如姓名、年龄、收入等），提供贷款金额和贷款目的'}},
 {'id': '1330ad69_dfc3_4538_864e_6867a3fd8dd4',
  'type': 'opsgptkg_task',
  'attributes': {'description': '确认预约：检查预约信息，点击“确认预约”按钮',
   'name': '确认预约：检查预约信息，点击“确认预约”按钮'}},
 {'id': 'fcbc3e04_ad8c_4aad_9f75_191f8037ced8',
  'type': 'opsgptkg_task',
  'attributes': {'description': '预算审核：计算活动预估费用，提交预算给管理层审核',
   'name': '预算审核：计算活动预估费用，提交预算给管理层审核'}},
 {'id': '2c7a0d7b_a490_41b9_a6f8_e71b5212e0be',
  'type': 'opsgptkg_task',
  'attributes': {'description': '提交资料：上传所需文件（如身份证、收入证明等）',
   'name': '提交资料：上传所需文件（如身份证、收入证明等）'}},
 {'id': '3cd46fb7_e11c_4181_8670_2f080a453142',
  'type': 'opsgptkg_phenomenon',
  'attributes': {'description': '接收通知：收到预约确认短信或邮件',
   'name': '接收通知：收到预约确认短信或邮件'}},
 {'id': '0f4610cd_cf6a_475b_8ac0_80166569a292',
  'type': 'opsgptkg_task',
  'attributes': {'description': '审核资料：系统开始审核申请', 'name': '审核资料：系统开始审核申请'}},
 {'id': 'b9f81925_b43a_459d_9902_1bc4b024f5a1',
  'type': 'opsgptkg_phenomenon',
  'attributes': {'description': '审核通过', 'name': '审核通过'}},
 {'id': '191687cd_1b76_4e77_9f2a_e67936dd372e',
  'type': 'opsgptkg_phenomenon',
  'attributes': {'description': '审核失败', 'name': '审核失败'}},
 {'id': '18c33ec1_08ef_4df8_b938_7244852d19c8',
  'type': 'opsgptkg_task',
  'attributes': {'description': '用户收到“申请通过”的通知，前往下一步选择贷款期限和还款方式',
   'name': '用户收到“申请通过”的通知，前往下一步选择贷款期限和还款方式'}},
 {'id': 'b73c2551_0890_40fb_b0ca_04912bc21b65',
  'type': 'opsgptkg_task',
  'attributes': {'description': '提供反馈，建议修改后重新申请', 'name': '提供反馈，建议修改后重新申请'}},
 {'id': 'e95adaa2_d177_435b_bac7_a8b6047ecc3d',
  'type': 'opsgptkg_task',
  'attributes': {'description': '确认贷款条件：查看贷款条款和条件',
   'name': '确认贷款条件：查看贷款条款和条件'}},
 {'id': '0c561d68_ee31_49d2_82c1_1dac81e731ff',
  'type': 'opsgptkg_phenomenon',
  'attributes': {'description': '拒绝条款', 'name': '拒绝条款'}},
 {'id': '81f579ac_851d_4b85_8608_d2732a2612ff',
  'type': 'opsgptkg_phenomenon',
  'attributes': {'description': '接受条款', 'name': '接受条款'}},
 {'id': '1f0b64aa_5d45_4cf5_bcdd_084b8c125889',
  'type': 'opsgptkg_task',
  'attributes': {'description': '选择“拒绝”并退出申请流程', 'name': '选择“拒绝”并退出申请流程'}},
 {'id': '5fd5901a_8adc_4b76_aea2_dcf18884ea0e',
  'type': 'opsgptkg_task',
  'attributes': {'description': '点击“接受”并继续', 'name': '点击“接受”并继续'}},
 {'id': '8c999c60_baa7_4e74_903b_f10f148dd12f',
  'type': 'opsgptkg_task',
  'attributes': {'description': '签署合同：在线签署贷款合同', 'name': '签署合同：在线签署贷款合同'}},
 {'id': 'e1004c60_5c0c_4f32_b765_a57cc4d39dcc',
  'type': 'opsgptkg_analysis',
  'attributes': {'summaryswitch': 'False',
   'description': '根据提示前往医院就诊',
   'name': '根据提示前往医院就诊'}},
 {'id': 'c50ff5e3_aa01_4a6c_96d7_d8645303846d',
  'type': 'opsgptkg_task',
  'attributes': {'description': '活动宣传：制作宣传材料（如海报、邮件通知），在公司内部推广活动信息',
   'name': '活动宣传：制作宣传材料（如海报、邮件通知），在公司内部推广活动信息'}},
 {'id': '4f540a57_f73d_451e_aafb_43f1335a18a7',
  'type': 'opsgptkg_task',
  'attributes': {'description': '活动实施：根据选择的活动类型，执行相关安排，进行现场协调（无论是户外还是室内）',
   'name': '活动实施：根据选择的活动类型，执行相关安排，进行现场协调（无论是户外还是室内）'}},
 {'id': 'c9952fa7_7f82_4737_8cfd_bdbb2dabb20e',
  'type': 'opsgptkg_task',
  'attributes': {'description': '活动反馈：收集参与者的反馈意见，总结活动的成功之处和改进建议',
   'name': '活动反馈：收集参与者的反馈意见，总结活动的成功之处和改进建议'}},
 {'id': 'ekg_team_default',
  'type': 'opsgptkg_intent',
  'attributes': {'description': '团队起始节点', 'name': '开始'}}]


for node in nodes:
    ekg.add_node(node)
```

### add edges

```python
edges = [('ekg_team_default', 'haPvrjEkz4LARZyR7OAuPmVMHMIQPMew'),
 ('ekg_team_default', 'dicVRAk5rT3y9LxcmBCN2jDi1TjHc5rm'),
 ('haPvrjEkz4LARZyR7OAuPmVMHMIQPMew', 'ClKvwjBRZUJC7ttSZaiT0dh7lhSujNWi'),
 ('dicVRAk5rT3y9LxcmBCN2jDi1TjHc5rm', 'NyBXAHQckQx1xL5lnSgBGlotbZkkQ9C7'),
 ('dicVRAk5rT3y9LxcmBCN2jDi1TjHc5rm', '6sa4zJCnVKJxKMtOtypapjZk4sdo93QU'),
 ('ClKvwjBRZUJC7ttSZaiT0dh7lhSujNWi', 'a8d85669_141a_4f54_ab8c_209c08d27c35'),
 ('NyBXAHQckQx1xL5lnSgBGlotbZkkQ9C7', '2b8df337_f29e_4d49_865f_84088c3a94e7'),
 ('6sa4zJCnVKJxKMtOtypapjZk4sdo93QU', 'b9fe38f1_33f6_468b_a1dd_43efdfd8e2d1'),
 ('a8d85669_141a_4f54_ab8c_209c08d27c35',
  '98234102_4e4a_4997_9b1e_3cda6382b1c7'),
 ('2b8df337_f29e_4d49_865f_84088c3a94e7',
  '59030678_760d_4a10_8d61_0d4e4cc5fbcb'),
 ('b9fe38f1_33f6_468b_a1dd_43efdfd8e2d1',
  '5afab73b_8f03_422f_856e_386f183bdd71'),
 ('98234102_4e4a_4997_9b1e_3cda6382b1c7',
  '95ec00ef_cc9c_4947_a21c_88eeb9a71af5'),
 ('59030678_760d_4a10_8d61_0d4e4cc5fbcb',
  '5504af87_416e_4ee5_bfce_86b969a63433'),
 ('5afab73b_8f03_422f_856e_386f183bdd71',
  '3ff8f54a_fa65_4368_86ce_d65058035dd0'),
 ('95ec00ef_cc9c_4947_a21c_88eeb9a71af5',
  'd5e760b4_ae82_410d_a73d_4c0c98926ae5'),
 ('95ec00ef_cc9c_4947_a21c_88eeb9a71af5',
  '2a37b90a_fd96_4548_989c_7c1e8fa9d881'),
 ('5504af87_416e_4ee5_bfce_86b969a63433',
  '88d4cf2b_7cf5_4e40_b54e_59268f119f63'),
 ('3ff8f54a_fa65_4368_86ce_d65058035dd0',
  '39021995_6e63_4907_9d67_26ba50d0cd44'),
 ('d5e760b4_ae82_410d_a73d_4c0c98926ae5',
  '59fe9c1d_0731_403e_936a_2e2bbba4b3ee'),
 ('2a37b90a_fd96_4548_989c_7c1e8fa9d881',
  '60163dc6_87af_4972_b350_6b9275975c83'),
 ('88d4cf2b_7cf5_4e40_b54e_59268f119f63',
  '910f3634_b999_4cf3_94c9_346a67b0d5ed'),
 ('39021995_6e63_4907_9d67_26ba50d0cd44',
  '1330ad69_dfc3_4538_864e_6867a3fd8dd4'),
 ('59fe9c1d_0731_403e_936a_2e2bbba4b3ee',
  'fcbc3e04_ad8c_4aad_9f75_191f8037ced8'),
 ('60163dc6_87af_4972_b350_6b9275975c83',
  'fcbc3e04_ad8c_4aad_9f75_191f8037ced8'),
 ('910f3634_b999_4cf3_94c9_346a67b0d5ed',
  '2c7a0d7b_a490_41b9_a6f8_e71b5212e0be'),
 ('1330ad69_dfc3_4538_864e_6867a3fd8dd4',
  '3cd46fb7_e11c_4181_8670_2f080a453142'),
 ('2c7a0d7b_a490_41b9_a6f8_e71b5212e0be',
  '0f4610cd_cf6a_475b_8ac0_80166569a292'),
 ('0f4610cd_cf6a_475b_8ac0_80166569a292',
  'b9f81925_b43a_459d_9902_1bc4b024f5a1'),
 ('0f4610cd_cf6a_475b_8ac0_80166569a292',
  '191687cd_1b76_4e77_9f2a_e67936dd372e'),
 ('b9f81925_b43a_459d_9902_1bc4b024f5a1',
  '18c33ec1_08ef_4df8_b938_7244852d19c8'),
 ('191687cd_1b76_4e77_9f2a_e67936dd372e',
  'b73c2551_0890_40fb_b0ca_04912bc21b65'),
 ('18c33ec1_08ef_4df8_b938_7244852d19c8',
  'e95adaa2_d177_435b_bac7_a8b6047ecc3d'),
 ('e95adaa2_d177_435b_bac7_a8b6047ecc3d',
  '0c561d68_ee31_49d2_82c1_1dac81e731ff'),
 ('e95adaa2_d177_435b_bac7_a8b6047ecc3d',
  '81f579ac_851d_4b85_8608_d2732a2612ff'),
 ('0c561d68_ee31_49d2_82c1_1dac81e731ff',
  '1f0b64aa_5d45_4cf5_bcdd_084b8c125889'),
 ('81f579ac_851d_4b85_8608_d2732a2612ff',
  '5fd5901a_8adc_4b76_aea2_dcf18884ea0e'),
 ('5fd5901a_8adc_4b76_aea2_dcf18884ea0e',
  '8c999c60_baa7_4e74_903b_f10f148dd12f'),
 ('3cd46fb7_e11c_4181_8670_2f080a453142',
  'e1004c60_5c0c_4f32_b765_a57cc4d39dcc'),
 ('fcbc3e04_ad8c_4aad_9f75_191f8037ced8',
  'c50ff5e3_aa01_4a6c_96d7_d8645303846d'),
 ('c50ff5e3_aa01_4a6c_96d7_d8645303846d',
  '4f540a57_f73d_451e_aafb_43f1335a18a7'),
 ('4f540a57_f73d_451e_aafb_43f1335a18a7',
  'c9952fa7_7f82_4737_8cfd_bdbb2dabb20e')]

for start_id, end_id in edges:
    ekg.add_edge(start_id, end_id)
```

### execute task

```python
response = ekg.run("如何去预约医生？",rootid="ekg_team_default")
for i in response:
    pass
```

### Other Demo

[Undercover](https://github.com/codefuse-ai/CodeFuse-muAgent/blob/main/examples/ekg_examples/undercover.py)
[Werewolf](https://github.com/codefuse-ai/CodeFuse-muAgent/blob/main/examples/ekg_examples/werewolf.py)
[QA](https://github.com/codefuse-ai/CodeFuse-muAgent/blob/main/examples/ekg_examples/qa.py)
