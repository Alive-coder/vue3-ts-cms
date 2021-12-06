import type { Module } from 'vuex'

import { ILoginModuleType } from './type'
import { IRootType } from '../type'
import {
  accountLoginRequest,
  getUserInfoById,
  getMenuByRoleId
} from '@/network/login/login'
import { accountType } from '@/network/login/type'
import cache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-router'
import router from '@/router'

// 在 vuex 的模块类型中需要传入两个泛型，第一个是本模块中state的类型，还有就是根模块中state的类型
const loginModule: Module<ILoginModuleType, IRootType> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenuList: []
    }
  },
  mutations: {
    saveToken(state, token: string) {
      state.token = token
    },
    saveUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    saveUserMenuList(state, userMenuList: any[]) {
      state.userMenuList = userMenuList
      // 1.在这里根据 userMenuList 动态加载路由
      const routes = mapMenusToRoutes(userMenuList)
      // 2. 将返回的路由对象设置到 main 父路由中
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    // (账号密码登录)点击登录，发送请求，获取数据
    async accountLoginAction({ commit }, payload: accountType) {
      // 1. 发送请求拿到 token 数据
      const accountLoginRes = await accountLoginRequest(payload)
      const { id, token } = accountLoginRes.data
      // token 保存到 vuex 中,并且保存在 本地中
      commit('saveToken', token)
      cache.setCache('token', token)

      // 2. 发送请求通过 用户 id 拿到 userInfo
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      //  将 userInfo 保存到 vuex 中，并保存到本地中
      cache.setCache('userInfo', userInfo)
      commit('saveUserInfo', userInfo)

      // 3. 发送请求获取 用户 列表信息
      const userMenuRes = await getMenuByRoleId(userInfo.role.id)
      const userMenuList = userMenuRes.data
      //  将 userMenuList 保存到 vuex 中，并保存到本地中
      cache.setCache('userMenuList', userMenuList)
      commit('saveUserMenuList', userMenuList)

      // 4. 当保存了用户数据之后就跳转到首页
      router.push('/main')
    },

    // 对 vuex 数据重新赋值
    loadLocalLogin({ commit }) {
      const token = cache.getCache('token')
      if (token) {
        commit('saveToken', token)
      }
      const userInfo = cache.getCache('userInfo')
      if (userInfo) {
        commit('saveUserInfo', userInfo)
      }
      const userMenuList = cache.getCache('userMenuList')
      if (userMenuList) {
        commit('saveUserMenuList', userMenuList)
      }
    },

    // (手机号登录)点击登录，发送请求，获取数据
    phoneLoginAction({ commit }, payload) {
      console.log('手机号登录', payload)
    }
  },
  getters: {}
}

export default loginModule
