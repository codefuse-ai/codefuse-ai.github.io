---
nav:
  title: Docs
  order: -1
  second:
    title: API-Docs
    order: 0
group:
  title: ❤️ Codefuse-muAgent
  # index: true
  order: -1
title: muAgent
order: -1
toc: content
---

## Background

From the current perspective, large language models (LLMs) perform well in solving general single-step tasks (e.g., SQL generation) and single-step tool usage (e.g., weather queries). However, scenarios in the real world are often complex and involve multiple steps, especially in rigorous and specialized fields. LLMs tend to provide generic answers (including ChatGPT). For C-end user experiences, this might not be a significant issue, but for B/P-end actual production, it often lacks utility. LLMs resemble newly graduated individuals from prestigious universities, possessing excellent foundational qualities but lacking the ability for targeted learning in specific domains, which hinders their ability to provide complete task planning and decision-making. The capability to assist people in problem-solving or for an agent to effectively solve problems lies at the core of the PLANNER's reasoning ability.

_“The core competitiveness of different domain experts lies in their long-term accumulation of industry knowledge and experience in handling complex issues.”_

Individuals possess rich experience when dealing with professional and complex tasks. Where does this experience come from?
Two sources:

- Mentorship: Specific problems are taught hands-on, guiding newcomers on how to tackle issues.
- Self-exploration: Reading documents, interactive exploration, and eventually forming a pathway to success stored in memory.

Inspired by human experience acquisition and learning models, we introduce a new Agent framework that elevates knowledge graphs (KGs) from mere knowledge acquisition sources to an Agent orchestration engine! Driven by LLM + EKG (Eventic Knowledge Graph for Industry Knowledge), and coupled with MultiAgent, FunctionCall, and CodeInterpreter technologies, we enable complex multi-step task completion with ease of drag-and-drop and lightweight text input, all under the guidance of human experience. Our solution is compatible with existing agent frameworks on the market while also achieving four core differentiating technical functionalities: complex reasoning, online collaboration, human interaction, and on-demand knowledge accessibility.

## Introduction

To achieve automation of complex multi-step processes (Standard Operating Procedures, SOPs), let's first take a look at the components of an SOP. Deconstructing it abstractly, any task flow's SOP is fundamentally composed of three parts: "Experience" + "Tools" + "Person," seamlessly connecting LLM reasoning to realize the organic integration of these three elements.

- **Experience**: How are complex tasks handled in specific professional fields? What are the process steps?
- **Tools**: What tools are used in the task flow? How to use these tools?
- **Person**: Who should be consulted during the task flow (Person or agents)? What should be asked?

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*FMOJRJotp2gAAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

To this end, the overall architecture diagram of muAgent is as follows, aligning with the industry definitions of agent frameworks, encompassing three core modules: _Planner_, _Memory_, and _ActionSpace_, along with diagnostic debugging and product interface components.

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*AhJNS5-ZCM8AAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

## Experience

### Storage Structure

For different industries and types of workflows/SOPs, how should we abstractly design a unified schema to store experiential knowledge effectively? As the old saying goes, "_teaching someone to fish is better than giving them fish_," implying that we should design to store "process experience" rather than "result experience." Compared to storing state results, it is more beneficial to teach the model how to achieve a result. For example, instead of rigidly instructing the model on current weather, a more appropriate approach is to teach the model how to query the weather. MuAgent has designed four major node types to accommodate experiential knowledge storage: "Scene Intent + Event Flow + Organizing Person + Unified Tools." The following image illustrates this structure.

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*l7OQSLUYPH8AAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

As task flows often naturally present as graph or tree structures, muAgent utilizes a graph database to store experiences. In comparison to traditional Retrieval-Augmented Generation (RAG) or Microsoft's GraphRAG—which mainly uses knowledge graphs as data sources—muAgent directly upgrades the knowledge graph to serve as an orchestration engine. Through "drag-and-drop" and "light text" writing, we can achieve the sedimentation of complex SOPs in specific fields and automate the SOP process.

### Knowledge Acquisition

