<template>
  <div class="app-header">
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头像 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar icon="el-icon-user-solid" :src="userInfo.portrait"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="getOut()">登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from '@/services/user'

export default {
  created () {
    this.upLoadUserInfo()
  },
  name: 'appHeader',
  data () {
    return {
      userInfo: ''
    }
  },
  methods: {
    getOut () {
      this.$confirm('是否退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$router.push({ name: 'login' })
        // 清空用户信息
        this.$store.commit('saveUser', null)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    },
    // 加载用户信息
    async upLoadUserInfo () {
      const { data } = await getUserInfo()
      if (data.state === 1) {
        this.userInfo = data.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-header {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
