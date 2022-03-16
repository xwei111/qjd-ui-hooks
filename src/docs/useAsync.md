---
author: 常小伟
create: 2021-08-17
update: 2021-08-17
---

# UseAsync

## 介绍

```useAsync```是对接口请求的统一封装，接收一个```promise```请求，对接口返回数据存储，同时使用```try catch```捕获服务端的错误

## 基础使用

```request```是一个```promise```请求，```result```接收接口返回数据

```js

const { result } = useAsync({ request, isLoading: false })
```

## 初始化不调用

```js

const { result } = useAsync({ request, init: false, isLoading: false })
```

## 默认带参

```js

const { result } = useAsync({ request, params: { id: 1 } })
```

## 开启loading

默认```loading```效果开启，业务场景中大多需要```loading```，当不需要时将```isLoading```设置为```false```

```js

const { result， loading } = useAsync({ request })
```

## 链式调用

```js

const { doResult } = useAsync({ request })

const getList = () => doResult(params).then(({code, params, data, message}) => console.log('ok'))
```

## 场景一

<p style="background: #67C23A; color: #fff;">编辑、新增共用弹窗需借助外部loading</p>

当编辑、修改、删除共用一个弹窗时，```loading```不在适用```useAsync```内部抛出的```loading```，需借助外部loading，通过```useAsync```暴露的回调函数处理```loading```状态

```js

// loading的定义可以自定义loading
const loading = ref(false)
// 或者借助useLoading，项目中为达成一致使用useLoading，此种写法更像react-hooks的写法，有两个优点：
// 1. 更新数据入口明确，均通过checkLoading方法更新数据
// 2. 数据流向明确，在useLoading中将loading更新
import useLoading from '@/hooks/useLoading'
const { loading, checkLoading } = useLoading()
// preCallback：调用接口前回调
// successCallBack：成功回调
// errorCallBack：catch捕捉到错误回调
// 新增
useAsync({
  request: add,
  isLoading: false,
  preCallback: () => checkLoading(true),
  errorCallBack: () => checkLoading(false),
  successCallBack: () => checkLoading(false)
})
// 编辑
useAsync({
  request: edit,
  isLoading: false,
  preCallback: () => checkLoading(true),
  errorCallBack: () => checkLoading(false),
  successCallBack: () => checkLoading(false)
})
```

## 场景二

<p style="background: #67C23A; color: #fff;">下拉框数据异步获取</p>

```js

// formState.setConfig是更新下拉框数据方法，不了解userForm时无需过分关注此处
// successCallBack是获取到数据后的后续动作，这里的动作指的是一件事，比如更新下拉框、提示提交成功、触发table更新等等
useAsync({
  request,
  isLoading: false,
  successCallBack: ({ code, data }) => code === '0' && formState.setConfig('users', 'options', data || [])
})
```

## 场景三

<p style="background: #67C23A; color: #fff;">接口返回数据不满足需求</p>

这里单纯指的是数据不满足需求，数据无法满足需求时在```callback```中可以拿到接口返回的原始数据，对原始数据处理即可，但返回的数据需满足```{ code, data, message }```格式

默认对接口返回数据处理如下（可约定）：

```js

// defaultCallBack为内置的默认对接口返回数据的处理
const defaultCallBack = (res = {}) => {
  // res为接口返回的原始数据
  if (!res) return {}
  const { data: { code, data, message } } = res || {}
  return {
    code,
    data,
    message
  }
}
```

实际案例：

```js

// 参数回调
const callback = res => {
  const { data: { data } } = res || {}
  const result = Object.prototype.toString.call(data) === '[object Array]' ? data
  : data && data.pagedRecords ? data.pagedRecords
    : []
  // 此处返回数据，需遵循{ data, code, message }格式
  return {
    data: result
  }
}
// 获取并处理数据
const { result: dataSource, loading } = useAsync({ request, callback })
```

## 场景四

<p style="background: #67C23A; color: #fff;">被动触发</p>

例如：查询

```js

const { doResult } = useAsync({ request, init: false })

const searchHandle = params => doResult(params)
```

## 场景五

<p style="background: #67C23A; color: #fff;">接口成功后触发动作</p>

例如： 提交表单成功后更新table

```js
const { doResult } = useAsync({
  request,
  init: false,
  successCallBack: ({ code, params, data }) => {
    code === '0' && Message.success('添加成功')
    code === '0' && emit('successHandle')
    code === '0' && doSomethings(params, data)
  }
})

const addHandle = params => doResult(params)
```

## 入参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|   request   |    接口请求   |   Promise   |    -         |   -     |  
|   params    |    默认参数   |   Object    |    -         |   -     |
|   init      |    是否初始化调用   |   Boolean    |    -       |   true     |
|   isLoading |    是否开启loading  |   Boolean    |    -       |   true     |
|   preCallback |  调用接口前回调    |   Function    |    -       |   -     |
|   callback  |  原始数据处理回调，通常只对数据处理    |   Function(res)    |    -       |   -     |
|   successCallBack  |  接口成功、数据处理完毕后触发动作回调  |   Function({ code, data, message, params } )    |    -       |   -     |
|   errorCallBack  |  捕获错误回调，语法错误、服务端失败等  |   Function    |    -       |   -     |
|   isArray   |    接口入参是否为数组形式   |   Boolean   |    -         |   false     |  

### Callback Params

<p style="background: #E6A23C; color: #fff;">使用callback处理数据后，需将数据按格式返回，返回格式如下：{ code, data, message }</p>

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|   res   |   接口返回的原始数据   |   -   |    -         |   -     |  

### SuccessCallBack Params

<p style="background: #E6A23C; color: #fff;">若之定义了callback函数，请以自定义callback返回的数据为准</p>

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|   code   |   状态码   |   -   |    -         |   -     |
|   data   |   处理后的数据   |   -   |    -         |   -     |
|   message   |   接口返回的消息   |   -   |    -         |   -     |
|   params   |   请求时的入参   |   -   |    -         |   -     |

## 出参


| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|   loading   |   加载状态(若isLoading为false，则不会抛出该值)   |   Boolean   |    -         |   false     |
|   result    |   接收接口返回并处理的数据（响应式）   |   -   |    -         |   null     |
|   doResult    |   触发接口调用并更新result   |   Function(params)   |    -         |   null     |

### DoResult Params

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|   params    |   接口入参   |   Object   |    -         |   {}     |

