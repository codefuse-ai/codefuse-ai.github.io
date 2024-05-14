---
store:
  title: MFTCoder
  version: main
group:
  title: 🌱 MFTCoder
  order: -1
title: 基本介绍
order: 0
toc: content
---

## 项目简介
**国际首个高精度、高效率、多任务、多模型支持、多训练算法，大模型代码能力微调框架；**

**Codefuse-MFTCoder** 是一个开源的多任务代码大语言模型项目，包含代码大模型的模型、数据、训练等。我们希望通过开源，分享交流大语言模型在代码领域的进步。

### 项目框架
![img_1.jpg](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*zc9pRJ-hdZMAAAAAAAAAAAAADlHYAQ/original)

### 项目优势
:white_check_mark: **多任务**：一个模型同时支持多个任务，会保证多个任务之间的平衡，甚至可以泛化到新的没有见过的任务上去；

:white_check_mark: **多模型**：支持最新的多个开源模型，包括gpt-neox，llama，llama-2，baichuan，Qwen，chatglm2等；

:white_check_mark: **多框架**：既支持主流开源的Accelerate+DeepSpeed/FSDP，也支持新开源的[ATorch 框架](https://github.com/intelligent-machine-learning/dlrover)；

:white_check_mark: **高效微调**：支持LoRA和QLoRA，可以用很少的资源去微调很大的模型，且训练速度能满足几乎所有微调场景；


本项目主要内容如下：
- 同时支持单任务SFT(Supervised FineTuning)和MFT(Multi-task FineTuning), 当前开源支持数据均衡，未来将持续开源难易均衡， 收敛均衡等
- 支持QLoRA低成本高效指令微调、LoRA高效指令微调、全量参数高精度微调。
- 支持绝大部分主流的开源大模型，重点关注代码能力优秀的开源大模型，如DeepSeek-coder, Mistral, Mistral(MoE), Chatglm3, Qwen, GPT-Neox, Starcoder, Codegeex2, Code-LLaMA等。
- 支持lora与base model进行权重合并，推理更便捷。
- 整理并开源2个指令微调数据集：[Evol-instruction-66k](https://huggingface.co/datasets/codefuse-ai/Evol-instruction-66k)和[CodeExercise-Python-27k](https://huggingface.co/datasets/codefuse-ai/CodeExercise-Python-27k)。
- 开源多个[Codefuse系列指令微调模型权重]，具体参见我们的huggingface组织和modelscope组织下的模型：[codefuse-ai huggingface](https://huggingface.co/codefuse-ai) or [codefuse-ai 魔搭](https://modelscope.cn/organization/codefuse-ai)。
