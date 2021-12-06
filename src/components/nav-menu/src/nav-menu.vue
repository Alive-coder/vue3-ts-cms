<template>
  <div class="nav-menu">
    <!-- 菜单顶部 logo 区域 -->
    <div class="logo">
      <img src="~@/assets/img/logo.png" alt="logo" />
      <span v-if="!isFold">Vue3+TS</span>
    </div>

    <!-- 菜单主要区域 -->
    <el-menu
      :default-active="defaultIndex"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="isFold"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <!-- 将 userInfo 进行遍历 -->
      <template v-for="item in userMenuList" :key="item.id">
        <!-- 判断属于几级菜单 type === 1 为二级菜单可以展开 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <!-- 二级菜单的标题 -->
            <template #title>
              <el-icon><cpu /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单中的菜单 -->
            <el-menu-item
              :index="item2.id + ''"
              v-for="item2 in item.children"
              :key="item2.id"
              @click="handleMenuItem(item2)"
            >
              <span>{{ item2.name }}</span>
            </el-menu-item>
          </el-sub-menu>
        </template>
        <!-- type === 2 为一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <el-icon><cpu /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { Cpu } from '@element-plus/icons'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-router'

export default defineComponent({
  props: {
    isFold: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Cpu
  },
  setup() {
    // 获取用户菜单信息
    const store = useStore()
    const router = useRouter()
    // 用户菜单列表
    const userMenuList = store.state.login.userMenuList

    // 点击对应的菜单按钮跳转路由组件
    const handleMenuItem = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    // 获取 当前路由对象
    const route = useRoute()
    // 获取当前路由对象的 路径
    const path = route.path

    // 当对页面进行刷新，要保存当前当前 匹配到 menu 对象的 id
    const defaultIndex = ref('2')
    const menu = pathMapToMenu(userMenuList, path)
    defaultIndex.value = menu.id + ''

    return {
      userMenuList,
      handleMenuItem,
      defaultIndex
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    width: 200px;
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    img {
      height: 100%;
      margin: 0 10px;
    }
    span {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}

// 目录
.el-sub-menu {
  background-color: #001529 !important;
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #323335 !important;
  }
}

::v-deep .el-sub-menu__title {
  background-color: #001529 !important;
}

// hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
  background-color: #3372b6 !important;
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}

.el-menu {
  border-right: none;
}
</style>
