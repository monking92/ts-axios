import axios from '../src'
import { getAjaxRequest } from './_helpers'

describe('progress', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  test('should add a download progress handler', () => {
    const progressMock = jest.fn()

    axios('/foo', { onDownloadProgress: progressMock })

    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo": "bar"}'
      })
      expect(progressMock).toHaveBeenCalled()
    })
  })

  test('should add a download progress handler', () => {
    const progressMock = jest.fn()

    axios('/foo', { onUploadProgress: progressMock })

    return getAjaxRequest().then(request => {
      // Jasmine AJAX doesn't trigger upload events. Waiting for upstream fix
      // expect(progressMock).toHaveBeenCalled();
    })
  })
})
