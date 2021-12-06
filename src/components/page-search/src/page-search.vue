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
          <el-button>
            <i class="iconfont icon-reset"></i> 重置
            </el-button>
          <el-button type="primary">
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
  setup() {
    const formDate = ref({
      id: '',
      password: '',
      sports: '',
      createTime: ''
    })

    return {
      formDate
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
}</style>
