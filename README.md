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


## XMLHttpRequest

### http method
- `HEAD` 请求资源头部信息，并且这些头部信息与 HTTP `GET` 方法请求时返回的一致。（该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载，以此可以节约带宽资源）
- `OPTIONS` 用于获取目的资源所支持的通信选项。（`CORS`中可以使用`OPTIONS`方法发起一个预检请求）
  可以使用`OPTIONS`方法对服务器发起请求，以检测服务器支持哪些HTTP方法：
  ```
  curl -X OPTIONS http://localhost:8081/more/credentials -i
  ```

### cors(域 协议 端口)
跨源域资源共享（CORS）机制允许 Web 应用服务器进行跨源访问控制，从而使跨源数据传输得以安全进行

对可能对服务器数据产生副作用的HTTP请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型 的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request）

#### 1.场景
- `XMLHttpRequest`或`Fetch APIS`发起的跨源HTTP请求
- Web 字体 (CSS 中通过 @font-face 使用跨源字体资源)
- WebGL贴图
- 使用`drawImage`将Images/Video画面绘制到canvas
- 来自图像的css图形

#### 简单请求与预检请求
1. 简单请求。不会触发CORS预检请求的请求。满足以下条件
    - 使用下列方法之一
        - GET
        - HEAD
        - POST
    - `Content-Type` 为`text/plain` `multipart/form-data` `application/x-www-form-urlencoded`
    - 自定义请求头

2. 预检请求（OPTIONS）

## implementation
### run test
express 运行 demo, webpack作为构建工具

### request
#### get 请求参数
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
*url中允许出现不被 encode 的字符 `@` `:` `$` `,` `空格（转化成+）` `[` `]`*

- 空值忽略 `null` `undefined`

- 丢弃url中的哈希标记

- 保留url中已有参数

> `encodeURI`: 不会编码 `ASCII字母` `数字` `~` `!` `@` `#` `$` `&` `*` `(` `)` `=` `:` `/` `,` `;` `?` `+` `'`

> `encodeURIComponent`: 不会编码 `ASCII字母` `数字` `~` `!` `*` `(` `)` `'`

#### 请求 body 数据
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

#### 请求 header
- 请求data 转换为JSON字符串时，需要给`headers`设置正确的 `Content-Type`(`"content-type": "application/json;charset=utf-8"`)

`XMLHttpRequest.setRequestHeader()`设置HTTP请求头。该方法必须在`open()`方法和`send()`之间调用

---

### response
#### axios返回promise对象，可以取到：
- `data` 响应数据
- `status` http 状态码
- `statusText` 状态消息
- `headers` 响应头
- `config` 请求配置对象
- `request` XMLHttpRequest 实例

#### `XMLHttpRequest.responseType` 是一个枚举字符串值，用于指定响应中包含的数据类型
> 它还允许更改响应类型。如果将`responseType`设为空字符串，则会使用`text`作为默认值
> 有如下值：
  - `''` 空字符串与默认类型`text`相同
  - `arrayBuffer` *包含二进制数据的 JavaScript `ArrayBuffer`*
  - `blob` *包含二进制数据的 `Blob` 对象*
  - `document` *是一个 `HTML Document` 或 `XML XMLDocument`，根据接收到的数据的`MIME`类型而定*
  - `json`
  - `text` *`DOMString`对象中的文本*

> responseType 应确保服务器发送的相应与该格式兼容，否则`response`的值将为`null` 在`open()`与`send()`之间调用

#### `onreadystatechange`
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

#### 响应`header`
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


### 异常处理
- 请求错误时（网络错误）触发 `error`事件
- 超时错误 `timeout` 事件
- 非200状态码

#### `AxiosError` 类
- `message` 错误文本信息
- `config` 请求对象配置
- `code` 错误代码
- `request` `XMLHttpRequest`对象实例
- `response` 响应对象


### 接口扩展

- `axios.request(config)`
- `axios.get(url[, config])`
- `axios.delete(url[, config])`
- `axios.head(url[, config])`
- `axios.options(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[, config]])`

#### `axios`混合对象

#### `axios(url, config)` `axios(config)` 重载

#### `response.data` 支持泛型


### `Promise`实现链式拦截器
```mermaid
graph LR
 ... --> 1[request interceptor 2] --> 2[request interceptor 1] --> 3[dispatch request] --> 4[response interceptor 1] --> 5[response interceptor 2] --> 6[...]
```

`axios.interceptors.request.use`
`axios.interceptors.response.use`


### 策略模式合并配置

#### 默认配置

#### 配置合并策略

#### axios.create


### cancelToken 取消请求

#### 取消请求方案
1. 方案1 `CancelToken.source`
```typescript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

2. 方案2 `CancelToken` constructor
```typescript
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
```

#### `isCancel`

#### `throwIfRequested`
同一个 CancelToken 的请求，cancel将取消所有请求（不发送请求）


### `withCredentials`
indicates whether or not cross-site Access-Control requests should be made using credentials


## flow
