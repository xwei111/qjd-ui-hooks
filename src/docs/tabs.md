---
author: 陈思雨
create: 2021-11-01
update: 2021-11-01
---

# Tabs

<script>
import { ref } from "@vue/composition-api"
import Tabs from '@/components/tabs/index.vue'

export default {
  components: { Tabs },
  setup() {
    // 授信设置-tabs
    const dataSource = [
      { label: '赊销政策配置', value: 'policy' },
      { label: '赊销规则配置', value: 'rule' },
      { label: '审批材料配置', value: 'material' }
    ]
    // tabCLick
    const tabCLick = val => console.log('val---', val)

    return {
      dataSource,
      tabCLick
    };
  },
}
</script>

## 基础使用

<div class="demo_block">
  <Tabs :dataSource="dataSource" :defaultTab="'policy'" @tabCLick="tabCLick" />
</div>

:::demo
```html

<template lang="pug">
Tabs(:dataSource="dataSource" :defaultTab="'policy'" @tabCLick="tabCLick" )
</template>
<script>
import { ref } from "@vue/composition-api"
import Tabs from '@/components/tabs/index.vue'

export default {
  components: { Tabs },
  setup() {
    const dataSource = [
      { label: '赊销政策配置', value: 'policy' },
      { label: '赊销规则配置', value: 'rule' },
      { label: '审批材料配置', value: 'material' }
    ]
    // tabCLick
    const tabCLick = val => console.log('val---', val)

    return {
      dataSource,
      tabCLick
    };
  },
}
</script>
```
:::

<p style="background: #67C23A; color: #fff; margin: 20px 0;">主要配合useTabs使用</p>

## Attributes

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| dataSource | tab栏数据 | Array | - | [] |
| defaultTab | 默认选中的tab | String | - | - |
| type    | 类型，默认为normal | String | - | normal、backgroundLine |

## events

| 方法名        | 说明         | 参数     |
|---------------|--------------|---------|
| tabCLick | 选择tab事件 |  tabCLick(String) |

## Methods

| 方法名        | 说明         | 参数     |
|---------------|--------------|---------|
| setCurrentTab | 手动设置tab |  Function(String) |


