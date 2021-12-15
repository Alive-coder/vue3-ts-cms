<template>
  <div class="role">
    <page-search :formConfig="formConfig"></page-search>
    <page-content :contentConfig="contentConfig" pageName="role"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { formConfig } from './config/search.config'
import { contentConfig } from './config/content.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

export default defineComponent({
  components: {
    PageSearch,
    PageContent
  },
  name: 'role',
  setup() {
    return {
      formConfig,
      contentConfig
    }
  }
})
</script>

<style scoped></style>
