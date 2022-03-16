---
author: 陈思雨
create: 2021-11-16
update: 2021-11-16
---

# 通用工具函数

## 深拷贝

```js

import { deepCopy } from '@/utils/qjd'
deepCopy(data)
```

## 保留两位小数

```js

import { percent2 } from '@/utils/qjd'
percent2(100) // 100.00
```

## 大写转下划线

```js

import { uppertoline } from '@/utils/qjd'
uppertoline('testCom') // test_com
```

## 获取随机id

```js

import { uuid } from '@/utils/qjd'
uuid()
```

## 获取年月日

```js

import { getDate } from '@/utils/qjd'
getDate('2021-10-10 10:10:10') // 2021-10-10
```

## 获取el-scorllbar滚动容器

```js

import { getWraper } from '@/utils/qjd'
getWraper(parentId) // parentId默认为null，获取内容区滚动容器
```

## 内容区滚动

```js

import { scrollHandle } from '@/utils/qjd'
scrollHandle(parentId, top = 0) // parentId默认为null，默认内容区滚动到0的位置
```



