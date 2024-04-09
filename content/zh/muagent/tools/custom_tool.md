---
title: 自定义 Tool 接入
url: "muagent/custom-tool-zh"
aliases:
- "/muagent/custom-tool-zh"
---

## 基本介绍
在MuAgent中也支持Agent完成Tool的注册，通过Python注册模板BaseToolModel类，编写
- Tool_nam
- Tool_descriptio
- ToolInputArgs
- ToolOutputArgs
- run

等相关属性和方法即可实现工具的快速接入，同时支持langchain Tool接口的直接使用。 例如像上述 XXRetrieval 的功能也可以注册为Tool，最终由LLM执行调用。

## BaseTool 结构

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


## 注册示例

```
from pydantic import BaseModel, Field
from typing import List, Dict
import requests
from loguru import logger

from .base_tool import BaseToolModel

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


## 使用示例
```
from langchain.tools import StructuredTool
from muagent.tools import (
    WeatherInfo, Multiplier, toLangchainTools,
    TOOL_DICT, TOOL_SETS
)

# 函数执行
tools =  [
    StructuredTool(
            name=Multiplier.name,
            func=Multiplier.run,
            description=Multiplier.description,
            args_schema=Multiplier.ToolInputArgs,
        ), 
        StructuredTool(
            name=WeatherInfo.name,
            func=WeatherInfo.run,
            description=WeatherInfo.description,
            args_schema=WeatherInfo.ToolInputArgs,
        )
        ]

tools = toLangchainTools([TOOL_DICT["Multiplier"]])

# tool run 测试
print(tools[0].func(1,2))
```