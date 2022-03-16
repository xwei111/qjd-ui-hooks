---
author: 常小伟
create: 2021-08-16
update: 2021-08-16
---

# UseTimeout

## 介绍

```useTimeout```是对```setTimeout```的封装，主要优化是组件卸载时会清除定时器

## 使用

```js

import useTimeout from '@/hooks/useTimeout'

const { perTimeout } = useTimeout()

perTimeout(() => console.log('test'), 1000)
```

## 出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| perTimeout | 优化后setTimeout | Function(callback, time) | - | - |
| timer      | 存储定时器临时变量 | - | - | null |

### PerTimeout  Params

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| callback | 回调函数 | Function | - | - |
| time | 延时时间 | Number | - | 0 |
