import { ICancelerFn, ICancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  static source(): ICancelTokenSource {
    let cancel: ICancelerFn
    const token = new CancelToken(function executor(c) {
      cancel = c
    })

    return { token, cancel: cancel! }
  }

  constructor(executor: (cancel: ICancelerFn) => void) {
    // let resolvePromise: any
    // let resolvePromise: (reason?: string) => void
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>((resolve, reject) => {
      resolvePromise = resolve as ResolvePromise
    })

    executor((message?: string) => {
      if (this.reason) {
        // 防止cancel函数多次调用
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
