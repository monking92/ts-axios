import axios from '../../src'

const CancelToken = axios.CancelToken
let cancel = null

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c
  })
})

cancel()
