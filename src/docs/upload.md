---
author: 常小伟
create: 2021-10-27
update: 2021-10-27
---

# UpLoad上传组件

## 描述

```upload```是根据当前业务基于```element-ui```封装的上传组件

## 基础使用

```vue

<template lang="pug">
Upload(
  style="width: 340px;"
  :action="toPrefixUrl('/fs/file/doUploadWithFile')"
  :accept="'.zip,.doc,.docx,.pdf,.jpg'"
  :max="50"
  @onPreview="onPreview"
  @beforeUpload="beforeUpload"
  @onChange="onChange"
  @onRemove="onRemove"
  @onSuccess="onSuccess"
  @onError="onError"
)
  el-tooltip(
    placement='top'
    content='请上传文件'
  )
    el-button(plain type='primary') 选择文件
</template>
<script>
import Upload from '@/components/qjd/upload'

export default {
  components: {
    Upload,
  },
  setup() {
    // 预览
    const onPreview = file => console.log(file)
    // 上传文件前-触发接口前
    const beforeUpload = file => console.log(file)
    // 文件改变
    const onChange = (file, files) => console.log(file, files)
    // 移除
    const onRemove = (file, files) => console.log(file, files)
    // 成功
    const onSuccess = (response, file, files) => console.log(response, file, files)
    // 失败
    const onError = (err, file, files) => console.log(err, file, files)

    return {
      onPreview,
      beforeUpload,
      onChange,
      onRemove,
      onSuccess,
      onError
    }
  }
}
</script>
```

## Attributes

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| action | 必选参数，上传的地址 | String | - | - |
| accept | 接受上传的文件类型,例：.zip,.doc | String | - | - |
| max | 允许上传文件大小，单位为M | Number | - | - |
| auto | 是否开启自动上传 | Boolean | - | true |
| single | 是否开启单文件上传 | Boolean | - | fasle |
| otherData | 上传时附带的额外参数 | Object | - | - |
| defaultFileList | 默认展示的文件 | Array | - | [] |
| onPreview | 预览 | Function(file) | - | - |
| beforeUpload | 上传文件前事件 | Function(file) | - | - |
| onChange | 文件改变事件 | Function(file, files) | - | - |
| onRemove | 移除 | Function(file, files) | - | - |
| onSuccess | 成功 | Function(response, file, files) | - | - |
| onError | 失败 | Function(err, file, files) | - | - |

## Methods

| 事件名        | 说明         | 参数      |
|---------------|--------------|----------|
|   clearFiles   |  清空文件          |  -     |
|   getFileList  |  获取当前fileList  |  -     |
|   setFileList  |  手动设置fileList  |  Function(Array)  |
|   uploadSubmit |  手动触发上传       |  -     |


