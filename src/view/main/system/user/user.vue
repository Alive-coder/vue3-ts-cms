<template>
  <div class="user">
    <!-- 检索 -->
    <page-search
      :formConfig="formConfig"
      @handleQueryBtn="handleQueryClick"
      @handleResetBtn="handleResetClick"
    ></page-search>

    <!-- 内容 -->
    <page-content
      :contentConfig="contentConfig"
      ref="pageContentRef"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { formConfig } from './config/search.config'
import { contentConfig } from './config/content.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    return {
      formConfig,
      contentConfig,
      handleResetClick,
      pageContentRef,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less"></style>
