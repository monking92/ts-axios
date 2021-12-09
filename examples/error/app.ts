import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1',
}).then(res => {
  console.log('1: ', res)
}).catch(e => {
  console.log('catch 1: ', e)
})

axios({
  method: 'get',
  url: '/error/get',
}).then(res => {
  console.log('2: ', res)
}).catch(e => {
  console.log('catch 2: ', e)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get',
  }).then(res => {
    console.log('3: ', res)
  }).catch(e => {
    console.log('catch 3: ', e)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log('4: ', res)
}).catch(e => {
  console.log('catch 4: ', e);
})
