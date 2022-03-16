// 显示or隐藏
import { ref } from '@vue/composition-api'

export default () => {
  const isShow = ref(false)

  // 显示隐藏切换
  const checkShow = value => { isShow.value = value }

  return {
    isShow,
    checkShow
  }
}
