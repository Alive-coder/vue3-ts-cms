<template>
  <div class="i-o-table">
    <!-- 头部 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 表格内容 -->
    <el-table
      :data="listData"
      border
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 是否显示选中按钮 -->
      <el-table-column
        v-if="isShowSelectionColumn"
        type="selection"
        align="center"
        width="50px"
      ></el-table-column>
      <!-- 是否显示序号 -->
      <el-table-column
        v-if="isShowIndexColumn"
        label="序号"
        type="index"
        align="center"
        width="70px"
      ></el-table-column>

      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 底部 分页器 -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IpropListType } from '../type'

export default defineComponent({
  props: {
    // 需要显示在头部的标题
    title: {
      type: String,
      default: ''
    },
    // 需要显示的数据
    listData: {
      type: Array as PropType<any[]>,
      required: true
    },
    // 数据的数量
    listCount: {
      type: Number,
      default: 0
    },
    // 需要显示的表头
    propList: {
      type: Array as PropType<IpropListType[]>,
      required: true
    },
    // 是否要显示索引项
    isShowIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否需要显示 选中 项
    isShowSelectionColumn: {
      type: Boolean,
      default: false
    },
    // 当前页面信息(页码以及数据数量)
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // 会将 选中的 一行对象传入到 value 中
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    // 当页面数据发生改变时
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    // 当页码发生改变时
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
    font-weight: 600;
  }
  .handler {
  }
}

.footer {
  margin-top: 10px;
  display: flex;
  justify-content: end;
}
</style>
