---
store:
  title: CodeFuse-DevOps-Eval
  version: master
# resource: true
group:
  title: 🌱 CodeFuse-DevOps-Eval
  order: -1
order: 2
title: Tool Learning Data
toc: content
---

### Data Example

We are fully compatible with OpenAI Function Calling in terms of data, with the format as follows:
**Data format for Function Call**

| Input Key  | Input Type      | Input Description         |
| ---------- | --------------- | ------------------------- |
| functions  | List[Swagger]   | Collection of tools       |
| chatrounds | List[chatround] | Multi-round dialogue data |

**Data format for chatrounds**

| Input Key     | Input Type | Input Description                                                                      |
| ------------- | ---------- | -------------------------------------------------------------------------------------- |
| role          | string     | Role name, includes three categories: user, assistant, function                        |
| name          | string     | If the role is function, then the name field exists, which is the name of the function |
| content       | string     | Content returned by the role                                                           |
| function_call | dict       | Tool invocation                                                                        |

```
{
    "functions":
    [
        {
            "name": "get_fudan_university_scoreline",
            "description": "Query the past years' cut-off scores for Fudan University, for example: querying the 2020 cut-off scores for Fudan University",
            "parameters":
            {
                "type": "object",
                "properties":
                {
                    "year":
                    {
                        "type": "string",
                        "description": "Year, for example: 2020, 2019, 2018"
                    }
                },
                "required":
                [
                    "year"
                ]
            }
        }
    ],
    "chatrounds":
    [
        {
            "role": "system",
            "content": "CodeFuse is an intelligent assistant targeted at the R&D sector, aiming to help users solve development-related issues in a neutral and harmless manner. All responses are returned in Markdown format.\nYou can utilize many tools and functions to complete the given tasks. In each step, you need to analyze the current state and determine the next course of action through function calls. You can attempt multiple times. If you plan to continuously try different conditions, please try one condition at a time. If a Finish function is provided, it ends with a Finish call, otherwise, it concludes with a dialogue without a function_call."
        },
        {
            "role": "user",
            "content": "Query the 2020 cut-off scores for Fudan University"
        },
        {
            "role": "assistant",
            "content": null,
            "function_call":
            {
                "name": "get_fudan_university_scoreline",
                "arguments": "{\n  \"year\": \"2020\"\n}"
            }
        },
        {
            "role": "function",
            "name": "get_fudan_university_scoreline",
            "content": "{\n    \"scoreline\":{\n        \"Liberal Arts first tier\": 630,    \n        \"Liberal Arts second tier\": 610,  \n        \"Science first tier\": 650,  \n        \"Science second tier\": 630  \n    }\n}"
        },
        {
            "role": "assistant",
            "content": "The 2020 cut-off scores for Fudan University are as follows:\n\n- Liberal Arts first tier: 630 points\n- Liberal Arts second tier: 610 points\n- Science first tier: 650 points\n- Science second tier: 630 points"
        }
    ]
}
```

The above data example of Function Call is used to answer users' queries about the admission scores of a certain university after a specific set of tools is provided.

### Evaluation Metrics

Since general models generally lack the capability of tool invocation, it is necessary to fine-tune the general model before performing Tool Learn-Eval evaluation, to teach the model the basic paradigm of tool usage.
Below, we define several metrics for assessing the use of tools:

<img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*SENpRIPAFi4AAAAAAAAAAAAADlHYAQ/original" style="width: 60%;" id="title-icon">

The sum of ②③④⑤ represents the total number of tool invocation failures, with ⑤ being a special case of tool name recognition failure.
