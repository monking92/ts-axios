import { IAxiosRequestConfig, IAxiosTransformerFn } from '../types'

export default function transformData(this: IAxiosRequestConfig, data: any, fns: IAxiosTransformerFn | IAxiosTransformerFn[]) {
  if (!Array.isArray(fns)) fns = [fns]

  fns.forEach(fn => {
    data = fn && fn.call(this, data)
  })

  return data
}