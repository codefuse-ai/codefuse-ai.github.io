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

This project is an open-source AI intelligent assistant, specifically designed for the entire lifecycle of software development, covering design, coding, testing, deployment, and operations. Through knowledge retrieval, tool utilization, and sandbox execution, Codefuse-ChatBot can not only answer professional questions you encounter during the development process but also coordinate multiple independent, dispersed platforms through a conversational interface.

## 📜 Contents

- [🤝 Introduction](#-introduction)
- [🧭 Technical Route](#-technical-route)

## 🤝 Introduction

💡 The aim of this project is to construct an AI intelligent assistant for the entire lifecycle of software development, covering design, coding, testing, deployment, and operations, through Retrieval Augmented Generation (RAG), Tool Learning, and sandbox environments. It transitions gradually from the traditional development and operations mode of querying information from various sources and operating on standalone, disparate platforms to an intelligent development and operations mode based on large-model Q&A, changing people's development and operations habits.

- **🧠 Intelligent Scheduling Core:** Constructed a well-integrated scheduling core system that supports multi-mode one-click configuration, simplifying the operational process.[Use Introduction](/docs/api-docs/MuAgent/overview/multi-agent)
- **💻 Comprehensive Code Repository Analysis:** Achieved in-depth understanding at the repository level and coding and generation at the project file level, enhancing development efficiency.
- **📄 Enhanced Document Analysis:** Integrated document knowledge bases with knowledge graphs, providing deeper support for document analysis through enhanced retrieval and reasoning.
- **🔧 Industry-Specific Knowledge:** Tailored a specialized knowledge base for the DevOps domain, supporting the self-service one-click construction of industry-specific knowledge bases for convenience and practicality.
- **🤖 Compatible Models for Specific Verticals:** Designed small models specifically for the DevOps field, ensuring compatibility with related DevOps platforms and promoting the integration of the technological ecosystem.

🌍 Relying on open-source LLM and Embedding models, this project can achieve offline private deployments based on open-source models. Additionally, this project also supports the use of the OpenAI API.[Access Demo](/docs/developer-docs/CodeFuse-ChatBot/master/fastchat)

👥 The core development team has been long-term focused on research in the AIOps + NLP domain. We initiated the CodefuseGPT project, hoping that everyone could contribute high-quality development and operations documents widely, jointly perfecting this solution to achieve the goal of "Making Development Seamless for Everyone."

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*q13WSrHGwkQAAAAAAAAAAAAADlHYAQ/original" alt="Image" width="600" height="333">
</div>

🌍 Relying on open-source LLM and Embedding models, this project can achieve offline private deployments based on open-source models. Additionally, this project also supports the use of the OpenAI API.

👥 The core development team has been long-term focused on research in the AIOps + NLP domain. We initiated the DevOpsGPT project, hoping that everyone could contribute high-quality development and operations documents widely, jointly perfecting this solution to achieve the goal of "Making Development Seamless for Everyone."

## 🧭 Technical Route

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*ejxYTL2vqhgAAAAAAAAAAAAADlHYAQ/original" alt="Image" width="600" height="503">
</div>

- 🧠 **Multi-Agent Schedule Core:** Easily configurable to create interactive intelligent agents.
- 🕷️ **Multi Source Web Crawl:** Offers the capability to crawl specified URLs for collecting the required information.
- 🗂️ **Data Processor:** Effortlessly handles document loading, data cleansing, and text segmentation, integrating data from different sources.
- 🔤 **Text Embedding & Index:**：Users can easily upload files for document retrieval, optimizing the document analysis process.
- 🗄️ **Vector Database & Graph Database:** Provides flexible and powerful data management solutions.
- 📝 **Prompt Control & Management:**：Precisely defines the contextual environment for intelligent agents.
- 🚧 **SandBox:**：Safely executes code compilation and actions.
- 💬 **LLM:**：Supports various open-source models and LLM interfaces.
- 🛠️ **API Management:：** Enables rapid integration of open-source components and operational platforms.

For implementation details, see: [Technical Route Details](/docs/developer-docs/CodeFuse-ChatBot/master/roadmap)
