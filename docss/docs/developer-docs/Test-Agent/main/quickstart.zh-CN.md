---
store:
  title: Test-Agent
  version: main
group:
  title: 🌱 Test-Agent
  order: -1
title: 快速开始
order: 0
toc: content
github: https://github.com/codefuse-ai/Test-Agent
---

## 快速使用（QuickStart）

### 前置准备

#### 模型下载

您可在[modelscope](https://modelscope.cn/models/codefuse-ai/TestGPT-7B)或[huggingface](https://huggingface.co/codefuse-ai/TestGPT-7B)上获取到模型的详细信息并下载模型文件。
需要注意的是：
1）如果您通过 modelscope 下载模型，下载方式可参考：[下载说明](https://www.modelscope.cn/docs/%E6%A8%A1%E5%9E%8B%E7%9A%84%E4%B8%8B%E8%BD%BD#%E4%BD%BF%E7%94%A8Git%E4%B8%8B%E8%BD%BD%E6%A8%A1%E5%9E%8B)；
2）如果您通过 huggingface 下载模型，请确保您可以正常访问 huggingface。

#### 环境安装

- python>=3.8
- transformers==4.33.2

```plain
git clone https://github.com/codefuse-ai/Test-Agent
cd Test-Agent
pip install -r requirements.txt
```

在开始运行 TestGPT-7B 模型之前，请确保你的执行环境拥有大约 14GB 的显存。

### 启动服务

项目提供了网页端快速搭建 UI 的能力能够更直观的展示模型交互和效果，我们可以使用简单的几个命令把前端页面唤醒并实时调用模型能力。在项目目录下，依次启动以下服务：

1.**启动 controller**
![controller](https://github.com/codefuse-ai/Test-Agent/assets/103973989/e68ce187-c9f1-4ce8-9d59-ff9d8348d0ac)
python3 -m chat.server.controller

2.**启动模型 worker**
![work](https://github.com/codefuse-ai/Test-Agent/assets/103973989/073e4e79-4005-4c98-87f7-0eaa0b2b1e22)
python3 -m chat.server.model_worker --model-path models/TestGPT-7B --device mps

（models/TestGPT-7B 为实际模型文件路径）

对于启动方式，可以按需选择以下几种配置选项：

- --device mps 用于在 Mac 电脑上开启 GPU 加速的选项（Apple Silicon 或 AMD GPUs）；
- --device xpu 用于在 Intel XPU 上开启加速的选项（Intel Data Center and Arc A-Series GPUs）；
  - 需安装[Intel Extension for PyTorch](https://intel.github.io/intel-extension-for-pytorch/xpu/latest/tutorials/installation.html)
  - 设置 OneAPI 环境变量：source /opt/intel/oneapi/setvars.sh
- --device npu 用于在华为 AI 处理器上开启加速的选项；
  - 需安装[Ascend PyTorch Adapter](https://github.com/Ascend/pytorch)
  - 设置 CANN 环境变量：source /usr/local/Ascend/ascend-toolkit/set_env.sh
- --device cpu 单独使用 CPU 运行的选项，不需要 GPU；
- --num-gpus 2 指定并发 gpu 运行的选项。

3. **启动 web 服务**
   python3 -m chat.server.gradio_testgpt
   ![web](https://github.com/codefuse-ai/Test-Agent/assets/103973989/340dae35-573b-4046-a3e8-e87a91453601)
   待服务准备就绪后，我们可以打开本地启动的 web 服务地址 http://0.0.0.0:7860 ，就能看到完整的前端页面了。在页面下方包含了【单测生成】和【Assert 补全】的两个例子，点击按钮后会自动生成一段样例文本到输入框中，点击 Send 按钮就会触发模型运行，之后耐心等待一段时间后（运行时间视本机性能而定）即可看到完整的回答了。
   ![demo](https://github.com/codefuse-ai/Test-Agent/assets/103973989/fd24274c-729b-4ce7-8763-a083b39300fb)
