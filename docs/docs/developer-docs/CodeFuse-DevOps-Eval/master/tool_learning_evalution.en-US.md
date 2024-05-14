---
store:
  title: CodeFuse-DevOps-Eval
  version: master
# resource: true
# title: Tool Learning 数据集评测教程
group:
  title: 🌱 CodeFuse-DevOps-Eval
  order: -1
order: 1
title: Tool Learning Evaluate
toc: content
---

## Tool Learning Dataset Evaluation Tutorial

### ChatML Integration Methods

To test on your own Huggingface-format model, the overall steps are divided into the following:

1. Write the `create_prompts` function in `~/evals/FuncCallEvaluation`
2. Write the related functions in `~/models/base_model`
3. Register the model and evaluation functions
4. Execute the test script
   If the model does not require special handling after loading, and the input does not need to be converted into a specific format (e.g. ChatML format or other human-bot formats), please skip directly to step four and start testing.

#### 1. Write the Loader Function

If the model needs additional processing after loading (e.g., tokenizer adjustments), you will need to inherit the `ModelAndTokenizerLoader` class in `src.context_builder.context_builder_family.py` and override the corresponding `load_model` and `load_tokenizer` functions.

An example is as follows:

```python
class FuncCallEvalution(ToolEvalution):

    def create_prompts(self, func_call_datas):
        '''
        datas: [
            {
                "instruction": history[his_idx],
                "input": "",
                "output": output,
                "history": [(human_content, ai_content), (), ()],
                "functions": tools
            }
        ]
        '''
        system_content = '''CodeFuse是一个面向研发领域的智能助手，旨在中立的、无害的帮助用户解决开发相关的问题，所有的回答均使用Markdown格式返回。
        你能利用许多工具和功能来完成给定的任务，在每一步中，你需要分析当前状态，并通过执行函数调用来确定下一步的行动方向。你可以进行多次尝试。如果你计划连续尝试不同的条件，请每次尝试一种条件。若给定了Finish函数,则以Finish调用结束，若没提供Finish函数，则以不带function_call的对话结束。'''
        function_format = '''You are ToolGPT, you have access to the following APIs:\n{tools}'''

        func_call_train_datas = []
        history_error_cnt = 0
        funccall_error_cnt = 0

        for data in func_call_datas:
            tools = data["functions"]
            chatrounds = data["chatrounds"]

            function_content = ""
            if len(tools) > 0:
                function_content = function_format.format(tools=json.dumps(tools, ensure_ascii=False, sort_keys=True))

            history = []
            for i in chatrounds:
                if i["role"]=="system":
                    continue

                if i["role"]=="user":
                    history.append(("user", i["content"]))

                if i["role"] == "assistant":
                    if "function_call" in i:
                        if not isinstance(i["function_call"], dict):
                            funccall_error_cnt+=1
                            continue
                        content  = "#function" + json.dumps({**{"content": i["content"]}, **i["function_call"]}, ensure_ascii=False)
                    else:
                        content = i["content"]
                    history.append(("assistant", content))


                if i["role"] == "function":
                    content  = json.dumps({**{"content": i["content"]}, **{"name": i["name"]}}, ensure_ascii=False)
                    history.append(("user", content))


            history = [i[1] for i in history]
            history[0] = "\n".join([system_content,function_content, history[0]])

            for his_idx in range(0, len(history), 2):
                output = history[his_idx+1]

                if "#function" in output:
                    output = output.split("#function")[-1]

                try:
                    output = json.loads(output)
                except:
                    output = {"content": output}


                func_call_train_datas.append(
                    {
                        "instruction": history[his_idx],
                        "input": "",
                        "output": output,
                        "history": [history[:his_idx+2][i:i+2] for i in range(0, len(history[:his_idx]), 2)],
                        "functions": tools
                    },
                )
        return func_call_train_datas
```

#### 2. Write the Model's Context Builder Function

If the input needs to be converted to a specific format (e.g., ChatML format or other human-bot formats), then you will need to go to `src.context_builder.context_builder_family` and inherit the `ContextBuilder` class to override the `make_context` function. This function is used to convert the input to the corresponding required output. An example is as follows:

