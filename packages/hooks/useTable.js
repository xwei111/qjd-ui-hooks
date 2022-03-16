import cloneDeep from 'lodash/cloneDeep'
import { onUnmounted, reactive, ref, toRefs } from '@vue/composition-api'
import useAsync from './useAsync'
// checkbox-逻辑
import useTableCheckBox from './useTableCheckBox'
// 动态表头-逻辑
import useTableColumn from './useTableColumn'
// 编辑table-逻辑
import useTableEdit from './useTableEdit'
// 编辑dataSource-逻辑
import useTableEditDataSource from './useTableEditDataSource'

/** 适用于通用table & page使用，配合components/qjd/table、pagination使用，目前组件仅有开发遇到的场景，缺啥补啥，根据实际场景扩展useTbale
 * @param tableRef 非必传，主要用于useTableEditDataSource提供清除选中的功能
 * @param request 接口或Array<any>
 * @param defaultParams 默认入参
 * @param isInit 是否初始化调用
 * @param isPage 是否有分页
 * @param checkbox 是否开启多选模式，混入多选逻辑
 * @param edit 是否开启编辑模式，混入编辑逻辑
 * @param editDataSource 是否开启编辑dataSource模式，混入编辑逻辑
 * @function callback 若接口返回数据不满足需求提供callback容错机制
 * @param columns 为动态表头时需传入，后续使用useTable表头，若表头为静态不需要传入
 * @param isActiveColumn 是否开启动态表单模式
 */

const defaultCallBack = (data = {}) => {
  const { totalCount = 0, pagedRecords = [] } = data || {}
  return {
    totalCount,
    dataSource: pagedRecords || []
  }
}

