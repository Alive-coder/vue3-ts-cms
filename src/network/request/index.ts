import axios from 'axios'
import { AxiosInstance } from 'axios'
import { IoRequestConfig, IoRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus'

const SHOW_LOADING = true

class IoRequest {
  // 保存 axios 实例
  instance: AxiosInstance
  // 保存拦截器
  interceptors?: IoRequestInterceptors
  // 加载中
  loading?: ILoadingInstance
  // 用户决定是否显示 加载提示
  showLoading: boolean

  constructor(config: IoRequestConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config)
    // 保存拦截器
    this.interceptors = config.interceptors
    // 是否显示加载提示
    this.showLoading = config.showLoading ?? SHOW_LOADING

    // 调用 axios 实例中拦截器的方法(每个实例各有的拦截器)
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.reponseInterceptor,
      this.interceptors?.reponseInterceptorCatch
    )

    // 每个实例共有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          // 添加加载动画
          this.loading = ElLoading.service({
            lock: true,
            background: 'rgba(0,0,0,0,2)',
            text: '正在加载中,请稍后....'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 在请求回来数据时将加载中提示关闭
        this.loading?.close()
        // 只有拿到 res中的 data 才是我们服务器真正给我们的数据
        return res.data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  request<T = any>(config: IoRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.reponseInterceptor) {
            res = config.interceptors.reponseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = SHOW_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = SHOW_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: IoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: IoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: IoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: IoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default IoRequest
