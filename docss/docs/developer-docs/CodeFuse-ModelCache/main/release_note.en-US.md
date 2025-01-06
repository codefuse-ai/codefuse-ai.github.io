---
store:
  title: CodeFuse-ModelCache
  version: main
group:
  title: 🌱 CodeFuse-ModelCache
  order: -1
title: Release Note
order: 3
toc: content
github: https://github.com/codefuse-ai/CodeFuse-ModelCache
---

| 时间     | 功能                                                                                                                                                                                                                                                                                                         | 版本号 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| 20230430 | Completed GPTCache research, open-source process running through OpenAI interface, single-node form                                                                                                                                                                                                          | 无     |
| 20230509 | 1. Completed technology selection and upstream/downstream interaction scheme<br>2. Redeveloped database module, replaced SQLAlchemy framework<br>3. Refactored llm_handler module, compatible with codegpt, adapted codegpt model parameters 数                                                              | V0.1.0 |
| 20230519 | 1. Dynamically selected codegpt service mode based on environment<br>2. Capability for local model loading and pre-loading<br>3. Added dynamic loading capability for local paths based on environment                                                                                                       | V0.1.1 |
| 20230522 | 1. Architecture optimized, adjusted to a Redis-like structure, decoupled large model invocation<br>2. Switched relational database from SQLite to OceanBase<br>3. Switched vector database from FAISS to Milvus<br>4. Model data isolation capability<br>5. Added core modules adapter_query, adapter_insert | V0.2.0 |
| 20230531 | 1. Online environment launched with dynamic sensing capability<br>2. Embedding model evaluation and selection<br>3. Added staging environment and data isolation capability<br>4. Added exposure capability for the original query field                                                                     | V0.2.1 |
| 20230607 | 1. Optimized relational database access performance<br>2. Optimized environment and model isolation capabilities                                                                                                                                                                                             | V0.2.2 |
| 20230630 | 1. Added large model embedding layer adaptation module in modelCache<br>2. Added adoption rate statistical capability                                                                                                                                                                                        | V0.2.3 |
| 20230730 | 1. Added cache statistics feature<br>2. Added data deletion function interface<br>3. One-click cache clearing capability launched<br>4. Developed multi-turn conversation ability, supporting system commands and multi-turn dialogues                                                                       | v0.3.0 |
| 20230830 | 1. Added asynchronous processing capability, performance improved by over 20%<br>2. Architecture change, decoupled embedding inference and business processing logic<br>3. Blacklist filtering feature                                                                                                       | V0.3.1 |
