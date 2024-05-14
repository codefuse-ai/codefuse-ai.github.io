---
nav:
  title: 文档
  order: -1
  second:
    title: 开发者文档
    order: -1
store:
  title: CodeFuse-DevOps-Eval
  version: master
group:
  title: 🌱 CodeFuse-DevOps-Eval
  order: -1
title: 数据介绍
order: -1
toc: content
---

## ⏬ 数据

#### 下载

- 方法一：下载 zip 压缩文件（你也可以直接用浏览器打开下面的链接）：

  ```
  wget https://huggingface.co/datasets/codefuse-admin/devopseval-exam/resolve/main/devopseval-exam.zip
  ```

  然后可以使用 pandas 加载数据：

  ```
  import os
  import pandas as pd

  File_Dir="devopseval-exam"
  test_df=pd.read_csv(os.path.join(File_Dir,"test","UnitTesting.csv"))
  ```

- 方法二：使用[Hugging Face datasets](https://huggingface.co/datasets/codefuse-admin/devopseval-exam)直接加载数据集。示例如下：

  ````python
  from datasets import load_dataset
  dataset=load_dataset(r"DevOps-Eval/devopseval-exam",name="UnitTesting")

  print(dataset['val'][0])
  # {"id": 1, "question": "单元测试应该覆盖以下哪些方面？", "A": "正常路径", "B": "异常路径", "C": "边界值条件"，"D": 所有以上，"answer": "D", "explanation": ""}  ```

  ````

- 方法三：使用[modelscope](https://modelscope.cn/datasets/codefuse-ai/devopseval-exam/files)下载相关所有数据。示例如下：
  ````python
  from modelscope.msdatasets import MsDataset
  MsDataset.clone_meta(dataset_work_dir='./xxx', dataset_id='codefuse-ai/devopseval-exam')```

  ````

#### 👀 说明

为了方便使用，我们已经整理出了 55 个细分类别以及它们的中英文名称。具体细节请查看 [category_mapping.json](./categroy_mapping) 。格式如下：

```
{
  "UnitTesting.csv": [
    "unit testing",
    "单元测试",
    {"dev": 5, "test": 32}
    "TEST"
  ],
  ...
  "file_name":[
  "英文名称",
  "中文名称",
  "样本数量",
  "类别(PLAN,CODE,BUILD,TEST,RELEASE,DEPOLY,OPERATE,MONITOR八选一)"
  ]
}
```

每个细分类别由两个部分组成：dev 和 test。每个细分类别的 dev 集包含五个示范实例以及为 few-shot 评估提供的解释。而 test 集则用于模型评估，并且 test 数据已包含准确标签。

下面是 dev 数据的示例，来自"版本控制"细分类别：

```
id: 4
question: 如何找到Git特定提交中已更改的文件列表？
A: 使用命令 `git diff --name-only SHA`
B: 使用命令 `git log --name-only SHA`
C: 使用命令 `git commit --name-only SHA`
D: 使用命令 `git clone --name-only SHA`
answer: A
explanation:
分析原因：
git diff --name-only SHA命令会显示与SHA参数对应的提交中已修改的文件列表。参数--name-only让命令只输出文件名，而忽略其他信息。其它选项中的命令并不能实现此功能。
```

#### 🔥 AIOps 样本示例

👀 👀 此处以日志解析和时序异常检测为例，对 AIOps 样本做一些简要的展示:

日志解析

```
id: 0
question:
下面是一些运行日志
 0 04:21:15,429 WARN Cannot open channel to 2 at election address /10.10.34.12:3888
 1 19:18:56,377 WARN ******* GOODBYE /10.10.34.11:52703 ********
 2 19:13:46,128 WARN ******* GOODBYE /10.10.34.11:52308 ********
 3 19:16:26,268 WARN ******* GOODBYE /10.10.34.11:52502 ********
 4 09:11:16,012 WARN Cannot open channel to 3 at election address /10.10.34.13:3888
 5 16:37:13,837 WARN Cannot open channel to 2 at election address /10.10.34.12:3888
 6 09:09:16,008 WARN Cannot open channel to 3 at election address /10.10.34.13:3888
 7 15:27:03,681 WARN Cannot open channel to 3 at election address /10.10.34.13:3888
日志最前面三部分别为序号、时间戳和日志Level，在不考虑这三部分内容的情况下，此处我们设定日志的变量用'<*>'代替，token与token之间用空格分隔，那么请问上述日志的日志模版具体是什么？
A: Notification time out: <*> 和 Connection broken for id <*>, my id = <*>, error =
B: Send worker leaving thread 和 Connection broken for id <*>, my id = <*>, error =
C: Received connection request /<*>:<*> 和 Interrupting SendWorker
D: Cannot open channel to <*> at election address /<*>:<*> 和 ******* GOODBYE /<*>:<*> ********
answer: D
explanation: 根据日志中的内容，选项D是最符合日志模板的。日志中包含了"Cannot open channel to &lt;*&gt; at election address /&lt;*&gt;:&lt;*&gt;"和"******* GOODBYE /&lt;*&gt;:&lt;*&gt; ********"这两个固定的模板片段，它们都在选项D中出现了。同时，其他选项中的模板片段与日志中的内容不匹配。因此，选项D是最符合日志模板的。
```

时序异常检测

```
id: 0
question:
分析如下时间序列
[50,62,74,84,92,97,99,98,94,87,77,65,265,40,28,17,8,3,0,0,4,10,20,31,43,56,68,79,89,95,99,99,96,91,82,71,59,46,34,22,12,5,1,0,2,7,15,25,37,49]
请找出其中明显异常点的下标。所谓的异常点一般指的是明显与数据整体趋势不符的点。
A: 46
B: 0
C: 37
D: 12
answer: D
explanation: 根据分析，题目中的时间序列在12点出的值265要明显大于周围数据，存在着突增现象，因此选择D是正确的。
```

#### 🔧 ToolLearning 样本示例

工具学习样本的数据格式与 OpenAI 的函数调用格式兼容。
详情请参阅[tool_learning_info_zh.md](/zh-CN/docs/developer-docs/CodeFuse-DevOps-Eval/master/tool_learning_info_zh)。
工具学习评测过程，详情请参阅见 [tool_learning_evalution.md](/zh-CN/docs/developer-docs/CodeFuse-DevOps-Eval/master/tool_learning_evalution)。
<br>