With a well-designed experience storage framework, akin to a functioning brain, the next task is to address how to acquire knowledge. MuAgent offers two capabilities for building experiences. The first is the previously mentioned product-side canvas-style lightweight text writing. The second capability focuses on a vast amount of legacy documents, where muAgent possesses automated extraction abilities to convert plain text and flow charts into graph structures. If extracted information contains errors or gaps, simple editing and debugging can refine it into perfect SOP experiences.

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*P25aQo9VupQAAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

Given that the graph engine design inherently carries graph capabilities, while storing experiences, muAgent also provides the ability to "split" and "merge" experiences:

- **Experience Splitting**: We expect models to possess a certain generalization capability, rather than simply delivering specific answers (unlike the rigid task flows of DiFY and the random reasoning of AutoGPT). For instance, once the experience of "Hangzhou travel itinerary planning" is accumulated, we should abstract it into "travel itinerary planning." Thus, when faced with a query about "Beijing travel itinerary planning," the model should be able to respond appropriately. Further abstraction could involve isolating atomic experiences such as "hotel booking, train ticket booking, dining choices," enabling the model to efficiently generate responses even when confronted with queries about "Beijing short trip planning"! This reflects a human problem-solving approach where they explain a specific problem's resolution path. The goal of muAgent's "experience splitting" is to implement divergent reasoning under human guidance through the framework of "phenomenon-task-judgment-conclusion."
- **Experience Merging**: One thousand people may have a thousand interpretations of Hamlet, just as blind men describe an elephant; recorded experiences serve as a concrete manifestation of abstraction. The better approach is to merge different collaborative experiences to enhance a comprehensive understanding of the essence of things. For instance, in the experience of ordering travel tickets, a distant person may solidify the idea of "ticket booking - airplane," whereas someone nearer may specify "ticket booking - high-speed train." A local traveler might record "ticket booking - subway." Aligning and merging these experiences produces a comprehensive atomic experience of "ticket booking."

### Experience Reasoning

With an established knowledge storage, the next challenge is to tackle the reasoning problem. The reasoning aspect of muAgent encompasses two major modules:

- **Intent Recognition**: This module focuses on multi-layer intent handling, supporting "sequential + direct" intent identification. It identifies different intents (execution or consultation) to address various kinds of queries. When faced with ambiguous intents, it can also ask users for additional information.
  - **Sequential OR Direct Recognition**: It facilitates locating multi-layer intents as required by different scenarios. Users can perform either sequential intent searches or directly match vectors along with model filtering (ideal for unclear scene intent descriptions).
  - **Execution OR Consultation Confirmation**: It acknowledges that different scenarios entail different intent categories. For example, upon receiving the request, "Help me check the weather in Hangzhou," muAgent executes the entire task flow to retrieve and provide the end result. Conversely, if a user requests, "How do I check the weather in Hangzhou," muAgent will only return the process steps without executing the actual experience.
- **Graph Reasoning**: Based on user-embedded experience and collaboration, utilizing FuncCall for diverse user questions and multi-route reasoning (execution or question-answering).
  - **Traversal Reasoning**: Against user queries, the LLM model performs tasks via node text descriptions, relational links, and property configurations, outputting decisions based on results: whether to continue executing tasks at that node or proceed downstream (supporting multiple branches and cycles).
  - **Divergent Reasoning**: For user queries, the model self-organizes reasoning. It selects similar experience references to make decisions using the extracted atomic experiences (supporting Few-shot divergence), and cycles towards outputs/results/new phenomena, continually leveraging atomic experience references.
  - **Graph Question-Answering**: Responds to user queries by retrieving relevant content based on the already embedded graph data, providing answers in natural language (KGQA: Knowledge Graph Question Answer).

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*3XPVRZfp2CMAAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

## Person

### Composition of Characters

In the context of task flow and experience advancement, interactions with "Person" are inevitable. In muAgent, the composition of Person can be categorized into three main types: "Agents," "User," and "Enterprise Personnel."

