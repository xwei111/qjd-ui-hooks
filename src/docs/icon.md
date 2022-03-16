---
author: 常小伟
create: 2021-04-02
update: 2021-04-02
---

# Icon图标

<script>
    import Clipboard from 'clipboard';
    import iconData from '@/consts/icon'
    import { Message } from 'element-ui';
    export default {
        data() {
            return {
                xw_icons: iconData,
                iconDom: null
            }
        },
        methods: {
            md_copy_handle(name) {
                // this.iconDom =  `<i class="xw-icon-${name}"></i>`
                this.iconDom =  `<qjd-icon :name="'${name}'"></qjd-icon>`
                var clipboard = new Clipboard('#md_copy_list')
                clipboard.on('success', (e)=>{
                    Message.success(`复制成功: ${e.text}`)
                    clipboard.destroy()
                })
                clipboard.on('error', (error)=>{
                    Message.error(`复制失败: ${error}`)
                    clipboard.destroy()
                })
            }
        }
    }
</script>

---

## 介绍

语义化矢量图标（iconfont）

## 使用方法

通过设置属性```name```或```class```即可

<div class="demo_block">
    <qjd-icon class="bg_icon" :name="'accessory'"></qjd-icon>
    <qjd-icon class="bg_icon" :name="'activity'"></qjd-icon>
    <qjd-icon class="bg_icon" :name="'add'"></qjd-icon>
    <qjd-icon class="bg_icon" :name="'businesscard'"></qjd-icon>
    <i class="xw-icon-loading bg_icon"></i>
    <i class="xw-icon-addpeople_fill bg_icon"></i>
</div>

:::demo
```html

<qjd-icon :name="'accessory'"></qjd-icon>
<qjd-icon :name="'activity'"></qjd-icon>
<qjd-icon :name="'add'"></qjd-icon>
<qjd-icon :name="'businesscard'"></qjd-icon>
<i class="xw-icon-loading"></i>
<i class="xw-icon-addpeople_fill"></i>
```
:::

## 图标集合

<ul class="icon_list">
    <li id="md_copy_list" v-for="name in xw_icons" :key="name" @click="md_copy_handle(name)" :data-clipboard-text="iconDom">
        <qjd-icon :class="'xw-icon-' + name"></qjd-icon>
        <span>{{'xw-icon-' + name}}</span>
    </li>
</ul>

