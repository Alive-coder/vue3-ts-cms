import { App } from 'vue'

import { utcStringFormat } from '@/utils/formatTime'

export default function registerProps(app: App) {
  app.config.globalProperties.$filters = {
    formatUtcTime(value: string){
      return utcStringFormat(value)
    }
  }
}
