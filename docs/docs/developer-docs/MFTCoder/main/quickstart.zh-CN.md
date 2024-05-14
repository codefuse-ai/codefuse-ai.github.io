---
store:
  title: MFTCoder
  version: main
group:
  title: 🌱 MFTCoder
  order: -1
title: 快速使用
order: 1
toc: content
---

## 环境
首先, 你需要将CUDA(>=11.4, 推荐11.7)及其相关驱动安装成功，并确保其工作正常, 并且安装基本的torch（>=2.0.0）
在requirements.txt下固定了几个主要的python包的版本，执行如下脚本即可：
```bash
sh init_env.sh
```
我们强烈建议您安装flash attention（>=2.1.0, 推荐2.3.6）, 安装请参考 https://github.com/Dao-AILab/flash-attention

## 训练
如果你熟悉大模型训练的各种主流开源资源，例如 ```transformers```, ```DeepSpeed```, ```FSDP```等， 为了用开源项目快速上手高性能微调，我们建议您尝试：

🚀🚀 [MFTCoder-accelerate: Accelerate + DeepSpeed/FSDP Codebase for MFT(Multi-task Finetuning)](./accelerate.zh-CN.md)


如果你想探索一些新兴的训练框架，可以尝试：

🚀 [MFTCoder-atorch: Atorch Codebase for MFT(Multi-task Finetuning)](./atorch.zh-CN.md)


## 模型

使用本项目的训练代码，以及上述训练数据，我们训练并在huggingface, modelscope开源了以下模型。

| 模型                                   | HuggingFace链接                                                             | 魔搭 链接                                                                           | 基座模型                 | 训练数据 | Batch Size | Seq Length |
|--------------------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------------|----------------------|------|------------|------------|
| 🔥🔥🔥  CodeFuse-DeepSeek-33B        | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-DeepSeek-33B)        | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-DeepSeek-33B)        | DeepSeek-coder-33B   | 60万  | 80         | 4096       |
| 🔥🔥🔥  CodeFuse-Mixtral-8x7B        | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-Mixtral-8x7B)        | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-Mixtral-8x7B)        | Mixtral-8x7B         | 60万  | 80         | 4096       |
| 🔥🔥🔥  CodeFuse-CodeLlama-34B       | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-CodeLlama-34B)       | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-CodeLlama-34B)       | CodeLlama-34b-Python | 60万  | 80         | 4096       |
| 🔥🔥🔥  CodeFuse-CodeLlama-34B-4bits | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-CodeLlama-34B-4bits) | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-CodeLlama-34B-4bits) | CodeLlama-34b-Python |   |          | 4096       |
| 🔥🔥🔥  CodeFuse-StarCoder-15B       | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-StarCoder-15B)       | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-StarCoder-15B)       | StarCoder-15B        | 60万  | 80         | 4096       |
| 🔥🔥🔥  CodeFuse-QWen-14B            | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-QWen-14B)            | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-QWen-14B)            | Qwen-14b             | 110万                    | 256         | 4096       | 
| 🔥🔥🔥  CodeFuse-CodeGeex2-6B        | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-CodeGeex2-6B)        | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-CodeGeex2-6B)        | CodeGeex2-6B         | 110万                    | 256         | 4096       | 




## 数据集
目前本项目主要整理了如下指令数据集，并将其整理成统一的数据格式，这两个指令微调数据集是我们多任务训练中数十个任务中的2个，未来我们会陆续开源更多的代码任务指令微调数据集：

| 数据集                                                           | 介绍                                                                 |
|---------------------------------------------------------------|--------------------------------------------------------------------|
| [⭐ Evol-instruction-66k](https://huggingface.co/datasets/codefuse-ai/Evol-instruction-66k)    | 基于开源open-evol-instruction-80k过滤低质量，重复和human eval相似的数据后得到的高质量代码类微调数据 |
| [⭐ CodeExercise-Python-27k](https://huggingface.co/datasets/codefuse-ai/CodeExercise-Python-27k) | 高质量python练习题数据         
