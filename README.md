# CodeFuse-Docs

A static site base on [dumi](https://d.umijs.org).

## Enviroment
确保💻上存在node环境和git环境，可以使用node -v和git -v查看

```
# 也可以用命令安装下tnpm
npm install --registry=https://registry.npm.alibaba-inc.com -g tnpm
```

## Git Clone
```
git clone https://github.com/codefuse-ai/codefuse-ai.github.io.git
```

## Development
首次进入时，使用 vscode 打开代码仓库，运行命令tnpm i安装项目依赖包，没有tnpm的话使用
npm i也可以。若出现node版本问题，可以下载v16.20.1版本的 node 重新尝试

```tnpm安装dependency
tnpm cache clean --force 清除缓存
tnpm install --dependencies
```


```bash
# install dependencies
$ tnpm install

# start dev server
$ tnpm start

# build docs
$ tnpm run build
```

