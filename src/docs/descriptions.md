---
author: 常小伟
create: 2021-07-29
update: 2021-07-29
---

# Descriptions详情

<script>
import Descriptions from '@/components/descriptions/index.vue'

export default {
  components: {
    Descriptions
  },
  setup() {
    const columns = [
      { label: '经销商名称：', key: 'customerName' },
      { label: '社会信用代码：', key: 'socialCode' },
      { label: '客户编号：', key: 'extCustomCode' },
      { label: '法人姓名：', key: 'legalPersonName' },
      { label: '法人身份证号码：', key: 'legalPersonCode' },
      { label: '法人手机号：', key: 'legalPersonMobile' },
    ]

    const customColumns = [
      { label: '经销商名称：', key: 'customerName', num: 1 },
      { label: '社会信用代码：', key: 'socialCode', num: 2 },
      { label: '客户编号：', key: 'extCustomCode', num: 2 },
      { label: '法人姓名：', key: 'legalPersonName', num: 3 },
      { label: '法人身份证号码：', key: 'legalPersonCode', num: 3 },
      { label: '法人手机号：', key: 'legalPersonMobile', num: 3 },
    ]

    const dataSource = {
      customerName: 'customerName',
      socialCode: 'socialCode',
      extCustomCode: 'extCustomCode',
      legalPersonName: 'legalPersonName',
      legalPersonCode: 'legalPersonCode',
      legalPersonMobile: 'legalPersonMobile',
    }

    return {
      columns,
      customColumns,
      dataSource
    };
  },
}
</script>

## 介绍

对业务详情类组件进行统一封装

## 默认详情

默认```label```宽度和内容宽度比例为```1 : 2.2```，```label```与内容在统一行，且具有```label```背景色和```border```

<div class="demo_block">
  <Descriptions
    :columns="columns"
    :dataSource="dataSource"
  />
</div>

:::demo
```html

<template lang="pug">
Descriptions(
  :columns="columns"
  :dataSource="dataSource"
)
</template>
<script>
import Descriptions from '@/components/qjd/descriptions'

export default {
  components: {
    Descriptions
  },
  setup() {
    const columns = [
      { label: '经销商名称：', key: 'customerName' },
      { label: '社会信用代码：', key: 'socialCode' },
      { label: '客户编号：', key: 'extCustomCode' },
      { label: '法人姓名：', key: 'legalPersonName' },
      { label: '法人身份证号码：', key: 'legalPersonCode' },
      { label: '法人手机号：', key: 'legalPersonMobile' },
    ]

    const dataSource = {
      customerName: 'customerName',
      socialCode: 'socialCode',
      extCustomCode: 'extCustomCode',
      legalPersonName: 'legalPersonName',
      legalPersonCode: 'legalPersonCode',
      legalPersonMobile: 'legalPersonMobile',
    }

    return {
      columns,
      dataSource
    };
  },
}
</script>
```
:::

## label宽度固定

设置```labelWidth```，类型为```number```

<div class="demo_block">
  <Descriptions
    :columns="columns"
    :dataSource="dataSource"
    :labelWidth="150"
  />
</div>

:::demo
```html

<template lang="pug">
Descriptions(
  :columns="columns"
  :dataSource="dataSource"
  :labelWidth="150"
)
</template>
<script>
import Descriptions from '@/components/qjd/descriptions'

export default {
  components: {
    Descriptions
  },
  setup() {
    const columns = [
      { label: '经销商名称：', key: 'customerName' },
      { label: '社会信用代码：', key: 'socialCode' },
      { label: '客户编号：', key: 'extCustomCode' },
      { label: '法人姓名：', key: 'legalPersonName' },
      { label: '法人身份证号码：', key: 'legalPersonCode' },
      { label: '法人手机号：', key: 'legalPersonMobile' },
    ]

    const dataSource = {
      customerName: 'customerName',
      socialCode: 'socialCode',
      extCustomCode: 'extCustomCode',
      legalPersonName: 'legalPersonName',
      legalPersonCode: 'legalPersonCode',
      legalPersonMobile: 'legalPersonMobile',
    }

    return {
      columns,
      dataSource
    };
  },
}
</script>
```
:::

