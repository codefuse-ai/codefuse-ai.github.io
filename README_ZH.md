<p align="center">
  <img src="static/LOGO.png" width="50%" />
</p>

<div align="center">

[**简体中文**](./README.md)|[**HuggingFace**](https://huggingface.co/codefuse-ai)|[**ModelScope**](https://modelscope.cn/organization/codefuse-ai)

Hello! 这里是 CodeFuse！
CodeFuse 的使命是开发专门设计用于支持整个软件开发生命周期的大型代码语言模型（Code LLMs），涵盖设计、需求、编码、测试、部署、运维等关键阶段。我们致力于打造创新的解决方案，让软件开发者们在研发的过程中如丝般顺滑。

</div align="center">

## CodeFuse 开源官网

### 快速访问

通过访问 https://codefuse-ai.github.io/ 即可快速访问 CodeFuse 开源官网

在这里，你可以了解到以下内容:
● 我们会分享 CodeFuse 项目的背景故事，是如何启动这个项目，以及背后的理念
● 在主页面展示了一系列围绕整个软件开发生命周期所涉及的 AI 开发项目
● 文档页编写了详细的文档来帮助各位更深入地了解项目
● 在项目发展过程中，也会实时同步 CodeFuse 项目的最新版本更新和进展，并展示项目的关键功能和特性
● 我们也欢迎提问和贡献，在这里提供了贡献指南和指导原则，说明如何来提交问题、改进代码或文档
● 同样地，我们也会在 Publication 里展示 CodeFuse 最新的学术成果和技术文章

希望以上这些内容能够好帮助大家了解 CodeFuse！

![](./static/codefuse_web.webp)

### 快速修改

1、拉取代码

```
git clone https://github.com/codefuse-ai/codefuse-ai.github.io.git

cd codefuse-ai.github.io.git
```

2、确认 node 版本

```bash
node -v

# if your version is wrong
nvm install <version>
nvm use <version>
```

3、安装相关依赖

```bash
npm cache clean --force # 清除缓存
npm install
```

4、本地启动

```bash
#you can check it by npm-start if you have any changes before you push
npm start
```

### 基本介绍

| CodeFuse 域 | 功能                                                                                  | 理念                                                 |
| ----------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 代码域      | 旨在提升大预言模型的多任务能力                                                        | 融会贯通，代码天成                                   |
| 运维域      | 旨在融合 RAG、工具学习、EKG 等技术对软件开发生命周期进行提效                          | 面向过程编程，过程即是结果                           |
| 分析域      | 满足大规模、复杂的代码库分析需求，适应多元化的静态分析场景                            | 如你所愿，洞察代码                                   |
| 测试域      | 构建测试领域的“智能体”，融合大模型和质量领域工程化技术，促进质量技术代系升级。        | TestAgent：您的 24 小时在线测试助手                  |
| 推理域      | 缓存已生成的模型结果，降低类似请求的响应时间，提升用户体验                            | 致力高吞吐，缔造即刻智能                             |
| 评测域      | 构建开发编程领域的评测基准， 用于评估模型在代码补全，代码生成，测例生成等多类任务性能 | 高效测准、精确反馈 -代码大模型的企业级多任务评估基准 |

## 后续更新

1. 我们会不断完善文档内容来提供更好的技术支持。
2. 后续会增加 Blog 页面，来持续同步 CodeFuse 的最新技术/技术应用/学术前沿文章。
3. CodeFuse 的线上社区活动，包括新手任务计划参考案例、社区共建计划参考案例等，也会在这里进行同步发布

## 关于 CodeFuse 团队

CodeFuse 团队由一群充满热情的成员组成，我们的目标是构建大型编码语言模型（Code LLMs），以支持和提升在整个软件开发生命周期中的 AI 原生开发工作。我们的工作覆盖了从设计需求、编写代码、测试、构建、部署、运维到洞察分析等关键环节。我们积极推广开源精神，目前已经推出了 15 个代码相关的模型，并开源了一系列技术工具，例如 MFTCoder、CodeFuse-VLM、CodeFuse-DevOps、CodeFuse-Query、TestGPT 和 CodeFuse-muAgent。此外，为了让用户在日常编码工作中能够直接受益，我们还开发了 CodeFuse-IDE 插件。同时 CodeFuse 团队至今有 6 篇技术论文被顶会接收，技术栈涉及语义检索、上下文增长、大模型训练微调、大模型推理加速等大模型技术领域。另外还参与了信通院、ITU 国际电联相关标准制定，获得多项国内行业奖励，总计获批软件专著 2 项。随时欢迎和我们交流，如果您对这项激动人心的工作感兴趣，欢迎加入我们！

## 联系我们

CodeFuse 的相关模型和数据集也在陆续开源中，如果您喜欢我们的工作，欢迎试用、指正错误和贡献代码，可以的话请给我们的项目增加 Star 来支持我们。
● GitHub 项目主页：https://github.com/codefuse-ai
● HuggingFace 主页：https://huggingface.co/codefuse-ai
● 魔搭社区主页：https://modelscope.cn/organization/codefuse-ai

如果您想更快地获取到最新信息，欢迎加入我们的企业微信群.

![](./static/wechat.webp)
