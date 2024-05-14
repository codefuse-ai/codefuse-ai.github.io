---
nav:
  title: 文档
  order: -1
  second:
    title: 开发者文档
    order: -1
store:
  title: CodeFuse-ChatBot
  version: master
group:
  title: 🌱 CodeFuse-ChatBot
  order: -1
title: 快速开始
order: -1
toc: content
---

## 🚀 快速使用

如需使用私有化模型部署，请自行安装 nvidia 驱动程序，本项目已在 Python 3.9.18，CUDA 11.7 环境下，Windows、X86 架构的 macOS 系统中完成测试。

Docker 安装、私有化 LLM 接入及相关启动问题见：[快速使用明细](/zh-CN/docs/developer-docs/CodeFuse-ChatBot/master/start-detail)

1、python 环境准备

- 推荐采用 conda 对 python 环境进行管理（可选）

```bash
# 准备 conda 环境
conda create --name devopsgpt python=3.9
conda activate devopsgpt
```

- 安装相关依赖

```bash
cd codefuse-chatbot
# python=3.9，notebook用最新即可，python=3.8用notebook=6.5.6
pip install -r requirements.txt
```

2、启动服务

```bash
# 完成server_config.py配置后，可一键启动
cd examples
bash start.sh
# 开始在页面进行相关配置，然后打开`启动对话服务`即可
```

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*XLHIR7loM2oAAAAAAAAAAAAADlHYAQ/original" alt="图片">
</div>

或者通过`start.py`进行启动[老版启动方式](/zh-CN/docs/developer-docs/CodeFuse-ChatBot/master/start-detail)
更多 LLM 接入方法见[更多细节...](/zh-CN/docs/developer-docs/CodeFuse-ChatBot/master/fastchat)
<br>
