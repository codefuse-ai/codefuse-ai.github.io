---
store:
  title: CodeFuse-DevOps-Eval
  version: master
group:
  title: 🌱 CodeFuse-DevOps-Eval
  order: -1
order: 1
title: Tool Learning 数据集评测教程
toc: content
---

## tool learning 数据集评测教程

### chatml 接入方式

如果需要在自己的 huggingface 格式的模型上进行测试的话，总的步骤分为如下几步:

1. 编写 ~/evals/FuncCallEvalution 的 create_prompts 函数
2. 编写 ~/models/base_model 的 相关函数
3. 注册模型和评估函数
4. 执行测试脚本
   如果模型在加载进来后不需要特殊的处理，而且输入也不需要转换为特定的格式（e.g. chatml 格式或者其他的 human-bot 格式），请直接跳转到第四步直接发起测试。

#### 1. 编写 loader 函数

如果模型在加载进来还需要做一些额外的处理（e.g. tokenizer 调整），需要去 `src.context_builder.context_builder_family.py` 中继承 `ModelAndTokenizerLoader` 类来覆写对应的 `load_model` 和 `load_tokenizer` 函数，具体可以参照以下示例：

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

#### 2. 编写 Model 的 context_builder 函数

如果输入需要转换为特定的格式（e.g. chatml 格式或者其他的 human-bot 格式），则需要去 `src.context_builder.context_builder_family` 中继承 ContextBuilder 类来覆写 make_context 函数，这个函数是用来将输入转换格式为对应需要的输出的，一个示例如下：

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

#### 3. 注册模型和 eval 函数即可

在 ~/models/**init**.py 中注册即可

```python
from .base_model import ToolModel

__all__ = [
    "ToolModel",
]
```

在 ~/evasl/**init**.py 中注册即可

```python
from .base_evalution import ToolEvalution
from .toolfill_evalution import ToolFillEvalution
from .toolparser_evalution import ToolParserEvalution
from .toolsummary_evalution import ToolSummaryEvalution
from .func_call_evalution import FuncCallEvalution


__all__ = [
    "ToolEvalution", "ToolFillEvalution", "ToolParserEvalution", "ToolSummaryEvalution", "FuncCallEvalution"
]
```

#### 4. 执行测试脚本

修改 ~/src/qwen_eval_main.py# datainfos 和 model_infos

```python
model_infos = [
    {"model_name": "", "template": "chatml", "model_path": "",
     "peft_path": "", "model_class": QwenModel}]

datainfos = [
    {"dataset_path": "~/fcdata_luban_zh_test.jsonl", "dataset_name": "fcdata_luban_zh", "tool_task": "func_call"},
    {"dataset_path": "~/test_datas/fcdata_zh_test_v1.jsonl", "dataset_name": "fcdata_zh", "tool_task": "func_call"},
]
```

运行下述命令即可

```Bash
python qwen_eval_main.py
```

<br>

### 非 chatml 接入

如果需要在自己的 huggingface 格式的模型上进行测试的话，总的步骤分为如下几步:

1. 编写 ~/getAssistantAns.py 相关代码
2. 执行测试脚本

#### 1、编写 getAssistantAns 示例

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

#### 2、执行测试脚本

修改 ~/src/opensource_functioncall_evalution.py # test_ans_file_list

```python
test_ans_file_list = [
        "fcdata_zh_test.jsonl"
        ]
```

运行下述命令即可

```Bash
python opensource_functioncall_evalution.py
```
