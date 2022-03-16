import { ref } from '@vue/composition-api'
import useLoading from './useLoading'

/**
 * 场景：适用于接口调用或promise，hooks已封装的无需使用useAsync
 * @param request 接口请求
 * @param params 默认入参
 * @param init 是否初始化调用
 * @param isLoading 是否提供loading状态，不需要需将isLoading设置为false，否则loading状态将会保存在内存中，多次调用useAsync且loading状态共用一个时设置为false，使用外部loading状态
 * @param preCallback 前置回调
 * @param callback 获取数据后的数据处理回调
 * @param successCallBack 成功回调
 * @param errorCallBack 错误回调
 * @param isArray 接口入参是否为数组，默认为false
 */

const defaultCallBack = (res = {}) => {
  if (!res) return {}
  const { data: { code, data, message } } = res || {}
  return {
    code,
    data,
    message
  }
}

export default ({
  request,
  params = {},
  init = true,
  isLoading = true,
  preCallback = null,
  callback = defaultCallBack,
  successCallBack = null,
  errorCallBack = null,
  isArray = false
}) => {
  // 记录结果
  const result = ref(null)
  // 是否开启默认loading
  const {
    loading,
    checkLoading
  } = isLoading ? useLoading() : {}

  const doResult = async (searchParams) => {
    try {
      if (!request) return
      // 默认loading处理
      checkLoading && checkLoading(true)
      // 前置回调
      preCallback && preCallback()
      const res = isArray ? await request(searchParams) : await request({...params, ...searchParams})
      // 默认loading处理
      checkLoading && checkLoading(false)
      // 获取接口结果处理
      const data = callback ? callback(res) : res
      // 存储处理接口，以便外部获取
      result.value = data?.data ?? null
      // 成功回调
      const searchs = isArray ? { searchParams } : { ...searchParams }
      successCallBack && successCallBack(data ? { ...data, params: { ...params, ...searchs } } : {})
      return data ? { ...data, params: { ...params, ...searchs } } : {}
    } catch (error) {
      // 默认loading处理
      checkLoading && checkLoading(false)
      // 错误回调
      errorCallBack && errorCallBack()
      console.error(`error: ${error}, request: ${request}`)
    }
  }

  init && doResult(params)

  return isLoading ? {
    loading,
    result,
    doResult
  } : {
    result,
    doResult
  }
}
