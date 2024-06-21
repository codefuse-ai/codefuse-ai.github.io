---
nav:
  title: Docs
  order: -1
  second:
    title: Developer-Docs
    order: -1
store:
  title: CodeFuse-MFT-VLM
  version: main
group:
  title: 🌱 CodeFuse-MFT-VLM
  index: true
  order: -1
title: CodeFuse-MFT-VLM
order: -1
toc: content
github: https://github.com/codefuse-ai/CodeFuse-MFT-VLM
---

## CodeFuse-VLM

CodeFuse-VLM 是一个多模态大语言模型框架，该框架为用户提供多种视觉编码器，模态对齐模块和大语言模型的选择，以适配用户对不同任务的需求。

随着 huggingface 开源社区的不断更新，会有更多的 vision encoder 和 LLM 底座发布，这些 vision encoder 和 LLM 底座都有各自的强项，例如 code-llama 适合生成代码类任务，但是不适合生成中文类的任务；因此我们搭建了 CodeFuse-VLM 框架，支持多种视觉模型和语言大模型，使得 CodeFuse-VLM 可以适应不同种类的任务。

![img.jpg](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*t7OIS58EJmIAAAAAAAAAAAAADlHYAQ/original)

我们在 CodeFuse-VLM 框架下, 使用 Qwen-VL 的视觉编码器, cross attention 模态对齐模块, 和 Qwen-14B 模型训练了 CodeFuse-VLM-14B

CodeFuse-VLM-14B 在多个 benchmarks 上的性能超过了 Qwen-VL 和 LLAVA-1.5
![img.jpg](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*BuIrRZd62ssAAAAAAAAAAAAADlHYAQ/original)

各个模型得分如下表所示:
模型 | MMBench | MMBench-CN | VqaV2 | GQA | TextVQA | Vizwiz
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
LLAVA-1.5 | 67.7 | 63.6 | 80.0 | 63.3 | 61.3 | 53.6
Qwen-VL | 60.6 | 56.7 | 78.2 | 57.5 | 63.8 | 38.9
CodeFuse-VLM-14B | 75.7 | 69.8 | 79.3 | 59.4 | 63.9 | 45.3

我们的模型在 MMBenchmark 多模态大模型榜单上取得了很高的排名: https://mmbench.opencompass.org.cn/leaderboard

这是我们模型的展示视频

<video controls width="1000">
 <source src="https://gw.alipayobjects.com/v/huamei_bvbxju/afts/video/A*JvbPT4LR7fcAAAAAAAAAAAAADlHYAQ" type="video/mp4" />
</video>
