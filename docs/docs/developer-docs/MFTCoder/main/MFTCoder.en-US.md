---
nav:
  title: Docs
  order: -1
  second:
    title: Developer-Docs
    order: -1
store:
  title: MFTCoder
  version: main
group:
  title: 🌱 MFTCoder
  index: true
  order: -1
title: MFTCoder
order: -1
toc: content
---

<div align="center">

<p>
    🤗 <a href="https://huggingface.co/codefuse-ai" target="_blank">HuggingFace
    </a>• 🤖<a href="https://modelscope.cn/organization/codefuse-ai" target="_blank"> ModelScope
    </a>
</p>

</div>



## Contents
- [News](#News)
- [Articles](#Articles)
- [Introduction](#Introduction)
- [Requirements](#Requirements)
- [Training](#Training)
- [Models](#Models)
- [Datasets](#Datasets)
- [Star History](#Star-History)


## News
🔥🔥🔥 [2024/01/17] We released MFTCoder v0.3.0, mainly for MFTCoder-accelerate. It now supports new models like Mixtral(MoE), DeepSeek-coder, chatglm3. It supports FSDP as an option. It also supports Self-paced Loss as a solution for convergence balance in Multitask Fine-tuning.

🔥🔥🔥 [2024/01/17] [CodeFuse-DeepSeek-33B](https://huggingface.co/codefuse-ai/CodeFuse-DeepSeek-33B) has been released, achieving a pass@1 (greedy decoding) score of 78.7% on HumanEval. It lists as top-1 LLM on Bigcode Leardboard in terms of win-rate, the official result is going to be published later.

🔥🔥🔥 [2024/01/17] [CodeFuse-Mixtral-8x7B](https://huggingface.co/codefuse-ai/CodeFuse-Mixtral-8X7B) has been released, achieving a pass@1 (greedy decoding) score of 56.1% on HumanEval.

🔥🔥 [2023/11/07] [MFTCoder Paper](https://arxiv.org/abs/2311.02303) has been released on Arxiv, which discloses technique details of multi-task-fine-tuning.

🔥🔥 [2023/10/20] [CodeFuse-QWen-14B](https://huggingface.co/codefuse-ai/CodeFuse-QWen-14B) has been released, achieving a pass@1 (greedy decoding) score of 48.8% on HumanEval, which gains 16% absolute improvement over the base model [Qwen-14b](https://huggingface.co/Qwen/Qwen-14B)

🔥🔥 [2023/09/27] [CodeFuse-StarCoder-15B](https://huggingface.co/codefuse-ai/CodeFuse-StarCoder-15B) has been released, achieving a pass@1 (greedy decoding) score of 54.9% on HumanEval.

🔥🔥 [2023/09/26]We are pleased to announce the release of the [4-bit quantized version of CodeFuse-CodeLlama-34B](https://huggingface.co/codefuse-ai/CodeFuse-CodeLlama-34B-4bits). Despite the quantization process, the model still achieves a remarkable 73.8% accuracy (greedy decoding) on the HumanEval pass@1 metric.

🔥🔥 [2023/09/07]We released [**CodeFuse-CodeLlama-34B**](https://huggingface.co/codefuse-ai/CodeFuse-CodeLlama-34B-4bits), which achieves the **74.4% Python Pass@1** (greedy decoding) and surpasses GPT4 (2023/03/15) and ChatGPT-3.5 on the [HumanEval Benchmarks](https://github.com/openai/human-eval).

🔥🔥 [2023/08/26]We released MFTCoder-v0.1.0 which supports finetuning Code Llama, Llama, Llama2, StarCoder, ChatGLM2, CodeGeeX2, Qwen, and GPT-NeoX models with LoRA/QLoRA.

### HumanEval Performance
| Model                       | HumanEval(Pass@1) |  Date   | 
|:----------------------------|:-----------------:|:-------:|
| **CodeFuse-DeepSeek-33B**        |     **78.7%**     | 2024/01 |
| **CodeFuse-CodeLlama-34B**       |     **74.4%**     | 2023/09 |
| **CodeFuse-CodeLlama-34B-4bits** |     **73.8%**     | 2023/09 |
| WizardCoder-Python-34B-V1.0      |       73.2%       | 2023/08 |
| GPT-4(zero-shot)                 |       67.0%       | 2023/03 |
| PanGu-Coder2 15B                 |       61.6%       | 2023/08 |
| **CodeFuse-Mixtral-8x7B**        |     **56.1%**     | 2024/01 |
| **CodeFuse-StarCoder-15B**       |     **54.9%**     | 2023/08 |
| CodeLlama-34b-Python             |       53.7%       | 2023/08 |
| **CodeFuse-QWen-14B**            |     **48.8%**     | 2023/10 |
| CodeLlama-34b                    |       48.8%       | 2023/08 |
| GPT-3.5(zero-shot)               |       48.1%       | 2022/11 |
| OctoCoder                        |       46.2%       | 2023/08 |
| StarCoder-15B                    |       33.6%       | 2023/05 |
| QWen-14B                         |       32.3%       | 2023/10 |


## Articles
[MFT Arxiv paper](https://arxiv.org/abs/2311.02303)

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


## Contributing
Contributions are welcome! If you have any suggestions, ideas, bug reports, or new model/feature supported, please open an issue or submit a pull request.

## Citation
If you find our work useful or helpful for your R&D works, please feel free to cite our paper as below.
```
@article{mftcoder2023,
      title={MFTCoder: Boosting Code LLMs with Multitask Fine-Tuning}, 
      author={Bingchang Liu and Chaoyu Chen and Cong Liao and Zi Gong and Huan Wang and Zhichao Lei and Ming Liang and Dajun Chen and Min Shen and Hailian Zhou and Hang Yu and Jianguo Li},
      year={2023},
      journal={arXiv preprint arXiv},
      archivePrefix={arXiv},
      eprint={2311.02303}
}
```

