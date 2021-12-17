import axios from '../../src/index'

axios({
  method: 'post',
  url: '/extend/post',
  data: {
    msg: 'axios'
  }
}).then(res => {
  console.log('axios: ', res)
})

axios.request({
  method: 'post',
  url: '/extend/post',
  data: {
    msg: 'request'
  }
}).then(res => {
  console.log('request: ', res)
})

axios.get('/extend/get').then(res => {
  console.log('get: ', res)
})

axios.delete('/extend/delete').then(res => {
  console.log('delete: ', res)
})

axios.head('/extend/head').then(res => {
  console.log('head: ', res)
})

axios.options('/extend/options').then(res => {
  console.log('options: ', res)
})

axios.post('/extend/post', {
  msg: 'post'
}).then(res => {
  console.log('post: ', res)
})

axios.put('/extend/put', {
  msg: 'put'
}).then(res => {
  console.log('put: ', res)
})

axios.patch('/extend/patch', {
  msg: 'patch'
}).then(res => {
  console.log('patch: ', res)
})
