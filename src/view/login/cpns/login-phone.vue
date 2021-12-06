<template>
  <div>
    <el-form label-width="70px" :rules="rules" :model="phone" ref="elFormRef">
      <el-form-item label="手机号" prop="num">
        <el-input placeholder="请输入手机号~" v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input placeholder="请输入验证码~" v-model="phone.code" />
      </el-form-item>
      <div class="code-button-wrap">
        <el-button type="primary" class="code-button" plain
          >获 取 验 证 码</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const store = useStore()

    const phone = reactive({
      num: '',
      code: ''
    })

    const elFormRef = ref<InstanceType<typeof ElForm>>()

    // 当外界点击 登录 按钮 触发
    const phoneLogin = () => {
      // 当通过表单验证再发送请求
      elFormRef.value?.validate((validated) => {
        // 验证成功发送请求
        if (validated) {
          store.dispatch('login/phoneLoginAction', { ...phone })
        }
      })
    }

    return {
      phone,
      rules,
      phoneLogin,
      elFormRef
    }
  }
})
</script>

<style scoped lang="less">
.code-button-wrap {
  width: 100%;
  display: flex;
  justify-content: space-around;
  .code-button {
    width: 150px;
    height: 20px;
  }
}
</style>
