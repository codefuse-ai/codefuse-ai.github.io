---
nav:
  title: Docs
  order: -1
  second:
    title: Developer-Docs
    order: -1
store:
  title: Test-Agent
  version: main
group:
  title: 🌱 Test-Agent
  index: true
  order: -1
title: Test-Agent
order: -1
toc: content
---

### Local Mac M1 Experience
![图片](https://github.com/codefuse-ai/Test-Agent/assets/103973989/8dba860f-c1bb-49d5-b9dd-a58e541562a6)

### Moda Experience
Moda Model Access Link：[ModelScope TestGPT-7B](https://modelscope.cn/models/codefuse-ai/TestGPT-7B/summary)

![MS](https://github.com/codefuse-ai/Test-Agent/assets/103973989/0e50b258-44f9-4dc6-8e30-0a01cf62d02b)


## What is Test Agent? (Introduction)
**Test Agent** aims to build an "intelligent agent" in the testing domain, integrating large models with engineering technologies in the quality domain to promote the generational upgrade of quality technology. We look forward to collaborating with community members to create innovative solutions in the testing domain, establish a 24-hour online testing assistant service, and make testing as smooth as silk.
## Current Features (Features)
* **Model**: This release open-sources the TestGPT-7B model for the testing domain. The model is based on CodeLlama-7B and has been fine-tuned for related downstream tasks:
    * **Multilingual Test Case Generation (Java/Python/Javascript)**: This has always been an area of great interest to both academia and industry, with new products and tools like EvoSuite, Randoop, SmartUnit, etc., constantly being incubated. However, traditional test case generation has pain points that are difficult to address. Test case generation based on large models is superior to traditional tools in terms of readability, completeness of test scenarios, and multilingual support. This update focuses on multilingual test case generation, initially including Java, Python, and Javascript, and will gradually introduce Go, C++, and other languages in future releases.
    * **Test Case Assert Completion**: Analyzing the current state of test cases, we found that a certain proportion of existing test cases in the code repositories do not contain Asserts. Test cases without Asserts may pass during regression but fail to detect issues. Therefore, we expanded the scenario of automatic completion of test case Asserts. With this model capability, combined with the right engineering support, it's possible to perform batch automatic completion for the entire test case repository, intelligently raising the quality level of the project.
* **Engineering Framework**: Local model quick release and experience engineering framework
    - ChatBot page
    - Quick model launch
    - Private deployment, localized GPT large model interactions with your data and environment, no risk of data leakage, 100% safe. 
    
**We will continue to iterate on the model and engineering capabilities:**
- Continuously adding more exciting test domain application scenarios, such as domain knowledge Q&A, test scenario analysis, etc.
- Supporting the open copilot engineering framework focused on testing scenarios, such as intelligent embedding of testing domain knowledge, a common tool API system, intelligent testing Agent, and more, so stay tuned!
- Expanding from a 7B base to 13B and 34B models gradually. Stay tuned!

## The Most Powerful 7B Test Domain Large Model (Model)
Currently, within TestAgent, we default to using the TestGPT-7B model. Compared to existing open-source models, the TestGPT-7B model leads the industry in case execution pass rate (pass@1) and test scenario coverage (average number of test scenarios).
The core capability evaluation results of the TestGPT-7B model are as follows:

Multilingual Test Case Generation For the three supported languages of the model: Java, Python, and Javascript, the Pass@1 evaluation results are as follows:

| Model | Java pass@1 | Java Average number of test scenarios | Python pass@1 | Python Average number of test scenarios | Javascript pass@1 | Javascript Average number of test scenarios |
| --- | --- | --- | --- | --- | --- | --- |
| TestGPT-7B | 48.6% | 4.37 | 35.67% | 3.56 | 36% | 2.76 |
| CodeLlama-13B-Instruct | 40.54% | 1.08 | 30.57% | 1.65 | 31.7% | 3.13 |
| Qwen-14B-Chat | 10.81% | 2.78 | 15.9% | 1.32 | 9.15% | 4.22 |
| Baichuan2-13B-Chat | 13.5% | 2.24 | 12.7% | 2.12 | 6.1% | 3.31 |


- Test Case Assert Completion
Currently, the model supports Assert completion for Java cases, and the Pass@1 evaluation

| Model | pass@1 | Percentage of strong validation |
| --- | --- | --- |
| Codefuse-TestGPT-7B | 71.1% | 100% |


## Engineering Architecture
![JG](https://github.com/codefuse-ai/Test-Agent/assets/103973989/1b61beff-df59-4ab3-843c-266413c8dbc4)

The clarion call for large models has been sounded, and large models in the testing domain are continuously evolving. With the rich world knowledge accumulated during the pre-training process, they have demonstrated extraordinary reasoning and decision-making abilities in complex interactive environments.

Despite significant achievements of the foundational models in the testing domain, there are still some limitations. Testing tasks in specific domains often require specialized tools or domain knowledge. For instance, foundational models can complete tasks such as single-instance test code generation and test text generation through pre-trained knowledge, but when dealing with complex integrated test case generation, domain-specific case creation, and interactions with test process pipelines, more specialized tools and domain knowledge are necessary. Therefore, integrating specialized tools with foundational models can fully harness their respective strengths. Specialized tools can address insufficiencies in model timeliness, enhance professional knowledge, and improve interpretability and robustness. On the other hand, foundational models possess human-like reasoning and planning abilities, capable of understanding complex data and scenarios, and interacting with the real world.

Building upon the open model engineering deployment and ChatBot foundation in this release, we will continue to invest deeply in the open-source testing domain. Collaborating with community developers who share similar interests, we aim to create the most advanced engineering system for tools in the testing domain, an intelligent testing assistant, and open-source testing engineering!

