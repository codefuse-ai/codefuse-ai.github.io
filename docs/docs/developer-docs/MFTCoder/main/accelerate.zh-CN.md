---
store:
  title: MFTCoder
  version: main
group:
  title: 🌱 MFTCoder
  order: -1
title: Accelerate + DeepSpeed/FSDP 框架篇
order: 2
toc: content
---

[![Generic badge](https://img.shields.io/badge/🤗-Huggingface%20Repo-green.svg)](https://huggingface.co/codefuse-ai)&nbsp;
<a href="https://github.com/codefuse-ai/MFTCoder/blob/main/LICENSE">
<img alt="GitHub" src="https://img.shields.io/github/license/huggingface/transformers.svg?color=blue">
</a>

## 1. 更新

🔥 MFTCoder-accelerate 新增支持 accelerate + FSDP 框架， 支持全量微调和 LoRA;

🔥 MFTCoder-accelerate 支持最新更多主流开源模型: mistral, mixtral-8x7b(Mixture of Experts), deepseek, chatglm3；

🔥 MFTCoder-accelerate 新增 self-paced Loss, 用于收敛均衡；

🔥 MFTCoder-accelerate 支持使用 accelerate + DeepSpeed 框架下支持 全量参数/QLoRA/LoRA 微调；

🔥 MFTCoder-accelerate 在训练中支持了多任务微调 MFT， 可以同时平衡多个任务的训练，训练的模型支持多任务推理；

🔥 MFTCoder-accelerate 在训练中支持多种模型基座： codellama, llama2, llama, starcoder, codegeex2, chatglm2, qwen 等

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
      "content": "你是一个智能代码助手，可以回复用户与代码相关的问题"
    },
    {
      "role": "human",
      "content": "写一个快速排序"
    },
    {
      "role": "bot",
      "content": "以下是一个快速排序算法xxxxxx"
    },
    {
      "role": "human",
      "content": "解释一下这段代码"
    },
    {
      "role": "bot",
      "content": "好的，这段代码xxx"
    }
  ]
}
```

### 2.2 推理数据格式

推理数据格式为模型在训练数据格式下拼接的字符串形式，它也是推理时输入 prompt 拼接的方式：

```
"""
<s>system
这是System指令
<s>human
这是第1轮用户输入的问题
<s>bot
这是第1轮模型生成的内容{EOS_TOKEN}
<s>human
这是第2轮用户输入的问题
<s>bot
这是第2轮模型生成的内容{EOS_TOKEN}
...
...
...
<s>human
这是第n轮用户输入的问题
<s>bot
{模型现在要生成的内容}{EOS_TOKEN}
"""
```

## 3. 模型训练

目前支持全量参数(Full-parameters)指令微调、QLoRA 指令微调，LoRA 指令微调。
一些优秀的代码预训练模型权重，理论上，HuggingFace 上开源的模型，均可使用本项目进行训练：

🤗 [最新代码预训练 SOTA，CodeLlama](https://huggingface.co/codellama/CodeLlama-34b-Python-hf) ：code-llama-34b， code-llama-34b-python, 新的 SOTA 基座。

🤗 [10B 级别最佳代码预训练模型 Starcoder](https://huggingface.co/bigcode/starcoder) wizardCoder-15B, PanGu-coder2 等前 SOTA 的基座模型。

🤗 [多语言能手 Qwen-7b](https://huggingface.co/Qwen/Qwen-7B) ：适用于多语言任务，也适用中文任务。进行指令微调时。

**mftcoder_accelerate 文件结构**

```
mftcoder_accelerate
       |
       src
          configs
          |
          data
          |
          model
          |
          *pefts*
          |
          tokenizer
          |
          utils
       |
       evals
