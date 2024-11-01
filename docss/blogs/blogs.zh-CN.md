---
title: Blogs
nav:
  title: 博客
  order: 1
bannerTitle: https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*hGKPRajWQkIAAAAAAAAAAAAADlHYAQ/original
toc: content

# 发布
publish:
  - time: '2023-12-11'
    title: 蚂蚁CodeFuse新版发布，前端能力优化，支持安卓开发
    desc: 蚂蚁百灵研发助手 CodeFuse 插件发布新版，本版本新增支持 Android Studio，并针对 JavaScript、TypeScript 等前端语言优化了模型效果，同时还将输出Token增加到最多 1024 个。
    link: /zh-CN/blogDetails/20231211

  - time: '2023-12-20'
    title: DevOps-ChatBot：DevOps开源端到端智能AI助手
    desc: 我们发起并开源DevOps-ChatBot端到端AI智能助手，专为软件开发的全生命周期而设计：通过DevOps垂类知识库 + 知识图谱增强 + SandBox执行环境等技术来保障生成内容的准确性、及时性并让用户交互修改代码编译执行，确保答案的可靠性；通过静态分析技术 + RAG检索增强生成等技术来让大模型感知上下文，实现代码库级别的组件理解、仓库项目级的代码文件修改、生成，不单单只是函数片段级的代码补齐；通过完善链路级的Multi-Agent调度设计、协同知识库、代码库、工具库、沙盒环境，来让大模型可以实现DevOps领域复杂多步骤的任务；并且通过DevOps领域专属的领域模型和评测数据构建支持私有化部署来保障数据的安全性，以及特定任务的高可用性。
    link: /zh-CN/blogDetails/20231220

  - time: '2024-01-19'
    title: MFTCoder 重磅升级v0.3.0发布，支持Mixtral等更多模型，支持收敛均衡, 支持FSDP
    desc: CodeFuse在2023年9月开源了一种多任务微调框架——MFTCoder，它可以实现在多个任务上同时并行地进行微调。通过结合多种损失函数，我们有效地解决了多任务学习中常见的任务间数据量不平衡、难易不一和收敛速度不一致等挑战。
    link: /zh-CN/blogDetails/20240119

  - time: '2024-04-23'
    title: 变革来袭！多Agent框架MuAgent带你解锁代码开发新姿势
    desc: 在这个信息技术爆炸的时代，我们都知道大型语言模型（LLM）拥有处理复杂问题的能力，但当遇到编程难题这种更高级的挑战时，单独的LLM Agent可能就不够看了。社区里动起了脑筋，玩出了新花样——组合多个Agent来应对高难度挑战！正如Multi Agent的构建过程所示，与其说我们是在设计Agents，不如说是对当前需求的深入理解后去构建出一条专属于某个场景的SOP。
    link: /zh-CN/blogDetails/20240423

