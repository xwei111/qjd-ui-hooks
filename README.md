# qjd-ui-hooks

统一基础组件，沉淀业务组件，以文档形成统一管理

## 安装

npm install qjd-ui-hooks --save

## CDN引入

```html
<!-- css -->
<link rel="stylesheet" href="https://unpkg.com/qjd-ui-hooks/lib/theme-default/index.css">/
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
<script src="https://unpkg.com/qjd-ui-hooks/lib/qjdui.js"></script>
<script>
  new Vue({
    el: '#app'
  })
</script>
```

## 批量引入

  import qjdui from 'qjd-ui-hooks'

  import 'qjd-ui-hooks/lib/theme-default/index.css'

  Vue.use(qjdui)


## 按需引入

### 方式一（需手动引入组件&css）

  import Button from 'qjd-ui-hooks/lib/button'

  import 'qjd-ui-hooks/lib/theme-default/button.css'

  Vue.component(Button.name, Button)

### 方式二

```
<!-- 安装babel-plugin-import -->

yarn add babel-plugin-import -D

<!-- 配置babel.config.js -->

{
  "plugins": [
    [
      "import",
      {
        libraryName: 'qjd-ui-hooks',
        customStyleName: (name) => {
          return `qjd-ui-hooks/lib/theme-default/${name}.css`;
        },
      },
    ]
  ]
}

```

  完成上述配置后引入方式如下：

  import { Button, Input } from 'qjd-ui-hooks';

  Vue.component(Button.name, Button)

  Vue.component(Input.name, Input)

  或者

  Vue.use(Button)

  Vue.use(Input)