- **Agents**: In the game scenario "Who's the Undercover," such agents represent only simple prompts and LLMs. In real-world applications, they can be layered and nested. Agents created with muAgent are equipped with capabilities encompassing knowledge, tools, and personas, making them suitable for enterprise-level team collaboration scenarios (e.g., development agents, testing agents, operation agents).

- **User**: Initially designed for processes that require user participation, such as AI text-based games. They can also be applied in online guidance and teaching scenarios where user input is essential for the advancement of the any process.

- **Enterprise Personnel**: Primarily targeted at the design of enterprise processes, covering both "Enterprise Employees" and "Organizational Structure." Not every capability can be abstracted into API interfaces; many scenarios (e.g., task approval flows) require human involvement for screening and communication. Including enterprise personnel allows consulting specific individuals for explicit responses before progressing. The inclusion of organizational structures serves the purpose of tracking personnel changes.

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*iP6dR4zwz1gAAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

### Communication Among Characters

What is a multi-Agent framework? The core concept revolves around the implementation of multi-Agent information exchange. Multi-Agent information interaction refers to a discussion mode among agents. Based on human communication patterns, muAgent abstractly derives eight discussion modes to satisfy information isolation demands in different scenarios (all/part/individually visible).

- **Public Consultation**: The host publicly consults different agents for responses.
- **Public Notification**: The host publicly notifies different agents of information.
- **Private Consultation**: The host privately consults different agents for responses.
- **Private Notification**: The host privately notifies different agents of information.
- **Sequential Speaking**: The host triggers agents to respond publicly in sequence.
- **Simultaneous Speaking**: The host triggers agents to respond publicly at the same time.
- **Free Discussion**: The host triggers agents to engage in free public discussion.
- **Private Discussion**: The host triggers agents to engage in private discussion.

These modes can be broadly classified into two categories: information communication (What can and should I see?) and information processing (How can I better visualize information?). muAgent can fulfill the demand of different scenarios through simple configurations of attributes and the linking of edges. We will explore the case of "Who's the Undercover" to provide a comprehensive understanding of different information communication modes.

#### Information Communication

**Public Notification**: During the seat assignment phase, everyone knows where each other's seat is. The host uniformly assigns seats but doesn't require feedback on the assignment results. MuAgent achieves this through the "public" setting within the task node-information isolation attribute.

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*ZnCWRLDWIFEAAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

**Private Notification**: In the word assignment phase, each participant only knows the word assigned to them. The host uniformly assigns words, knowing everyone’s words, and no response is required concerning the assigned word. MuAgent achieves this using the "private" setting for task node-information isolation attributes.

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*6OPUQLrXL_cAAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

**Sequential Speaking**: In the sharing discussion phase, the host specifies the sequence of responses based on assigned seat numbers and available participants. The host then initiates each person's sharing (requiring responses), with everyone aware of others' replies. A tool usage mode setting will also be introduced, detailed in the tools section.

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*Wp-WSZg4xbIAAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

#### Information Processing

With a solid information communication framework ensuring varying scenarios' needs are met, the next challenge is how to help users better visualize information. For example, if suddenly tagged in a group chat with a question, users must sift through extensive previous text to ascertain what action to take. Could there be a better way to succinctly summarize the context, allowing them to quickly understand their required action? This justifies the necessity for the information processing module. We provide three information processing modes (achieved through attribute settings):

- **Information Retrieval**: Seek historical dialogues and current queries for similar messages, categorized into rule-based retrieval (e.g., K-nearest information) and model-based retrieval (e.g., vector retrieval).
- **Information Processing**: Summarize and refine historical dialogues to facilitate rapid comprehension, categorized as model summarization and information entailment (supporting prompt settings).
- **Global Variables**: Maintain global variables to conveniently track the current status of variables and enhance planning and decision-making. For example, in “Who's the Undercover,” the current players or the witch’s poison/antidote in "Werewolf" (without this setting, when the model's reasoning ability wanes, mistakes are likely in multi-round games).

## Tools

### Usage Methods

After addressing experience and characters, we turn to the final link in process advancement: tools. The current industry practices can be summarized into three general approaches:

