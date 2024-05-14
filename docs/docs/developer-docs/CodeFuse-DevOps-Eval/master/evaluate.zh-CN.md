---
store:
  title: CodeFuse-DevOps-Eval
  version: master
group:
  title: 🌱 CodeFuse-DevOps-Eval
  order: -1
title: 评测
order: 0
toc: content
---

## 🚀 如何进行测试

如果需要在自己的 HuggingFace 格式的模型上进行测试的话，总的步骤分为如下几步:

1. 编写 Model 的 loader 函数
2. 编写 Model 的 context_builder 函数
3. 注册模型到配置文件中
4. 执行测试脚本
   如果模型在加载进来后不需要特殊的处理，而且输入也不需要转换为特定的格式（e.g. chatml 格式或者其他的 human-bot 格式），请直接跳转到第四步直接发起测试。

#### 1. 编写 loader 函数

模型加载时还需要做一些额外的处理（e.g. tokenizer 调整），需要继承 `ModelAndTokenizerLoader` 类来覆写对应的 `load_model` 和 `load_tokenizer` 函数， 如下所示：

```python
class QwenModelAndTokenizerLoader(ModelAndTokenizerLoader):
    def __init__(self):
        super().__init__()
        pass

    @override
    def load_model(self, model_path: str):
    # Implementation of the method
        pass

    @override
    def load_tokenizer(self, model_path: str):
    # Implementation of the method
        pass
```

#### 2. 编写 Model 的 context_builder 函数

如果输入需要转换为特定的格式（e.g. chatml 格式或者其他的 human-bot 格式），则需要继承 ContextBuilder 类来覆写 make_context 函数，如下所示：

```python
class QwenChatContextBuilder(ContextBuilder):
    def __init__(self):
        super().__init__()

    @override
    def make_context(self, model, tokenizer, query: str, system: str = "hello！"):
    # Implementation of the method
        pass
```

#### 3. 注册模型到配置文件中

去 conf 中的 `model_conf.json`，注册对应的模型名和这个模型将要使用的 loader 和 context_builder，示例如下：

```json
{
  "Qwen-Chat": {
    "loader": "QwenModelAndTokenizerLoader",
    "context_builder": "QwenChatContextBuilder"
  }
}
```

#### 4. 执行测试脚本

直接运行以下代码发起测试

```Bash
python src/run_eval.py \
--model_path path_to_model \
--model_name model_name_in_conf \
--model_conf_path path_to_model_conf \
--eval_dataset_list all \
--eval_dataset_fp_conf_path path_to_dataset_conf \
--eval_dataset_type test \
--data_path path_to_downloaded_devops_eval_data \
--k_shot 0
```

👀 👀 具体评测流程见 📖 [**数据集评测教程**](/zh-CN/docs/developer-docs/CodeFuse-DevOps-Eval/master/tutorial)
<br>
