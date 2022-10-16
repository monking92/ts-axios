import axios from '../../src/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const uploadInput: HTMLInputElement = document.querySelector('.upload-input')
const downloadBtn = document.querySelector('.download-btn')

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  NProgress.start()
  config.onUploadProgress = function(e) {
    NProgress.set(Math.floor(e.loaded / e.total))
  }
  return config
})

axiosInstance.interceptors.response.use((response) => {
  NProgress.done()
  return response
}, (err) => {
  NProgress.done()
  return Promise.reject(err)
})

uploadInput?.addEventListener('change', (e) => {
  const file = uploadInput.files[0]
  const formData = new FormData()
  formData.append('file', file)
  axiosInstance.post('/progress/upload/post', formData).then(res => {
    console.log('res: ', res)
  })
})

downloadBtn.addEventListener('click', (e) => {
  axiosInstance.get('https://g-search3.alicdn.com/img/bao/uploaded/i4/i1/1124960044/O1CN01uUGqQt1CCCCdpu7Vb_!!0-item_pic.jpg')
})
