---
author: 陈思宇
create: 2021-08-18
update: 2021-08-18
---

# UseDebounce

## 介绍

```useDebounce```是在```useTimeout```基础上对防抖功能的实现

## 基础使用

```js

import useDebounce from '@/hooks/useDebounce'

const { run } = useDebounce()
// input数据实时改变触发接口调用，添加防抖优化
const inputHandle = val => run(() => request({ id: val }), 500)
```

## 出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| run | 防抖函数 | Function(fn, wait) | - | - |
| cancel      | 取消定时器方法 | Function | - | null |

### Run Params

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| fn | 执行主函数 | Function | - | - |
| wait | 防抖时间 | Number | - | 300 |

