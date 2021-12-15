import { Module } from 'vuex'

import { IRootType } from '@/store/type'
import { IsystemStateType } from './type'
import { getPageListData } from '@/network/main/system'

export const system: Module<IsystemStateType, IRootType> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  actions: {
    // 不同 组件可以通过 actions (传入 不同的 pageName ) 获取不同的数据
    async getPageListAction({ commit }, payload: any) {
      // 根据不同的 pageName 匹配不同的 url 获取不同的数据
      let pageName: string = payload.pageName
      let pageUrl: string = `/${pageName}/list`

      // 发送请求获取用户列表
      const DataRes = await getPageListData(pageUrl, payload.queryInfo)
      // 将 userList 和 totalCount 保存到 system 模块的 state 中
      const { list, totalCount } = DataRes.data

      // 将传入的 pageName 第一个字母大写
      const pageNameUpper =
        payload.pageName[0].toUpperCase() + payload.pageName.substr(1)

      commit(`save${pageNameUpper}List`, list)
      commit(`save${pageNameUpper}Count`, totalCount)
      // commit('saveUsersList', list)
      // commit('saveUsersCount', totalCount)
    }
  },
  mutations: {
    saveUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    saveUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    saveRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    saveRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },

  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    }
  }
}
