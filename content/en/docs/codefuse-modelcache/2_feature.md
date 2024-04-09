---
title: Feature
description: 介绍主要功能
url: "/docs/codefuse-modelcache-feature"
aliases:
- "/docs/codefuse-modelcache-feature"
---





From a functional standpoint, to address Huggingface network issues and improve inference speed, local inference capabilities for embeddings have been added. Given some limitations in the SQLAlchemy framework, we have rewritten the relational database interaction module for more flexible database operations. In practice, large model products need to interface with multiple users and models; thus, support for multi-tenancy has been added to ModelCache, as well as preliminary compatibility with system commands and multi-turn conversations.

Below is a feature comparison table for ModelCache and GPTCache modules:




<table>
  <tr>
    <th rowspan="2">Module</th>
    <th rowspan="2">Function</th>

  </tr>
  <tr>
    <th>ModelCache</th>
    <th>GPTCache</th>
  </tr>
  <tr>
    <td rowspan="2">Basic Interface</td>
    <td>Data query interface</td>
    <td class="checkmark">&#9745; </td>
    <td class="checkmark">&#9745; </td>
  </tr>
  <tr>
    <td>Data writing interface</td>
    <td class="checkmark">&#9745; </td>
    <td class="checkmark">&#9745; </td>
  </tr>
  <tr>
    <td rowspan="3">Embedding</td>
    <td>Embedding model configuration</td>
    <td class="checkmark">&#9745; </td>
    <td class="checkmark">&#9745; </td>
  </tr>
  <tr>
    <td>Large model embedding layer</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
  <tr>
    <td>BERT model long text processing</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Large model invocation</td>
    <td>Decoupling from large models</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
  <tr>
    <td>Local loading of embedding model</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Data isolation</td>
    <td>Model data isolation</td>
    <td class="checkmark">&#9745; </td>
    <td class="checkmark">&#9745; </td>
  </tr>
  <tr>
    <td>Hyperparameter isolation</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">Databases</td>
    <td>MySQL</td>
    <td class="checkmark">&#9745; </td>
    <td class="checkmark">&#9745; </td>
  </tr>
  <tr>
    <td>Milvus</td>
    <td class="checkmark">&#9745; </td>
    <td class="checkmark">&#9745; </td>
  </tr>
  <tr>
    <td>OceanBase</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="3">Session management</td>
    <td>Single-turn dialogue</td>
    <td class="checkmark">&#9745; </td>
    <td class="checkmark">&#9745; </td>
  </tr>
  <tr>
    <td>System commands</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
  <tr>
    <td>Multi-turn dialogue</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Data management</td>
    <td>Data persistence</td>
    <td class="checkmark">&#9745; </td>
    <td class="checkmark">&#9745; </td>
  </tr>
  <tr>
    <td>One-click cache clearance</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Tenant management</td>
    <td>Support for multi-tenancy</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
  <tr>
    <td>Milvus multi-collection capability</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
  <tr>
    <td>Other</td>
    <td>Long-short dialogue distinction</td>
    <td class="checkmark">&#9745; </td>
    <td></td>
  </tr>
</table>

## Core Features
In ModelCache, the main ideas of GPTCache are carried forward, including a series of core modules: adapter, embedding, similarity, and data_manager. The adapter module's main function is to handle the business logic for various tasks and connect modules like embedding, similarity, and data_manager; the embedding module is responsible for converting text into semantic vector representations, transforming user queries into vectors for recall or storage; the rank module ranks and evaluates the similarity of recalled vectors; the data_manager module manages the database. To better industrialize, we've made architectural and functional upgrades as follows:

- [x] Architectural Adjustment (Lightweight Integration): Embedded in large model products in a cache mode similar to Redis, it provides semantic caching capabilities without interfering with LLM invocation and security audits, adaptable toall large model services.

- [x]  Multiple Model Loading Schemes:
    - Support for loading local embedding models to resolve Huggingface connectivity issues.
    - Support for loading various pre-trained model embedding layers.

- [x]  Data Isolation Capabilities:
    - Environmental Isolation: Depending on the environment, different database configurations can be pulled to achieve isolation (development, staging, production).
    - Multi-Tenant Data Isolation: Dynamically create collections according to the model to isolate data, addressing data isolation issues for multiple models/services in large model products.

- [x]  Support for System Commands: Using concatenation to solve system command issues within the prompt paradigm.

- [x]  Distinguishing Long and Short Texts: Long texts pose more challenges to similarity assessment, so the differentiation between long and short texts has been enhanced, allowing separate configuration of judgment thresholds.

- [x]  Performance Optimization for Milvus: Adjusting Milvus's consistency_level to "Session" level for better performance.

- [x]  Data Management Capabilities:
    - One-click cache clearing ability for data management after model upgrades.
    - Recall hit queries for subsequent data analysis and model iteration reference.
    - Asynchronous log write-back capability for data analysis and statistics.
    - Added model fields and data statistics fields for feature expansion.
    - Future features that will continue to be built upon include:
- [ ] Data isolation based on hyperparameters.
- [ ] System prompt partitioned storage capability to improve the accuracy and efficiency of similarity matching.
- [ ] More versatile embedding models and similarity evaluation algorithms.