import { createStore, useStore as useVuexStore, Store } from 'vuex'
import { IRootType, IStoreType } from './type'
import login from './login/login'
import { system } from './main/system/system'

// 这里需要传入泛型，是指定 root 根模块中 state 的类型
const store = createStore<IRootType>({
  state() {
    return {
      name: '你好世界',
      age: 19
    }
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    login,
    system
  }
})

// 当页面进行刷新时，vuex 中的内容就会消失，即会出现vuex中没有内容，而只有本地存储中才有内容
export function setUpStore() {
  store.dispatch('login/loadLocalLogin')
}

// 自己封装一个 useStore 方法
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
