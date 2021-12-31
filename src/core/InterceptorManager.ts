import { IAxiosInterceptorManager, IFulfilledFn, IRejectedFn } from '../types'

interface IInterceptor<T> {
  fulfilled: IFulfilledFn<T>,
  rejected?: IRejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: (IInterceptor<T> | null)[]

  constructor() {
    this.interceptors = []
  }

  use(fulfilled: IFulfilledFn<T>, rejected?: IRejectedFn): number {
    this.interceptors.push({
      fulfilled,
      rejected
    })

    return this.interceptors.length - 1
  }

  eject(interceptorId: number): void {
    if (this.interceptors[interceptorId]) {
      this.interceptors[interceptorId] = null
    }
  }

  each(cb: (fn: IInterceptor<T>) => void): void {
    this.interceptors.forEach(i => {
      if (i !== null) {
        cb(i)
      }
    })
  }
}
