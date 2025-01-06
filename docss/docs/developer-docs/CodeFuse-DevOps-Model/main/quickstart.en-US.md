---
store:
  title: CodeFuse-DevOps-Model
  version: main
group:
  title: 🌱 CodeFuse-DevOps-Model
  order: -1
title: QuickStart
order: 1
toc: content
github: https://github.com/codefuse-ai/CodeFuse-DevOps-Model
---

## Dependency Installation

Please install the packages listed in the requirements.txt file from the GitHub address first. You can refer to the following code:

```
pip install -r requirements.txt
```

## Model Download

Model download information is as follows:

🤗 Huggingface Address

| -   | Base Model            | Aligned Model         |
| --- | --------------------- | --------------------- |
| 7B  | DevOps-Model-7B-Base  | DevOps-Model-7B-Chat  |
| 14B | DevOps-Model-14B-Base | DevOps-Model-14B-Chat |

🤖 ModelScope Address

| -   | Base Model            | Aligned Model         |
| --- | --------------------- | --------------------- |
| 7B  | DevOps-Model-7B-Base  | DevOps-Model-7B-Chat  |
| 14B | DevOps-Model-14B-Base | DevOps-Model-14B-Chat |

Find the version of the Chat model you want to download; currently, 7B and 14B models are provided.

## Model Usage

Interact with the Chat model using the following code:

```
from transformers import AutoModelForCausalLM, AutoTokenizer
from transformers.generation import GenerationConfig

tokenizer = AutoTokenizer.from_pretrained("path_to_DevOps-Model-Chat", trust_remote_code=True)

model = AutoModelForCausalLM.from_pretrained("path_to_DevOps-Model-Chat", device_map="auto", trust_remote_code=True, bf16=True).eval()

# 指定 generation_config
model.generation_config = GenerationConfig.from_pretrained("path_to_DevOps-Model-Chat", trust_remote_code=True)

# First round of conversation
resp, hist = model.chat(query='你是谁', tokenizer=tokenizer, history=None)
print(resp)
# 我是 DevOps-Model，一个由蚂蚁集团平台技术事业群风险智能团队和北京大学联合研发的人工智能机器人，可以与用户进行自然语言交互，并协助解答 DevOps 全生命周期中的各种问题。如果您有任何需要协助的问题或者想要进行闲聊，都可以和我交流哦。

# Second round of conversation
resp2, hist2 = model.chat(query='Java 中 HashMap 和 Hashtable 有什么区别', tokenizer=tokenizer, history=hist)
print(resp2)
# HashMap 和 Hashtable 都是 Java 中常用的哈希表实现，它们的主要区别在于：
# 1. Hashtable 是线程安全的，而 HashMap 不是线程安全的，因此在多线程环境下，Hashtable 的性能更稳定。
# 2. Hashtable 中的方法都是同步的，而 HashMap 的方法不是同步的，因此在多线程环境下，Hashtable 的性能更好。
# 3. Hashtable 中的 key 和 value 都必须实现 Serializable 接口，而 HashMap 中的 key 和 value 可以是任何对象，包括基本数据类型。
# 4. Hashtable 的初始容量是 11，而 HashMap 的初始容量是 16。
# 总之，如果需要在多线程环境下使用哈希表，并且需要保证线程安全，那么应该使用 Hashtable；如果不需要考虑线程安全，或者需要快速地进行哈希表操作，那么应该使用 HashMap。

# Third round of conversation
resp3, hist3 = model.chat(query='线程安全代表什么', tokenizer=tokenizer, history=hist2)
print(resp3)
# 线程安全是指在多线程环境下，程序能够正确地处理并发访问，并且不会出现数据竞争、死锁、饥饿等异常情况。线程安全的程序可以保证在不同的线程之间共享同一个数据结构时，数据的正确性和一致性。线程安全的实现通常需要使用同步机制，如锁、原子操作等，来保证对共享数据的访问是线程安全的。在 Java 中，可以通过 synchronized 关键字、Lock 接口等机制来实现线程安全。
```
