export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const request = jasmine.Ajax.requests.mostRecent()
      resolve(request)
    })
  })
}
