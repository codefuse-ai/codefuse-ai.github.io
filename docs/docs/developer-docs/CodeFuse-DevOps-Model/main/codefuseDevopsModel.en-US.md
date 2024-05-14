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
DevOps-Model is a large language model for the Chinese DevOps field jointly released by Ant Group and Peking University. By collecting professional data related to the DevOps domain and conducting additional training and alignment on the model, a large model has been produced to help engineers enhance efficiency throughout the entire development and operations lifecycle. This fills the current gap in large models within the DevOps domain, with the aim to provide solutions to any problems by asking DevOps-Model!
We have now open-sourced two versions of the model, the Base model with additional training and the Chat model after alignment, in both 7B and 14B specifications, as well as the corresponding training code. We welcome everyone to collaborate and contribute!

## Project Address
GitHub Address: https://github.com/codefuse-ai/CodeFuse-DevOps-Model/tree/main
ModelScope Address:

- DevOps-Model-7B-Base: https://modelscope.cn/models/codefuse-ai/CodeFuse-DevOps-Model-7B-Base/summary
- DevOps-Model-7B-Chat: https://modelscope.cn/models/codefuse-ai/CodeFuse-DevOps-Model-7B-Chat/summary
- DevOps-Model-14B-Base: https://modelscope.cn/models/codefuse-ai/CodeFuse-DevOps-Model-14B-Base/summary
- DevOps-Model-14B-Chat: https://modelscope.cn/models/codefuse-ai/CodeFuse-DevOps-Model-14B-Chat/summary

## Evaluation Questions
For model evaluation, there was initially no benchmark for testing in the DevOps domain, so we first selected some domain-related multiple-choice questions from general open-source tests for evaluation. The specific test data is as follows:

|Dataset	|Subject	|Total Questions|
| ---- | --------- | ----- |
|CMMLU	|Computer science	204|
|Computer |security	|171|
|Machine |learning	|122|
|CEval	|college programming|	37|
|CEval	|computer_architecture|	21|
|CEval	|computer_network	|19|
|总计	|总计题目数	|574|


## Evaluation Methods
Since all are multiple-choice questions, we adopted the method of selecting the highest-scoring Token among the four option Tokens in the first Token produced by the model as the model's answer to the question. We also tested Zero-shot and Five-shot results.


## Evaluation Results
![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*8RCfS6OraH4AAAAAAAAAAAAADlHYAQ/original)

The specific scores are shown in the table below:

|Scale of Parameters	|Model	|Model Size	|Zero-shot Score	|Five-shot Score|
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
