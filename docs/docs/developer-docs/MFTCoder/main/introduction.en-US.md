---
store:
  title: MFTCoder
  version: main
group:
  title: 🌱 MFTCoder
  order: -1
title: Introduction
order: 0
toc: content
---

## Introduction

**High Accuracy and efficiency Multi-task Fine-tuning framework for Code LLMs.**

**MFTCoder** is an open-source project of CodeFuse for accurate and efficient Multi-task Fine-tuning(MFT) on Large Language Models(LLMs), especially on Code-LLMs(large language model for code tasks).
Moreover, we open source Code LLM models and code-related datasets along with the MFTCoder framework.

In MFTCoder, we released two codebases for finetuning Large Language Models: 
- **```MFTCoder-accelerate```** is a framework with accelerate and DeepSpeed/FSDP. All tech-stacks are open-source and vibrant. We highly recommend you try this framework and make your fintuning accurate and efficient.
- ```MFTCoder-atorch``` is based on the [ATorch frameworks](https://github.com/intelligent-machine-learning/dlrover), which is a fast distributed training framework of LLM.

The aim of this project is to foster collaboration and share advancements in large language models, particularly within the domain of code development.

### Frameworks
![img.jpg](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*p8ahSYMtrwsAAAAAAAAAAAAADlHYAQ/original)

### Highlights
:white_check_mark: **Multi-task**: Train models on multiple tasks while maintaining a balance between them. The models can even generalize to new, previously unseen tasks.

:white_check_mark: **Multi-model**: It integrates state-of-the-art open-source models such as gpt-neox, llama, llama-2, baichuan, Qwen, chatglm2, and more. (These finetuned models will be released in the near future.)

:white_check_mark: **Multi-framework**: It provides support for both Accelerate (with Deepspeed and FSDP) and ATorch

:white_check_mark: **Efficient fine-tuning**: It supports LoRA, QLoRA as well as Full-parameters training, enabling fine-tuning of large models with minimal resources. The training speed meets the demands of almost all fine-tuning scenarios.

The main components of this project include:
- Support for both SFT (Supervised FineTuning) and MFT (Multi-task FineTuning). The current MFTCoder achieves data balance among multiple tasks, and future releases will achieve a balance between task difficulty and convergence speed during training.
- Support for QLoRA instruction fine-tuning, LoRA fine-tuning as well as Full-parameters fine-tuning.
- Support for most mainstream open-source large models, particularly those relevant to Code-LLMs, such as DeepSeek-coder, Mistral, Mixtral, Chatglm3, Code-LLaMA, Starcoder, Codegeex2, Qwen, GPT-Neox, and more.
- Support for weight merging between the LoRA adaptor and base models, simplifying the inference process.
- Release of 2 high-quality code-related instruction fine-tuning datasets: [Evol-instruction-66k](https://huggingface.co/datasets/codefuse-ai/Evol-instruction-66k) and [CodeExercise-Python-27k](https://huggingface.co/datasets/codefuse-ai/CodeExercise-Python-27k).
- Release of many Code LLMs, please refer to organizations: [codefuse-ai on huggingface](https://huggingface.co/codefuse-ai) or [codefuse-ai on modelscope](https://modelscope.cn/organization/codefuse-ai).

