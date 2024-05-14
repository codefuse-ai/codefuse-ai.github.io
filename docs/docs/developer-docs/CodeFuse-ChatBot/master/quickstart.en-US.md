---
nav:
  title: Docs
  order: -1
  second:
    title: Developer-Docs
    order: -1
store:
  title: CodeFuse-ChatBot
  version: master
group:
  title: 🌱 CodeFuse-ChatBot
  order: -1
title: QuickStart
order: -1
toc: content
---

## 🚀 Quick Start

To deploy private models, please install the NVIDIA driver by yourself.
This project has been tested on Python 3.9.18 and CUDA 11.7 environments, as well as on Windows and macOS systems with x86 architecture.
For Docker installation, private LLM access, and related startup issues, see: [Start-detail...](/docs/developer-docs/CodeFuse-ChatBot/master/start-detail)

1. Preparation of Python environment

- It is recommended to use conda to manage the python environment (optional)

```bash
# Prepare conda environment
conda create --name Codefusegpt python=3.9
conda activate Codefusegpt
```

- Install related dependencies

```bash
cd Codefuse-ChatBot
# python=3.9，use notebook-latest，python=3.8 use notebook==6.5.5
pip install -r requirements.txt
```

2. Start the Service

```bash
# After configuring server_config.py, you can start with just one click.
cd examples
bash start.sh
# you can config your llm model and embedding model, then choose the "启动对话服务"
```

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*XLHIR7loM2oAAAAAAAAAAAAADlHYAQ/original" alt="图片">
</div>

Or `python start.py` by [old version to start](/docs/developer-docs/CodeFuse-ChatBot/master/start-detail)
More details about accessing LLM Moldes[More Details...](/docs/developer-docs/CodeFuse-ChatBot/master/fastchat)
<br>
