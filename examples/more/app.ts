import axios from '../../src/index'

document.cookie = 'foo=bar'

axios({
  url: '/more/credentials/post',
  method: 'post',
})

axios({
  url: 'http://localhost:7001/more/credentials/post',
  method: 'post',
})
