---
store:
  title: CodeFuse-DevOps-Model
  version: main
group:
  title: 🌱 CodeFuse-DevOps-Model
  order: -1
title: Train Detail
order: 0
toc: content
github: https://github.com/codefuse-ai/CodeFuse-DevOps-Model
---

## Training Process

According to the literature review, it is known that most domain models are based on conversational models and undergo knowledge infusion through Supervised Fine-Tuning (SFT). However, the QA corpus required for SFT fine-tuning largely comes from ChatGPT generation, which may not fully cover domain knowledge.

Therefore, the DevOps-Model adopts a pre-training plus training followed by SFT fine-tuning approach, as illustrated in Figure 2.1. We believe that for large domain models, additional pre-training is necessary. This can inject some domain knowledge into the large model during the pre-training phase. If this knowledge has not been covered during the general large model's pre-training, it will allow the large model to learn new information; if it has been covered, it will further reinforce the model's knowledge. The second step is model alignment, aiming to enable the large model to provide the most appropriate content in response to questions.

![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*66DWSbAXqRAAAAAAAAAAAAAADlHYAQ/original)

## Training Data

### Data Collection

The model is positioned as a large Chinese DevOps domain model, so we collect pre-training and QA data related to Chinese DevOps.

The pre-training data mainly comes from the internet, including technical blogs, documentation, and books, amounting to over 50GB of pre-training corpus data.
For the QA data, our goal is not only to align the model with general Q&A capabilities but also to learn how to answer questions better in the DevOps domain. Therefore, we collected both general single-turn and multi-turn dialogue data and generated domain-specific QA data for the DevOps field through crawling and using ChatGPT. Ultimately, we carefully selected around 200K pieces of QA data for SFT fine-tuning training, as shown in the table below.

| Data Type              | Volume |
| ---------------------- | ------ |
| General Single-turn QA | 50K    |
| General Multi-turn QA  | 20K    |
| DevOps Domain QA       | 130K   |

## Data Selection

![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*jKlFTp3GWg8AAAAAAAAAAAAADlHYAQ/original)

Since most of the pre-training data is collected from the internet, the quality can be uneven. As data is the most crucial component in large model training, we established a cleaning Pipeline as shown above to thoroughly filter the quality of the collected data.

First, experts and manual screening have summarized a set of heuristic filtering rules at the document level, primarily to filter out those documents of very poor quality.
Then, even within an article of slightly lower quality, there may still be some valuable domain knowledge, which we need to collect as much as possible. Here, we split the article into paragraphs.
Next, the split paragraphs are filtered again using the rules from step 1, yielding a batch of paragraphs that have passed rule-based filtering.
We then picked out 1000 paragraphs for labeling by experienced professional developers to obtain high-quality labeled data.
Finally, we trained a scoring model based on the labeling results to score the quality of paragraphs. The vector model for paragraphs was the pre-trained Chinese version of Sentence-Bert, and the scoring algorithm was logistic regression. To avoid errors in the scoring model, we used the Pareto distribution to decide whether to filter a paragraph based on its quality score.
After this Pipeline, we finally settled on approximately 15GB of data for the pre-training plus training of the large model.