```python
class ToolModel:
    def __init__(self, model_path: str, template: str, trust_remote_code=True, tensor_parallel_size=1, gpu_memory_utilization=0.25):
        self.model_path = model_path
        self.trust_remote_code = trust_remote_code
        self.tensor_parallel_size = tensor_parallel_size
        self.gpu_memory_utilization = gpu_memory_utilization
        self.load_model(self.model_path, self.trust_remote_code, self.tensor_parallel_size, self.gpu_memory_utilization)

    def generate(self, prompts: str, template: str = None, generate_configs: GenerateConfigs = None) -> list:
        '''产出对应结果'''
        pass

    def generate_params(
        self, generate_configs: GenerateConfigs,
    ):
        '''generate param'''
        kargs = generate_configs.dict()
        return kargs

    def load_model(self, model_path, trust_remote_code=True, tensor_parallel_size=1, gpu_memory_utilization=0.25):
        '''加载模型'''
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_path, trust_remote_code=trust_remote_code)
        self.model = AutoModelForCausalLM.from_pretrained(self.model_path, device_map="auto", trust_remote_code=trust_remote_code).eval()

        # self.model = LLM(model=model_path, trust_remote_code=trust_remote_code, tensor_parallel_size=tensor_parallel_size, gpu_memory_utilization=gpu_memory_utilization)
```

#### 3. Register the Model and Eval Function

Registration can be done in `~/models/__init__.py`

```python
from .base_model import ToolModel
__all__ = [
    "ToolModel",
]
```

Registration can also be done in `~/evals/__init__.py`

```python
from .base_evaluation import ToolEvaluation
from .toolfill_evaluation import ToolFillEvaluation
from .toolparser_evaluation import ToolParserEvaluation
from .toolsummary_evaluation import ToolSummaryEvaluation
from .func_call_evaluation import FuncCallEvaluation
__all__ = [
    "ToolEvaluation", "ToolFillEvaluation", "ToolParserEvaluation", "ToolSummaryEvaluation", "FuncCallEvaluation"
]
```

#### 4. Execute the Test Script

Modify `~/src/qwen_eval_main.py# datainfos` and `model_infos`

```python
model_infos = [
    {"model_name": "", "template": "chatml", "model_path": "",
     "peft_path": "", "model_class": QwenModel}]
datainfos = [
    {"dataset_path": "~/fcdata_luban_zh_test.jsonl", "dataset_name": "fcdata_luban_zh", "tool_task": "func_call"},
    {"dataset_path": "~/test_datas/fcdata_zh_test_v1.jsonl", "dataset_name": "fcdata_zh", "tool_task": "func_call"},
]
```

To execute, run the following command:

```Bash
python qwen_eval_main.py
```

<br>

### Non-ChatML Integration

To test on your own Huggingface-format model, the overall steps are divided into the following:

1. Write related code in `~/getAssistantAns.py`
2. Execute the test script

#### 1. Writing the `getAssistantAns` Example

```
class GetAssistantAns():
    # 按照自己推理需求自己修改代码

    def __init__(self, gpu_num=1):
        model = AutoModelForCausalLM.from_pretrained(model_name)
        device_list = []
        for gpu_idx in range(gpu_num):
            device_list.append(torch.device("cuda:0"))

        # 将模型移动到指定的GPU设备
        model.to(device)


    def gen_answer(self, chat_dict, gpu_index):
        # 这里实际根据自己推理逻辑 然后转为标准格式返回
        # 以下仅仅是样例
        import time
        print(os.environ["CUDA_VISIBLE_DEVICES"])
        time.sleep(1)
        rtn_dict1 = {
                "role": "assistant",
                "content": None,
                "function_call":
                {
                    "name": "get_fudan_university_scoreline",
                    "arguments": "{\n  \"year\": \"2020\"\n}"
                }
            }

        rtn_dict2 =  {
                "role": "assistant",
                "content": "2020年复旦大学的分数线如下：\n\n- 文科一批：630分\n- 文科二批：610分\n- 理科一批：650分\n- 理科二批：630分"
            }

        return random.choice([rtn_dict1, rtn_dict2])
```

#### 2. Execute the Test Script

Modify `~/src/opensource_functioncall_evaluation.py # test_ans_file_list`

```python
test_ans_file_list = [
        "fcdata_zh_test.jsonl"
        ]
```

To execute, run the following command:

```Bash
python opensource_functioncall_evaluation.py
```
