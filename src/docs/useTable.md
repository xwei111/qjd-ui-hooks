---
author: 常小伟
create: 2021-08-24
update: 2021-08-24
---

# UseTable

<p style="background: #F56C6C; color: #fff;">useTable使用了lodash/cloneDeep，使用该use函数前，确保项目安装了lodash/cloneDeep</p>

## 介绍

```useTable```是对列表类基础逻辑的封装，```UI```表现形式可能为```table```、```list```等形式，对于扩展如```useTableEdit```、```useTableColumn```等均是在```useTable```的基础上完成，另外列表与分页信息如影随形，所以```useTable```中包含了分页的信息

## 基础使用

```js

import useTable from '@/hooks/useTable'
// dataSource：列表数据，pagination：分页信息，request：接口请求
const { dataSource, pagination } = useTable({ request })
```

## 初始化不调用

对于某些场景初始化时不需要触发接口调用，将```isInit```设置为```false```即可，默认为```true```

```js

const { dataSource } = useTable({ request, isInit: false })
```

## 默认参数

可通过```defaultParams```设置初始化的默认参数，默认为```{}```

```js

const { dataSource } = useTable({ request, defaultParams: { id: 1 } })
```

## 是否有分页

```isPage```默认为```true```，若不需要分页将其设置为```false```

```js

const { dataSource } = useTable({ request, isPage: false })
```

## 接口返回数据不符合需要

按照约定，通常情况下后端返回的数据符合```useTable```的处理，但不排除不符合的情况，可以通过```callback```对数据进行处理

<p style="background: #67C23A; color: #fff;">返回数据格式须符合{ totalCount, dataSource  }格式</p>

```js

const { dataSource } = useTable({
  request,
  callback: ({ code, data }) => {
    return code === '0' ? { totalCount: data?.total || 0, dataSource: data?.data || [] } : {}
  }
})
```

## 动态表头

当表头为动态时，入参需要传一个```columns```和```isActiveColumn```，出参会多一个响应式```columns```和更新这个响应式数据的方法```setColumns```，```isActiveColumn```的作用是告诉```useTable```混入```useTableColumn```逻辑

```js

const {
  columns,
  dataSource,
  setColumns
} = useTable({
  request,
  isActiveColumn: true,
  columns: defaultColumns
})
// 设置表头
const changeColumns = cols = > setColumns(cols)
```

## 可编辑table

<p style="background: #67C23A; color: #fff;">有分页的列表且编辑时不会实时向后端发起请求存储数据时，如果切换分页时远程请求数据会导致编辑的数据丢失，而可编辑table正是对此问题的处理。和动态表头一样，可编辑table不属于基础table功能，需要单独拉一份use函数完成，并通过入参方式混入useTable</p>

将设置```edit```为```true```告知```useTable```混入```useTableEdit```逻辑

```js

const { dataSource, setEditChange } = useTable({ request, edit: true })
// 假设table中有一个input，监听input数据变化的事件为onChange，则在onChange事件触发时存储编辑数据即可
// setEditChange：存储当前编辑数据，存储数据后分页在切换时会携带上之前编辑的数据
const onChange = () => setEditChange(dataSource)
```

## 多选table

<p style="background: #67C23A; color: #fff;">之前多选table为自定义逻辑，更适合自定义的checkbox，目前多选table使用element的table组件自带的checkbox以及功能，但若是自定义checkbox可拉一份新的use函数将原有的checkbox逻辑拿过来即可。多选table同样是不属于基础table功能，同样是为了应对分页切换的问题，element内置了此功能，开启reserve-selection即可</p>

将```checkbox```设置为```true```开启多选模式

```js

const { dataSource, selectionChange  } = useTable({ request, checkbox: true })
// 设置当前勾选数据，selectionHandle为element-table的selection-change事件
const selectionHandle = vals => selectionChange(vals)
```

## table数据静态操作

开发可能会遇到对table新增一条数据、删除数据等静态操作，更具目前现有业务封装了```useTableEditDataSource```，通过设置```editDataSource```告知```useTable```是否混入```useTableEditDataSource```逻辑

```js

// addRow：添加数据
// delSelectedRows：删除数据
// resetDataSource：重置数据
const { addRow, delSelectedRows, resetDataSource  } = useTable({ request, checkbox: true })
```



## 入参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| tableRef | table绑定的ref | - | - | - |
| request | 接口请求 | Promise | - | - |
| defaultParams | 接口请求默认入参 | Object | - | {} |
| isInit | 是否初始化发起接口请求 | Boolean | - | true |
| isPage | 是否有分页 | Boolean | - | true |
| callback | 接口请求数据处理回调 | Function(data) | - | - |
| columns | 动态表头时需传入columns，参考element | Arrary | - | [] |
| isActiveColumn | 是否开启动态表头 | Boolean | - | false |
| checkbox | 是否开启多选 | Boolean | - | false |
| edit | 是否开启可编辑table | Boolean | - | false |
| editDataSource | 是否开启dataSource静态处理 | Boolean | - | false |

## 出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| dataSource | 接口请求数据 | Arrary | - | [] |
| pagination | 分页信息 | Object | - | - |
| searchInfo | 查询条件 | Object | - | {} |
| loading    | loading状态 | Boolean | - | false |
| searchHandle | 主动触发接口调用方法 | Function(params) | - | - |
| resetHandle | 重置(重置查询条件&dataSource) | Function | - | - |
| clearHandle | 清空数据&重置分页信息 | Function | - | - |
| clearDefaultParams |  重置默认参数 | Function | - | - |

## 开启isActiveColumn后增加的出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| columns | columns配置 | Arrary | - | [] |
| setColumns | 设置columns | Function(data) | - | - |

## 开启checkbox后增加的出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| currentSelects | 当前选中数据 | Arrary | - | [] |
| setCurrentSelects | 设置currentSelects | Function(data) | - | - |
| selectionChange | 设置currentSelects，未开启checkbox则不触发 | Function(data) | - | - |

## 开启edit后增加的出参

<p style="background: #E6A23C; color: #fff;">setEditChange是数据回显的关键，当数据编辑后需触发该方法来设置editDatas，以保证分页切换时数据可以正常回显</p>

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| editDatas | 编辑数据 | Object | - | {} |
| clearEdits | 清空编辑数据 | Function | - | - |
| setEditChange | 设置编辑数据 | Function(data: any[]) | - | - |

## 开启editDataSource后增加的出参

<p style="background: #E6A23C; color: #fff;">此处的操作均为对dataSource的静态操作</p>

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| addRow | 添加数据 | Function(normalizeRow, insertFirst) | - | - |
| delSelectedRows | 删除数据 | Function(primaryKey) | - | - |
| resetDataSource | 重置数据 | Function(newDataSource) | - | - |

### Pagination

| key        | 说明         |      默认值    |
|-------------|--------------|--------------|
| current | 当前页数 | 1 |
| pageSize | 当前条数 | 10 |
| total | 总条数 | 0 |
| onChange | 页数改变事件 | Function(page, pageSize) |
| onShowSizeChange | 条数改变事件 | Function(current, size) |