## 朴素版

即无border、无```label```背景色

<div class="demo_block">
  <Descriptions
    :columns="columns"
    :dataSource="dataSource"
    :labelBg="false"
    :border="false"
    :labelWidth="110"
  />
</div>

:::demo
```html

<template lang="pug">
Descriptions(
  :columns="columns"
  :dataSource="dataSource"
  :labelBg="false"
  :border="false"
  :labelWidth="110"
)
</template>
<script>
import Descriptions from '@/components/qjd/descriptions'

export default {
  components: {
    Descriptions
  },
  setup() {
    const columns = [
      { label: '经销商名称：', key: 'customerName' },
      { label: '社会信用代码：', key: 'socialCode' },
      { label: '客户编号：', key: 'extCustomCode' },
      { label: '法人姓名：', key: 'legalPersonName' },
      { label: '法人身份证号码：', key: 'legalPersonCode' },
      { label: '法人手机号：', key: 'legalPersonMobile' },
    ]

    const dataSource = {
      customerName: 'customerName',
      socialCode: 'socialCode',
      extCustomCode: 'extCustomCode',
      legalPersonName: 'legalPersonName',
      legalPersonCode: 'legalPersonCode',
      legalPersonMobile: 'legalPersonMobile',
    }

    return {
      columns,
      dataSource
    };
  },
}
</script>
```
:::

## 一行显示多个

通过```num```控制一行显示的数量

<div class="demo_block">
  <Descriptions
    :columns="columns"
    :dataSource="dataSource"
    :num="3"
    :labelWidth="150"
  />
</div>

:::demo
```html

<template lang="pug">
Descriptions(
  :columns="columns"
  :dataSource="dataSource"
  :num="3"
  :labelWidth="150"
)
</template>
<script>
import Descriptions from '@/components/qjd/descriptions'

export default {
  components: {
    Descriptions
  },
  setup() {
    const columns = [
      { label: '经销商名称：', key: 'customerName' },
      { label: '社会信用代码：', key: 'socialCode' },
      { label: '客户编号：', key: 'extCustomCode' },
      { label: '法人姓名：', key: 'legalPersonName' },
      { label: '法人身份证号码：', key: 'legalPersonCode' },
      { label: '法人手机号：', key: 'legalPersonMobile' },
    ]

    const dataSource = {
      customerName: 'customerName',
      socialCode: 'socialCode',
      extCustomCode: 'extCustomCode',
      legalPersonName: 'legalPersonName',
      legalPersonCode: 'legalPersonCode',
      legalPersonMobile: 'legalPersonMobile',
    }

    return {
      columns,
      dataSource
    };
  },
}
</script>
```
:::

## 自定义每行所占各数

通过指定```columns```每行包含的个数```num```来控制

<div class="demo_block">
  <Descriptions
    :columns="customColumns"
    :dataSource="dataSource"
    :labelWidth="150"
  />
  <div style="margin-bottom: 20px;"></div>
  <Descriptions
    :columns="customColumns"
    :dataSource="dataSource"
    :inline="false"
  />
</div>

:::demo
```html

<template lang="pug">
Descriptions(
  :columns="customColumns"
  :dataSource="dataSource"
  :labelWidth="150"
)
Descriptions(
  :columns="customColumns"
  :dataSource="dataSource"
  :inline="false"
)
</template>
<script>
import Descriptions from '@/components/qjd/descriptions'

export default {
  components: {
    Descriptions
  },
  setup() {
    const customColumns = [
      { label: '经销商名称：', key: 'customerName', num: 1 },
      { label: '社会信用代码：', key: 'socialCode', num: 2 },
      { label: '客户编号：', key: 'extCustomCode', num: 2 },
      { label: '法人姓名：', key: 'legalPersonName', num: 3 },
      { label: '法人身份证号码：', key: 'legalPersonCode', num: 3 },
      { label: '法人手机号：', key: 'legalPersonMobile', num: 3 },
    ]

    const dataSource = {
      customerName: 'customerName',
      socialCode: 'socialCode',
      extCustomCode: 'extCustomCode',
      legalPersonName: 'legalPersonName',
      legalPersonCode: 'legalPersonCode',
      legalPersonMobile: 'legalPersonMobile',
    }

    return {
      customColumns,
      dataSource
    };
  },
}
</script>
```
:::

