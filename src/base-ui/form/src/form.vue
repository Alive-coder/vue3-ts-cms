<template>
  <div class="form">
    <!-- 头部信息 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row :gutter="20">
        <el-col v-bind="colLayout" v-for="item in formType" :key="item.label">
          <el-form-item :label="item.label" :style="formItemStyle">
            <!-- 当为 用户名或密码时 -->
            <template v-if="item.type === 'input' || item.type === 'password'">

              <el-input
                :show-password="item.type === 'password'"
                :placeholder="item.placeholder"
                style="width: 100%"
                v-model="formData[`${item.field}`]"
              ></el-input>
            </template>
            <!-- 当为 多选框时 -->
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                style="width: 100%"
                v-model="formData[`${item.field}`]"
              >
                <el-option
                  v-for="item2 in item.options"
                  :key="item2.value"
                  :label="item2.title"
                  :value="item2.value"
                >
                  {{ item2.title }}
                </el-option>
              </el-select>
            </template>
            <!-- 当为时间选择时 -->
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                v-bind="item.otherOptions"
                style="width: 100%"
                v-model="formData[`${item.field}`]"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 底部按钮 -->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormType } from '../type'

export default defineComponent({
  props: {
    //  组件双向绑定
    modelValue: {
      type: Object,
      required: true
    },
    // 配置不同的组件
    formType: {
      // 可以指定 formType 的具体类型
      type: Array as PropType<IFormType[]>,
      default: () => []
    },
    // 显示 文字的宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 需要对每个 el-form-item 设置的样式
    formItemStyle: {
      type: Object,
      default: () => ({ padding: '22px 30px 0 30px' })
    },
    // 当不同的屏幕尺寸时一行显示不同的个数
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, //一行显示 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      {
        deep: true
      }
    )

    return {
      formData
    }
  }
})
</script>

<style scoped></style>
