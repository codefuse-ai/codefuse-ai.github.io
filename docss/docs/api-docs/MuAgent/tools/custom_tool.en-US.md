---
group:
  title: Tools
  order: 4
title: Custom Tool
order: -1
toc: content
---

## Introduction

In MuAgent, it also supports the registration of Tools by Agents. By registering the BaseToolModel class with Python and writing

- Tool_name
- Tool_description
- ToolInputArgs
- ToolOutputArgs
- run

and other relevant properties and methods, the quick integration of tools can be achieved. It also supports the direct use of the langchain Tool interface. For example, functions like the aforementioned XXRetrieval can also be registered as a Tool, to be ultimately called by an LLM.

## BaseTool Structure

```
from langchain.agents import Tool
from pydantic import BaseModel, Field
from typing import List, Dict
import json


class BaseToolModel:
    name = "BaseToolModel"
    description = "Tool Description"

    class ToolInputArgs(BaseModel):
        """
        Input for MoveFileTool.
        Tips:
            default control Required, e.g.  key1 is not Required/key2 is Required
        """

        key1: str = Field(default=None, description="hello world!")
        key2: str = Field(..., description="hello world!!")

    class ToolOutputArgs(BaseModel):
        """
        Input for MoveFileTool.
        Tips:
            default control Required, e.g.  key1 is not Required/key2 is Required
        """

        key1: str = Field(default=None, description="hello world!")
        key2: str = Field(..., description="hello world!!")

    @classmethod
    def run(cls, tool_input_args: ToolInputArgs) -> ToolOutputArgs:
        """excute your tool!"""
        pass
```

## Register Example

```
from pydantic import BaseModel, Field
from typing import List, Dict
import requests
from loguru import logger

class Multiplier(BaseToolModel):
    """
    Tips:
        default control Required, e.g.  key1 is not Required/key2 is Required
    """

    name: str = "Multiplier"
    description: str = """useful for when you need to multiply two numbers together. \
    The input to this tool should be a comma separated list of numbers of length two, representing the two numbers you want to multiply together. \
    For example, `1,2` would be the input if you wanted to multiply 1 by 2."""

    class ToolInputArgs(BaseModel):
        """Input for Multiplier."""

        # key: str = Field(..., description="用户在高德地图官网申请web服务API类型KEY")
        a: int = Field(..., description="num a")
        b: int = Field(..., description="num b")

    class ToolOutputArgs(BaseModel):
        """Output for Multiplier."""

        res: int = Field(..., description="the result of two nums")

    @staticmethod
    def run(a, b):
        return a * b
```

## Use Example

```python
from muagent.tools import get_tool, toLangchainTools
tools = toLangchainTools([get_tool("Multiplier")])

print(get_tool("Multiplier").intput_to_json_schema())
print(get_tool("Multiplier").output_to_json_schema())
# tool run
print(tools[0].func(1,2))
```
