import { ICancelerFn } from '../types'

interface ResolvePromise {
  (reason?: string): void
}

export default class CancelToken {
  promise: Promise<string>
  reason?: string
  static source() {
    let cancel
    const token = new CancelToken(function executor(c) {
      cancel = c
    })

    return { token, cancel }
  }

  constructor(executor: (cancel: ICancelerFn) => void) {
    // let resolvePromise: any
    // let resolvePromise: (reason?: string) => void
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>((resolve, reject) => {
      resolvePromise = resolve as ResolvePromise
    })

    executor((message?: string) => {
      if (this.reason) {
        // 防止cancel函数多次调用
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }
}
