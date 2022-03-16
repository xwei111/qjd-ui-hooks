---
author: 陈思雨
create: 2021-08-16
update: 2021-08-16
---

# UseTabs

## 基础使用

```js

import useTabs from '@/hooks/useTabs'

const { dataSource, currentTab, tabCLick } = useTabs({
  dataSource,
  currentTab: 'test'
})
```

<p style="background: #E6A23C; color: #fff;">currentTab是用来接收当前选中的tab标识，tabCLick是用来赋值给Tabs组件抛出的事件，否则currentTab不会实时更新</p>


## 出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| dataSource | Tabs配置(动态时传入) | Array | - | - |
| currentTab | 接收当前选中tab标识 | String | - | - |

## 入参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| dataSource | Tabs配置(动态时传入) | Array | - | - |
| currentTab | 接收当前选中tab标识 | String | - | - |
| tabCLick | 接收Tabs组件抛出的tabCLick事件 | Function(String) | - | - |

