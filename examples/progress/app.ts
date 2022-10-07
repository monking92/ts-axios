import axios from '../../src/index'

axios({
  url: '/progress/download',
  method: 'get',
  onDownloadProgress: (e) => {}
})
