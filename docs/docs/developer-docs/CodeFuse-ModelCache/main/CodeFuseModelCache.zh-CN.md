---
nav:
  title: 文档
  order: -1
  second:
    title: 开发者文档
    order: -1
store:
  title: CodeFuse-ModelCache
  version: main
group:
  title: 🌱 CodeFuse-ModelCache
  index: true
  order: -1
title: CodeFuse-ModelCache
order: -1
toc: content
---

## Contents
- [新闻](#新闻)
- [项目简介](#项目简介)
- [架构大图](#架构大图)
- [致谢](#致谢)
- [Contributing](#Contributing)

## 新闻
- 🔥🔥[2023.12.10] 增加llmEmb、onnx、paddlenlp、fasttext等LLM embedding框架，并增加timm 图片embedding框架，用于提供更丰富的embedding能力。
- 🔥🔥[2023.11.20] codefuse-ModelCache增加本地存储能力, 适配了嵌入式数据库sqlite、faiss，方便用户快速启动测试。
- [2023.10.31] codefuse-ModelCache...

## 项目简介
Codefuse-ModelCache 是一个开源的大模型语义缓存系统，通过缓存已生成的模型结果，降低类似请求的响应时间，提升用户体验。该项目从服务优化角度出发，引入缓存机制，在资源有限和对实时性要求较高的场景下，帮助企业和研究机构降低推理部署成本、提升模型性能和效率、提供规模化大模型服务。我们希望通过开源，分享交流大模型语义Cache的相关技术。

## 架构大图
![modelcache modules](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*Z-6cSr6udKAAAAAAAAAAAAAADlHYAQ/original)

## 致谢
本项目参考了以下开源项目，在此对相关项目和研究开发人员表示感谢。<br />[GPTCache](https://github.com/zilliztech/GPTCache)

## Contributing
ModelCache是一个非常有趣且有用的项目，我们相信这个项目有很大的潜力，无论你是经验丰富的开发者，还是刚刚入门的新手，都欢迎你为这个项目做出一些贡献，包括但不限于：提交问题和建议，参与代码编写，完善文档和示例。你的参与将会使这个项目变得更好，同时也会为开源社区做出贡献。
