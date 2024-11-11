---
store:
  title: CodeFuse-MFT-VLM
  version: main
group:
  title: 🌱 CodeFuse-MFT-VLM
  order: -1
title: QuickStart
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

Please run sh init_env.sh

## Datasets

Here's the table of datasets we used to train CodeFuse-VLM-14B:

| Dataset                                         | Task Type                   | Number of Samples |
| ----------------------------------------------- | --------------------------- | ----------------- |
| synthdog-en                                     | OCR                         | 800,000           |
| synthdog-zh                                     | OCR                         | 800,000           |
| cc3m(downsampled)                               | Image Caption               | 600,000           |
| cc3m(downsampled)                               | Image Caption               | 600,000           |
| SBU                                             | Image Caption               | 850,000           |
| Visual Genome VQA (Downsampled)                 | Visual Question Answer(VQA) | 500,000           |
| Visual Genome Region descriptions (Downsampled) | Reference Grouding          | 500,000           |
| Visual Genome objects (Downsampled)             | Grounded Caption            | 500,000           |
| OCR VQA (Downsampled)                           | OCR and VQA                 | 500,000           |

Please download these datasets on their own official websites.

## Multimodal Alignment

Please run sh scripts/pretrain.sh or sh scripts/pretrain_multinode.sh

## Visual Instruction Tuning

Please run sh scripts/finetune.sh or sh scripts/finetune_multinode.sh

## Evaluation

Please run python scripts in directory llava/eval/. Our pre-trained CodeFuse-VLM-14B can be loaded with the following code:

```
import os
from llava.model.builder import load_mixed_pretrained_model

model_path = '/pretrained/model/path'
tokenizer, model, image_processor, context_len = load_mixed_pretrained_model(model_path, None, 'qwen-vl-14b', os.path.join(model_path, 'Qwen-VL-visual'), 'cross_attn', os.path.join(model_path, 'mm_projector/mm_projector.bin'))
```

You can also run scripts/merge_qwen_vl_weights.sh first and load the merged model by the following code:

```
from llava.model import LlavaQWenForCausalLM

model = LlavaQWenForCausalLM.from_pretrained('/path/to/our/pretrained/model')
```

## CodeFuse-VLM Product Video

Here's the demo video of front-end code copilot backed by our VLM model

<video controls width="1000">
 <source src="https://gw.alipayobjects.com/v/huamei_bvbxju/afts/video/A*jy7aQbVM8BkAAAAAAAAAAAAADlHYAQ" />
</video>
