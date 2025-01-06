---
group:
  title: ❤️ Contribution Guide
  order: -1
title: Pull Request
order: 1
toc: content
---

## Contribution

### Pre-Checklist

- Confirm if you have checked the publicly available document information, such as documents, issues, and discussions (GitHub features).
- Find the GitHub issue you wish to address. If it does not exist, create an issue or a draft PR and request a review from the maintainers.
- Check for related, similar, or duplicate pull requests.
- Create a draft pull request.
- Complete the description in the PR template.
- Link any GitHub issues your PR resolves.

### Description

A concise language should be used to describe what the PR achieves, with specific standards available in the [Commit Format Standards](#commit-format-standards).

### Related Issue

`#xx` if applicable

### Test Code with Result

Please provide relevant test code if necessary.

## Commit Format Standards

Commit is divided into a "title" and a "body." In principle, the title is all in lowercase. The first letter of the body should be capitalized.

### Title

The title of the commit message: `[<type>](<scope>) <subject> (#pr)`

### type options (all lowercase)

Type of this commit, constrained to the following:

- fix: bug fixes
- feature: new features
- feature-wip: Features in development, such as parts of a function.
- improvement: Optimization and enhancement of existing features
- style: Code style adjustments
- typo: Typos in code or documentation
- refactor: Code refactoring (not involving feature changes)
- performance/optize: Performance optimization
- test: Adding or repairing unit tests
- deps: Modifications to third-party dependencies
- community: Modifications related to the community, such as editing GitHub Issue templates, etc.
  Notes:
  If multiple types appear in one commit, add multiple types.
  If code refactoring leads to performance improvements, you can add both [refactor][optimize]
  It is not allowed to have types other than those listed above. If necessary, new types should be added to this document.

### scope options

The module scope involved in this submission. As there are many functional modules, only a part is listed here, which will be continuously improved according to needs.
<br>For example, the framework of a chatbot:

- connector
- codechat
- sandbox
- ...
  Notes:
  Try to use options already listed in this document. If you need to add a new option, please update this document promptly.

### subject content

The title should clearly explain the main content of the submission.

## Example

Coming soon

## Reference

[doris-commit-format](https://doris.apache.org/zh-CN/community/how-to-contribute/commit-format-specification)
