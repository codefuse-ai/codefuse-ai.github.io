---
group:
  title: Connector
  order: 0
title: Memory
order: 3
toc: content
---

## Memory Manager

- 将 chat history 在数据库进行读写管理，包括 user input、 llm output、doc retrieval、code retrieval、search retrieval
- 对 chat history 进行关键信息总结 summary context，作为 prompt context
- 提供检索功能，检索 chat history 或者 summary context 中与问题相关信息，辅助问答

## 使用示例

完整示例见 ~/tests/connector/memory_manager_test.py
