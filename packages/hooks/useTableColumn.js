import { ref } from '@vue/composition-api'

/**
 * @param columns 表头
 */

export default ({
  tableColumns = []
}) => {
  const columns = ref(tableColumns)

  // 动态控制表单
  const setColumns = vals => { columns.value = vals }

  return {
    columns,
    setColumns
  }
}
