import { createWebHashHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import cache from '@/utils/cache'
import { firstMenu } from '@/utils/map-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/main',
    // 设置 name 属性是为了可以通过编程式方法为 父路由 添加子路由
    name: 'main',
    component: () => import('@/view/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/view/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

/* 当用户跳转到非登录页面时,判断用户是否登录(判断本地缓存中是否有token)
如果有就跳转到首页页面，如果没有就跳转到登录界面 */
router.beforeEach((to) => {
  // 在访问其他路径时先判断是否登录
  if (to.path !== '/login') {
    const token = cache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  //  在访问 main 路径时需要默认显示第一个 menu 组件对象
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
