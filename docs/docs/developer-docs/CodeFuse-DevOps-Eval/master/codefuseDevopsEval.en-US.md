---
store:
  title: CodeFuse-DevOps-Eval
  version: master
group:
  title: 🌱 CodeFuse-DevOps-Eval
  index: true
  order: -1
title: CodeFuse-DevOps-Eval
order: 0
toc: content
---

<p align="center"> <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*ZfUgRKVnw04AAAAAAAAAAAAADlHYAQ/original" style="width: 100%;" id="title-icon">       </p>

<!-- <p align="center">
  🤗 <a href="https://huggingface.co/datasets/codefuse-admin/devopseval-exam" target="_blank">Hugging Face</a> • ⏬ <a href="#data" target="_blank">Data</a> • 📖 <a href="resources/tutorial.md" target="_blank">Tutorial</a>
  <br>
  <a href="https://github.com/codefuse-ai/codefuse-devops-eval/blob/main/README_zh.md">   中文</a> | <a href="https://github.com/codefuse-ai/codefuse-devops-eval/blob/main/README.md"> English </a>
</p> -->

DevOps-Eval is a comprehensive evaluation suite specifically designed for foundation models in the DevOps field. We hope DevOps-Eval could help developers, especially in the DevOps field, track the progress and analyze the important strengths/shortcomings of their models.

📚 This repo contains questions and exercises related to DevOps, including the AIOps, ToolLearning;

💥️ There are currently **7486** multiple-choice questions spanning 8 diverse general categories, as shown [below](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*eXnGSreQ_NQAAAAAAAAAAAAADlHYAQ/original).

🔥 There are a total of **2840** samples in the AIOps subcategory, covering scenarios such as **log parsing**, **time series anomaly detection**, **time series classification**, **time series forecasting**, and **root cause analysis**.

🔧 There are a total of **1509** samples in the ToolLearning subcategory, covering 239 tool scenes across 59 fields.

<p align="center"> <a href="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*Gl5aRqXqn6wAAAAAAAAAAAAADlHYAQ/original"> <img src="https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*eXnGSreQ_NQAAAAAAAAAAAAADlHYAQ/original" style="width: 100%;" id="data_info"></a></p>

## 🏆 Leaderboard

Below are zero-shot and five-shot accuracies from the models that we evaluate in the initial release. We note that five-shot performance is better than zero-shot for many instruction-tuned models.

### 👀 DevOps

#### Zero Shot

|   **ModelName**    | plan  | code  | build | test  | release | deploy | operate | monitor | **AVG** |
| :----------------: | :---: | :---: | :---: | :---: | :-----: | :----: | :-----: | :-----: | :-----: |
| DevOpsPal-14B-Chat | 60.61 | 78.35 | 84.86 | 84.65 |  87.26  | 82.75  |  69.89  |  79.17  |  78.23  |
| DevOpsPal-14B-Base | 54.55 | 77.82 | 83.49 | 85.96 |  86.32  | 81.96  |  71.18  |  82.41  |  78.23  |
|   Qwen-14B-Chat    | 60.61 | 75.4  | 85.32 | 84.21 |  89.62  | 82.75  |  69.57  |  80.56  |  77.18  |
|   Qwen-14B-Base    | 57.58 | 73.81 | 84.4  | 85.53 |  86.32  | 81.18  |  70.05  |  80.09  |  76.19  |
| Baichuan2-13B-Base | 60.61 | 69.42 | 79.82 | 79.82 |  82.55  | 81.18  |  70.37  |  83.8   |  73.73  |
| Baichuan2-13B-Chat | 60.61 | 68.43 | 77.98 | 80.7  |  81.6   | 83.53  |  67.63  |  84.72  |  72.9   |
| DevOpsPal-7B-Chat  | 54.55 | 69.11 | 83.94 | 82.02 |  76.89  |   80   |  64.73  |  77.78  |  71.92  |
| DevOpsPal-7B-Base  | 54.55 | 68.96 | 82.11 | 78.95 |  80.66  | 76.47  |  65.54  |  78.7   |  71.69  |
|    Qwen-7B-Base    | 53.03 | 68.13 | 78.9  | 75.44 |  80.19  |   80   |  65.06  |  80.09  |  71.09  |
|    Qwen-7B-Chat    | 57.58 | 66.01 | 80.28 | 79.82 |  76.89  | 77.65  |  62.64  |  79.17  |  69.75  |
| Baichuan2-7B-Chat  | 54.55 | 63.66 | 77.98 | 76.32 |  71.7   | 73.33  |  59.42  |  79.63  |  66.97  |
|  Internlm-7B-Chat  | 60.61 | 62.15 | 77.06 | 76.32 |  66.98  | 74.51  |  60.39  |  78.24  |  66.27  |
| Baichuan2-7B-Base  | 56.06 | 62.45 | 75.69 | 70.61 |  74.06  |  69.8  |  61.67  |  75.93  |  66.21  |
|  Internlm-7B-Base  | 54.55 | 58.29 | 79.36 | 78.95 |  77.83  | 70.59  |  65.86  |  75.93  |  65.99  |

