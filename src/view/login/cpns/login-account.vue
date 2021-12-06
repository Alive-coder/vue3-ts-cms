<template>
  <div>
    <el-form label-width="60px" :rules="rules" :model="account" ref="elFormRef">
      <el-form-item label="账号" prop="name">
        <el-input placeholder="请输入账号~" v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码~"
          v-model="account.password"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import type { ElForm } from 'element-plus'
import { rules } from '../config/account-config'
import cache from '@/utils/cache'

export default defineComponent({
  setup() {
    // 创建 vuex 对象
    const store = useStore()

    const account = reactive({
      // 如果之前用户保存了密码和账号在页面刚加载时就直接显示，如果没有就是空值
      name: cache.getCache('name') ?? '',
      password: cache.getCache('password') ?? ''
    })

    const elFormRef = ref<InstanceType<typeof ElForm>>()

    // 监听 外部登录按钮点击
    const accountLogin = (isSaveCode: boolean) => {
      // 对 账号和密码 进行验证
      // validate
      elFormRef.value?.validate((validated) => {
        // 增加功能: 当用户通过验证才可以点击登录按钮，如果没有通过就不能点击按钮

        // 1. 先判断用户是否选择了保存密码。
        // 2. 再进行登录
        if (validated) {
          // 如果选择了保存密码就进行本地保存账号和密码
          if (isSaveCode) {
            cache.setCache('name', account.name)
            cache.setCache('password', account.password)
          } else {
            // 如果没有选择保存密码, 就清空本地缓存
            cache.deleteCache('name')
            cache.deleteCache('password')
          }

          // 进行登录操作
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      accountLogin,
      elFormRef
    }
  }
})
</script>

<style scoped></style>
