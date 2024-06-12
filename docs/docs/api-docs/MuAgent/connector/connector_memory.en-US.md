---
group:
  title: Connector
  order: 0
title: Memory
order: 3
toc: content
---

## Memory Manager

Primarily used for managing chat history, not yet completed

- Read and write chat history in the database, including user input, llm output, doc retrieval, code retrieval, search retrieval.
- Summarize key information from the chat history into a summary context, serving as a prompt context.
- Provide a search function to retrieve information related to the question from chat history or summary context, aiding in Q&A.

## Usage Example

Examples see ~/tests/connector/memory_manager_test.py
