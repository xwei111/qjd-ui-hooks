---
author: 陈思雨
create: 2021-11-18
update: 2021-11-18
---

# 路由工具函数

## 获取路由扁平化信息

```js

import { getRoutesInfo } from '@/utils/qjd/router'
const routerInfos = getRoutesInfo(routes) // routes为路由配置，routerInfos包含全路径等信息
```

## 重定向

```js

import { redirectHandle } from '@/utils/qjd/redirect'
redirectHandle(path) // path表示全路径
```


