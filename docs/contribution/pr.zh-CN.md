---
group:
  title: ❤️ 贡献指南
  order: -1
subGroup:
  title: 如何提交Issue
title: 如何提交PR
order: 1
toc: content
---

## Contribution

### Pre-Checklist

- 要先确认是否查看 document、issue、discussion(github 功能) 等公开的文档信息
- 找到你想处理的 GitHub 问题。如果不存在，创建一个问题或草案 PR，并请求维护者进行检查。
- 检查相关的、相似的或重复的拉取请求。
- 创建一个草案拉取请求。
- 完成 PR 模板中的描述。
- 链接任何被你的 PR 解决的 GitHub 问题。

### Description

PR 的描述信息，用简洁的语言表达 PR 完成的事情，具体规范见[Commit 格式规范](#commit-格式规范)

### Related Issue

`#xx` if has

### Test Code with Result

请提供相关的测试代码如果有必要的话

## Commit 格式规范

Commit 分为“标题”和“内容”。原则上标题全部小写。内容首字母大写。

### 标题

commit message 的标题：`[<type>](<scope>) <subject> (#pr)`

### type 可选值

本次提交的类型，限定在以下类型（全小写）

- fix：bug 修复
- feature：新增功能
- feature-wip：开发中的功能，比如某功能的部分代码。
- improvement：原有功能的优化和改进
- style：代码风格调整
- typo：代码或文档勘误
- refactor：代码重构（不涉及功能变动）
- performance/optimize：性能优化
- test：单元测试的添加或修复
- deps：第三方依赖库的修改
- community：社区相关的修改，如修改 Github Issue 模板等。

几点说明：

如在一次提交中出现多种类型，需增加多个类型。
如代码重构带来了性能提升，可以同时添加 [refactor][optimize]
不得出现如上所列类型之外的其他类型。如有必要，需要将新增类型添加到这个文档中。

### scope 可选值

本次提交涉及的模块范围。因为功能模块繁多，在此仅罗列部分，后续根据需求不断完善。
<br>以 chatbot 的框架为例

- connector
- codechat
- sandbox
- ...

几点说明：

尽量使用列表中已存在的选项。如需添加，请及时更新本文档。

### subject 内容

标题需尽量清晰表明本次提交的主要内容。

## 示例

comming soon

## Reference

[doris-commit-format](https://doris.apache.org/zh-CN/community/how-to-contribute/commit-format-specification)
