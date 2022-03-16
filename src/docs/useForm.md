---
author: 常小伟
create: 2021-08-25
update: 2021-08-25
---

# UseForm

<p style="background: #F56C6C; color: #fff;">useForm使用了lodash/cloneDeep，使用该use函数前，确保项目安装了lodash/cloneDeep</p>

## 介绍

根据目前现有业务针对```form```做逻辑层的封装，```useForm```需要和我们封装的```Form```配合使用，不满足需求时查漏补缺

## 基础使用

<p style="background: #67C23A; color: #fff;">Form组件是ui层的封装，useForm就是配套的逻辑层，除了非常个性化的业务通过插槽处理外，其余的均是通过数据配置（formConfig）和逻辑层完成ui层的展现效果</p>

```vue

<template lang="pug">
Form(
  ref="formRef"
  :formData="formData",
  :formConfig="formConfig"
)
  el-button(@click="searchFormHandle") 搜索
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import useForm from '@/hooks/useForm'

export default {
  components: { Form },
  setup() {
    // ref
    const formRef = ref()
    // form
    const {
      formData,
      formConfig,
      submitHandle
    } = useForm({
      formRef,
      formData: { member: undefined, time: undefined },
      formConfig: [
        { type: 'input', key: 'member', label: '成员' },
        { type: 'datePicker', key: 'time', label: '时间', kind: 'daterange' },
      ]
    })
    // 搜索
    const searchFormHandle = () => submitHandle(() => console.log('可以开始调用接口了'))

    return {
      formRef,
      formData,
      formConfig,
      searchFormHandle
    }
  }
}

</script>
```

## 入参

<p style="background: #E6A23C; color: #fff;">formConfig配置，假设以inputNumber为例，可以配置min和max: { type: 'inputNumber', min: 0, max: 10 }，Form组件的配置目前只有当前场景的配置，查漏补缺</p>

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| formRef | form-ref | VueComponent | - | - |
| formData | 表单数据，与element-form绑定的model一样 | Object | - | - |
| formConfig | 表单展示配置，需要参考Form组件，与element各表单配置相同 | Arrary | - | - |
| formRules | 表单校验规则，具体参考element校验规则 | Object | - | - |

## 出参

<p style="background: #E6A23C; color: #fff;">此处抛出的formData、formConfig、formRules均为响应式数据</p>

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| formData | 表单数据，与element-form绑定的model一样 | Object | - | - |
| formConfig | 表单展示配置，需要参考Form组件，与element各表单配置相同 | Arrary | - | - |
| formRules | 表单校验规则，具体参考element校验规则 | Object | - | - |
| submitHandle | 提交表单 | Function:Promise(callback) | - | - |
| resetHandle | 重置表单&校验(element-form-resetFields方法) | Function | - | - |
| validateField | 部分校验(element-form-validateField方法) | Function(props: array/string) | - | - |
| clearValidate | 清除校验(element-form-validateField方法) | Function(props: array/string) | - | - |
| resetFormConfig | 重置formConfig(重置为初始化传入的配置) | Function | - | - |
| resetFormData | 重置formData(重置为初始化传入formData) | Function | - | - |
| setConfigs | 更新整个formConfig | Function(vals: Arrary) | - | - |
| setConfig | 更新formConfig某项配置的属性状态 | Function(key, attr, value) | - | - |
| getConfig | 获取formConfig某一项 | Function(key) | - | - |
| setFormItem | 为formData某一项赋值 | Function(key, value) | - | - |
| setFormData |设置整个formData | Function(data) | - | - |
| setFormRule | 设置formRules某一项设置校验规则 | Function(key, index, value) | - | - |
| setFormRules | 设置整个formRules | Function(data) | - | - |
| setFormRuleAttr | 设置formRules某一项某个状态 | Function(key, index, attr, value) | - | - |
| loopFormConfig | 遍历loopFormConfig | Function(callback(item)) | - | - |
| loopFormData | 遍历loopFormData | Function(callback(formData, key)) | - | - |




<p style="background: #E6A23C; color: #fff;">submitHandle既可以通过callback执行回调，也可以通过Promise形式调用</p>

```js

// callback
submitHandle(() => console.log('我是回调函数，校验通过则会执行'))
// promise
submitHandle().then(valid => valid && console.log('我是接口调用，校验通过则会执行'))
```

<p style="background: #E6A23C; color: #fff;">resetFormData主要是解决resetHandle无法达到的数据重置效果，通常在表单类数据回显时会对源数据进行操作，导致resetHandle无法达到想要的效果，resetFormData的作用就是解决这个问题</p>


<p style="background: #E6A23C; color: #fff;">setConfig： 假设此时不同情况下要设置某个input的disabled状态</p>

```js

// id为1时disabled为true
setConfig('member', 'disabled', id === 1)
```

<p style="background: #E6A23C; color: #fff;">setFormRule： 通常配置是在配置文件中，而当校验规则需要用到响应式数据formData时，静态的配置文件中无法拿到实时的响应式数据，则需通过setFormRule动态设置校验规则</p>

```js

setFormRule('pass', 1, {
    validator: (rule, value, callback) => {
      const { formData: { pass, rePass } } = formState
      if (creditAmount && orderAmount) {
        if (pass !== rePass) {
          callback(new Error('两次密码不一致'))
          return
        }
      }
      callback()
    },
    trigger: ['blur', 'change']
  }
)
```

<p style="background: #E6A23C; color: #fff;">setFormRuleAttr：动态的设置某一项校验或者不校验时</p>

```js

// id为1时必填，否则非必填
setFormRuleAttr('member', 0, 'required', id === 1)
```

<p style="background: #E6A23C; color: #fff;">loopFormConfig：编辑时全部展示input框，完成展示text</p>

```js

const kinds = { default: 'text', edit: 'input' }
const kind = 'edit'

loopFormConfig(item => { item.type = kinds[kind])
```

<p style="background: #E6A23C; color: #fff;">loopFormData：通常编辑回显时，接口返回的数据非常杂乱，可以通过loopFormData完成数据的回显</p>

```js

loopFormData((formData, key) => {
  if (!data[key]) return
  formData[key] = data[key]
})
```
