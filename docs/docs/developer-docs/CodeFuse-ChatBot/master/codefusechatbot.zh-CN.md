---
store:
  title: CodeFuse-ChatBot
  version: master
group:
  title: 🌱 CodeFuse-ChatBot
  index: true
  order: -1
title: CodeFuse-ChatBot
toc: content
---

DevOps-ChatBot 是由蚂蚁 CodeFuse 团队开发的开源 AI 智能助手，致力于简化和优化软件开发生命周期中的各个环节。该项目结合了 Multi-Agent 的协同调度机制，并集成了丰富的工具库、代码库、知识库和沙盒环境，使得 LLM 模型能够在 DevOps 领域内有效执行和处理复杂任务。

## 📜 目录

- [🤝 介绍](#-介绍)
- [🎥 演示视频](#-演示视频)
- [🧭 技术路线](#-技术路线)

## 🤝 介绍

💡 本项目旨在通过检索增强生成（Retrieval Augmented Generation，RAG）、工具学习（Tool Learning）和沙盒环境来构建软件开发全生命周期的 AI 智能助手，涵盖设计、编码、测试、部署和运维等阶段。 逐渐从各处资料查询、独立分散平台操作的传统开发运维模式转变到大模型问答的智能化开发运维模式，改变人们的开发运维习惯。

本项目核心差异技术、功能点：

- **🧠 智能调度核心：** 构建了体系链路完善的调度核心，支持多模式一键配置，简化操作流程。 [使用说明](/zh-CN/docs/api-docs/MuAgent/overview/multi-agent)
- **💻 代码整库分析：** 实现了仓库级的代码深入理解，以及项目文件级的代码编写与生成，提升了开发效率。
- **📄 文档分析增强：** 融合了文档知识库与知识图谱，通过检索和推理增强，为文档分析提供了更深层次的支持。
- **🔧 垂类专属知识：** 为 DevOps 领域定制的专属知识库，支持垂类知识库的自助一键构建，便捷实用。
- **🤖 垂类模型兼容：** 针对 DevOps 领域的小型模型，保证了与 DevOps 相关平台的兼容性，促进了技术生态的整合。

🌍 依托于开源的 LLM 与 Embedding 模型，本项目可实现基于开源模型的离线私有部署。此外，本项目也支持 OpenAI API 的调用。[接入 Demo](/zh-CN/docs/developer-docs/CodeFuse-ChatBot/master/fastchat)

👥 核心研发团队长期专注于 AIOps + NLP 领域的研究。我们发起了 Codefuse-ai 项目，希望大家广泛贡献高质量的开发和运维文档，共同完善这套解决方案，以实现“让天下没有难做的开发”的目标。

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*q13WSrHGwkQAAAAAAAAAAAAADlHYAQ/original" alt="图片" width="600" height="333">
</div>

## 🎥 演示视频

为了帮助您更直观地了解 Codefuse-ChatBot 的功能和使用方法，我们录制了一系列演示视频。您可以通过观看这些视频，快速了解本项目的主要特性和操作流程。

- 知识库导入和问答：[演示视频](https://www.youtube.com/watch?v=UGJdTGaVnNY&t=2s&ab_channel=HaotianZhu)
- 本地代码库导入和问答：[演示视频](https://www.youtube.com/watch?v=ex5sbwGs3Kg)

## 🧭 技术路线

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*ejxYTL2vqhgAAAAAAAAAAAAADlHYAQ/original" alt="Image" width="600" height="503">
</div>

- 🧠 **Multi-Agent Schedule Core:** 多智能体调度核心，简易配置即可打造交互式智能体。
- 🕷️ **Multi Source Web Crawl:** 多源网络爬虫，提供对指定 URL 的爬取功能，以搜集所需信息。
- 🗂️ **Data Processor:** 数据处理器，轻松完成文档载入、数据清洗，及文本切分，整合不同来源的数据。
- 🔤 **Text Embedding & Index:**：文本嵌入索引，用户可以轻松上传文件进行文档检索，优化文档分析过程。
- 🗄️ **Vector Database & Graph Database:** 向量与图数据库，提供灵活强大的数据管理解决方案。
- 📝 **Prompt Control & Management:**：Prompt 控制与管理，精确定义智能体的上下文环境。
- 🚧 **SandBox:**：沙盒环境，安全地执行代码编译和动作。
- 💬 **LLM:**：智能体大脑，支持多种开源模型和 LLM 接口。
- 🛠️ **API Management:：** API 管理工具，实现对开源组件和运维平台的快速集成。

具体实现明细见：[技术路线明细](/zh-CN/docs/developer-docs/CodeFuse-ChatBot/master/roadmap)
