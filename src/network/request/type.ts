import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义 拦截器 类型
interface IoRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  reponseInterceptor?: (res: T) => T
  reponseInterceptorCatch?: (err: any) => any
}

// 定义 axios 实例 类型(添加了 拦截器 )
interface IoRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IoRequestInterceptors<T>
  showLoading?: boolean
}

export { IoRequestConfig, IoRequestInterceptors }