#### Five Shot

|   **ModelName**    | plan  | code  | build | test  | release | deploy | operate | monitor | **AVG** |
| :----------------: | :---: | :---: | :---: | :---: | :-----: | :----: | :-----: | :-----: | :-----: |
| DevOpsPal-14B-Chat | 63.64 | 79.49 | 81.65 | 85.96 |  86.79  | 86.67  |  72.95  |  81.48  |  79.69  |
| DevOpsPal-14B-Base | 62.12 | 80.55 | 82.57 | 85.53 |  85.85  | 84.71  |  71.98  |  80.09  |  79.63  |
|   Qwen-14B-Chat    | 65.15 |  76   | 82.57 | 85.53 |  84.91  | 84.31  |  70.85  |  81.48  |  77.81  |
|   Qwen-14B-Base    | 66.67 | 76.15 | 84.4  | 85.53 |  86.32  | 80.39  |  72.46  |  80.56  |  77.56  |
| Baichuan2-13B-Base | 63.64 | 71.39 | 80.73 | 82.46 |  81.13  | 84.31  |  73.75  |  85.19  |  75.8   |
|    Qwen-7B-Base    | 75.76 | 72.52 | 78.9  | 81.14 |  83.96  | 81.18  |  70.37  |  81.94  |  75.36  |
| Baichuan2-13B-Chat | 62.12 | 69.95 | 76.61 | 84.21 |  83.49  | 79.61  |  71.98  |  80.56  |  74.12  |
| DevOpsPal-7B-Chat  | 66.67 | 69.95 | 83.94 | 81.14 |  80.19  | 82.75  |  68.6   |  76.85  |  73.61  |
| DevOpsPal-7B-Base  | 69.7  | 69.49 | 82.11 | 81.14 |  82.55  | 82.35  |  67.15  |  79.17  |  73.35  |
|    Qwen-7B-Chat    | 65.15 | 66.54 | 82.57 | 81.58 |  81.6   | 81.18  |  65.38  |  81.02  |  71.69  |
| Baichuan2-7B-Base  | 60.61 | 67.22 | 76.61 |  75   |  77.83  | 78.43  |  67.31  |  79.63  |  70.8   |
|  Internlm-7B-Chat  | 60.61 | 63.06 | 79.82 | 80.26 |  67.92  | 75.69  |  60.06  |  77.31  |  69.21  |
| Baichuan2-7B-Chat  | 60.61 | 64.95 | 81.19 | 75.88 |  71.23  | 75.69  |  64.9   |  79.17  |  69.05  |
|  Internlm-7B-Base  | 62.12 | 65.25 | 77.52 | 80.7  |  74.06  | 78.82  |  63.45  |  75.46  |  67.17  |

### 🔥 AIOps

<details>

#### Zero Shot

|   **ModelName**    | LogParsing | RootCauseAnalysis | TimeSeriesAnomalyDetection | TimeSeriesClassification | TimeSeriesForecasting | **AVG** |
| :----------------: | :--------: | :---------------: | :------------------------: | :----------------------: | :-------------------: | :-----: |
|   Qwen-14B-Base    |   66.29    |       58.8        |           25.33            |           43.5           |         62.5          |  52.25  |
| DevOpsPal-14B—Base |   63.14    |       53.6        |           23.33            |           43.5           |         64.06         |  50.49  |
|   Qwen-14B-Chat    |   64.57    |       51.6        |           22.67            |            36            |         62.5          |  48.94  |
| DevOpsPal-14B—Chat |     60     |        56         |             24             |            43            |         57.81         |  48.8   |
|    Qwen-7B-Base    |     50     |       39.2        |           22.67            |            54            |         43.75         |  41.48  |
| DevOpsPal-7B—Chat  |   56.57    |       30.4        |           25.33            |            45            |         44.06         |  40.92  |
| Baichuan2-13B-Chat |     64     |        18         |           21.33            |           37.5           |         46.88         |  39.3   |
|    Qwen-7B-Chat    |   57.43    |       38.8        |           22.33            |           39.5           |         25.31         |  36.97  |
|  Internlm-7B—Chat  |   58.86    |        8.8        |           22.33            |           28.5           |         51.25         |  36.34  |
| Baichuan2-7B-Chat  |   60.86    |        10         |             28             |           34.5           |         39.06         |  36.34  |
| Baichuan2-7B-Base  |   53.43    |       12.8        |           27.67            |           36.5           |         40.31         |  35.49  |
| Baichuan2-13B-Base |     54     |       12.4        |             23             |           34.5           |         42.81         |  34.86  |
| DevOpsPal-7B—Base  |   46.57    |       20.8        |             25             |            34            |         38.75         |  33.94  |
|  Internlm-7B—Base  |   48.57    |       18.8        |           23.33            |           37.5           |         33.75         |  33.1   |

