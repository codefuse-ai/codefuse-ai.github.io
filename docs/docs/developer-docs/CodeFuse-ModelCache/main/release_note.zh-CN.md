---
store:
  title: CodeFuse-ModelCache
  version: main
group:
  title: 🌱 CodeFuse-ModelCache
  order: -1
title: 版本记录
order: 3
toc: content
github: https://github.com/codefuse-ai/CodeFuse-ModelCache
---

| 时间     | 功能                                                                                                                                                                                                       | 版本号 |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 20230430 | 完成 GPTCache 调研，开源流程在 OpenAI 接口上跑通，单节点形式                                                                                                                                               | 无     |
| 20230509 | 1、完成技术选型及上下游交互方案<br>2、重新开发数据库模块，替换 SQLalchemy 框架<br>3、重构 llm_handler 模块，兼容 codegpt，适配 codegpt 模型参数                                                            | V0.1.0 |
| 20230519 | 1、根据环境动态选择 codegpt 服务模式<br>2、模型本地加载能力，以及预加载能力<br>3、增加本地路径依据环境动态加载能力                                                                                         | V0.1.1 |
| 20230522 | 1、架构优化，调整为类 redis 结构，解藕大模型调用<br>2、关系数据库由 sqlite 切换至 OceanBase<br>3、向量数据库由 faiss 切换至 milvus<br>4、模型数据隔离能力<br>5、增加核心模块 adapter_query、adapter_insert | V0.2.0 |
| 20230531 | 1、线上环境上线，动态感知能力<br>2、embedding 模型评测及选型<br>3、增加预发环境及数据隔离能力<br>4、增加原始 query 字段透出能力                                                                            | V0.2.1 |
| 20230607 | 1、优化关系数据库访问性能<br>2、优化环境和模型隔离能力                                                                                                                                                     | V0.2.2 |
| 20230630 | 1、在 modelCache 中增加大模型 embedding 层适配模块<br>2、增加采纳率统计能力                                                                                                                                | V0.2.3 |
| 20230730 | 1、增加缓存统计功能<br>2、增加数据删除功能接口<br>3、缓存一键清空能力上线<br>4、多轮会话能力研发，支持 system 指令和多轮对话                                                                               | v0.3.0 |
| 20230830 | 1、增加异步处理能力，性能提升超 20%<br>2、架构变更，解藕 embedding 推理和业务处理逻辑<br>3、黑名单过滤功能                                                                                                 | V0.3.1 |
