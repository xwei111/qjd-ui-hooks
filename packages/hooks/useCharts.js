import { onBeforeUnmount, onMounted, ref } from '@vue/composition-api'
import * as echarts from 'echarts/core'
import useTimeout from './useTimeout'

/**
 * 场景：适用于charts(针对项目中的echarts)，若有差异需额外扩展或另外封装
 * @param option charts配置
 * @param id dom-id
 * @param mouseover 鼠标滑过事件
 * @param mouseout 鼠标滑出事件
 * @param isInit 是否初始化调用
 * @param isResize 窗口变化是否允许重画charts
 */

export default ({
  option,
  id,
  mouseover,
  mouseout,
  isInit = true,
  isResize = true
}) => {
  const myChart = ref(null)
  const initOption = ref(option)
  const { perTimeout } = useTimeout()
  // 初始化
  const chartInit = () => {
    const el = document.getElementById(id)
    if (!myChart.value && el) {
      myChart.value = echarts.init(el)
      setOption()
      myChart.value && mouseover && myChart.value.on('mouseover', mouseover)
      myChart.value && mouseout && myChart.value.on('mouseout', mouseout)
    }
  }
  // 重置
  const chartResize = () => {
    myChart.value && myChart.value.resize()
  }
  // 设置series-data
  const setDataSource = (dataSource, index) => {
    const { value: { series } } = initOption
    series[index].data = dataSource
  }
  // 设置xAxis-data，对于动态设置x轴数据的，调用setxData后再调用chartInit方法
  const setxData = (dataSource = []) => {
    const { value: { xAxis } } = initOption
    xAxis.data = dataSource
  }
  // 对整个option赋值
  const setOption = (data = null, notMerge = false) => {
    if (data) initOption.value = data
    myChart.value && myChart.value.setOption(initOption.value, notMerge)
  }
  // window-resize
  const windowResize = () => isResize && perTimeout(chartResize)
  // 清空
  const chartClear = () => {
    myChart.value && myChart.value.off('mouseover')
    myChart.value && myChart.value.off('mouseout')
    myChart.value && myChart.value.clear()
    perTimeout(() => { myChart.value = null })
  }
  // 是否初始化chart
  onMounted(() => isInit && chartInit())
  // 窗口变化重置charts
  window.addEventListener('resize', windowResize)
  // 销毁
  onBeforeUnmount(() => {
    window.removeEventListener('resize', windowResize)
    chartClear()
  })

  return {
    chartInit,
    chartResize,
    chartClear,
    setxData,
    setDataSource,
    setOption,
  }
}