#### One Shot

|   **ModelName**    | LogParsing | RootCauseAnalysis | TimeSeriesAnomalyDetection | TimeSeriesClassification | TimeSeriesForecasting | **AVG** |
| :----------------: | :--------: | :---------------: | :------------------------: | :----------------------: | :-------------------: | :-----: |
| DevOpsPal-14B—Chat |   66.29    |       80.8        |           23.33            |           44.5           |         56.25         |  54.44  |
| DevOpsPal-14B—Base |     60     |        74         |           25.33            |           43.5           |         52.5          |  51.13  |
|   Qwen-14B-Base    |   64.29    |       74.4        |             28             |           48.5           |         40.31         |  50.77  |
|    Qwen-7B-Base    |     56     |       60.8        |           27.67            |            44            |         57.19         |  49.44  |
|   Qwen-14B-Chat    |   49.71    |       65.6        |           28.67            |            48            |         42.19         |  46.13  |
| Baichuan2-13B-Base |     56     |       43.2        |           24.33            |            41            |         46.88         |  42.89  |
| Baichuan2-7B-Chat  |   58.57    |       31.6        |             27             |           31.5           |         51.88         |  41.83  |
| DevOpsPal-7B—Base  |   52.86    |       44.4        |             28             |           44.5           |         36.25         |  41.2   |
| Baichuan2-7B-Base  |   48.29    |       40.4        |             27             |            42            |         40.94         |  39.86  |
|    Qwen-7B-Chat    |   54.57    |        52         |           29.67            |           26.5           |         27.19         |  38.73  |
| Baichuan2-13B-Chat |   57.43    |       44.4        |             25             |           25.5           |         30.63         |  37.75  |
| DevOpsPal-7B—Chat  |   56.57    |       27.2        |           25.33            |           41.5           |         33.44         |  37.46  |
|  Internlm-7B—Chat  |   62.57    |       12.8        |           22.33            |            21            |         50.31         |  36.69  |
|  Internlm-7B—Base  |     48     |       33.2        |             29             |            35            |         31.56         |  35.85  |

</details>

### 🔧 ToolLearning

<details>

| **FuncCall-Filler** | dataset_name | fccr  | 1-fcffr | 1-fcfnr | 1-fcfpr | 1-fcfnir |  aar  |
| :-----------------: | :----------: | :---: | :-----: | :-----: | :-----: | :------: | :---: |
|    Qwen-14b-chat    |    luban     |  61   |   100   |  97.68  |  63.32  |   100    | 69.46 |
|    Qwen-7b-chat     |    luban     | 50.58 |   100   |  98.07  |  52.51  |   100    | 63.59 |
|  Baichuan-7b-chat   |    luban     | 60.23 |   100   |  97.3   |  62.93  |  99.61   | 61.12 |
|  Internlm-chat-7b   |    luban     | 47.88 |   100   |  96.14  |  51.74  |  99.61   | 61.85 |
|    Qwen-14b-chat    |   fc_data    | 98.37 |  99.73  |  99.86  |  98.78  |   100    | 81.58 |
|    Qwen-7b-chat     |   fc_data    | 99.46 |  99.86  |   100   |  99.59  |   100    | 79.25 |
|  Baichuan-7b-chat   |   fc_data    | 97.96 |  99.32  |   100   |  98.64  |   100    | 89.53 |
|  Internlm-chat-7b   |   fc_data    | 94.29 |  95.78  |   100   |  98.5   |   100    | 88.19 |
|    CodeLLaMa-7b     |   fc_data    | 98.78 |  99.73  |   100   |  99.05  |   100    | 94.7  |
|   CodeLLaMa-7b-16   |   fc_data    | 98.1  |  99.87  |  99.73  |  98.5   |   100    | 93.14 |
|   CodeFuse-7b-4k    |   fc_data    | 98.91 |  99.87  |  99.87  |  99.18  |   100    | 89.5  |

</details>
