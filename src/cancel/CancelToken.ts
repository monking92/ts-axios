export default class CancelToken {
  promise: Promise<string>
  constructor(executor: (cancel: (message: string) => void) => void) {
    let resolvePromise: (message?: string) => void
    this.promise = new Promise((resolve, reject) => {
      resolvePromise = resolve
    })

    executor(function(message: string) {
      resolvePromise(message)
    })
  }
}
