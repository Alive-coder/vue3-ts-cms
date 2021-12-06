import { RouteRecordRaw } from 'vue-router'
import { IBreadCrumb } from '@/base-ui/bread-crumb/type'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 2
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        // 找到第一个 menu 对象
        if (!firstMenu) firstMenu = menu
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function pathMapToMenu(
  userMenusList: any[],
  path: string,
  breadCrumb?: IBreadCrumb[]
): any {
  for (const menu of userMenusList) {
    if (menu.type === 1) {
      const menuRes = pathMapToMenu(menu.children ?? [], path)
      breadCrumb?.push({ name: menu.name })
      if (menuRes) {
        breadCrumb?.push({ name: menuRes.name })
        return menuRes
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu
    }
  }
}

export function pathMapBreadcrumbs(userMenusList: any[], path: string): any {
  const breadCrumb: IBreadCrumb[] = []
  pathMapToMenu(userMenusList, path, breadCrumb)
  return breadCrumb
}

export { firstMenu }
