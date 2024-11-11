---
store:
  title: MFTCoder
  version: main
group:
  title: 🌱 MFTCoder
  order: -1
title: Atorch框架篇
order: 2
toc: content
github: https://github.com/codefuse-ai/MFTCoder
---

[![Generic badge](https://img.shields.io/badge/🤗-Huggingface%20Repo-green.svg)](https://huggingface.co/codefuse-ai)&nbsp;
<a href="https://github.com/codefuse-ai/MFTCoder/blob/main/LICENSE">
<img alt="GitHub" src="https://img.shields.io/github/license/huggingface/transformers.svg?color=blue">
</a>

## 1. 更新

🔥 MFTCoder 在 Atorch 框架下支持 GPTNeoX 模型的微调；

🔥 MFTCoder 支持全量的有监督微调；

🔥 MFTCoder 支持 LoRA 微调；

## 2. 数据格式

### 2.1 训练数据格式

训练数据为 jsonl 格式，每一行的数据格式如下，其中 chat_rounds 字段是必需的，可以根据实际需求添加或删除其他字段。
可以参考项目中的 xxx.jsonl 文件。

```json
{
  "id": 0,
  "data_name": "code-helper",
  "chat_rounds": [
    {
      "role": "system",
      "content": "你是一个智能代码助手，可以回复用户与代码相关的问题",
      "chat_round_id": 0
    },
    {
      "role": "human",
      "content": "写一个快速排序",
      "chat_round_id": 1
    },
    {
      "role": "bot",
      "content": "以下是一个快速排序算法xxxxxx",
      "chat_round_id": 1
    },
    {
      "role": "human",
      "content": "解释一下这段代码",
      "chat_round_id": 2
    },
    {
      "role": "bot",
      "content": "好的，这段代码xxx",
      "chat_round_id": 2
    }
  ]
}
```

### 2.2 推理数据格式

推理数据格式为模型在训练数据格式下拼接的字符串形式，它也是推理时输入 prompt 拼接的方式：

```python
"""
<|role_start|>system<|role_end|>这是System指令
<|role_start|>human<|role_end|>这是第1轮用户输入的问题
<|role_start|>bot<|role_end|>这是第1轮模型生成的内容</s>
<|role_start|>human<|role_end|>这是第2轮用户输入的问题
<|role_start|>bot<|role_end|>这是第2轮模型生成的内容</s>
...
...
...
<|role_start|>human<|role_end|>这是第n轮用户输入的问题
<|role_start|>bot<|role_end|>{模型现在要生成的内容}</s>
"""
```

## 3. 模型训练

目前 "MFTCoder/mft_atorch" 代码库支持全量参数指令微调和 LoRA 指令微调。
目前仅支持 GPTNeoX 模型的训练，理论上，HuggingFace 上开源的 GPTNeoX 模型权重，均可使用本项目进行训练。

我们将训练中使用的各种组件抽取出来，以便后续的扩展和优化，详见主目录下的实现。微调训练的入口目录是`train/`, 训练入口文件是`train/run_train.py`, 参数配置存储在启动脚本`train/run_gpt_*.sh`等文件中，方便统一管理和更改。

### 3.1 数据格式

训练时，我们将多轮对话拼接成如下格式，然后进行 tokenize。其中<|role_start|>human<|role_end|>表示 human 输入提示符，<|role_start|>bot<|role_end|>表示 bot 输出提示符，`</s>` 表示 eos_token。

```
"<|role_start|>human<|role_end|>input1</s>target1</s>input2</s>target2</s>...
```

在计算 loss 时，我们通过 mask 的方式，input 部分的 loss 不参与参数更新，只有“target</s>”部分的 loss 参与参数更新。
这种方式充分利用了模型并行计算的优势，训练更加高效，且多轮对话中的每个 target 部分都参与了训练，训练更充分。
否则，就需要把一个 n 轮对话，拆分成 n 条数据，且只计算最后一个 target 的 loss，大大降低了训练效率。

### 3.2 全量 SFT

执行如下命令即可进行全量 SFT：

```bash
sh run_gpt_mft.sh 10 1 8 5
```

需注意，启动脚本后的四个参数，分别是：

- 第一个参数是总的 per gpu batch size
- 第二个参数是 tensor parallel 数（暂时只支持 1）
- 第三个参数是 data parallel 数，与所用 GPU 数保持一致
- 第四个参数是训练 epoch 数

后面其他的训练方式启动脚本，也同样需要配置这四个参数

### 3.3 LoRA 微调

执行如下命令即可进行 Lora 微调：

```bash
sh run_gpt_mft_peft.sh 10 1 8 5
```

### 3.4 启动脚本中主要参数说明

`train/run_gpt_*.sh`中的主要参数说明如下，以下参数可以根据需求进行修改，其他参数建议不做修改：

- tokenize_mode: 目前仅支持"sft"。

- train_mode: 目前仅支持"sft"。

- load_raw_dataset: 需要保持"True"，后续会支持其它模式数据，当前仅支持 jsonl 输入

- data_paths: "[path1,path2,path3]" 输入数据地址，字符串，开头结尾用[]，中间用`,`间隔不同 path，每个 path 是一个目录，目录的最后一级名字作为任务名称，下面包含 1 到多个 jsonl 数据。

- output_dir: 训练输出目录，存储 checkpoint、lora_adaptor checkpoint 等。

- tensorboard_dir: 可以暂时忽略，实际 tensorboard 存储在 output_dir 的 runs 目录下。

- model_type: 目前仅支持 gpt_neox。

- peft_type: 目前仅支持 lora。

- pretrained_model_path: 预训练模型的本地目录。

- total_train_batch_size: 所有显卡 train 的 batch size 的总和，会根据启动脚本时输入的 per gpu batch size 自动计算。

- per_device_valid_batch_size: 每张显卡 eval 的 batch size，会根据启动脚本时输入的 per gpu batch size 自动计算。

- gradient*accumulation_steps: 梯度累计步数。global batch=num_gpus * per*device_train_batch_size * gradient_accumulation_steps。

- checkpoint_activations: 如果显存捉襟见肘，可以开启。以时间换空间，模型不缓存激活状态，会进行两次 forward 计算，以节省显存。

- learning_rate: 学习率。全量参数微调的时候，建议小一些，1e-5 或 5e-6。qlora 中的学习率设置更大一些，一般为 1e-4、2e-4。

- min_lr: 最低学习率， 一般是 learning_rate 的十分之一。

- seq_length: 训练时的最大长度。按照自己的设备进行设置，越长需要占用越多显存。

- log_interval: 每隔多少步统计一次 train loss。

- checkpointing_steps: 每隔多少步保存一个模型。

- evalation_steps: 每隔多少步在验证集上 evaluate 一次。

- early_stopping_patience: 多少个 eval point 不继续收敛，则停止训练。

- lr_scheduler_type: 学习率变化策略。

- num_warmup_steps: warm up 步数，学习率经过多少步，增长到指定的数值。

- seed: 随机种子，用于复现实验结果。

- train_iters: 可以暂时设为比较小的数，如 10，实际上不会影响训练步数，留作后面拓展读取其他形式数据集的功能。

- valid_iters: 可以暂时设为比较小的数，如 10，实际上不会影响训练步数，留作后面拓展读取其他形式数据集的功能。

- evaluation_strategy: 训练期间 evaluate 的策略，"steps"表示每隔"valid_interval"步做一次 evaluate，"epoch"表示每隔一个 epoch 做一次 evaluate，支持同时开启。

- save_strategy: 训练期间保存模型权重的策略，"steps"表示每隔"checkpointing_steps"步保存一次。

- extra_save_by_epoch: 每过一个 epoch 是否要保存一个 epoch 级别的 checkpoint。

- save_total_limit: 最多保留的模型 checkpoint 个数，一般设置为 2，会保留 valid loss 最低，以及最新的 checkpoint，注意 epoch 级别的 checkpoint 会一直保留，且不受限制。

- weighted_loss_mode: 多任务训练的 loss 加权方式。

## 4. 模型使用

### 4.1 权重合并

如果使用 LoRA 进行训练，本项目仅保存 adapter 的权重和配置文件，需要将 adapter 权重与 base model 进行合并。脚本见`utils/merge_base_and_lora_to_hf.py`

### 4.2 模型推理

我们提供了单轮对话和多轮对话的如下脚本，该脚本可同时兼容大部分 huggingface 格式的模型。

```python
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
)
tokenizer = AutoTokenizer.from_pretrained(mode_name_or_path, trust_remote_code=True, use_fast=False, legacy=False)
tokenizer.padding_side = "left"
tokenizer.pad_token_id = tokenizer.convert_tokens_to_ids("<unk>")
tokenizer.eos_token_id = tokenizer.convert_tokens_to_ids("</s>")
model = AutoModelForCausalLM.from_pretrained(mode_name_or_path, trust_remote_code=True)

HUMAN_ROLE_START_TAG = "<|role_start|>human<|role_end|>"
BOT_ROLE_START_TAG = "<|role_start|>bot<|role_end|>"
texts = ["write a python function of quick sort."]
texts = [f"{HUMAN_ROLE_START_TAG}{text}{BOT_ROLE_START_TAG}" for text in texts]

inputs = tokenizer(texts, return_tensors='pt', padding=True, add_special_tokens=False).to("cuda")
outputs = model.generate(
        inputs=inputs["input_ids"],
        attention_mask=inputs["attention_mask"],
        max_new_tokens=512,
        top_p=0.95,
        temperature=0.1,
        do_sample=True,
        eos_token_id=tokenizer.eos_token_id,
        pad_token_id=tokenizer.pad_token_id
    )
gen_text = tokenizer.batch_decode(outputs[:, inputs["input_ids"].shape[1]:], skip_special_tokens=True)
print(gen_text)
```

生成脚本中的 top_p、temperature、repetition_penalty、do_sample 等参数对模型的生成效果影响较大，可按照自己的使用场景进行调试修改。
实践中，在代码生成场景中，如果采样模式，do_sample=True, top_p=0.95, temperature=0.1 是 pass@1 指标的不错选择；
如果非采样模式， do_sample=False, beam_num=1 或者 3 是不错的选择，其中 beam_num=1 即为 greedy decoding。

## 5. FAQ

#### 问题 1：OOM 如何解决？

如果发生 OOM，可以缩小 per GPU batch size (启动训练脚本时的第一个参数)、seq_length 等参数来缓解。也可以设 gradient_checkpointing=true，可以大幅降低显存占用，但训练速度会变慢一些。
