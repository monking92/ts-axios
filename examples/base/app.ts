import axios from '../../src/index'

// 1.get请求参数

// ?foo[]=bar&foo[]=baz
// res: foo: ["bar", "baz"]
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

// ?foo=%7B%22bar%22:%22baz%22%7D
// res: {"foo":"{\"bar\":\"baz\"}"}
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// ?date=2021-06-09T20:46:55
const date = new Date()
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})


// 2.请求body数据

axios({
  method: 'post',
  url: '/base/post',
  data: {
    foo: 'bar',
    bar: 'baz'
  }
})

axios({
  method: 'post',
  url: '/base/buffer',
  data: new Int32Array([99990, 92])
})


// 3.请求header

axios({
  method: 'post',
  url: '/base/post',
  data: {
    foo: 'bar',
    bar: 'baz'
  }
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  },
  data: {
    foo: 'bar',
    bar: 'baz'
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)
axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})
