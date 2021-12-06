import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 element 样式
import 'element-plus/dist/index.css'
// 清理默认样式
import 'normalize.css'
import './assets/css/index.less'

import { setUpStore } from './store'

const app = createApp(App)

// 对 vuex 中数据重新设置
setUpStore()

app.use(router).use(store)

app.mount('#app')
