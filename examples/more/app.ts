import axios from '../../src/index'

document.cookie = 'foo=bar'

// credentials
axios({
  url: '/more/credentials',
  method: 'get',
})

axios({
  url: 'http://localhost:7001/more/credentials',
  method: 'post',
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
    'custome-header': 'sun'
  },
  data: {
    method: 'post',
    cors: true
  }
})

axios({
  url: 'http://localhost:7001/more/credentials',
  method: 'get',
  withCredentials: true
})


// xsrf/csrf
axios({
  url: '/more/xsrf',
  method: 'post',
  xsrfCookieName: 'xsrf-sun',
  xsrfHeaderName: 'x-xsrf-sun'
})
