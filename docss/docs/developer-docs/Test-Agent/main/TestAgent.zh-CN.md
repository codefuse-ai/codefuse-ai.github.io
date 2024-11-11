---
nav:
  title: 文档
  order: -1
  second:
    title: 开发者文档
    order: -1
store:
  title: Test-Agent
  version: main
group:
  title: 🌱 Test-Agent
  index: true
  order: -1
title: Test-Agent
order: -1
toc: content
github: https://github.com/codefuse-ai/Test-Agent
---

### 本地 Mac M1 体验效果

![图片](https://github.com/codefuse-ai/Test-Agent/assets/103973989/8dba860f-c1bb-49d5-b9dd-a58e541562a6)

### 魔搭体验效果

魔搭模型访问链接：[ModelScope TestGPT-7B](https://modelscope.cn/models/codefuse-ai/TestGPT-7B/summary)

![MS](https://github.com/codefuse-ai/Test-Agent/assets/103973989/0e50b258-44f9-4dc6-8e30-0a01cf62d02b)

## 什么是 Test Agent？（Introduction）

**Test Agent** 旨在构建测试领域的“智能体”，融合大模型和质量领域工程化技术，促进质量技术代系升级。我们期望和社区成员一起合作，打造创新的测试领域解决方案，构建 24 小时在线的测试助理服务，让测试如丝般顺滑。

## 本期特性（Features）

- **模型** 本期我们开源了测试领域模型 TestGPT-7B。模型以 CodeLlama-7B 为基座，进行了相关下游任务的微调：

  - **多语言测试用例生成（Java/Python/Javascript）** 一直以来都是学术界和工业界非常关注的领域，近年来不断有新产品或工具孵化出来，如 EvoSuite、Randoop、SmartUnit 等。然而传统的用例生成存在其难以解决的痛点问题，基于大模型的测试用例生成在测试用例可读性、测试场景完整度、多语言支持方面都优于传统用例生成工具。本次重点支持了多语言测试用例生成，在我们本次开源的版本中首先包含了 Java、Python、Javascript 的测试用例生成能力，下一版本中逐步开放 Go、C++等语言。
  - **测试用例 Assert 补全** 对当前测试用例现状的分析与探查时，我们发现代码仓库中存在一定比例的存量测试用例中未包含 Assert。没有 Assert 的测试用例虽然能够在回归过程中执行通过，却无法发现问题。因此我们拓展了测试用例 Assert 自动补全这一场景。通过该模型能力，结合一定的工程化配套，可以实现对全库测试用例的批量自动补全，智能提升项目质量水位。

- **工程框架** 本地模型快速发布和体验工程化框架
  - ChatBot 页面
  - 模型快速启动
  - 私有化部署，本地化的 GPT 大模型与您的数据和环境进行交互，无数据泄露风险，100%安全

**后续我们会持续迭代模型和工程化能力：**

- 不断加入更多令人激动的测试域应用场景，如领域知识问答、测试场景分析等
- 支撑面向测试场景的 copilot 工程框架开放，如测试领域知识智能 embedding、测试通用工具 API 体系、智能测试 Agent 等，敬请期待！
- 以 7B 为基础，逐步扩展至 13B、34B 模型。欢迎关注！

## 性能最强的 7B 测试领域大模型（Model）

目前在 TestAgent 中，我们默认使用了 TestGPT-7B 模型。与当前已有开源模型相比，**TestGPT-7B 模型在用例执行通过率（pass@1）、用例场景覆盖（平均测试场景数）上都处于业界领先水平。**
TestGPT-7B 模型核心能力的评测结果如下：

- 多语言测试用例生成
  针对模型支持的三种语言：Java、Python、Javascript，Pass@1 评测结果如下：

| Model                  | Java pass@1 | Java Average number of test scenarios | Python pass@1 | Python Average number of test scenarios | Javascript pass@1 | Javascript Average number of test scenarios |
| ---------------------- | ----------- | ------------------------------------- | ------------- | --------------------------------------- | ----------------- | ------------------------------------------- |
| TestGPT-7B             | 48.6%       | 4.37                                  | 35.67%        | 3.56                                    | 36%               | 2.76                                        |
| CodeLlama-13B-Instruct | 40.54%      | 1.08                                  | 30.57%        | 1.65                                    | 31.7%             | 3.13                                        |
| Qwen-14B-Chat          | 10.81%      | 2.78                                  | 15.9%         | 1.32                                    | 9.15%             | 4.22                                        |
| Baichuan2-13B-Chat     | 13.5%       | 2.24                                  | 12.7%         | 2.12                                    | 6.1%              | 3.31                                        |

- 测试用例 Assert 补全
  目前模型支持 Java 用例的 Assert 补全，Pass@1 评测结果如下：

| Model               | pass@1 | Percentage of strong validation |
| ------------------- | ------ | ------------------------------- |
| Codefuse-TestGPT-7B | 71.1%  | 100%                            |

## 工程架构（Engineering Architecture）

![JG](https://github.com/codefuse-ai/Test-Agent/assets/103973989/1b61beff-df59-4ab3-843c-266413c8dbc4)

大模型的号角已经吹响，测试领域大模型也在不断进化中，通过预训练过程中积累的丰富世界知识，在复杂交互环境中展现出了非凡的推理与决策能力。

尽管在测试领域中基础模型取得了显著的成果，但仍然存在一些局限性，特定领域的测试任务通常需要专业化的工具或领域知识来解决。例如，基础模型可以通过预训练知识完成单次测试代码生成和测试文本生成等任务，但处理复杂的集成用例生成、特定领域用例生成和测试流程 pipeline 交互等问题时，需要更专业的工具和领域知识。因此将专用工具与基础模型整合在一起，可以充分发挥它们各自的优势。专用工具可以解决模型时效性不足、增强专业知识、提高可解释性和鲁棒性的问题。而基础模型则具备类人的推理规划能力，可以理解复杂的数据和场景，并与现实世界进行交互。

在本期开放模型工程化部署和 ChatBot 基础上，我们将继续在测试开源领域深耕投入。协同社区志趣相投开发者们，一起打造测试领域最领先的 Tools 工程体系、智能测试助理和测试开源工程！
