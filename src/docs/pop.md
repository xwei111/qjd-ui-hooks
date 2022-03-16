---
author: 常小伟
create: 2021-08-11
update: 2021-08-11
---

# Pop气泡引导

<script>
import { ref } from "@vue/composition-api"
import Pop from '@/components/pop/index.vue'
import { Message } from 'element-ui'

export default {
  components: { Pop },
  setup() {
    const popRef = ref()
    const visible = ref(false)

    const dataSource = [
      { left: 170, top: 240, direction: 'left', text: '我是Pop菜单' },
      { left: 322, top: 390, text: '我是开始指引' },
      { right: 77, top: 332, direction: 'bottom', text: '我是文档' },
      { left: 322, direction: 'bottom', id: 'custom_pop_test_id', parentId: 'app', text: '我是初始状态不在屏幕课件区域内元素' }
    ]

    const nextHandle = ({ step, end }) => {
      if(end) {
        popRef.value && popRef.value.resetHandle()
        visible.value = false
        Message.info('引导结束')
        document.getElementById('app').scrollTo({ top: 0 })
      }
    }

    return {
      popRef,
      dataSource,
      visible,
      nextHandle,
    };
  },
}
</script>

## 介绍

针对当前业务中的指引气泡的统一封装，默认容器为```el-scrollBar```

<div class="demo_block">
  <Pop
    ref="popRef"
    :top="0"
    :dataSource="dataSource"
    :visible="visible"
    :isElScrollBar="false"
    @nextHandle="nextHandle"
  />
  <el-button type="primary" @click="() => visible = true">开始指引</el-button>
</div>

:::demo
```html

<template lang="pug">
div
  Pop(
    ref="popRef"
    :top="0"
    :dataSource="dataSource"
    :visible="visible"
    :isElScrollBar="false"
    @nextHandle="nextHandle"
  )
  el-button(
    type="primary"
    @click="() => visible = true"
  ) 开始指引
</template>
<script>
import { ref } from "@vue/composition-api"
import Pop from '@/components/qjd/pop/index.vue'
import { Message } from 'element-ui'

export default {
  components: { Pop },
  setup() {
    const popRef = ref()
    const visible = ref(false)

    const dataSource = [
      { left: 170, top: 240, direction: 'left', text: '我是Pop菜单' },
      { left: 322, top: 390, text: '我是开始指引' },
      { right: 77, top: 332, direction: 'bottom', text: '我是文档' },
      { left: 322, direction: 'bottom', id: 'custom_pop_test_id', parentId: 'app', text: '我是初始状态不在屏幕课件区域内元素' }
    ]

    const nextHandle = ({ step, end }) => {
      if(end) {
        popRef.value && popRef.value.resetHandle()
        visible.value = false
        Message.info('引导结束')
        document.getElementById('app').scrollTo({ top: 0 })
      }
    }

    return {
      popRef,
      dataSource,
      visible,
      nextHandle
    };
  },
}
</script>
```
:::

## 其他页面跳入

<p style="background: #E6A23C; color: #fff;">hasGuide是一个非常业务化的配置，如果从其他页面跳入当前页面，当前页需要指引时需要将hasGuide塞入route，并设置为1，usePop会将hasGuide作为一个是否需要指引的一个依据</p>

```js

// 案例可以参考：赊销管理 => 操作指引
root.$router.push({ name: item.name, query: hasGuide === 1 ? { hasGuide: 1 } : {} })
```

## 配合usePop使用

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

## Attributes

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| dataSource | pop数据 | Array | - | [] |
| visible | 是否显示 | Boolean | - | false |
| top | 滚动容器距离屏幕上部距离 | Number | - | 60（默认为厂服内容区距离顶部距离） |
| isElScrollBar | 容器是否为el-scrollBar | Boolean | - | true |
| nextHandle    | 下一步点击事件 | Function({ step, end }) | - | - |

## DataSource Attributes


| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| left | 左侧位置 | Number | - | - |
| right | 右侧位置 | Number | - | - |
| top | 顶部位置 | Number | - | - |
| bottom | 底部位置 | Number | - | - |
| direction | 箭头方向 | left、bottom、top | top |
| text | 文本内容 | String | - | - |
| id | 元素id(当元素初始状态超出屏幕时) | String | - | - |
| parentId | 容器id | String | - | content_view(厂服内容区容器id) |


<div style="padding: 50px 0;">
  <el-button type="primary"  id="custom_pop_test_id">我是初始状态不在屏幕课件区域内元素</el-button>
</div>
