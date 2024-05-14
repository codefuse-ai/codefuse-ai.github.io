---
nav:
  title: Docs
  order: -1
  second:
    title: Developer-Docs
    order: -1
store:
  title: CodeFuse-DevOps-Model
  version: main
group:
  title: 🌱 CodeFuse-DevOps-Model
  index: true
  order: -1
title: CodeFuse-DevOps-Model
order: -1
toc: content
---

## codeFuse-devops-model
DevOps-Model 是蚂蚁集团联合北京大学发布面向中文 DevOps 领域的大语言模型，通过收集 DevOps 领域相关的专业数据，再针对模型进行语言模型的加训和对齐训练，产出可以帮助工程师在整个开发运维生命周期提效的大模型。弥补当前大模型在 DevOps 领域的缺失，旨在做到有问题，问 DevOps-Model ! 

当前我们已经开源了 7B 和 14B 两种规格的经过加训得 Base 模型和经过对齐后的 Chat 模型，同时还开源了对应的训练代码，欢迎大家一起合作建设！


## 项目地址
Github 地址：https://github.com/codefuse-ai/CodeFuse-DevOps-Model/tree/main

ModelScope 地址：
- DevOps-Model-7B-Base：https://modelscope.cn/models/codefuse-ai/CodeFuse-DevOps-Model-7B-Base/summary
- DevOps-Model-7B-Chat：https://modelscope.cn/models/codefuse-ai/CodeFuse-DevOps-Model-7B-Chat/summary
- DevOps-Model-14B-Base：https://modelscope.cn/models/codefuse-ai/CodeFuse-DevOps-Model-14B-Base/summary
- DevOps-Model-14B-Chat：https://modelscope.cn/models/codefuse-ai/CodeFuse-DevOps-Model-14B-Chat/summary

## 评测考题
针对模型评测，最初并没有这样的一个 benchmark 用来 DevOps 领域进行测试，所以我们首先选用了一些通用开源测试中和 DevOps 领域相关的选择题进行测试，具体测试数据如下：
|数据集	|考试科目	|题目总数|
| ---- | --------- | ----- |
|CMMLU	|Computer science	204|
|Computer |security	|171|
|Machine |learning	|122|
|CEval	|college programming|	37|
|CEval	|computer_architecture|	21|
|CEval	|computer_network	|19|
|总计	|总计题目数	|574|



## 评测方式
由于都是单选题,我们采用的是选取模型产出的第一个 Token 中四个选项 Token 中得分最高的作为模型对于问题的回答。同时我们还测试了 Zero-shot 和 Five-shot 的结果。


## 评测结果
![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*8RCfS6OraH4AAAAAAAAAAAAADlHYAQ/original)

具体的得分如下表所示：
|参数量级|	模型	|模型大小	|Zero-shot 得分	|Five-shot 得分|
| - |	----	| ---	| ----	| ---- |
|10+ B|	DevOps-Model-14B-Base	|14B	|70.73	|73.00|
|10+ B|Qwen-14B-Base	|14B	|69.16|	71.25|
|10+ B|Baichuan2-13B-Base	|13B	|55.75|	61.15|
|10+ B|DevOps-Model-14B-Chat|	14B	|74.04	|75.96|
|10+ B|Qwen-14B-Chat	|14B	|69.16|	70.03|
|10+ B|Baichuan2-13B-Chat	|13B	|52.79	|55.23|
|7B|	DevOps-Model-7B-Base|	7B	|62.72|	62.02|
|7B|Qwen-7B-Base|	7B|	55.75|	56.0|
|7B|Baichuan2-7B-Base|	7B	|49.30|	55.4|
|7B|Internlm-7B-Base	|7B	|47.56	|52.6|
|7B|DevOps-Model-7B-Chat|	7B	|62.20|	64.11|
|7B|Qwen-7B-Chat|	7B	|46.00	|52.44|
|7B|Baichuan2-7B-Chat|	7B|	52.26|	54.46|
|7B|Internlm-7B-Chat	|7B	|52.61	|55.75|
