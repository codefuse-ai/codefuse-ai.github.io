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
---

## Contents
- [Install](#Install)
- [Datasets](#Datasets)
- [Multimodal Alignment](#Multimodal-Alignment)
- [Visual Instruction Tuning](#Visual-Instruction-Tuning)
- [Evaluation](#Evaluation)

## Install
Please run sh init\_env.sh 

## Datasets
Here's the table of datasets we used to train CodeFuse-VLM-14B:

Dataset | Task Type | Number of Samples 
| ------------- | ------------- | ------------- |
synthdog-en | OCR | 800,000
synthdog-zh	| OCR | 800,000
cc3m(downsampled)| Image Caption | 600,000
cc3m(downsampled)| Image Caption | 600,000
SBU | Image Caption | 850,000
Visual Genome VQA (Downsampled) | Visual Question Answer(VQA) | 500,000
Visual Genome Region descriptions (Downsampled) | Reference Grouding | 500,000
Visual Genome objects (Downsampled) | Grounded Caption | 500,000
OCR VQA (Downsampled) | OCR and VQA | 500,000

Please download these datasets on their own official websites.

## Multimodal Alignment
Please run sh scripts/pretrain.sh or sh scripts/pretrain\_multinode.sh

## Visual Instruction Tuning
Please run sh scripts/finetune.sh or sh scripts/finetune\_multinode.sh

## Evaluation
Please run python scripts in directory llava/eval/. Our pre-trained CodeFuse-VLM-14B can be loaded with the following code:

```
import os
from llava.model.builder import load_mixed_pretrained_model

model_path = '/pretrained/model/path'
tokenizer, model, image_processor, context_len = load_mixed_pretrained_model(model_path, None, 'qwen-vl-14b', os.path.join(model_path, 'Qwen-VL-visual'), 'cross_attn', os.path.join(model_path, 'mm_projector/mm_projector.bin'))
```

You can also run scripts/merge\_qwen\_vl\_weights.sh first and load the merged model by the following code:

```
from llava.model import LlavaQWenForCausalLM

model = LlavaQWenForCausalLM.from_pretrained('/path/to/our/pretrained/model')
```

## CodeFuse-VLM Product Video
Here's the demo video of front-end code copilot backed by our VLM model

https://private-user-images.githubusercontent.com/22836551/300398424-201f667d-6b6b-4548-b3e6-724afc4b3071.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDY1MjE5MTIsIm5iZiI6MTcwNjUyMTYxMiwicGF0aCI6Ii8yMjgzNjU1MS8zMDAzOTg0MjQtMjAxZjY2N2QtNmI2Yi00NTQ4LWIzZTYtNzI0YWZjNGIzMDcxLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMjklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTI5VDA5NDY1MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI0ZmJmZWNlNDZmNWM3NzA0OThlMmY1ODY4MDkxNWY5ZWNiNzRiYjJkYmE4NjEzM2EwYWRiNWY2ODc3N2ViYjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.BIvWGNx0XV7RoauxB0c2noEdbfZfu8-16LPHtCaCJ9k
