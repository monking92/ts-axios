import axios from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['foo'] = 111
axios.defaults.headers.post['bar'] = 222

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({ a: 1 }),
  headers: {
    baz: 333
  }
}).then(res => {
  console.log('res: ', res)
})

// transformRequest
axios({
  url: '/config/post',
  method: 'post',
  data: { a: 1 },
  transformRequest: [
    function(data) {
      data.b = 2
      return { c: 3 }
    },
  ].concat(axios.defaults.transformRequest),
  transformResponse: [].concat(axios.defaults.transformResponse,
    function(data) {
      if (data && typeof data === 'object') {
        data.d = 4
      }

      return data
    }
  )
  // ].concat(axios.defaults.transformResponse),
}).then(res => {
  console.log('res: ', res)
})
