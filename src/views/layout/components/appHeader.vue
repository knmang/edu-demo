<template>
  <div class="app-header">
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头像 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户信息</el-dropdown-item>
        <el-dropdown-item divided>登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'appHeader'
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
