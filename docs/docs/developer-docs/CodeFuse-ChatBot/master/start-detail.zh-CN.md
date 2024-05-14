---
store:
  title: CodeFuse-ChatBot
  version: master
group:
  title: 🌱 CodeFuse-ChatBot
  order: -1
title: 启动明细
order: 0
toc: content
---

如需使用私有化模型部署，请自行安装 nvidia 驱动程序。

### python 环境准备

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

### 沙盒环境准备

- windows Docker 安装：
  [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) 支持 64 位版本的 Windows 10 Pro，且必须开启 Hyper-V（若版本为 v1903 及以上则无需开启 Hyper-V），或者 64 位版本的 Windows 10 Home v1903 及以上版本。

  - [【全面详细】Windows10 Docker 安装详细教程](https://zhuanlan.zhihu.com/p/441965046)
  - [Docker 从入门到实践](https://yeasy.gitbook.io/docker_practice/install/windows)
  - [Docker Desktop requires the Server service to be enabled 处理](https://blog.csdn.net/sunhy_csdn/article/details/106526991)
  - [安装 wsl 或者等报错提示](https://learn.microsoft.com/zh-cn/windows/wsl/install)

- Linux Docker 安装：
  Linux 安装相对比较简单，请自行 baidu/google 相关安装

- Mac Docker 安装
  - [Docker 从入门到实践](https://yeasy.gitbook.io/docker_practice/install/mac)

```bash
# 构建沙盒环境的镜像，notebook版本问题见上述
bash docker_build.sh
```

### 模型下载（可选）

如需使用开源 LLM 与 Embedding 模型可以从 HuggingFace 下载。
此处以 THUDM/chatglm2-6bm 和 text2vec-base-chinese 为例：

```
# install git-lfs
git lfs install

# install LLM-model
git lfs clone https://huggingface.co/THUDM/chatglm2-6b
cp ~/THUDM/chatglm2-6b ~/codefuse-chatbot/llm_models/

# install Embedding-model
git lfs clone https://huggingface.co/shibing624/text2vec-base-chinese
cp ~/shibing624/text2vec-base-chinese ~/codefuse-chatbot/embedding_models/
```

### 基础配置

```bash
# 修改服务启动的基础配置
cd configs
cp model_config.py.example model_config.py
cp server_config.py.example server_config.py

# model_config#11~12 若需要使用openai接口，openai接口key
os.environ["OPENAI_API_KEY"] = "sk-xxx"
# 可自行替换自己需要的api_base_url
os.environ["API_BASE_URL"] = "https://api.openai.com/v1"

# vi model_config#LLM_MODEL 你需要选择的语言模型
LLM_MODEL = "gpt-3.5-turbo"
LLM_MODELs = ["gpt-3.5-turbo"]

# vi model_config#EMBEDDING_MODEL 你需要选择的私有化向量模型
EMBEDDING_ENGINE = 'model'
EMBEDDING_MODEL = "text2vec-base"

# 向量模型接入示例，修改 model_config#embedding_model_dict
# 若模型地址为：
model_dir: ~/codefuse-chatbot/embedding_models/shibing624/text2vec-base-chinese
# 配置如下
"text2vec-base": "shibing624/text2vec-base-chinese"

# vi server_config#8~14, 推荐采用容器启动服务
DOCKER_SERVICE = True
# 是否采用容器沙箱
SANDBOX_DO_REMOTE = True
```

### 启动服务

默认只启动 webui 相关服务，未启动 fastchat（可选）。

```bash
# 若需要支撑codellama-34b-int4模型，需要给fastchat打一个补丁
# cp examples/gptq.py ~/site-packages/fastchat/modules/gptq.py
# examples/llm_api.py#258 修改为 kwargs={"gptq_wbits": 4},

# start llm-service（可选）
python examples/llm_api.py
```

更多 LLM 接入方法见[详情...](/docs/developer-docs/CodeFuse-ChatBot/master/fastchat)
<br>

```bash
# 完成server_config.py配置后，可一键启动
cd examples
python start.py
```
