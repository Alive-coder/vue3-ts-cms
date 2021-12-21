import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 导入 element 样式
import 'element-plus/dist/index.css'
// 清理默认样式
import 'normalize.css'
import './assets/css/index.less'

import { setUpStore } from './store'
import registerApp from './global'

const app = createApp(App)

// 全局 app 工具
registerApp(app)

// 对 vuex 中数据重新设置
setUpStore()

app.use(router).use(store)
// 将 ElementPlus 设置成中文
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
