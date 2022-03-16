---
author: 常小伟
create: 2021-08-18
update: 2021-08-18
---

# UsePop

## 介绍

```usePop```是针对目前厂服业务中的```pop```指引组件封装的逻辑，具有一定的业务性

## 基础使用

```js

import usePop from '@/hooks/usePop/index.js'

const popState = usePop({ root, operationModule: 'CREDIT_APPLY' })
```

## 需要插入特殊任务

```js

import usePop from '@/hooks/usePop/index.js'

const popState = usePop({
  root,
  operationModule: 'CREDIT_APPLY',
  callBack: ({ step, end }) => {
    step === 2 && console.log('开始做第一件事')
    step === 4 && console.log('开始做第二件事')
  }
})
```

## 配合Pop组件使用

```vue

<template lang="pug">
Pop(
  :dataSource="popDatas"
  :visible="popState.visible"
  @nextHandle="popState.nextHandle"
)
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import Pop from '@/components/qjd/pop'
import usePop from '@/hooks/usePop/index.js'
import { popDatas } from './config'

export default {
  components: { Pop },
  setup(props, { root }) {
    // pop
    const popState = usePop({ root, operationModule: 'CREDIT_APPLY' })
    // state
    const state = reactive({ popState })

    return {
      popDatas,
      ...toRefs(state)
    }
  }
}
</script>
```

## 入参

<p style="background: #E6A23C; color: #fff;">从root中会获取hasGuide、$router和name，$router和name用来作为指引完毕的页面重定向，hasGuide用来作为一个判断是否需要指引的标识</p>

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|   root   |    当前组件实例，从context中获取   |   Vue   |    -         |   -     |
|   operationModule   |    业务模块   |   String   |    -         |   -     |
|   callBack   |  下一步事件回调，当某步有特殊业务时，通过callback插入  | Function({ step, end }) | - | - |

## 出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|   visible   |    显示or隐藏   |   Boolean   |    -         |   false    |
|   loading   |    判断是否做过指引接口loading   |   Boolean   |    -         |   false    |
|   nextHandle   |  下一步事件  | Function({ step, end }) | - | - |
