import axios from '../../src'

// 1
const CancelToken1 = axios.CancelToken
const source = CancelToken1.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(thrown) {
  console.log('thrown: ', thrown)
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message)
  } else {
    // handle error
    console.log('handle error')
  }
})

setTimeout(() => {
  source.cancel('solution 1, post, operation canceled by the user')
  
  // const source2 = CancelToken1.source()
  axios.post('/cancel/post', {
    name: 'sun'
  }, {
    cancelToken: source.token
  }).catch(function(thrown) {
    if (axios.isCancel(thrown)) {
      console.log('Request 2 canceled', thrown.message)
    }
  })
}, 500)



// 2
const CancelToken2 = axios.CancelToken
let cancel

axios.get('/cancel/get', {
  cancelToken: new CancelToken2(function executor(c) {
    cancel = c
  })
})

cancel('solution 2, get, operation canceled by the user')
