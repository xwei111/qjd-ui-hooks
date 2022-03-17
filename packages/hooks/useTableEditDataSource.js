import cloneDeep from 'lodash/cloneDeep'
import { uuid, isObject } from '../utils/index'

export default function ({ tableRef, tableState, selectState, columns }) {
  /**
   * @param {Function} normalizeRow 个性化转换函数
   * @param {Boolean} isShift 是否在首位插入，否则从末尾插入
   */
  const addRow = (normalizeRow, insertFirst = false) => {
    let row = {}
    columns.forEach(item => (row[item.key] = undefined))
    row = normalizeRow ? normalizeRow(row) : row
    if (insertFirst) tableState.dataSource.unshift(row)
    else tableState.dataSource.push(row)
  }

  /**
   * @param String primaryKey 用来区分行数据唯一性的属性的名字
   */
  const delSelectedRows = (primaryKey) => {
    selectState.currentSelects.value.forEach(item => {
      const index = tableState.dataSource.findIndex(child => child[primaryKey] === item[primaryKey])
      tableState.dataSource.splice(index, 1)
    })
    selectState.setCurrentSelects([])
    tableRef.value.clearSelection()
  }

  // 单条新增
  const addDataSource = (value, key = '_id', type = 'push') => {
    if (!isObject(value)) return
    value[key] = uuid()
    tableState.dataSource[type](cloneDeep(value))
  }
  // 单条删除
  const deleteDataSource = (value, key = '_id') => {
    const index = tableState.dataSource.findIndex(item => item[key] === value)
    if (!index && index !== 0) return
    tableState.dataSource.splice(index, 1)
  }

  const resetDataSource = newDataSource => { tableState.dataSource = cloneDeep(newDataSource) }

  return {
    addRow,
    delSelectedRows,
    resetDataSource,
    addDataSource,
    deleteDataSource
  }
}
