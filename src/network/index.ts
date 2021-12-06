import IoRequest from './request'
import { BASE_URL, BASE_TIME } from './request/config'
import cache from '@/utils/cache'

export default new IoRequest({
  baseURL: BASE_URL,
  timeout: BASE_TIME,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = cache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})
