---
store:
  title: CodeFuse-MFT-VLM
  version: main
group:
  title: 🌱 CodeFuse-MFT-VLM
  order: -1
title: 快速使用
order: 0
toc: content
github: https://github.com/codefuse-ai/CodeFuse-MFT-VLM
---

## Contents

- [Install](#Install)
- [Datasets](#Datasets)
- [Multimodal Alignment](#Multimodal-Alignment)
- [Visual Instruction Tuning](#Visual-Instruction-Tuning)
- [Evaluation](#Evaluation)

## Install

请执行 sh init_env.sh

## Datasets

使用了以下数据集训练模型:

| 数据集                                          | 任务种类                    | 样本量  |
| ----------------------------------------------- | --------------------------- | ------- |
| synthdog-en                                     | OCR                         | 800,000 |
| synthdog-zh                                     | OCR                         | 800,000 |
| cc3m(downsampled)                               | Image Caption               | 600,000 |
| cc3m(downsampled)                               | Image Caption               | 600,000 |
| SBU                                             | Image Caption               | 850,000 |
| Visual Genome VQA (Downsampled)                 | Visual Question Answer(VQA) | 500,000 |
| Visual Genome Region descriptions (Downsampled) | Reference Grouding          | 500,000 |
| Visual Genome objects (Downsampled)             | Grounded Caption            | 500,000 |
| OCR VQA (Downsampled)                           | OCR and VQA                 | 500,000 |

请到各个数据集的官网上下载这些数据。

## Multimodal Alignment

请执行 sh scripts/pretrain.sh 或者 sh scripts/pretrain_multinode.sh

## Visual Instruction Tuning

请执行 sh scripts/finetune.sh 或者 sh scripts/finetune_multinode.sh

## Evaluation

请执行 llava/eval/ 当中的 python 脚本. 可以通过下面的代码来加载我们预训练的 CodeFuse-VLM-14B:

```
import os
from llava.model.builder import load_mixed_pretrained_model

model_path = '/pretrained/model/path'
tokenizer, model, image_processor, context_len = load_mixed_pretrained_model(model_path, None, 'qwen-vl-14b', os.path.join(model_path, 'Qwen-VL-visual'), 'cross_attn', os.path.join(model_path, 'mm_projector/mm_projector.bin'))
```

您也可以先运行下面的脚本来合并各个模型组件：scripts/merge_qwen_vl_weights.sh，然后通过下面的代码加载合并后的模型：

```
from llava.model import LlavaQWenForCausalLM

model = LlavaQWenForCausalLM.from_pretrained('/path/to/our/pretrained/model')
```

## CodeFuse-VLM 产品视频

这是我们模型支持的产品的视频

<video controls width="1000">
 <source src="https://private-user-images.githubusercontent.com/22836551/300398424-201f667d-6b6b-4548-b3e6-724afc4b3071.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDY1MjE5MTIsIm5iZiI6MTcwNjUyMTYxMiwicGF0aCI6Ii8yMjgzNjU1MS8zMDAzOTg0MjQtMjAxZjY2N2QtNmI2Yi00NTQ4LWIzZTYtNzI0YWZjNGIzMDcxLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTI5VDA5NDY1MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI0ZmJmZWNlNDZmNWM3NzA0OThlMmY1ODY4MDkxNWY5ZWNiNzRiYjJkYmE4NjEzM2EwYWRiNWY2ODc3N2ViYjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.BIvWGNx0XV7RoauxB0c2noEdbfZfu8-16LPHtCaCJ9k" type="video/mp4" />

</video>
