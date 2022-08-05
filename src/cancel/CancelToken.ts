export default class CancelToken {
  promise: Promise<string>
  constructor(executor: (message: string) => void) {
    let resolvePromise
    this.promise = new Promise((resolve, reject) => {
      resolvePromise = resolve
    })

    executor(resolvePromise)
  }
}
