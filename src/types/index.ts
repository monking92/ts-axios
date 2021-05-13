type MethodType =
  "get" | "GET" |
  "post" | "POST" |
  "head" | "HEAD" |
  "put" | "PUT" |
  "options" | "OPTIONS"

export interface IAxiosConfig {
  url: string,
  method?: MethodType,
  data?: any
}