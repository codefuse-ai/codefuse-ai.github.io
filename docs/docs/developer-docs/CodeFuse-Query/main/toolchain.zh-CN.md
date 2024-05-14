---
store:
  title: CodeFuse-Query
  version: main
group:
  title: 🌱 CodeFuse-Query
  order: -1
title: VSCode插件
order: 3
toc: content
---

# 开发插件(VSCode)
## 安装
### 从VSCode官方插件市场安装(推荐)
[插件地址](https://marketplace.visualstudio.com/items?itemName=CodeFuse-Query.codefuse-query-extension)
### 使用VSIX安装包安装
1. 下载插件
2. 手动从 vsix 安装:
![image.png](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*fOE-T5L4f8gAAAAAAAAAAAAADlHYAQ/original)
3. 或者使用指令直接从终端安装:
```bash
code --install-extension [扩展vsix文件路径]
```
## 环境准备

-  Sparrow CLI ，参照 3 安装、配置、运行
## 扩展特性
本扩展提供了以下功能模块:

-  COREF AST Viewer 
-  Gödel Language Server 
-  Gödel Language Runner 
### COREF AST Viewer
以下功能需要在扩展设置中设置相关项后启用。目前仅支持于Java语言
#### Java 文件转成树状的 COREF Node
![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*P9CQQp1q2wsAAAAAAAAAAAAADlHYAQ/original)
#### Node 与代码位置的相互定位
![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*x-VqT74thusAAAAAAAAAAAAADlHYAQ/original)
#### 在Lib API Viewer 查看 Node 的API,Node 复制
![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*qlKjS6cZzl0AAAAAAAAAAAAADlHYAQ/original)
#### Lib API Viewer:查询与复制使用
![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*2Uu8QYcfdbwAAAAAAAAAAAAADlHYAQ/original)
### Gödel Language Server Features
以下功能均需要在设置扩展后启用。不设置相关项的情况下，语法高亮仍然可用。
#### 错误信息提示
错误信息会随着代码的更新而自动更新。
![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*Rh2RT6KJRBIAAAAAAAAAAAAADlHYAQ/original)
#### 符号信息提示和补全
包含local变量和全局符号信息的补全提示，关键字等信息会提供对应的使用样例，全局符号信息会提供更详细的内部信息，如包含的成员变量、成员方法、静态方法。

![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*Q7NoSYqc8ScAAAAAAAAAAAAADlHYAQ/original)

-  关键字补全和使用样例提示 
-  local 变量类型信息和符号补全 
-  `.` 跟随的符号信息和补全 
-  `::` 跟随的符号信息和补全 
-  注解使用样例提示 
-  全局符号类型信息 (内部结构，成员方法，静态方法) 
#### 跳转到定义
可以通过右键跳转定义或者`ctrl`/`command`+`left click`直接跳转到准确的符号定义位置。

![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*Ocg5SpI9mMMAAAAAAAAAAAAADlHYAQ/original)
#### 代码片段 (Snippets)
扩展提供了一些代码片段补齐以供快速编写 Gödel 1.0/script 代码。

![](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*rBq7Sb9HHG4AAAAAAAAAAAAADlHYAQ/original)
### GödelScript Runner
需要在扩展中设置 sparrow cli 路径后使用。运行脚本之前需要先加载数据库。关于如何生成数据库 参考 3.4.章节  运行 中的数据抽取部分。
#### 运行脚本
![panel.gif](https://mdn.alipayobjects.com/huamei_bvbxju/afts/img/A*PM2_QpHmb3AAAAAAAAAAAAAADlHYAQ/original)
提供了四种不同的脚本运行按钮：
1. 在要运行的脚本处右键执行。
2. 在 extension `GodelScript Runner` 面板上选择 `Run GödelScript`。
3. 在 extension `GodelScript Runner Setting` 面板上选择 `Run`。
4. 在 extension `GodelScript Runner Setting` 面板右上角点击运行按钮。
#### 数据库文件夹加载
1. 在要运行的脚本处右键选择包含数据库的文件夹进行加载。
2. 在 extension `GodelScript Runner` 面板上选择 `Load Database Directory`。
3. 在 extension `GodelScript Runner Setting` 面板上选择 `Database`。
4. 在 extension `GodelScript Runner Setting` 面板右上角点击数据库加载按钮。
## 扩展设置
### COREF AST Viewer 设置

-  `corefASTViewer.sparrowCliRoot` 
   - 指定 Sparrow CLI 的根目录，参照第3章节的安装部分
### Gödel Language Server 设置
扩展启动时，以下两项中存在任意一项未被设置，则会弹出提示。点击`configure`按钮会跳转至相应配置页面。

-  `godelScript.executablePath` 
   -  用于指定 GödelScript 的可执行文件路径，默认为空。需要时请替换为实际的 GödelScript 可执行文件的绝对路径。 
   -  如果已经下载 Sparrow CLI ，则 GödelScript 可执行文件为 `[sparrow cli root]/godel-script/usr/bin/godel`。 
-  `godelScript.libraryDirectoryPath` 
   -  用于指定 GödelScript 的库文件夹路径，默认为空。需要时请替换为 GödelScript 库文件夹绝对路径。 
   -  如果已经下载 Sparrow CLI ，则库文件夹路径为 `[sparrow cli root]/lib-1.0`。 

# 智能助手

待开放，尽情期待！
