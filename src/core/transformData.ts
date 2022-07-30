import { IAxiosRequestConfig, TransformRequestType } from '../types'

export default function transformData(this: IAxiosRequestConfig, data: any, fns: TransformRequestType | TransformRequestType[]) {
  if (!Array.isArray(fns)) fns = [fns]

  fns.forEach(fn => {
    data = fn.call(this, data)
  })

  return data
}