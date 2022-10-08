import axios from '../../src/index'

const uploadInput: HTMLInputElement = document.querySelector('.upload-input')
const downloadBtn = document.querySelector('.download-btn')

uploadInput?.addEventListener('change', (e) => {
  // console.log('uploadInput: ', uploadInput, uploadInput.files)
  const file = uploadInput.files[0]
  const formData = new FormData()
  formData.append('file', file)
  axios({
    url: '/progress/upload/post',
    method: 'post',
    data: formData,
    onUploadProgress: (e) => {
      console.log('onUploadProgress: ', e)
    }
  })
})
