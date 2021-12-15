<template>
  <div class="page-content">
    <i-o-table v-bind="contentConfig" :listData="dataList">
      <!--头部插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="medium" plain>
          <i class="iconfont icon-xinjian"></i> 新建用户
        </el-button>
        <el-button type="primary" size="medium" plain>
          <i class="iconfont icon-shuaxin"></i> 刷新
        </el-button>
      </template>

      <!-- 对表格中的 列 的插槽 -->
      <template #status="scope">
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          plain
          size="mini"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatUtcTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatUtcTime(scope.row.updateAt) }}</strong>
      </template>

      <template #edit>
        <el-button type="text" size="medium" class="edit-btn">
          <i class="iconfont icon-bianji"></i>编辑
        </el-button>
        <el-button type="text" size="medium" class="delect-btn">
          <i class="iconfont icon-shanchu"></i>删除
        </el-button>
      </template>
    </i-o-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import IOTable from '@/base-ui/table'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    // 需要传入的配置文件，根据配置文件生成对应的页面
    contentConfig: {
      type: Object,
      default: () => {}
    },
    // 对于不同的页面根据 pageName 发送不同的请求获取数据
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    IOTable
  },
  setup(props, { emit }) {
    const store = useStore()
    // 发送请求获取用户列表
    const getPageData = (queryData: any = {}) => {
      console.log('halskjlsdfjl')
      store.dispatch('system/getPageListAction', {
        // pageUrl: '/users/list',
        pageName: props.pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...queryData
        }
      })
      console.log('=======')
    }
    getPageData()

    // 拿到 请求返回的列表数据
    const dataList = computed(() => {
      return store.getters['system/pageListData'](props.pageName)
    })

    return {
      dataList,
      getPageData
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .edit-btn {
    color: #57cc20;
  }
  .edit-btn:hover {
    color: #a0ee7c;
  }
  .edit-btn:active {
    color: #2b471e;
  }
  .delect-btn {
    color: #f78585;
  }
  .delect-btn:hover {
    color: #faaaaa;
  }
  .delect-btn:active {
    color: #663f3f;
  }
}
</style>
