import { Module } from 'vuex'

import { IRootType } from '@/store/type'
import { IsystemStateType } from './type'
import { getPageListData } from '@/network/main/system'

export const system: Module<IsystemStateType, IRootType> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  actions: {
    // user 组件通过 actions 获取用户列表
    async getPageListAction({ commit }, payload: any) {
      // 发送请求获取用户列表
      const userRes = await getPageListData(payload.pageUrl, payload.queryInfo)
      // 将 userList 和 totalCount 保存到 system 模块的 state 中
      const {list, totalCount} = userRes.data
      commit('saveUserList', list)
      commit('saveUserCount', totalCount)
    }
  },
  mutations: {
    saveUserList(state, userList: any[]){
      state.userList = userList
    },
    saveUserCount(state, userCount: number){
      state.userCount = userCount
    }

  }
}
