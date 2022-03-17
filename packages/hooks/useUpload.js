import { ref } from '@vue/composition-api'
// 静态文件上传(多处用到，抽离作为公共部分)
export default ({
  uploadRef,
  formApis,
  key,
  cName = 'name',
  cKey = 'key',
  otherParams = {},
  callback = null,
  preview
}) => {
  // loading
  const loading = ref(false)
  // 记录上传文件
  const fileLists = ref([])
  // 设置文件参数
  const _setFile = files => {
    if (callback) {
      // 自定义文件处理逻辑
      files = callback(files)
    } else {
      // 通用文件处理逻辑，otherParams：额外参数
      files = (files || []).map(file => {
        const { fileName, key } = file && file.response ? file.response : {}
        return { [cName]: fileName, [cKey]: key, ...otherParams }
      })
    }
    fileLists.value = files
    formApis && formApis.setFormItem(key, files || null)
  }
  // 上传文件前
  const beforeUpload = () => { loading.value = true }
  // 文件改变触发校验
  const onChange = ({ files }) => {
    _setFile(files || [])
  }
  // 移除
  const onRemove = ({ files }) => _setFile(files || [])
  // 错误
  const onError = ({ err }) => {
    loading.value = false
    console.error(`error: ${ err }`)
  }
  // 成功
  const onSuccess = () => {
    loading.value = false
  }
  // 预览
  const onPreview = data => preview && preview(data)
  // 设置文件
  const setFileList = (files) => uploadRef.value && uploadRef.value.setFileList(files)
  // 清空文件
  const clearFiles = () => uploadRef.value && uploadRef.value.clearFiles()

  return {
    loading,
    fileLists,
    onChange,
    onRemove,
    onPreview,
    onError,
    onSuccess,
    beforeUpload,
    setFileList,
    clearFiles
  }
}