# 技术
develop:
  - time: '2024-01-23'
    title: NVIDIA TensorRT-LLM支持CodeFuse-CodeLlama-34B上的int4量化和推理优化实践
    desc: 采用了静态量化方式，即通过矫正数据离线地进行量化，得到诸如缩放因子和零点的量化参数，在推理时不再进行量化参数的更新。与之对应的是动态量化，会在模型推理的同时根据输入进行量化参数的调整。
    link: /zh-CN/blogDetails/20240123

  - time: '2024-07-06'
    title: 2024年5月90篇代码大模型论文最全整理
    desc: 2024年5月90篇代码大模型论文最全整理
    link: /zh-CN/blogDetails/20240614

  - time: '2024-07-05'
    title: ACL 2024｜D2LLM：将Causal LLM改造成向量搜索模型的黑科技
    desc: 我们提出了一种结合了以上两者的优点的用于语义搜索的分解和蒸馏大型语言模型D2LLM。我们将交叉编码器分解为一个高效的双编码器，双编码器集成了多头注意力池化模块，另外，通过一个交互模拟模块，模型实现了对细微语义关系的理解。我们使用对比、排序和特征模仿技术将LLM的知识蒸馏到该模型中。实验表明，D2LLM在三项任务的指标上超过了五个领先的基准模型，特别是在自然语言推理（NLI）任务的性能至少提高了6.45%。
    link: /zh-CN/blogDetails/20240705

  - time: '2024-07-03'
    title: ACL 2024 | CoCA：自注意力的缺陷与改进
    desc: 在Transformer诞生之初，被视为天然具备的长度外推能力，随着相关研究的深入，人们发现，传统的Transformer架构在训练长度之外无一例外表现出糟糕的推理性能。作者从一个全新的视角，剖析了造成这种糟糕表现的可能原因，并给出了相应的解决方案
    link: /zh-CN/blogDetails/20240703

  - time: '2024-07-06'
    title: 2024年6月118篇代码大模型论文最全整理
    desc: 2024年6月118篇代码大模型论文最全整理
    link: /zh-CN/blogDetails/20240706

  - time: '2024-08-05'
    title: 2024年7月117篇代码大模型论文最全整理
    desc: 2024年7月117篇代码大模型论文最全整理
    link: /zh-CN/blogDetails/20240805

  - time: '2024-08-07'
    title: 蚂蚁CodeFuse代码大模型技术解析：基于全仓库上下文的代码补全
    desc: 2023年CodeFuse完成了百亿级别的代码大模型从0到1的预训练，配合指令微调、量化部署等一系列配套技术，成功将AI大模型能力应用到多个下游研发场景，助力生产提效。在众多下游产品中，CodeFuse代码补全插件直接触及研发过程中最核心的编码场景，因此对开发效率的影响最显著。目前，CodeFuse代码补全插件是CodeFuse系列产品中用户数量最多、留存率最大，调用AI能力最多的产品。
    link: /zh-CN/blogDetails/20240807

  - time: '2024-08-20'
    title: ICWS 2024 | 基于生成长度预测的大语言模型推理请求调度
    desc: 本文尝试从请求调度的的角度提高LLM的推理性能，提出面向LLM推理的请求调度系统Magnus。它通过对请求的生成长度进行预测，将生成长度相似的请求放在同一个批次(Batch)中进行处理，来降低计算浪费并增大批次规模，从而降低请求响应时间并提高大模型推理的吞吐量。实验表明，Magnus可以将响应时间降低 89.7%，请求吞吐量提高 234%。在这项工作中，我们显著提高了静态批处理(Static Batching)的吞吐量，在未来，我们将进一步探索基于生成长度预测的请求调度方案在持续批处理(Continuous Batching)中的应用。
    link: /zh-CN/blogDetails/20240820

# 产品
products:
  - time: '2024-04-05'
    title: Not updated yet
    desc: Not updated yet
    link: /zh-CN/blogDetails/001

# 使用
use:
  - time: '2023-11-01'
    title: 在 Visual Studio Code 中使用 CodeFuse
    desc: 本文将介绍如何在本地 Visual Studio Code（下文简称为 VS Code）中安装和使用 CodeFuse 插件。
    link: /zh-CN/blogDetails/20231101

  - time: '2024-01-23'
    title: NVIDIA TensorRT-LLM支持CodeFuse-CodeLlama-34B上的int4量化和推理优化实践
    desc: 采用了静态量化方式，即通过矫正数据离线地进行量化，得到诸如缩放因子和零点的量化参数，在推理时不再进行量化参数的更新。与之对应的是动态量化，会在模型推理的同时根据输入进行量化参数的调整。
    link: /zh-CN/blogDetails/20240123

  - time: '2024-04-23'
    title: 变革来袭！多Agent框架MuAgent带你解锁代码开发新姿势
    desc: 在这个信息技术爆炸的时代，我们都知道大型语言模型（LLM）拥有处理复杂问题的能力，但当遇到编程难题这种更高级的挑战时，单独的LLM Agent可能就不够看了。社区里动起了脑筋，玩出了新花样——组合多个Agent来应对高难度挑战！正如Multi Agent的构建过程所示，与其说我们是在设计Agents，不如说是对当前需求的深入理解后去构建出一条专属于某个场景的SOP。
    link: /zh-CN/blogDetails/20240423

# 活动咨询
EventConsultation:
  - time: '2024-09-14'
    title: CodeFuse 开源一周年，焕新出发！
    desc: CodeFuse 开源一周年，焕新出发！
    link: /zh-CN/blogDetails/20240914
---