## label位置

通过```inline```控制```label```是否和内容显示一行

<div class="demo_block">
  <Descriptions
    :columns="columns"
    :dataSource="dataSource"
    :inline="false"
  />
</div>

:::demo
```html

<template lang="pug">
Descriptions(
  :columns="columns"
  :dataSource="dataSource"
  :inline="false"
)
</template>
<script>
import Descriptions from '@/components/qjd/descriptions'

export default {
  components: {
    Descriptions
  },
  setup() {
    const columns = [
      { label: '经销商名称：', key: 'customerName' },
      { label: '社会信用代码：', key: 'socialCode' },
      { label: '客户编号：', key: 'extCustomCode' },
      { label: '法人姓名：', key: 'legalPersonName' },
      { label: '法人身份证号码：', key: 'legalPersonCode' },
      { label: '法人手机号：', key: 'legalPersonMobile' },
    ]

    const dataSource = {
      customerName: 'customerName',
      socialCode: 'socialCode',
      extCustomCode: 'extCustomCode',
      legalPersonName: 'legalPersonName',
      legalPersonCode: 'legalPersonCode',
      legalPersonMobile: 'legalPersonMobile',
    }

    return {
      columns,
      dataSource
    };
  },
}
</script>
```
:::

## 自定义内容

通过```slot```并指定名称为对应```key```

<div class="demo_block">
  <Descriptions
    :columns="columns"
    :dataSource="dataSource"
    :labelWidth="150"
  >
    <template slot="customerName" slot-scope="{ dataSource }">
      <span>{{ dataSource.customerName }}  is custom xxxxxxxxxxxx</span>
    </template>
  </Descriptions>
</div>

:::demo
```html

<template lang="pug">
Descriptions(
  :columns="columns"
  :dataSource="dataSource"
  :inline="false"
)
  template(slot="customerName" slot-scope="{ dataSource }")
    span {{ dataSource.customerName }}  is custom xxxxxxxxxxxx
</template>
<script>
import Descriptions from '@/components/qjd/descriptions'

export default {
  components: {
    Descriptions
  },
  setup() {
    const columns = [
      { label: '经销商名称：', key: 'customerName' },
      { label: '社会信用代码：', key: 'socialCode' },
      { label: '客户编号：', key: 'extCustomCode' },
      { label: '法人姓名：', key: 'legalPersonName' },
      { label: '法人身份证号码：', key: 'legalPersonCode' },
      { label: '法人手机号：', key: 'legalPersonMobile' },
    ]

    const dataSource = {
      customerName: 'customerName',
      socialCode: 'socialCode',
      extCustomCode: 'extCustomCode',
      legalPersonName: 'legalPersonName',
      legalPersonCode: 'legalPersonCode',
      legalPersonMobile: 'legalPersonMobile',
    }

    return {
      columns,
      dataSource
    };
  },
}
</script>
```
:::

## Attributes

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| columns | 详情配置 | Arrary | - | [] |
| dataSource | 详情数据 | Object | - | {} |
| labelWidth | label宽度 | Number | - | - |
| labelBg | 是否有label背景 | Boolean | - | true |
| num | 一行显示数量 | Number | - | 2 |
| inline | label和内容是否显示在一行 | Boolean | - | true |
| border | 是否有border | Boolean | - | true |

## Columns Attributes

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| label |   标题 | String | - | - |
| key   |   唯一标识 | String | - | - |
| num   |   每行个数，默认取全局配置num | Number | - | - |