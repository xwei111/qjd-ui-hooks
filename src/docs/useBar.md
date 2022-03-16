---
author: 常小伟
create: 2021-08-17
update: 2021-08-17
---

# useBar

## 介绍

```useBar```是在```useCharts```基础上对柱状图的封装，以厂服返回的数据为准，无法满足需求时自行扩展

针对当前业务场景对柱状图```option```做简单封装，如下：

```js

/**
 * 场景：适用于目前ui设计通用柱状图（参考赊销总览柱状图），若有差异需额外扩展或另外封装
 * @param xData x轴数据
 * @param dataSource y轴数据
 * @param xDeg x轴倾斜角度，默认为零，为了容错提供配置入口
 * @param grid x、y轴位置，为了容错提供配置入口，bottom默认为8%，demo： { left: '1%', right: '1%' }
 */
export const getBaseBar = ({
  xData = [],
  dataSource = [],
  xDeg = 0,
  grid = {}
} = {}) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      bottom: '8%',
      containLabel: true,
      ...grid,
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#9AA6B8'
        }
      },
      axisLabel: {
        interval: 0,
        rotate: xDeg,
        formatter: (value) => {
          if (value.length > 3) return value.substring(0, 3) + '...'
          return value
        }
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      data: dataSource,
      type: 'bar',
      barWidth: 16,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },
      label: {
        show: true,
        position: 'top',
        color: '#9AA6B8'
      },
      color: ['#3C5DA4']
    }]
  }
}
```


## 基础使用

```js

import useBar from '@/hooks/creditOverView/useBar'
import { getBaseBar } from '@/consts/baseBar'
// id: 元素id选择器，request: 接口， xKey: x轴从接口返回数据中对应的key值，dkey：y轴从接口返回数据中对应的key值，option：chart配置
useBar({
  id: 'sale-chart',
  request,
  xKey: 'xKey',
  dKey: 'yKey',
  option: getBaseBar({ grid: { left: '3%', right: '8%' } })
})

```

## 入参

<p style="background: #E6A23C; color: #fff;">useBar并没有useChart所有参数，如isResize，但以满足当前需求，若无法满足，可自行添加入参</p>

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| id | id选择器 | String | - | - |
| request | 接口请求 | Promise | - | - |
| option | chart配置，默认为getBaseBar返回值 | Object | - | getBaseBar() |
| isInit | 是否初始化chart | Boolean | - | false |
| xKey | x轴从接口返回数据中对应的key值 | String | - | - |
| dKey | y轴从接口返回数据中对应的key值 | String | - | - |
| isXnull | x轴数据是否为空 | Boolean | - | true |

<p style="background: #E6A23C; color: #fff;">当isXnull为false时表示，x轴数据为静态数据，接口获取数据后不会在处理x轴数据</p>

## 出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| loading | 接口loading状态 | Boolean | - | false |

