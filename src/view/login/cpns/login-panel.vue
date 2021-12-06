<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <!-- 表单验证 -->
    <el-tabs type="border-card" stretch class="border-card" v-model="currentTag">
      <el-tab-pane name="account">
        <template #label>
          <div class="wrapper">
            <el-icon class="icon"><avatar /></el-icon>
            <span>账号登录</span>
          </div>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <div class="wrapper">
            <el-icon class="icon"><cellphone /></el-icon>
            <span>手机号登录</span>
          </div>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>

    <!-- 记住密码 / 忘记密码 -->
    <div class="code-control">
      <el-checkbox label="记住密码" v-model="isSaveCode"></el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>

    <!-- 登录按钮 -->
    <div class="login-btn-wrap">
      <el-button type="primary" class="login-btn" @click="handleLogin"
        >点 击 登 录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Avatar, Cellphone } from '@element-plus/icons'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    Avatar,
    Cellphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isSaveCode = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTag = ref('account')


    const handleLogin = () => {
      // 在 账号登录 组件中验证 (需要判断登录方式)
      if(currentTag.value === 'account'){
        // 账号密码登录
        accountRef.value?.accountLogin(isSaveCode.value)
      }else{
        // 手机号登录
        phoneRef.value?.phoneLogin()
      }
    }

    return {
      isSaveCode,
      handleLogin,
      accountRef,
      phoneRef,
      currentTag
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 200px;
  .title {
    text-align: center;
  }
  .code-control {
    display: flex;
    justify-content: space-between;
  }
  .login-btn-wrap {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .login-btn {
      text-align: center;
      width: 200px;
    }
  }
}
.icon {
  margin-right: 5px;
  font-size: 16px;
  align-items: center;
}

.wrapper {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>
