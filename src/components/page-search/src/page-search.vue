<template>
  <div class="page-search">
    <!-- 检索区域 -->
    <i-o-form v-bind="formConfig" v-model="formDate">
      <template #header>
        <div class="header">
          <h2>高级检索</h2>
        </div>
      </template>

      <template #footer>
        <div class="footer">
          <el-button @click="handleReset">
            <i class="iconfont icon-reset"></i> 重置
          </el-button>
          <el-button type="primary" @click="handleQuery">
            <i class="iconfont icon-sousuo"></i> 检索
          </el-button>
        </div>
      </template>
    </i-o-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IOForm from '@/base-ui/form'

export default defineComponent({
  props: {
    formConfig: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    IOForm
  },
  emits: ['handleResetBtn', 'handleQueryBtn'],
  setup(props, { emit }) {
    // 1. 通过配置文件决定需要双向绑定什么数据
    const formDataRaw: any = {}
    const formDataList = props.formConfig.formType ?? []
    for (const item of formDataList) {
      formDataRaw[item.field] = ''
    }

    const formDate = ref(formDataRaw)

    // 2. 当点击重置按钮将组件内的内容都清除
    const handleReset = () => {
      formDate.value = formDataRaw
      emit('handleResetBtn')
    }

    // 3. 当点击 检索 按钮获取用户输入的数据发送请求获取数据并进行展示
    const handleQuery = () => {
      emit('handleQueryBtn', formDate.value)
    }

    return {
      formDate,
      handleReset,
      handleQuery
    }
  }
})
</script>

<style scoped lang="less">
.header {
  padding-top: 5px;
  color: red;
}
.footer {
  padding: 0 30px 20px 0;
  text-align: right;
}
</style>
