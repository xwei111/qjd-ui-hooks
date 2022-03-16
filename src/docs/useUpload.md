---
author: 常小伟
create: 2021-11-26
update: 2021-12-21
---

## useUpload

## 介绍

```useUpload```是对静态文件上传的逻辑封装，配置```Upload```组件使用

## 基础使用

```js

import useUpload from '@/hooks/useUpload'

const uploadApis = useUpload()

// uploadApis.fileLists即为上传的文件，uploadApis.loading为上传loading状态
```

## 配合form使用

```js

import useUpload from '@/hooks/useUpload'

const uploadApis = useUpload({ formApis, key: 'test' })

// 文件上传成功后会给formData.test设置值，即：上传的文件
```

## 入参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|  uploadRef  | 绑定的ref | - | - | - |
|  formApis   |  useForm返回的对象 | - | - | - |
|  key   |  需要给form赋值的key | - | - | - |
|  cName   |  文件名 | - | - | name |
|  cKey   |  文件对应的key | - | - | key |
|  otherParams  | 混入其他参数，最终会通过给formApis赋值给每一组文件数据  | Object | - | - |
|  callback   | 自定义文件处理方案 | Function | - | - |
|  onPreview  |  预览回调，携带一个参数data，data里包含文件信息 | Function(data) | - | - |

```otherParams```和```callback```的实现逻辑

```js

const _setFile = files => {
  if (callback) {
    // 自定义文件处理逻辑
    files = callback(files)
  } else {
    // 通用文件处理逻辑，otherParams：额外参数
    files = files?.map(file => {
      const { fileName, key } = file?.response ?? {}
      return { [cName]: fileName, [cKey]: key, ...otherParams }
    })
  }
  fileLists.value = files
  formApis && formApis.setFormItem(key, files || null)
}
```

## 出参

<p style="background: #E6A23C; color: #fff;">事件和Upload组件事件一一对应</p>

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|  loading   |  文件上传状态 | Boolean | - | - |
|  fileLists   |  上传的文件 | Array | - | - |
|  onChange   |  文件改变出发 | Function | - | - |
|  onRemove   |  移除文件出发 | Function | - | - |
|  onPreview   |  文件预览 | Function | - | - |
|  onError   |  失败触发 | Function | - | - |
|  onSuccess   |  成功触发 | Function | - | - |
|  beforeUpload |  文件上传前触发 | Function | - | - |
|  setFileList  | 给上传文件重新赋值 | Function(files) | - | - |
|  clearFiles   | 清空上传文件  |  Function | - | - |

<p style="background: #E6A23C; color: #fff;">setFileList、clearFiles最终均会调用upload组件暴露的对应的setFileList和clearFiles方法</p>
