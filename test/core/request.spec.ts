import axios from '../../src'

function getAjaxRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const request = jasmine.Ajax.requests.mostRecent()
      resolve(request)
    })
  })
}

describe('request', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  it('should emit request', () => {
    axios.get('www.baidu.com')

    return getAjaxRequest().then((request) => {
      // expect(request.url).toBe('www.baidu.com')
      console.log('get request: ', request)
    })
  })
})
