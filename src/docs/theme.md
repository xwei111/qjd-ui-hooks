---
author: 常小伟
create: 2021-04-01
update: 2021-04-02
---

<script>
  export default {
    data() {
      return {
        isCache: false,
        themeText: "开启缓存",
        themeSwitchVal: true
      }
    },
    created() {
      const colorPicker = localStorage.getItem("colorPicker");
      this.themeText = colorPicker ? "关闭缓存" : "开启缓存"
      this.isCache = colorPicker ? true : false
    },
    methods: {
      changeCacheHandle() {
        const colorPicker = localStorage.getItem("colorPicker");
        colorPicker && this.$refs.theme.clearCache()
        this.themeText = this.themeText == "关闭缓存" ? "开启缓存" : "关闭缓存"
        this.isCache = !this.isCache
      }
    }
  }
</script>

# 主题切换

## 介绍

动态、快速切换```element-ui```主题，使用时可以通过定位或```visible```隐藏，主题切换是通过匹配当前版本```element-ui```的```lib/theme-chalk/index.css```，将默认主题系列色替换为传入的```defaultColor```系列色，后生成```<style id="chalk-style"></style>```覆盖默认的```element-ui```原有的样式

## 默认主题

通过```defaultColor```设置默认主题

## 不同尺寸

<div class="demo_block">
  <qjd-theme :defaultColor="'#000000'"></qjd-theme>
  <qjd-theme :size="'medium'" :defaultColor="'#000000'"></qjd-theme>
  <qjd-theme :size="'small'" :defaultColor="'#000000'"></qjd-theme>
  <qjd-theme :size="'mini'" :defaultColor="'#000000'"></qjd-theme>
</div>

:::demo
```html

<qjd-theme :size="'medium'" :defaultColor="'#000000'"></qjd-theme>
<qjd-theme :size="'small'" :defaultColor="'#000000'"></qjd-theme>
<qjd-theme :size="'mini'" :defaultColor="'#000000'"></qjd-theme>
```
:::

## 启用缓存

开启缓存是会在```localStorage```中存储一个```colorPicker```，主题颜色的优先级```localStorage.getItem("colorPicker") > defaultColor > 默认主题色```

<div class="demo_block" style="display: flex; align-items: center;">
  <qjd-theme :defaultColor="'#000000'" :isCache="isCache" ref="theme"></qjd-theme>
  <el-button type="primary" @click="changeCacheHandle" style="margin-left: 20px">{{themeText}}</el-button>
  <el-radio style="margin-left: 20px">radio</el-radio>
  <el-switch v-model="themeSwitchVal" style="margin-left: 20px"></el-switch>
</div>

:::demo
```html

<qjd-theme :defaultColor="'#000000'" :isCache="isCache" ref="theme"></qjd-theme>
<el-button type="primary" @click="changeCacheHandle" style="margin-left: 20px">{{themeText}}</el-button>
<el-radio style="margin-left: 20px">radio</el-radio>
<el-switch v-model="themeSwitchVal" style="margin-left: 20px"></el-switch>

<script>
  export default {
    data() {
      return {
        isCache: false,
        themeText: "开启缓存",
        themeSwitchVal: true
      }
    },
    created() {
      const colorPicker = localStorage.getItem("colorPicker");
      this.themeText = colorPicker ? "关闭缓存" : "开启缓存"
      this.isCache = colorPicker ? true : false
    },
    methods: {
      changeCacheHandle() {
        const colorPicker = localStorage.getItem("colorPicker");
        colorPicker && this.$refs.theme.clearCache()
        this.themeText = this.themeText == "关闭缓存" ? "开启缓存" : "关闭缓存"
        this.isCache = !this.isCache
      }
    }
  }
</script>
```
:::

## 更改加载资源

默认获取```element-ui```当前版本的```CDN```地址资源，若遇到网络问题可下载对应版本的```css```至本地，传入相应```url```


```js

const version = require("element-ui/package.json").version; // 版本号
const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
```

## 通过js更改

```js

// main.js
import Eltheme from 'qjd-ui-hooks/lib/packages/utils/theme'
const eltheme = new Eltheme(url ? url : null)
eltheme.setTheme('#0ff0f0')
```

## Attributes

| 参数        | 说明         | 类型        | 可选值        | 默认值  |
|-------------|--------------|-------------|--------------|---------|
| defaultColor | 默认主题 | String | - | - |
| size | 尺寸大小 | String | medium、small、mini | - |
| isCache | 是否开启缓存 | Boolean | - | false |
| url | 加载资源地址 | String | - | https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css |



## Methods
| 方法名        | 说明         | 参数     |
|---------------|--------------|---------|
| clearCache | 清除缓存 | - |