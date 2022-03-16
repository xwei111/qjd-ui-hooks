// loading 状态
import { ref } from '@vue/composition-api'

export default () => {
  const loading = ref(false)

  // loading切换
  const checkLoading = value => { loading.value = value }

  return {
    loading,
    checkLoading
  }
}
