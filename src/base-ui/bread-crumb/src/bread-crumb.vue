<template>
  <div class="bread-crumb">
    <!-- separator 表示分隔符 -->
    <el-breadcrumb separator="/">
      <template v-for="item in breadCrumb" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path ?? '' }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadCrumb } from '../type'

export default defineComponent({
  props: {
    breadCrumb: {
      type: Array as PropType<IBreadCrumb[]>,
      default: () => []
    }
  },
  setup() {


    return {
    }
  }
})
</script>

<style scoped></style>
