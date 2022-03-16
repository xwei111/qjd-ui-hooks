---
author: 陈思雨
create: 2021-08-23
update: 2021-08-23
---

# useModal

## 介绍

```useModal```存储了弹窗常用的状态&方法，可以配置```Modal```组件一起使用

## 基础使用

```js

import useModal from '@/hooks/useModal'

const {
  visible,
  openHandle,
  cancleHandle,
  title,
  setTitle
  detail,
  setDetail,
} = useModal('title')
```

```useModal```较为常规，并没有特殊的使用，提供的几个```api```也均是为了控制弹窗的状态，不在介绍过多的```demo```

## 入参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|   title   |    弹窗标题   |   String   |    -         |   -     |

## 出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|   visible   |    是否显示弹窗   |   Boolean   |    -         |   false    |
|   openHandle   |    打卡弹窗   |   Function   |    -         |   -    |
|   cancleHandle   |    关闭弹窗   |   Function   |    -         |   -    |
|   title   |    弹窗标题   |   String   |    -         |   -    |
|   setTitle   |    修改弹窗标题   |   Function(String)   |    -         |   -    |
|   detail    |   传入弹窗的详情数据 | Any | - | - |
|   setDetail    |   修改弹窗的详情数据 | Function(Any) | - | - |