- **Without Thinking**: Directly provide single-step decisions for a problem. This method is quick and effective in fixed scenarios but inconvenient for multi-step tasks. This is achieved by setting the task node-execution mode to "single".
- **Plan Before Action**: Directly provide a complete plan for a problem and then execute that plan, facilitating multi-step task execution. However, it lacks flexibility for adjustments based on intermediate results, realized via "plan" and "parallel/simultaneous execution" property settings.
- **Think While Doing**: This represents the current mainstream ReAct mode where the next decision relies on the output from the previous step. While the slowest, it offers flexibility to adjust based on intermediate outcomes. This is achieved through "interactive" property settings.

In the context of voting for a culprit, multiple agents can simultaneously be consulted and provided with responses to avoid them disguising their descriptions based on each other's output.

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*vbT9SIGh4dcAAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

### Tool Management

- **Tool Registration Method**: Most implementations in the industry rely on the protocol and specifications defined by OpenAI, and muAgent is no exception. MuAgent simplifies the Swagger protocol for rapid integration of different API tools.
- **Tool Registration Management**: Starting from the realization of large models’ limitations, we define five major tool categories (e.g., providing a sandbox execution environment for additional code execution to address the model's deficiencies). By categorizing them, we facilitate tool selection and usage for large models.

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*YcQoR4tGqBgAAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

## Experience

### Technical Differences

Based on the architectural design introduced above, returning to the initial mention of the muAgent framework compared to existing agent frameworks on the market, we can identify four core differentiators.

<div align=center>
  <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*B_i3SLXW_ZMAAAAAAAAAAAAADlHYAQ/original" alt="Image" style="width: 500px;  height:auto;">
</div>

- **Complex Reasoning**: Current frameworks retain two primary reasoning logic types: Pure LLM reasoning, represented by AutoGPT, and fixed reasoning, represented by DiFy. The former has stability challenges while lacking specialized domain service capabilities; the latter presents minimal flexibility and bears little difference from engineering implementations. MuAgent utilizes a graph as an orchestration engine to house knowledge while incorporating a design of atomic experiences and divergent reasoning from the graph, allowing models to act organically under human experience/design guidance. This structure fosters adaptability, enabling exploration in unknown scenarios while also summarizing successful exploration experiences for knowledge retention. The overall procedure supports platform integration (rule configuration) and natural language triggers to meet various demands.
- **Human Interaction**: Based on the design of person nodes (agents, enterprise staff, and user participants) alongside different information communication and processing methods, muAgent can flexibly manage enterprise task flow knowledge, allowing human involvement within process propagation, while also innovatively applying this framework in multi-player text games.
- **Knowledge at Hand**: Through the unified graph design comprising scene intent, event flow, unified tools, and personnel organization, muAgent meets the knowledge-facilitation requirements for various SOP scenarios. A simple drag-and-drop text input can create deployable content directly; moreover, faced with extensive legacy documents (ordinary texts, flow charts, etc.), muAgent supports intelligent text parsing, one-click importation, as well as experience splitting and merging for generalization.
- **Collaborative Capacity**: By constructing virtual teams and segmenting scene intents, you experience differences between online documents and local documents; simultaneously, through the node usage method of textual semantic input, you perceive distinctions between annotated and unannotated code, making the advantages of online collaboration clear.
  We also provide debugging and execution capabilities, allowing for visual debugging post-graph editing, ensuring rapid identification of flow errors and modification enhancements, while associating successful configurations for automatic sedimentation, reducing model interaction costs and accelerating reasoning procedures. Additionally, we offer full-link visual monitoring during online operations.

### Open Source Collaboration

Creating an open-source framework is challenging—doing it well is even harder. From serving purely internal purposes to separating foundational components for consistent internal and external versions, muAgent currently has many unrefined features and ongoing developmental plans. We welcome any suggestions, feedback (including criticism), and contributions, which can be submitted via GitHub Issues.

There are multiple ways to contribute to the Codefuse project: implementing code, writing tests, enhancing documentation, etc. Any contribution is highly welcomed, further details can be found in the [Contribution Guide](https://codefuse-ai.github.io/contribution/contribution).
