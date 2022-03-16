import { reactive, toRefs } from '@vue/composition-api'

export default ({ dataSource, currentTab }) => {
  const state = reactive({ dataSource, currentTab })
  // 切换tabs
  const tabCLick = val => { state.currentTab = val }

  return {
    ...toRefs(state),
    tabCLick
  }
}
