---
author: 常小伟
create: 2021-11-26
update: 2021-12-21
---

# useModal

<p style="background: #F56C6C; color: #fff;">useMove依赖@vueuse/core，使用该use函数前，确保项目安装了@vueuse/core</p>

<script>
import Move from '@/components/move/index.vue'

export default {
  components: { Move }
}
</script>

<Move />

## 介绍

```useMove```是基于```vueuse```部分```api```实现的，对可移动```Dom```逻辑部分的实现

## 基础使用

可以在```left```、```right```和```top```、```bottom```两组中任选其一作为元素的初始位置

```js

import { ref } from '@vue/composition-api'
import useMove from '@/hooks/useMove'

const target = ref(null)
// 位置
const { right, top } = useMove({ right: 30, top: 90, target })

return { right, top }
```

## 元素不可移出屏幕

若是不想元素移出屏幕，可以传入元素自身的款、高

```js

const { right, top } = useMove({ right: 30, top: 90, target, refWidth: 200, refHeight: 200 });
```

## 入参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|  target   |  可移动元素```ref``` | - | - | - |
|   right   |    元素初始右侧位置(与```left```选其一)   |   Number   |    -         |   -     |
|   left   |    元素初始左侧侧位置(与```right```选其一)   |   Number   |    -         |   -     |
|   bottom   |    元素初始底部位置(与```top```选其一)   |   Number   |    -         |   -     |
|   top   |    元素初始顶部位置(与```bottom```选其一)   |   Number   |    -         |   -     |
|   refWidth   |  元素自身宽度 | - | - | - |
|   refHeight   |  元素自身高度 | - | - | - |


## 出参

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
|   right   |    元素移动中右侧位置  |   Number   |    -         |   -     |
|   left   |    元素移动中左侧侧位置   |   Number   |    -         |   -     |
|   bottom   |    元素移动中底部位置   |   Number   |    -         |   -     |
|   top   |    元素移动中顶部位置   |   Number   |    -         |   -     |