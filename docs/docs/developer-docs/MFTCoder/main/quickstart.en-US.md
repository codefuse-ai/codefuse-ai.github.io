---
store:
  title: MFTCoder
  version: main
group:
  title: 🌱 MFTCoder
  order: -1
title: QuickStart
order: 1
toc: content
---

## Requirements
To begin, ensure that you have successfully installed CUDA (version >= 11.4, preferably 11.7) along with the necessary drivers. Additionally, make sure you have installed torch (version 2.0.1).

Next, we have provided an init_env.sh script to simplify the installation of required packages. Execute the following command to run the script:
```bash
sh init_env.sh
```
We highly recommend training with flash attention(version >= 2.1.0, preferably 2.3.6), please refer to the following link for installation instructions: https://github.com/Dao-AILab/flash-attention


## Training
As mentioned above, we open source two training frameworks. You could refer to their own READMEs for more details as followed. 

If you are familiar with open source ```transformers```, ```DeepSpeed``` or ```FSDP```, we highly recommend you try:

🚀🚀 [**MFTCoder-accelerate: Accelerate + Deepspeed/FSDP Codebase for MFT(Multi-task Finetuning)**](./accelerate.en-US.md)


If you want to explore some new framework like atorch, you could check:

🚀 [MFTCoder-atorch: Atorch Codebase for MFT(Multi-task Finetuning)](./atorch.en-US.md)


## Models

We are excited to release the following two CodeLLMs trained by MFTCoder, now available on both HuggingFace and ModelScope:


| Model                                 | HuggingFace Links                                                         | ModelScope Links                                                                | Base Model         | Num of examples trained | Batch Size | Seq Length | 
|--------------------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------------|----------------------|------|------------|------------|
| 🔥  CodeFuse-DeepSeek-33B        | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-DeepSeek-33B)        | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-DeepSeek-33B)        | DeepSeek-coder-33B   | 60万  | 80         | 4096       |
| 🔥  CodeFuse-Mixtral-8x7B       | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-Mixtral-8x7B)        | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-Mixtral-8x7B)        | Mixtral-8x7B         | 60万  | 80         | 4096       |
| 🔥  CodeFuse-CodeLlama-34B       | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-CodeLlama-34B)       | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-CodeLlama-34B)       | CodeLlama-34b-Python | 60万  | 80         | 4096       |
| 🔥  CodeFuse-CodeLlama-34B-4bits | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-CodeLlama-34B-4bits) | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-CodeLlama-34B-4bits) | CodeLlama-34b-Python |   |          | 4096       |
| 🔥  CodeFuse-StarCoder-15B     | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-StarCoder-15B)       | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-StarCoder-15B)       | StarCoder-15B        | 60万  | 80         | 4096       |
| 🔥  CodeFuse-QWen-14B           | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-QWen-14B)            | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-QWen-14B)            | Qwen-14b             | 110万                    | 256         | 4096       | 
| 🔥  CodeFuse-CodeGeex2-6B       | [h-link](https://huggingface.co/codefuse-ai/CodeFuse-CodeGeex2-6B)        | [m-link](https://modelscope.cn/models/codefuse-ai/CodeFuse-CodeGeex2-6B)        | CodeGeex2-6B         | 110万                    | 256         | 4096       | 


## Datasets
We are also pleased to release two code-related instruction datasets, meticulously selected from a range of datasets to facilitate multitask training. Moving forward, we are committed to releasing additional instruction datasets covering various code-related tasks.

| Dataset                                                                                 | Description      |
|-----------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [⭐ Evol-instruction-66k](https://huggingface.co/datasets/codefuse-ai/Evol-instruction-66k)    | Based on open-evol-instruction-80k, filter out low-quality, repeated, and similar instructions to HumanEval, thus get high-quality code instruction dataset. |
| [⭐ CodeExercise-Python-27k](https://huggingface.co/datasets/codefuse-ai/CodeExercise-Python-27k) | python code exercise instruction dataset                                                                                                |
