<template>
  <div class="nav-header">
    <!-- 左侧是否折叠图标 -->
    <div @click="handleFold" class="back-icon">
      <template v-if="!isFold">
        <el-icon><caret-left /></el-icon>
      </template>
      <template v-else>
        <el-icon><caret-right /></el-icon>
      </template>
    </div>
    <!-- 面包屑以及右边退出登录 -->
    <div class="utils-wrap">
      <bread-crumb :breadCrumb="breadCrumb"></bread-crumb>
      <div class="utils">
        <div class="utils-icon">
          <el-icon><chat-dot-round /></el-icon>
        </div>
        <div class="utils-icon">
          <el-icon><collection-tag /></el-icon>
        </div>
        <div class="utils-icon">
          <el-icon><bell /></el-icon>
        </div>
        <el-avatar size="small">user</el-avatar>
        <el-dropdown>
          <div class="el-dropdown-link">
            <div>{{ name }}</div>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleBackLogin">
                <i class="iconfont icon-tuichudenglu"></i>退出登录
              </el-dropdown-item>
              <el-dropdown-item divided>
                <i class="iconfont icon-yonghuxinxi"></i>用户信息
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="iconfont icon-xitongguanli-"></i>系统管理
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import {
  CaretLeft,
  CaretRight,
  ChatDotRound,
  CollectionTag,
  Bell,
  ArrowDown
} from '@element-plus/icons'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import '@/assets/iconfont/iconfont.css'
import cache from '@/utils/cache'
import breadCrumb from '@/base-ui/bread-crumb'
import { pathMapBreadcrumbs } from '@/utils/map-router'
import { IBreadCrumb } from '@/base-ui/bread-crumb/type'

export default defineComponent({
  emits: ['changeFold'],
  components: {
    CaretLeft,
    CaretRight,
    ChatDotRound,
    CollectionTag,
    Bell,
    ArrowDown,
    breadCrumb
  },
  setup(props, { emit }) {
    const router = useRouter()
    const store = useStore()
    const isFold = ref(false)
    const handleFold = () => {
      isFold.value = !isFold.value
      emit('changeFold', isFold.value)
    }

    const name = store.state.login.userInfo.name

    const handleBackLogin = () => {
      cache.deleteCache('token')
      router.push('/login')
    }

    // 面包屑数据
    const userMenuList = store.state.login.userMenuList
    const breadCrumb = computed(() => {
      const route = useRoute()
      const path = route.path
      return pathMapBreadcrumbs(userMenuList, path)
    })

    return {
      isFold,
      handleFold,
      name,
      handleBackLogin,
      breadCrumb
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 0 10px 0 0;
  .back-icon {
    margin-right: 10px;
    .el-icon {
      font-size: 24px;
      cursor: pointer;
    }
  }

  .utils-wrap {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .utils {
      display: flex;
      align-items: center;
      .utils-icon {
        margin-right: 15px;
        cursor: pointer;
        .el-icon {
          font-size: 20px;
        }
      }
      .el-avatar {
        margin-right: 10px;
      }
      .el-dropdown {
        cursor: pointer;
        .el-dropdown-link {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
