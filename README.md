# TypeScript axios

## dependency
[TypeScript library starter](https://github.com/alexjoverm/typescript-library-starter)

## Features

1. Make XMLHttpRequests from the browser
2. Supports the Promise API
3. Intercept request and response
4. Transform request and response data
5. Cancel requests
6. Automatic transforms for JSON data
7. Client side support for protecting against XSRF


## run test
express 运行 demo, webpack作为构建工具

## request
### get 请求参数
- 值为数组
```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})
```
转化为 `base/get?foo[]=bar&foo[]=baz`

- 值为Date
```typescript
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date: new Date()
  }
})
```
转化为 `/base/get?date=2021-11-27T05:55:39.030Z`, date后是`date.toISOString()`结果

- 特殊字符串
url中允许出现不被 encode 的字符 `@` `:` `$` `,` 空格（转化成`+`）` ` `[` `]`

- 空值忽略 `null` `undefined`

- 丢弃url中的哈希标记

- 保留url中已有参数

## response

- `data` 响应数据
- `status` http 状态码
- `statusText` 状态消息
- `headers` 响应头
- `config` 请求配置对象
- `request` XMLHttpRequest 实例
