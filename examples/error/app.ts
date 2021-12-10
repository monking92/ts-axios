import axios, { IAxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1',
}).then(res => {
  console.log('1: ', res)
}).catch((e: IAxiosError) => {
  console.log('catch 1: ', e)
  console.log('catch 1: ', e.message)
  console.log('catch 1: ', e.config)
  console.log('catch 1: ', e.code)
  console.log('catch 1: ', e.request)
  console.log('catch 1: ', e.response)
})

axios({
  method: 'get',
  url: '/error/get',
}).then(res => {
  console.log('2: ', res)
}).catch((e: IAxiosError) => {
  console.log('catch 2: ', e)
  console.log('catch 2: ', e.message)
  console.log('catch 2: ', e.config)
  console.log('catch 2: ', e.code)
  console.log('catch 2: ', e.request)
  console.log('catch 2: ', e.response)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get',
  }).then(res => {
    console.log('3: ', res)
  }).catch((e: IAxiosError) => {
    console.log('catch 3: ', e)
    console.log('catch 3: ', e.message)
    console.log('catch 3: ', e.config)
    console.log('catch 3: ', e.code)
    console.log('catch 3: ', e.request)
    console.log('catch 3: ', e.response)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log('4: ', res)
}).catch((e: IAxiosError) => {
  console.log('catch 4: ', e);
  console.log('catch 4: ', e.message);
  console.log('catch 4: ', e.config);
  console.log('catch 4: ', e.code);
  console.log('catch 4: ', e.request);
  console.log('catch 4: ', e.response);
})
