---
author: 常小伟
create: 2021-11-17
update: 2021-11-17
---

# 埋点工具函数

## 动态埋点

```js

import { weblogsDom } from '@/utils/qjd/weblogs'
weblogsDom('target') // target埋点目标(中文)
```

## 存储用户信息

```js

import { weblogsUser } from '@/utils/qjd/weblogs'
weblogsUser({ memberId, companyId, userName, companyName })
```