function useTable({
  tableRef,
  request,
  defaultParams = {},
  isInit = true,
  isPage = true,
  checkbox = false,
  edit = false,
  editDataSource = false,
  callback = defaultCallBack,
  columns = [],
  isActiveColumn = false
}) {
  const c = defaultParams && defaultParams.current ? defaultParams.current : 1
  const p = defaultParams && defaultParams.pageSize ? defaultParams.pageSize : 10

  const current = ref(c)
  const pageSize = ref(p)
  // 存储防抖函数
  const timer = ref(null)

  const state = reactive({
    params: isPage ? Object.assign({ pageNo: current, pageSize: pageSize }, defaultParams) : defaultParams,
    searchInfo: {},
    dataSource: [],
    pagination: {
      current: current,
      pageSize: pageSize,
      total: 0,
      onChange: (page, pageSize) => pageChange(page, pageSize),
      onShowSizeChange: (current, size) => showSizeChange(current, size)
    }
  })

  // ----------------------------------------- 是否插入动态表头逻辑  start ----------------------------------------------
  const {
    columns: tableColumns,
    setColumns,
  } = isActiveColumn ? useTableColumn({ tableColumns: cloneDeep(columns) }) : {}
  // 动态column出参
  const activeColParams = {
    columns: tableColumns,
    setColumns
  }
  // ----------------------------------------- 是否插入动态表头逻辑  end   ----------------------------------------------

  // ----------------------------------------- 是否插入checkbox多选逻辑  start ----------------------------------------------
  const {
    currentSelects,
    setCurrentSelects
  } = checkbox ? useTableCheckBox() : {}
  // element-table 勾选多选框触发
  const selectionChange = vals => {
    checkbox && setCurrentSelects(vals)
    // eslint-disable-next-line
    !checkbox && console.warn('未开启多选模式')
  }
  // checkbox相关出参
  const checkBoxParams = checkbox ? {
    currentSelects,
    setCurrentSelects,
    selectionChange
  } : { selectionChange }
  // ----------------------------------------- 是否插入checkbox多选逻辑 end   ----------------------------------------------

  // ----------------------------------------- 是否插入可编辑table逻辑 start ----------------------------------------------
  const {
    editDatas,
    clearEdits,
    setEditHandle,
    setEditDataSource,
  } = edit ? useTableEdit() : {}
  // 编辑触发
  const setEditChange = dataSource => {
    if (setEditHandle) {
      setEditHandle(dataSource, current.value)
    } else {
      // eslint-disable-next-line
      console.warn('未开启可编辑模式')
    }
  }
  // 可编辑table相关出参
  const editParams = edit ? {
    editDatas,
    clearEdits,
    setEditChange
  } : { setEditChange }
  // ----------------------------------------- 是否插入可编辑table逻辑 end   ----------------------------------------------

  // ----------------------------------------- 是否插入可编辑table.dataSource逻辑 start ----------------------------------------------
  const editDataSourceParams = editDataSource ? useTableEditDataSource({
    tableRef,
    tableState: state,
    selectState: { currentSelects, setCurrentSelects },
    columns,
  }) : {}
  // ----------------------------------------- 是否插入可编辑table.dataSource逻辑 end ----------------------------------------------

  // 成功回调
  const successCallBack = ({ code, data }) => {
    if (code === '0') {
      // callback回调处理数据
      const result = callback ? callback(data) : data
      const { totalCount = 0, dataSource = [] } = result || {}
      state.pagination.total = totalCount || (dataSource ? dataSource.length : 0)
      state.dataSource = dataSource
      // 编辑模式下的数据回显
      edit && setEditDataSource(state.dataSource, current.value)
    }
  }
  // 接口
  const { doResult, loading } = useAsync({
    request,
    init: false,
    params: {},
    successCallBack
  })
  // api请求或json
  const _request = (params = {}) => {
    if (Object.prototype.toString.call(request) === '[object Array]') { // 使用定义时传入的json数据
      state.dataSource = request
      state.pagination.total = request.length
    } else if (Object.prototype.toString.call(request) === '[object Function]') { // 使用定义时传入的API请求
      doResult({ ...state.params, ...params })
    }
  }
  // 查询
  const searchHandle = (searchInfo = {}) => {
    // 拷贝数据，防止影响上层数据
    searchInfo = JSON.parse(JSON.stringify(searchInfo))
    current.value = c
    pageSize.value = p
    state.pagination.current = searchInfo.pageNo ? searchInfo.pageNo : c
    state.pagination.pageSize = searchInfo.pageSize ? searchInfo.pageSize : p
    state.searchInfo = searchInfo
    _request(searchInfo)
  }
  // 切换条数时，若当前页不为第一页且切换后数据只有一页showSizeChange触发后会触发pageChange，添加防抖
  const _deferRequest = () => {
    timer.value && clearTimeout(timer.value)
    timer.value = window.setTimeout(() => {
      _request(state.searchInfo)
    }, 0)
  }
  // 切换页数
  const pageChange = (page, pageSize) => {
    current.value = page
    state.searchInfo.pageNo = page
    _deferRequest()
  }
  // 切换条数
  const showSizeChange = (current, size) => {
    pageSize.value = current
    state.searchInfo.pageSize = current
    _deferRequest()
  }
  // 重置
  const resetHandle = (searchInfo = {}) => {
    state.searchInfo = searchInfo
    current.value = c
    pageSize.value = p
    _request(searchInfo)
  }
  // 清空数据
  const clearHandle = () => {
    state.dataSource = []
    current.value = c
    pageSize.value = p
  }
  // 清空默认参数
  const clearDefaultParams = () => { state.params = isPage ? Object.assign({ pageNo: current, pageSize: pageSize }, {}) : {} }
  // 初始化数据
  isInit && _request(state.params)
  // 清除定时器
  onUnmounted(() => {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
  })

  return {
    ...toRefs(state),
    loading,
    searchHandle,
    resetHandle,
    clearHandle,
    clearDefaultParams,
    // checkbox多选相关状态 & 接口
    ...checkBoxParams,
    // 可编辑table相关状态 & 接口
    ...editParams,
    // 可编辑table dataSource相关状态 & 接口
    ...editDataSourceParams,
    // 动态表头相关状态 & 接口
    ...activeColParams,
  }
}

export default useTable
