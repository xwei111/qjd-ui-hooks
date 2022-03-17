import cloneDeep from 'lodash/cloneDeep'
import { reactive, toRefs } from '@vue/composition-api'

/**
 * 场景：适用于所有表单类提交包括查询，配合components/qjd/form使用，目前组件仅有开发遇到的场景，缺啥补啥，根据实际场景扩展useForm
 * @param formRef form-ref
 * @param formData 初始化数据
 * @param formConfig 表单配置
 * @param formRules 校验规则
 */

export default ({
  formRef,
  formData,
  formConfig,
  formRules
}) => {
  const state = reactive({
    formData: cloneDeep(formData),
    formConfig: cloneDeep(formConfig),
    formRules: cloneDeep(formRules)
  })
  // 提交表单
  const submitHandle = async (callback = null) => {
    try {
      const { value: { submitHandle: forSubmit } } = formRef
      const valid = await forSubmit()
      valid && callback && callback(state.formData)
      return valid
    } catch (error) {
      console.log(`error: ${error}`)
    }
  }
  // 重置表单
  const resetHandle = () => formRef.value && formRef.value.resetHandle()
  // 校验表单部分字段
  const validateField = val => formRef.value && formRef.value.validateField(val)
  // 清除校验
  const clearValidate = val => formRef.value && formRef.value.clearValidate(val)
  // 查询formConfig-item
  const getConfig = key => state.formConfig.find(item => item.key === key) || null
  // 更新整个formConfig
  const setConfigs = vals => { state.formConfig = cloneDeep(vals) }
  /**
   * @param key formConfig - key
   * @param attr formConfig - 属性
   * @param value 设置的值
   */
  const setConfig = (key, attr, value) => {
    if (!key || !attr) return
    const item = getConfig(key)
    if (!item) return
    item[attr] = value
  }
  // formData单个元素赋值
  const setFormItem = (key, value) => {
    if (!key) return
    state.formData[key] = value
  }
  // formRules单个属性配置变更
  const setFormRuleAttr = (key, index, attr, value) => {
    if (!key || !attr) return
    state.formRules[key][index][attr] = value
  }
  // formRules单个配置变更，针对需要动态设置校验规则 | 校验规则依赖于响应式的form数据
  const setFormRule = (key, index, value) => {
    if (!key) return
    state.formRules[key][index] = value
  }
  // formRules整体配置变更
  const setFormRules = data => { state.formRules = cloneDeep(data) }
  // 遍历formConfig,通过callbac处理数据
  const loopFormConfig = callback => state.formConfig.forEach(item => callback && callback(item))
  // 遍历formData,通过callbac处理数据
  const loopFormData = callback => Object.keys(state.formData).forEach(key => callback && callback(state.formData, key))
  // 重置formData
  const resetFormData = () => { state.formData = cloneDeep(formData) }
  // 重置formConfig
  const resetFormConfig = () => { state.formConfig = cloneDeep(formConfig) }
  // 设置formData
  const setFormData = data => { state.formData = cloneDeep(data) }
  return {
    submitHandle,
    resetHandle,
    validateField,
    clearValidate,
    setConfigs,
    setConfig,
    getConfig,
    setFormItem,
    setFormRuleAttr,
    setFormRule,
    loopFormConfig,
    loopFormData,
    resetFormData,
    setFormData,
    setFormRules,
    resetFormConfig,
    ...toRefs(state),
  }
}
