import axios from '../../src/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const uploadInput: HTMLInputElement = document.querySelector('.upload-input')
const downloadBtn = document.querySelector('.download-btn')

uploadInput?.addEventListener('change', (e) => {
  // console.log('uploadInput: ', uploadInput, uploadInput.files)
  const file = uploadInput.files[0]
  const formData = new FormData()
  formData.append('file', file)
  NProgress.start()
  axios({
    url: '/progress/upload/post',
    method: 'post',
    data: formData,
    onUploadProgress: (e) => {
      console.log('onUploadProgress: ', e.loaded / e.total)
      NProgress.set(e.loaded / e.total)
    }
  })
})
