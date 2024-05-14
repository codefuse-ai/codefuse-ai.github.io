---
store:
  title: Test-Agent
  version: main
group:
  title: 🌱 Test-Agent
  order: -1
title: QuickStart
order: 0
toc: content
---

## QuickStart
### Prerequisites

#### Model Download
You can get detailed information about the model and download the model files from [modelscope](https://modelscope.cn/models/codefuse-ai/TestGPT-7B) or [huggingface](https://huggingface.co/codefuse-ai/TestGPT-7B).
Please note:
需要注意的是：
If you download the model through modelscope, refer to the download instructions: [Download Instructions](https://www.modelscope.cn/docs/%E6%A8%A1%E5%9E%8B%E7%9A%84%E4%B8%8B%E8%BD%BD#%E4%BD%BF%E7%94%A8Git%E4%B8%8B%E8%BD%BD%E6%A8%A1%E5%9E%8B);
If you download the model through huggingface, please make sure you have proper access to huggingface.

#### Environment Installation
- python>=3.8
- transformers==4.33.2

```plain
git clone https://github.com/codefuse-ai/Test-Agent
cd Test-Agent
pip install -r requirements.txt
```

Before starting to run the TestGPT-7B model, please ensure that your execution environment has about 14GB of VRAM.


### Starting the Service

The project provides the ability to quickly set up a web UI for a more intuitive display of model interactions and effects. We can use a few simple commands to wake up the front-end page and call the model capabilities in real time. In the project directory, start the following services in order:

1.**Start controller**
![controller](https://github.com/codefuse-ai/Test-Agent/assets/103973989/e68ce187-c9f1-4ce8-9d59-ff9d8348d0ac)
python3 -m chat.server.controller

2.**Start model worker**
![work](https://github.com/codefuse-ai/Test-Agent/assets/103973989/073e4e79-4005-4c98-87f7-0eaa0b2b1e22)
python3 -m chat.server.model_worker --model-path models/TestGPT-7B --device mps

(models/TestGPT-7B is the actual model file path)

For the launch method, you can choose from several configuration options as needed:
- --device mps for enabling GPU acceleration on Mac computers (Apple Silicon or AMD GPUs);
- --device xpu for enabling acceleration on Intel XPU (Intel Data Center and Arc A-Series GPUs):
  - Install  [Intel Extension for PyTorch](https://intel.github.io/intel-extension-for-pytorch/xpu/latest/tutorials/installation.html)
  - Set the OneAPI environment variable: source /opt/intel/oneapi/setvars.sh
- --device npu for enabling acceleration on Huawei AI processors;
  - Install [Ascend PyTorch Adapter](https://github.com/Ascend/pytorch)
  - 设置CANN环境变量：source /usr/local/Ascend/ascend-toolkit/set_env.sh
- --device cpu for running using only CPU, no GPU needed;
- --num-gpus 2 to specify the option of running GPUs concurrently.


3. **Start the web service**
python3 -m chat.server.gradio_testgpt
![web](https://github.com/codefuse-ai/Test-Agent/assets/103973989/340dae35-573b-4046-a3e8-e87a91453601)
Once the service is ready, you can open the local web service address http://0.0.0.0:7860 and see the complete front-end page. At the bottom of the page, there are two examples: 【Single-test Generation】 and 【Assert Completion】. After clicking the button, a sample text will be automatically generated in the input box. Clicking the Send button will trigger the model to run. After waiting patiently for a while (running time depends on the performance of your machine), you can see the complete answer.
![demo](https://github.com/codefuse-ai/Test-Agent/assets/103973989/fd24274c-729b-4ce7-8763-a083b39300fb)
