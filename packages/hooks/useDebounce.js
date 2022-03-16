import useTimeout from './useTimeout'

/**
 * 场景：防抖函数
 * @param fn 执行主函数
 * @param wait 防抖时间
 */

export default () => {
  const { perTimeout, timer } = useTimeout()
  // 主动取消定时器
  const cancel = () => {
    if (!timer.value) return
    clearTimeout(timer.value)
    timer.value = null
  }

  const run = (fn, wait = 300) => {
    cancel()
    if (!timer.value) timer.value = perTimeout(() => fn && fn(), wait)
  }

  return {
    run,
    cancel
  }
}
