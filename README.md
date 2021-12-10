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

### 请求 body 数据
- 请求`body`为`Object`则转化为`JSON`字符串
```typescript
const xhr = new XMLHttpRequest()
// 初始化一个请求
// param: method, url, async, user, password
xhr.open(mehtod, url, true)
// 发送请求 异步（默认）-则请求发送后立即返回 同步-则收到响应后才返回
// GET HEAD请求 则应将参数设置为 null
// data 类型：
// 1. `Document` 发送前被序列化
// 2. `XMLHttpRequestBodyInit` 可以是 `Blob` `BufferSource` `FormData` `URLSearchParams` `USVString`(js 中映射`String`)
// 3. `null`
// body 
xhr.send(body)
```

### 请求 header
- 请求data 转换为JSON字符串时，需要给`headers`设置正确的 `Content-Type`(`"content-type": "application/json;charset=utf-8"`)

`XMLHttpRequest.setRequestHeader()`设置HTTP请求头。该方法必须在`open()`方法和`send()`之间调用



## response

### axios返回promise对象，可以取到：
- `data` 响应数据
- `status` http 状态码
- `statusText` 状态消息
- `headers` 响应头
- `config` 请求配置对象
- `request` XMLHttpRequest 实例

### `XMLHttpRequest.responseType` 是一个枚举字符串值，用于指定响应中包含的数据类型
> 它还允许更改响应类型。如果将`responseType`设为空字符串，则会使用`text`作为默认值
> 有如下值：
  - `''` 空字符串与默认类型`text`相同
  - `arrayBuffer`
  - `blob`
  - `document`
  - `json`
  - `text`

> responseType 应确保服务器发送的相应与该格式兼容，否则`response`的值将为`null` 在`open()`与`send()`之间调用

### `onreadystatechange`
`readyState` 属性发生变化时调用

| 值 | 状态             | 描述 |
|----| ----             | ---- |
| 0  | UNSENT           | 代理被创建 但未调用 `open()` |
| 1  | OPENED           | `open()`  已被调用 |
| 2  | HEADERS_RECEIVED | `send()` 方法已被调用 并且头和状态已返回 |
| 3  | LOADING          | 下载中 `responseText` 属性已经包含部分数据
| 4  | DONE             | 下载完成

> - `response` 返回相应正文
> - `responseText` 返回文本（`responseType`为`''`或`'text'`）

### 响应`header`
`XMLHttpRequest`对象的`getAllResponseHeaders()` 获取到的响应头：
```typescript
"connection: keep-alive\r\n
content-length: 25\r\n
content-type: application/json; charset=utf-8\r\n
date: Fri, 03 Dec 2021 08:34:02 GMT\r\n
etag: W/"19-WTXIhIvrWO31QsV2ttBqR48ejcA"\r\n
x-powered-by: Express\r\n
"
```
解析成对象


## 异常处理
- 请求错误时（网络错误）触发 `error`事件
- 超时错误 `timeout` 事件
- 非200状态码

### `AxiosError` 类
- `message` 错误文本信息
- `config` 请求对象配置
- `code` 错误代码
- `request` `XMLHttpRequest`对象实例
- `response` 响应对象
