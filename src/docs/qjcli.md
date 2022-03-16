---
author: 常小伟
create: 2021-04-19
update: 2021-04-19
---

## 介绍

提升开发效率，将一些工具集成到```qj-cli```中，[gitlab](https://gitlab.qjdchina.com/FE-zhuozhu/qjd-cli/-/tree/master)

## 安装

```

npm install qj-cli -g
```

## 帮助

```

$ qc -h

options:
  -v, --version         output version
  -h, --help            output help
commands:
  ptoh <entry> <output>          pug to html, entry & output is [name].vue
  create <fileName>             create template
```

## 版本

```

$ qc -v

1.0.3
```

## pug转为html

```

$ qc ptoh entry.vue output.vue

read...0%
read...96.43%
read over
pug doing...
pug done
writing...
write over
√ pug to html success !

```

## 创建模板

```

$ qc create index.vue

? 请选择模板类型 (Use arrow keys)
? 请选择模板类型 pug
? 请选择模板 (Use arrow keys)
? 请选择模板 pageSearch
- creating...
√ create pageSearch success !

```
