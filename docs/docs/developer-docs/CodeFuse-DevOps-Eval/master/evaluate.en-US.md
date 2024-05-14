---
store:
  title: CodeFuse-DevOps-Eval
  version: master
group:
  title: 🌱 CodeFuse-DevOps-Eval
  order: -1
title: Evaluate
order: 0
toc: content
---

## 🚀 How to Evaluate

If you need to test your own huggingface-formatted model, the overall steps are as follows:

1. Write the loader function for the model.
2. Write the context_builder function for the model.
3. Register the model in the configuration file.
4. Run the testing script.
   If the model does not require any special processing after loading, and the input does not need to be converted to a specific format (e.g. chatml format or other human-bot formats), you can directly proceed to step 4 to initiate the testing.

#### 1. Write the loader function

If the model requires additional processing after loading (e.g. adjusting the tokenizer), you need to inherit the `ModelAndTokenizerLoader` class in `src.context_builder.context_builder_family.py` and override the corresponding `load_model` and `load_tokenizer` functions. You can refer to the following example:

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

#### 2. Write the context_builder function for the Model

If the input needs to be converted to a specific format (e.g. chatml format or other human-bot formats), you need to inherit the ContextBuilder class in `src.context_builder.context_builder_family` and override the make_context function. This function is used to convert the input to the corresponding required format. An example is shown below:

```python
class QwenChatContextBuilder(ContextBuilder):
    def __init__(self):
        super().__init__()

    @override
    def make_context(self, model, tokenizer, query: str, system: str = "hello！"):
    # Implementation of the method
        pass
```

#### 3. Register the model in the configuration file

Go to the `model_conf.json` file in the conf directory and register the corresponding model name and the loader and context_builder that will be used for this model. Simply write the class names defined in the first and second steps for the loader and context_builder. Here is an example:

```json
{
  "Qwen-Chat": {
    "loader": "QwenModelAndTokenizerLoader",
    "context_builder": "QwenChatContextBuilder"
  }
}
```

#### 4. Execute the testing script

Run the following code to initiate the test:

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

👀 👀 The specific evaluation process is as follows 📖 [**Evaluate Tutorial**](/docs/developer-docs/CodeFuse-DevOps-Eval/master/tutorial)

<br>
