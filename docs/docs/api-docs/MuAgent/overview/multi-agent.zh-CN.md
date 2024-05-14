---
nav:
  title: 文档
  order: -1
  second:
    title: API文档
    order: 0
group:
  title: ❤️ Codefuse-muAgent
  # index: true
  order: -1
title: muAgent
order: -1
toc: content
---

# 简介

为了提高大型模型在推理准确性方面的表现，业界出现了多种创新的大型语言模型(LLM)玩法。从最早的 CoT、ToT 到 GoT，这些方法不断拓展了 LLM 的能力边界。在处理复杂问题时，我们可以通过 ReAct 过程来选择、调用和执行工具反馈，同时实现多轮工具使用和多步骤执行。

但对于更复杂的场景，例如复杂代码的开发，单一功能的 LLM Agent 显然难以胜任。因此，社区开始发展出多 Agent 的组合玩法，比如专注于 metaGPT、GPT-Engineer、chatDev 等开发领域的项目，以及专注于自动化构建 Agent 和 Agent 对话的 AutoGen 项目。

经过对这些框架的深入分析，发现大多数的 Agent 框架整体耦合度较高，其易用性和可扩展性较差。在预设场景中实现特定场景，但想要进行场景扩展却困难重重。

因此，我们希望构建一个可扩展、易于使用的 Multi-Agent 框架，以支持 ChatBot 在获取知识库信息的同时，能够辅助完成日常办公、数据分析、开发运维等各种通用任务。

本项目的 Mutli-Agent 框架汲取兼容了多个框架的优秀设计，比如 metaGPT 中的消息池（message pool）、autogen 中的代理选择器（agent selector）等。

<div align=center>
  <img src="../../../../static/api-docs/muAgent/muagent_framework.png" alt="图片">
</div>

# muAgent 框架

在 MuAgent 中，我们除了定义 Agent 交互链路和 AgentBase 基础执行流以外，还额外设计了 Prompt Manager 和 Memory Manager 两个基础组件，分别用于自动化构建 Prompt 和 chat history 管理。最终构建出一个可扩展、易于使用的 Multi-Agent 框架，包括以下内容

- Agent Base：构建了四种基本的 Agent 类型 BaseAgent、ReactAgent、ExecutorAgent、SelectorAgent，支撑各种场景的基础活动
- Communication：通过 Message 和 Parse Message 实体完成 Agent 间的信息传递，并与 Memory Manager 交互再 Memory Pool 完成记忆管理
- Prompt Manager：通过 Role Handler、Doc/Tool Handler、Session Handler、Customized Handler，来自动化组装 Customized 的 Agent Prompt
- Memory Manager： 用于支撑 chat history 的存储管理、信息压缩、记忆检索等管理，最后通过 Memory Pool 在数据库、本地、向量数据库中完成存储
- Component：用于构建 Agent 的辅助生态组件，包括 Retrieval、Tool、Action、Sandbox 等
- Customized Model：支持私有化的 LLM 和 Embedding 的接入

## Agent Base

在 Agent 层面，提供四种基本的 Agent 类型，对这些 Agent 进行 Role 的基础设定，可满足多种通用场景的交互和使用。所有的 Action 都由 Agent 执行。

1. BaseAgent：提供基础问答、工具使用、代码执行的功能，根据 Prompt 格式实现 输入 => 输出

<div align=center>
  <img src="../../../../static/api-docs/muAgent/baseagent.png" alt="图片" style="width: 500px;  height:auto;">
</div>

2. ReactAgent：提供标准 React 的功能，根据问题实现当前任务
<div align=center>
  <img src="../../../../static/api-docs/muAgent/reactagent.webp" alt="图片" style="width: 500px;  height:auto;">
</div>

3. ExecutorAgent：对任务清单进行顺序执行，根据 User 或 上一个 Agent 编排的计划，完成相关任务
Agent 接受到任务清单(List[task])，对这个任务清单 Task 进行循环执行（中间也可添加 Feedback Agent 来进行任务重新优化），直到任务完成
<div align=center>
  <img src="../../../../static/api-docs/muAgent/executoragent.png" alt="图片" style="width: 500px;  height:auto;">
</div>

4. SelectorAgent：提供选择 Agent 的功能，根据 User 或 上一个 Agent 的问题选择合适的 Agent 来进行回答.
<div align=center>
  <img src="../../../../static/api-docs/muAgent/selectoragent.webp" alt="图片" style="width: 500px;  height:auto;">
</div>

## Communication

为了让 Agent 之间进行更好的交互，以及能够让每一个 Agent 接受到足够的信息完成它们特定任务，我们将 Message 信息体分成了多个部分，System Content、Info Content、LLM Content 和 LLM Parsed Content 等

- System Content：用于存储管理当前 LLM 输出的时间，Role 信息等
- Info Content：LLM 辅助信息，比如像知识库查询信息、代码库检索信息、工具信息、Agent 信息等
- LLM Content：直接存储和传递 LLM 产生的信息
- LLM Parsed Content：对 LLM 进行解析转成更易操作的 key-value 数据结构，方便对 LLM 内容进行过滤
- Customized Content：用于管理自定义 action 产生的 key-value 数据内容，用于后续自定义 Prompt 模板的组装构建

通过对以上消息格式的定义，我们便可以完成通用消息的传递和管理。具体组装见 Prompt Manager 模块

## Context Manager

### Memory Manager

主要用于 chat history 的管理

- 存储管理：在数据库或本地实现对 chat history 进行 save 和 load 管理，包括 user input、 llm output、observation ouput
- 信息压缩：对 chat history 进行关键信息压缩总结 summary context，比如说单文本概况、侧重不同角度进行文本概况、关键信息提取、多文本概况，作为 Prompt context
- 记忆检索：提供基础检索功能，检索 chat history 或者 Summary Context 中与问题相关信息，辅助问答
- LLM 自动触发：后续定义策略或通过 LLM 来 触发 压缩总结和检索的功能

