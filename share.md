# qjd-ui

统一基础组件，沉淀业务组件，以文档形成统一管理，[项目地址](https://gitlab.qjdchina.com/FE-zhuozhu/qjd-ui.git)

## 组件库来由

1. 统一基础ui样式，形成统一风格&标准化（ui同学需介入）
2. 提升设计及开发效率，降低前期沟通成本
3. 沉淀基础&业务组件，减少高质量组件流失，针对实际场景制定组件
4. 方便组件扩展升级，功能定制
5. 避免第三方库升级对自身的影响，避免第三方问题带来的风险
6. 形成文档，减少对组件内部代码关注，通过文档demo以及暴露出的属性方法使用组件
7. 通过npm安装组件，更好的管理项目&组件
8. 提升组件封装能力

## 目标

友好、美观、易扩展、符合业务场景等等

业务组件是针对特定业务场景抽象出的ui模板，而非掺杂大量业务的组件，如果业务组件可以基于基础组件建议抽离出基础组件

## 提升空间

目前使用的vue2.x搭建的ui库，但技术在不断更新，可提升空间比较大

1. 引入ts
2. markdown模板完善，如提示类、警告类等模板
3. vue2.x升级到3.x
4. 主题支持
5. npm包过大时，可选择组件抽离，独立发布
6. 开发日志完善
7. 开箱即用模板，如```vue-element-admin```等
8. 移动端基础库（hooks + ts）

随着组件、功能增加维护成本也会随着增加

## 目录

```
qjd-ui
├── build
│   ├── md_loader              markdown文件解析
|   |—— lib.config.js          组件打包配置
|   |—— utils.js               工具
├── packages                   基础&业务组件
│   ├── theme-default          组件样式统一编写打包
├── src
│   ├── components             ui展示平台组件
│   │   ├── demo-block.vue     md展示demo模板
│   ├── consts
│   │   ├── slider.js          导航栏路由信息，通过key匹配docs下markdown文件，需手动配置
│   ├── docs                   各个组件文档
│   │   ├── button.md 
│   ├── pages                  ui平台页面
│       ├── test               测试代码
│   ├── router                 路由
│   └── styles                 css
│       ├── md                 markdown样式
│   ├── utils                  ui平台工具
│       ├── getTestRoutes.js   动态匹配测试组件，无需手动配置
```

## 核心内容

### ui库展示平台

* 文档内容通过markdown编写，```markdown-it```将```.md```文件内容解析为vue可识别内容，通过```highlight.js```处理代码高亮，[高亮样式参考](https://github.com/highlightjs/highlight.js/tree/main/src/styles)


通过```highlight.js```处理代码高亮

```js
highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
        try {
            return `<pre class="hljs" v-pre>
                <code>
                    ${hljs.highlight(lang, str, true).value}
                </code>
            </pre>`
        } catch (error) {
            console.log('error:' + error)
        }
    }
    return `<pre class="hljs">
        <code>${md.utils.escapeHtml(str)}</code>
    </pre>`
}
```

通过```markdown-it-container```解析```demo```并通过已写好的插槽（```src/components/deme-block```）插入

```js
render: function(tokens, idx) {
    const token = tokens[idx]
    const info = token.info.replace('demo', '').trim()
    let desc = info ? `<div class="demo_desc" slot="desc" >${info}</div>` : null
    if(token.nesting === 1) {
        return `<demo-block>
            ${desc}
            <div slot="code">
        `
    }
    return '</div></demo-block>\n'
}
```

借助```markdown-it-front-matter```处理```front matter```

```js
use(require('markdown-it-front-matter'), function (fm) {
  const data = fm.split('\n')
  data.forEach((item, index) => data[index] = item.split(':'))
  data.map(item => result += `<span>${kinds[item[0]]}: ${item[1]}</span>`)
});
```

抽离css和js，一个markdown文件仅允许有一个script和style

```js
md.renderer.rules.html_block = (tokens, idx) => {
    const content = tokens[idx].content
    if (scriptRe.test(content.trim())) {
        scriptContent = content;
        return ''
    } if(styleRe.test(content.trim())) {
        styleContent = content;
        return ''
    } else {
        return content
    }
}
```

最终返回可识别的模板

```js
return (
    `<template>\n
        <div class="markdown">${html}</div>\n
    </template>\n
    ${scriptContent}
    ${styleContent}
    `
)
```

### 组件

在```packages```下统一编写组件，```theme-default/src```下编写样式，提供了一个```button```基础组件demo

按需加载需要对各个组件单独打包，我们已经在打包时会动态匹配```packages```下```.vue```组件，所以各个组件都必须建立相应的文件并建立```index.js```组件并暴露出组件，否则会导致按需引入时失败，即使像```ButtonGroup```这样的组件，虽然实现在```button```文件夹下也仍需建立```button-group```文件夹

```js
// 动态匹配各组件
exports.getEntries = () => {
  const componentsContext = requireContext('../packages', true, /\.vue$/, __dirname).keys();
  const defaultCom = { "qjd-ui": "./packages/index.js" }; // 批量打包
  let coms = {}; // 存储各个组件用于独自打包
  componentsContext.forEach(item => {
    const keys = item ? item.split('\\') : [];
    const key = keys[keys.length - 1] ? keys[keys.length - 1].split('.')[0] : '';
    if (key) {
      coms[key] = `./packages/${key}`;
    }
  });
  return { ...defaultCom, ...coms }
}
```

为方便按需引入组件，为每个组价单独注入```install```方法：

```js
// install.js
export default el => el.install = Vue => Vue.component(el.name, el);
// 以button为例
import install from '../utils/install'
install(Button)
```


基于```element-ui```基础组件进行二次封装的组件如果在项目中使用，需在项目中自行安装```element-ui```并引入相应的组件，因为我们在打包时对于第三方工具通常不会进行打包：

```js
externals: {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  },
  'element-ui': 'ELEMENT'
}
```

### 测试

在```src/pages/test```下编写测试代码，建立相应的```.vue```组件即可，路由动态匹配生成，访问路径：```/test/${name}```

## markdown编写解释

* 每个md文件内，允许存在一个script标签和一个style标签
* 每个组件作者等信息采用```yaml```语法，需遵循以下格式

1. 文件的第一行开始
2. 不得缩进

```
---
author: xxx
create: xxxx-xx-xx
update: xxxx-xx-xx
---
```

* 每个demo遵循以下格式（详细解释非必填项）：

````
::: demo 这是一个带loading效果的button(详细解释)
```html

<xw-button type="primary" loading>Loading</xw-button>

```
:::
````

## 打包

### ui展示平台打包

ui展示平台打包结果存放于dist文件夹

```
npm run build
```

### 组件库打包

组件库打包结果存放于lib文件夹

```
npm run build:ui
```

## 发布

  npm publish

## 安装

  npm install qjd-ui --save

## 使用

### CDN引入

```html
<!-- css -->
<link rel="stylesheet" href="https://unpkg.com/qjd-ui/lib/theme-default/index.css">/
<!-- html -->
<div id="app">
  <xw-button>默认按钮</xw-button>
  <xw-button type="primary">主要按钮</xw-button>
  <xw-button type="success">成功按钮</xw-button>
  <xw-button type="info">信息按钮</xw-button>
  <xw-button type="warning">警告按钮</xw-button>
  <xw-button type="error">危险按钮</xw-button>
</div>
<!-- js -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/qjd-ui/lib/qjdui.js"></script>
<script>
  new Vue({
    el: '#app'
  })
</script>
```

### 批量引入

  import qjdui from 'qjd-ui'

  import 'qjd-ui/lib/theme-default/index.css'

  Vue.use(qjdui)


### 按需引入

#### 方式一（需手动引入组件&css）

  import Button from 'qjd-ui/lib/button'

  import 'qjd-ui/lib/theme-default/button.css'

  Vue.component(Button.name, Button)

#### 方式二

```
<!-- 安装babel-plugin-import -->

yarn add babel-plugin-import -D

<!-- 配置babel.config.js -->

{
  "plugins": [
    [
      "import",
      {
        libraryName: 'qjd-ui',
        camel2DashComponentName: false,
        customStyleName: (name) => {
          return `qjd-ui/lib/theme-default/${name}.css`;
        },
      },
    ]
  ]
}

```

  完成上述配置后引入方式如下：

  import { Button, Input } from 'qjd-ui';

  Vue.component(Button.name, Button)

  Vue.component(Input.name, Input)

  或者

  Vue.use(Button)

  Vue.use(Input)



## commit规范

好的```commit```规范可以提升团队开发效率，以```Angular```的```commit```规范为模板制定规范，[Commitizen](https://www.npmjs.com/package/commitizen)可以帮助约束自身提交规范，日志的生成也会依赖```commit```内容

### type类型

|     type    |      描述    |
|-------------|--------------|
|     feat        |    新功能    |
|     fix         |    修复bug    |
|     refactor    |    代码重构    |
|     docs        |    文档    |
|     test        |    测试代码    |
|     pref        |    优化    |
|     chore       |    构建过程或辅助工具的变动  |

### 模块

每次commit涉及的模块

### 描述

每次改动的描述

### 示例

一次完整的```commit```如下：

```
git commit -m 'feat(button): 为button添加disabled效果'
git commit -m 'docs(button): 编写button组件文档'
```

## 版本&日志

使用[standard-version](https://www.npmjs.com/package/standard-version)控制版本&生成日志，```commit```类型为```feat```和```fix```会出现在日志中，分别对应```Features```和```Bug Fixes```模块

* major：主版本
* minor：次版本
* patch：修订版
* npm run release -- 1.0.0：执行该命令, 自定义版本为 1.0.0
* npm run release:100：执行该命令, 如果当前版本是 1.0.0 那么版本将被提升至 2.0.0
* npm run release:010: 执行该命令, 如果当前版本是 1.0.0 那么版本将被提升至 1.1.0
* npm run release:001: 执行该命令, 如果当前版本是 1.0.0 那么版本将被提升至 1.0.1

执行上述命令时，会有三个动作：生成版本、打tag、生成日志，日志存放于```CHANGELOG.md```中，具体效果见日志部分

## 结语

以上是我们组件库目前的大致内容，后续持续优化