---
author: 常小伟
create: 2021-08-23
update: 2021-08-23
---

# UseLoading

## 介绍

```useLoading```本身并无太大的意义，但其却体现了一种很好的思想，继续往下看

## 基础使用


```js

import useLoading from './useLoading'

const { loading, checkLoading } = useLoading()

// 开启loading
checkLoading(true)
// 关闭loading
checkLoading(false)
```

## 和react-hooks比较

和```react-hooks```做一下比较会发现使用极其的相似，但```react```更新数据的只有通过```checkLoading```，而```vue```除了```checkLoading```外还可以通过直接给```loading```赋值改变```loading```，如：```loading.value = true```，这让```vue```更新数据相对灵活，但也恰恰是这点让```vue```丢失了严谨性，这里更推荐```react-hooks```更新数据的方式

```js

import { useState } from 'react'

const [loading, checkLoading] = useState(false)

// 开启loading
checkLoading(true)
// 关闭loading
checkLoading(false)
```

## checkLoading更新数据的优势


<p style="background: #67C23A; color: #fff;">1. 更新入口明确</p>

```checkLoading```就是唯一更新方法

<p style="background: #67C23A; color: #fff;">2. 保证的数据的流动、更新为正向而非逆向</p>

```loading.value = true```就是对数据的逆向操作

后续将会有很多此类更新数据的方式，这里提前介绍一下

## 出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| loading | loading状态 | Boolean | - | false |
| checkLoading      | 更新loading | Function | - | - |

