/*
 * @Description: 浏览器可视区域尺寸
 * @Autor: Thlq
 * @Date: 2021-12-13 19:58:18
 * @LastEditors: Thlq
 * @LastEditTime: 2021-12-14 09:16:12
 */

import { reactive, onUnmounted, toRefs } from '@vue/composition-api'

export default () => {
  const state = reactive({
    clientWidth: document.body.clientWidth,
    clientHeight: document.body.clientHeight
  })

  window.onresize = () => {
    state.clientWidth = document.body.clientWidth
    state.clientHeight = document.body.clientHeight
  }

  onUnmounted(() => {
    window.onresize = null
  })

  return {
    ...toRefs(state)
  }
}