```

我们将训练中使用的各种组件抽取出来，以便后续的扩展和优化， 详见`src`目录下的实现。

训练入口文件是`mftcoder_accelerate/src/pefts/mft_accelerate.py`

参数配置存储在`mftcoder_accelerate/src/configs`目录下，方便统一管理和更改。

**_所以，在你开启训练之前，请进入 src 目录_**

```
cd mftcoder_accelerate/src
```

### 3.1 数据 tokenization

训练时，我们将多轮对话拼接成如下格式（也是上文中的推理数据格式），然后进行 tokenize。
其中，默认情况下：

`<s>human\n`作为 human/user 的起始符，`<s>bot\n`作为 bot/assistant 的起始符，`{EOS_TOKEN}` 表示 eos_token。
其中 eos_token 可以根据不同模型修改替换。不同角色的起始符可以配置，用来实现不同的对话/问答模版。

```
"<s>human\n{input1}<s>bot\n{target1}{EOS_TOKEN}<s>human\n{input2}<s>bot\n{target2}{EOS_TOKEN}\n"
```

在计算 loss 时，我们通过 loss mask 的方式，input 部分的 loss 不参与参数更新，只有“target{EOS_TOKEN}”部分的 loss 参与参数更新。
这种方式充分利用了模型并行计算的优势，训练更加高效，同时也充分利用了 decoder-only 模型从左到右 attention 的特性，一次性将多轮对话中的每个 target 部分都参与了训练，训练更充分高效。

### 3.2 LoRA/QLoRA 微调

#### LoRA/QLoRA 微调简介

关于 LoRA 的详细介绍可参考论文：[LORA: LOW-RANK ADAPTATION OF LARGE LANGUAGE MODELS](https://arxiv.org/pdf/2106.09685.pdf)

关于 QLoRA 的详细介绍可参考论文：[QLORA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/pdf/2305.14314.pdf)

QLoRA 通过 4-bit 的 nf4 量化，且加入更多 adapter，在大幅减少显存消耗的同时，尽可能逼近全量参数微调的效果。
QLoRA 论文指出，该方法可以在一张 V100 上对 33B 的模型进行微调，并且性能逼近全量参数微调。

执行如下命令即可进行 Lora/QLora/全量 微调：

#### Launch via Deepspeed

DeepSpeed 配置在 accelerate_ds_config.yaml 中。

```bash
accelerate launch --config_file accelerate_ds_config.yaml pefts/mft_accelerate.py --train_config configs/xxx_train_config.json --distributed_type "DeepSpeed"
```

或者

DeepSpeed 配置在脚本中通过命令行输入。

```bash
sh ds_single_launch.sh
```

#### Launch via FSDP

FSDP 配置在 accelerate_fsdp_config.yaml 中。

```bash
accelerate launch --config_file accelerate_fsdp_config.yaml pefts/mft_accelerate.py --train_config configs/xxx_train_config.json --distributed_type "FSDP"
```

或者

FSDP 配置在脚本中通过命令行输入。

```bash
sh fsdp_single_launch.sh
```

#### 训练参数

_**训练需要的参数配置在`configs/*_train_config`中，主要参数说明如下：**_

- **load_raw_dataset**: 需要保持 true，后续会支持其它模式数据，当前仅支持 jsonl 输入
- **data_paths**: "[path1,path2,path3]" 输入数据地址，字符串，开头结尾用[]，中间用`,`间隔不同 path，每个 path 是一个目录，目录的最后一级名字作为任务名称，下面包含 1 到多个 jsonl 数据
- **output_dir**：训练输出目录，存储 checkpoint(全量训练时)、lora_adaptor（Lora 或者 Qlora 时）等
- **tb_dir**: 存储 tensorboard 等
- **model_type**: "mixtral|mistral|deepseek|llama|starcoder|chatglm2|qwen|gpt_neox"
- **attn_implementation**: "flash_attention_2" 或者 "eager"
- **peft_type**: lora 或者 qlora 或者 null(全量微调)
- **lora_rank**: lora rank
- **lora_alpha**: lora alpha
- **lora_dropout**: lora dropout
- **target_modules**: List[str], lora 目标模块，如果 null，会使用默认，参考 model_mapping.py
- **quantization**: 是否量化，"4bit", "8bit" 或者 null， qlora 推荐 4bit 量化
- **pretrained_model_path**：预训练模型的本地目录，或者在 huggingface 上的模型名称。
- **weighted_loss_mode**: 多任务 loss 加权模式， "case3"是当前推荐。
- **padding_mode**: 数据的样本组织方式， "padding"是将每个原始样本填充到 seq_length, "pack"是将尽量多的样本打包到每个 seq_length 的序列中。
- **num_train_epochs**：训练的轮次。如果数据量足够大，一般建议只训 1-2 个 epoch。
- **per_device_train_batch_size**：每张显卡 train 的 batch size。
- **per_device_eval_batch_size**：每张显卡 eval 的 batch size。
- **gradient_accumulation_steps**：梯度累计步数。global batch=num*gpus * per*device_train_batch_size * gradient_accumulation_steps。
- **learning_rate**：学习率。全量参数微调的时候，建议小一些，1e-5 或 5e-6。qlora 中的学习率设置更大一些，一般为 1e-4、2e-4。
- **min_lr**: 最低学习率， 一般是 learning_rate 的十分之一
- **seq_length**：训练时的最大长度。按照自己的设备进行设置，越长需要占用越多显存。
- **log_interval**：每隔多少步统计一次 train loss。
- **checkpointing_steps**：每隔多少步保存一个模型。
- **evaluation_steps**：每隔多少步在验证集上 evaluate 一次。
- **early_stopping** ： 是否执行 early_stop
- **early_stopping_stall_num**： 多少个 eval point 不继续收敛，则停止训练
- **lr_scheduler_type**：学习率变化策略。常用"cosine"
- **warmup_steps**：warm up 步数。学习率经过多少步，增长到指定的数值。
- **seed**：随机种子，用于复现实验结果。
- **saving_limit**：整数，ckpt 存储数量上限， 全量训练必须设置。默认 null 即不限制数量。
- **role_markers**: null，即使用{"system": "\<s\>system\n", "user": "\<s\>human\n", "assistant": "\<s\>bot\n"}。 你可以自定义 "system", "user" and "assistant"的模板， 用于定制自己的问答或者对话模板，比如 {"system": "### System:\n", "user": "### Instruction:\n", "assistant": "### Response:\n"}

## 4. 模型使用

### 4.1 权重合并

如果使用 LoRA 或者 QLoRA 进行训练，本项目仅保存 adapter 的权重和配置文件，需要将 adapter 权重与 base model 进行合并。
可以使用如下 merge_base_and_lora_to_hf.py 脚本。

```
python pefts/merge_base_and_lora_to_hf.py \
    --base_model_or_path model_path \
    --adaptor_path lora_adapter_path \
    --model_type model_type \
    --merged_output_path output_path
```

### 4.2 模型推理

我们提供了单轮对话和多轮对话的如下脚本，该脚本可同时兼容大部分 huggingface 格式的模型。

```python
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
)
model_name_or_path = "codefuse-ai/CodeFuse-Deepseek-33B"
tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, trust_remote_code=True, padding_side="left")
tokenizer.eos_token_id = tokenizer.convert_tokens_to_ids("<｜end▁of▁sentence｜>")
tokenizer.pad_token_id = tokenizer.eos_token_id
model = AutoModelForCausalLM.from_pretrained(model_name_or_path, trust_remote_code=True)

HUMAN_ROLE_START_TAG = "<s>human\n"
BOT_ROLE_START_TAG = "<s>bot\n"
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

如果发生 OOM，可以缩小 per_device_train_batch_size、seq_length 等参数来缓解。由于面对的模型普遍较大（6b， 13b， 34b， 70b 等）我们已经默认使用 gradient_checkpointing 技术，可以大幅降低显存占用，但训练速度会稍慢一些。

#### 问题 2：安装包错误

参考 init_env.sh 和 requirements.txt

#### 问题 3：如何指定使用某些卡训练？

通过如下方式，即可指定使用 0 和 1 号卡进行训练:

```bash
CUDA_VISIBLE_DEVICES=0,1 accelerate launch --config_file pefts/accelerate_ds_config.yaml pefts/mft_accelerate.py --train_config configs/xxx_train_config.json --distributed_type "deepspeed"
```

#### 问题 4：关于 Flash Attention, 该如何配置训练？

首先，我们强烈建议您安装 Flash Attention 2(FA2)，（>=2.1.0, 2.3.6 功能更齐全）。

训练参数中"attn_implementation" 设置成 "eager" 可以用 naive attention，也就是未经加速的 attention。

训练参数中"attn_implementation" 设置成 "flash_attention_2" 可以用 FA2，速度快，省显存。

如果你可以自行安装环境并使用 torch>=2.1.1，可以尝试设置参数"attn_implementation"为 "sdpa"。这样会尝试使用 transformers 兼容的 torch.nn.functional.scaled_dot_product_attention。支持的模型还不全面。

#### 问题 5：推荐的分布式框架是怎样的？

对于 LoRA/QLoRA, 我们推荐使用 DeepSpeed 作为底层分布式框架，它具有易用性和兼容性好的特点，并且速度很快。
FSDP 不支持 QLoRA, 因为 bitsandbytes 暂不支持 FSDP。

对于全量微调，我们推荐使用 FSDP， 因为它在全量训练时可以发挥 fully sharding 的优势，达到更快的训练速度。

#### 问题 6：当前支持的模型中，有什么区别

国产大模型比如 chatglm2， chatglm3， baichuan2， qwen， aquila2 等，使用的是和模型共同发布的 modeling_xxx.py.
其它被 transformers 官方支持的大模型，由于已经升级支持 flash attention 等，所以全面切换到官方的 modeling 支持训练，之前的自定义 modeling 会被 deprecated
