---
author: 常小伟
create: 2022-03-16
update: 2022-03-16
---

# UseShow

## 介绍

```useShow```提供一个```boolean```值和改变```boolean```值状态的方法

## 使用

```js

const { isShow, checkShow } = useShow()

checkShow(true)
checkShow(false)
```

## 出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| isShow | 是否显示 | Boolean | - | false |
| checkShow  | 更新isShow | Function | - | - |