### Prompt Manager

提问 LLM 已经成为一种常见的实践，但如何让多个大模型分工并协调好 LLM 间的规划、调用工具、代码编写能力，来引导它们产生期望的输出，成为了一个关键的问题，其本质就是将业务问题抽象并拆解到可执行的 Prompt，那与其说我们是在设计 Agents，不如说是对当前需求的深入理解后进行框架设计。
在 LLM 介入到实际业务场景（不涉及 SFT 过程），我们能通过设计 Agent Prompt 的内容来指定 LLM 完成相应任务得到相应输出。在 MuAgent 这个过程中，将这个 Prompt 分成了三个部分，System Prompt、Context Prompt、Customized Prompt

- System Prompt 包括 Role Name、Role Description、Task 等
- Context Prompt 包括 Doc Context、Code Context、Tool Context、Agent Context、Session Context 等
- Customized Prompt 则是 自定义的一些 Input 和 Ouput，比如说 ...
  我们还可以要求模型输出结构化的文本，比如说 tool 的 json 串、*code\ncode_content*等来完成特定工作流。

**Automatic Prompt Assemble**
在按照上述结构定义后，我们便可以通过以下方式来完成 Prompt 的自动化组装，不需要每次去做大量的 prompt 调整工作

1. 定义 Agent 时直接配置 Role Name、Role Description、Task 等来决定 Agent 需要做的事情
2. 预封装一些可复用的 Context Prompt 通用策略，比如说可筛选 Role 的 SessionContext、可配置的 Tool、Code Retrieval、Doc Retrieval、Search Retrieval、Agent 来完成对应的组装
3. 由于 Agent 的 Prompt 是相对个性化的操作，所以也支持在 Prompt Manager 模块内新增新的 key-context 设计，实现个性化的 Agent Prompt。

**Automatic Prompt Design**
能根据 role description、task、query 等来自动化设计出最优的 prompt；待定义...

**Multi Prompt Design**
根据前面 Prompt 的定义，我们可以了解到 Prompt 由 System Prompt、Context Prompt、Customized Prompt 三个部分组成，三个部分的任一变化都有可能会引起 LLM 最终输出结果的变化。
对于同种任务而言，即它们的 System Prompt 是相同的。那么在不考虑 Customiezd Prompt 变化时，就可实现不同上下文的组装差异，比如说 Prompt A 获取 10 轮的 chat history，而 Pormpt B 采用 5 轮的 chat history，又或者是对 chat history 进行信息过滤、信息压缩等。
待实现...

## Component

### Retrieval

在所有 Prompt 的 Context 中，除了 Chat History 的会话信息外，还需要依赖于从外界文档知识库、代码库、互联网搜索得来的相关信息，这些模型参数知识外的知识体系能够极大提升 Agent 完成复杂任务的能力。
于是在 MuAgent 中我们集成了 Doc、Internet Search、Code Retrieval 三种检索信息的方式，并定义了一个抽象 IMRetrieval 类，可支持开发者自定义个性化的知识库，来完成 Agent 的知识库注册。

**Doc Retrieval**
文档向量数据库是当前最主流的知识库构建方法，使用 Text Embedding 模型对文档进行向量化并在向量数据库中存储。未来我们也会去支持基于知识图谱查询以及通过大模型自动抽取实体和关系的方式，来挖掘数据中多种复杂关系。

**Code Retrieval**
LLM 在代码生成、修复以及组件理解的任务上，会面临代码训练数据滞后、无法感知代码上下文依赖结构。以及在开发的过程中，对现有代码库和依赖包的理解、检索相关代码、查询元信息等会占用较长的时间。于是我们希望通过代码结构分析和代码检索生成来，以及为 LLM 提供知识体系外的代码。

**Search Retrieval**
除了现成的文档和代码知识库以及之外，在日常中实践中会去浏览大量网页内容获取更多的知识，帮助我们理解新兴的场景、业务、技术等，于是我们接入了 duckduckgosearch 这款开源的搜索工具，能够为 LLM 提供知识储备以外的内容。

### Tool

随着 OpenAI 推出了 Function Call 功能，通过 LLM 生成指定工具的参数并执行调用，使机器能更好地理解和回应人类的需求，从而解决实际问题和重复性的工作。现如今工具学习能力越来越作为开源模型的标配。那在 MuAgent 中也支持 Agent 完成 Tool 的注册，通过 Python 注册模板`BaseToolModel`类，编写 Tool_name、Tool_description、ToolInputArgs、ToolOutputArgs、run 等相关属性和方法即可实现工具的快速接入，同时支持 langchain Tool 接口的直接使用。
例如像上述 XXRetrieval 的功能也可以注册为 Tool，最终由 LLM 执行调用。

### Action

在 MuAgent 的定义里，Action 是作为 LLM 具体要执行的动作或动作流，会包括 LLM 信息处理、知识检索、工具调用以及代码执行等一个综合性的复杂过程，是一个动态过程。比如在 React 过程中，我们通过 LLM 获取到了一个 Tool 参数，接下来"将工具参数放入到 Tool 并执行调用"这个过程就是 Action，它去实践性的调用了 Tool。又或者说我们定义了一个 Agent，它编排在一个固定 Agent 的 Action 步骤之中，这个 Agent 的输入参数由 Action 特殊指定。也就是说无论是由 LLM 产生参数还是工程设定参数，只有涉及具体的执行过程，就是一个 Action。

## 模块分类

- [connector](../connector/connector_agent.zh-CN.md) 主要介绍这块 Agent 框架的工作
- llm_models
- retrieval
- tools
- sandbox
- utils
