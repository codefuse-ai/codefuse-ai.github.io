---
nav:
  title: Docs
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
title: Data
order: -1
toc: content
---

## ⏬ Data

#### Download

- Method 1: Download the zip file (you can also simply open the following link with the browser):

  ```
  wget https://huggingface.co/datasets/codefuse-admin/devopseval-exam/resolve/main/devopseval-exam.zip
  ```

  then unzip it and you may load the data with pandas:

  ```
  import os
  import pandas as pd

  File_Dir="devopseval-exam"
  test_df=pd.read_csv(os.path.join(File_Dir,"test","UnitTesting.csv"))
  ```

- Method 2: Directly load the dataset using [Hugging Face datasets](https://huggingface.co/datasets/codefuse-admin/devopseval-exam):

  ````python
  from datasets import load_dataset
  dataset=load_dataset(r"DevOps-Eval/devopseval-exam",name="UnitTesting")

  print(dataset['val'][0])
  # {"id": 1, "question": "单元测试应该覆盖以下哪些方面？", "A": "正常路径", "B": "异常路径", "C": "边界值条件"，"D": 所有以上，"answer": "D", "explanation": ""}  ```

  ````

- Method 3: Use [modelscope](https://modelscope.cn/datasets/codefuse-ai/devopseval-exam/files) download all datas。Examples：
  ````python
  from modelscope.msdatasets import MsDataset
  MsDataset.clone_meta(dataset_work_dir='./xxx', dataset_id='codefuse-ai/devopseval-exam')```
  ````

#### 👀 Notes

To facilitate usage, we have organized the category name handlers and English/Chinese names corresponding to 55 subcategories. Please refer to [category_mapping.json](./categroy_mapping) for details. The format is:

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
  "English Name",
  "Chinese Name",
  "Sample Number",
  "Supercatagory Label(PLAN,CODE,BUILD,TEST,RELEASE,DEPOLY,OPERATE,MONITOR choose 1 out of 8)"
  ]
}
```

Each subcategory consists of two splits: dev and test. The dev set per subcategory consists of five exemplars with explanations for few-shot evaluation. And the test set is for model evaluation. Labels on the test split are also released.

Below is a dev example from 'version control':

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

#### 🔥 AIOps Sample Example

👀 👀 Taking **log parsing** and **time series anomaly detection** as examples, here is a brief showcase of the AIOps samples:

LogParsing

```
id: 0
question:
Here are some running logs
 0 04:21:15,429 WARN Cannot open channel to 2 at election address /10.10.34.12:3888
 1 19:18:56,377 WARN ******* GOODBYE /10.10.34.11:52703 ********
 2 19:13:46,128 WARN ******* GOODBYE /10.10.34.11:52308 ********
 3 19:16:26,268 WARN ******* GOODBYE /10.10.34.11:52502 ********
 4 09:11:16,012 WARN Cannot open channel to 3 at election address /10.10.34.13:3888
 5 16:37:13,837 WARN Cannot open channel to 2 at election address /10.10.34.12:3888
 6 09:09:16,008 WARN Cannot open channel to 3 at election address /10.10.34.13:3888
 7 15:27:03,681 WARN Cannot open channel to 3 at election address /10.10.34.13:3888
The first three parts of the log are index, timestamp, and log level. Without considering these three parts, Here we assume that the variables in the logs are represented as '<*>', separated by spaces between tokens. What is the specific log template for the above logs?
A: Notification time out: <*> 和 Connection broken for id <*>, my id = <*>, error =
B: Send worker leaving thread 和 Connection broken for id <*>, my id = <*>, error =
C: Received connection request /<*>:<*> 和 Interrupting SendWorker
D: Cannot open channel to <*> at election address /<*>:<*> 和 ******* GOODBYE /<*>:<*> ********
answer: D
explanation: The log includes the fixed template fragments "Cannot open channel to <> at election address /<>:<>" and "****** GOODBYE /<>:<> ********," both of which appear in option D. Meanwhile, the template fragments in the other options do not match the content in the log. Therefore, option D is the most consistent with the log template.
```

TimeSeriesAnomalyDetection

```
id: 0
question:
Analyze the following time series
[50,62,74,84,92,97,99,98,94,87,77,65,265,40,28,17,8,3,0,0,4,10,20,31,43,56,68,79,89,95,99,99,96,91,82,71,59,46,34,22,12,5,1,0,2,7,15,25,37,49]
Please identify the indices of obvious outlier points. Outlier points generally refer to points that significantly deviate from the overall trend of the data.
A: 46
B: 0
C: 37
D: 12
answer: D
explanation: According to the analysis, the value 265 in the given time series at 12 o'clock is significantly larger than the surrounding data, indicating a sudden increase phenomenon. Therefore, selecting option D is correct.
```

#### 🔧 ToolLearning Sample Example

👀 👀The data format of ToolLearning samples is compatible with OpenAI's Function Calling.

Please refer to [tool_learning_info.md](/docs/developer-docs/CodeFuse-DevOps-Eval/master/tool_learning_info_zh) for details.
Tool Learning Data Evalution see [tool_learning_evalution.md](/docs/developer-docs/CodeFuse-DevOps-Eval/master/tool_learning_evalution)。
<br>
